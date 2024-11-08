import React, { useState } from 'react';
import { Download, Filter, Calendar } from 'lucide-react';

interface Report {
  id: string;
  name: string;
  type: 'performance' | 'calls' | 'revenue';
  frequency: 'daily' | 'weekly' | 'monthly';
  lastGenerated: string;
}

export function TeamReports() {
  const [reports] = useState<Report[]>([
    {
      id: '1',
      name: 'Team Performance Summary',
      type: 'performance',
      frequency: 'weekly',
      lastGenerated: '2024-03-15'
    },
    {
      id: '2',
      name: 'Call Analytics Report',
      type: 'calls',
      frequency: 'daily',
      lastGenerated: '2024-03-16'
    },
    {
      id: '3',
      name: 'Revenue Tracking',
      type: 'revenue',
      frequency: 'monthly',
      lastGenerated: '2024-03-01'
    }
  ]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Reports</h2>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Calendar className="h-4 w-4" />
            Date Range
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Filter className="h-4 w-4" />
            Filter
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Available Reports</h3>
          <div className="space-y-4">
            {reports.map((report) => (
              <div 
                key={report.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div>
                  <h4 className="font-medium">{report.name}</h4>
                  <div className="text-sm text-gray-500">
                    {report.frequency.charAt(0).toUpperCase() + report.frequency.slice(1)} report • 
                    Last generated: {new Date(report.lastGenerated).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button className="px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg">
                    View
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scheduled Reports */}
      <div className="bg-white rounded-lg border p-6">
        <h3 className="text-lg font-semibold mb-4">Scheduled Reports</h3>
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4">Report Name</th>
              <th className="text-left py-3 px-4">Frequency</th>
              <th className="text-left py-3 px-4">Recipients</th>
              <th className="text-left py-3 px-4">Next Delivery</th>
              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                name: 'Weekly Performance Summary',
                frequency: 'Every Monday',
                recipients: 'Management Team',
                nextDelivery: '2024-03-23'
              },
              {
                name: 'Monthly Revenue Report',
                frequency: '1st of month',
                recipients: 'Executive Team',
                nextDelivery: '2024-04-01'
              }
            ].map((schedule, index) => (
              <tr key={index} className="border-b">
                <td className="py-3 px-4 font-medium">{schedule.name}</td>
                <td className="py-3 px-4">{schedule.frequency}</td>
                <td className="py-3 px-4">{schedule.recipients}</td>
                <td className="py-3 px-4">
                  {new Date(schedule.nextDelivery).toLocaleDateString()}
                </td>
                <td className="py-3 px-4">
                  <button className="text-indigo-600 hover:text-indigo-700">
                    Edit Schedule
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}