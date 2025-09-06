import React, { useState } from 'react';
import { Technician } from '../types';

interface ScheduleMaintenanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSchedule: (data: { task: string; scheduledDate: string; assignedTechnician: string }) => void;
  technicians: Technician[];
  assetId: string;
  sensorId: string;
}

const ScheduleMaintenanceModal: React.FC<ScheduleMaintenanceModalProps> = ({ isOpen, onClose, onSchedule, technicians, assetId, sensorId }) => {
  const [task, setTask] = useState('');
  const [date, setDate] = useState('');
  const [technician, setTechnician] = useState(technicians[0]?.name || '');

  if (!isOpen) return null;

  const handleSchedule = () => {
    if (!task || !date || !technician) {
      alert("Please fill all required fields.");
      return;
    }
    onSchedule({ task, scheduledDate: date, assignedTechnician: technician });
    setTask('');
    setDate('');
    setTechnician(technicians[0]?.name || '');
  };

  return (
    <div
      className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="schedule-modal-title"
    >
      <div
        className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg border border-slate-700"
        onClick={e => e.stopPropagation()}
      >
        <header className="p-6 border-b border-slate-700">
          <h2 id="schedule-modal-title" className="text-xl font-bold text-white">Schedule New Maintenance</h2>
          <p className="text-slate-400 text-sm mt-1">For Asset: <span className="font-semibold text-cyan-400">{assetId}</span> (Sensor: {sensorId})</p>
        </header>

        <main className="p-6 space-y-4">
          <div>
            <label htmlFor="maintenance-task" className="block text-sm font-medium text-slate-300 mb-1">Task Description</label>
            <textarea id="maintenance-task" value={task} onChange={e => setTask(e.target.value)} rows={3} className="w-full bg-slate-700 text-white placeholder-slate-400 rounded-lg p-2 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500" placeholder="e.g., Annual battery replacement and diagnostics" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="maintenance-date" className="block text-sm font-medium text-slate-300 mb-1">Scheduled Date</label>
              <input id="maintenance-date" type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full bg-slate-700 text-white rounded-lg p-2 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
            </div>
            <div>
              <label htmlFor="maintenance-tech" className="block text-sm font-medium text-slate-300 mb-1">Assign Technician</label>
              <select id="maintenance-tech" value={technician} onChange={e => setTechnician(e.target.value)} className="w-full bg-slate-700 text-white rounded-lg p-2 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500">
                {technicians.map(tech => <option key={tech.id} value={tech.name}>{tech.name}</option>)}
              </select>
            </div>
          </div>
        </main>

        <footer className="p-4 bg-slate-800/50 flex justify-end space-x-3">
          <button onClick={onClose} className="px-4 py-2 bg-slate-600 text-white font-semibold rounded-lg hover:bg-slate-500 transition-colors">Cancel</button>
          <button onClick={handleSchedule} className="px-4 py-2 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition-colors shadow-md">Schedule Task</button>
        </footer>
      </div>
    </div>
  );
};

export default ScheduleMaintenanceModal;