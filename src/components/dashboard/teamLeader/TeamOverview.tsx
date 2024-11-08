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
  Line
} from 'recharts';
import { Phone, Target, Clock, TrendingUp } from 'lucide-react';

const performanceData = [
  { name: 'John D.', calls: 45, conversions: 15, duration: 320 },
  { name: 'Sarah M.', calls: 38, conversions: 12, duration: 280 },
  { name: 'Mike R.', calls: 52, conversions: 18, duration: 400 },
  { name: 'Lisa K.', calls: 31, conversions: 9, duration: 250 }
];

export function TeamOverview() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Team Overview</h2>
        <select className="px-4 py-2 border rounded-lg">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>Last Quarter</option>
        </select>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { 
            label: 'Total Calls', 
            value: '1,234', 
            trend: '+12%', 
            icon: Phone,
            color: 'text-blue-600'
          },
          { 
            label: 'Conversion Rate', 
            value: '32%', 
            trend: '+5%', 
            icon: Target,
            color: 'text-green-600'
          },
          { 
            label: 'Avg Call Duration', 
            value: '12m', 
            trend: '-2%', 
            icon: Clock,
            color: 'text-purple-600'
          },
          { 
            label: 'Revenue Growth', 
            value: '$52K', 
            trend: '+18%', 
            icon: TrendingUp,
            color: 'text-indigo-600'
          }
        ].map((metric, index) => (
          <div key={index} className="bg-white p-6 rounded-lg border">
            <div className="flex items-center justify-between mb-2">
              <metric.icon className={`h-6 w-6 ${metric.color}`} />
              <span className="text-green-600 text-sm">{metric.trend}</span>
            </div>
            <div className="text-2xl font-bold mb-1">{metric.value}</div>
            <div className="text-gray-500 text-sm">{metric.label}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Team Performance</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="calls" fill="#6366f1" name="Calls" />
                <Bar dataKey="conversions" fill="#34d399" name="Conversions" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Call Duration Trends</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
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

      {/* Team Rankings */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Top Performers</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Team Member</th>
                <th className="text-left py-3 px-4">Calls</th>
                <th className="text-left py-3 px-4">Conversions</th>
                <th className="text-left py-3 px-4">Avg Duration</th>
                <th className="text-left py-3 px-4">Performance Score</th>
              </tr>
            </thead>
            <tbody>
              {performanceData.map((member, index) => (
                <tr key={index} className="border-b">
                  <td className="py-3 px-4 font-medium">{member.name}</td>
                  <td className="py-3 px-4">{member.calls}</td>
                  <td className="py-3 px-4">{member.conversions}</td>
                  <td className="py-3 px-4">
                    {Math.floor(member.duration / 60)}m {member.duration % 60}s
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-indigo-600 rounded-full"
                          style={{ 
                            width: `${(member.conversions / member.calls) * 100}%` 
                          }}
                        />
                      </div>
                      <span className="ml-2 text-sm text-gray-600">
                        {Math.round((member.conversions / member.calls) * 100)}%
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