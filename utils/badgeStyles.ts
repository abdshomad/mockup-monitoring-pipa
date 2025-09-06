
import { AlertSeverity, AlertWorkflowStage } from '../types';

export const getSeverityBadgeClass = (severity: AlertSeverity) => {
    switch (severity) {
        case AlertSeverity.Critical: return 'bg-red-500/20 text-red-400';
        case AlertSeverity.High: return 'bg-orange-500/20 text-orange-400';
        case AlertSeverity.Medium: return 'bg-yellow-500/20 text-yellow-400';
        case AlertSeverity.Low: return 'bg-blue-500/20 text-blue-400';
        default: return 'bg-slate-500/20 text-slate-400';
    }
};

export const getStageBadgeClass = (stage: AlertWorkflowStage) => {
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
