import React from 'react';
import { Approval, ApprovalDocument, ApprovalHistoryEntry, ApprovalStatus } from '../../types';
import { getStatusBadgeClass } from './utils';
import { ICONS } from '../../constants';

const ApprovalSummaryCard: React.FC<{ approval: Approval }> = ({ approval }) => (
    <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
        <h3 className="font-semibold text-white mb-4">Summary</h3>
        <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
                <span className="text-slate-400">Permit Name</span>
                <span className="font-medium text-white text-right">{approval.name}</span>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-slate-400">Authority</span>
                <span className="font-medium text-white">{approval.authority}</span>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-slate-400">Status</span>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeClass(approval.status)}`}>
                    {approval.status}
                </span>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-slate-400">Submitted</span>
                <span className="font-mono text-white">{approval.submitted}</span>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-slate-400">Approved</span>
                <span className="font-mono text-white">{approval.approved || 'N/A'}</span>
            </div>
        </div>
    </div>
);

const getStatusIcon = (status: ApprovalStatus) => {
    switch (status) {
        case ApprovalStatus.Submitted: return <span className="text-cyan-400">{ICONS.send}</span>;
        case ApprovalStatus.Pending: return <span className="text-yellow-400">{ICONS.monitoring}</span>;
        case ApprovalStatus.Approved: return <span className="text-green-400">{ICONS.onlineSensors}</span>;
        case ApprovalStatus.Rejected: return <span className="text-red-400">{ICONS.close}</span>;
        default: return ICONS.dashboard;
    }
}

const ApprovalHistoryTimeline: React.FC<{ history: ApprovalHistoryEntry[] }> = ({ history }) => (
    <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
        <h3 className="text-xl font-semibold mb-6 text-white">Status History</h3>
        <div className="relative pl-6">
            <div className="absolute top-0 left-0 h-full w-0.5 bg-slate-700/50 translate-x-2.5"></div>
            <ul className="space-y-8">
                {history.map((entry, index) => (
                    <li key={index} className="relative pl-6">
                        <div className="absolute -left-2 top-0 w-5 h-5 bg-slate-700 rounded-full ring-4 ring-slate-800 flex items-center justify-center">
                            {getStatusIcon(entry.status)}
                        </div>
                        <div className="ml-4 bg-slate-900/30 p-4 rounded-lg">
                            <p className="text-md font-semibold text-slate-200">Status changed to {entry.status}</p>
                            <p className="text-sm text-slate-400">by <span className="font-semibold text-slate-300">{entry.operator}</span></p>
                            <p className="text-xs text-slate-500 mt-1">{entry.timestamp}</p>
                            <div className="mt-3 pt-3 border-t border-slate-700/50">
                                <p className="text-sm text-slate-300 leading-relaxed">{entry.notes}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

const ApprovalDocumentsCard: React.FC<{ documents: ApprovalDocument[] }> = ({ documents }) => (
    <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
        <h3 className="font-semibold text-white mb-4">Linked Documents</h3>
        {documents.length > 0 ? (
            <ul className="space-y-3">
                {documents.map(doc => (
                    <li key={doc.id} className="flex items-center space-x-3 p-2 bg-slate-700/50 rounded-lg">
                        <div className="text-cyan-400 flex-shrink-0">{ICONS.file}</div>
                        <div className="flex-grow">
                            <a href={doc.url} className="text-sm font-medium text-slate-200 hover:underline">{doc.name}</a>
                            <p className="text-xs text-slate-400">Uploaded: {doc.uploadedAt}</p>
                        </div>
                    </li>
                ))}
            </ul>
        ) : (
            <p className="text-center text-sm text-slate-500 py-4">No documents attached.</p>
        )}
    </div>
);


interface ApprovalDetailViewProps {
  approval: Approval | undefined;
  onBack: () => void;
}

const ApprovalDetailView: React.FC<ApprovalDetailViewProps> = ({ approval, onBack }) => {
  if (!approval) {
    return (
      <div className="text-center p-10">
        <h2 className="text-xl text-red-400">Approval not found.</h2>
        <button onClick={onBack} className="mt-4 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600">
          Back to List
        </button>
      </div>
    );
  }
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Approval Details: <span className="text-cyan-400">{approval.id}</span></h2>
        <button onClick={onBack} className="px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors">
            &larr; Back to Approvals
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
            <ApprovalSummaryCard approval={approval} />
            <ApprovalDocumentsCard documents={approval.documents || []} />
        </div>
        <div className="lg:col-span-2">
            <ApprovalHistoryTimeline history={approval.history || []} />
        </div>
      </div>
    </div>
  );
};

export default ApprovalDetailView;
