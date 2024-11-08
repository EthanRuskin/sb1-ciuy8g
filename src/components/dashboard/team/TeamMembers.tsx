import React, { useState } from 'react';
import { MoreVertical, Mail, Phone, Star, Edit2, Trash2 } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  performance: {
    calls: number;
    conversions: number;
    rating: number;
  };
}

export function TeamMembers() {
  const [members] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Sales Representative',
      status: 'active',
      performance: {
        calls: 45,
        conversions: 15,
        rating: 4.8
      }
    },
    {
      id: '2',
      name: 'Sarah Miller',
      email: 'sarah@example.com',
      role: 'Senior Sales Rep',
      status: 'active',
      performance: {
        calls: 38,
        conversions: 12,
        rating: 4.6
      }
    }
  ]);

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-4 px-6">Team Member</th>
              <th className="text-left py-4 px-6">Role</th>
              <th className="text-left py-4 px-6">Status</th>
              <th className="text-left py-4 px-6">Performance</th>
              <th className="text-left py-4 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id} className="border-b">
                <td className="py-4 px-6">
                  <div>
                    <div className="font-medium">{member.name}</div>
                    <div className="text-sm text-gray-500">{member.email}</div>
                  </div>
                </td>
                <td className="py-4 px-6">{member.role}</td>
                <td className="py-4 px-6">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    member.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {member.status}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="space-y-1">
                    <div className="text-sm">
                      Calls: {member.performance.calls}
                    </div>
                    <div className="text-sm">
                      Conversions: {member.performance.conversions}
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span>{member.performance.rating}</span>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Mail className="h-4 w-4 text-gray-500" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Phone className="h-4 w-4 text-gray-500" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Edit2 className="h-4 w-4 text-gray-500" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}