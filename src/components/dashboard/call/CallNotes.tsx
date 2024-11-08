import React, { useState } from 'react';
import { Edit3, Plus, Save } from 'lucide-react';

interface CallNotesProps {
  isCallActive: boolean;
  contactName?: string;
}

export function CallNotes({ isCallActive, contactName }: CallNotesProps) {
  const [notes, setNotes] = useState<string[]>([]);
  const [newNote, setNewNote] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);

  const handleAddNote = () => {
    if (newNote.trim()) {
      setNotes([...notes, newNote.trim()]);
      setNewNote('');
      setIsAddingNote(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">Call Notes</h3>
        {isCallActive && (
          <button
            onClick={() => setIsAddingNote(true)}
            className="p-2 hover:bg-gray-100 rounded-full"
            title="Add Note"
          >
            <Plus className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="space-y-3">
        {notes.map((note, index) => (
          <div key={index} className="p-3 bg-gray-50 rounded-lg text-sm">
            {note}
          </div>
        ))}

        {isAddingNote && (
          <div className="space-y-2">
            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Type your note here..."
              className="w-full p-3 border rounded-lg text-sm resize-none"
              rows={3}
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsAddingNote(false)}
                className="px-3 py-1 text-sm hover:bg-gray-100 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddNote}
                className="px-3 py-1 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700"
              >
                Save Note
              </button>
            </div>
          </div>
        )}

        {!isCallActive && !notes.length && (
          <div className="text-center text-gray-500 py-4">
            Notes will appear here during the call
          </div>
        )}
      </div>
    </div>
  );
}