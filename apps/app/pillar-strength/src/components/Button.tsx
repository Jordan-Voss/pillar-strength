import React from "react";
import { Pressable, Text, ActivityIndicator, StyleSheet, ViewStyle } from "react-native";
import { tokens } from "../theme/tokens";
import { useTheme } from "../theme/useTheme";

type Props = {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  testID?: string;
};

export function Button({
  title,
  onPress,
  variant = "primary",
  loading,
  disabled,
  style,
  testID,
}: Props) {
  const t = useTheme();
  const isDisabled = disabled || loading;

  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      disabled={isDisabled}
      style={[
        styles.base,
        variant === "primary"
          ? { backgroundColor: t.accent }
          : { borderWidth: 1, borderColor: t.border, backgroundColor: "transparent" },
        isDisabled && { opacity: 0.6 },
        style,
      ]}
      accessibilityRole="button"
    >
      {loading ? (
        <ActivityIndicator color={variant === "primary" ? "#FFF" : t.textPrimary} />
      ) : (
        <Text
          style={[
            styles.text,
            { color: variant === "primary" ? "#FFF" : t.textPrimary },
          ]}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: tokens.space.md,
    borderRadius: tokens.radius.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: tokens.font.body,
    fontWeight: "700",
  },
});
