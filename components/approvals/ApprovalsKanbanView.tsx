import React, { useState } from 'react';
import { Approval, ApprovalStatus } from '../../types';
import { getKanbanColumnClass } from './utils';

const KANBAN_STAGES_ORDER: ApprovalStatus[] = [
    ApprovalStatus.Submitted,
    ApprovalStatus.Pending,
    ApprovalStatus.Approved,
    ApprovalStatus.Rejected,
];

const ApprovalCard: React.FC<{ 
    approval: Approval; 
    onDragStart: (e: React.DragEvent<HTMLDivElement>, approvalId: string) => void; 
    onSelect: (id: string) => void;
}> = ({ approval, onDragStart, onSelect }) => {
    return (
        <div
            draggable
            onDragStart={(e) => onDragStart(e, approval.id)}
            onClick={() => onSelect(approval.id)}
            className="bg-slate-800 p-3 rounded-lg shadow-md mb-3 cursor-pointer active:cursor-grabbing border border-slate-700 hover:border-cyan-400 transition-colors"
        >
            <p className="font-bold text-sm text-white">{approval.name}</p>
            <p className="text-xs text-slate-300 mt-1">{approval.authority}</p>
            <p className="text-xs text-slate-400 mt-2 font-mono">{approval.id}</p>
        </div>
    );
};

interface ApprovalsKanbanViewProps {
    approvals: Approval[];
    setApprovals: React.Dispatch<React.SetStateAction<Approval[]>>;
    onSelectApproval: (id: string) => void;
}

const ApprovalsKanbanView: React.FC<ApprovalsKanbanViewProps> = ({ approvals, setApprovals, onSelectApproval }) => {
    const [draggedOverColumn, setDraggedOverColumn] = useState<ApprovalStatus | null>(null);

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, approvalId: string) => {
        e.dataTransfer.setData("approvalId", approvalId);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, newStatus: ApprovalStatus) => {
        e.preventDefault();
        const approvalId = e.dataTransfer.getData("approvalId");
        
        setApprovals(prevApprovals => {
            const approvalToUpdate = prevApprovals.find(a => a.id === approvalId);
            if (approvalToUpdate && approvalToUpdate.status !== newStatus) {
                 return prevApprovals.map(a => 
                    a.id === approvalId 
                    ? { ...a, status: newStatus } 
                    : a
                );
            }
            return prevApprovals;
        });
        setDraggedOverColumn(null);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>, status: ApprovalStatus) => {
        e.preventDefault();
        setDraggedOverColumn(status);
    };

    return (
        <div className="flex space-x-4 overflow-x-auto pb-4 animate-fade-in">
            {KANBAN_STAGES_ORDER.map(status => (
                <div 
                    key={status}
                    onDrop={(e) => handleDrop(e, status)}
                    onDragOver={(e) => handleDragOver(e, status)}
                    onDragLeave={() => setDraggedOverColumn(null)}
                    className={`flex-shrink-0 w-72 bg-slate-900/50 rounded-lg p-3 transition-colors ${draggedOverColumn === status ? 'bg-slate-700/50' : ''}`}
                >
                    <h3 className={`font-semibold mb-4 p-2 rounded-md border-b-2 ${getKanbanColumnClass(status)} text-slate-200`}>
                        {status} ({approvals.filter(a => a.status === status).length})
                    </h3>
                    <div className="space-y-3 min-h-[calc(100vh-350px)]">
                        {approvals
                            .filter(a => a.status === status)
                            .map(a => (
                                <ApprovalCard key={a.id} approval={a} onDragStart={handleDragStart} onSelect={onSelectApproval} />
                            ))
                        }
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ApprovalsKanbanView;