import { useEffect, useState, createContext, useContext } from 'react';
import { Slot, useRouter } from 'expo-router';
import { supabase } from '../src/lib/supabase';
import { apiRequest } from '../src/lib/api';

export interface UserProfile {
  userId: string;
  units: 'METRIC' | 'IMPERIAL';
  e1rmFormula: string;
}

const UserContext = createContext<UserProfile | null>(null);
export const useUser = () => useContext(UserContext);

export default function RootLayout() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const router = useRouter();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        try {
          const data = await apiRequest('/me');
          setUserProfile(data as UserProfile);
          router.replace('/(tabs)/schedule');
        } catch (err) {
          console.error("Failed to fetch user data:", err);
        }
      } else {
        setUserProfile(null);
        router.replace('/(auth)/login');
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  return (
    <UserContext.Provider value={userProfile}>
      <Slot />
    </UserContext.Provider>
  );
}