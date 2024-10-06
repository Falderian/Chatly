import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { useThemeColors } from '../../hooks/useThemeColors';

export default function TabLayout() {
  const [tabBarActiveTintColor, tabBarInactiveBackgroundColor, tabBarActiveBackgroundColor] = useThemeColors([
    'gradient1',
    'background',
    'secondaryBackground',
  ]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor,
        tabBarInactiveBackgroundColor,
        tabBarActiveBackgroundColor,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Chats',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'chatbubbles' : 'chatbubbles-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
