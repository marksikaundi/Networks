import { useCallback, useEffect, useMemo, useState } from 'react';
import { AppState, Platform } from 'react-native';

import {
  getPhoneStatePermissionStatus,
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
  permissionStatus: PermissionResponse['status'];
  canAskAgain: boolean;
  requestPermission: () => Promise<PermissionResponse | null>;
};

export function usePhoneStatePermission(): PhoneStatePermission {
  const [phonePermissionGranted, setPhonePermissionGranted] = useState(false);
  const [mobileStatsSupported, setMobileStatsSupported] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState<PermissionResponse['status']>('undetermined');
  const [canAskAgain, setCanAskAgain] = useState(true);
  const isAndroid = Platform.OS === 'android';
  const moduleAvailable = isModuleAvailable();

  const refresh = useCallback(async () => {
    if (!isAndroid || !moduleAvailable) {
      setPhonePermissionGranted(false);
      setMobileStatsSupported(false);
      setPermissionStatus('undetermined');
      setCanAskAgain(true);
      return;
    }
    setPhonePermissionGranted(isPhoneStatePermissionGranted());
    setMobileStatsSupported(isMobileStatsSupported());
    try {
      const status = await getPhoneStatePermissionStatus();
      if (status) {
        setPermissionStatus(status.status);
        setCanAskAgain(status.canAskAgain);
      }
    } catch {
      setPermissionStatus(isPhoneStatePermissionGranted() ? 'granted' : 'undetermined');
      setCanAskAgain(true);
    }
  }, [isAndroid, moduleAvailable]);

  useEffect(() => {
    void refresh();
    if (!isAndroid || !moduleAvailable) {
      return;
    }

    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        void refresh();
      }
    });

    const interval = setInterval(() => {
      void refresh();
    }, 4000);
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
      void refresh();
      return response;
    } catch {
      void refresh();
      return null;
    }
  }, [isAndroid, moduleAvailable, refresh]);

  return useMemo(
    () => ({
      isAndroid,
      isModuleAvailable: moduleAvailable,
      mobileStatsSupported,
      phonePermissionGranted,
      permissionStatus,
      canAskAgain,
      requestPermission,
    }),
    [
      canAskAgain,
      isAndroid,
      mobileStatsSupported,
      moduleAvailable,
      permissionStatus,
      phonePermissionGranted,
      requestPermission,
    ]
  );
}
