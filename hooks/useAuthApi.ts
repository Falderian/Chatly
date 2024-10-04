import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';
import Api from '../utils/Api';
import { useAuth } from '../contexts/AuthContext';

const useAuthApi = () => {
  const { setUser } = useAuth();

  const handleError = (error: any, action: string) => Alert.alert('Error', error?.message || `${action} failed`);

  const registerMutation = useMutation({
    mutationFn: Api.users.register,
    onSuccess: (_, variables) => {
      Alert.alert('Success', 'Registration successful');
      console.log('Registration successful, logging in now');

      loginMutation.mutate({ username: variables.username, password: variables.password });
    },
    onError: error => handleError(error, 'Registration'),
  });

  const loginMutation = useMutation({
    mutationFn: Api.users.login,
    onSuccess: async response => {
      const data = await response.json();
      await AsyncStorage.setItem('accessToken', data.accessToken);
      await AsyncStorage.setItem('refreshToken', data.refreshToken);

      delete data.accessToken;
      delete data.refreshToken;
      setUser(data);
    },
    onError: error => handleError(error, 'Login'),
  });

  return { registerMutation, loginMutation };
};

export default useAuthApi;
