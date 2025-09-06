import React, { useEffect, useState } from 'react';
import { Alert } from '../types';
import { ICONS } from '../constants';
import { useGeminiReportGenerator } from '../hooks/useGeminiReportGenerator';

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
      generateReport(alert);
    }
  }, [isOpen, alert]);

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

  const handleCopy = () => {
    const reportText = formatReportForCopy();
    navigator.clipboard.writeText(reportText).then(() => {
        setCopyStatus('Copied!');
        setTimeout(() => setCopyStatus('Copy to Clipboard'), 2000);
    }, () => {
        setCopyStatus('Failed to copy');
    });
  };

  if (!isOpen) return null;

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
            <h2 id="report-modal-title" className="text-xl font-bold text-white">AI-Generated Incident Report Draft</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
            aria-label="Close"
          >
            {ICONS.close}
          </button>
        </header>

        <main className="p-6 overflow-y-auto space-y-5">
          {loading && (
            <div className="text-center py-10">
                <div className="flex items-center justify-center space-x-2">
                    <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                    <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                    <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                </div>
                <p className="text-slate-300 mt-4">Generating report, please wait...</p>
            </div>
          )}
          {error && (
            <div className="bg-red-500/10 text-red-300 p-4 rounded-lg">
                <p className="font-semibold">Error</p>
                <p>{error}</p>
            </div>
          )}
          {data && (
            <div className="space-y-6 text-slate-300 animate-fade-in">
              <div>
                <h3 className="font-bold text-lg text-white mb-2">{data.title}</h3>
              </div>
              <div>
                <h4 className="font-semibold text-cyan-400 mb-1">Executive Summary</h4>
                <p className="text-sm leading-relaxed">{data.executiveSummary}</p>
              </div>
               <div>
                <h4 className="font-semibold text-cyan-400 mb-1">Timeline Summary</h4>
                <p className="text-sm leading-relaxed">{data.timelineSummary}</p>
              </div>
              <div>
                <h4 className="font-semibold text-cyan-400 mb-1">Root Cause Analysis</h4>
                <p className="text-sm leading-relaxed">{data.rootCauseAnalysis}</p>
              </div>
              <div>
                <h4 className="font-semibold text-cyan-400 mb-1">Corrective Actions Taken</h4>
                <p className="text-sm leading-relaxed">{data.correctiveActionsTaken}</p>
              </div>
              <div>
                <h4 className="font-semibold text-cyan-400 mb-1">Recommendations</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {data.recommendations.map((rec, i) => <li key={i}>{rec}</li>)}
                </ul>
              </div>
            </div>
          )}
        </main>
        
        <footer className="p-4 border-t border-slate-700 flex justify-between items-center">
          <p className="text-xs text-slate-500">This is an AI-generated draft. Please review for accuracy.</p>
          <div className="flex space-x-3">
            {data && (
                <button 
                onClick={handleCopy}
                className="px-4 py-2 bg-slate-600 text-white font-semibold rounded-lg hover:bg-slate-500 transition-colors flex items-center space-x-2"
                >
                    {ICONS.clipboard}
                    <span>{copyStatus}</span>
                </button>
            )}
            <button
                onClick={onClose}
                className="px-5 py-2 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition-colors shadow-md"
            >
                Close
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AIIncidentReportModal;
