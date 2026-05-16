import { readErrorMessage } from './api';
import { supabase } from './supabase';

const API = process.env.EXPO_PUBLIC_API_BASE_URL;

if (!API) {
  throw new Error('Missing EXPO_PUBLIC_API_BASE_URL');
}

type LoginInput = {
  emailOrUsername: string;
  password: string;
};

type CreateAccountInput = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type LoginResponse = {
  access_token: string;
  refresh_token: string;
  expires_in?: number;
  token_type?: string;
};

type CreateAccountResult = {
  sessionCreated: boolean;
};

const USERNAME_REGEX = /^[A-Za-z0-9_]{3,20}$/;

export async function loginWithEmailOrUsername({
  emailOrUsername,
  password,
}: LoginInput): Promise<void> {
  const identifier = emailOrUsername.trim();

  if (!identifier) {
    throw new Error('Enter your email or username.');
  }

  if (!password) {
    throw new Error('Enter your password.');
  }

  const response = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      identifier,
      password,
    }),
  });

  if (!response.ok) {
    const message = await readErrorMessage(response);
    throw new Error(message || 'Invalid email, username, or password.');
  }

  const data = (await response.json()) as LoginResponse;

  if (!data.access_token || !data.refresh_token) {
    throw new Error('Login succeeded but no session was returned.');
  }

  const { error } = await supabase.auth.setSession({
    access_token: data.access_token,
    refresh_token: data.refresh_token,
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function createAccount({
  username,
  firstName,
  lastName,
  email,
  password,
}: CreateAccountInput): Promise<CreateAccountResult> {
  const cleanedUsername = username.trim();
  const cleanedFirstName = firstName.trim();
  const cleanedLastName = lastName.trim();
  const cleanedEmail = email.trim().toLowerCase();

  validateUsername(cleanedUsername);
  validateName(cleanedFirstName, 'First name');
  validateName(cleanedLastName, 'Last name');
  validateEmail(cleanedEmail);

  const displayName = `${cleanedFirstName} ${cleanedLastName}`.trim();

  const { data, error } = await supabase.auth.signUp({
    email: cleanedEmail,
    password,
    options: {
      data: {
        username: cleanedUsername,
        first_name: cleanedFirstName,
        last_name: cleanedLastName,
        display_name: displayName,
      },
    },
  });

  if (error) {
    throw new Error(toFriendlyAuthError(error.message));
  }

  return {
    sessionCreated: Boolean(data.session),
  };
}

export async function signOutCurrentUser(): Promise<void> {
    const { error } = await withTimeout(
        supabase.auth.signOut(),
        5000,
        'Sign out timed out.',
    );

    if (error) {
        throw new Error(error.message);
    }
    }

    async function withTimeout<T>(
    promise: Promise<T>,
    timeoutMs: number,
    message: string,
    ): Promise<T> {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const timeoutPromise = new Promise<never>((_, reject) => {
        timeoutId = setTimeout(() => {
        reject(new Error(message));
        }, timeoutMs);
    });

    try {
        return await Promise.race([promise, timeoutPromise]);
    } finally {
        if (timeoutId) {
        clearTimeout(timeoutId);
        }
    }
    }

function validateUsername(username: string): void {
  if (!USERNAME_REGEX.test(username)) {
    throw new Error('Username must be 3–20 characters and use only letters, numbers, or underscores.');
  }
}

function validateName(value: string, label: string): void {
  if (value.length < 1) {
    throw new Error(`${label} is required.`);
  }

  if (value.length > 80) {
    throw new Error(`${label} must be 80 characters or less.`);
  }
}

function validateEmail(email: string): void {
  if (!email.includes('@') || !email.includes('.')) {
    throw new Error('Enter a valid email address.');
  }
}

function toFriendlyAuthError(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes('duplicate') || lower.includes('unique') || lower.includes('username')) {
    return 'That username is already taken.';
  }

  if (lower.includes('already registered') || lower.includes('already exists')) {
    return 'An account already exists for that email.';
  }

  if (lower.includes('password')) {
    return message;
  }

  return message || 'Something went wrong. Please try again.';
}