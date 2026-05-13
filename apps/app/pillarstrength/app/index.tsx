import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from 'react-native';

import { supabase } from '../src/lib/supabase';
import { getMe } from '../src/lib/api';
import { darkTheme as theme } from '../src/theme/theme';

type AuthMode = 'signIn' | 'signUp';

export default function Index() {
  const [mode, setMode] = useState<AuthMode>('signIn');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);
  const [me, setMe] = useState<any>(null);

  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSessionEmail(data.session?.user.email ?? null);
      setCheckingSession(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSessionEmail(session?.user.email ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  async function signUp() {
    setMessage(null);

    if (!email.trim()) {
      setMessage('Enter your email.');
      return;
    }

    if (password.length < 6) {
      setMessage('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    if (!data.session) {
      setMessage('Account created. Check your email to confirm your account.');
      return;
    }

    setSessionEmail(data.session.user.email ?? null);
    setMessage(null);
  }

  async function signIn() {
    setMessage(null);

    if (!email.trim() || !password) {
      setMessage('Enter your email and password.');
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
    }
  }

  async function loadMe() {
    setMessage(null);
    setLoading(true);

    try {
      const data = await getMe();
      setMe(data);
    } catch (e) {
      setMessage(e instanceof Error ? e.message : 'Failed to load user.');
    } finally {
      setLoading(false);
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
    setMe(null);
    setSessionEmail(null);
  }

  if (checkingSession) {
    return (
      <SafeAreaView style={styles.screen}>
        <ActivityIndicator color={theme.colors.interactive.primary} />
      </SafeAreaView>
    );
  }

  if (sessionEmail) {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.header}>
          <Image
            source={require('../assets/brand/logo-text-red.png')}
            resizeMode="contain"
            style={styles.headerLogo}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>You’re signed in</Text>
          <Text style={styles.subtitle}>{sessionEmail}</Text>

          <Pressable style={styles.primaryButton} onPress={loadMe} disabled={loading}>
            <Text style={styles.primaryButtonText}>
              {loading ? 'Loading...' : 'Load /me'}
            </Text>
          </Pressable>

          <Pressable style={styles.secondaryButton} onPress={signOut}>
            <Text style={styles.secondaryButtonText}>Sign out</Text>
          </Pressable>

          {message ? <Text style={styles.error}>{message}</Text> : null}

          {me ? (
            <View style={styles.resultBox}>
              <Text selectable style={styles.resultText}>
                {JSON.stringify(me, null, 2)}
              </Text>
            </View>
          ) : null}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <View style={styles.logoSection}>
          <Image
            source={require('../assets/brand/splash.png')}
            resizeMode="contain"
            style={styles.logo}
          />
          <Text style={styles.tagline}>Live rugby scores, stats and fixtures.</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>
            {mode === 'signIn' ? 'Welcome back' : 'Create account'}
          </Text>

          <Text style={styles.subtitle}>
            {mode === 'signIn'
              ? 'Sign in to continue to RugbyLive.'
              : 'Create your RugbyLive account.'}
          </Text>

          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor={theme.colors.input.placeholder}
            autoCapitalize="none"
            keyboardType="email-address"
            style={styles.input}
          />

          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor={theme.colors.input.placeholder}
            secureTextEntry
            style={styles.input}
          />

          {mode === 'signUp' ? (
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm password"
              placeholderTextColor={theme.colors.input.placeholder}
              secureTextEntry
              style={styles.input}
            />
          ) : null}

          <Pressable
            style={styles.primaryButton}
            onPress={mode === 'signIn' ? signIn : signUp}
            disabled={loading}
          >
            <Text style={styles.primaryButtonText}>
              {loading ? 'Please wait...' : mode === 'signIn' ? 'Sign in' : 'Sign up'}
            </Text>
          </Pressable>

          <Pressable
            style={styles.switchButton}
            onPress={() => {
              setMessage(null);
              setMode(mode === 'signIn' ? 'signUp' : 'signIn');
            }}
          >
            <Text style={styles.switchText}>
              {mode === 'signIn'
                ? 'Need an account? Sign up'
                : 'Already have an account? Sign in'}
            </Text>
          </Pressable>

          {message ? <Text style={styles.error}>{message}</Text> : null}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = {
  screen: {
    flex: 1,
    backgroundColor: theme.colors.bg.primary,
  },
  container: {
    flex: 1,
    justifyContent: 'center' as const,
    padding: theme.spacing.lg,
    gap: theme.spacing.lg,
  },
  header: {
    padding: theme.spacing.lg,
  },
  headerLogo: {
    width: 220,
    height: 70,
  },
  logoSection: {
    alignItems: 'center' as const,
    gap: theme.spacing.md,
  },
  logo: {
    width: 280,
    height: 180,
  },
  tagline: {
    color: theme.colors.text.secondary,
    fontSize: 16,
    textAlign: 'center' as const,
  },
  card: {
    backgroundColor: theme.colors.card.background,
    borderColor: theme.colors.card.border,
    borderWidth: 1,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  title: {
    color: theme.colors.text.primary,
    fontSize: 26,
    fontWeight: '800' as const,
  },
  subtitle: {
    color: theme.colors.text.secondary,
    fontSize: 15,
  },
  input: {
    backgroundColor: theme.colors.input.background,
    borderColor: theme.colors.input.border,
    borderWidth: 1,
    borderRadius: theme.borderRadius.md,
    color: theme.colors.input.text,
    padding: theme.spacing.md,
    fontSize: 16,
  },
  primaryButton: {
    backgroundColor: theme.colors.interactive.primary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    alignItems: 'center' as const,
  },
  primaryButtonText: {
    color: theme.colors.text.inverse,
    fontWeight: '800' as const,
    fontSize: 16,
  },
  secondaryButton: {
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    alignItems: 'center' as const,
  },
  secondaryButtonText: {
    color: theme.colors.text.primary,
    fontWeight: '700' as const,
  },
  switchButton: {
    alignItems: 'center' as const,
    paddingVertical: theme.spacing.sm,
  },
  switchText: {
    color: theme.colors.text.link,
    fontWeight: '700' as const,
  },
  error: {
    color: theme.colors.status.error,
    fontSize: 14,
  },
  resultBox: {
    backgroundColor: theme.colors.bg.tertiary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
  },
  resultText: {
    color: theme.colors.text.primary,
    fontSize: 12,
  },
};