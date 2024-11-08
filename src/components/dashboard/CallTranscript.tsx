import React, { useState, useEffect } from 'react';
import { MessageSquare, User, Bot } from 'lucide-react';

interface Message {
  id: number;
  speaker: 'agent' | 'customer';
  text: string;
  timestamp: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
}

interface Props {
  isCallActive: boolean;
}

export function CallTranscript({ isCallActive }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);

  // Simulate real-time conversation for demo
  useEffect(() => {
    if (isCallActive) {
      const demoConversation = [
        { speaker: 'agent', text: "Hello! Thanks for your interest in our enterprise solution. How can I help you today?" },
        { speaker: 'customer', text: "Hi, I'm interested in learning more about your pricing for a team of 50 people." },
        { speaker: 'agent', text: "I'd be happy to discuss our enterprise pricing. For a team of 50, we offer custom packages with volume discounts." }
      ];

      let index = 0;
      const interval = setInterval(() => {
        if (index < demoConversation.length) {
          const newMessage = {
            id: Date.now(),
            ...demoConversation[index],
            timestamp: new Date().toLocaleTimeString(),
            sentiment: 'positive'
          } as Message;
          
          setMessages(prev => [...prev, newMessage]);
          index++;
        }
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isCallActive]);

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col h-full">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="h-5 w-5 text-indigo-600" />
        <h2 className="font-semibold">Live Transcript</h2>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${
              message.speaker === 'agent' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`flex gap-2 max-w-[80%] ${
                message.speaker === 'agent'
                  ? 'bg-indigo-50 text-indigo-900'
                  : 'bg-gray-50 text-gray-900'
              } p-3 rounded-lg`}
            >
              {message.speaker === 'customer' ? (
                <User className="h-5 w-5 text-gray-500 flex-shrink-0" />
              ) : (
                <Bot className="h-5 w-5 text-indigo-600 flex-shrink-0" />
              )}
              <div>
                <div className="text-sm">{message.text}</div>
                <div className="text-xs text-gray-500 mt-1">{message.timestamp}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}