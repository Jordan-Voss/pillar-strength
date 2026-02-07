import { Stack, usePathname, router } from "expo-router";
import React, { useEffect } from "react";

import { useSession } from "../src/lib/useSession";

export default function RootLayout() {
  const { session, initializing } = useSession();
  const pathname = usePathname();

  useEffect(() => {
    if (initializing) return;

    const inAuth = pathname.startsWith("/(auth)");
    const inTabs = pathname.startsWith("/(tabs)");

    if (!session && inTabs) {
      router.replace("/(auth)/login");
    }

    if (session && inAuth) {
      router.replace("/(tabs)/schedule");
    }
  }, [session, initializing, pathname]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
