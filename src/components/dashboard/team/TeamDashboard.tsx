import React, { useState } from 'react';
import { Users, UserPlus, BarChart2, Settings, Mail } from 'lucide-react';
import { TeamPerformance } from './TeamPerformance';
import { TeamMembers } from './TeamMembers';
import { InviteMembers } from './InviteMembers';
import { TeamSettings } from './TeamSettings';

export function TeamDashboard() {
  const [activeTab, setActiveTab] = useState('performance');
  const [showInviteModal, setShowInviteModal] = useState(false);

  const tabs = [
    { id: 'performance', label: 'Performance', icon: BarChart2 },
    { id: 'members', label: 'Team Members', icon: Users },
    { id: 'settings', label: 'Team Settings', icon: Settings }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Team Management</h2>
        <button
          onClick={() => setShowInviteModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <UserPlus className="h-5 w-5" />
          Invite Members
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b">
        <nav className="flex space-x-8">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 py-4 border-b-2 font-medium transition-colors ${
                activeTab === id
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className="h-5 w-5" />
              {label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div>
        {activeTab === 'performance' && <TeamPerformance />}
        {activeTab === 'members' && <TeamMembers />}
        {activeTab === 'settings' && <TeamSettings />}
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <InviteMembers onClose={() => setShowInviteModal(false)} />
      )}
    </div>
  );
}