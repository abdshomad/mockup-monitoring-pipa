
import React, { useEffect } from 'react';
import { Alert } from '../types';
import { useCountdown } from '../hooks/useCountdown';
import AlertModalHeader from './time-machine/AlertModalHeader';
import AlertModalBody from './time-machine/AlertModalBody';
import AlertModalFooter from './time-machine/AlertModalFooter';

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
        <AlertModalHeader alertId={alert.id} onClose={handleClose} />
        <AlertModalBody alert={alert} isPaused={isPaused} count={count} />
        <AlertModalFooter onClose={handleClose} count={count} />
      </div>
    </div>
  );
};

export default TimeMachineAlertModal;
