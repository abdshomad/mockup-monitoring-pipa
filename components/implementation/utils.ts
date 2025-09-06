
import { DeploymentStatus } from '../../types';
import { ICONS } from '../../constants';

export const getStatusBadgeClass = (status: DeploymentStatus) => {
    switch (status) {
        case DeploymentStatus.Planned: return 'bg-slate-500/20 text-slate-400';
        case DeploymentStatus.AwaitingInstallation: return 'bg-cyan-500/20 text-cyan-400';
        case DeploymentStatus.InProgress: return 'bg-yellow-500/20 text-yellow-400';
        case DeploymentStatus.PendingQA: return 'bg-purple-500/20 text-purple-400';
        case DeploymentStatus.Active: return 'bg-green-500/20 text-green-400';
        default: return 'bg-slate-500/20 text-slate-400';
    }
};

export const getKanbanColumnClass = (status: DeploymentStatus) => {
     const colorMap = {
        [DeploymentStatus.Planned]: 'border-slate-500',
        [DeploymentStatus.AwaitingInstallation]: 'border-cyan-500',
        [DeploymentStatus.InProgress]: 'border-yellow-500',
        [DeploymentStatus.PendingQA]: 'border-purple-500',
        [DeploymentStatus.Active]: 'border-green-500',
    };
    return colorMap[status] || 'border-slate-500';
}

export const getTimelineIcon = (status: DeploymentStatus) => {
    switch (status) {
        case DeploymentStatus.Planned: return ICONS.preConstruction;
        case DeploymentStatus.AwaitingInstallation: return ICONS.assetManagement;
        case DeploymentStatus.InProgress: return ICONS.construction;
        case DeploymentStatus.PendingQA: return ICONS.actions;
        case DeploymentStatus.Active: return ICONS.onlineSensors;
    }
};
