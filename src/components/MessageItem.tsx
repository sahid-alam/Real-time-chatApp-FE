import React from 'react';
import { Message } from '../types/chat';

interface MessageItemProps {
  message: Message;
  isOwnMessage: boolean;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, isOwnMessage }) => {
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (message.type === 'chat') {
    return (
      <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
        <div className={`max-w-xs md:max-w-md ${isOwnMessage ? 'order-2' : 'order-1'}`}>
          <div className={`message-bubble ${isOwnMessage ? 'message-own' : 'message-other'}`}>
            <div className={`text-base mb-1 ${isOwnMessage ? 'sender-own' : 'sender-highlight'}`}>
              {isOwnMessage ? 'You' : message.from}
            </div>
            <div className="text-base leading-relaxed">
              {message.text}
            </div>
            <div className="text-xs mt-1 text-retro-amber">
              {formatTime(message.timestamp)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (message.type === 'info' || message.type === 'error') {
    return (
      <div className="flex justify-center">
        <div className="message-system px-4 py-2 rounded-lg">
          <div className={`text-sm ${message.type === 'error' ? 'text-error' : 'text-text-secondary'}`}>
            {message.message}
          </div>
          <div className="text-xs text-text-secondary mt-1">
            {formatTime(message.timestamp)}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default MessageItem; 