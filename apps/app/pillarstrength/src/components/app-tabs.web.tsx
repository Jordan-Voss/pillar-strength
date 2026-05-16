import { Link, Slot, usePathname } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { lightTheme as theme } from '@/theme/theme';

const tabs = [
  {
    href: '/',
    label: 'Home',
    activePaths: ['/', '/index'],
  },
  {
    href: '/explore',
    label: 'Library',
    activePaths: ['/explore'],
  },
] as const;

const webGlassStyle = {
  backdropFilter: 'blur(24px) saturate(180%)',
  WebkitBackdropFilter: 'blur(24px) saturate(180%)',
} as unknown as object;

export default function AppTabs() {
  const pathname = usePathname();

  return (
    <>
      <Slot />

      <View style={styles.floatingTabWrap}>
        <View style={[styles.tabBar, webGlassStyle]}>
          {tabs.map((tab) => {
            const active = tab.activePaths.includes(pathname as never);

            return (
              <Link key={tab.href} href={tab.href} asChild>
                <Text style={[styles.tab, active && styles.tabActive]}>
                  {tab.label}
                </Text>
              </Link>
            );
          })}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  floatingTabWrap: {
    position: 'fixed' as never,
    left: 0,
    right: 0,
    bottom: 18,
    alignItems: 'center',
    pointerEvents: 'box-none' as never,
    zIndex: 50,
  },
  tabBar: {
    minHeight: 58,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.72)',
    borderColor: 'rgba(232, 236, 242, 0.82)',
    borderWidth: 1,
    borderRadius: theme.borderRadius.pill,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.sm,
    shadowColor: '#0E1D3D',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.16,
    shadowRadius: 28,
  },
  tab: {
    color: theme.colors.navigation.inactive,
    fontSize: 14,
    fontWeight: '800',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.pill,
    overflow: 'hidden',
  },
  tabActive: {
    color: theme.colors.navigation.active,
    backgroundColor: 'rgba(215, 38, 61, 0.12)',
  },
});