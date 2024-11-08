import React, { useState } from 'react';
import { Check, X } from 'lucide-react';

interface CRMSetting {
  id: string;
  name: string;
  enabled: boolean;
  description: string;
}

export function CRMIntegrations() {
  const [settings, setSettings] = useState<CRMSetting[]>([
    {
      id: 'auto_sync',
      name: 'Automatic Sync',
      enabled: true,
      description: 'Automatically sync call data with connected CRM systems'
    },
    {
      id: 'contact_creation',
      name: 'Contact Creation',
      enabled: true,
      description: 'Create new contacts in CRM when new customers are identified'
    },
    {
      id: 'activity_logging',
      name: 'Activity Logging',
      enabled: true,
      description: 'Log all call activities and outcomes in CRM'
    }
  ]);

  const handleToggle = (id: string) => {
    setSettings(prevSettings =>
      prevSettings.map(setting =>
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">CRM Integration Settings</h3>
        <div className="space-y-4">
          {settings.map(setting => (
            <div key={setting.id} className="flex items-start space-x-4">
              <div className="flex-1">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={setting.enabled}
                    onChange={() => handleToggle(setting.id)}
                    className="h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                  />
                  <span className="font-medium">{setting.name}</span>
                </label>
                <p className="mt-1 text-sm text-gray-600 ml-7">{setting.description}</p>
              </div>
              <span className={`flex items-center ${setting.enabled ? 'text-green-600' : 'text-red-600'}`}>
                {setting.enabled ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <X className="h-5 w-5" />
                )}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Connected CRM Systems</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-4">
              <img
                src="https://www.svgrepo.com/show/303235/salesforce-2-logo.svg"
                alt="Salesforce"
                className="h-8 w-8"
              />
              <div>
                <h4 className="font-medium">Salesforce</h4>
                <p className="text-sm text-gray-600">Connected on Mar 15, 2024</p>
              </div>
            </div>
            <button className="text-red-600 hover:text-red-700 text-sm font-medium">
              Disconnect
            </button>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-4">
              <img
                src="https://www.svgrepo.com/show/303256/hubspot-logo.svg"
                alt="HubSpot"
                className="h-8 w-8"
              />
              <div>
                <h4 className="font-medium">HubSpot</h4>
                <p className="text-sm text-gray-600">Connected on Mar 10, 2024</p>
              </div>
            </div>
            <button className="text-red-600 hover:text-red-700 text-sm font-medium">
              Disconnect
            </button>
          </div>
        </div>

        <button className="mt-4 w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
          Connect New CRM
        </button>
      </div>
    </div>
  );
}