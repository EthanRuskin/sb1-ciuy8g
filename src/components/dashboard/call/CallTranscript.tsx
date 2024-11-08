import React from 'react';
import { MessageSquare, User, Bot } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  speaker: 'sales-rep' | 'lead' | 'ai';
  timestamp: Date;
}

interface Props {
  messages: Message[];
  isCallActive: boolean;
}

export function CallTranscript({ messages, isCallActive }: Props) {
  return (
    <div className="h-[calc(100vh-15rem)] bg-gray-50 rounded-lg p-4 overflow-y-auto">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="h-5 w-5 text-indigo-600" />
        <h3 className="font-semibold text-gray-900">Live Transcript</h3>
      </div>

      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.speaker === 'sales-rep' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                message.speaker === 'sales-rep'
                  ? 'bg-indigo-600 text-white'
                  : message.speaker === 'ai'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-white text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                {message.speaker === 'lead' && <User className="h-4 w-4" />}
                {message.speaker === 'ai' && <Bot className="h-4 w-4" />}
                <span className="text-xs opacity-75">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
              <p className="text-gray-900">{message.text}</p>
            </div>
          </div>
        ))}

        {!messages.length && (
          <div className="text-center text-gray-500 py-8">
            {isCallActive
              ? "The call transcript will appear here..."
              : "Start a call to begin transcription"}
          </div>
        )}
      </div>
    </div>
  );
}