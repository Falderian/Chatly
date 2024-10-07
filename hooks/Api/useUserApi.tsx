import { useMutation } from '@tanstack/react-query';
import Api from '../../utils/Api';
import { useRouter } from 'expo-router';

const useUserApi = () => {
  const router = useRouter();

  const getUser = useMutation({
    mutationFn: Api.users.find,
    onError: e => console.log(e),
  });

  const searchUsers = useMutation({
    mutationFn: Api.users.search,
  });

  return {
    getUser: getUser.mutateAsync,
    searchUsers,
  };
};

export default useUserApi;
