// src/theme/theme.ts

const BRAND_COLORS = {
  // Core brand
  NAVY: '#0E1D3D',
  NAVY_ELEVATED: '#13264D',
  NAVY_LIGHT: '#1B3566',
  NAVY_DARK: '#081225',

  SKY_BLUE: '#8EBAE3',
  SKY_BLUE_BRIGHT: '#A7CCEE',
  SKY_BLUE_DARK: '#5F95C4',

  CRIMSON: '#D7263D',
  CRIMSON_DARK: '#B71F32',
  CRIMSON_LIGHT: '#EF4A5F',

  WHITE: '#FFFFFF',
  OFF_WHITE: '#F5F7FA',
  LIGHT_SURFACE: '#EEF2F7',

  SLATE_100: '#E8ECF2',
  SLATE_200: '#D0D8E2',
  SLATE_300: '#AAB7C8',
  SLATE_400: '#7B8CA5',
  SLATE_500: '#5A6B84',
  SLATE_600: '#3D4C63',
  SLATE_700: '#27354A',

  SUCCESS: '#2ECC71',
  WARNING: '#F39C12',
  ERROR: '#E74C3C',
};

export const lightTheme = {
  name: 'light',

  colors: {
    bg: {
      primary: BRAND_COLORS.OFF_WHITE,
      secondary: BRAND_COLORS.WHITE,
      tertiary: BRAND_COLORS.LIGHT_SURFACE,
      elevated: BRAND_COLORS.WHITE,
      dropDown: BRAND_COLORS.WHITE,
    },

    surface: {
      primary: BRAND_COLORS.OFF_WHITE,
      secondary: BRAND_COLORS.WHITE,
      elevated: BRAND_COLORS.WHITE,
      header: BRAND_COLORS.WHITE,
      sectionHeader: BRAND_COLORS.LIGHT_SURFACE,
    },

    interactive: {
      primary: BRAND_COLORS.CRIMSON,
      secondary: BRAND_COLORS.SKY_BLUE,
      tertiary: BRAND_COLORS.NAVY_LIGHT,
      critical: BRAND_COLORS.CRIMSON,
      positive: BRAND_COLORS.SUCCESS,
      caution: BRAND_COLORS.WARNING,
      disabled: BRAND_COLORS.SLATE_300,
    },

    text: {
      primary: BRAND_COLORS.NAVY,
      secondary: BRAND_COLORS.SLATE_500,
      subtle: BRAND_COLORS.SLATE_400,
      inverse: BRAND_COLORS.WHITE,
      accent: BRAND_COLORS.CRIMSON,
      link: BRAND_COLORS.NAVY_LIGHT,
      disabled: BRAND_COLORS.SLATE_400,
    },

    status: {
      success: BRAND_COLORS.SUCCESS,
      error: BRAND_COLORS.ERROR,
      warning: BRAND_COLORS.WARNING,
      info: BRAND_COLORS.SKY_BLUE_DARK,
      live: BRAND_COLORS.CRIMSON,
      upcoming: BRAND_COLORS.SKY_BLUE_DARK,
      completed: BRAND_COLORS.SLATE_400,
    },

    navigation: {
      active: BRAND_COLORS.CRIMSON,
      inactive: BRAND_COLORS.SLATE_400,
      background: BRAND_COLORS.WHITE,
      border: BRAND_COLORS.SLATE_100,
    },

    border: BRAND_COLORS.SLATE_100,

    card: {
      background: BRAND_COLORS.WHITE,
      border: BRAND_COLORS.SLATE_100,
      shadow: 'rgba(14, 29, 61, 0.06)',
      headerBackground: BRAND_COLORS.WHITE,
      highlight: BRAND_COLORS.CRIMSON,
    },

    workout: {
      active: BRAND_COLORS.CRIMSON,
      completed: BRAND_COLORS.SUCCESS,
      skipped: BRAND_COLORS.SLATE_400,
      rest: BRAND_COLORS.SKY_BLUE_DARK,
      pr: BRAND_COLORS.CRIMSON,
    },

    lift: {
      primary: BRAND_COLORS.NAVY,
      secondary: BRAND_COLORS.SLATE_500,
      accent: BRAND_COLORS.CRIMSON,
      volume: BRAND_COLORS.SKY_BLUE_DARK,
      intensity: BRAND_COLORS.CRIMSON,
    },

    calendar: {
      selectedDay: BRAND_COLORS.CRIMSON,
      selectedDayText: BRAND_COLORS.WHITE,
      normalDay: BRAND_COLORS.WHITE,
      normalDayText: BRAND_COLORS.NAVY,
      todayIndicator: BRAND_COLORS.CRIMSON,
      weekdayText: BRAND_COLORS.SLATE_400,
    },

    score: {
      primary: BRAND_COLORS.CRIMSON,
      secondary: BRAND_COLORS.NAVY,
      divider: BRAND_COLORS.SLATE_300,
    },

    input: {
      background: BRAND_COLORS.WHITE,
      text: BRAND_COLORS.NAVY,
      placeholder: BRAND_COLORS.SLATE_400,
      border: BRAND_COLORS.SLATE_100,
      focusBorder: BRAND_COLORS.SKY_BLUE_DARK,
      error: BRAND_COLORS.ERROR,
    },

    stats: {
      positive: BRAND_COLORS.SUCCESS,
      negative: BRAND_COLORS.ERROR,
      neutral: BRAND_COLORS.SKY_BLUE_DARK,
      barBackground: BRAND_COLORS.LIGHT_SURFACE,
      textPrimary: BRAND_COLORS.NAVY,
      textSecondary: BRAND_COLORS.SLATE_500,
    },
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },

  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
    pill: 999,
  },

  shadows: {
    none: {
      shadowColor: 'transparent',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    },
    sm: {
      shadowColor: BRAND_COLORS.NAVY,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: BRAND_COLORS.NAVY,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 2,
    },
    lg: {
      shadowColor: BRAND_COLORS.NAVY,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 8,
      elevation: 4,
    },
  },
};

export const darkTheme = {
  name: 'dark',

  colors: {
    bg: {
      primary: BRAND_COLORS.NAVY,
      secondary: BRAND_COLORS.NAVY_ELEVATED,
      tertiary: BRAND_COLORS.NAVY_LIGHT,
      elevated: BRAND_COLORS.NAVY_ELEVATED,
      dropDown: BRAND_COLORS.NAVY_DARK,
    },

    surface: {
      primary: BRAND_COLORS.NAVY,
      secondary: BRAND_COLORS.NAVY_ELEVATED,
      elevated: BRAND_COLORS.NAVY_LIGHT,
      header: BRAND_COLORS.NAVY,
      sectionHeader: BRAND_COLORS.NAVY_ELEVATED,
    },

    interactive: {
      primary: BRAND_COLORS.CRIMSON,
      secondary: BRAND_COLORS.SKY_BLUE,
      tertiary: BRAND_COLORS.SKY_BLUE_BRIGHT,
      critical: BRAND_COLORS.CRIMSON,
      positive: BRAND_COLORS.SUCCESS,
      caution: BRAND_COLORS.WARNING,
      disabled: BRAND_COLORS.SLATE_500,
    },

    text: {
      primary: BRAND_COLORS.WHITE,
      secondary: BRAND_COLORS.SLATE_200,
      subtle: BRAND_COLORS.SLATE_300,
      inverse: BRAND_COLORS.NAVY,
      accent: BRAND_COLORS.CRIMSON_LIGHT,
      link: BRAND_COLORS.SKY_BLUE,
      disabled: BRAND_COLORS.SLATE_400,
    },

    status: {
      success: BRAND_COLORS.SUCCESS,
      error: BRAND_COLORS.ERROR,
      warning: BRAND_COLORS.WARNING,
      info: BRAND_COLORS.SKY_BLUE,
      live: BRAND_COLORS.CRIMSON,
      upcoming: BRAND_COLORS.SKY_BLUE,
      completed: BRAND_COLORS.SLATE_300,
    },

    navigation: {
      active: BRAND_COLORS.CRIMSON,
      inactive: BRAND_COLORS.SLATE_300,
      background: BRAND_COLORS.NAVY_ELEVATED,
      border: BRAND_COLORS.SLATE_700,
    },

    border: BRAND_COLORS.SLATE_700,

    card: {
      background: BRAND_COLORS.NAVY_ELEVATED,
      border: BRAND_COLORS.SLATE_700,
      shadow: 'rgba(0, 0, 0, 0.35)',
      headerBackground: BRAND_COLORS.NAVY_LIGHT,
      highlight: BRAND_COLORS.CRIMSON,
    },

    workout: {
      active: BRAND_COLORS.CRIMSON,
      completed: BRAND_COLORS.SUCCESS,
      skipped: BRAND_COLORS.SLATE_400,
      rest: BRAND_COLORS.SKY_BLUE,
      pr: BRAND_COLORS.CRIMSON_LIGHT,
    },

    lift: {
      primary: BRAND_COLORS.WHITE,
      secondary: BRAND_COLORS.SLATE_200,
      accent: BRAND_COLORS.CRIMSON_LIGHT,
      volume: BRAND_COLORS.SKY_BLUE,
      intensity: BRAND_COLORS.CRIMSON,
    },

    calendar: {
      selectedDay: BRAND_COLORS.CRIMSON,
      selectedDayText: BRAND_COLORS.WHITE,
      normalDay: BRAND_COLORS.NAVY_ELEVATED,
      normalDayText: BRAND_COLORS.WHITE,
      todayIndicator: BRAND_COLORS.CRIMSON_LIGHT,
      weekdayText: BRAND_COLORS.SLATE_300,
    },

    score: {
      primary: BRAND_COLORS.CRIMSON_LIGHT,
      secondary: BRAND_COLORS.WHITE,
      divider: BRAND_COLORS.SLATE_300,
    },

    input: {
      background: BRAND_COLORS.NAVY_LIGHT,
      text: BRAND_COLORS.WHITE,
      placeholder: BRAND_COLORS.SLATE_300,
      border: BRAND_COLORS.SLATE_700,
      focusBorder: BRAND_COLORS.SKY_BLUE,
      error: BRAND_COLORS.ERROR,
    },

    stats: {
      positive: BRAND_COLORS.SUCCESS,
      negative: BRAND_COLORS.ERROR,
      neutral: BRAND_COLORS.SKY_BLUE,
      barBackground: BRAND_COLORS.NAVY_LIGHT,
      textPrimary: BRAND_COLORS.WHITE,
      textSecondary: BRAND_COLORS.SLATE_200,
    },
  },

  spacing: lightTheme.spacing,
  borderRadius: lightTheme.borderRadius,

  shadows: {
    none: {
      shadowColor: 'transparent',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    },
    sm: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3,
      elevation: 2,
    },
    md: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.35,
      shadowRadius: 5,
      elevation: 3,
    },
    lg: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.45,
      shadowRadius: 8,
      elevation: 5,
    },
  },
};

export type Theme = typeof lightTheme;
export type ThemeName = 'light' | 'dark';

export const themes = {
  light: lightTheme,
  dark: darkTheme,
} as const;

export const theme = lightTheme;

export { BRAND_COLORS };