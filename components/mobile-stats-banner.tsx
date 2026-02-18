import { StyleSheet, Text, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { fonts, type MonitorColors } from '@/constants/monitor-theme';

type MobileStatsBannerProps = {
  colors: MonitorColors;
  status: 'reporting' | 'needs-permission' | 'limited';
};

export function MobileStatsBanner({ colors, status }: MobileStatsBannerProps) {
  const content = getContent(status);
  const toneColor = status === 'reporting' ? colors.good : colors.accentWarm;

  return (
    <View style={[styles.container, { backgroundColor: colors.highlight, borderColor: colors.stroke }]}>
      <View style={[styles.iconWrap, { backgroundColor: colors.accentSoft }]}>
        <MaterialIcons name={content.icon} size={18} color={toneColor} />
      </View>
      <View style={styles.textWrap}>
        <Text style={[styles.title, { color: colors.text }]}>{content.title}</Text>
        <Text style={[styles.subtitle, { color: colors.muted }]}>{content.subtitle}</Text>
      </View>
    </View>
  );
}

const getContent = (status: MobileStatsBannerProps['status']) => {
  switch (status) {
    case 'reporting':
      return {
        icon: 'check-circle' as const,
        title: 'Mobile stats: reporting',
        subtitle: 'Per-app mobile usage is updating.',
      };
    case 'needs-permission':
      return {
        icon: 'lock' as const,
        title: 'Mobile stats: off',
        subtitle: 'Phone permission required to read mobile usage.',
      };
    case 'limited':
    default:
      return {
        icon: 'info' as const,
        title: 'Mobile stats: limited',
        subtitle: 'Android 10+ restricts per-app mobile details.',
      };
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrap: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: 14,
    fontFamily: fonts.body,
  },
  subtitle: {
    fontSize: 11,
    fontFamily: fonts.body,
  },
});
