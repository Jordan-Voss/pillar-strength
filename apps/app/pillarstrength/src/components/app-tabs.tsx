import { NativeTabs } from 'expo-router/unstable-native-tabs';
import React from 'react';

import { lightTheme as theme } from '@/theme/theme';

export default function AppTabs() {
  return (
    <NativeTabs
      backgroundColor={theme.colors.navigation.background}
      indicatorColor={theme.colors.bg.tertiary}
      labelStyle={{
        color: theme.colors.navigation.inactive,
        selected: { color: theme.colors.navigation.active },
      }}
    >
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require('@/assets/images/tabIcons/home.png')}
          renderingMode="template"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="explore">
        <NativeTabs.Trigger.Label>Exercises</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require('@/assets/images/tabIcons/explore.png')}
          renderingMode="template"
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}