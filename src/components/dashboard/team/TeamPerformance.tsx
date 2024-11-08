import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, Users, Phone, Target } from 'lucide-react';

const demoData = [
  { name: 'John D.', calls: 45, conversions: 15, duration: 320 },
  { name: 'Sarah M.', calls: 38, conversions: 12, duration: 280 },
  { name: 'Mike R.', calls: 52, conversions: 18, duration: 400 },
  { name: 'Lisa K.', calls: 31, conversions: 9, duration: 250 }
];

export function TeamPerformance() {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-6">
        {[
          { label: 'Total Team Members', value: '8', icon: Users, trend: '+2 this month' },
          { label: 'Total Calls', value: '166', icon: Phone, trend: '+23% vs last week' },
          { label: 'Conversion Rate', value: '32%', icon: TrendingUp, trend: '+5% vs last week' },
          { label: 'Avg Call Score', value: '8.4', icon: Target, trend: '+0.6 vs last week' }
        ].map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-2 text-gray-500 mb-2">
              <stat.icon className="h-5 w-5" />
              {stat.label}
            </div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-sm text-green-600 mt-1">{stat.trend}</div>
          </div>
        ))}
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Calls vs Conversions</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={demoData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="calls" fill="#6366f1" name="Total Calls" />
                <Bar dataKey="conversions" fill="#34d399" name="Conversions" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Average Call Duration</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={demoData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="duration" 
                  stroke="#6366f1" 
                  name="Duration (seconds)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}