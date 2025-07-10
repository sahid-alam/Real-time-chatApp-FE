import React, { useState, useRef, useEffect } from 'react';
import { Message, User, ConnectionStatus } from '../types/chat';
import MessageList from './MessageList';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';

interface ChatInterfaceProps {
  messages: Message[];
  connectionStatus: ConnectionStatus;
  currentUser: User;
  onSendMessage: (text: string) => void;
  onLeaveRoom: () => void;
  userCount: number;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  connectionStatus,
  currentUser,
  onSendMessage,
  onLeaveRoom,
  userCount
}) => {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() && connectionStatus === 'connected') {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-screen flex flex-col bg-dark-bg">
      {/* Header */}
      <ChatHeader
        roomCode={currentUser.room}
        connectionStatus={connectionStatus}
        onLeaveRoom={onLeaveRoom}
        userCount={userCount}
      />

      {/* Messages Area */}
      <div className="flex-1 overflow-hidden">
        <MessageList
          messages={messages}
          currentUserName={currentUser.name}
        />
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-dark-border">
        <ChatInput
          value={inputValue}
          onChange={setInputValue}
          onSend={handleSendMessage}
          onKeyPress={handleKeyPress}
          disabled={connectionStatus !== 'connected'}
          placeholder={
            connectionStatus === 'connected'
              ? 'Type your message...'
              : 'Connecting...'
          }
        />
      </div>
    </div>
  );
};

export default ChatInterface; 