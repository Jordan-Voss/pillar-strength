import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { tokens } from "../theme/tokens";
import { useTheme } from "../theme/useTheme";

export function Screen({
  children,
  style,
  variant = "default",
}: {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: "default" | "auth";
}) {
  const t = useTheme();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: t.background }]}>
      <View
        style={[styles.container, variant === "auth" && styles.auth, style]}
      >
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { flex: 1, padding: tokens.space.lg },
  auth: {
    justifyContent: "center",
    paddingHorizontal: tokens.space.lg,
    maxWidth: 420 as any,
    width: "100%",
    alignSelf: "center",
  },
});
