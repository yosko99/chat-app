export interface MessageType {
  conversationForeignKey: number;
  createdAt: Date;
  id: number;
  message: string;
  sentBy: string;
  status: string;
}
