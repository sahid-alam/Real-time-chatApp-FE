import React from 'react';
import { ConnectionStatus } from '../types/chat';

interface ChatHeaderProps {
  roomCode: string;
  connectionStatus: ConnectionStatus;
  onLeaveRoom: () => void;
  userCount: number;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  roomCode,
  connectionStatus,
  onLeaveRoom,
  userCount
}) => {
  const getStatusText = (status: ConnectionStatus) => {
    switch (status) {
      case 'connected':
        return 'Connected';
      case 'connecting':
        return 'Connecting...';
      case 'disconnected':
        return 'Disconnected';
      case 'error':
        return 'Connection Error';
      default:
        return 'Unknown';
    }
  };

  const getStatusColor = (status: ConnectionStatus) => {
    switch (status) {
      case 'connected':
        return 'text-success';
      case 'connecting':
        return 'text-warning';
      case 'disconnected':
      case 'error':
        return 'text-error';
      default:
        return 'text-text-secondary';
    }
  };

  return (
    <div className="bg-black border-b-2 border-retro-border px-4 py-3 font-retro">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div>
            <h2 className="text-2xl font-retro text-retro-green flex items-center">
              &#128172; Room: <span className="ml-2 text-retro-amber">{roomCode}</span>
            </h2>
            <div className="text-retro-amber text-base mt-1">Users: {userCount}</div>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`status-indicator status-${connectionStatus}`} />
            <span className={`text-base ${getStatusColor(connectionStatus)}`}>{getStatusText(connectionStatus)}</span>
          </div>
        </div>
        <button onClick={onLeaveRoom} className="btn-secondary text-base">Leave Room</button>
      </div>
    </div>
  );
};

export default ChatHeader; 