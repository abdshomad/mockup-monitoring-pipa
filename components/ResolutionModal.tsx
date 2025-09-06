import React, { useState } from 'react';

interface ResolutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (notes: string) => void;
}

const ResolutionModal: React.FC<ResolutionModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm(notes);
    setNotes('');
  };

  return (
    <div
      className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resolution-modal-title"
    >
      <div
        className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg border border-slate-700"
        onClick={e => e.stopPropagation()}
      >
        <header className="p-6 border-b border-slate-700">
          <h2 id="resolution-modal-title" className="text-xl font-bold text-white">Resolve Alert</h2>
          <p className="text-slate-400 text-sm mt-1">Please provide final notes before resolving this alert.</p>
        </header>

        <main className="p-6">
          <label htmlFor="resolution-notes" className="block text-sm font-medium text-slate-300 mb-2">
            Resolution Notes
          </label>
          <textarea
            id="resolution-notes"
            value={notes}
            onChange={e => setNotes(e.target.value)}
            rows={5}
            className="w-full bg-slate-700 text-white placeholder-slate-400 rounded-lg p-3 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="e.g., Confirmed false positive caused by nearby construction. No action required."
          />
        </main>

        <footer className="p-4 bg-slate-800/50 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-600 text-white font-semibold rounded-lg hover:bg-slate-500 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition-colors shadow-md disabled:bg-slate-500 disabled:cursor-not-allowed"
            disabled={!notes.trim()}
          >
            Confirm Resolution
          </button>
        </footer>
      </div>
    </div>
  );
};

export default ResolutionModal;
