import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { getMe, type MeResponse } from '@/lib/api';
import { signOutCurrentUser } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import { lightTheme as theme } from '@/theme/theme';

type LoadingAction = 'session' | 'profile' | 'signout' | null;

export default function ProfileScreen() {
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);
  const [me, setMe] = useState<MeResponse | null>(null);
  const [loadingAction, setLoadingAction] = useState<LoadingAction>('session');
  const [message, setMessage] = useState<string | null>(null);

  const appDisplayName = useMemo(() => {
    return (
      me?.user?.displayName ??
      me?.user?.username ??
      sessionEmail ??
      'Athlete'
    );
  }, [me, sessionEmail]);

  useEffect(() => {
    let mounted = true;

    async function initialiseProfile() {
      setLoadingAction('session');

      try {
        const { data, error } = await supabase.auth.getSession();

        if (!mounted) {
          return;
        }

        if (error) {
          setMessage(error.message);
          setSessionEmail(null);
          setMe(null);
          return;
        }

        setSessionEmail(data.session?.user.email ?? null);

        if (data.session) {
          const profile = await getMe(data.session.access_token);

          if (mounted) {
            setMe(profile);
          }
        }
      } catch (error) {
        if (mounted) {
          setMessage(error instanceof Error ? error.message : 'Failed to load profile.');
        }
      } finally {
        if (mounted) {
          setLoadingAction(null);
        }
      }
    }

    initialiseProfile();

    return () => {
      mounted = false;
    };
  }, []);

  async function loadMe() {
    setMessage(null);
    setLoadingAction('profile');

    try {
      const data = await getMe();
      setMe(data);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Failed to load your profile.');
    } finally {
      setLoadingAction(null);
    }
  }

  async function handleSignOut() {
    setLoadingAction('signout');

    try {
      await Promise.race([
        signOutCurrentUser(),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Sign out timed out. Cleared local state.')), 5000),
        ),
      ]);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not sign out.');
    } finally {
      setSessionEmail(null);
      setMe(null);
      setLoadingAction(null);
    }
  }

  async function clearLocalSession() {
    setLoadingAction('signout');

    try {
      await Promise.race([
        supabase.auth.signOut({ scope: 'local' }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Clear local session timed out.')), 5000),
        ),
      ]);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not clear session.');
    } finally {
      setSessionEmail(null);
      setMe(null);
      setMessage(null);
      setLoadingAction(null);
    }
  }

  if (loadingAction === 'session') {
    return (
      <View style={styles.screen}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={theme.colors.interactive.primary} />
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </View>
    );
  }

  return (
    <View collapsable={false} style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        automaticallyAdjustContentInsets
      >
        <View style={styles.header}>
          <Text style={styles.eyebrow}>Profile</Text>
          <Text style={styles.title}>{appDisplayName}</Text>
          <Text style={styles.subtitle}>Your account details and training defaults.</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Current profile</Text>

          <View style={styles.profileSummary}>
            <SummaryRow label="Email" value={me?.user?.email ?? sessionEmail ?? 'Not loaded'} />
            <SummaryRow label="Username" value={me?.user?.username ?? 'Not chosen yet'} />
            <SummaryRow label="Name" value={getFullName(me) || 'Not set yet'} />
            <SummaryRow label="Display name" value={me?.user?.displayName ?? 'Not set yet'} />
            <SummaryRow
              label="Onboarding"
              value={me?.user?.onboardingComplete ? 'Complete' : 'Not started'}
            />
            <SummaryRow label="Timezone" value={me?.preferences?.timezone ?? 'Not set yet'} />
            <SummaryRow label="Theme" value={me?.preferences?.theme ?? 'Not set yet'} />
            <SummaryRow label="Units" value={me?.preferences?.units ?? 'Not loaded'} />
            <SummaryRow
              label="e1RM formula"
              value={me?.preferences?.e1rmFormula ?? 'Not loaded'}
            />
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.pressed,
              loadingAction === 'profile' && styles.buttonDisabled,
            ]}
            onPress={loadMe}
            disabled={loadingAction === 'profile'}
          >
            <Text style={styles.primaryButtonText}>
              {loadingAction === 'profile' ? 'Refreshing...' : 'Refresh profile'}
            </Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}
            onPress={handleSignOut}
          >
            <Text style={styles.secondaryButtonText}>Sign out</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [styles.dangerButton, pressed && styles.pressed]}
            onPress={clearLocalSession}
          >
            <Text style={styles.dangerButtonText}>Clear local session</Text>
          </Pressable>

          {message ? <Text style={styles.errorText}>{message}</Text> : null}
        </View>
      </ScrollView>
    </View>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.summaryRow}>
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={styles.summaryValue}>{value}</Text>
    </View>
  );
}

function getFullName(me: MeResponse | null): string {
  if (!me) {
    return '';
  }

  return [me.user?.firstName, me.user?.lastName]
    .filter(Boolean)
    .join(' ');
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.bg.primary,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    paddingBottom: 140,
    gap: theme.spacing.lg,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.md,
    padding: theme.spacing.lg,
  },
  loadingText: {
    color: theme.colors.text.secondary,
    fontSize: 15,
  },
  header: {
    gap: theme.spacing.xs,
  },
  eyebrow: {
    color: theme.colors.interactive.primary,
    fontSize: 13,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    color: theme.colors.text.primary,
    fontSize: 32,
    fontWeight: '900',
  },
  subtitle: {
    color: theme.colors.text.secondary,
    fontSize: 15,
    lineHeight: 22,
  },
  card: {
    backgroundColor: theme.colors.card.background,
    borderColor: theme.colors.card.border,
    borderWidth: 1,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
    ...theme.shadows.md,
  },
  cardTitle: {
    color: theme.colors.text.primary,
    fontSize: 20,
    fontWeight: '900',
  },
  profileSummary: {
    backgroundColor: theme.colors.bg.tertiary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  summaryRow: {
    gap: 2,
  },
  summaryLabel: {
    color: theme.colors.text.secondary,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  summaryValue: {
    color: theme.colors.text.primary,
    fontSize: 15,
    fontWeight: '700',
  },
  primaryButton: {
    minHeight: 52,
    backgroundColor: theme.colors.interactive.primary,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.md,
  },
  primaryButtonText: {
    color: theme.colors.text.inverse,
    fontSize: 16,
    fontWeight: '900',
  },
  secondaryButton: {
    minHeight: 52,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.md,
  },
  secondaryButtonText: {
    color: theme.colors.text.primary,
    fontSize: 15,
    fontWeight: '900',
  },
  dangerButton: {
    minHeight: 52,
    borderColor: theme.colors.status.error,
    borderWidth: 1,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.md,
  },
  dangerButtonText: {
    color: theme.colors.status.error,
    fontSize: 15,
    fontWeight: '900',
  },
  errorText: {
    color: theme.colors.status.error,
    fontSize: 14,
    lineHeight: 20,
  },
  buttonDisabled: {
    opacity: 0.65,
  },
  pressed: {
    opacity: 0.84,
  },
});