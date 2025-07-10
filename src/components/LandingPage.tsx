import React, { useState } from 'react';
import { generateRoomCode, validateRoomCode, validateUserName } from '../utils/roomUtils';

interface LandingPageProps {
  onJoinRoom: (roomCode: string, userName: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onJoinRoom }) => {
  const [roomCode, setRoomCode] = useState('');
  const [userName, setUserName] = useState('');
  const [errors, setErrors] = useState<{ roomCode?: string; userName?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateRoom = () => {
    const newRoomCode = generateRoomCode();
    setRoomCode(newRoomCode);
    setErrors({});
  };

  const handleJoinRoom = async () => {
    const newErrors: { roomCode?: string; userName?: string } = {};

    if (!validateRoomCode(roomCode)) {
      newErrors.roomCode = 'Room code must be 6 characters (letters and numbers)';
    }

    if (!validateUserName(userName)) {
      newErrors.userName = 'Name must be between 2 and 20 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      await onJoinRoom(roomCode.toUpperCase(), userName.trim());
    } catch (error) {
      console.error('Failed to join room:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleJoinRoom();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card p-8 w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-title text-text-primary mb-2">
            Real Time Chat
          </h1>
          <p className="text-text-secondary text-sm">
            Temporary room that expires after both users exit
          </p>
        </div>

        <div className="space-y-6">
          {/* Create Room Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-text-primary">Create New Room</h2>
            <button
              onClick={handleCreateRoom}
              className="btn-primary w-full"
              disabled={isLoading}
            >
              Create New Room
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-dark-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-dark-surface text-text-secondary">or</span>
            </div>
          </div>

          {/* Join Room Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-text-primary">Join Existing Room</h2>
            
            <div>
              <label htmlFor="roomCode" className="block text-sm font-medium text-text-secondary mb-2">
                Room Code
              </label>
              <input
                id="roomCode"
                type="text"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                onKeyPress={handleKeyPress}
                placeholder="Enter 6-character room code"
                className="input-field w-full"
                maxLength={6}
              />
              {errors.roomCode && (
                <p className="text-error text-sm mt-1">{errors.roomCode}</p>
              )}
            </div>

            <div>
              <label htmlFor="userName" className="block text-sm font-medium text-text-secondary mb-2">
                Your Name
              </label>
              <input
                id="userName"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter your name"
                className="input-field w-full"
                maxLength={20}
              />
              {errors.userName && (
                <p className="text-error text-sm mt-1">{errors.userName}</p>
              )}
            </div>

            <button
              onClick={handleJoinRoom}
              disabled={isLoading || !roomCode || !userName}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Joining...' : 'Join Room'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage; 