import { useMutation } from '@tanstack/react-query';
import Api from '../../utils/Api';
import { useRouter } from 'expo-router';
import { TUser } from '../../types/userTypes';

const useUserApi = () => {
  const getUser = useMutation({
    mutationFn: Api.users.find,
    onError: e => console.log(e),
  });

  const searchUsers = useMutation({
    mutationFn: Api.users.search,
  });

  return {
    getUser,
    searchUsers,
  };
};

export default useUserApi;
