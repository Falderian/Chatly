import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';
import Api from '../../utils/Api';

const useMessagesApi = () => {
  const queryClient = useQueryClient();
  const [hasMore, setHasMore] = useState(true);

  const sendMsg = useMutation({
    mutationFn: ({ chatId, msg }: { chatId: number; msg: string }) => Api.messages.create(chatId, msg),
    onError: (e: AxiosError<any>) => {
      alert(e.response?.data.message);
    },
  });

  const getMsgs = useMutation({
    mutationFn: async ({ id, page }: { id: number; page?: number }) => {
      const messages = await Api.messages.getMsgs(id, page);
      return messages;
    },
    onSuccess: (newMessages, variables) => {
      queryClient.setQueryData(['messages', variables.id], (oldMessages: any[] = []) => {
        return [...oldMessages, ...newMessages];
      });
      if (newMessages.length === 0) {
        setHasMore(false);
      }
    },
    onError: (e: AxiosError<any>) => {
      alert(e.response?.data.message);
    },
  });

  return { sendMsg, getMsgs, hasMore };
};

export default useMessagesApi;
