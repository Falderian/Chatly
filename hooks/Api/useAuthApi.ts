import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';
import Api from '../../utils/Api';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'expo-router';
import Storage from '../../utils/Storage';

const useAuthApi = () => {
  const { setUser } = useAuth();
  const router = useRouter();

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
    onSuccess: async data => {
      delete data.accessToken;
      delete data.refreshToken;
      setUser(data);

      router.replace('/');
    },
    onError: error => handleError(error, 'Login'),
  });

  return { registerMutation, loginMutation };
};

export default useAuthApi;
