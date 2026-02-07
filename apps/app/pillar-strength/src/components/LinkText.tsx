import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

import { useTheme } from "../theme/useTheme";

export function LinkText({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) {
  const t = useTheme();
  return (
    <Pressable onPress={onPress} accessibilityRole="link">
      <Text style={[styles.text, { color: t.textPrimary }]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  text: { fontWeight: "700" },
});
