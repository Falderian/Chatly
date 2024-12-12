import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import { useColors } from '../hooks/useColors';
import { AuthProvider } from '../services/AuthContext';
import store from '../services/store';

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
      <Provider store={store}>
        <AuthProvider>
          <NavigationContainer>
            <Stack
              screenOptions={{
                headerShown: true,
                headerStyle: { backgroundColor: colors.background.secondary },
                headerTintColor: colors.text.default,
                headerBackVisible: true,
                statusBarStyle: 'dark',
                statusBarBackgroundColor: colors.background.secondary,
                navigationBarColor: colors.background.secondary,
              }}
            >
              <Stack.Screen
                name='login/index'
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name='register/index'
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
              <Stack.Screen
                name='chat/index'
                options={{
                  headerShown: true,
                  title: '',
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
          </NavigationContainer>
        </AuthProvider>
      </Provider>
    </QueryClientProvider>
  );
}
