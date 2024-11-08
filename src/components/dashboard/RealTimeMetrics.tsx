import React from 'react';
import { BarChart2, TrendingUp, Heart } from 'lucide-react';

interface Props {
  customerSentiment: string;
  talkRatio: { agent: number; customer: number };
  isCallActive: boolean;
}

export function RealTimeMetrics({ customerSentiment, talkRatio, isCallActive }: Props) {
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'text-green-600';
      case 'neutral':
        return 'text-yellow-600';
      case 'negative':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded-lg bg-gray-50">
          <div className="flex items-center gap-2 mb-2">
            <Heart className={`h-5 w-5 ${getSentimentColor(customerSentiment)}`} />
            <span className="text-sm font-medium">Sentiment</span>
          </div>
          <div className="text-lg font-semibold capitalize">{customerSentiment}</div>
        </div>

        <div className="p-4 rounded-lg bg-gray-50">
          <div className="flex items-center gap-2 mb-2">
            <BarChart2 className="h-5 w-5 text-indigo-600" />
            <span className="text-sm font-medium">Talk Ratio</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-600 rounded-full"
                style={{ width: `${talkRatio.agent}%` }}
              />
            </div>
            <span className="text-sm text-gray-600">{talkRatio.agent}%</span>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-gray-50">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium">Engagement</span>
          </div>
          <div className="text-lg font-semibold">High</div>
        </div>
      </div>
    </div>
  );
}