import React from 'react';
import { Alert, AlertSeverity, AlertWorkflowStage } from '../../types';

interface AlertSummaryProps {
    alert: Alert;
}

const getSeverityBadgeClass = (severity: AlertSeverity) => {
    switch (severity) {
        case AlertSeverity.Critical: return 'bg-red-500/20 text-red-400';
        case AlertSeverity.High: return 'bg-orange-500/20 text-orange-400';
        case AlertSeverity.Medium: return 'bg-yellow-500/20 text-yellow-400';
        case AlertSeverity.Low: return 'bg-blue-500/20 text-blue-400';
        default: return 'bg-slate-500/20 text-slate-400';
    }
};

const getStageBadgeClass = (stage: AlertWorkflowStage) => {
    switch (stage) {
        case AlertWorkflowStage.Triage: return 'bg-cyan-500/20 text-cyan-400';
        case AlertWorkflowStage.Investigating: return 'bg-purple-500/20 text-purple-400';
        case AlertWorkflowStage.Dispatched: return 'bg-indigo-500/20 text-indigo-400';
        case AlertWorkflowStage.OnSite: return 'bg-blue-500/20 text-blue-400';
        case AlertWorkflowStage.Resolving: return 'bg-yellow-500/20 text-yellow-400';
        case AlertWorkflowStage.Resolved: return 'bg-green-500/20 text-green-400';
        default: return 'bg-slate-500/20 text-slate-400';
    }
};

const AlertSummary: React.FC<AlertSummaryProps> = ({ alert }) => {
    return (
        <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
            <h3 className="font-semibold text-white mb-4">Summary</h3>
            <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                    <span className="text-slate-400">Timestamp</span>
                    <span className="font-mono text-white">{alert.timestamp}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-slate-400">Sensor ID</span>
                    <span className="font-mono text-white">{alert.sensorId}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-slate-400">Segment</span>
                    <span className="font-mono text-white">{alert.location.segment}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-slate-400">Severity</span>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getSeverityBadgeClass(alert.severity)}`}>
                        {alert.severity}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-slate-400">Stage</span>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStageBadgeClass(alert.stage)}`}>
                        {alert.stage}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default AlertSummary;
