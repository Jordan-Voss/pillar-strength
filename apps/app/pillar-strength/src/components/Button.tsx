import React from "react";
import {
  Pressable,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
} from "react-native";

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
  const isPrimary = variant === "primary";

  const dynamicStyles = {
    button: {
      backgroundColor: isPrimary ? t.accent : t.transparent,
      borderWidth: isPrimary ? 0 : 1,
      borderColor: t.border,
      opacity: isDisabled ? 0.6 : 1,
    },
    contentColor: isPrimary ? t.white : t.textPrimary,
  };

  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      disabled={isDisabled}
      style={[styles.base, dynamicStyles.button, style]}
      accessibilityRole="button"
    >
      {loading ? (
        <ActivityIndicator color={dynamicStyles.contentColor} />
      ) : (
        <Text style={[styles.text, { color: dynamicStyles.contentColor }]}>
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
