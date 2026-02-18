import { useCallback, useEffect, useMemo, useState } from 'react';
import { AppState, Platform } from 'react-native';

import {
  isMobileStatsSupported,
  isModuleAvailable,
  isPhoneStatePermissionGranted,
  requestPhoneStatePermission,
  type PermissionResponse,
} from '@local/network-monitor';

export type PhoneStatePermission = {
  isAndroid: boolean;
  isModuleAvailable: boolean;
  mobileStatsSupported: boolean;
  phonePermissionGranted: boolean;
  requestPermission: () => Promise<PermissionResponse | null>;
};

export function usePhoneStatePermission(): PhoneStatePermission {
  const [phonePermissionGranted, setPhonePermissionGranted] = useState(false);
  const [mobileStatsSupported, setMobileStatsSupported] = useState(false);
  const isAndroid = Platform.OS === 'android';
  const moduleAvailable = isModuleAvailable();

  const refresh = useCallback(() => {
    if (!isAndroid || !moduleAvailable) {
      setPhonePermissionGranted(false);
      setMobileStatsSupported(false);
      return;
    }
    setPhonePermissionGranted(isPhoneStatePermissionGranted());
    setMobileStatsSupported(isMobileStatsSupported());
  }, [isAndroid, moduleAvailable]);

  useEffect(() => {
    refresh();
    if (!isAndroid || !moduleAvailable) {
      return;
    }

    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        refresh();
      }
    });

    const interval = setInterval(refresh, 4000);
    return () => {
      subscription.remove();
      clearInterval(interval);
    };
  }, [isAndroid, moduleAvailable, refresh]);

  const requestPermission = useCallback(async () => {
    if (!isAndroid || !moduleAvailable) {
      return null;
    }
    try {
      const response = await requestPhoneStatePermission();
      refresh();
      return response;
    } catch {
      refresh();
      return null;
    }
  }, [isAndroid, moduleAvailable, refresh]);

  return useMemo(
    () => ({
      isAndroid,
      isModuleAvailable: moduleAvailable,
      mobileStatsSupported,
      phonePermissionGranted,
      requestPermission,
    }),
    [isAndroid, moduleAvailable, mobileStatsSupported, phonePermissionGranted, requestPermission]
  );
}
