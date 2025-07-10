import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import ChatInterface from './components/ChatInterface';
import { WebSocketService } from './utils/websocket';
import type { Message, User, ConnectionStatus, WebSocketMessage } from './types/chat';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [wsService, setWsService] = useState<WebSocketService | null>(null);
  const [userCount, setUserCount] = useState<number>(1);

  useEffect(() => {
    const ws = new WebSocketService(
      'ws://localhost:8081',
      handleWebSocketMessage,
      handleConnectionStatusChange
    );
    setWsService(ws);

    return () => {
      ws.disconnect();
    };
  }, []);

  const handleWebSocketMessage = (message: WebSocketMessage) => {
    const timestamp = Date.now();
    
    if (message.type === 'chat' && message.text && message.from) {
      const chatMessage: Message = {
        type: 'chat',
        text: message.text,
        from: message.from,
        timestamp
      };
      setMessages(prev => [...prev, chatMessage]);
    } else if (message.type === 'info' && message.message) {
      const systemMessage: Message = {
        type: 'info',
        message: message.message,
        timestamp
      };
      setMessages(prev => [...prev, systemMessage]);
    } else if (message.type === 'error' && message.message) {
      const errorMessage: Message = {
        type: 'error',
        message: message.message,
        timestamp
      };
      setMessages(prev => [...prev, errorMessage]);
    } else if ((message.type === 'user_count' || message.type === 'userCount') && typeof message.count === 'number') {
      setUserCount(message.count);
    } else if (message.type === 'user_list' && Array.isArray(message.users)) {
      setUserCount(message.users.length);
    }
  };

  const handleConnectionStatusChange = (status: string) => {
    setConnectionStatus(status as ConnectionStatus);
  };

  const joinRoom = async (roomCode: string, userName: string) => {
    if (!wsService) return;

    try {
      await wsService.connect();
      wsService.send({ type: 'join', room: roomCode, name: userName });
      setCurrentUser({ name: userName, room: roomCode });
    } catch (error) {
      console.error('Failed to join room:', error);
    }
  };

  const leaveRoom = () => {
    if (wsService) {
      wsService.disconnect();
    }
    setCurrentUser(null);
    setMessages([]);
  };

  const sendMessage = (text: string) => {
    if (wsService && currentUser) {
      wsService.send({ type: 'chat', text });
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg">
      {!currentUser ? (
        <LandingPage onJoinRoom={joinRoom} />
      ) : (
        <ChatInterface
          messages={messages}
          connectionStatus={connectionStatus}
          currentUser={currentUser}
          onSendMessage={sendMessage}
          onLeaveRoom={leaveRoom}
          userCount={userCount}
        />
      )}
    </div>
  );
}

export default App; 