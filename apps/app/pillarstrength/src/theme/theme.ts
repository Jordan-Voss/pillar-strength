// Define base colors for reuse
const BASE_COLORS = {
  // Light theme palette
  WHITE: '#FFFFFF',
  OFF_WHITE: '#F5F7FA',
  LIGHT_GRAY: '#F8F9FA',
  BORDER_GRAY: '#ECF0F1',
  MEDIUM_GRAY: '#BDC3C7',
  SLATE_LIGHT: '#7F8C8D',
  SLATE: '#34495E',
  SLATE_LIGHTER: '#4A6484',

  
  // Dark theme palette
  DARK_BG: '#2E3E54',
  DARKER_BG: '#263545',
  DARK_SURFACE: '#2C3E50',
  DARK_ELEVATED: '#34495E',
  DARK_CARD: '#34495E',
  DARK_BORDER: '#1C2833',
  
  // Accent colors
  RED: '#E74C3C',
  BLUE: '#3498DB',
  GREEN: '#2ECC71',
  YELLOW: '#F1C40F',
  ORANGE: '#E67E22',
  TEAL: '#1ABC9C',
  ERROR_RED: '#DC3545',
};

export const lightTheme = {
  name: 'light',
  
  colors: {
    // Core UI surfaces
    bg: {
      primary: BASE_COLORS.OFF_WHITE,        // Main app background
      secondary: BASE_COLORS.WHITE,          // Cards, sections, headers
      tertiary: BASE_COLORS.LIGHT_GRAY,      // Secondary cards, highlights
      elevated: BASE_COLORS.WHITE,           // Elevated elements (modals, dropdowns)
      dropDown: BASE_COLORS.WHITE,
    },
    
    // Surface variants for different components
    surface: {
      primary: BASE_COLORS.OFF_WHITE,        // Main content area background
      secondary: BASE_COLORS.WHITE,          // Card backgrounds
      elevated: BASE_COLORS.WHITE,           // Elevated cards or dialogs
      header: BASE_COLORS.WHITE,             // Header background
      sectionHeader: BASE_COLORS.LIGHT_GRAY, // Section header backgrounds
    },
    
    // Interactive elements
    interactive: {
      primary: BASE_COLORS.RED,              // Primary buttons, selected items
      secondary: BASE_COLORS.BLUE,           // Secondary actions
      tertiary: BASE_COLORS.TEAL,            // Tertiary actions
      critical: BASE_COLORS.RED,             // Important alerts, notifications
      positive: BASE_COLORS.GREEN,           // Success states
      caution: BASE_COLORS.YELLOW,           // Warning states
      disabled: BASE_COLORS.MEDIUM_GRAY,     // Disabled state
    },
    
    // Text hierarchy
    text: {
      primary: BASE_COLORS.SLATE,            // Primary text (titles, important)
      secondary: BASE_COLORS.SLATE_LIGHT,    // Secondary text (descriptions)
      subtle: BASE_COLORS.MEDIUM_GRAY,       // Subtle text (hints, captions)
      inverse: BASE_COLORS.WHITE,            // Text on dark backgrounds
      accent: BASE_COLORS.RED,               // Highlighted text
      link: BASE_COLORS.BLUE,                // Links
      disabled: BASE_COLORS.SLATE_LIGHT,     // Disabled text
    },
    
    // Status indicators
    status: {
      success: BASE_COLORS.GREEN,
      error: BASE_COLORS.ERROR_RED,
      warning: BASE_COLORS.ORANGE,
      info: BASE_COLORS.BLUE,
      live: BASE_COLORS.RED,
      upcoming: BASE_COLORS.BLUE,
      completed: BASE_COLORS.SLATE_LIGHT,
    },
    
    // Navigation elements
    navigation: {
      active: BASE_COLORS.RED,               // Active tab
      inactive: BASE_COLORS.SLATE_LIGHTER,     // Inactive tabs
      background: BASE_COLORS.WHITE,         // Tab bar background
      border: BASE_COLORS.BORDER_GRAY,       // Navigation borders
    },
    
    // Borders and dividers
    border: BASE_COLORS.BORDER_GRAY,         // Standard borders
    
    // Specific component styles
    card: {
      background: BASE_COLORS.WHITE,
      border: BASE_COLORS.BORDER_GRAY,
      shadow: 'rgba(0, 0, 0, 0.05)',
      scoreHighlight: BASE_COLORS.RED,
      headerBackground: BASE_COLORS.WHITE,
    },
    
    // League section styles
    league: {
      headerBackground: BASE_COLORS.WHITE,
      itemBackground: BASE_COLORS.WHITE,
    },
    
    // Match-specific styles
    match: {
      live: BASE_COLORS.RED,
      upcoming: BASE_COLORS.BLUE,
      completed: BASE_COLORS.SLATE_LIGHT,
      homeTeamText: BASE_COLORS.SLATE,
      awayTeamText: BASE_COLORS.SLATE,
      scoreText: BASE_COLORS.RED,
      timeText: BASE_COLORS.SLATE_LIGHT,
    },
    
    // Calendar/date selector styles
    calendar: {
      selectedDay: BASE_COLORS.RED,
      selectedDayText: BASE_COLORS.WHITE,
      normalDay: BASE_COLORS.WHITE,
      normalDayText: BASE_COLORS.SLATE,
      todayIndicator: BASE_COLORS.RED,
      weekdayText: BASE_COLORS.SLATE_LIGHT,
    },
    
    // Rugby-specific elements
    pitch: {
      background: '#27AE60',                // Bright green for field
      lines: BASE_COLORS.WHITE,
      text: BASE_COLORS.WHITE,
    },
    
    // Score elements
    score: {
      primary: BASE_COLORS.RED,
      secondary: BASE_COLORS.SLATE,
      divider: BASE_COLORS.SLATE_LIGHT,
    },
    
    // Form elements
    input: {
      background: BASE_COLORS.WHITE,
      text: BASE_COLORS.SLATE,
      placeholder: BASE_COLORS.MEDIUM_GRAY,
      border: BASE_COLORS.BORDER_GRAY,
      focusBorder: BASE_COLORS.BLUE,
      error: BASE_COLORS.RED,
    },
    
    // Stats elements
    stats: {
      positive: BASE_COLORS.GREEN,
      negative: BASE_COLORS.RED,
      neutral: BASE_COLORS.BLUE,
      barBackground: BASE_COLORS.LIGHT_GRAY,
      textPrimary: BASE_COLORS.SLATE,
      textSecondary: BASE_COLORS.SLATE_LIGHT,
    },
  },
  
  // You can also define spacing, typography, etc. here
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
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
    },
    lg: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
      elevation: 4,
    },
  },
};

// Dark theme that mirrors the structure of the light theme
export const darkTheme = {
  name: 'dark',
  
  colors: {
    // Core UI surfaces
    bg: {
      primary: BASE_COLORS.DARK_BG,         // Main app background
      secondary: BASE_COLORS.DARK_SURFACE,   // Cards, sections, headers
      tertiary: BASE_COLORS.DARK_ELEVATED,   // Secondary cards, highlights
      elevated: BASE_COLORS.DARK_ELEVATED,   // Elevated elements
      dropDown: BASE_COLORS.DARKER_BG,       // Dropdown background
    },
    
    // Surface variants for different components
    surface: {
      primary: BASE_COLORS.DARK_BG,         // Main content area background
      secondary: BASE_COLORS.DARK_SURFACE,   // Card backgrounds
      elevated: BASE_COLORS.DARK_ELEVATED,   // Elevated cards or dialogs
      header: BASE_COLORS.DARK_BG,           // Header background
      sectionHeader: BASE_COLORS.DARK_SURFACE, // Section header backgrounds
    },
    
    // Interactive elements
    interactive: {
      primary: BASE_COLORS.ORANGE,           // Primary buttons, selected items
      secondary: BASE_COLORS.TEAL,           // Secondary actions
      tertiary: BASE_COLORS.BLUE,            // Tertiary actions
      critical: BASE_COLORS.ORANGE,          // Important alerts, notifications
      positive: BASE_COLORS.GREEN,           // Success states
      caution: BASE_COLORS.YELLOW,           // Warning states
      disabled: BASE_COLORS.SLATE_LIGHT,     // Disabled state
    },
    
    // Text hierarchy
    text: {
      primary: BASE_COLORS.WHITE,            // Primary text (titles, important)
      secondary: BASE_COLORS.LIGHT_GRAY,     // Secondary text (descriptions)
      subtle: '#B2BEC3',                     // Subtle text (hints, captions)
      inverse: BASE_COLORS.SLATE,            // Text on light backgrounds
      accent: BASE_COLORS.ORANGE,            // Highlighted text
      link: BASE_COLORS.TEAL,                // Links
      disabled: BASE_COLORS.SLATE_LIGHT,     // Disabled text
    },
    
    // Status indicators
    status: {
      success: BASE_COLORS.TEAL,
      error: BASE_COLORS.ERROR_RED,
      warning: BASE_COLORS.ORANGE,
      info: BASE_COLORS.BLUE,
      live: BASE_COLORS.ORANGE,
      upcoming: BASE_COLORS.BLUE,
      completed: BASE_COLORS.LIGHT_GRAY,
    },
    
    // Navigation elements
    navigation: {
      active: BASE_COLORS.BLUE,              // Active tab
      inactive: '#B2BEC3',                   // Inactive tabs
      background: BASE_COLORS.SLATE,         // Tab bar background
      border: BASE_COLORS.DARK_BORDER,       // Navigation borders
    },
    
    // Borders and dividers
    border: BASE_COLORS.SLATE,               // Standard borders
    
    // Specific component styles
    card: {
      background: BASE_COLORS.DARK_SURFACE,
      border: BASE_COLORS.DARK_BORDER,
      shadow: 'rgba(0, 0, 0, 0.2)',
      scoreHighlight: BASE_COLORS.ORANGE,
      headerBackground: BASE_COLORS.DARK_ELEVATED,
    },
    
    // League section styles
    league: {
      headerBackground: BASE_COLORS.DARK_SURFACE,
      itemBackground: BASE_COLORS.DARK_ELEVATED,
    },
    
    // Match-specific styles
    match: {
      live: BASE_COLORS.ORANGE,
      upcoming: BASE_COLORS.BLUE,
      completed: BASE_COLORS.LIGHT_GRAY,
      homeTeamText: BASE_COLORS.WHITE,
      awayTeamText: BASE_COLORS.WHITE,
      scoreText: BASE_COLORS.ORANGE,
      timeText: BASE_COLORS.LIGHT_GRAY,
    },
    
    // Calendar/date selector styles
    calendar: {
      selectedDay: BASE_COLORS.ORANGE,
      selectedDayText: BASE_COLORS.WHITE,
      normalDay: BASE_COLORS.DARK_SURFACE,
      normalDayText: BASE_COLORS.WHITE,
      todayIndicator: BASE_COLORS.ORANGE,
      weekdayText: BASE_COLORS.LIGHT_GRAY,
    },
    
    // Rugby-specific elements
    pitch: {
      background: BASE_COLORS.SLATE,         // Darker field for dark mode
      lines: BASE_COLORS.WHITE,
      text: BASE_COLORS.WHITE,
    },
    
    // Score elements
    score: {
      primary: BASE_COLORS.ORANGE,
      secondary: BASE_COLORS.WHITE,
      divider: BASE_COLORS.LIGHT_GRAY,
    },
    
    // Form elements
    input: {
      background: BASE_COLORS.DARK_ELEVATED,
      text: BASE_COLORS.WHITE,
      placeholder: BASE_COLORS.LIGHT_GRAY,
      border: BASE_COLORS.DARK_BORDER,
      focusBorder: BASE_COLORS.TEAL,
      error: BASE_COLORS.ERROR_RED,
    },
    
    // Stats elements
    stats: {
      positive: BASE_COLORS.GREEN,
      negative: BASE_COLORS.ERROR_RED,
      neutral: BASE_COLORS.BLUE,
      barBackground: BASE_COLORS.DARK_ELEVATED,
      textPrimary: BASE_COLORS.WHITE,
      textSecondary: BASE_COLORS.LIGHT_GRAY,
    },
  },
  
  // Reuse the same spacing and border radius for consistency
  spacing: lightTheme.spacing,
  borderRadius: lightTheme.borderRadius,
  
  // Adjusted shadows for dark mode
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
      shadowOpacity: 0.3,
      shadowRadius: 3,
      elevation: 2,
    },
    md: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.4,
      shadowRadius: 4,
      elevation: 3,
    },
    lg: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.5,
      shadowRadius: 8,
      elevation: 5,
    },
  },
};

// Type definition for the theme
export type Theme = {
  name: string;
  colors: {
    bg: {
      primary: string;
      secondary: string;
      tertiary: string;
      elevated: string;
      dropDown: string;
    };
    surface: {
      primary: string;
      secondary: string;
      elevated: string;
      header: string;
      sectionHeader: string;
    };
    interactive: {
      primary: string;
      secondary: string;
      tertiary: string;
      critical: string;
      positive: string;
      caution: string;
      disabled: string;
    };
    text: {
      primary: string;
      secondary: string;
      subtle: string;
      inverse: string;
      accent: string;
      link: string;
      disabled: string;
    };
    status: {
      success: string;
      error: string;
      warning: string;
      info: string;
      live: string;
      upcoming: string;
      completed: string;
    };
    navigation: {
      active: string;
      inactive: string;
      background: string;
      border: string;
    };
    border: string;
    card: {
      background: string;
      border: string;
      shadow: string;
      scoreHighlight: string;
      headerBackground: string;
    };
    league: {
      headerBackground: string;
      itemBackground: string;
    };
    match: {
      live: string;
      upcoming: string;
      completed: string;
      homeTeamText: string;
      awayTeamText: string;
      scoreText: string;
      timeText: string;
    };
    calendar: {
      selectedDay: string;
      selectedDayText: string;
      normalDay: string;
      normalDayText: string;
      todayIndicator: string;
      weekdayText: string;
    };
    pitch: {
      background: string;
      lines: string;
      text: string;
    };
    score: {
      primary: string;
      secondary: string;
      divider: string;
    };
    input: {
      background: string;
      text: string;
      placeholder: string;
      border: string;
      focusBorder: string;
      error: string;
    };
    stats: {
      positive: string;
      negative: string;
      neutral: string;
      barBackground: string;
      textPrimary: string;
      textSecondary: string;
    };
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    pill: number;
  };
  shadows: {
    none: {
      shadowColor: string;
      shadowOffset: { width: number; height: number };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
    sm: {
      shadowColor: string;
      shadowOffset: { width: number; height: number };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
    md: {
      shadowColor: string;
      shadowOffset: { width: number; height: number };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
    lg: {
      shadowColor: string;
      shadowOffset: { width: number; height: number };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
  };
};

export type ThemeName = 'light' | 'dark';

export const themes = {
  light: lightTheme,
  dark: darkTheme,
} as const;

export const theme = lightTheme;