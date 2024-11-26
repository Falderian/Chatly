import { useMutation } from '@tanstack/react-query';
import Api from '../../utils/Api';
import { AxiosError } from 'axios';

const useChatsApi = () => {
  const getUserChats = useMutation({
    mutationFn: Api.chats.getUserChats,
  });

  const getOrCreateChat = useMutation({
    mutationFn: ({ senderId, receiverId }: { senderId: number; receiverId: number }) =>
      Api.chats.create(senderId, receiverId),
  });

  const getChatById = useMutation({
    mutationFn: Api.chats.getChatById,
    onError: (e: AxiosError<any>) => {
      alert(e.response?.data.message);
    },
  });

  return { getUserChats, getOrCreateChat, getChatById };
};

export default useChatsApi;
