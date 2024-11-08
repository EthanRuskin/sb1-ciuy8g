import React from 'react';
import { Target, TrendingUp, AlertCircle } from 'lucide-react';

interface Props {
  score: {
    overall: number;
    categories: {
      rapport: number;
      discovery: number;
      presentation: number;
      objectionHandling: number;
      closing: number;
    };
  };
}

export function SmartScoring({ score }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold flex items-center gap-2 text-gray-900">
          <Target className="h-5 w-5 text-indigo-600" />
          Call Performance Score
        </h3>
        <div className="text-2xl font-bold text-indigo-600">{score.overall}%</div>
      </div>

      <div className="space-y-4">
        {Object.entries(score.categories).map(([category, value]) => (
          <div key={category} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="capitalize text-gray-900">
                {category.replace(/([A-Z])/g, ' $1').trim()}
              </span>
              <span className="font-medium text-gray-900">{value}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  value >= 90 ? 'bg-green-500' :
                  value >= 70 ? 'bg-indigo-500' :
                  value >= 50 ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}
                style={{ width: `${value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Performance Insights */}
      <div className="mt-6 space-y-3">
        {score.overall >= 90 ? (
          <div className="flex items-start gap-2 p-3 bg-green-50 rounded-lg">
            <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <p className="text-sm text-green-800">Excellent Performance</p>
              <p className="text-xs text-green-600">Keep up the great work!</p>
            </div>
          </div>
        ) : score.overall >= 70 ? (
          <div className="flex items-start gap-2 p-3 bg-indigo-50 rounded-lg">
            <Target className="h-5 w-5 text-indigo-600 mt-0.5" />
            <div>
              <p className="text-sm text-indigo-800">Good Performance</p>
              <p className="text-xs text-indigo-600">Room for improvement in specific areas</p>
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-2 p-3 bg-yellow-50 rounded-lg">
            <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <p className="text-sm text-yellow-800">Needs Improvement</p>
              <p className="text-xs text-yellow-600">Consider reviewing training materials</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}