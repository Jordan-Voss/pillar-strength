import { NativeTabs } from 'expo-router/unstable-native-tabs';
import React from 'react';
import { DynamicColorIOS, Platform } from 'react-native';

import { lightTheme as theme } from '@/theme/theme';

const isIOS = Platform.OS === 'ios';

const selectedColor = isIOS
  ? DynamicColorIOS({
      light: theme.colors.interactive.primary,
      dark: '#FFFFFF',
    })
  : theme.colors.interactive.primary;

const inactiveColor = isIOS
  ? DynamicColorIOS({
      light: theme.colors.navigation.inactive,
      dark: 'rgba(255,255,255,0.72)',
    })
  : theme.colors.navigation.inactive;

export default function AppTabs() {
  return (
    <NativeTabs
      backgroundColor={isIOS ? 'transparent' : theme.colors.navigation.background}
      indicatorColor={isIOS ? 'rgba(215, 38, 61, 0.12)' : theme.colors.bg.tertiary}
      tintColor={selectedColor}
      labelStyle={{
        color: inactiveColor,
        selected: {
          color: selectedColor,
        },
      }}
    >
      <NativeTabs.Trigger name="index" disableTransparentOnScrollEdge={false}>
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require('@/assets/images/tabIcons/home.png')}
          renderingMode="template"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="explore" disableTransparentOnScrollEdge={false}>
        <NativeTabs.Trigger.Label>Library</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require('@/assets/images/tabIcons/explore.png')}
          renderingMode="template"
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}