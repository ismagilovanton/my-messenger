import { User } from './user.types';

export interface CreateChatRequest {
  title: string;
}
export interface CreateChatResponse {
  id: number;
}


export interface Chat {
  id: number,
  title: string,
  avatar: string,
  unread_count: number,
  created_by: number,
  last_message: Message
}


export interface Message {
  user: User,
  time: string,
  content: string
}



export interface ChatMessage {
  id: number,
  user_id: number,
  chat_id: number,
  type: 'message',
  time: string,
  content: string,
  is_read: boolean,
  file: File | null
}
