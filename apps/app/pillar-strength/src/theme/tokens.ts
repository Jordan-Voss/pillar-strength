export const tokens = {
  space: { xs: 8, sm: 12, md: 16, lg: 24, xl: 32 },
  radius: { sm: 10, md: 14, lg: 18, xl: 24 },
  font: { title: 22, heading: 18, body: 16, small: 13 },
} as const;

export const colors = {
  light: {
    background: "#F9FAFB",
    card: "#FFFFFF",
    border: "#E5E7EB",

    textPrimary: "#111827",
    textSecondary: "#6B7280",
    textMuted: "#9CA3AF",

    primary: "#1F2937",
    accent: "#2563EB",
    accentSoft: "#DBEAFE",

    success: "#16A34A",
    error: "#DC2626",
    errorSoft: "#FEF2F2",
    info: "#2563EB",
    infoSoft: "#EEF2FF",
    white: "#FFFFFF",
    transparent: "transparent",
  },
  dark: {
    background: "#0B1220",
    card: "#0F1A2B",
    border: "#22314A",

    textPrimary: "#E5E7EB",
    textSecondary: "#B6C0CE",
    textMuted: "#8B97AA",

    primary: "#E5E7EB",
    accent: "#60A5FA",
    accentSoft: "#0B2A55",

    success: "#22C55E",
    error: "#F87171",
    errorSoft: "#2A1216",
    info: "#60A5FA",
    infoSoft: "#0B2A55",
    white: "#FFFFFF",
    transparent: "transparent",
  },
} as const;

// ✅ define the SHAPE, not the literal values
export type ThemeColors = {
  background: string;
  card: string;
  border: string;

  textPrimary: string;
  textSecondary: string;
  textMuted: string;

  primary: string;
  accent: string;
  accentSoft: string;

  success: string;
  error: string;
  errorSoft: string;
  info: string;
  infoSoft: string;
  white: string;
  transparent: string;
};

export type ThemeName = "light" | "dark";

// #15803D (green-700)
