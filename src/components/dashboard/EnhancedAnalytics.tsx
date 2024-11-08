import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { Calendar, Filter, X, ChevronDown, TrendingUp, Clock, Phone, Target, Users, MessageSquare, Star, AlertCircle } from 'lucide-react';

interface AnalyticsMetric {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  category: 'performance' | 'engagement' | 'conversion';
}

const analyticsMetrics: AnalyticsMetric[] = [
  {
    id: 'call_volume',
    name: 'Call Volume',
    description: 'Total number of calls made',
    icon: Phone,
    category: 'performance'
  },
  {
    id: 'connection_rate',
    name: 'Connection Rate',
    description: 'Percentage of successful connections',
    icon: Target,
    category: 'performance'
  },
  {
    id: 'avg_duration',
    name: 'Average Duration',
    description: 'Average length of calls',
    icon: Clock,
    category: 'performance'
  },
  {
    id: 'talk_ratio',
    name: 'Talk-to-Listen Ratio',
    description: 'Balance of speaking vs listening',
    icon: MessageSquare,
    category: 'engagement'
  },
  {
    id: 'first_call_close',
    name: 'First Call Close Rate',
    description: 'Sales closed on first contact',
    icon: Star,
    category: 'conversion'
  },
  {
    id: 'follow_up',
    name: 'Follow-Up Rate',
    description: 'Scheduled follow-up actions',
    icon: Calendar,
    category: 'engagement'
  },
  {
    id: 'conversion_rate',
    name: 'Conversion Rate',
    description: 'Overall conversion success',
    icon: TrendingUp,
    category: 'conversion'
  },
  {
    id: 'objection_rate',
    name: 'Objection Rate',
    description: 'Frequency of sales objections',
    icon: AlertCircle,
    category: 'engagement'
  }
];

interface MetricsCustomizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedMetrics: string[];
  onUpdateMetrics: (metrics: string[]) => void;
}

function MetricsCustomizationModal({ isOpen, onClose, selectedMetrics, onUpdateMetrics }: MetricsCustomizationModalProps) {
  if (!isOpen) return null;

  const handleToggleMetric = (metricId: string) => {
    if (selectedMetrics.includes(metricId)) {
      onUpdateMetrics(selectedMetrics.filter(id => id !== metricId));
    } else {
      onUpdateMetrics([...selectedMetrics, metricId]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Customize Metrics</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="space-y-4">
          {analyticsMetrics.map(metric => (
            <label key={metric.id} className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={selectedMetrics.includes(metric.id)}
                onChange={() => handleToggleMetric(metric.id)}
                className="h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
              />
              <span className="text-gray-900">{metric.name}</span>
            </label>
          ))}
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

export function EnhancedAnalytics() {
  const [selectedMetrics, setSelectedMetrics] = useState(analyticsMetrics.map(m => m.id));
  const [dateRange, setDateRange] = useState('7d');
  const [showMetricsModal, setShowMetricsModal] = useState(false);

  const callTrendsData = [
    { date: 'Mon', calls: 45, conversions: 15, duration: 320 },
    { date: 'Tue', calls: 38, conversions: 12, duration: 280 },
    { date: 'Wed', calls: 52, conversions: 18, duration: 400 },
    { date: 'Thu', calls: 31, conversions: 9, duration: 250 },
    { date: 'Fri', calls: 48, conversions: 16, duration: 350 },
    { date: 'Sat', calls: 25, conversions: 8, duration: 200 },
    { date: 'Sun', calls: 35, conversions: 11, duration: 290 }
  ];

  const conversionData = [
    { name: 'Converted', value: 63, color: '#4F46E5' },
    { name: 'Follow-up', value: 22, color: '#34D399' },
    { name: 'Lost', value: 15, color: '#F87171' }
  ];

  const performanceData = [
    { time: '9AM', talkRatio: 65, objections: 2, engagement: 85 },
    { time: '10AM', talkRatio: 72, objections: 1, engagement: 88 },
    { time: '11AM', talkRatio: 68, objections: 3, engagement: 82 },
    { time: '12PM', talkRatio: 70, objections: 2, engagement: 86 },
    { time: '1PM', talkRatio: 75, objections: 1, engagement: 90 },
    { time: '2PM', talkRatio: 69, objections: 2, engagement: 84 },
    { time: '3PM', talkRatio: 71, objections: 2, engagement: 87 }
  ];

  const getFilteredMetrics = () => {
    return analyticsMetrics.filter(metric => selectedMetrics.includes(metric.id));
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50">
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white appearance-none pr-10"
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last Quarter</option>
              <option value="custom">Custom Range</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none h-4 w-4" />
          </div>
          <button
            onClick={() => setShowMetricsModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Filter className="h-4 w-4" />
            Customize Metrics
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {getFilteredMetrics().map(metric => (
          <div key={metric.id} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <metric.icon className="h-6 w-6 text-indigo-600" />
              <span className="text-sm text-green-600">+12%</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{metric.name}</h3>
            <p className="text-sm text-gray-500">{metric.description}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Call Trends</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={callTrendsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="calls" stackId="1" stroke="#4F46E5" fill="#4F46E5" fillOpacity={0.2} />
                <Area type="monotone" dataKey="conversions" stackId="2" stroke="#34D399" fill="#34D399" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversion Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={conversionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, value }) => `${name} (${value}%)`}
                >
                  {conversionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="talkRatio" stroke="#4F46E5" name="Talk Ratio" />
                <Line type="monotone" dataKey="engagement" stroke="#34D399" name="Engagement" />
                <Line type="monotone" dataKey="objections" stroke="#F87171" name="Objections" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Call Duration Analysis</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={callTrendsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="duration" fill="#4F46E5" name="Duration (seconds)">
                  {callTrendsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.duration > 300 ? '#4F46E5' : '#818CF8'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <MetricsCustomizationModal
        isOpen={showMetricsModal}
        onClose={() => setShowMetricsModal(false)}
        selectedMetrics={selectedMetrics}
        onUpdateMetrics={setSelectedMetrics}
      />
    </div>
  );
}