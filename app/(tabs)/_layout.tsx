import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { useColors } from '../../hooks/useColors';

export default function TabLayout() {
  const colors = useColors();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarActiveBackgroundColor: colors.background.secondary,
        tabBarInactiveBackgroundColor: colors.background.secondary,
        headerTintColor: colors.text.default,
        headerStyle: {
          backgroundColor: colors.background.secondary,
          borderBottomColor: colors.background.primary,
        },
        tabBarStyle: {
          height: 60,
          borderTopWidth: 0,
          borderBottomWidth: 2,
          borderColor: colors.background.primary,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          color: colors.text.default,
        },
      }}
      backBehavior='order'
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
