import { NativeModulesProxy } from 'expo-modules-core';

export type NetworkTotals = {
  rxBytes: number;
  txBytes: number;
};

export type PermissionResponse = {
  status: 'granted' | 'denied' | 'undetermined';
  granted: boolean;
  canAskAgain: boolean;
  expires: string;
};

export type AppUsage = {
  uid: number;
  packageName: string;
  rxBytes: number;
  txBytes: number;
};

type NetworkType = 'all' | 'wifi' | 'mobile';

type NetworkMonitorNativeModule = {
  isUsageAccessGranted(): boolean;
  isPhoneStatePermissionGranted(): boolean;
  isMobileStatsSupported(): boolean;
  getTrafficTotals(): NetworkTotals;
  queryAppUsage(startTime: number, endTime: number, network: NetworkType): Promise<AppUsage[]>;
  queryDeviceUsage(startTime: number, endTime: number, network: NetworkType): Promise<NetworkTotals>;
  requestPhoneStatePermission(): Promise<PermissionResponse>;
  getPhoneStatePermissionStatus(): Promise<PermissionResponse>;
};

const NetworkMonitor = NativeModulesProxy.NetworkMonitor as NetworkMonitorNativeModule | undefined;

export function isModuleAvailable() {
  return Boolean(NetworkMonitor);
}

export function isUsageAccessGranted(): boolean {
  if (!NetworkMonitor) {
    return false;
  }
  return NetworkMonitor.isUsageAccessGranted();
}

export function isPhoneStatePermissionGranted(): boolean {
  if (!NetworkMonitor) {
    return false;
  }
  return NetworkMonitor.isPhoneStatePermissionGranted();
}

export function isMobileStatsSupported(): boolean {
  if (!NetworkMonitor) {
    return false;
  }
  return NetworkMonitor.isMobileStatsSupported();
}

export function getTrafficTotals(): NetworkTotals {
  if (!NetworkMonitor) {
    return { rxBytes: 0, txBytes: 0 };
  }
  return NetworkMonitor.getTrafficTotals();
}

export async function queryAppUsage(
  startTime: number,
  endTime: number,
  network: NetworkType = 'all'
): Promise<AppUsage[]> {
  if (!NetworkMonitor) {
    return [];
  }
  return NetworkMonitor.queryAppUsage(startTime, endTime, network);
}

export async function queryDeviceUsage(
  startTime: number,
  endTime: number,
  network: NetworkType = 'all'
): Promise<NetworkTotals> {
  if (!NetworkMonitor) {
    return { rxBytes: 0, txBytes: 0 };
  }
  return NetworkMonitor.queryDeviceUsage(startTime, endTime, network);
}

export async function requestPhoneStatePermission(): Promise<PermissionResponse | null> {
  if (!NetworkMonitor) {
    return null;
  }
  return NetworkMonitor.requestPhoneStatePermission();
}

export async function getPhoneStatePermissionStatus(): Promise<PermissionResponse | null> {
  if (!NetworkMonitor) {
    return null;
  }
  return NetworkMonitor.getPhoneStatePermissionStatus();
}
