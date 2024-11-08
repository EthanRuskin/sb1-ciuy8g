import React from 'react';
import { Wand2, Lightbulb, AlertCircle } from 'lucide-react';

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

export function AISuggestions({ messages, isCallActive }: Props) {
  const getContextualSuggestions = (messages: Message[]) => {
    const lastLeadMessage = messages
      .filter(m => m.speaker === 'lead')
      .slice(-1)[0]?.text.toLowerCase();

    if (!lastLeadMessage) return [];

    const suggestions = [];

    if (lastLeadMessage.includes('price') || lastLeadMessage.includes('cost')) {
      suggestions.push({
        type: 'response',
        text: "Let me explain our flexible pricing model that scales with your needs.",
        followUp: "Would you like to see a detailed breakdown of our enterprise plan?"
      });
    }

    if (lastLeadMessage.includes('competitor') || lastLeadMessage.includes('other')) {
      suggestions.push({
        type: 'insight',
        text: "Focus on our unique AI capabilities and real-time assistance features.",
        followUp: "Our solution is the only one that provides real-time AI coaching during calls."
      });
    }

    if (lastLeadMessage.includes('implementation') || lastLeadMessage.includes('setup')) {
      suggestions.push({
        type: 'response',
        text: "Our implementation process is streamlined and typically takes 2-3 weeks.",
        followUp: "We provide dedicated support throughout the entire implementation phase."
      });
    }

    if (lastLeadMessage.includes('security') || lastLeadMessage.includes('compliance')) {
      suggestions.push({
        type: 'alert',
        text: "Emphasize our enterprise-grade security measures and compliance certifications.",
        followUp: "We maintain SOC 2 Type II and GDPR compliance."
      });
    }

    return suggestions;
  };

  const suggestions = getContextualSuggestions(messages);

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h3 className="font-semibold mb-4 flex items-center gap-2 text-gray-900">
        <Wand2 className="h-5 w-5 text-indigo-600" />
        AI Suggestions
      </h3>

      <div className="space-y-3">
        {isCallActive ? (
          suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="p-3 bg-gradient-to-r from-indigo-50 to-white rounded-lg border border-indigo-100 cursor-pointer hover:border-indigo-200 transition-colors"
              >
                <div className="flex items-start gap-2">
                  {suggestion.type === 'response' && (
                    <Wand2 className="h-4 w-4 text-indigo-600 mt-1" />
                  )}
                  {suggestion.type === 'insight' && (
                    <Lightbulb className="h-4 w-4 text-yellow-600 mt-1" />
                  )}
                  {suggestion.type === 'alert' && (
                    <AlertCircle className="h-4 w-4 text-red-600 mt-1" />
                  )}
                  <div>
                    <p className="text-gray-900">{suggestion.text}</p>
                    <p className="text-sm text-gray-600 mt-1">{suggestion.followUp}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-4">
              Waiting for conversation to provide relevant suggestions...
            </div>
          )
        ) : (
          <div className="text-center text-gray-500 py-4">
            Start a call to receive AI-powered suggestions
          </div>
        )}
      </div>
    </div>
  );
}