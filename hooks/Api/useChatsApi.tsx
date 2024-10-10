import { useMutation } from '@tanstack/react-query';
import Api from '../../utils/Api';

const useChatsApi = () => {
  const getUserChats = useMutation({
    mutationFn: Api.chats.getUserChats,
  });

  return { getUserChats: getUserChats.mutateAsync };
};

export default useChatsApi;
