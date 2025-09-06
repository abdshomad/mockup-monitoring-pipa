
import React from 'react';
import { ICONS } from '../../constants';

interface AlertModalHeaderProps {
    alertId: string;
    onClose: (e: React.MouseEvent) => void;
}

const AlertModalHeader: React.FC<AlertModalHeaderProps> = ({ alertId, onClose }) => (
    <header className="flex justify-between items-center p-6 border-b border-slate-700">
        <div>
            <h2 id="alert-modal-title" className="text-xl font-bold text-white">Event Triggered</h2>
            <p className="text-cyan-400 font-mono text-sm">{alertId}</p>
        </div>
        <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
            aria-label="Close"
        >
            {ICONS.close}
        </button>
    </header>
);

export default AlertModalHeader;
