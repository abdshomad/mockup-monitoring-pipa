import { ApprovalStatus } from '../../types';

export const getStatusBadgeClass = (status: ApprovalStatus) => {
    switch (status) {
        case ApprovalStatus.Approved: return 'bg-green-500/20 text-green-400';
        case ApprovalStatus.Pending: return 'bg-yellow-500/20 text-yellow-400';
        case ApprovalStatus.Submitted: return 'bg-cyan-500/20 text-cyan-400';
        case ApprovalStatus.Rejected: return 'bg-red-500/20 text-red-400';
        default: return 'bg-slate-500/20 text-slate-400';
    }
};

export const getKanbanColumnClass = (status: ApprovalStatus) => {
     const colorMap = {
        [ApprovalStatus.Submitted]: 'border-cyan-500',
        [ApprovalStatus.Pending]: 'border-yellow-500',
        [ApprovalStatus.Approved]: 'border-green-500',
        [ApprovalStatus.Rejected]: 'border-red-500',
    };
    return colorMap[status] || 'border-slate-500';
}
