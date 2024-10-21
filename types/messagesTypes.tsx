interface IMessage {
  id: number;
  conversationId: number;
  content: string;
  createdAt: string;
  isRead: boolean;
  senderId: number;
}

export type { IMessage };
