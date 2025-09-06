
import React from 'react';

interface AlertModalFooterProps {
    onClose: (e: React.MouseEvent) => void;
    count: number;
}

const AlertModalFooter: React.FC<AlertModalFooterProps> = ({ onClose, count }) => (
    <footer className="p-4 flex justify-end">
        <button
            onClick={onClose}
            className="px-5 py-2 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition-colors shadow-md min-w-[140px]"
        >
            Resume ({count})
        </button>
    </footer>
);

export default AlertModalFooter;
