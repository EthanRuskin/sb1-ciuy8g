import React from 'react';
import { Zap, ThumbsUp, ThumbsDown } from 'lucide-react';

interface Signal {
  type: 'positive' | 'negative';
  text: string;
  timestamp: string;
}

interface Props {
  signals: Signal[];
}

export function BuyingSignals({ signals }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="h-5 w-5 text-indigo-600" />
        <h3 className="font-semibold text-gray-900">Buying Signals</h3>
      </div>

      <div className="space-y-3">
        {signals.length > 0 ? (
          signals.map((signal, index) => (
            <div 
              key={index}
              className={`flex items-start gap-2 p-3 rounded-lg ${
                signal.type === 'positive' 
                  ? 'bg-green-50 border border-green-100'
                  : 'bg-red-50 border border-red-100'
              }`}
            >
              {signal.type === 'positive' ? (
                <ThumbsUp className="h-4 w-4 text-green-600 mt-1" />
              ) : (
                <ThumbsDown className="h-4 w-4 text-red-600 mt-1" />
              )}
              <div>
                <p className={`text-sm ${
                  signal.type === 'positive' ? 'text-green-800' : 'text-red-800'
                }`}>
                  {signal.text}
                </p>
                <span className="text-xs text-gray-500">{signal.timestamp}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-4">
            No buying signals detected yet
          </div>
        )}
      </div>
    </div>
  );
}