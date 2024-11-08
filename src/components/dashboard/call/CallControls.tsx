import React, { useState } from 'react';
import { Mic, MicOff, Phone, PhoneOff } from 'lucide-react';

interface CallControlsProps {
  isCallActive: boolean;
  isMuted: boolean;
  onMuteToggle: () => void;
  onAnswerCall: () => Promise<void>;
  onEndCall: () => void;
}

export function CallControls({
  isCallActive,
  isMuted,
  onMuteToggle,
  onAnswerCall,
  onEndCall
}: CallControlsProps) {
  const [isRequestingPermission, setIsRequestingPermission] = useState(false);

  const handleAnswerCall = async () => {
    setIsRequestingPermission(true);
    try {
      await onAnswerCall();
    } catch (error) {
      console.error('Failed to start call:', error);
    } finally {
      setIsRequestingPermission(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onMuteToggle}
        className={`p-3 rounded-full transition-colors ${
          isMuted ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
        } hover:bg-opacity-80`}
        disabled={!isCallActive}
        title={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
      </button>

      {isCallActive ? (
        <button
          onClick={onEndCall}
          className="p-3 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors"
          title="End Call"
        >
          <PhoneOff className="h-5 w-5" />
        </button>
      ) : (
        <button
          onClick={handleAnswerCall}
          disabled={isRequestingPermission}
          className="p-3 rounded-full bg-green-600 text-white hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Answer Call"
        >
          <Phone className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}