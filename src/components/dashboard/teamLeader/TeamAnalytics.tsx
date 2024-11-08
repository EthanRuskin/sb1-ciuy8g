import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Filter, Download, Calendar } from 'lucide-react';

const performanceData = [
  { month: 'Jan', calls: 450, conversions: 150, revenue: 25000 },
  { month: 'Feb', calls: 520, conversions: 180, revenue: 32000 },
  { month: 'Mar', calls: 480, conversions: 165, revenue: 28000 },
  { month: 'Apr', calls: 590, conversions: 210, revenue: 38000 },
  { month: 'May', calls: 620, conversions: 225, revenue: 42000 },
  { month: 'Jun', calls: 550, conversions: 195, revenue: 35000 }
];

const conversionData = [
  { name: 'Converted', value: 63 },
  { name: 'Follow-up', value: 22 },
  { name: 'Lost', value: 15 }
];

const COLORS = ['#4F46E5', '#34D399', '#F87171'];

export function TeamAnalytics() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Team Analytics</h2>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Calendar className="h-4 w-4" />
            Last 6 Months
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Filter className="h-4 w-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: '$200,000', trend: '+15%' },
          { label: 'Avg Deal Size', value: '$8,500', trend: '+8%' },
          { label: 'Conversion Rate', value: '32%', trend: '+5%' },
          { label: 'Team Efficiency', value: '89%', trend: '+3%' }
        ].map((metric, index) => (
          <div key={index} className="bg-white p-6 rounded-lg border">
            <div className="text-gray-500 mb-2">{metric.label}</div>
            <div className="text-2xl font-bold mb-1">{metric.value}</div>
            <div className="text-green-600 text-sm">{metric.trend} vs last period</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Revenue & Conversions</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#4F46E5" 
                  name="Revenue ($)" 
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="conversions" 
                  stroke="#34D399" 
                  name="Conversions" 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Call Outcomes</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={conversionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {conversionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Team Performance Table */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Team Performance Breakdown</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Team Member</th>
                <th className="text-left py-3 px-4">Calls</th>
                <th className="text-left py-3 px-4">Conversions</th>
                <th className="text-left py-3 px-4">Revenue</th>
                <th className="text-left py-3 px-4">Efficiency</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'John Doe', calls: 120, conversions: 45, revenue: 52000, efficiency: 88 },
                { name: 'Sarah Miller', calls: 95, conversions: 38, revenue: 48000, efficiency: 92 },
                { name: 'Mike Johnson', calls: 105, conversions: 42, revenue: 50000, efficiency: 85 }
              ].map((member, index) => (
                <tr key={index} className="border-b">
                  <td className="py-3 px-4 font-medium">{member.name}</td>
                  <td className="py-3 px-4">{member.calls}</td>
                  <td className="py-3 px-4">{member.conversions}</td>
                  <td className="py-3 px-4">${member.revenue.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-indigo-600 rounded-full"
                          style={{ width: `${member.efficiency}%` }}
                        />
                      </div>
                      <span className="ml-2 text-sm text-gray-600">
                        {member.efficiency}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}