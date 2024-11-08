import React, { useState } from 'react';
import { X, Mail, Plus, Trash2 } from 'lucide-react';

interface InviteMembersProps {
  onClose: () => void;
}

export function InviteMembers({ onClose }: InviteMembersProps) {
  const [emails, setEmails] = useState<string[]>(['']);
  const [role, setRole] = useState('sales_rep');

  const handleAddEmail = () => {
    setEmails([...emails, '']);
  };

  const handleRemoveEmail = (index: number) => {
    setEmails(emails.filter((_, i) => i !== index));
  };

  const handleEmailChange = (index: number, value: string) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle invitation logic here
    console.log('Inviting:', { emails, role });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Invite Team Members</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Addresses
            </label>
            <div className="space-y-3">
              {emails.map((email, index) => (
                <div key={index} className="flex gap-2">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => handleEmailChange(index, e.target.value)}
                      className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="colleague@company.com"
                      required
                    />
                  </div>
                  {emails.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveEmail(index)}
                      className="p-2 text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={handleAddEmail}
              className="mt-3 flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700"
            >
              <Plus className="h-4 w-4" />
              Add another email
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="sales_rep">Sales Representative</option>
              <option value="senior_rep">Senior Sales Representative</option>
              <option value="team_lead">Team Lead</option>
            </select>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Send Invites
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}