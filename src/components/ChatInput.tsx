import React from 'react';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  disabled: boolean;
  placeholder: string;
}

const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChange,
  onSend,
  onKeyPress,
  disabled,
  placeholder
}) => {
  return (
    <div className="flex space-x-3">
      <div className="flex-1">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={onKeyPress}
          placeholder={placeholder}
          disabled={disabled}
          className="input-field w-full disabled:opacity-50 disabled:cursor-not-allowed"
          maxLength={500}
        />
      </div>
      
      <button
        onClick={onSend}
        disabled={disabled || !value.trim()}
        className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed px-6"
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput; 