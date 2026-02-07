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

type Units = "METRIC" | "IMPERIAL";
type E1RMFormula = "EPLEY" | "BRZYCKI";
type Theme = "SYSTEM";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function Signup() {
  const t = useTheme();
  const insets = useSafeAreaInsets();

  const lastNameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmRef = useRef<TextInput>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const defaults = {
    units: "METRIC" as Units,
    e1rm_formula: "EPLEY" as E1RMFormula,
    theme: "SYSTEM" as Theme,
  };

  async function onSignup() {
    if (loading) return;

    setError(null);
    setInfo(null);

    const fn = firstName.trim();
    const ln = lastName.trim();
    const em = email.trim().toLowerCase();

    if (!fn) return setError("Please enter your first name.");
    if (!ln) return setError("Please enter your last name.");
    if (!em) return setError("Please enter your email address.");
    if (!isValidEmail(em))
      return setError("That email address doesn’t look valid.");
    if (!password) return setError("Please enter a password.");
    if (password.length < 6)
      return setError("Password must be at least 6 characters.");
    if (password !== confirm) return setError("Passwords do not match.");

    setLoading(true);

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: em,
        password,
      });

      if (signUpError) throw new Error(signUpError.message);

      const user = data.user;

      // If confirmations are ON, user exists but session may be null.
      if (!user) {
        setInfo(
          "Account created. Please check your email to confirm your account, then log in.",
        );
        setTimeout(() => router.replace("/(auth)/login"), 900);
        return;
      }

      const { error: profileError } = await supabase
        .from("user_profiles")
        .insert({
          user_id: user.id,
          first_name: fn,
          last_name: ln,
          units: defaults.units,
          e1rm_formula: defaults.e1rm_formula,
          theme: defaults.theme,
        });

      if (profileError) {
        throw new Error(
          `Your account was created, but we couldn’t save your profile details yet. Please try logging in. (${profileError.message})`,
        );
      }

      setInfo("Account created. You can now log in.");
      setTimeout(() => router.replace("/(auth)/login"), 600);
    } catch (e: any) {
      setError(
        e?.message ??
          "Something went wrong creating your account. Please try again.",
      );
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
            title="Create account"
            subtitle="Start tracking your training."
          />

          <Card>
            {error ? <Banner message={error} kind="error" /> : null}
            {info ? <Banner message={info} kind="info" /> : null}

            <TextField
              label="First name"
              value={firstName}
              onChangeText={setFirstName}
              placeholder="Jordan"
              autoCapitalize="words"
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => lastNameRef.current?.focus()}
              testID="signup-first-name"
            />

            <TextField
              ref={lastNameRef}
              label="Last name"
              value={lastName}
              onChangeText={setLastName}
              placeholder="Voss"
              autoCapitalize="words"
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => emailRef.current?.focus()}
              testID="signup-last-name"
            />

            <TextField
              ref={emailRef}
              label="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="you@example.com"
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => passwordRef.current?.focus()}
              testID="signup-email"
            />

            <TextField
              ref={passwordRef}
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="••••••••"
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => confirmRef.current?.focus()}
              testID="signup-password"
            />

            <TextField
              ref={confirmRef}
              label="Confirm Password"
              value={confirm}
              onChangeText={setConfirm}
              secureTextEntry
              placeholder="••••••••"
              returnKeyType="done"
              onSubmitEditing={onSignup}
              testID="signup-confirm-password"
            />

            <Button
              title={loading ? "Creating account..." : "Create account"}
              onPress={onSignup}
              loading={loading}
              disabled={loading}
              testID="signup-submit"
            />

            <View style={styles.row}>
              <Text style={[styles.muted, { color: t.textSecondary }]}>
                Already have an account?
              </Text>
              <Text
                style={[styles.link, { color: t.textPrimary }]}
                onPress={() => router.back()}
                accessibilityRole="link"
                testID="signup-go-login"
              >
                Log in
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
