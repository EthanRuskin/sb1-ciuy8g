import React from 'react';
import { Shield, Check, AlertTriangle } from 'lucide-react';

interface CompetitorMention {
  name: string;
  context: string;
  suggestedResponse: string;
  differentiators: string[];
}

interface Props {
  competitors?: CompetitorMention[];
}

export function CompetitorInsights({ competitors = [] }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="h-5 w-5 text-indigo-600" />
        <h3 className="font-semibold">Competitive Intelligence</h3>
      </div>

      <div className="space-y-4">
        {competitors.length > 0 ? (
          competitors.map((competitor, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <span className="font-medium">{competitor.name} mentioned</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">"{competitor.context}"</p>
              <div className="mb-3">
                <h4 className="text-sm font-medium mb-2">Suggested Response:</h4>
                <p className="text-sm text-indigo-600">{competitor.suggestedResponse}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Key Differentiators:</h4>
                <ul className="space-y-1">
                  {competitor.differentiators.map((diff, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="h-4 w-4 text-green-600" />
                      {diff}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-4">
            No competitor mentions detected
          </div>
        )}
      </div>
    </div>
  );
}