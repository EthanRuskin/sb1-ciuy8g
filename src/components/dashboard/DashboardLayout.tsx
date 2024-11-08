import React, { useState } from 'react';
import { Brain, Phone, BarChart2, Settings, LogOut, Menu, X, History, Link2 } from 'lucide-react';
import { LiveCallAssistant } from './LiveCallAssistant';
import { EnhancedAnalytics } from './EnhancedAnalytics';
import { SettingsPage } from './SettingsPage';
import { CallHistory } from './CallHistory';
import { IntegrationsPage } from './integrations/IntegrationsPage';

interface User {
  name: string;
  email: string;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  onLogout?: () => void;
  user?: User | null;
  onPageChange?: (page: string) => void;
}

export function DashboardLayout({ children, onLogout, user, onPageChange }: DashboardLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    onPageChange?.(page);
    setIsMobileMenuOpen(false);
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <LiveCallAssistant />;
      case 'analytics':
        return <EnhancedAnalytics />;
      case 'settings':
        return <SettingsPage />;
      case 'call-history':
        return <CallHistory />;
      case 'integrations':
        return <IntegrationsPage />;
      default:
        return children;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <button
        className="fixed top-4 left-4 z-50 lg:hidden bg-white p-2 rounded-lg shadow-lg"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? (
          <X className="h-6 w-6 text-gray-700" />
        ) : (
          <Menu className="h-6 w-6 text-gray-700" />
        )}
      </button>

      {/* Enhanced Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 shadow-lg transform transition-transform duration-200 ease-in-out ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } z-40 lg:z-auto`}>
        <div className="p-6">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">
              SalesAI Pro
            </span>
          </div>
          {user && (
            <div className="mt-4 p-3 rounded-lg bg-gray-50">
              <div className="text-sm font-medium text-gray-900">Welcome,</div>
              <div className="text-sm text-gray-700">{user.name}</div>
            </div>
          )}
        </div>

        <nav className="mt-6 space-y-1">
          {[
            { id: 'dashboard', label: 'Live Calls', icon: Phone },
            { id: 'analytics', label: 'Analytics', icon: BarChart2 },
            { id: 'call-history', label: 'Call History', icon: History },
            { id: 'integrations', label: 'Integrations', icon: Link2 },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => handlePageChange(id)}
              className={`w-full flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors ${
                currentPage === id
                  ? 'bg-indigo-50 text-indigo-600'
                  : ''
              }`}
            >
              <Icon className="h-5 w-5 mr-3" />
              {label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <button
            onClick={onLogout}
            className="w-full flex items-center text-gray-700 hover:text-indigo-600 transition-colors"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen p-8">
        <div className="relative">
          {renderContent()}
        </div>
      </main>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}