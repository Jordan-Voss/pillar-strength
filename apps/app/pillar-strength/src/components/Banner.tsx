import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { tokens } from "../theme/tokens";
import { useTheme } from "../theme/useTheme";

export function Banner({
  message,
  kind = "error",
}: {
  message: string;
  kind?: "error" | "info";
}) {
  const t = useTheme();

  const bg = kind === "error" ? t.errorSoft : t.infoSoft;
  const border = kind === "error" ? t.error : t.info;

  return (
    <View style={[styles.base, { backgroundColor: bg, borderColor: border }]}>
      <Text style={[styles.text, { color: t.textPrimary }]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    padding: tokens.space.sm,
    borderRadius: tokens.radius.lg,
    borderWidth: 1,
  },
  text: {
    fontWeight: "600",
  },
});
