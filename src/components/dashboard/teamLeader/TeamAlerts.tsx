import React, { useState } from 'react';
import { AlertTriangle, Bell, CheckCircle, XCircle, User } from 'lucide-react';

interface Alert {
  id: string;
  type: 'warning' | 'success' | 'error';
  message: string;
  timestamp: string;
  agent?: string;
  read: boolean;
}

export function TeamAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'warning',
      message: 'John Doe has missed their daily call target',
      timestamp: '2024-03-16T14:30:00',
      agent: 'John Doe',
      read: false
    },
    {
      id: '2',
      type: 'success',
      message: 'Sarah Miller exceeded monthly sales quota',
      timestamp: '2024-03-16T12:15:00',
      agent: 'Sarah Miller',
      read: false
    },
    {
      id: '3',
      type: 'error',
      message: 'System detected unusual drop in team performance',
      timestamp: '2024-03-16T10:00:00',
      read: true
    }
  ]);

  const markAsRead = (alertId: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, read: true } : alert
    ));
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Team Alerts</h2>
        <div className="flex items-center gap-4">
          <select className="px-4 py-2 border rounded-lg">
            <option>All Alerts</option>
            <option>Unread</option>
            <option>Warnings</option>
            <option>Errors</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-4 rounded-lg border ${
              !alert.read ? 'bg-white' : 'bg-gray-50'
            }`}
          >
            <div className="flex items-start gap-4">
              {getAlertIcon(alert.type)}
              <div className="flex-1">
                <p className={`${!alert.read ? 'font-medium' : ''}`}>
                  {alert.message}
                </p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  {alert.agent && (
                    <span className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {alert.agent}
                    </span>
                  )}
                  <span>
                    {new Date(alert.timestamp).toLocaleString()}
                  </span>
                </div>
              </div>
              {!alert.read && (
                <button
                  onClick={() => markAsRead(alert.id)}
                  className="px-3 py-1 text-sm text-indigo-600 hover:bg-indigo-50 rounded-lg"
                >
                  Mark as Read
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Alert Settings */}
      <div className="bg-white rounded-lg border p-6 mt-8">
        <h3 className="text-lg font-semibold mb-4">Alert Settings</h3>
        <div className="space-y-4">
          {[
            { name: 'Performance Alerts', description: 'Notify when team members miss targets' },
            { name: 'Success Notifications', description: 'Notify on quota achievements' },
            { name: 'System Alerts', description: 'Technical and system-related notifications' }
          ].map((setting, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">{setting.name}</h4>
                <p className="text-sm text-gray-500">{setting.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  defaultChecked
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}