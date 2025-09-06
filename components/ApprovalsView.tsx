import React, { useState } from 'react';
import { APPROVALS } from '../constants';
import { Approval, ApprovalStatus } from '../types';
import RequestApprovalModal from './RequestApprovalModal';
import ApprovalsKanbanView from './approvals/ApprovalsKanbanView';
import { getStatusBadgeClass } from './approvals/utils';
import { List, Kanban } from 'lucide-react';
import ApprovalDetailView from './approvals/ApprovalDetailView';

const ApprovalsView: React.FC = () => {
    const [approvals, setApprovals] = useState<Approval[]>(APPROVALS);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [statusFilter, setStatusFilter] = useState<ApprovalStatus | null>(null);
    const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');
    const [selectedApprovalId, setSelectedApprovalId] = useState<string | null>(null);

    const filteredApprovals = approvals.filter(
        (approval) => !statusFilter || approval.status === statusFilter
    );
    
    const handleSubmitApproval = (data: { name: string; authority: string; submitted: string; }) => {
        const newApproval: Approval = {
            id: `APP-${Date.now().toString().slice(-4)}`,
            name: data.name,
            authority: data.authority,
            status: ApprovalStatus.Submitted,
            submitted: data.submitted,
            approved: null,
            history: [{
                timestamp: new Date().toISOString(),
                status: ApprovalStatus.Submitted,
                notes: 'Initial request created.',
                operator: 'Operator 1'
            }]
        };
        setApprovals(prev => [newApproval, ...prev]);
        setIsModalOpen(false);
    };

    const selectedApproval = approvals.find(a => a.id === selectedApprovalId);

    if (selectedApproval) {
        return <ApprovalDetailView approval={selectedApproval} onBack={() => setSelectedApprovalId(null)} />;
    }

    return (
        <>
            <RequestApprovalModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmitApproval}
            />
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-white">Project Approvals</h2>
                        <p className="text-slate-300 mt-1">
                            {viewMode === 'list' 
                                ? 'Track the status of all necessary permits and regulatory sign-offs.'
                                : 'Drag and drop cards to update the approval status.'
                            }
                        </p>
                    </div>
                     <div className="flex items-center space-x-4 flex-shrink-0">
                         <button 
                            onClick={() => setIsModalOpen(true)}
                            className="px-4 py-2 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition-colors shadow-md"
                        >
                            Request New Approval
                        </button>
                        <div className="flex items-center space-x-2 bg-slate-800 p-1 rounded-lg">
                            <button 
                                onClick={() => setViewMode('list')} 
                                className={`px-3 py-1.5 rounded-md text-sm font-semibold flex items-center space-x-2 transition-colors ${viewMode === 'list' ? 'bg-cyan-500 text-white' : 'text-slate-400 hover:bg-slate-700'}`}
                            >
                                <List className="h-4 w-4" />
                                <span>List</span>
                            </button>
                            <button 
                                onClick={() => setViewMode('kanban')}
                                className={`px-3 py-1.5 rounded-md text-sm font-semibold flex items-center space-x-2 transition-colors ${viewMode === 'kanban' ? 'bg-cyan-500 text-white' : 'text-slate-400 hover:bg-slate-700'}`}
                            >
                                 <Kanban className="h-4 w-4" />
                                 <span>Kanban</span>
                            </button>
                        </div>
                    </div>
                </div>
                
                {viewMode === 'list' ? (
                    <div className="bg-slate-800 p-6 rounded-2xl shadow-lg animate-fade-in">
                        <div className="flex flex-wrap gap-2 items-center mb-6">
                            <span className="text-slate-400 font-medium mr-2">Filter by status:</span>
                            <button onClick={() => setStatusFilter(null)} className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors duration-200 ${!statusFilter ? 'bg-cyan-500 text-white shadow-md' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>
                                All
                            </button>
                            {Object.values(ApprovalStatus).map(status => (
                                <button key={status} onClick={() => setStatusFilter(status)} className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors duration-200 ${statusFilter === status ? 'bg-cyan-500 text-white shadow-md' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>
                                    {status}
                                </button>
                            ))}
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-slate-400">
                                <thead className="text-xs text-slate-300 uppercase bg-slate-700/50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Permit Name</th>
                                        <th scope="col" className="px-6 py-3">Authority</th>
                                        <th scope="col" className="px-6 py-3">Status</th>
                                        <th scope="col" className="px-6 py-3">Date Submitted</th>
                                        <th scope="col" className="px-6 py-3">Date Approved</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredApprovals.map((approval: Approval) => (
                                        <tr key={approval.id} onClick={() => setSelectedApprovalId(approval.id)} className="bg-slate-800 border-b border-slate-700 hover:bg-slate-700/50 cursor-pointer">
                                            <td className="px-6 py-4 font-medium text-white">{approval.name}</td>
                                            <td className="px-6 py-4">{approval.authority}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeClass(approval.status)}`}>
                                                    {approval.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">{approval.submitted}</td>
                                            <td className="px-6 py-4">{approval.approved || '-'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <ApprovalsKanbanView approvals={approvals} setApprovals={setApprovals} onSelectApproval={setSelectedApprovalId} />
                )}
            </div>
        </>
    );
};

export default ApprovalsView;