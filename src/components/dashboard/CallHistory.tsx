import React, { useState } from 'react';
import { Phone, Folder, Search, Calendar, Filter, Plus, MoreVertical, Star, Edit3, Trash2, ChevronRight, ChevronDown } from 'lucide-react';

interface Note {
  id: string;
  text: string;
  createdAt: string;
  author: string;
}

interface Call {
  id: string;
  contactName: string;
  date: string;
  duration: string;
  status: 'completed' | 'missed' | 'follow-up';
  notes: Note[];
  folder?: string;
  starred: boolean;
}

interface Folder {
  id: string;
  name: string;
  color: string;
}

export function CallHistory() {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCall, setSelectedCall] = useState<string | null>(null);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [isAddingFolder, setIsAddingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  const [folders, setFolders] = useState<Folder[]>([
    { id: 'leads', name: 'Sales Leads', color: 'bg-blue-100' },
    { id: 'followup', name: 'Follow-ups', color: 'bg-yellow-100' },
    { id: 'closed', name: 'Closed Deals', color: 'bg-green-100' }
  ]);

  const [calls, setCalls] = useState<Call[]>([
    {
      id: '1',
      contactName: 'John Smith',
      date: '2024-03-15 14:30',
      duration: '15:23',
      status: 'completed',
      notes: [
        {
          id: '1',
          text: 'Interested in enterprise plan',
          createdAt: '2024-03-15T14:30:00Z',
          author: 'You'
        }
      ],
      folder: 'leads',
      starred: true
    },
    {
      id: '2',
      contactName: 'Sarah Johnson',
      date: '2024-03-15 11:00',
      duration: '08:45',
      status: 'follow-up',
      notes: [
        {
          id: '2',
          text: 'Requested pricing breakdown',
          createdAt: '2024-03-15T11:00:00Z',
          author: 'You'
        }
      ],
      folder: 'followup',
      starred: false
    }
  ]);

  const addNote = (callId: string) => {
    if (!newNote.trim()) return;
    
    const note: Note = {
      id: Date.now().toString(),
      text: newNote,
      createdAt: new Date().toISOString(),
      author: 'You'
    };

    setCalls(prev => prev.map(call => 
      call.id === callId 
        ? { ...call, notes: [...call.notes, note] }
        : call
    ));

    setNewNote('');
    setIsAddingNote(false);
  };

  const editNote = (callId: string, noteId: string, newText: string) => {
    setCalls(prev => prev.map(call => 
      call.id === callId 
        ? {
            ...call,
            notes: call.notes.map(note => 
              note.id === noteId 
                ? { ...note, text: newText }
                : note
            )
          }
        : call
    ));
    setEditingNoteId(null);
  };

  const deleteNote = (callId: string, noteId: string) => {
    setCalls(prev => prev.map(call => 
      call.id === callId 
        ? { ...call, notes: call.notes.filter(note => note.id !== noteId) }
        : call
    ));
  };

  const addFolder = () => {
    if (!newFolderName.trim()) return;
    const newFolder: Folder = {
      id: newFolderName.toLowerCase().replace(/\s+/g, '-'),
      name: newFolderName,
      color: 'bg-gray-100'
    };
    setFolders([...folders, newFolder]);
    setNewFolderName('');
    setIsAddingFolder(false);
  };

  const deleteFolder = (folderId: string) => {
    setFolders(prev => prev.filter(folder => folder.id !== folderId));
    setCalls(prev => prev.map(call => 
      call.folder === folderId ? { ...call, folder: undefined } : call
    ));
  };

  const toggleStar = (callId: string) => {
    setCalls(prev =>
      prev.map(call =>
        call.id === callId ? { ...call, starred: !call.starred } : call
      )
    );
  };

  const moveToFolder = (callId: string, folderId: string) => {
    setCalls(prev =>
      prev.map(call =>
        call.id === callId ? { ...call, folder: folderId } : call
      )
    );
  };

  const filteredCalls = calls.filter(call => {
    if (selectedFolder === 'starred') {
      return call.starred;
    }
    const matchesFolder = !selectedFolder || call.folder === selectedFolder;
    const matchesSearch = call.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         call.notes.some(note => note.text.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFolder && matchesSearch;
  });

  return (
    <div className="h-[calc(100vh-2rem)] grid grid-cols-12 gap-4">
      <div className="col-span-3 bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Folders</h3>
          <button
            onClick={() => setIsAddingFolder(true)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        {isAddingFolder && (
          <div className="mb-4">
            <input
              type="text"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="Folder name"
              className="w-full px-3 py-2 border rounded-lg mb-2"
            />
            <div className="flex gap-2">
              <button
                onClick={addFolder}
                className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-sm"
              >
                Add
              </button>
              <button
                onClick={() => setIsAddingFolder(false)}
                className="px-3 py-1 border rounded-lg text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="space-y-1">
          <div
            onClick={() => setSelectedFolder(null)}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer ${
              !selectedFolder ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-gray-50 text-gray-700'
            }`}
          >
            <Phone className="h-4 w-4" />
            All Calls
          </div>
          <div
            onClick={() => setSelectedFolder('starred')}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer ${
              selectedFolder === 'starred' ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-gray-50 text-gray-700'
            }`}
          >
            <Star className="h-4 w-4" />
            Starred
          </div>
          {folders.map(folder => (
            <div
              key={folder.id}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer ${
                selectedFolder === folder.id ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <div className="flex items-center gap-2" onClick={() => setSelectedFolder(folder.id)}>
                <Folder className="h-4 w-4" />
                {folder.name}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteFolder(folder.id);
                }}
                className="p-1 hover:bg-gray-200 rounded"
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="col-span-9 bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search calls..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Calendar className="h-4 w-4" />
            Date Range
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Filter className="h-4 w-4" />
            Filters
          </button>
        </div>

        <div className="space-y-4">
          {filteredCalls.map((call) => (
            <div key={call.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleStar(call.id)}
                    className={`p-1 rounded-full ${
                      call.starred ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
                    }`}
                  >
                    <Star className="h-5 w-5" />
                  </button>
                  <h4 className="font-medium text-gray-900">{call.contactName}</h4>
                  {call.folder && (
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      folders.find(f => f.id === call.folder)?.color
                    }`}>
                      {folders.find(f => f.id === call.folder)?.name}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">{call.duration}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(call.date).toLocaleString()}
                  </span>
                  <div className="relative">
                    <button
                      onClick={() => setSelectedCall(selectedCall === call.id ? null : call.id)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <MoreVertical className="h-5 w-5" />
                    </button>
                    {selectedCall === call.id && (
                      <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border py-1 z-10">
                        <button
                          onClick={() => setIsAddingNote(true)}
                          className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-50"
                        >
                          <Edit3 className="h-4 w-4" />
                          Add Note
                        </button>
                        {folders.map(folder => (
                          <button
                            key={folder.id}
                            onClick={() => moveToFolder(call.id, folder.id)}
                            className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-50"
                          >
                            <Folder className="h-4 w-4" />
                            Move to {folder.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <button
                  onClick={() => setSelectedCall(selectedCall === call.id ? null : call.id)}
                  className="flex items-center gap-1 text-sm text-gray-500 mb-2"
                >
                  {selectedCall === call.id ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                  {call.notes.length} Notes
                </button>

                {selectedCall === call.id && (
                  <div className="space-y-2">
                    {call.notes.map((note) => (
                      <div key={note.id} className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <span className="text-sm font-medium text-gray-900">{note.author}</span>
                            <span className="text-xs text-gray-500 ml-2">
                              {new Date(note.createdAt).toLocaleString()}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setEditingNoteId(note.id);
                                setNewNote(note.text);
                              }}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              <Edit3 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => deleteNote(call.id, note.id)}
                              className="p-1 hover:bg-gray-100 rounded text-red-500"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        {editingNoteId === note.id ? (
                          <div className="space-y-2">
                            <textarea
                              value={newNote}
                              onChange={(e) => setNewNote(e.target.value)}
                              className="w-full p-2 border rounded-lg"
                              rows={3}
                            />
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => {
                                  editNote(call.id, note.id, newNote);
                                  setNewNote('');
                                }}
                                className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-sm"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => {
                                  setEditingNoteId(null);
                                  setNewNote('');
                                }}
                                className="px-3 py-1 border rounded-lg text-sm"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-sm text-gray-900">{note.text}</p>
                        )}
                      </div>
                    ))}

                    {isAddingNote && (
                      <div className="space-y-2">
                        <textarea
                          value={newNote}
                          onChange={(e) => setNewNote(e.target.value)}
                          placeholder="Add a note..."
                          className="w-full p-3 border rounded-lg"
                          rows={3}
                        />
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => addNote(call.id)}
                            className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-sm"
                          >
                            Add Note
                          </button>
                          <button
                            onClick={() => {
                              setIsAddingNote(false);
                              setNewNote('');
                            }}
                            className="px-3 py-1 border rounded-lg text-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}

                    {!isAddingNote && (
                      <button
                        onClick={() => setIsAddingNote(true)}
                        className="flex items-center gap-1 text-indigo-600 hover:text-indigo-700"
                      >
                        <Plus className="h-4 w-4" />
                        Add Note
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}