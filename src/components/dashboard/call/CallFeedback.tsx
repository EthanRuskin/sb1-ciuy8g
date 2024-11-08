import React, { useEffect, useState } from 'react';
import { ClipboardList, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface Props {
  selectedCallId: string | null;
  isAnalyzing: boolean;
  onClose: () => void;
}

interface FeedbackPoint {
  type: 'positive' | 'improvement' | 'critical';
  text: string;
}

export function CallFeedback({ selectedCallId, isAnalyzing, onClose }: Props) {
  const [feedback, setFeedback] = useState<FeedbackPoint[]>([]);

  useEffect(() => {
    if (selectedCallId && isAnalyzing) {
      // Simulate AI analysis
      setTimeout(() => {
        setFeedback([
          {
            type: 'positive',
            text: "Excellent use of active listening and follow-up questions"
          },
          {
            type: 'positive',
            text: "Strong value proposition presentation when discussing pricing"
          },
          {
            type: 'improvement',
            text: "Consider addressing objections more directly"
          },
          {
            type: 'improvement',
            text: "Opportunity to provide more specific customer success stories"
          },
          {
            type: 'critical',
            text: "Important to follow up on security compliance questions"
          }
        ]);
      }, 2000);
    }
  }, [selectedCallId, isAnalyzing]);

  if (!selectedCallId) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold flex items-center gap-2">
          <ClipboardList className="h-5 w-5 text-indigo-600" />
          Call Analysis & Feedback
        </h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <XCircle className="h-5 w-5" />
        </button>
      </div>

      {isAnalyzing && !feedback.length ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Analyzing call recording...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {feedback.map((point, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg ${
                point.type === 'positive'
                  ? 'bg-green-50 border border-green-100'
                  : point.type === 'improvement'
                  ? 'bg-yellow-50 border border-yellow-100'
                  : 'bg-red-50 border border-red-100'
              }`}
            >
              <div className="flex items-start gap-2">
                {point.type === 'positive' && (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                )}
                {point.type === 'improvement' && (
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                )}
                {point.type === 'critical' && (
                  <XCircle className="h-5 w-5 text-red-600" />
                )}
                <p className={`text-sm ${
                  point.type === 'positive'
                    ? 'text-green-800'
                    : point.type === 'improvement'
                    ? 'text-yellow-800'
                    : 'text-red-800'
                }`}>
                  {point.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}