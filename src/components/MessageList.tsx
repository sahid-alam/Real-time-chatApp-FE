import React from 'react';
import { Message } from '../types/chat';
import MessageItem from './MessageItem';

interface MessageListProps {
  messages: Message[];
  currentUserName: string;
}

const MessageList: React.FC<MessageListProps> = ({ messages, currentUserName }) => {
  return (
    <div className="h-full overflow-y-auto p-4 space-y-3">
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-center text-text-secondary">
            <p className="text-lg">No messages yet</p>
            <p className="text-sm">Start the conversation!</p>
          </div>
        </div>
      ) : (
        messages.map((message, index) => (
          <MessageItem
            key={`${message.timestamp}-${index}`}
            message={message}
            isOwnMessage={message.type === 'chat' && message.from === currentUserName}
          />
        ))
      )}
    </div>
  );
};

export default MessageList; 