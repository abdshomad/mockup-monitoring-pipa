
import React, { useEffect } from 'react';
import { Alert } from '../types';
import { ICONS } from '../constants';
import { useCountdown } from '../hooks/useCountdown';
import { getSeverityBadgeClass, getStageBadgeClass } from '../utils/badgeStyles';

interface TimeMachineAlertModalProps {
  alert: Alert | null;
  onClose: () => void;
}

const TimeMachineAlertModal: React.FC<TimeMachineAlertModalProps> = ({ alert, onClose }) => {
  const { count, isPaused, toggle: toggleCountdownPause, reset: resetCountdown } = useCountdown(10, onClose, false);

  useEffect(() => {
    if (alert) {
      resetCountdown(10);
    }
  }, [alert, resetCountdown]);

  if (!alert) return null;

  const relevantAction = alert?.history
    ?.slice()
    .reverse()
    .find(action => action.notes || action.attachment);

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in"
      onClick={toggleCountdownPause}
      role="dialog"
      aria-modal="true"
      aria-labelledby="alert-modal-title"
    >
      <div 
        className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg border border-cyan-500/30"
        onClick={e => e.stopPropagation()}
      >
        <header className="flex justify-between items-center p-6 border-b border-slate-700">
          <div>
            <h2 id="alert-modal-title" className="text-xl font-bold text-white">Event Triggered</h2>
            <p className="text-cyan-400 font-mono text-sm">{alert.id}</p>
          </div>
          <button 
            onClick={handleClose} 
            className="p-1 rounded-full text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
            aria-label="Close"
          >
            {ICONS.close}
          </button>
        </header>
        <main className="p-6 space-y-4">
            <h3 className="text-lg font-semibold text-slate-200">{alert.type}</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-slate-400 block">Timestamp</span><span className="font-mono text-white">{alert.timestamp}</span></div>
                <div><span className="text-slate-400 block">Sensor ID</span><span className="font-mono text-white">{alert.sensorId}</span></div>
                <div><span className="text-slate-400 block">Severity</span><span className={`px-2 py-1 text-xs font-semibold rounded-full ${getSeverityBadgeClass(alert.severity)}`}>{alert.severity}</span></div>
                <div><span className="text-slate-400 block">Stage</span><span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStageBadgeClass(alert.stage)}`}>{alert.stage}</span></div>
            </div>
            
            <div className="pt-4 mt-4 border-t border-slate-700 space-y-4">
                {relevantAction ? (
                    <div className="space-y-3">
                        <h4 className="text-md font-semibold text-slate-200">Latest Update</h4>
                        <div>
                            <span className="text-slate-400 text-sm">PIC: </span>
                            <span className="font-medium text-white text-sm">{relevantAction.operator}</span>
                        </div>

                        {relevantAction.notes && (
                            <div>
                                <p className="text-slate-400 text-sm mb-1">Remark:</p>
                                <blockquote className="text-sm text-slate-300 bg-slate-700/50 p-3 rounded-md border-l-4 border-slate-600">
                                    {relevantAction.notes}
                                </blockquote>
                            </div>
                        )}

                        {relevantAction.attachment && relevantAction.attachment.type === 'image' && (
                            <div>
                                <p className="text-slate-400 text-sm mb-1">Attachment:</p>
                                <img 
                                    src={relevantAction.attachment.data} 
                                    alt={relevantAction.attachment.fileName} 
                                    className="mt-1 w-full max-h-48 object-cover rounded-md"
                                />
                            </div>
                        )}
                    </div>
                ) : (
                    <div>
                        <h4 className="text-md font-semibold text-slate-200">Latest Update</h4>
                        <p className="text-sm text-slate-500">No specific updates logged for this event yet.</p>
                    </div>
                )}
                 <p className="text-slate-300 text-sm">
                    {isPaused ? (
                        <span className="font-semibold text-yellow-400">Countdown paused. Tap screen to resume.</span>
                    ) : (
                        <>
                            Playback has been paused. Auto-resuming in <span className="font-semibold text-white">{count}</span>s.
                        </>
                    )}
                </p>
            </div>
        </main>
        <footer className="p-4 flex justify-end">
          <button 
            onClick={handleClose}
            className="px-5 py-2 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition-colors shadow-md min-w-[140px]"
          >
            Resume ({count})
          </button>
        </footer>
      </div>
    </div>
  );
};

export default TimeMachineAlertModal;