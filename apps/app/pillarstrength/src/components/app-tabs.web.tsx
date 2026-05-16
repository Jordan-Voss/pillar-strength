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
    label: 'Exercises',
    activePaths: ['/explore'],
  },
] as const;

export default function AppTabs() {
  const pathname = usePathname();

  return (
    <View style={styles.shell}>
      <View style={styles.content}>
        <Slot />
      </View>

      <View style={styles.tabBar}>
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
  );
}

const styles = StyleSheet.create({
  shell: {
    flex: 1,
    backgroundColor: theme.colors.bg.primary,
  },
  content: {
    flex: 1,
  },
  tabBar: {
    minHeight: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.md,
    backgroundColor: theme.colors.navigation.background,
    borderTopColor: theme.colors.navigation.border,
    borderTopWidth: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
  },
  tab: {
    color: theme.colors.navigation.inactive,
    fontSize: 14,
    fontWeight: '700',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.pill,
    overflow: 'hidden',
  },
  tabActive: {
    color: theme.colors.navigation.active,
    backgroundColor: theme.colors.navigation.selectedBackground,
  },
});