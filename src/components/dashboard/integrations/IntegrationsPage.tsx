import React from 'react';
import { Link2, ArrowRight, Check } from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  description: string;
  category: 'crm' | 'communication' | 'analytics' | 'productivity';
  logo: string;
  status: 'available' | 'coming-soon' | 'connected';
  setupUrl?: string;
}

export function IntegrationsPage() {
  const integrations: Integration[] = [
    // CRM Integrations
    {
      id: 'salesforce',
      name: 'Salesforce',
      description: 'Sync contacts, calls, and analytics with Salesforce CRM',
      category: 'crm',
      logo: 'https://www.svgrepo.com/show/303235/salesforce-2-logo.svg',
      status: 'available',
      setupUrl: 'https://login.salesforce.com/services/oauth2/authorize'
    },
    {
      id: 'hubspot',
      name: 'HubSpot',
      description: 'Connect your HubSpot CRM for seamless data synchronization',
      category: 'crm',
      logo: 'https://www.svgrepo.com/show/303256/hubspot-logo.svg',
      status: 'available',
      setupUrl: 'https://app.hubspot.com/oauth/authorize'
    },
    {
      id: 'zoho',
      name: 'Zoho CRM',
      description: 'Integrate with Zoho CRM for enhanced sales tracking',
      category: 'crm',
      logo: 'https://www.svgrepo.com/show/354547/zoho.svg',
      status: 'available',
      setupUrl: 'https://accounts.zoho.com/oauth/v2/auth'
    },

    // Communication Platforms
    {
      id: 'slack',
      name: 'Slack',
      description: 'Get call notifications and summaries in your Slack channels',
      category: 'communication',
      logo: 'https://www.svgrepo.com/show/303320/slack-new-logo.svg',
      status: 'available',
      setupUrl: 'https://slack.com/oauth/v2/authorize'
    },
    {
      id: 'teams',
      name: 'Microsoft Teams',
      description: 'Integrate calls and notifications with Microsoft Teams',
      category: 'communication',
      logo: 'https://www.svgrepo.com/show/303322/microsoft-teams-logo.svg',
      status: 'coming-soon'
    },

    // Analytics Platforms
    {
      id: 'google-analytics',
      name: 'Google Analytics',
      description: 'Track call performance metrics in Google Analytics',
      category: 'analytics',
      logo: 'https://www.svgrepo.com/show/303273/google-analytics-logo.svg',
      status: 'available',
      setupUrl: 'https://analytics.google.com/analytics/web/'
    },
    {
      id: 'segment',
      name: 'Segment',
      description: 'Use Segment to route your call data to multiple destinations',
      category: 'analytics',
      logo: 'https://www.svgrepo.com/show/354309/segment.svg',
      status: 'coming-soon'
    },

    // Productivity Tools
    {
      id: 'gsuite',
      name: 'Google Workspace',
      description: 'Sync calendar events and contacts with Google Workspace',
      category: 'productivity',
      logo: 'https://www.svgrepo.com/show/303223/google-logo.svg',
      status: 'available',
      setupUrl: 'https://accounts.google.com/o/oauth2/v2/auth'
    },
    {
      id: 'office365',
      name: 'Microsoft 365',
      description: 'Integrate with Outlook calendar and contacts',
      category: 'productivity',
      logo: 'https://www.svgrepo.com/show/303223/microsoft-office-2013-logo.svg',
      status: 'available',
      setupUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize'
    }
  ];

  const categories = [
    { id: 'crm', name: 'CRM Systems' },
    { id: 'communication', name: 'Communication' },
    { id: 'analytics', name: 'Analytics' },
    { id: 'productivity', name: 'Productivity' }
  ];

  const handleIntegrationClick = (integration: Integration) => {
    if (integration.status === 'available' && integration.setupUrl) {
      window.open(integration.setupUrl, '_blank');
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-black mb-2">Integrations</h2>
        <p className="text-black">
          Connect SalesAI Pro with your favorite tools and platforms
        </p>
      </div>

      {categories.map(category => (
        <div key={category.id} className="space-y-4">
          <h3 className="text-lg font-semibold text-black">{category.name}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {integrations
              .filter(integration => integration.category === category.id)
              .map(integration => (
                <button
                  key={integration.id}
                  onClick={() => handleIntegrationClick(integration)}
                  className={`block w-full text-left p-6 bg-white rounded-xl shadow-sm border border-gray-200 transition-all ${
                    integration.status === 'available'
                      ? 'hover:border-indigo-200 hover:shadow-md'
                      : 'opacity-75 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <img
                      src={integration.logo}
                      alt={integration.name}
                      className="h-10 w-10 object-contain"
                    />
                    {integration.status === 'connected' ? (
                      <span className="flex items-center gap-1 text-sm text-green-600">
                        <Check className="h-4 w-4" />
                        Connected
                      </span>
                    ) : integration.status === 'coming-soon' ? (
                      <span className="text-sm text-black">Coming Soon</span>
                    ) : (
                      <ArrowRight className="h-5 w-5 text-black" />
                    )}
                  </div>
                  <h4 className="font-medium text-black mb-2">{integration.name}</h4>
                  <p className="text-sm text-black mb-4">
                    {integration.description}
                  </p>
                  {integration.status === 'available' && (
                    <div className="flex items-center gap-2 text-sm text-indigo-600">
                      <Link2 className="h-4 w-4" />
                      Connect
                    </div>
                  )}
                </button>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}