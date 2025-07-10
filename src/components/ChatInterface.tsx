import React, { useState, useRef, useEffect } from 'react';
import { Message, User, ConnectionStatus } from '../types/chat';
import MessageList from './MessageList';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import { FaArrowDown } from 'react-icons/fa';

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
  const messagesAreaRef = useRef<HTMLDivElement>(null);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);

  // Helper to check if user is at the bottom
  const isAtBottom = () => {
    const area = messagesAreaRef.current;
    if (!area) return true;
    return area.scrollHeight - area.scrollTop - area.clientHeight < 40;
  };

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    setShowScrollToBottom(false);
  };

  // Show/hide arrow on scroll
  const handleScroll = () => {
    setShowScrollToBottom(!isAtBottom());
  };

  // On new message, show arrow if not at bottom
  useEffect(() => {
    if (!isAtBottom()) {
      setShowScrollToBottom(true);
    } else {
      scrollToBottom();
    }
    // eslint-disable-next-line
  }, [messages]);

  useEffect(() => {
    const area = messagesAreaRef.current;
    if (area) {
      area.addEventListener('scroll', handleScroll);
      return () => area.removeEventListener('scroll', handleScroll);
    }
  }, []);

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
    <div className="h-screen flex flex-col bg-dark-bg w-full max-w-full">
      {/* Header */}
      <ChatHeader
        roomCode={currentUser.room}
        connectionStatus={connectionStatus}
        onLeaveRoom={onLeaveRoom}
        userCount={userCount}
      />

      {/* Messages Area */}
      <div
        className="flex-1 overflow-y-auto min-h-0 px-2 sm:px-4 pb-2 relative"
        ref={messagesAreaRef}
      >
        <MessageList
          messages={messages}
          currentUserName={currentUser.name}
        />
        <div ref={messagesEndRef} />
        {showScrollToBottom && (
          <button
            className="fixed bottom-24 right-6 z-20 bg-retro-green text-black p-4 rounded-full border-2 border-retro-border shadow-[0_0_16px_4px_#39FF14] animate-bounce hover:bg-retro-amber hover:text-black transition-colors focus:outline-none focus:ring-4 focus:ring-retro-green"
            onClick={scrollToBottom}
            aria-label="Scroll to latest message"
            style={{ boxShadow: '0 0 16px 4px #39FF14, 0 2px 8px rgba(0,0,0,0.3)' }}
          >
            <FaArrowDown size={32} />
          </button>
        )}
      </div>

      {/* Input Area */}
      <div className="p-2 sm:p-4 border-t border-dark-border bg-dark-bg sticky bottom-0 w-full">
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