import React from "react";
import { Pressable, Text } from "react-native";

export function LinkText({ title, onPress }: { title: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="link">
      <Text style={{ color: "#111", fontWeight: "700" }}>{title}</Text>
    </Pressable>
  );
}
