import { useMutation } from '@tanstack/react-query';
import Api from '../../utils/Api';

const useUserApi = () => {
  const getUser = useMutation({
    mutationFn: Api.users.find,
    onError: e => console.log(e),
  });

  const searchUsers = useMutation({
    mutationFn: ({ query, page }: { query: string; page: number }) => Api.users.search(query, page),
  });

  return {
    getUser,
    searchUsers,
  };
};

export default useUserApi;
