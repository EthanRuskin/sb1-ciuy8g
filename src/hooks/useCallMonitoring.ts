import { useState, useEffect } from 'react';
import { useSocket } from './useSocket';
import { useTranscription } from './useTranscription';

interface CallData {
  id: string;
  agent: string;
  customer: string;
  duration: number;
  status: 'active' | 'hold' | 'ended';
  sentiment: 'positive' | 'neutral' | 'negative';
}

interface Message {
  id: string;
  speaker: 'agent' | 'customer';
  text: string;
  timestamp: Date;
  sentiment?: 'positive' | 'neutral' | 'negative';
}

export function useCallMonitoring(callId?: string) {
  const [activeCall, setActiveCall] = useState<CallData | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const { onCallStarted, onCallEnded, onTranscription, joinCall, leaveCall } = useSocket();
  const { startRecording, stopRecording } = useTranscription();

  useEffect(() => {
    if (callId) {
      joinCall(callId);

      const handleCallStart = (data: CallData) => {
        setActiveCall(data);
        startRecording();
      };

      const handleCallEnd = () => {
        setActiveCall(null);
        stopRecording();
      };

      const handleTranscription = (data: { text: string; speaker: 'agent' | 'customer' }) => {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          ...data,
          timestamp: new Date()
        }]);
      };

      const unsubscribeStart = onCallStarted(handleCallStart);
      const unsubscribeEnd = onCallEnded(handleCallEnd);
      const unsubscribeTranscription = onTranscription(handleTranscription);

      return () => {
        leaveCall(callId);
        unsubscribeStart();
        unsubscribeEnd();
        unsubscribeTranscription();
      };
    }
  }, [callId]);

  return {
    activeCall,
    messages,
    isActive: !!activeCall
  };
}