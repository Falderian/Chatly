import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { useThemeColors } from '../../hooks/useThemeColors';
import Header from '../../components/Header';

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
        header: props => <Header {...props} />,
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
