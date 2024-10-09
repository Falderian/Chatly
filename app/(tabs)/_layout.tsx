import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { useThemeColors } from '../../hooks/useThemeColors';

export default function TabLayout() {
  const [tabBarActiveTintColor, tabBarInactiveBackgroundColor, tabBarActiveBackgroundColor, text] = useThemeColors([
    'gradient1',
    'background',
    'secondaryBackground',
    'text',
  ]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor,
        tabBarInactiveBackgroundColor,
        tabBarActiveBackgroundColor,
        headerTintColor: text,

        headerStyle: {
          backgroundColor: tabBarActiveBackgroundColor,
          borderBottomColor: tabBarActiveBackgroundColor,
        },
        tabBarStyle: {
          borderTopColor: tabBarActiveBackgroundColor,
        },
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
      <Tabs.Screen
        name='contacts'
        options={{
          title: 'Contacts',
          tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? 'people' : 'people-outline'} color={color} />,
        }}
      />
    </Tabs>
  );
}
