import { Pressable, StyleSheet, Text, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as Linking from 'expo-linking';

import { fonts, type MonitorColors } from '@/constants/monitor-theme';

type PhoneStateAccessCardProps = {
  colors: MonitorColors;
  mode: 'request' | 'limited' | 'settings';
  onRequest?: () => void;
};

export function PhoneStateAccessCard({ colors, mode, onRequest }: PhoneStateAccessCardProps) {
  const openSettings = async () => {
    await Linking.openSettings();
  };

  if (mode === 'request') {
    return (
      <View style={[styles.card, { backgroundColor: colors.highlight, borderColor: colors.stroke }]}>
        <View style={styles.header}>
          <View style={[styles.iconWrap, { backgroundColor: colors.accentSoft }]}>
            <MaterialIcons name="sim-card" size={18} color={colors.accent} />
          </View>
          <View style={styles.textWrap}>
            <Text style={[styles.title, { color: colors.text }]}>Enable mobile data details</Text>
            <Text style={[styles.subtitle, { color: colors.muted }]}>
              Grant Phone permission to read mobile data usage on Android 9 and below.
            </Text>
          </View>
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={onRequest}
          style={[styles.button, { borderColor: colors.accent }]}>
          <Text style={[styles.buttonText, { color: colors.accent }]}>Allow phone permission</Text>
          <MaterialIcons name="chevron-right" size={18} color={colors.accent} />
        </Pressable>
        <Text style={[styles.helper, { color: colors.muted }]}>
          If denied, we will still show Wi-Fi and total device usage.
        </Text>
      </View>
    );
  }

  if (mode === 'settings') {
    return (
      <View style={[styles.card, { backgroundColor: colors.highlight, borderColor: colors.stroke }]}>
        <View style={styles.header}>
          <View style={[styles.iconWrap, { backgroundColor: colors.accentSoft }]}>
            <MaterialIcons name="settings" size={18} color={colors.accent} />
          </View>
          <View style={styles.textWrap}>
            <Text style={[styles.title, { color: colors.text }]}>Permission blocked</Text>
            <Text style={[styles.subtitle, { color: colors.muted }]}>
              Phone permission is blocked. Open app settings to enable mobile data access.
            </Text>
          </View>
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={openSettings}
          style={[styles.button, { borderColor: colors.accent }]}>
          <Text style={[styles.buttonText, { color: colors.accent }]}>Open app settings</Text>
          <MaterialIcons name="chevron-right" size={18} color={colors.accent} />
        </Pressable>
        <Text style={[styles.helper, { color: colors.muted }]}>
          Settings → Apps → Simple Network Monitor → Permissions.
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.card, { backgroundColor: colors.highlight, borderColor: colors.stroke }]}>
      <View style={styles.header}>
        <View style={[styles.iconWrap, { backgroundColor: colors.accentSoft }]}>
          <MaterialIcons name="info" size={18} color={colors.accent} />
        </View>
        <View style={styles.textWrap}>
          <Text style={[styles.title, { color: colors.text }]}>Mobile stats limited</Text>
          <Text style={[styles.subtitle, { color: colors.muted }]}>
            Android 10+ restricts per-app mobile usage details. You will still see Wi-Fi usage and
            live speed.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrap: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: 16,
    fontFamily: fonts.title,
  },
  subtitle: {
    fontSize: 12,
    lineHeight: 18,
    fontFamily: fonts.body,
  },
  button: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  buttonText: {
    fontSize: 13,
    fontFamily: fonts.body,
  },
  helper: {
    fontSize: 11,
    fontFamily: fonts.body,
  },
});
