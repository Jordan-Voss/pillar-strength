import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { tokens } from "../theme/tokens";
import { useTheme } from "../theme/useTheme";

export function Card({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  const t = useTheme();
  return <View style={[styles.card, { backgroundColor: t.card, borderColor: t.border }, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: tokens.radius.xl,
    padding: tokens.space.lg,
    gap: tokens.space.md,
  },
});
