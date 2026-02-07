import { useColorScheme } from "react-native";

import { colors, ThemeColors } from "./tokens";

export function useTheme(): ThemeColors {
  const scheme = useColorScheme();
  return scheme === "dark" ? colors.dark : colors.light;
}
