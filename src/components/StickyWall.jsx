import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiX } from 'react-icons/fi';

const StickyWall = ({ initialNotes = [], onNotesChange }) => {
  const [notes, setNotes] = useState(initialNotes);
  const [showAddNote, setShowAddNote] = useState(false);
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    color: 'bg-yellow-100 dark:bg-yellow-100/70'
  });

  useEffect(() => {
    if (onNotesChange) {
      onNotesChange(notes);
    }
  }, [notes, onNotesChange]);

  const colors = [
    'bg-yellow-100 dark:bg-yellow-100/70',
    'bg-blue-100 dark:bg-blue-100/70',
    'bg-pink-100 dark:bg-pink-100/70',
    'bg-orange-100 dark:bg-orange-100/70',
    'bg-green-100 dark:bg-green-100/70',
    'bg-purple-100 dark:bg-purple-100/70'
  ];

  const handleAddNote = () => {
    if (newNote.title.trim() && newNote.content.trim()) {
      const updatedNotes = [
        ...notes,
        {
          id: Date.now(),
          ...newNote
        }
      ];
      setNotes(updatedNotes);
      setNewNote({
        title: '',
        content: '',
        color: 'bg-yellow-100 dark:bg-yellow-100/70'
      });
      setShowAddNote(false);
    }
  };

  const handleDeleteNote = (id) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Sticky Wall</h1>
          <button
            onClick={() => setShowAddNote(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#ffd43b] text-gray-900 rounded-lg hover:bg-[#fcc419] transition-colors duration-150"
          >
            <FiPlus size={20} />
            <span>Add Note</span>
          </button>
        </div>

        {/* Add Note Modal */}
        {showAddNote && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Add New Note</h2>
                <button
                  onClick={() => setShowAddNote(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <FiX size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  value={newNote.title}
                  onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                  placeholder="Note Title"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#ffd43b] bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />

                <textarea
                  value={newNote.content}
                  onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                  placeholder="Note Content"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#ffd43b] bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Choose Color
                  </label>
                  <div className="flex gap-2">
                    {colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setNewNote({ ...newNote, color })}
                        className={`w-8 h-8 rounded-full ${color} ${
                          newNote.color === color ? 'ring-2 ring-[#ffd43b]' : ''
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowAddNote(false)}
                    className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddNote}
                    className="px-4 py-2 bg-[#ffd43b] text-gray-900 rounded-lg hover:bg-[#fcc419] transition-colors duration-150"
                  >
                    Add Note
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {notes.map((note) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`${note.color} rounded-lg p-6 shadow-lg relative group min-h-[250px] transition-transform hover:-translate-y-1`}
            >
              <button
                onClick={() => handleDeleteNote(note.id)}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-gray-500 hover:text-gray-700"
              >
                <FiX size={16} />
              </button>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-900 mb-3">{note.title}</h3>
              <p className="text-gray-700 dark:text-gray-800 whitespace-pre-line">{note.content}</p>
            </motion.div>
          ))}

          {/* Add Note Button Card */}
          <motion.button
            onClick={() => setShowAddNote(true)}
            className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 flex items-center justify-center min-h-[250px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
          >
            <FiPlus size={24} />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default StickyWall; 