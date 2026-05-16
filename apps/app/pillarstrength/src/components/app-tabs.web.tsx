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

export default function AppTabs() {
  const pathname = usePathname();

  return (
    <View style={styles.shell}>
      <View style={styles.webHeader}>
        <View style={styles.brand}>
          <Text style={styles.brandText}>Pillar Strength</Text>
        </View>

        <View style={styles.nav}>
          {tabs.map((tab) => {
            const active = tab.activePaths.includes(pathname as never);

            return (
              <Link key={tab.href} href={tab.href} asChild>
                <Text style={[styles.navItem, active && styles.navItemActive]}>
                  {tab.label}
                </Text>
              </Link>
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

const styles = StyleSheet.create({
  shell: {
    flex: 1,
    minHeight: '100vh' as never,
    backgroundColor: theme.colors.bg.primary,
  },
  webHeader: {
    height: 72,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    backgroundColor: 'rgba(255,255,255,0.88)',
    borderBottomColor: theme.colors.border,
    borderBottomWidth: 1,
    position: 'sticky' as never,
    top: 0,
    zIndex: 10,
    backdropFilter: 'blur(18px) saturate(160%)' as never,
    WebkitBackdropFilter: 'blur(18px) saturate(160%)' as never,
  } as never,
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
  },
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
    color: theme.colors.text.secondary,
    fontSize: 14,
    fontWeight: '800',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.pill,
    overflow: 'hidden',
    cursor: 'pointer' as never,
  },
  navItemActive: {
    color: theme.colors.navigation.active,
    backgroundColor: 'rgba(215, 38, 61, 0.10)',
  },
  content: {
    flex: 1,
  },
});