import React, { useState } from 'react';
import { Phone, Mic, MicOff, User, AlertCircle } from 'lucide-react';

interface ActiveCall {
  id: string;
  agent: string;
  customer: string;
  duration: number;
  status: 'active' | 'hold' | 'ending';
  sentiment: 'positive' | 'neutral' | 'negative';
}

export function TeamMonitoring() {
  const [activeCalls, setActiveCalls] = useState<ActiveCall[]>([
    {
      id: '1',
      agent: 'John Doe',
      customer: 'Acme Corp',
      duration: 325,
      status: 'active',
      sentiment: 'positive'
    },
    {
      id: '2',
      agent: 'Sarah Miller',
      customer: 'Tech Solutions Inc',
      duration: 180,
      status: 'active',
      sentiment: 'neutral'
    }
  ]);

  const [selectedCall, setSelectedCall] = useState<string | null>(null);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'text-green-600';
      case 'negative':
        return 'text-red-600';
      default:
        return 'text-yellow-600';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Live Call Monitoring</h2>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            {activeCalls.length} Active Calls
          </span>
          <select className="px-4 py-2 border rounded-lg">
            <option>All Agents</option>
            <option>Available</option>
            <option>In Call</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Active Calls List */}
        <div className="col-span-1 bg-white rounded-lg border p-4 space-y-4">
          <h3 className="font-semibold mb-4">Active Calls</h3>
          {activeCalls.map((call) => (
            <button
              key={call.id}
              onClick={() => setSelectedCall(call.id)}
              className={`w-full p-4 rounded-lg border transition-colors ${
                selectedCall === call.id
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{call.agent}</span>
                <span className="text-sm text-gray-500">
                  {formatDuration(call.duration)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{call.customer}</span>
                <AlertCircle 
                  className={`h-4 w-4 ${getSentimentColor(call.sentiment)}`} 
                />
              </div>
            </button>
          ))}
        </div>

        {/* Live Call View */}
        <div className="col-span-2 bg-white rounded-lg border p-4">
          {selectedCall ? (
            <div className="h-full">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-semibold">
                    {activeCalls.find(c => c.id === selectedCall)?.agent}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Call with {activeCalls.find(c => c.id === selectedCall)?.customer}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <button className="p-2 rounded-lg hover:bg-gray-100">
                    <Mic className="h-5 w-5" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-gray-100">
                    <Phone className="h-5 w-5 text-red-600" />
                  </button>
                </div>
              </div>

              {/* Live Transcript */}
              <div className="h-[calc(100%-4rem)] bg-gray-50 rounded-lg p-4 overflow-y-auto">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <User className="h-5 w-5 mt-1" />
                    <div className="flex-1 bg-white p-3 rounded-lg">
                      <p className="text-sm">Hello, I'm interested in your enterprise plan.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 justify-end">
                    <div className="flex-1 bg-indigo-50 p-3 rounded-lg">
                      <p className="text-sm">I'd be happy to discuss our enterprise solutions with you.</p>
                    </div>
                    <User className="h-5 w-5 mt-1" />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              Select a call to monitor
            </div>
          )}
        </div>
      </div>
    </div>
  );
}