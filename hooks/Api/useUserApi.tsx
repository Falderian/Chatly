import { useMutation } from '@tanstack/react-query';
import Api from '../../utils/Api';

const useUserApi = () => {
  const getUser = useMutation({
    mutationFn: Api.users.find,
  });

  return {
    getUser: getUser.mutateAsync,
  };
};

export default useUserApi;
