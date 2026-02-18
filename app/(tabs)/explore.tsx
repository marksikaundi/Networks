import { useMemo } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type ViewStyle,
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { StaggeredReveal } from '@/components/ui/staggered-reveal';
import { getMonitorColors, fonts, type MonitorColors } from '@/constants/monitor-theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const hourlyUsage = [0.2, 0.4, 0.35, 0.6, 0.9, 0.75, 0.55, 0.8, 0.42, 0.28, 0.5, 0.7];

const topApps = [
  { id: 'streamly', name: 'Streamly', usage: 0.74, amount: '640 MB', icon: 'play-circle-filled' },
  { id: 'chatspace', name: 'ChatSpace', usage: 0.46, amount: '120 MB', icon: 'chat-bubble' },
  { id: 'naviroute', name: 'NaviRoute', usage: 0.3, amount: '90 MB', icon: 'map' },
];

export default function SummaryScreen() {
  const colorScheme = useColorScheme();
  const colors = useMemo(() => getMonitorColors(colorScheme), [colorScheme]);

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <View style={styles.screen}>
        <BackgroundGlow colors={colors} />
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}>
          <StaggeredReveal index={0}>
            <View style={styles.header}>
              <View style={[styles.badge, { backgroundColor: colors.accentSoft }]}>
                <MaterialIcons name="insights" size={14} color={colors.accent} />
                <Text style={[styles.badgeText, { color: colors.accent }]}>Daily usage</Text>
              </View>
              <Text style={[styles.title, { color: colors.text }]}>Daily Summary</Text>
              <Text style={[styles.subtitle, { color: colors.muted }]}>
                Track today&apos;s usage, peaks, and the apps that drain data the most.
              </Text>
            </View>
          </StaggeredReveal>

          <StaggeredReveal index={1}>
            <View style={[styles.card, getCardStyle(colors)]}>
              <View style={styles.cardHeader}>
                <Text style={[styles.cardTitle, { color: colors.text }]}>Today</Text>
                <Text style={[styles.cardMeta, { color: colors.muted }]}>Updated now</Text>
              </View>
              <Text style={[styles.totalValue, { color: colors.text }]}>1.8 GB</Text>
              <Text style={[styles.totalLabel, { color: colors.muted }]}>Total data used</Text>
              <View style={styles.statRow}>
                <View style={[styles.statCard, { backgroundColor: colors.highlight }]}>
                  <Text style={[styles.statValue, { color: colors.text }]}>1.3 GB</Text>
                  <Text style={[styles.statLabel, { color: colors.muted }]}>Mobile</Text>
                </View>
                <View style={[styles.statCard, { backgroundColor: colors.highlight }]}>
                  <Text style={[styles.statValue, { color: colors.text }]}>0.5 GB</Text>
                  <Text style={[styles.statLabel, { color: colors.muted }]}>Wi-Fi</Text>
                </View>
              </View>
              <View style={styles.statRow}>
                <View style={styles.inlineStat}>
                  <MaterialIcons name="schedule" size={16} color={colors.accent} />
                  <Text style={[styles.inlineText, { color: colors.muted }]}>Peak 6-8 PM</Text>
                </View>
                <View style={styles.inlineStat}>
                  <MaterialIcons name="wifi" size={16} color={colors.accent} />
                  <Text style={[styles.inlineText, { color: colors.muted }]}>79% on mobile</Text>
                </View>
              </View>
            </View>
          </StaggeredReveal>

          <StaggeredReveal index={2}>
            <View style={[styles.card, getCardStyle(colors)]}>
              <View style={styles.cardHeader}>
                <Text style={[styles.cardTitle, { color: colors.text }]}>Hourly Usage</Text>
                <Text style={[styles.cardMeta, { color: colors.muted }]}>12 hours</Text>
              </View>
              <View style={styles.chart}>
                {hourlyUsage.map((value, index) => (
                  <View key={`hour-${index}`} style={styles.chartBarWrap}>
                    <View
                      style={[
                        styles.chartBar,
                        {
                          height: 26 + value * 70,
                          backgroundColor: index % 3 === 0 ? colors.accentWarm : colors.accent,
                        },
                      ]}
                    />
                  </View>
                ))}
              </View>
              <View style={styles.chartLabels}>
                <Text style={[styles.chartLabel, { color: colors.muted }]}>8 AM</Text>
                <Text style={[styles.chartLabel, { color: colors.muted }]}>2 PM</Text>
                <Text style={[styles.chartLabel, { color: colors.muted }]}>8 PM</Text>
              </View>
            </View>
          </StaggeredReveal>

          <StaggeredReveal index={3}>
            <View style={[styles.card, getCardStyle(colors)]}>
              <View style={styles.cardHeader}>
                <Text style={[styles.cardTitle, { color: colors.text }]}>Top Consumers</Text>
                <MaterialIcons name="trending-up" size={18} color={colors.muted} />
              </View>
              {topApps.map((app) => (
                <View key={app.id} style={styles.topAppRow}>
                  <View style={styles.topAppHeader}>
                    <View style={styles.topAppTitle}>
                      <MaterialIcons name={app.icon} size={18} color={colors.accent} />
                      <Text style={[styles.topAppName, { color: colors.text }]}>{app.name}</Text>
                    </View>
                    <Text style={[styles.topAppAmount, { color: colors.muted }]}>
                      {app.amount}
                    </Text>
                  </View>
                  <View style={[styles.progressTrack, { backgroundColor: colors.highlight }]}>
                    <View
                      style={[
                        styles.progressFill,
                        { width: `${Math.round(app.usage * 100)}%`, backgroundColor: colors.accent },
                      ]}
                    />
                  </View>
                </View>
              ))}
            </View>
          </StaggeredReveal>

          <StaggeredReveal index={4}>
            <View style={[styles.card, getCardStyle(colors)]}>
              <View style={styles.cardHeader}>
                <Text style={[styles.cardTitle, { color: colors.text }]}>Keep Data in Check</Text>
                <MaterialIcons name="lightbulb" size={18} color={colors.accentWarm} />
              </View>
              <Text style={[styles.bodyText, { color: colors.muted }]}>
                Set a daily cap and get alerts when an app spikes in the background. Most people
                only notice data drain after the bill arrives.
              </Text>
              <View style={styles.tipRow}>
                <MaterialIcons name="notifications-active" size={16} color={colors.accent} />
                <Text style={[styles.tipText, { color: colors.muted }]}>
                  Alerts are local, no account required.
                </Text>
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
          { backgroundColor: colors.accentWarm, opacity: 0.3 },
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
    fontSize: 30,
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
  totalValue: {
    fontSize: 34,
    fontFamily: fonts.title,
  },
  totalLabel: {
    fontSize: 13,
    fontFamily: fonts.body,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  statRow: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  statCard: {
    flex: 1,
    minWidth: 140,
    padding: 12,
    borderRadius: 14,
    gap: 4,
  },
  statValue: {
    fontSize: 18,
    fontFamily: fonts.title,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: fonts.body,
  },
  inlineStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  inlineText: {
    fontSize: 12,
    fontFamily: fonts.body,
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 6,
    paddingTop: 6,
  },
  chartBarWrap: {
    flex: 1,
    alignItems: 'center',
  },
  chartBar: {
    width: 10,
    borderRadius: 999,
  },
  chartLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  chartLabel: {
    fontSize: 11,
    fontFamily: fonts.body,
  },
  topAppRow: {
    gap: 8,
  },
  topAppHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topAppTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  topAppName: {
    fontSize: 15,
    fontFamily: fonts.body,
  },
  topAppAmount: {
    fontSize: 12,
    fontFamily: fonts.body,
  },
  progressTrack: {
    height: 8,
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressFill: {
    height: 8,
    borderRadius: 999,
  },
  bodyText: {
    fontSize: 14,
    lineHeight: 21,
    fontFamily: fonts.body,
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tipText: {
    fontSize: 12,
    fontFamily: fonts.body,
  },
  orb: {
    position: 'absolute',
    borderRadius: 999,
  },
  orbPrimary: {
    width: 240,
    height: 240,
    top: -70,
    right: -70,
  },
  orbSecondary: {
    width: 200,
    height: 200,
    bottom: 200,
    left: -70,
  },
  orbTertiary: {
    width: 150,
    height: 150,
    bottom: -30,
    right: -30,
  },
});
