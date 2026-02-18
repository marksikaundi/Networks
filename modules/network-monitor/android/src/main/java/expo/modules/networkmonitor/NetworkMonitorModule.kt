package expo.modules.networkmonitor

import android.Manifest
import android.app.AppOpsManager
import android.app.usage.NetworkStats
import android.app.usage.NetworkStatsManager
import android.content.Context
import android.net.ConnectivityManager
import android.net.TrafficStats
import android.os.Build
import android.os.Process
import android.telephony.TelephonyManager
import androidx.core.content.ContextCompat
import android.content.pm.PackageManager
import expo.modules.kotlin.exception.CodedException
import expo.modules.kotlin.exception.Exceptions
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.Promise
import expo.modules.interfaces.permissions.Permissions

private class UsageAccessDeniedException : CodedException("Usage access not granted. Enable Usage Access in Android settings.")

private class NetworkStatsUnavailableException :
  CodedException("NetworkStatsManager is unavailable on this device.")

class NetworkMonitorModule : Module() {
  private val context: Context
    get() = appContext.reactContext ?: throw Exceptions.AppContextLost()

  override fun definition() = ModuleDefinition {
    Name("NetworkMonitor")

    Function("isUsageAccessGranted") {
      return@Function hasUsageAccess(context)
    }

    Function("isPhoneStatePermissionGranted") {
      return@Function isPhoneStatePermissionGranted(context)
    }

    Function("isMobileStatsSupported") {
      return@Function Build.VERSION.SDK_INT < Build.VERSION_CODES.Q
    }

    Function("getTrafficTotals") {
      val rxBytes = TrafficStats.getTotalRxBytes()
      val txBytes = TrafficStats.getTotalTxBytes()
      return@Function mapOf(
        "rxBytes" to if (rxBytes == TrafficStats.UNSUPPORTED.toLong()) 0.0 else rxBytes.toDouble(),
        "txBytes" to if (txBytes == TrafficStats.UNSUPPORTED.toLong()) 0.0 else txBytes.toDouble()
      )
    }

    AsyncFunction("requestPhoneStatePermission") { promise: Promise ->
      Permissions.askForPermissionsWithPermissionsManager(
        appContext.permissions,
        promise,
        Manifest.permission.READ_PHONE_STATE
      )
    }

    AsyncFunction("queryAppUsage") { startTime: Double, endTime: Double, network: String ->
      if (!hasUsageAccess(context)) {
        throw UsageAccessDeniedException()
      }
      val manager = context.getSystemService(Context.NETWORK_STATS_SERVICE) as? NetworkStatsManager
        ?: throw NetworkStatsUnavailableException()

      return@AsyncFunction queryAppUsageInternal(
        manager,
        startTime.toLong(),
        endTime.toLong(),
        network
      )
    }

    AsyncFunction("queryDeviceUsage") { startTime: Double, endTime: Double, network: String ->
      if (!hasUsageAccess(context)) {
        throw UsageAccessDeniedException()
      }
      val manager = context.getSystemService(Context.NETWORK_STATS_SERVICE) as? NetworkStatsManager
        ?: throw NetworkStatsUnavailableException()

      return@AsyncFunction queryDeviceUsageInternal(
        manager,
        startTime.toLong(),
        endTime.toLong(),
        network
      )
    }
  }

  private fun hasUsageAccess(context: Context): Boolean {
    val appOps = context.getSystemService(Context.APP_OPS_SERVICE) as AppOpsManager
    val mode = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
      appOps.unsafeCheckOpNoThrow(
        AppOpsManager.OPSTR_GET_USAGE_STATS,
        Process.myUid(),
        context.packageName
      )
    } else {
      appOps.checkOpNoThrow(
        AppOpsManager.OPSTR_GET_USAGE_STATS,
        Process.myUid(),
        context.packageName
      )
    }
    return mode == AppOpsManager.MODE_ALLOWED
  }

  private data class NetworkConfig(val type: Int, val subscriberId: String?)

  private fun getNetworkConfigs(network: String): List<NetworkConfig> {
    val configs = mutableListOf<NetworkConfig>()
    when (network.lowercase()) {
      "wifi" -> configs.add(NetworkConfig(ConnectivityManager.TYPE_WIFI, null))
      "mobile" -> {
        val subscriberId = getSubscriberId()
        if (subscriberId != null) {
          configs.add(NetworkConfig(ConnectivityManager.TYPE_MOBILE, subscriberId))
        }
      }
      else -> {
        configs.add(NetworkConfig(ConnectivityManager.TYPE_WIFI, null))
        val subscriberId = getSubscriberId()
        if (subscriberId != null) {
          configs.add(NetworkConfig(ConnectivityManager.TYPE_MOBILE, subscriberId))
        }
      }
    }
    return configs
  }

  private fun getSubscriberId(): String? {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
      return null
    }
    if (!isPhoneStatePermissionGranted(context)) {
      return null
    }
    return try {
      val telephonyManager = context.getSystemService(Context.TELEPHONY_SERVICE) as TelephonyManager
      telephonyManager.subscriberId
    } catch (e: SecurityException) {
      null
    }
  }

  private fun isPhoneStatePermissionGranted(context: Context): Boolean {
    return ContextCompat.checkSelfPermission(
      context,
      Manifest.permission.READ_PHONE_STATE
    ) == PackageManager.PERMISSION_GRANTED
  }

  private data class UsageTotals(var rxBytes: Long = 0, var txBytes: Long = 0)

  private fun queryAppUsageInternal(
    manager: NetworkStatsManager,
    startTime: Long,
    endTime: Long,
    network: String
  ): List<Map<String, Any>> {
    val totalsByUid = mutableMapOf<Int, UsageTotals>()

    for (config in getNetworkConfigs(network)) {
      val stats = manager.querySummary(config.type, config.subscriberId, startTime, endTime)
      val bucket = NetworkStats.Bucket()
      try {
        while (stats.hasNextBucket()) {
          stats.getNextBucket(bucket)
          val uid = bucket.uid
          if (uid <= 0) {
            continue
          }
          val totals = totalsByUid.getOrPut(uid) { UsageTotals() }
          totals.rxBytes += bucket.rxBytes
          totals.txBytes += bucket.txBytes
        }
      } finally {
        stats.close()
      }
    }

    val packageManager = context.packageManager
    return totalsByUid.map { (uid, totals) ->
      val packageName = packageManager.getPackagesForUid(uid)?.firstOrNull() ?: "uid:$uid"
      mapOf(
        "uid" to uid,
        "packageName" to packageName,
        "rxBytes" to totals.rxBytes.toDouble(),
        "txBytes" to totals.txBytes.toDouble()
      )
    }.sortedByDescending { entry ->
      (entry["rxBytes"] as Double) + (entry["txBytes"] as Double)
    }
  }

  private fun queryDeviceUsageInternal(
    manager: NetworkStatsManager,
    startTime: Long,
    endTime: Long,
    network: String
  ): Map<String, Double> {
    var rxTotal = 0L
    var txTotal = 0L

    for (config in getNetworkConfigs(network)) {
      val stats = manager.querySummaryForDevice(config.type, config.subscriberId, startTime, endTime)
      val bucket = NetworkStats.Bucket()
      try {
        while (stats.hasNextBucket()) {
          stats.getNextBucket(bucket)
          rxTotal += bucket.rxBytes
          txTotal += bucket.txBytes
        }
      } finally {
        stats.close()
      }
    }

    return mapOf(
      "rxBytes" to rxTotal.toDouble(),
      "txBytes" to txTotal.toDouble()
    )
  }
}
