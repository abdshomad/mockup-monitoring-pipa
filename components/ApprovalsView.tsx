import React, { useState } from 'react';
import { APPROVALS } from '../constants';
import { Approval, ApprovalStatus } from '../types';

const ApprovalsView: React.FC = () => {
    const [statusFilter, setStatusFilter] = useState<ApprovalStatus | null>(null);

    const getStatusBadgeClass = (status: ApprovalStatus) => {
        switch (status) {
            case ApprovalStatus.Approved: return 'bg-green-500/20 text-green-400';
            case ApprovalStatus.Pending: return 'bg-yellow-500/20 text-yellow-400';
            case ApprovalStatus.Submitted: return 'bg-cyan-500/20 text-cyan-400';
            case ApprovalStatus.Rejected: return 'bg-red-500/20 text-red-400';
            default: return 'bg-slate-500/20 text-slate-400';
        }
    };

    const filteredApprovals = APPROVALS.filter(
        (approval) => !statusFilter || approval.status === statusFilter
    );

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Project Approvals</h2>
            <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
                    <p className="text-slate-300 max-w-prose">
                        Track the status of all necessary permits and regulatory sign-offs required for the project.
                    </p>
                    <button className="px-4 py-2 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition-colors shadow-md flex-shrink-0">
                        Request New Approval
                    </button>
                </div>

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
                                <tr key={approval.id} className="bg-slate-800 border-b border-slate-700 hover:bg-slate-700/50">
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
        </div>
    );
};

export default ApprovalsView;