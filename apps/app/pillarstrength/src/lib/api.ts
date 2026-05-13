import { supabase } from './supabase';

const API = process.env.EXPO_PUBLIC_API_BASE_URL!;

export async function getMe() {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;

  console.log('token exists?', !!token);
  console.log('token preview', token?.slice(0, 30));

  if (!token) {
    throw new Error('Not signed in');
  }

  const res = await fetch(`${API}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed: ${res.status}`);
  }

  return res.json();
}