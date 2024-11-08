import React from 'react';
import { Clock } from 'lucide-react';

interface CallTimerProps {
  duration: number;
  isCallActive: boolean;
}

export function CallTimer({ duration, isCallActive }: CallTimerProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
      isCallActive 
        ? 'bg-green-100 text-green-700' 
        : 'bg-gray-100 text-gray-600'
    }`}>
      <Clock className="h-4 w-4" />
      <span className="font-mono">{formatTime(duration)}</span>
    </div>
  );
}