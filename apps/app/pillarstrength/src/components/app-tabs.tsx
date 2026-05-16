import { NativeTabs } from 'expo-router/unstable-native-tabs';
import React from 'react';
import { Platform } from 'react-native';

import { lightTheme as theme } from '@/theme/theme';

const isIOS = Platform.OS === 'ios';

export default function AppTabs() {
  return (
    <NativeTabs
      backgroundColor={
        isIOS
          ? 'rgba(255, 255, 255, 0.72)'
          : 'rgba(255, 255, 255, 0.96)'
      }
      indicatorColor={
        isIOS
          ? 'rgba(215, 38, 61, 0.14)'
          : theme.colors.bg.tertiary
      }
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