import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Phone, MessageSquare, AlertCircle } from 'lucide-react';
import { CallTranscript } from './call/CallTranscript';
import { AISuggestions } from './call/AISuggestions';
import { CallFeedback } from './call/CallFeedback';
import { CallCompletionDialog } from './call/CallCompletionDialog';
import { SmartScoring } from './call/SmartScoring';
import { CompetitorInsights } from './call/CompetitorInsights';
import { BuyingSignals } from './call/BuyingSignals';
import { CallControls } from './call/CallControls';
import { CallTimer } from './call/CallTimer';
import { useTranscription } from '../../hooks/useTranscription';

interface Message {
  id: string;
  text: string;
  speaker: 'sales-rep' | 'lead' | 'ai';
  timestamp: Date;
}

export function LiveCallAssistant() {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [callDuration, setCallDuration] = useState(0);
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);

  const {
    isRecording,
    transcription,
    error: transcriptionError,
    hasPermission,
    startRecording,
    stopRecording,
    requestMicrophonePermission
  } = useTranscription();

  // Call duration timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isCallActive) {
      timer = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isCallActive]);

  // Update messages when new transcription arrives
  useEffect(() => {
    if (transcription && transcription.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: transcription,
        speaker: 'lead',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newMessage]);
    }
  }, [transcription]);

  const startCall = async () => {
    try {
      if (!hasPermission) {
        const granted = await requestMicrophonePermission();
        if (!granted) return;
      }
      await startRecording();
      setIsCallActive(true);
      setCallDuration(0);
    } catch (error) {
      console.error('Failed to start call:', error);
    }
  };

  const endCall = async () => {
    try {
      await stopRecording();
      setIsCallActive(false);
      setShowCompletionDialog(true);
    } catch (error) {
      console.error('Failed to end call:', error);
    }
  };

  const mockScore = {
    overall: 85,
    categories: {
      rapport: 90,
      discovery: 85,
      presentation: 88,
      objectionHandling: 82,
      closing: 80
    }
  };

  const mockCompetitors = [
    {
      name: "CompetitorX",
      context: "Customer mentioned they're evaluating CompetitorX",
      suggestedResponse: "Our AI capabilities are more advanced and provide real-time assistance",
      differentiators: ["Real-time AI coaching", "Better integration options", "24/7 support"]
    }
  ];

  const mockSignals = [
    {
      type: 'positive' as const,
      text: "Showed interest in enterprise features",
      timestamp: "2 mins ago"
    },
    {
      type: 'negative' as const,
      text: "Concerned about implementation time",
      timestamp: "1 min ago"
    }
  ];

  if (transcriptionError) {
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded-lg">
        <AlertCircle className="h-5 w-5 inline mr-2" />
        {transcriptionError}
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-2rem)] grid grid-cols-12 gap-4">
      {/* Main Call Area */}
      <div className="col-span-8 space-y-4">
        {/* Call Controls */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <CallTimer duration={callDuration} isCallActive={isCallActive} />
              <span className="text-gray-900">
                {isCallActive ? "In Call with Customer" : "Ready to Start"}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <CallControls
                isCallActive={isCallActive}
                isMuted={isMuted}
                onMuteToggle={() => setIsMuted(!isMuted)}
                onAnswerCall={startCall}
                onEndCall={endCall}
              />
            </div>
          </div>
        </div>

        {/* Call Transcript */}
        <div className="flex-1 min-h-0">
          <CallTranscript messages={messages} isCallActive={isCallActive} />
        </div>
      </div>

      {/* Sidebar */}
      <div className="col-span-4 space-y-4 overflow-y-auto">
        <AISuggestions messages={messages} isCallActive={isCallActive} />
        <SmartScoring score={mockScore} />
        <CompetitorInsights competitors={mockCompetitors} />
        <BuyingSignals signals={mockSignals} />
      </div>

      {/* Call Completion Dialog */}
      {showCompletionDialog && (
        <CallCompletionDialog
          isOpen={showCompletionDialog}
          onClose={() => setShowCompletionDialog(false)}
          onSave={(data) => {
            console.log('Saving call data:', data);
            setShowCompletionDialog(false);
          }}
          folders={[
            { id: 'leads', name: 'Sales Leads', color: 'bg-blue-100' },
            { id: 'followup', name: 'Follow-ups', color: 'bg-yellow-100' },
            { id: 'closed', name: 'Closed Deals', color: 'bg-green-100' }
          ]}
        />
      )}
    </div>
  );
}