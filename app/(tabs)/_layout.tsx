import { router, Stack, Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { useColors } from '../../hooks/useColors';
import Icon from '../../components/Icon';
import { Pressable } from 'react-native';
import BackButton from '../../components/BackButton';

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
          borderTopColor: colors.background.primary,
          borderTopWidth: 1,
        },
        tabBarLabelStyle: { fontSize: 14, color: colors.text.default },
      }}
      backBehavior='history'
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
