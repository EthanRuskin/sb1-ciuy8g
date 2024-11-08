import React from 'react';
import { Eye, EyeOff, Settings2 } from 'lucide-react';

interface MetricConfig {
  id: string;
  name: string;
  description: string;
  visible: boolean;
  category: 'performance' | 'engagement' | 'conversion' | 'quality';
}

interface Category {
  id: string;
  name: string;
}

interface AnalyticsSidebarProps {
  metrics: MetricConfig[];
  categories: Category[];
  onToggleMetric: (id: string) => void;
}

export function AnalyticsSidebar({ metrics, categories, onToggleMetric }: AnalyticsSidebarProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <Settings2 className="h-5 w-5 text-indigo-600" />
        <h3 className="text-lg font-semibold text-gray-900">Customize View</h3>
      </div>

      <div className="space-y-6">
        {categories.map((category) => (
          <div key={category.id} className="space-y-3">
            <h4 className="text-sm font-medium text-gray-700">{category.name}</h4>
            <div className="space-y-2">
              {metrics
                .filter((metric) => metric.category === category.id)
                .map((metric) => (
                  <button
                    key={metric.id}
                    onClick={() => onToggleMetric(metric.id)}
                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="text-left">
                      <span className="text-sm text-gray-900">{metric.name}</span>
                      <p className="text-xs text-gray-500">{metric.description}</p>
                    </div>
                    {metric.visible ? (
                      <Eye className="h-4 w-4 text-indigo-600" />
                    ) : (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
          Apply Changes
        </button>
      </div>
    </div>
  );
}