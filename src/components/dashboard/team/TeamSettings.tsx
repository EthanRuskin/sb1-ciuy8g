import React, { useState } from 'react';
import { Save } from 'lucide-react';

export function TeamSettings() {
  const [settings, setSettings] = useState({
    teamName: 'Sales Team Alpha',
    notifications: {
      performance_alerts: true,
      member_updates: true,
      daily_reports: true
    },
    permissions: {
      call_monitoring: true,
      analytics_access: true,
      invite_members: false
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle settings update logic here
    console.log('Updating settings:', settings);
  };

  return (
    <div className="max-w-2xl space-y-8">
      <form onSubmit={handleSubmit}>
        {/* Team Information */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
          <h3 className="text-lg font-semibold mb-4">Team Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Team Name
              </label>
              <input
                type="text"
                value={settings.teamName}
                onChange={(e) => setSettings({ ...settings, teamName: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
          <h3 className="text-lg font-semibold mb-4">Notifications</h3>
          <div className="space-y-4">
            {Object.entries(settings.notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium capitalize">
                    {key.replace(/_/g, ' ')}
                  </h4>
                  <p className="text-sm text-gray-500">
                    Receive notifications about {key.replace(/_/g, ' ').toLowerCase()}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        [key]: e.target.checked
                      }
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Permissions */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
          <h3 className="text-lg font-semibold mb-4">Team Member Permissions</h3>
          <div className="space-y-4">
            {Object.entries(settings.permissions).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium capitalize">
                    {key.replace(/_/g, ' ')}
                  </h4>
                  <p className="text-sm text-gray-500">
                    Allow team members to {key.replace(/_/g, ' ').toLowerCase()}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => setSettings({
                      ...settings,
                      permissions: {
                        ...settings.permissions,
                        [key]: e.target.checked
                      }
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Save className="h-5 w-5" />
          Save Settings
        </button>
      </form>
    </div>
  );
}