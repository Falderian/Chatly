import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import Api from '../../utils/Api';

const useAuthApi = () => {
  const { setUser } = useAuth();
  const router = useRouter();

  const handleError = (error: any, action: string) => {
    return error?.message || `${action} failed`;
  };

  const registerMutation = useMutation({
    mutationFn: Api.users.register,
    onSuccess: (_, variables) => {
      Alert.alert('Success', 'Registration successful');

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
