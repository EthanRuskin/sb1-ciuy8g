import React, { useState } from 'react';
import { Book, Star, MessageSquare, Video, Calendar, Plus, Download } from 'lucide-react';

interface CoachingSession {
  id: string;
  agent: string;
  type: 'call-review' | 'training' | '1on1';
  date: string;
  status: 'scheduled' | 'completed';
  notes?: string;
}

export function CoachingHub() {
  const [sessions, setSessions] = useState<CoachingSession[]>([
    {
      id: '1',
      agent: 'John Doe',
      type: 'call-review',
      date: '2024-03-20 14:00',
      status: 'scheduled',
      notes: 'Review recent customer objection handling'
    },
    {
      id: '2',
      agent: 'Sarah Miller',
      type: '1on1',
      date: '2024-03-21 15:30',
      status: 'scheduled',
      notes: 'Monthly performance review'
    }
  ]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Coaching Hub</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          <Plus className="h-4 w-4" />
          Schedule Session
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Quick Stats */}
        <div className="col-span-3 grid grid-cols-4 gap-4">
          {[
            { label: 'Completed Sessions', value: '24', icon: Star },
            { label: 'Scheduled Sessions', value: '8', icon: Calendar },
            { label: 'Improvement Areas', value: '12', icon: Book },
            { label: 'Team Satisfaction', value: '92%', icon: MessageSquare }
          ].map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg border">
              <div className="flex items-center gap-3">
                <stat.icon className="h-6 w-6 text-indigo-600" />
                <div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Upcoming Sessions */}
        <div className="col-span-2 bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold mb-4">Upcoming Sessions</h3>
          <div className="space-y-4">
            {sessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  {session.type === 'call-review' && <Video className="h-5 w-5 text-blue-600" />}
                  {session.type === 'training' && <Book className="h-5 w-5 text-green-600" />}
                  {session.type === '1on1' && <MessageSquare className="h-5 w-5 text-purple-600" />}
                  <div>
                    <div className="font-medium">{session.agent}</div>
                    <div className="text-sm text-gray-500">
                      {new Date(session.date).toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">{session.notes}</span>
                  <button className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-sm">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Training Resources */}
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold mb-4">Training Resources</h3>
          <div className="space-y-4">
            {[
              { title: 'Objection Handling Guide', type: 'PDF', downloads: 45 },
              { title: 'Sales Pitch Templates', type: 'DOCX', downloads: 38 },
              { title: 'Customer Persona Guide', type: 'PDF', downloads: 52 }
            ].map((resource, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium">{resource.title}</div>
                  <div className="text-sm text-gray-500">
                    {resource.downloads} downloads
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-50 rounded-lg">
                  <Download className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}