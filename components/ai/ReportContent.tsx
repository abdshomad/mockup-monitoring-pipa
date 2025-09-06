
import React from 'react';
import { IncidentReport } from '../../hooks/useGeminiReportGenerator';
import { ICONS } from '../../constants';
import ReportDisplay from './ReportDisplay';

interface ReportContentProps {
    isGenerated: boolean;
    loading: boolean;
    error: string | null;
    data: IncidentReport | null;
    onGenerate: () => void;
}

const ReportContent: React.FC<ReportContentProps> = ({ isGenerated, loading, error, data, onGenerate }) => {
    if (!isGenerated) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="text-purple-400 mb-4">{React.cloneElement(ICONS.ai, { className: "h-12 w-12" })}</div>
                <p className="text-slate-200 font-semibold text-lg">Generate AI Incident Report</p>
                <p className="text-slate-400 text-sm mt-1 mb-6 max-w-md">The AI will analyze the alert details and timeline to create a formal incident report, including a root cause analysis and recommendations.</p>
                <button 
                    onClick={onGenerate} 
                    className="px-5 py-2.5 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors shadow-md flex items-center space-x-2"
                >
                    {React.cloneElement(ICONS.ai, { className: "h-5 w-5" })}
                    <span>Generate Report</span>
                </button>
            </div>
        );
    }
    
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

export default ReportContent;