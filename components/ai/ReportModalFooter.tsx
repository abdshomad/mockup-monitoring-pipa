
import React from 'react';
import { IncidentReport } from '../../hooks/useGeminiReportGenerator';
import { ICONS } from '../../constants';

interface ReportModalFooterProps {
    data: IncidentReport | null;
    copyStatus: string;
    onCopyToClipboard: () => void;
    onClose: () => void;
}

const ReportModalFooter: React.FC<ReportModalFooterProps> = ({ data, copyStatus, onCopyToClipboard, onClose }) => (
    <footer className="p-4 border-t border-slate-700 flex justify-end items-center space-x-3">
        {data && (
            <button
                onClick={onCopyToClipboard}
                className="px-4 py-2 bg-slate-600 text-white font-semibold rounded-lg hover:bg-slate-500 transition-colors flex items-center space-x-2 disabled:opacity-50"
            >
                {React.cloneElement(ICONS.clipboard, { className: 'h-5 w-5' })}
                <span>{copyStatus}</span>
            </button>
        )}
        <button
            onClick={onClose}
            className="px-5 py-2 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition-colors shadow-md"
        >
            Close
        </button>
    </footer>
);

export default ReportModalFooter;