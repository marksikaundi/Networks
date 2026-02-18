import { Platform, type ColorSchemeName } from 'react-native';

export const fonts = {
  title: Platform.select({
    ios: 'Georgia',
    android: 'serif',
    default: 'serif',
  }),
  body: Platform.select({
    ios: 'Avenir Next',
    android: 'sans-serif-medium',
    default: 'sans-serif',
  }),
  mono: Platform.select({
    ios: 'Menlo',
    android: 'monospace',
    default: 'monospace',
  }),
};

const lightColors = {
  background: '#F7F2EC',
  surface: '#FFFFFF',
  card: '#FFFFFF',
  text: '#0E1C20',
  muted: '#6B7C80',
  accent: '#0D8B8C',
  accentSoft: '#CFF1EE',
  accentWarm: '#F2B261',
  stroke: '#E5DFD6',
  good: '#2EAD74',
  warning: '#F0A24B',
  highlight: '#E8F4F2',
  shadow: 'rgba(14, 28, 32, 0.12)',
};

const darkColors: typeof lightColors = {
  background: '#0F1517',
  surface: '#151D21',
  card: '#1A2429',
  text: '#EAF1F2',
  muted: '#9CB0B4',
  accent: '#68D4CC',
  accentSoft: '#1C3A3B',
  accentWarm: '#F0B261',
  stroke: '#253137',
  good: '#48C78E',
  warning: '#F1B06B',
  highlight: '#142326',
  shadow: 'rgba(0, 0, 0, 0.4)',
};

export type MonitorColors = typeof lightColors;

export const getMonitorColors = (scheme?: ColorSchemeName | null) =>
  scheme === 'dark' ? darkColors : lightColors;
