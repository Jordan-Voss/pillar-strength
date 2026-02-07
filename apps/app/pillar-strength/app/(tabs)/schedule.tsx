import React from "react";
import { Text, StyleSheet } from "react-native";

import { Screen } from "../../src/components/Screen";
import { useTheme } from "../../src/theme/useTheme";

export default function Schedule() {
  const t = useTheme();
  return (
    <Screen>
      <Text style={[styles.header, { color: t.textPrimary }]}>Schedule</Text>
      <Text style={{ color: t.textSecondary }}>Placeholder screen.</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { fontSize: 24, fontWeight: "800" },
});
