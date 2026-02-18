import { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { StaggeredReveal } from '@/components/ui/staggered-reveal';
import { getMonitorColors, fonts } from '@/constants/monitor-theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function AboutUsScreen() {
  const colorScheme = useColorScheme();
  const colors = useMemo(() => getMonitorColors(colorScheme), [colorScheme]);
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: Math.max(insets.top + 4, 20) }]}
        showsVerticalScrollIndicator={false}>
        <StaggeredReveal index={0}>
          <View style={styles.header}>
            <View style={[styles.badge, { backgroundColor: colors.accentSoft }]}>
              <MaterialIcons name="info-outline" size={14} color={colors.accent} />
              <Text style={[styles.badgeText, { color: colors.accent }]}>About us</Text>
            </View>
            <Text style={[styles.title, { color: colors.text }]}>Networks</Text>
            <Text style={[styles.subtitle, { color: colors.muted }]}>
              We build privacy-first tools that help people understand data usage clearly.
            </Text>
          </View>
        </StaggeredReveal>

        <StaggeredReveal index={1}>
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.stroke }]}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>What this app does</Text>
            <Text style={[styles.body, { color: colors.muted }]}>
              Networks shows live speeds, daily usage summaries, and app-level internet activity so
              you can spot data-heavy apps faster.
            </Text>
          </View>
        </StaggeredReveal>

        <StaggeredReveal index={2}>
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.stroke }]}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>Privacy</Text>
            <Text style={[styles.body, { color: colors.muted }]}>
              Monitoring runs on-device. We do not require an account and we do not upload your
              usage data.
            </Text>
          </View>
        </StaggeredReveal>

        <StaggeredReveal index={3}>
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.stroke }]}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>Version</Text>
            <Text style={[styles.meta, { color: colors.muted }]}>1.0.0</Text>
          </View>
        </StaggeredReveal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 36,
    gap: 12,
  },
  header: {
    gap: 10,
    marginBottom: 6,
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
    fontSize: 38,
    letterSpacing: 0.4,
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 15,
    lineHeight: 23,
  },
  card: {
    borderRadius: 22,
    borderWidth: 1,
    padding: 18,
    gap: 8,
  },
  cardTitle: {
    fontFamily: fonts.title,
    fontSize: 22,
    letterSpacing: 0.3,
  },
  body: {
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 22,
  },
  meta: {
    fontFamily: fonts.mono,
    fontSize: 13,
  },
});
