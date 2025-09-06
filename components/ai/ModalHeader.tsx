
import React from 'react';
import { ICONS } from '../../constants';

interface ModalHeaderProps {
    title: string;
    icon: React.ReactElement;
    onClose: () => void;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ title, icon, onClose }) => (
    <header className="flex justify-between items-center p-6 border-b border-slate-700">
        <div className="flex items-center text-purple-400">
            <span className="mr-3">{icon}</span>
            <h2 id="report-modal-title" className="text-xl font-bold text-white">{title}</h2>
        </div>
        <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
            aria-label="Close"
        >
            {React.cloneElement(ICONS.close, { className: "h-6 w-6" })}
        </button>
    </header>
);

export default ModalHeader;
