import React, { forwardRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from "react-native";

import { tokens } from "../theme/tokens";
import { useTheme } from "../theme/useTheme";

type Props = TextInputProps & {
  label: string;
  error?: string;
  testID?: string;
};

export const TextField = forwardRef<TextInput, Props>(function TextField(
  { label, error, testID, ...props },
  ref,
) {
  const t = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: t.textSecondary }]}>{label}</Text>
      <TextInput
        ref={ref}
        testID={testID}
        {...props}
        placeholderTextColor={t.textMuted}
        style={[
          styles.input,
          {
            borderColor: error ? t.error : t.border,
            color: t.textPrimary,
            backgroundColor: t.card,
          },
        ]}
      />
      {error ? (
        <Text style={[styles.error, { color: t.error }]}>{error}</Text>
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  container: { gap: 6 },
  label: { fontSize: tokens.font.small, fontWeight: "600" },
  input: {
    borderWidth: 1,
    borderRadius: tokens.radius.lg,
    paddingHorizontal: tokens.space.md,
    paddingVertical: tokens.space.sm,
    fontSize: tokens.font.body,
  },
  error: { fontSize: tokens.font.small },
});
