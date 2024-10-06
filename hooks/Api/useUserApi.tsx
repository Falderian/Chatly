import { useMutation } from '@tanstack/react-query';
import Api from '../../utils/Api';

const useUserApi = () => {
  const getUser = useMutation({
    mutationFn: Api.users.find,
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
