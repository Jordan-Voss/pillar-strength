import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  type TextInput as TextInputType,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  checkUsernameAvailability,
  getMe,
  type MeResponse,
  type UsernameAvailabilityResponse,
} from '../src/lib/api';
import {
  createAccount,
  loginWithEmailOrUsername,
  signOutCurrentUser,
} from '../src/lib/auth';
import { supabase } from '../src/lib/supabase';
import { lightTheme as theme } from '../src/theme/theme';

type AuthMode = 'signIn' | 'signUp';
type UsernameCheckState = 'idle' | 'invalid' | 'checking' | 'available' | 'taken' | 'error';
type LoadingAction = 'session' | 'login' | 'signup' | 'profile' | 'signout' | null;

const USERNAME_REGEX = /^[A-Za-z0-9_]{3,20}$/;

export default function Index() {
  const [mode, setMode] = useState<AuthMode>('signIn');

  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [username, setUsername] = useState('');
  const [usernameCheckState, setUsernameCheckState] = useState<UsernameCheckState>('idle');
  const [usernameMessage, setUsernameMessage] = useState<string | null>(null);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [sessionEmail, setSessionEmail] = useState<string | null>(null);
  const [me, setMe] = useState<MeResponse | null>(null);

  const [loadingAction, setLoadingAction] = useState<LoadingAction>('session');
  const [message, setMessage] = useState<string | null>(null);

  const loginPasswordRef = useRef<TextInputType>(null);
  const firstNameRef = useRef<TextInputType>(null);
  const lastNameRef = useRef<TextInputType>(null);
  const emailRef = useRef<TextInputType>(null);
  const signupPasswordRef = useRef<TextInputType>(null);
  const confirmPasswordRef = useRef<TextInputType>(null);

  const loading = loadingAction !== null;

  const appDisplayName = useMemo(() => {
    return (
      me?.user?.displayName ??
      me?.user?.username ??
      sessionEmail ??
      'Athlete'
    );
  }, [me, sessionEmail]);

  const canCreateAccount =
    mode === 'signUp' &&
    usernameCheckState === 'available' &&
    username.trim().length > 0 &&
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    email.trim().length > 0 &&
    password.length >= 6 &&
    password === confirmPassword &&
    !loading;

  useEffect(() => {
    let mounted = true;

    async function initialiseSession() {
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

        const currentEmail = data.session?.user.email ?? null;
        setSessionEmail(currentEmail);

        if (data.session) {
          try {
            const profile = await getMe(data.session.access_token);

            if (mounted) {
              setMe(profile);
            }
          } catch (profileError) {
            if (mounted) {
              setMessage(
                profileError instanceof Error
                  ? profileError.message
                  : 'Signed in, but failed to load your profile.',
              );
            }
          }
        }
      } catch (error) {
        if (mounted) {
          setMessage(error instanceof Error ? error.message : 'Failed to check session.');
          setSessionEmail(null);
          setMe(null);
        }
      } finally {
        if (mounted) {
          setLoadingAction(null);
        }
      }
    }

    initialiseSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSessionEmail(session?.user.email ?? null);

      if (!session) {
        setMe(null);
        setLoadingAction(null);
        return;
      }

      const accessToken = session.access_token;

      setTimeout(async () => {
        try {
          setLoadingAction('profile');
          const profile = await getMe(accessToken);
          setMe(profile);
          setMessage(null);
        } catch (error) {
          setMessage(error instanceof Error ? error.message : 'Failed to load your profile.');
        } finally {
          setLoadingAction(null);
        }
      }, 0);
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (mode !== 'signUp') {
      return;
    }

    const cleanedUsername = username.trim();

    if (!cleanedUsername) {
      setUsernameCheckState('idle');
      setUsernameMessage(null);
      return;
    }

    if (!USERNAME_REGEX.test(cleanedUsername)) {
      setUsernameCheckState('invalid');
      setUsernameMessage('Use 3–20 letters, numbers, or underscores.');
      return;
    }

    setUsernameCheckState('checking');
    setUsernameMessage('Checking username...');

    const timeoutId = setTimeout(async () => {
      try {
        const result: UsernameAvailabilityResponse =
          await checkUsernameAvailability(cleanedUsername);

        if (result.available) {
          setUsernameCheckState('available');
          setUsernameMessage('Username is available.');
        } else {
          setUsernameCheckState('taken');
          setUsernameMessage(result.reason || 'Username is already taken.');
        }
      } catch {
        setUsernameCheckState('error');
        setUsernameMessage('Could not check username right now.');
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [username, mode]);

  function switchMode(nextMode?: AuthMode) {
    setMessage(null);
    setPassword('');
    setConfirmPassword('');
    setPasswordVisible(false);
    setConfirmPasswordVisible(false);
    setMode(nextMode ?? (mode === 'signIn' ? 'signUp' : 'signIn'));
  }

  async function handleSignIn() {
    setMessage(null);

    if (!emailOrUsername.trim() || !password) {
      setMessage('Enter your email or username and password.');
      return;
    }

    setLoadingAction('login');

    try {
      await loginWithEmailOrUsername({
        emailOrUsername,
        password,
      });
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not log in.');
    } finally {
      setLoadingAction(null);
    }
  }

  async function handleSignUp() {
    setMessage(null);

    if (!username.trim()) {
      setMessage('Choose a username.');
      return;
    }

    if (usernameCheckState !== 'available') {
      setMessage('Choose an available username before creating your account.');
      return;
    }

    if (!firstName.trim()) {
      setMessage('Enter your first name.');
      return;
    }

    if (!lastName.trim()) {
      setMessage('Enter your last name.');
      return;
    }

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

    setLoadingAction('signup');

    try {
      const result = await createAccount({
        username,
        firstName,
        lastName,
        email,
        password,
      });

      if (!result.sessionCreated) {
        setMessage('Account created. Check your email to confirm your account, then log in.');
        setEmailOrUsername(email.trim().toLowerCase());
        switchMode('signIn');
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not create account.');
    } finally {
      setLoadingAction(null);
    }
  }

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
      setPassword('');
      setConfirmPassword('');
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
      setPassword('');
      setConfirmPassword('');
      setMessage(null);
      setLoadingAction(null);
    }
  }

  const usernameFeedbackStyle = [
    styles.helpText,
    usernameCheckState === 'available' && styles.successText,
    (usernameCheckState === 'taken' ||
      usernameCheckState === 'invalid' ||
      usernameCheckState === 'error') &&
      styles.errorFeedbackText,
  ];

  if (loadingAction === 'session') {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={theme.colors.interactive.primary} />
          <Text style={styles.loadingText}>Loading Pillar Strength...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (sessionEmail) {
    return (
      <SignedInHome
        me={me}
        sessionEmail={sessionEmail}
        appDisplayName={appDisplayName}
        loadingAction={loadingAction}
        message={message}
        onRefresh={loadMe}
        onSignOut={handleSignOut}
        onClearSession={clearLocalSession}
      />
    );
  }

  return (
    <SafeAreaView style={styles.authScreen}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <ScrollView
            contentContainerStyle={styles.authContent}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="interactive"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.logoSection}>
              <Image
                source={require('../assets/brand/horizontal-nobg-navy-writing.png')}
                resizeMode="contain"
                style={styles.logo}
              />
              <Text style={styles.tagline}>Train with structure. Progress with purpose.</Text>
            </View>

            <View style={styles.card}>
              <View style={styles.modeSwitch}>
                <Pressable
                  onPress={() => switchMode('signIn')}
                  style={[
                    styles.modeOption,
                    mode === 'signIn' && styles.modeOptionActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.modeOptionText,
                      mode === 'signIn' && styles.modeOptionTextActive,
                    ]}
                  >
                    Log in
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() => switchMode('signUp')}
                  style={[
                    styles.modeOption,
                    mode === 'signUp' && styles.modeOptionActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.modeOptionText,
                      mode === 'signUp' && styles.modeOptionTextActive,
                    ]}
                  >
                    Create account
                  </Text>
                </Pressable>
              </View>

              <View style={styles.formHeader}>
                <Text style={styles.title}>
                  {mode === 'signIn' ? 'Welcome back' : 'Create your account'}
                </Text>
                <Text style={styles.subtitle}>
                  {mode === 'signIn'
                    ? 'Log in with your email or username.'
                    : 'Create your profile. Training settings can come later.'}
                </Text>
              </View>

              {mode === 'signIn' ? (
                <>
                  <FieldLabel>Email or username</FieldLabel>
                  <TextInput
                    value={emailOrUsername}
                    onChangeText={setEmailOrUsername}
                    placeholder="JordanVoss or jordan@email.com"
                    placeholderTextColor={theme.colors.input.placeholder}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    textContentType="username"
                    returnKeyType="next"
                    onSubmitEditing={() => loginPasswordRef.current?.focus()}
                    blurOnSubmit={false}
                    style={styles.input}
                  />

                  <FieldLabel>Password</FieldLabel>
                  <PasswordInput
                    value={password}
                    onChangeText={setPassword}
                    visible={passwordVisible}
                    onToggleVisible={() => setPasswordVisible((current) => !current)}
                    placeholder="Your password"
                    textContentType="password"
                    inputRef={loginPasswordRef}
                    returnKeyType="done"
                    onSubmitEditing={handleSignIn}
                  />
                </>
              ) : (
                <>
                  <FieldLabel>Username</FieldLabel>
                  <TextInput
                    value={username}
                    onChangeText={setUsername}
                    placeholder="JordanVoss"
                    placeholderTextColor={theme.colors.input.placeholder}
                    autoCapitalize="none"
                    autoCorrect={false}
                    textContentType="username"
                    returnKeyType="next"
                    onSubmitEditing={() => firstNameRef.current?.focus()}
                    blurOnSubmit={false}
                    style={styles.input}
                  />

                  <Text style={usernameFeedbackStyle}>
                    {usernameMessage ??
                      '3–20 characters. Letters, numbers, and underscores only.'}
                  </Text>

                  <FieldLabel>First name</FieldLabel>
                  <TextInput
                    ref={firstNameRef}
                    value={firstName}
                    onChangeText={setFirstName}
                    placeholder="Jordan"
                    placeholderTextColor={theme.colors.input.placeholder}
                    autoCapitalize="words"
                    autoCorrect={false}
                    textContentType="givenName"
                    returnKeyType="next"
                    onSubmitEditing={() => lastNameRef.current?.focus()}
                    blurOnSubmit={false}
                    style={styles.input}
                  />

                  <FieldLabel>Last name</FieldLabel>
                  <TextInput
                    ref={lastNameRef}
                    value={lastName}
                    onChangeText={setLastName}
                    placeholder="Voss"
                    placeholderTextColor={theme.colors.input.placeholder}
                    autoCapitalize="words"
                    autoCorrect={false}
                    textContentType="familyName"
                    returnKeyType="next"
                    onSubmitEditing={() => emailRef.current?.focus()}
                    blurOnSubmit={false}
                    style={styles.input}
                  />

                  <FieldLabel>Email</FieldLabel>
                  <TextInput
                    ref={emailRef}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="jordan@email.com"
                    placeholderTextColor={theme.colors.input.placeholder}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    returnKeyType="next"
                    onSubmitEditing={() => signupPasswordRef.current?.focus()}
                    blurOnSubmit={false}
                    style={styles.input}
                  />

                  <FieldLabel>Password</FieldLabel>
                  <PasswordInput
                    value={password}
                    onChangeText={setPassword}
                    visible={passwordVisible}
                    onToggleVisible={() => setPasswordVisible((current) => !current)}
                    placeholder="At least 6 characters"
                    textContentType="newPassword"
                    inputRef={signupPasswordRef}
                    returnKeyType="next"
                    onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                  />

                  <FieldLabel>Confirm password</FieldLabel>
                  <PasswordInput
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    visible={confirmPasswordVisible}
                    onToggleVisible={() => setConfirmPasswordVisible((current) => !current)}
                    placeholder="Repeat your password"
                    textContentType="newPassword"
                    inputRef={confirmPasswordRef}
                    returnKeyType="done"
                    onSubmitEditing={handleSignUp}
                  />
                </>
              )}

              <Pressable
                style={({ pressed }) => [
                  styles.primaryButton,
                  pressed && styles.buttonPressed,
                  (loading || (mode === 'signUp' && !canCreateAccount)) &&
                    styles.buttonDisabled,
                ]}
                onPress={mode === 'signIn' ? handleSignIn : handleSignUp}
                disabled={loading || (mode === 'signUp' && !canCreateAccount)}
              >
                <Text style={styles.primaryButtonText}>
                  {getPrimaryButtonLabel(mode, loadingAction)}
                </Text>
              </Pressable>

              <Pressable style={styles.switchButton} onPress={() => switchMode()}>
                <Text style={styles.switchText}>
                  {mode === 'signIn'
                    ? 'Need an account? Create one'
                    : 'Already have an account? Log in'}
                </Text>
              </Pressable>

              {message ? <Text style={styles.errorText}>{message}</Text> : null}
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function SignedInHome({
  me,
  sessionEmail,
  appDisplayName,
  loadingAction,
  message,
  onRefresh,
  onSignOut,
  onClearSession,
}: {
  me: MeResponse | null;
  sessionEmail: string;
  appDisplayName: string;
  loadingAction: LoadingAction;
  message: string | null;
  onRefresh: () => void;
  onSignOut: () => void;
  onClearSession: () => void;
}) {
  return (
    <View collapsable={false} style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.homeContent}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        automaticallyAdjustContentInsets
      >
        <View style={styles.homeHero}>
          <Image
            source={require('../assets/brand/horizontal-nobg-navy-writing.png')}
            resizeMode="contain"
            style={styles.headerLogo}
          />
          <Text style={styles.homeGreeting}>Welcome, {appDisplayName}</Text>
          <Text style={styles.homeSubtitle}>
            Build strength with structured programs, exercise tracking, and progress insights.
          </Text>
        </View>

        <View style={styles.heroActionCard}>
          <Text style={styles.heroActionTitle}>Ready to train?</Text>
          <Text style={styles.heroActionSubtitle}>
            The Library tab is ready for the next feature slice: seeded lifts, search, and details.
          </Text>
        </View>

        <View style={styles.quickGrid}>
          <HomeActionCard title="Programs" subtitle="Coming soon" />
          <HomeActionCard title="Library" subtitle="Use the tab below" />
          <HomeActionCard title="Profile" subtitle="Account details below" />
          <HomeActionCard
            title="Preferences"
            subtitle={`${me?.preferences?.units ?? 'Units'} · ${me?.preferences?.e1rmFormula ?? 'e1RM'}`}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.eyebrow}>Current profile</Text>

          <View style={styles.profileSummary}>
            <SummaryRow label="Email" value={me?.user?.email ?? sessionEmail} />
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
              pressed && styles.buttonPressed,
              loadingAction === 'profile' && styles.buttonDisabled,
            ]}
            onPress={onRefresh}
            disabled={loadingAction === 'profile'}
          >
            <Text style={styles.primaryButtonText}>
              {loadingAction === 'profile' ? 'Refreshing...' : 'Refresh profile'}
            </Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.secondaryButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={onSignOut}
          >
            <Text style={styles.secondaryButtonText}>Sign out</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.dangerButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={onClearSession}
          >
            <Text style={styles.dangerButtonText}>Clear local session</Text>
          </Pressable>

          {message ? <Text style={styles.errorText}>{message}</Text> : null}
        </View>
      </ScrollView>
    </View>
  );
}

function HomeActionCard({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <View style={styles.actionCard}>
      <Text style={styles.actionTitle}>{title}</Text>
      <Text style={styles.actionSubtitle}>{subtitle}</Text>
    </View>
  );
}

function FieldLabel({ children }: { children: string }) {
  return <Text style={styles.fieldLabel}>{children}</Text>;
}

function PasswordInput({
  value,
  onChangeText,
  visible,
  onToggleVisible,
  placeholder,
  textContentType,
  inputRef,
  returnKeyType,
  onSubmitEditing,
}: {
  value: string;
  onChangeText: (value: string) => void;
  visible: boolean;
  onToggleVisible: () => void;
  placeholder: string;
  textContentType: 'password' | 'newPassword';
  inputRef?: React.RefObject<TextInputType | null>;
  returnKeyType: 'next' | 'done';
  onSubmitEditing?: () => void;
}) {
  return (
    <View style={styles.passwordInputWrap}>
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.input.placeholder}
        secureTextEntry={!visible}
        textContentType={textContentType}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        blurOnSubmit={returnKeyType === 'done'}
        style={styles.passwordInput}
      />

      <Pressable style={styles.passwordToggle} onPress={onToggleVisible}>
        <Text style={styles.passwordToggleText}>{visible ? 'Hide' : 'Show'}</Text>
      </Pressable>
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

function getPrimaryButtonLabel(mode: AuthMode, loadingAction: LoadingAction): string {
  if (loadingAction === 'login') {
    return 'Logging in...';
  }

  if (loadingAction === 'signup') {
    return 'Creating account...';
  }

  return mode === 'signIn' ? 'Log in' : 'Create account';
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.bg.primary,
  },
  authScreen: {
    flex: 1,
    backgroundColor: theme.colors.bg.primary,
  },
  keyboardAvoidingView: {
    flex: 1,
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
  authContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: theme.spacing.lg,
    paddingTop: 28,
    paddingBottom: 56,
    gap: theme.spacing.lg,
  },
  homeContent: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.xxl,
    gap: theme.spacing.lg,
  },
  homeHero: {
    backgroundColor: theme.colors.card.background,
    borderColor: theme.colors.card.border,
    borderWidth: 1,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    gap: theme.spacing.sm,
    ...theme.shadows.md,
  },
  homeGreeting: {
    color: theme.colors.text.primary,
    fontSize: 28,
    fontWeight: '800',
  },
  homeSubtitle: {
    color: theme.colors.text.secondary,
    fontSize: 15,
    lineHeight: 22,
  },
  headerLogo: {
    width: 220,
    height: 70,
  },
  logoSection: {
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  logo: {
    width: 300,
    height: 125,
  },
  tagline: {
    color: theme.colors.text.secondary,
    fontSize: 15,
    textAlign: 'center',
  },
  card: {
    backgroundColor: theme.colors.card.background,
    borderColor: theme.colors.card.border,
    borderWidth: 1,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
    ...theme.shadows.md,
  },
  heroActionCard: {
    backgroundColor: theme.colors.surface.header,
    borderColor: theme.colors.card.border,
    borderWidth: 1,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
    ...theme.shadows.md,
  },
  heroActionTitle: {
    color: theme.colors.text.primary,
    fontSize: 22,
    fontWeight: '800',
  },
  heroActionSubtitle: {
    color: theme.colors.text.secondary,
    fontSize: 15,
    lineHeight: 22,
  },
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  actionCard: {
    width: '47%',
    minHeight: 108,
    backgroundColor: theme.colors.card.background,
    borderColor: theme.colors.card.border,
    borderWidth: 1,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    justifyContent: 'space-between',
    ...theme.shadows.sm,
  },
  actionTitle: {
    color: theme.colors.text.primary,
    fontSize: 16,
    fontWeight: '800',
  },
  actionSubtitle: {
    color: theme.colors.text.secondary,
    fontSize: 13,
  },
  modeSwitch: {
    flexDirection: 'row',
    backgroundColor: theme.colors.bg.tertiary,
    borderRadius: theme.borderRadius.md,
    padding: 4,
    gap: 4,
  },
  modeOption: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.borderRadius.sm,
    paddingVertical: theme.spacing.sm,
  },
  modeOptionActive: {
    backgroundColor: theme.colors.interactive.primary,
  },
  modeOptionText: {
    color: theme.colors.text.secondary,
    fontSize: 14,
    fontWeight: '700',
  },
  modeOptionTextActive: {
    color: theme.colors.text.inverse,
  },
  formHeader: {
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
    fontSize: 26,
    fontWeight: '800',
  },
  subtitle: {
    color: theme.colors.text.secondary,
    fontSize: 15,
    lineHeight: 22,
  },
  fieldLabel: {
    color: theme.colors.text.primary,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: -theme.spacing.xs,
  },
  helpText: {
    color: theme.colors.text.secondary,
    fontSize: 12,
    lineHeight: 18,
    marginTop: -theme.spacing.xs,
  },
  successText: {
    color: theme.colors.status.success,
  },
  errorFeedbackText: {
    color: theme.colors.status.error,
  },
  input: {
    minHeight: 52,
    backgroundColor: theme.colors.input.background,
    borderColor: theme.colors.input.border,
    borderWidth: 1,
    borderRadius: theme.borderRadius.md,
    color: theme.colors.input.text,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: Platform.OS === 'ios' ? theme.spacing.md : theme.spacing.sm,
    fontSize: 16,
  },
  passwordInputWrap: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.input.background,
    borderColor: theme.colors.input.border,
    borderWidth: 1,
    borderRadius: theme.borderRadius.md,
  },
  passwordInput: {
    flex: 1,
    color: theme.colors.input.text,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: Platform.OS === 'ios' ? theme.spacing.md : theme.spacing.sm,
    fontSize: 16,
  },
  passwordToggle: {
    paddingHorizontal: theme.spacing.md,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  passwordToggleText: {
    color: theme.colors.text.link,
    fontSize: 13,
    fontWeight: '800',
  },
  primaryButton: {
    minHeight: 52,
    backgroundColor: theme.colors.interactive.primary,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: theme.colors.text.inverse,
    fontWeight: '800',
    fontSize: 16,
  },
  secondaryButton: {
    minHeight: 52,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: theme.colors.text.primary,
    fontWeight: '800',
    fontSize: 15,
  },
  dangerButton: {
    minHeight: 52,
    borderColor: theme.colors.status.error,
    borderWidth: 1,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dangerButtonText: {
    color: theme.colors.status.error,
    fontWeight: '800',
    fontSize: 15,
  },
  switchButton: {
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
  },
  switchText: {
    color: theme.colors.text.link,
    fontWeight: '700',
    fontSize: 14,
  },
  errorText: {
    color: theme.colors.status.error,
    fontSize: 14,
    lineHeight: 20,
  },
  buttonPressed: {
    opacity: 0.86,
    transform: [{ scale: 0.99 }],
  },
  buttonDisabled: {
    opacity: 0.65,
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
});