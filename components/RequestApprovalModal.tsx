import React, { useState } from 'react';

interface RequestApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; authority: string; submitted: string; }) => void;
}

const RequestApprovalModal: React.FC<RequestApprovalModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [name, setName] = useState('');
    const [authority, setAuthority] = useState('');
    const [submitted, setSubmitted] = useState(new Date().toISOString().split('T')[0]); // Default to today

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (!name.trim() || !authority.trim() || !submitted) {
            alert("Please fill all required fields.");
            return;
        }
        onSubmit({ name, authority, submitted });
        // Reset form
        setName('');
        setAuthority('');
        setSubmitted(new Date().toISOString().split('T')[0]);
    };

    return (
        <div
            className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="approval-modal-title"
        >
            <div
                className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg border border-slate-700"
                onClick={e => e.stopPropagation()}
            >
                <header className="p-6 border-b border-slate-700">
                    <h2 id="approval-modal-title" className="text-xl font-bold text-white">Request New Approval</h2>
                    <p className="text-slate-400 text-sm mt-1">Submit a new permit or regulatory sign-off for tracking.</p>
                </header>
                <main className="p-6 space-y-4">
                    <div>
                        <label htmlFor="permit-name" className="block text-sm font-medium text-slate-300 mb-1">Permit Name</label>
                        <input id="permit-name" type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-slate-700 text-white placeholder-slate-400 rounded-lg p-2 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500" placeholder="e.g., Environmental Impact Assessment" />
                    </div>
                    <div>
                        <label htmlFor="authority" className="block text-sm font-medium text-slate-300 mb-1">Approving Authority</label>
                        <input id="authority" type="text" value={authority} onChange={e => setAuthority(e.target.value)} className="w-full bg-slate-700 text-white placeholder-slate-400 rounded-lg p-2 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500" placeholder="e.g., Ministry of Environment" />
                    </div>
                    <div>
                        <label htmlFor="submission-date" className="block text-sm font-medium text-slate-300 mb-1">Submission Date</label>
                        <input id="submission-date" type="date" value={submitted} onChange={e => setSubmitted(e.target.value)} className="w-full bg-slate-700 text-white rounded-lg p-2 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                    </div>
                </main>
                <footer className="p-4 bg-slate-800/50 flex justify-end space-x-3">
                    <button onClick={onClose} className="px-4 py-2 bg-slate-600 text-white font-semibold rounded-lg hover:bg-slate-500 transition-colors">Cancel</button>
                    <button onClick={handleSubmit} className="px-4 py-2 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition-colors shadow-md">Submit Request</button>
                </footer>
            </div>
        </div>
    );
};

export default RequestApprovalModal;