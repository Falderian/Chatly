import { useMutation } from '@tanstack/react-query';
import Api from '../../utils/Api';
import { AxiosError } from 'axios';

const useMessagesApi = () => {
  const sendMsg = useMutation({
    mutationFn: ({ chatId, msg }: { chatId: number; msg: string }) => Api.messages.create(chatId, msg),
    onError: (e: AxiosError<any>) => {
      alert(e.response?.data.message);
    },
  });

  return { sendMsg };
};

export default useMessagesApi;
