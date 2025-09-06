import React from 'react';
import { ICONS } from '../constants';

interface AIPriorityTasksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIPriorityTasksModal: React.FC<AIPriorityTasksModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const tasks = [
    { title: 'Get a Status Update on Critical Alert A-98721', description: 'A security patrol has been dispatched for the "Anomalous Vibration" on sensor P-VIB-002. Your immediate priority is to get a live report from the field team to assess the risk of theft or damage.' },
    { title: 'Expedite Maintenance for Offline Sensor P-VIB-004', description: 'This sensor is a critical blind spot on the Blue Line. Maintenance is scheduled for August 5th, but given the complete signal loss, you should evaluate if the battery replacement (Task M-001) can be moved up.' },
    { title: 'Resolve the Rejected Safety Plan (APP-004)', description: 'The "Construction Safety Plan" was rejected. This is a major project blocker. You need to review the feedback from the Occupational Safety Board and assign a team to revise and resubmit it immediately.' },
    { title: 'Address Failed QA Check on Sensor P-VIB-005', description: 'This sensor failed its pressure calibration (QA-004). It\'s providing unreliable data. A high-priority maintenance ticket for recalibration needs to be created and assigned.' },
    { title: 'Finalize Investigation for Pressure Drop Alert A-98720', description: 'This high-severity alert on sensor P-VIB-006 has been acknowledged. The investigation needs to be completed to determine the cause and formally resolve the alert.' },
    { title: 'Follow Up on Pending "Right-of-Way Permit" (APP-002)', description: 'This critical permit has been pending for over a month. Contact the National Land Authority to get a status update and identify any actions needed from our side to prevent project delays.' },
    { title: 'Complete the "Alert Trigger Simulation" (CT-003)', description: 'This commissioning task is still in progress. Completing this end-to-end test is essential to verify system reliability before the final handover.' },
  ];

  return (
    <div 
      className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col border border-slate-700"
        onClick={e => e.stopPropagation()}
      >
        <header className="flex justify-between items-center p-6 border-b border-slate-700">
          <div className="flex items-center text-purple-400">
            <span className="mr-3 h-7 w-7">{ICONS.ai}</span>
            <h2 id="modal-title" className="text-xl font-bold text-white">Your Top 7 Priority Tasks</h2>
          </div>
          <button 
            onClick={onClose} 
            className="p-1 rounded-full text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </header>

        <main className="p-6 overflow-y-auto space-y-5">
          <p className="text-slate-400 text-sm">Based on the current system status and project data, here are your next 7 top-priority tasks:</p>
          <ol className="list-decimal list-inside space-y-4">
            {tasks.map((task, index) => (
              <li key={index} className="text-slate-300">
                <span className="font-semibold text-cyan-400">{task.title}:</span>
                <p className="pl-6 text-slate-400 text-sm leading-relaxed">{task.description}</p>
              </li>
            ))}
          </ol>
        </main>
        
        <footer className="p-4 border-t border-slate-700 flex justify-end">
          <button 
            onClick={onClose}
            className="px-5 py-2 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition-colors shadow-md"
          >
            Got it
          </button>
        </footer>
      </div>
    </div>
  );
};

export default AIPriorityTasksModal;