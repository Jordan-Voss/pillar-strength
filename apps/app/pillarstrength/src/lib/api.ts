import { supabase } from './supabase';

const API = process.env.EXPO_PUBLIC_API_BASE_URL;

if (!API) {
  throw new Error('Missing EXPO_PUBLIC_API_BASE_URL');
}

export type MeResponse = {
  user: {
    id: string;
    email: string;
    username?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    displayName?: string | null;
    onboardingComplete: boolean;
  };
  preferences: {
    theme: string;
    timezone: string;
    units: string;
    e1rmFormula: string;
  };
};

export type UsernameAvailabilityResponse = {
  username: string;
  available: boolean;
  reason: string;
};

export async function getMe(accessToken?: string): Promise<MeResponse> {
  const token = accessToken ?? (await getCurrentAccessToken());

  if (!token) {
    throw new Error('Not signed in.');
  }

  const response = await fetchWithTimeout(`${API}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const message = await readErrorMessage(response);
    throw new Error(message || `Failed to load profile. Status: ${response.status}`);
  }

  return response.json();
}

export async function checkUsernameAvailability(
  username: string,
): Promise<UsernameAvailabilityResponse> {
  const query = encodeURIComponent(username.trim());

  const response = await fetchWithTimeout(
    `${API}/auth/username-availability?username=${query}`,
  );

  if (!response.ok) {
    const message = await readErrorMessage(response);
    throw new Error(message || 'Could not check username availability.');
  }

  return response.json();
}

export async function readErrorMessage(response: Response): Promise<string | null> {
  try {
    const body = await response.json();

    if (typeof body?.message === 'string') {
      return body.message;
    }

    if (typeof body?.error === 'string') {
      return body.error;
    }

    return null;
  } catch {
    try {
      const text = await response.text();
      return text || null;
    } catch {
      return null;
    }
  }
}

async function getCurrentAccessToken(): Promise<string | undefined> {
  const sessionResult = await withTimeout(
    supabase.auth.getSession(),
    5000,
    'Timed out reading Supabase session.',
  );

  return sessionResult.data.session?.access_token;
}

async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeoutMs = 8000,
): Promise<Response> {
  const controller = new AbortController();

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
    });
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error(`Request timed out calling ${url}`);
    }

    if (error instanceof Error) {
      throw new Error(`${error.message} calling ${url}`);
    }

    throw error;
  } finally {
    clearTimeout(timeoutId);
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