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

const indicatorColor = isIOS
  ? DynamicColorIOS({
      light: 'rgba(14, 29, 61, 0.08)',
      dark: 'rgba(255,255,255,0.18)',
    })
  : theme.colors.bg.tertiary;

export default function AppTabs() {
  return (
    <NativeTabs
      backgroundColor={isIOS ? 'transparent' : theme.colors.navigation.background}
      indicatorColor={indicatorColor}
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
        <NativeTabs.Trigger.Icon sf="house" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="log" disableTransparentOnScrollEdge={false}>
        <NativeTabs.Trigger.Label>Log</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="plus.circle" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="progress" disableTransparentOnScrollEdge={false}>
        <NativeTabs.Trigger.Label>Progress</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="chart.line.uptrend.xyaxis" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profile" disableTransparentOnScrollEdge={false}>
        <NativeTabs.Trigger.Label>Profile</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="person.crop.circle" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="home/exercises" hidden />
      <NativeTabs.Trigger name="programs" hidden />
    </NativeTabs>
  );
}