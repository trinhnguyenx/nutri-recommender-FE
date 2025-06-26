export interface MessageInput {
  userId: string;
  message: string;
  conversationId: string;
}
export interface Message {
  message: string;
  conversationId: string;
  sender: string;
}
