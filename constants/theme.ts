/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#0D8B8C';
const tintColorDark = '#68D4CC';

export const Colors = {
  light: {
    text: '#0E1C20',
    background: '#F7F2EC',
    tint: tintColorLight,
    icon: '#6B7C80',
    tabIconDefault: '#6B7C80',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#EAF1F2',
    background: '#0F1517',
    tint: tintColorDark,
    icon: '#9CB0B4',
    tabIconDefault: '#9CB0B4',
    tabIconSelected: tintColorDark,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'Avenir Next',
    serif: 'Georgia',
    rounded: 'Avenir Next',
    mono: 'Menlo',
  },
  default: {
    sans: 'sans-serif-medium',
    serif: 'serif',
    rounded: 'sans-serif-medium',
    mono: 'monospace',
  },
  web: {
    sans: "'Avenir Next', 'Segoe UI', 'Noto Sans', sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'Avenir Next', 'Segoe UI', 'Noto Sans', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
