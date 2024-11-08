import React from 'react';
import { Settings2, Eye, EyeOff } from 'lucide-react';

interface MetricConfig {
  id: string;
  name: string;
  visible: boolean;
  category: 'performance' | 'engagement' | 'conversion';
}

interface Props {
  metrics: MetricConfig[];
  onToggleMetric: (id: string) => void;
}

export function AnalyticsCustomizer({ metrics, onToggleMetric }: Props) {
  const categories = ['performance', 'engagement', 'conversion'];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <Settings2 className="h-5 w-5 text-indigo-600" />
        <h3 className="font-semibold">Customize Analytics View</h3>
      </div>

      <div className="space-y-6">
        {categories.map((category) => (
          <div key={category} className="space-y-3">
            <h4 className="text-sm font-medium text-gray-700 capitalize">{category} Metrics</h4>
            <div className="space-y-2">
              {metrics
                .filter((metric) => metric.category === category)
                .map((metric) => (
                  <button
                    key={metric.id}
                    onClick={() => onToggleMetric(metric.id)}
                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50"
                  >
                    <span className="text-sm text-gray-600">{metric.name}</span>
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
    </div>
  );
}