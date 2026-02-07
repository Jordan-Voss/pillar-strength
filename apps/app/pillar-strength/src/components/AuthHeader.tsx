import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { tokens } from "../theme/tokens";
import { useTheme } from "../theme/useTheme";

export function AuthHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  const t = useTheme();

  return (
    <View style={styles.wrap}>
      <Text style={[styles.brand, { color: t.textSecondary }]}>
        Pillar Strength
      </Text>
      <Text style={[styles.title, { color: t.textPrimary }]}>{title}</Text>
      {subtitle ? (
        <Text style={[styles.subtitle, { color: t.textSecondary }]}>
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: "center", gap: 8, marginBottom: tokens.space.md },
  brand: { fontSize: 14, fontWeight: "700", letterSpacing: 1.2 },
  title: { fontSize: 28, fontWeight: "900" },
  subtitle: { fontSize: 14, textAlign: "center" },
});
