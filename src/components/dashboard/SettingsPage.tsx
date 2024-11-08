import React, { useState } from 'react';
import { 
  Settings, 
  Bell, 
  Shield, 
  Link2, 
  Smartphone, 
  Mail, 
  MessageSquare, 
  Lock,
  Key,
  UserPlus,
  History,
  AlertTriangle,
  Fingerprint,
  RefreshCw
} from 'lucide-react';
import { CRMIntegrations } from './integrations/CRMIntegrations';

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [language, setLanguage] = useState('en');
  const [aiModel, setAiModel] = useState('advanced');
  const [timezone, setTimezone] = useState('UTC-5');
  const [dateFormat, setDateFormat] = useState('MM/DD/YYYY');
  const [recordingQuality, setRecordingQuality] = useState('medium');
  const [storageDuration, setStorageDuration] = useState('30');
  const [theme, setTheme] = useState('system');
  const [fontSize, setFontSize] = useState('medium');
  const [density, setDensity] = useState('comfortable');

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    desktopNotifications: true,
    callReminders: true,
    performanceAlerts: true,
    weeklyDigest: true,
    soundEnabled: true,
    vibrationEnabled: true,
    doNotDisturb: false,
    doNotDisturbStart: '22:00',
    doNotDisturbEnd: '08:00',
    notifyOnNewCalls: true,
    notifyOnMissedCalls: true,
    notifyOnFollowUps: true,
    notifyOnTeamActivity: true,
    notifyOnAnalytics: true
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: false,
    biometricEnabled: false,
    sessionTimeout: '30',
    passwordLastChanged: '2024-02-15',
    loginNotifications: true,
    trustedDevices: true,
    ipRestrictions: false,
    allowedIPs: '',
    autoLockEnabled: true,
    autoLockTimeout: '5',
    recordingEncryption: true,
    dataRetentionPeriod: '90'
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-black">Settings</h2>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {[
              { id: 'general', icon: Settings, label: 'General' },
              { id: 'notifications', icon: Bell, label: 'Notifications' },
              { id: 'security', icon: Shield, label: 'Security' },
              { id: 'integrations', icon: Link2, label: 'Integrations' }
            ].map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 py-4 border-b-2 ${
                  activeTab === id
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-black hover:text-black'
                }`}
              >
                <Icon className="h-5 w-5" />
                {label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'general' && (
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-black mb-4">General Settings</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">
                      Language
                    </label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg text-black"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-1">
                      Time Zone
                    </label>
                    <select
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                      className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg text-black"
                    >
                      <option value="UTC-8">Pacific Time (UTC-8)</option>
                      <option value="UTC-5">Eastern Time (UTC-5)</option>
                      <option value="UTC+0">UTC</option>
                      <option value="UTC+1">Central European Time (UTC+1)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-1">
                      Date Format
                    </label>
                    <select
                      value={dateFormat}
                      onChange={(e) => setDateFormat(e.target.value)}
                      className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg text-black"
                    >
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-black mb-4">Display Settings</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">
                      Theme
                    </label>
                    <select
                      value={theme}
                      onChange={(e) => setTheme(e.target.value)}
                      className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg text-black"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="system">System</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-1">
                      Font Size
                    </label>
                    <select
                      value={fontSize}
                      onChange={(e) => setFontSize(e.target.value)}
                      className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg text-black"
                    >
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-1">
                      Density
                    </label>
                    <select
                      value={density}
                      onChange={(e) => setDensity(e.target.value)}
                      className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg text-black"
                    >
                      <option value="comfortable">Comfortable</option>
                      <option value="compact">Compact</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-black mb-4">Notification Settings</h3>
                <div className="space-y-4">
                  {Object.entries(notificationSettings).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-black capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </h4>
                        <p className="text-sm text-black">
                          Receive notifications for {key.toLowerCase().replace(/([A-Z])/g, ' $1')}
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={(e) => setNotificationSettings(prev => ({
                            ...prev,
                            [key]: e.target.checked
                          }))}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-black mb-4">Security Settings</h3>
                <div className="space-y-6">
                  {Object.entries(securitySettings).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-black capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </h4>
                        <p className="text-sm text-black">
                          {typeof value === 'boolean'
                            ? `Enable ${key.toLowerCase().replace(/([A-Z])/g, ' $1')}`
                            : `Current setting: ${value}`}
                        </p>
                      </div>
                      {typeof value === 'boolean' ? (
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={(e) => setSecuritySettings(prev => ({
                              ...prev,
                              [key]: e.target.checked
                            }))}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                      ) : (
                        <button className="text-indigo-600 hover:text-indigo-700">
                          Change
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-black mb-4">Data Security</h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-black">Call Recording Encryption</h4>
                      <p className="text-sm text-black">Encrypt all call recordings</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={securitySettings.recordingEncryption}
                        onChange={(e) => setSecuritySettings(prev => ({
                          ...prev,
                          recordingEncryption: e.target.checked
                        }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>

                  <div>
                    <h4 className="font-medium text-black mb-2">Data Retention Period</h4>
                    <select
                      value={securitySettings.dataRetentionPeriod}
                      onChange={(e) => setSecuritySettings(prev => ({
                        ...prev,
                        dataRetentionPeriod: e.target.value
                      }))}
                      className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg text-black"
                    >
                      <option value="30">30 days</option>
                      <option value="60">60 days</option>
                      <option value="90">90 days</option>
                      <option value="180">180 days</option>
                      <option value="365">1 year</option>
                    </select>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <button className="text-red-600 hover:text-red-700 font-medium">
                      Delete All Data
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'integrations' && <CRMIntegrations />}
        </div>
      </div>
    </div>
  );
}