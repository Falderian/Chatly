import { IMessage } from './messagesTypes';

interface IChat {
  id: number;
  messages: (IMessage & { sender: { firstName: string; lastName: string } })[];
}

export type { IChat };
