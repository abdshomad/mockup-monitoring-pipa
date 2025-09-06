import React, { useEffect, useState } from 'react';
import { Alert } from '../types';
import { ICONS } from '../constants';
import { useGeminiReportGenerator } from '../hooks/useGeminiReportGenerator';
import ReportDisplay from './ai/ReportDisplay';

interface AIIncidentReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  alert: Alert | null;
}

const AIIncidentReportModal: React.FC<AIIncidentReportModalProps> = ({ isOpen, onClose, alert }) => {
  const { generateReport, data, loading, error } = useGeminiReportGenerator();
  const [copyStatus, setCopyStatus] = useState('Copy to Clipboard');

  useEffect(() => {
    if (isOpen && alert) {
      setCopyStatus('Copy to Clipboard'); // Reset on open
      generateReport(alert);
    }
  }, [isOpen, alert, generateReport]);

  const formatReportForCopy = () => {
    if (!data) return '';
    let text = `Title: ${data.title}\n\n`;
    text += `Executive Summary:\n${data.executiveSummary}\n\n`;
    text += `Timeline Summary:\n${data.timelineSummary}\n\n`;
    text += `Root Cause Analysis:\n${data.rootCauseAnalysis}\n\n`;
    text += `Corrective Actions Taken:\n${data.correctiveActionsTaken}\n\n`;
    text += `Recommendations:\n`;
    data.recommendations.forEach(rec => {
      text += `- ${rec}\n`;
    });
    return text;
  };

  const handleCopyToClipboard = () => {
    const reportText = formatReportForCopy();
    navigator.clipboard.writeText(reportText).then(() => {
        setCopyStatus('Copied!');
        setTimeout(() => setCopyStatus('Copy to Clipboard'), 2000);
    });
  };

  if (!isOpen) return null;

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center h-64">
            <div className="text-purple-400 mb-4">{React.cloneElement(ICONS.ai, { className: "h-12 w-12 animate-pulse" })}</div>
            <p className="text-slate-300">Generating AI Incident Report...</p>
            <p className="text-slate-400 text-sm">This may take a moment.</p>
        </div>
      );
    }
    if (error) {
       return (
        <div className="flex flex-col items-center justify-center h-64 text-center">
             <div className="text-red-400 mb-4">{React.cloneElement(ICONS.alerts, { className: "h-12 w-12" })}</div>
            <p className="text-slate-200 font-semibold">Error Generating Report</p>
            <p className="text-red-400 text-sm mt-1">{error}</p>
        </div>
       );
    }
    if (data) {
      return <ReportDisplay data={data} />;
    }
    return null;
  };


  return (
    <div
      className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="report-modal-title"
    >
      <div
        className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col border border-slate-700"
        onClick={e => e.stopPropagation()}
      >
        <header className="flex justify-between items-center p-6 border-b border-slate-700">
          <div className="flex items-center text-purple-400">
            <span className="mr-3 h-7 w-7">{ICONS.ai}</span>
            <h2 id="report-modal-title" className="text-xl font-bold text-white">AI-Generated Incident Report</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
            aria-label="Close"
          >
            {React.cloneElement(ICONS.close, { className: "h-6 w-6" })}
          </button>
        </header>

        <main className="p-6 overflow-y-auto">
            {renderContent()}
        </main>
        
        <footer className="p-4 border-t border-slate-700 flex justify-end items-center space-x-3">
          <button
            onClick={handleCopyToClipboard}
            disabled={!data}
            className="px-4 py-2 bg-slate-600 text-white font-semibold rounded-lg hover:bg-slate-500 transition-colors flex items-center space-x-2 disabled:opacity-50"
          >
            {React.cloneElement(ICONS.clipboard, { className: 'h-5 w-5' })}
            <span>{copyStatus}</span>
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition-colors shadow-md"
          >
            Close
          </button>
        </footer>
      </div>
    </div>
  );
};

export default AIIncidentReportModal;
