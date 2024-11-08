import React, { useState } from 'react';
import { Folder, FileText, X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    name: string;
    folderId: string;
    generateReport: boolean;
  }) => void;
  folders: Array<{ id: string; name: string; color: string }>;
}

export function CallCompletionDialog({ isOpen, onClose, onSave, folders }: Props) {
  const [callName, setCallName] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('');
  const [generateReport, setGenerateReport] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name: callName,
      folderId: selectedFolder,
      generateReport
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Save Call Recording</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="callName" className="block text-sm font-medium text-gray-700 mb-1">
              Call Name
            </label>
            <input
              type="text"
              id="callName"
              value={callName}
              onChange={(e) => setCallName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter a name for this call"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Folder
            </label>
            <div className="grid grid-cols-2 gap-2">
              {folders.map((folder) => (
                <button
                  key={folder.id}
                  type="button"
                  onClick={() => setSelectedFolder(folder.id)}
                  className={`flex items-center gap-2 p-3 rounded-lg border transition-colors ${
                    selectedFolder === folder.id
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                      : 'border-gray-200 hover:border-indigo-200'
                  }`}
                >
                  <Folder className="h-4 w-4" />
                  <span className="text-sm">{folder.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="generateReport"
              checked={generateReport}
              onChange={(e) => setGenerateReport(e.target.checked)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="generateReport" className="text-sm text-gray-700">
              Generate AI Analysis Report
            </label>
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
              Save Call
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}