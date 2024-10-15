import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '../contexts/AuthContext';
import { useColors } from '../hooks/useColors';
import { ActivityIndicator } from 'react-native';

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colors = useColors();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return <ActivityIndicator color={colors.primary} />;

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Stack
          screenOptions={{
            headerShown: true,
            headerStyle: { backgroundColor: colors.background.secondary },
            headerTintColor: colors.text.default,
            headerBackVisible: true,
          }}
        >
          <Stack.Screen name='(tabs)' options={{ headerShown: false }} />

          <Stack.Screen
            name='chat'
            options={{
              headerShown: true,
            }}
          />

          <Stack.Screen
            name='user/profile'
            options={{
              headerShown: true,
              headerTitle: 'User',
            }}
          />
        </Stack>
      </AuthProvider>
    </QueryClientProvider>
  );
}
