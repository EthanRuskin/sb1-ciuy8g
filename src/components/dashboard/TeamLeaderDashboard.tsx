import React, { useState } from 'react';
import { 
  Users, 
  BarChart2, 
  Settings, 
  Calendar,
  MessageSquare,
  Target,
  TrendingUp,
  AlertTriangle,
  LogOut
} from 'lucide-react';
import { TeamOverview } from './teamLeader/TeamOverview';
import { TeamAnalytics } from './teamLeader/TeamAnalytics';
import { TeamMonitoring } from './teamLeader/TeamMonitoring';
import { CoachingHub } from './teamLeader/CoachingHub';
import { TeamReports } from './teamLeader/TeamReports';
import { TeamAlerts } from './teamLeader/TeamAlerts';

interface TeamLeaderDashboardProps {
  onLogout: () => void;
  user: { name: string; email: string; role: string } | null;
}

export function TeamLeaderDashboard({ onLogout, user }: TeamLeaderDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const navigationItems = [
    { id: 'overview', label: 'Team Overview', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'monitoring', label: 'Live Monitoring', icon: Target },
    { id: 'coaching', label: 'Coaching Hub', icon: MessageSquare },
    { id: 'reports', label: 'Reports', icon: Calendar },
    { id: 'alerts', label: 'Alerts', icon: AlertTriangle }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <TeamOverview />;
      case 'analytics':
        return <TeamAnalytics />;
      case 'monitoring':
        return <TeamMonitoring />;
      case 'coaching':
        return <CoachingHub />;
      case 'reports':
        return <TeamReports />;
      case 'alerts':
        return <TeamAlerts />;
      default:
        return <TeamOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-indigo-950 to-purple-950">
      {/* Top Bar */}
      <div className="bg-white/10 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Users className="h-8 w-8 text-indigo-400" />
              <div>
                <div className="text-white font-semibold">{user?.name}</div>
                <div className="text-xs text-indigo-300">Team Leader</div>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 text-indigo-300 hover:text-white transition-colors"
            >
              <LogOut className="h-5 w-5" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-4 gap-4 py-4">
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-indigo-400" />
                <div>
                  <div className="text-sm text-indigo-300">Team Size</div>
                  <div className="text-lg font-semibold text-white">12 Members</div>
                </div>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Target className="h-8 w-8 text-green-400" />
                <div>
                  <div className="text-sm text-indigo-300">Performance</div>
                  <div className="text-lg font-semibold text-white">87%</div>
                </div>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-8 w-8 text-blue-400" />
                <div>
                  <div className="text-sm text-indigo-300">Growth</div>
                  <div className="text-lg font-semibold text-white">+15%</div>
                </div>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-8 w-8 text-yellow-400" />
                <div>
                  <div className="text-sm text-indigo-300">Alerts</div>
                  <div className="text-lg font-semibold text-white">3 New</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Navigation */}
          <div className="w-64 flex-shrink-0">
            <nav className="space-y-1">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-2 px-4 py-3 rounded-lg transition-all ${
                    activeTab === item.id
                      ? 'bg-white/10 text-white'
                      : 'text-indigo-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content Area */}
          <div className="flex-1 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}