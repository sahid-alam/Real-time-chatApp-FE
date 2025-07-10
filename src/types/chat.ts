export interface ChatMessage {
  type: 'chat';
  text: string;
  from: string;
  timestamp: number;
}

export interface SystemMessage {
  type: 'info' | 'error';
  message: string;
  timestamp: number;
}

export interface JoinMessage {
  type: 'join';
  room: string;
  name: string;
}

export interface ChatSendMessage {
  type: 'chat';
  text: string;
}

export type Message = ChatMessage | SystemMessage;

export interface WebSocketMessage {
  type: 'info' | 'error' | 'chat' | 'user_count' | 'user_list' | 'userCount';
  message?: string;
  text?: string;
  room?: string;
  from?: string;
  count?: number;
  users?: string[];
}

export interface User {
  name: string;
  room: string;
}

export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

export interface ChatState {
  messages: Message[];
  connectionStatus: ConnectionStatus;
  currentUser: User | null;
  roomCode: string;
} 