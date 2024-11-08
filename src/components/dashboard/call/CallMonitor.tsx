import React from 'react';
import { useCallMonitoring } from '../../../hooks/useCallMonitoring';
import { CallTranscript } from './CallTranscript';
import { CallControls } from './CallControls';
import { CallTimer } from './CallTimer';
import { RealTimeMetrics } from './RealTimeMetrics';
import { AISuggestions } from './AISuggestions';
import { BuyingSignals } from './BuyingSignals';

interface CallMonitorProps {
  callId: string;
  onEndCall: () => void;
}

export function CallMonitor({ callId, onEndCall }: CallMonitorProps) {
  const { activeCall, messages, isActive } = useCallMonitoring(callId);

  if (!activeCall) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">No active call</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-4 h-full">
      {/* Main Call Area */}
      <div className="col-span-8 space-y-4">
        {/* Call Header */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-black">
                Call with {activeCall.customer}
              </h2>
              <p className="text-sm text-gray-600">Agent: {activeCall.agent}</p>
            </div>
            <div className="flex items-center gap-4">
              <CallTimer
                duration={activeCall.duration}
                isCallActive={isActive}
              />
              <CallControls
                isCallActive={isActive}
                onEndCall={onEndCall}
              />
            </div>
          </div>
        </div>

        {/* Live Transcript */}
        <div className="flex-1 min-h-0">
          <CallTranscript
            messages={messages}
            isCallActive={isActive}
          />
        </div>

        {/* Real-Time Metrics */}
        <RealTimeMetrics
          customerSentiment={activeCall.sentiment}
          talkRatio={{ agent: 60, customer: 40 }}
          isCallActive={isActive}
        />
      </div>

      {/* Sidebar */}
      <div className="col-span-4 space-y-4">
        <AISuggestions
          messages={messages}
          isCallActive={isActive}
        />
        <BuyingSignals
          signals={[
            {
              type: 'positive',
              text: 'Showed interest in enterprise features',
              timestamp: '2 mins ago'
            },
            {
              type: 'negative',
              text: 'Concerned about implementation time',
              timestamp: '1 min ago'
            }
          ]}
        />
      </div>
    </div>
  );
}