import { IMessage } from './messagesTypes';

interface IChat {
  id: number;
  messages: (IMessage & { sender: { firstName: string; lastName: string } })[];
}

interface IChatWithParticipant extends IChat {
  id: number;
  lastMessage: { content: string; createdAt: string; isRead: boolean };
  isOwnLastMesssage: boolean;
  participant: {
    id: number;
    firstName: string;
    lastName: string;
  };
}

export type { IChat, IChatWithParticipant };
