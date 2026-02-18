import { type ComponentProps, useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, type ViewStyle } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { StaggeredReveal } from '@/components/ui/staggered-reveal';
import { getMonitorColors, fonts, type MonitorColors } from '@/constants/monitor-theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const sparkBars = [14, 20, 12, 26, 18, 30, 22, 34, 20, 26, 16, 24];

type IconName = ComponentProps<typeof MaterialIcons>['name'];

const apps: Array<{
  id: string;
  name: string;
  category: string;
  down: number;
  up: number;
  data: string;
  icon: IconName;
  color: string;
  active: boolean;
}> = [
  {
    id: 'streamly',
    name: 'Streamly',
    category: 'Video streaming',
    down: 8.4,
    up: 0.4,
    data: '640 MB',
    icon: 'play-circle-filled',
    color: '#F2B261',
    active: true,
  },
  {
    id: 'chatspace',
    name: 'ChatSpace',
    category: 'Messaging',
    down: 1.6,
    up: 1.1,
    data: '120 MB',
    icon: 'chat-bubble',
    color: '#6CD4CF',
    active: true,
  },
  {
    id: 'naviroute',
    name: 'NaviRoute',
    category: 'Maps & rides',
    down: 0.8,
    up: 0.3,
    data: '90 MB',
    icon: 'map',
    color: '#8CA6F5',
    active: true,
  },
  {
    id: 'cloudsync',
    name: 'CloudSync',
    category: 'Backup',
    down: 0.0,
    up: 0.2,
    data: '55 MB',
    icon: 'cloud-upload',
    color: '#73D29B',
    active: false,
  },
];

export default function MonitorScreen() {
  const colorScheme = useColorScheme();
  const colors = useMemo(() => getMonitorColors(colorScheme), [colorScheme]);
  const [speed, setSpeed] = useState({ down: 14.8, up: 1.9 });
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const interval = setInterval(() => {
      setSpeed((prev) => ({
        down: Number(Math.max(1.2, prev.down + (Math.random() - 0.45) * 5.4).toFixed(1)),
        up: Number(Math.max(0.3, prev.up + (Math.random() - 0.4) * 1.2).toFixed(1)),
      }));
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <View style={styles.screen}>
        <BackgroundGlow colors={colors} />
        <ScrollView
          contentContainerStyle={[
            styles.content,
            { paddingTop: Math.max(insets.top + 4, 20) },
          ]}
          showsVerticalScrollIndicator={false}>
          <StaggeredReveal index={0}>
            <View style={styles.header}>
              <View style={[styles.badge, { backgroundColor: colors.accentSoft }]}>
                <MaterialIcons name="security" size={14} color={colors.accent} />
                <Text style={[styles.badgeText, { color: colors.accent }]}>
                  Android-first, on-device
                </Text>
              </View>
              <Text style={[styles.title, { color: colors.text }]}>Simple Network Monitor</Text>
              <Text style={[styles.subtitle, { color: colors.muted }]}>
                See which apps are using data right now. No account needed, everything stays on
                your phone.
              </Text>
            </View>
          </StaggeredReveal>

          <StaggeredReveal index={1}>
            <View style={[styles.card, getCardStyle(colors)]}>
              <View style={styles.cardHeader}>
                <Text style={[styles.cardTitle, { color: colors.text }]}>Live Speed</Text>
                <View style={[styles.statusPill, { backgroundColor: colors.highlight }]}>
                  <MaterialIcons name="signal-cellular-alt" size={14} color={colors.accent} />
                  <Text style={[styles.statusText, { color: colors.accent }]}>Mobile</Text>
                </View>
              </View>
              <View style={styles.speedRow}>
                <View style={styles.speedBlock}>
                  <Text style={[styles.metricLabel, { color: colors.muted }]}>Download</Text>
                  <Text style={[styles.metricValue, { color: colors.text }]}>
                    {speed.down}
                    <Text style={[styles.metricUnit, { color: colors.muted }]}> Mbps</Text>
                  </Text>
                </View>
                <View style={styles.speedBlock}>
                  <Text style={[styles.metricLabel, { color: colors.muted }]}>Upload</Text>
                  <Text style={[styles.metricValue, { color: colors.text }]}>
                    {speed.up}
                    <Text style={[styles.metricUnit, { color: colors.muted }]}> Mbps</Text>
                  </Text>
                </View>
              </View>
              <View style={styles.sparkline}>
                {sparkBars.map((height, index) => (
                  <View
                    key={`bar-${index}`}
                    style={[
                      styles.sparkBar,
                      { height, backgroundColor: index % 3 ? colors.accent : colors.accentWarm },
                    ]}
                  />
                ))}
              </View>
            </View>
          </StaggeredReveal>

          <StaggeredReveal index={2}>
            <View style={[styles.card, getCardStyle(colors)]}>
              <View style={styles.cardHeader}>
                <Text style={[styles.cardTitle, { color: colors.text }]}>Apps Using Internet</Text>
                <Text style={[styles.cardMeta, { color: colors.muted }]}>Active now</Text>
              </View>
              {apps.map((app, index) => (
                <View
                  key={app.id}
                  style={[
                    styles.appRow,
                    index === apps.length - 1 ? styles.appRowLast : null,
                  ]}>
                  <View style={styles.appInfo}>
                    <View style={[styles.appIcon, { backgroundColor: app.color }]}>
                      <MaterialIcons name={app.icon} size={18} color="#0E1C20" />
                    </View>
                    <View>
                      <Text style={[styles.appName, { color: colors.text }]}>{app.name}</Text>
                      <Text style={[styles.appCategory, { color: colors.muted }]}>
                        {app.category}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.appMeta}>
                    <View style={styles.appStatusRow}>
                      <View
                        style={[
                          styles.statusDot,
                          { backgroundColor: app.active ? colors.good : colors.stroke },
                        ]}
                      />
                      <Text style={[styles.appStatus, { color: colors.muted }]}>
                        {app.active ? 'Active' : 'Idle'}
                      </Text>
                    </View>
                    <Text style={[styles.appSpeed, { color: colors.text }]}>
                      {app.down.toFixed(1)} down · {app.up.toFixed(1)} up
                    </Text>
                    <Text style={[styles.appData, { color: colors.muted }]}>
                      Today {app.data}
                    </Text>
                  </View>
                </View>
              ))}
              <View style={styles.cardFooter}>
                <Text style={[styles.footerText, { color: colors.muted }]}>
                  Most people do not know which apps drain data.
                </Text>
                <View style={[styles.cta, { borderColor: colors.accent }]}>
                  <Text style={[styles.ctaText, { color: colors.accent }]}>View all apps</Text>
                  <MaterialIcons name="chevron-right" size={16} color={colors.accent} />
                </View>
              </View>
            </View>
          </StaggeredReveal>

          <StaggeredReveal index={3}>
            <View style={[styles.card, getCardStyle(colors)]}>
              <View style={styles.cardHeader}>
                <Text style={[styles.cardTitle, { color: colors.text }]}>Android Setup</Text>
                <MaterialIcons name="settings" size={18} color={colors.muted} />
              </View>
              <Text style={[styles.bodyText, { color: colors.muted }]}>
                Grant Usage Access to show per-app network stats and background usage. All data
                stays on your device.
              </Text>
              <View style={styles.setupRow}>
                <View style={[styles.setupBadge, { backgroundColor: colors.highlight }]}>
                  <MaterialIcons name="lock" size={14} color={colors.accent} />
                  <Text style={[styles.setupText, { color: colors.accent }]}>No account</Text>
                </View>
                <View style={[styles.setupBadge, { backgroundColor: colors.highlight }]}>
                  <MaterialIcons name="verified-user" size={14} color={colors.accent} />
                  <Text style={[styles.setupText, { color: colors.accent }]}>On-device only</Text>
                </View>
              </View>
            </View>
          </StaggeredReveal>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

function BackgroundGlow({ colors }: { colors: MonitorColors }) {
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <View style={[styles.orb, styles.orbPrimary, { backgroundColor: colors.accentSoft }]} />
      <View
        style={[
          styles.orb,
          styles.orbSecondary,
          { backgroundColor: colors.accentWarm, opacity: 0.32 },
        ]}
      />
      <View style={[styles.orb, styles.orbTertiary, { backgroundColor: colors.highlight }]} />
    </View>
  );
}

const getCardStyle = (colors: MonitorColors): ViewStyle => ({
  backgroundColor: colors.card,
  borderColor: colors.stroke,
  shadowColor: colors.shadow,
});

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  screen: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 32,
    gap: 20,
  },
  header: {
    gap: 12,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  badgeText: {
    fontSize: 12,
    fontFamily: fonts.body,
    letterSpacing: 0.2,
  },
  title: {
    fontSize: 32,
    lineHeight: 36,
    fontFamily: fonts.title,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    fontFamily: fonts.body,
  },
  card: {
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    shadowOpacity: 0.15,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
    gap: 14,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: fonts.title,
  },
  cardMeta: {
    fontSize: 12,
    fontFamily: fonts.body,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  statusText: {
    fontSize: 12,
    fontFamily: fonts.body,
  },
  speedRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  speedBlock: {
    gap: 6,
  },
  metricLabel: {
    fontSize: 12,
    fontFamily: fonts.body,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  metricValue: {
    fontSize: 30,
    fontFamily: fonts.title,
  },
  metricUnit: {
    fontSize: 13,
    fontFamily: fonts.body,
  },
  sparkline: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 6,
    marginTop: 4,
  },
  sparkBar: {
    width: 6,
    borderRadius: 999,
  },
  appRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(120, 130, 135, 0.18)',
  },
  appRowLast: {
    borderBottomWidth: 0,
  },
  appInfo: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  appIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appName: {
    fontSize: 16,
    fontFamily: fonts.body,
  },
  appCategory: {
    fontSize: 12,
    fontFamily: fonts.body,
  },
  appMeta: {
    alignItems: 'flex-end',
    gap: 4,
  },
  appStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  appStatus: {
    fontSize: 11,
    fontFamily: fonts.body,
  },
  appSpeed: {
    fontSize: 13,
    fontFamily: fonts.mono,
  },
  appData: {
    fontSize: 12,
    fontFamily: fonts.body,
  },
  cardFooter: {
    marginTop: 6,
    gap: 10,
  },
  footerText: {
    fontSize: 13,
    fontFamily: fonts.body,
  },
  cta: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
  },
  ctaText: {
    fontSize: 13,
    fontFamily: fonts.body,
  },
  bodyText: {
    fontSize: 14,
    lineHeight: 21,
    fontFamily: fonts.body,
  },
  setupRow: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  setupBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  setupText: {
    fontSize: 12,
    fontFamily: fonts.body,
  },
  orb: {
    position: 'absolute',
    borderRadius: 999,
  },
  orbPrimary: {
    width: 260,
    height: 260,
    top: -80,
    right: -80,
  },
  orbSecondary: {
    width: 220,
    height: 220,
    bottom: 160,
    left: -80,
  },
  orbTertiary: {
    width: 160,
    height: 160,
    bottom: -40,
    right: -30,
  },
});
