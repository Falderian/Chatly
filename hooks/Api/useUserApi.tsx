import { useMutation } from '@tanstack/react-query';
import Api from '../../utils/Api';

const useUserApi = () => {
  const getUser = useMutation({
    mutationFn: Api.users.find,
    onError: e => console.log(e),
  });

  const searchUsers = useMutation({
    mutationFn: Api.users.search,
    onError: console.error,
  });

  return {
    getUser,
    searchUsers,
  };
};

export default useUserApi;
