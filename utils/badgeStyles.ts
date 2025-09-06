import { AlertSeverity, AlertWorkflowStage, IncidentStatus, FollowUpTaskStatus, MaintenanceStatus, LoraWANDeviceStatus, LoraWANGatewayStatus } from '../types';

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

export const getIncidentStatusBadgeClass = (status: IncidentStatus) => {
    switch (status) {
        case IncidentStatus.Active: return 'bg-red-500/20 text-red-400';
        case IncidentStatus.Monitoring: return 'bg-yellow-500/20 text-yellow-400';
        case IncidentStatus.Resolved: return 'bg-green-500/20 text-green-400';
        case IncidentStatus.PostMortem: return 'bg-blue-500/20 text-blue-400';
        default: return 'bg-slate-500/20 text-slate-400';
    }
};

export const getFollowUpStatusBadgeClass = (status: FollowUpTaskStatus) => {
    switch (status) {
        case FollowUpTaskStatus.Open: return 'bg-cyan-500/20 text-cyan-400';
        case FollowUpTaskStatus.InProgress: return 'bg-yellow-500/20 text-yellow-400';
        case FollowUpTaskStatus.Completed: return 'bg-green-500/20 text-green-400';
        default: return 'bg-slate-500/20 text-slate-400';
    }
};

export const getSeverityTextBadgeClass = (severity: AlertSeverity) => {
    switch (severity) {
        case AlertSeverity.Critical: return 'bg-red-500 text-white';
        case AlertSeverity.High: return 'bg-orange-500 text-white';
        case AlertSeverity.Medium: return 'bg-yellow-500 text-black';
        case AlertSeverity.Low: return 'bg-blue-500 text-white';
        default: return 'bg-slate-500 text-white';
    }
};

export const getMaintenanceStatusBadgeClass = (status: MaintenanceStatus) => {
    switch (status) {
        case MaintenanceStatus.Scheduled: return 'bg-cyan-500/20 text-cyan-400';
        case MaintenanceStatus.InProgress: return 'bg-yellow-500/20 text-yellow-400';
        case MaintenanceStatus.Completed: return 'bg-green-500/20 text-green-400';
        default: return 'bg-slate-500/20 text-slate-400';
    }
};

export const getLoraDeviceStatusBadgeClass = (status: LoraWANDeviceStatus) => {
    switch (status) {
        case LoraWANDeviceStatus.Online: return 'bg-green-500/20 text-green-400';
        case LoraWANDeviceStatus.Offline: return 'bg-red-500/20 text-red-400';
        case LoraWANDeviceStatus.LowBattery: return 'bg-yellow-500/20 text-yellow-400';
        default: return 'bg-slate-500/20 text-slate-400';
    }
};

export const getLoraGatewayStatusBadgeClass = (status: LoraWANGatewayStatus) => {
    switch (status) {
        case LoraWANGatewayStatus.Online: return 'bg-green-500/20 text-green-400';
        case LoraWANGatewayStatus.Offline: return 'bg-red-500/20 text-red-400';
        default: return 'bg-slate-500/20 text-slate-400';
    }
};