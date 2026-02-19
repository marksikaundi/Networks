import { type ComponentProps, useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View, type ViewStyle } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { StaggeredReveal } from '@/components/ui/staggered-reveal';
import { getMonitorColors, fonts, type MonitorColors } from '@/constants/monitor-theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type IconName = ComponentProps<typeof MaterialIcons>['name'];

const values: {
  id: string;
  title: string;
  body: string;
  icon: IconName;
}[] = [
  {
    id: 'privacy',
    title: 'Private by default',
    body: 'Data stays on your phone. No cloud uploads for app-level usage.',
    icon: 'verified-user',
  },
  {
    id: 'clarity',
    title: 'Clear insight',
    body: 'Real-time speed and daily summaries explain where data goes.',
    icon: 'insights',
  },
  {
    id: 'lightweight',
    title: 'Simple setup',
    body: 'No account creation, no complicated onboarding, no clutter.',
    icon: 'bolt',
  },
];

export default function AboutUsScreen() {
  const colorScheme = useColorScheme();
  const colors = useMemo(() => getMonitorColors(colorScheme), [colorScheme]);
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <View style={styles.screen}>
        <BackgroundGlow colors={colors} />
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: Math.max(insets.top + 4, 20) }]}
        showsVerticalScrollIndicator={false}>
        <StaggeredReveal index={0}>
          <View style={[styles.heroCard, getCardStyle(colors)]}>
            <View style={styles.header}>
              <View style={[styles.badge, { backgroundColor: colors.accentSoft }]}>
                <MaterialIcons name="info-outline" size={14} color={colors.accent} />
                <Text style={[styles.badgeText, { color: colors.accent }]}>About us</Text>
              </View>
              <Text style={[styles.title, { color: colors.text }]}>Networks</Text>
              <Text style={[styles.subtitle, { color: colors.muted }]}>
                Professional, privacy-first network visibility for everyday mobile users.
              </Text>
            </View>
            <View style={styles.heroStatsRow}>
              <View style={[styles.heroStatCard, { backgroundColor: colors.highlight }]}>
                <Text style={[styles.heroStatValue, { color: colors.text }]}>On-device</Text>
                <Text style={[styles.heroStatLabel, { color: colors.muted }]}>Processing</Text>
              </View>
              <View style={[styles.heroStatCard, { backgroundColor: colors.highlight }]}>
                <Text style={[styles.heroStatValue, { color: colors.text }]}>No sign-in</Text>
                <Text style={[styles.heroStatLabel, { color: colors.muted }]}>Required</Text>
              </View>
              <View style={[styles.heroStatCard, { backgroundColor: colors.highlight }]}>
                <Text style={[styles.heroStatValue, { color: colors.text }]}>Real-time</Text>
                <Text style={[styles.heroStatLabel, { color: colors.muted }]}>Monitoring</Text>
              </View>
            </View>
          </View>
        </StaggeredReveal>

        <StaggeredReveal index={1}>
          <View style={[styles.card, getCardStyle(colors)]}>
            <View style={styles.cardHeader}>
              <MaterialIcons name="flag" size={18} color={colors.accent} />
              <Text style={[styles.cardTitle, { color: colors.text }]}>Our mission</Text>
            </View>
            <Text style={[styles.body, { color: colors.muted }]}>
              Networks helps people understand internet usage with confidence. We focus on clear
              numbers, calm design, and insights that are useful in real life.
            </Text>
          </View>
        </StaggeredReveal>

        <StaggeredReveal index={2}>
          <View style={[styles.card, getCardStyle(colors)]}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>Why people trust Networks</Text>
            {values.map((value, index) => (
              <View key={value.id} style={[styles.valueRow, index === values.length - 1 ? styles.valueRowLast : null]}>
                <View style={[styles.valueIcon, { backgroundColor: colors.highlight }]}>
                  <MaterialIcons name={value.icon} size={16} color={colors.accent} />
                </View>
                <View style={styles.valueBody}>
                  <Text style={[styles.valueTitle, { color: colors.text }]}>{value.title}</Text>
                  <Text style={[styles.valueText, { color: colors.muted }]}>{value.body}</Text>
                </View>
              </View>
            ))}
          </View>
        </StaggeredReveal>

        <StaggeredReveal index={3}>
          <View style={[styles.card, getCardStyle(colors)]}>
            <View style={styles.cardHeader}>
              <MaterialIcons name="integration-instructions" size={18} color={colors.accent} />
              <Text style={[styles.cardTitle, { color: colors.text }]}>What this app includes</Text>
            </View>
            <View style={styles.featureGrid}>
              <View style={[styles.featurePill, { borderColor: colors.stroke }]}>
                <MaterialIcons name="speed" size={14} color={colors.accent} />
                <Text style={[styles.featureText, { color: colors.muted }]}>Live speed checks</Text>
              </View>
              <View style={[styles.featurePill, { borderColor: colors.stroke }]}>
                <MaterialIcons name="pie-chart-outline" size={14} color={colors.accent} />
                <Text style={[styles.featureText, { color: colors.muted }]}>Daily summaries</Text>
              </View>
              <View style={[styles.featurePill, { borderColor: colors.stroke }]}>
                <MaterialIcons name="apps" size={14} color={colors.accent} />
                <Text style={[styles.featureText, { color: colors.muted }]}>Per-app activity</Text>
              </View>
              <View style={[styles.featurePill, { borderColor: colors.stroke }]}>
                <MaterialIcons name="lock" size={14} color={colors.accent} />
                <Text style={[styles.featureText, { color: colors.muted }]}>Local-only data</Text>
              </View>
            </View>
          </View>
        </StaggeredReveal>

        <StaggeredReveal index={4}>
          <View style={[styles.card, getCardStyle(colors)]}>
            <View style={styles.versionRow}>
              <Text style={[styles.versionLabel, { color: colors.muted }]}>Version</Text>
              <Text style={[styles.meta, { color: colors.text }]}>1.0.0</Text>
            </View>
            <View style={styles.versionRow}>
              <Text style={[styles.versionLabel, { color: colors.muted }]}>Support</Text>
              <Text style={[styles.meta, { color: colors.text }]}>help@networks.app</Text>
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
    paddingHorizontal: 20,
    paddingBottom: 36,
    gap: 14,
  },
  header: {
    gap: 10,
  },
  heroCard: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 18,
    gap: 16,
    shadowOpacity: 0.16,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  badgeText: {
    fontFamily: fonts.body,
    fontSize: 12,
    letterSpacing: 0.25,
  },
  title: {
    fontFamily: fonts.title,
    fontSize: 36,
    letterSpacing: 0.4,
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 15,
    lineHeight: 23,
  },
  heroStatsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  heroStatCard: {
    flex: 1,
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 12,
    gap: 3,
  },
  heroStatValue: {
    fontFamily: fonts.title,
    fontSize: 14,
  },
  heroStatLabel: {
    fontFamily: fonts.body,
    fontSize: 12,
  },
  card: {
    borderRadius: 22,
    borderWidth: 1,
    padding: 18,
    gap: 8,
    shadowOpacity: 0.14,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardTitle: {
    fontFamily: fonts.title,
    fontSize: 20,
    letterSpacing: 0.3,
  },
  body: {
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 22,
  },
  valueRow: {
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#A8B2B5',
  },
  valueRowLast: {
    borderBottomWidth: 0,
    paddingBottom: 2,
  },
  valueIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  valueBody: {
    flex: 1,
    gap: 3,
  },
  valueTitle: {
    fontFamily: fonts.title,
    fontSize: 16,
  },
  valueText: {
    fontFamily: fonts.body,
    fontSize: 13,
    lineHeight: 20,
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  featurePill: {
    minWidth: '47%',
    flexGrow: 1,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 11,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureText: {
    fontFamily: fonts.body,
    fontSize: 13,
  },
  versionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  versionLabel: {
    fontFamily: fonts.body,
    fontSize: 13,
    letterSpacing: 0.2,
  },
  meta: {
    fontFamily: fonts.mono,
    fontSize: 14,
  },
  orb: {
    position: 'absolute',
    borderRadius: 999,
  },
  orbPrimary: {
    width: 260,
    height: 260,
    top: -120,
    right: -70,
    opacity: 0.55,
  },
  orbSecondary: {
    width: 190,
    height: 190,
    bottom: 80,
    left: -55,
  },
  orbTertiary: {
    width: 140,
    height: 140,
    top: 300,
    right: -36,
    opacity: 0.42,
  },
});
