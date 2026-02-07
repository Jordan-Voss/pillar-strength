import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AuthHeader } from "../../src/components/AuthHeader";
import { Banner } from "../../src/components/Banner";
import { Button } from "../../src/components/Button";
import { Card } from "../../src/components/Card";
import { TextField } from "../../src/components/TextField";
import { supabase } from "../../src/lib/supabase";
import { tokens } from "../../src/theme/tokens";
import { useTheme } from "../../src/theme/useTheme";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function Login() {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const passwordRef = useRef<TextInput>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onLogin() {
    if (loading) return;

    setError(null);

    const em = email.trim().toLowerCase();

    if (!em) {
      setError("Please enter your email address.");
      return;
    }
    if (!isValidEmail(em)) {
      setError("That email address doesn’t look valid.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: em,
        password,
      });

      if (signInError) {
        // Common supabase messages are already friendly, but we can improve the generic one.
        const msg =
          signInError.message?.toLowerCase().includes("invalid") ||
          signInError.message?.toLowerCase().includes("credentials")
            ? "Incorrect email or password."
            : signInError.message;

        throw new Error(msg);
      }

      router.replace("/(tabs)/schedule");
    } catch (e: any) {
      setError(e?.message ?? "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Pressable
      style={[styles.flex, { backgroundColor: t.background }]}
      onPress={Keyboard.dismiss}
      accessible={false}
    >
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        enableOnAndroid
        extraScrollHeight={12}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: insets.top + tokens.space.lg,
            paddingBottom: insets.bottom + tokens.space.xl,
          },
        ]}
      >
        <View style={styles.container}>
          <AuthHeader
            title="Welcome back"
            subtitle="Log in to Pillar Strength."
          />

          <Card>
            {error ? <Banner message={error} kind="error" /> : null}

            <TextField
              label="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="you@example.com"
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => passwordRef.current?.focus()}
              testID="login-email"
            />

            <TextField
              ref={passwordRef}
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="••••••••"
              returnKeyType="done"
              onSubmitEditing={onLogin}
              testID="login-password"
            />

            <Button
              title={loading ? "Logging in..." : "Log in"}
              onPress={onLogin}
              loading={loading}
              disabled={loading}
              testID="login-submit"
            />

            <View style={styles.row}>
              <Text style={[styles.muted, { color: t.textSecondary }]}>
                No account?
              </Text>
              <Text
                style={[styles.link, { color: t.textPrimary }]}
                onPress={() => router.push("/(auth)/signup")}
                accessibilityRole="link"
                testID="login-go-signup"
              >
                Sign up
              </Text>
            </View>
          </Card>
        </View>
      </KeyboardAwareScrollView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    paddingHorizontal: tokens.space.lg,
    maxWidth: 420 as any,
    width: "100%",
    alignSelf: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    gap: tokens.space.xs,
    marginTop: tokens.space.sm,
  },
  muted: { fontSize: tokens.font.small },
  link: { fontWeight: "800", fontSize: tokens.font.small },
});
