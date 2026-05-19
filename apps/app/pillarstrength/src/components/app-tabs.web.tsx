import { Slot, router, usePathname } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { lightTheme as theme } from '@/theme/theme';

const tabs = [
  {
    href: '/',
    label: 'Home',
    activePaths: ['/', '/index'],
  },
  {
    href: '/log',
    label: 'Log',
    activePaths: ['/log'],
  },
  {
    href: '/progress',
    label: 'Progress',
    activePaths: ['/progress'],
  },
  {
    href: '/profile',
    label: 'Profile',
    activePaths: ['/profile'],
  },
] as const;

export default function AppTabs() {
  const pathname = usePathname();

  return (
    <View style={styles.shell}>
      <View style={styles.webHeader}>
        <Text style={styles.brandText}>Pillar Strength</Text>

        <View style={styles.nav}>
          {tabs.map((tab) => {
            const active = tab.activePaths.some((path) =>
              path === '/' ? pathname === '/' : pathname.startsWith(path),
            );

            return (
              <Pressable
                key={tab.href}
                onPress={() => router.push(tab.href)}
                style={({ pressed }) => [
                  styles.navItem,
                  active && styles.navItemActive,
                  pressed && styles.navItemPressed,
                ]}
              >
                <Text style={[styles.navItemText, active && styles.navItemTextActive]}>
                  {tab.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={styles.content}>
        <Slot />
      </View>
    </View>
  );
}

const webHeaderGlassStyle = {
  backdropFilter: 'blur(18px) saturate(160%)',
  WebkitBackdropFilter: 'blur(18px) saturate(160%)',
} as unknown as object;

const styles = StyleSheet.create({
  shell: {
    flex: 1,
    minHeight: '100vh' as never,
    backgroundColor: theme.colors.bg.primary,
  },
  webHeader: {
    height: 72,
    position: 'sticky' as never,
    top: 0,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    backgroundColor: 'rgba(255,255,255,0.88)',
    borderBottomColor: theme.colors.border,
    borderBottomWidth: 1,
    ...webHeaderGlassStyle,
  } as never,
  brandText: {
    color: theme.colors.text.primary,
    fontSize: 18,
    fontWeight: '900',
  },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  navItem: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.pill,
  },
  navItemActive: {
    backgroundColor: 'rgba(215, 38, 61, 0.10)',
  },
  navItemPressed: {
    opacity: 0.8,
  },
  navItemText: {
    color: theme.colors.text.secondary,
    fontSize: 14,
    fontWeight: '800',
  },
  navItemTextActive: {
    color: theme.colors.navigation.active,
  },
  content: {
    flex: 1,
  },
});