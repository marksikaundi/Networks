import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as Linking from 'expo-linking';

import { fonts, type MonitorColors } from '@/constants/monitor-theme';

export function UsageAccessCard({ colors }: { colors: MonitorColors }) {
  if (Platform.OS !== 'android') {
    return null;
  }

  const openUsageAccessSettings = async () => {
    if (Platform.OS !== 'android') {
      return;
    }
    try {
      await Linking.sendIntent('android.settings.USAGE_ACCESS_SETTINGS');
    } catch {
      await Linking.openSettings();
    }
  };

  return (
    <View style={[styles.card, { backgroundColor: colors.highlight, borderColor: colors.stroke }]}>
      <View style={styles.header}>
        <View style={[styles.iconWrap, { backgroundColor: colors.accentSoft }]}>
          <MaterialIcons name="admin-panel-settings" size={18} color={colors.accent} />
        </View>
        <View style={styles.textWrap}>
          <Text style={[styles.title, { color: colors.text }]}>Usage access required</Text>
          <Text style={[styles.subtitle, { color: colors.muted }]}>
            Needed to show which apps are using data in real time.
          </Text>
        </View>
      </View>
      <Pressable
        accessibilityRole="button"
        onPress={openUsageAccessSettings}
        style={[styles.button, { borderColor: colors.accent }]}>
        <Text style={[styles.buttonText, { color: colors.accent }]}>Open usage access</Text>
        <MaterialIcons name="chevron-right" size={18} color={colors.accent} />
      </Pressable>
      <Text style={[styles.helper, { color: colors.muted }]}>
        In settings, enable Usage access for Simple Network Monitor.
      </Text>
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
