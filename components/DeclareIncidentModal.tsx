import React, { useState } from 'react';
import { Technician, AlertSeverity } from '../types';

interface DeclareIncidentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeclare: (data: { title: string; severity: AlertSeverity; incidentCommander: string; summary: string }) => void;
  technicians: Technician[];
}

const DeclareIncidentModal: React.FC<DeclareIncidentModalProps> = ({ isOpen, onClose, onDeclare, technicians }) => {
  const [title, setTitle] = useState('');
  const [severity, setSeverity] = useState<AlertSeverity>(AlertSeverity.High);
  const [commander, setCommander] = useState(technicians[0]?.name || '');
  const [summary, setSummary] = useState('');

  if (!isOpen) return null;

  const handleDeclare = () => {
    if (!title || !commander || !summary) {
        alert("Please fill all required fields.");
        return;
    }
    onDeclare({ title, severity, incidentCommander: commander, summary });
    // Reset form for next time
    setTitle('');
    setSeverity(AlertSeverity.High);
    setCommander(technicians[0]?.name || '');
    setSummary('');
  };

  return (
    <div
      className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="declare-modal-title"
    >
      <div
        className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg border border-slate-700"
        onClick={e => e.stopPropagation()}
      >
        <header className="p-6 border-b border-slate-700">
          <h2 id="declare-modal-title" className="text-xl font-bold text-white">Declare New Incident</h2>
          <p className="text-slate-400 text-sm mt-1">Create a new incident log for a major event.</p>
        </header>

        <main className="p-6 space-y-4">
          <div>
            <label htmlFor="incident-title" className="block text-sm font-medium text-slate-300 mb-1">Title</label>
            <input id="incident-title" type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-slate-700 text-white placeholder-slate-400 rounded-lg p-2 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500" placeholder="e.g., Major Pressure Loss in Segment Bravo-3" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
                <label htmlFor="incident-severity" className="block text-sm font-medium text-slate-300 mb-1">Severity</label>
                <select id="incident-severity" value={severity} onChange={e => setSeverity(e.target.value as AlertSeverity)} className="w-full bg-slate-700 text-white rounded-lg p-2 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500">
                    {Object.values(AlertSeverity).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
            </div>
            <div>
                <label htmlFor="incident-commander" className="block text-sm font-medium text-slate-300 mb-1">Incident Commander</label>
                <select id="incident-commander" value={commander} onChange={e => setCommander(e.target.value)} className="w-full bg-slate-700 text-white rounded-lg p-2 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500">
                    {technicians.map(tech => <option key={tech.id} value={tech.name}>{tech.name}</option>)}
                </select>
            </div>
          </div>
          <div>
            <label htmlFor="incident-summary" className="block text-sm font-medium text-slate-300 mb-1">Summary</label>
            <textarea id="incident-summary" value={summary} onChange={e => setSummary(e.target.value)} rows={4} className="w-full bg-slate-700 text-white placeholder-slate-400 rounded-lg p-2 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500" placeholder="Provide a brief summary of the situation." />
          </div>
        </main>

        <footer className="p-4 bg-slate-800/50 flex justify-end space-x-3">
          <button onClick={onClose} className="px-4 py-2 bg-slate-600 text-white font-semibold rounded-lg hover:bg-slate-500 transition-colors">Cancel</button>
          <button onClick={handleDeclare} className="px-4 py-2 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition-colors shadow-md">Declare Incident</button>
        </footer>
      </div>
    </div>
  );
};

export default DeclareIncidentModal;