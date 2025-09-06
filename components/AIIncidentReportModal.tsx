
import React, { useEffect, useState, useCallback } from 'react';
import { Alert } from '../types';
import { ICONS } from '../constants';
import { useGeminiReportGenerator } from '../hooks/useGeminiReportGenerator';
import ModalHeader from './ai/ModalHeader';
import ReportContent from './ai/ReportContent';
import ReportModalFooter from './ai/ReportModalFooter';

interface AIIncidentReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  alert: Alert | null;
}

const AIIncidentReportModal: React.FC<AIIncidentReportModalProps> = ({ isOpen, onClose, alert }) => {
  const { generateReport, data, loading, error, reset } = useGeminiReportGenerator();
  const [copyStatus, setCopyStatus] = useState('Copy to Clipboard');
  const [isGenerated, setIsGenerated] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsGenerated(false);
      reset();
    }
  }, [isOpen, reset]);

  const handleGenerate = useCallback(() => {
    if (alert) {
      generateReport(alert);
      setIsGenerated(true);
    }
  }, [alert, generateReport]);

  const handleCopyToClipboard = useCallback(() => {
    if (!data) return;
    let text = `Title: ${data.title}\n\nExecutive Summary:\n${data.executiveSummary}\n\nTimeline Summary:\n${data.timelineSummary}\n\nRoot Cause Analysis:\n${data.rootCauseAnalysis}\n\nCorrective Actions Taken:\n${data.correctiveActionsTaken}\n\nRecommendations:\n- ${data.recommendations.join('\n- ')}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopyStatus('Copied!');
      setTimeout(() => setCopyStatus('Copy to Clipboard'), 2000);
    });
  }, [data]);

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
        <ModalHeader
          title="AI-Generated Incident Report"
          icon={React.cloneElement(ICONS.ai, { className: "h-7 w-7" })}
          onClose={onClose}
        />
        <main className="p-6 overflow-y-auto">
          <ReportContent 
            isGenerated={isGenerated}
            loading={loading} 
            error={error} 
            data={data} 
            onGenerate={handleGenerate}
          />
        </main>
        <ReportModalFooter
          data={data}
          copyStatus={copyStatus}
          onCopyToClipboard={handleCopyToClipboard}
          onClose={onClose}
        />
      </div>
    </div>
  );
};

export default AIIncidentReportModal;