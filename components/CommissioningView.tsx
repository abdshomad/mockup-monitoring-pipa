import React from 'react';
import { COMMISSIONING_TASKS } from '../constants';
import { CommissioningTask } from '../types';
import { CheckCircle2, Loader2, CircleDot } from 'lucide-react';

const CommissioningView: React.FC = () => {

    const getStatusIcon = (status: CommissioningTask['status']) => {
        switch (status) {
            case 'Completed':
                return <CheckCircle2 className="h-5 w-5 text-green-400" />;
            case 'In Progress':
                return <Loader2 className="h-5 w-5 text-yellow-400 animate-spin" />;
            case 'Not Started':
                 return <CircleDot className="h-5 w-5 text-slate-500" />;
        }
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">System Commissioning Checklist</h2>
            <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
                <p className="text-slate-300 mb-6">
                    This checklist tracks the final commissioning process, including end-to-end system tests, user acceptance testing (UAT), and official system handover.
                </p>
                <ul className="space-y-4">
                    {COMMISSIONING_TASKS.map(task => (
                        <li key={task.id} className="p-4 bg-slate-700/50 rounded-lg flex items-center justify-between">
                            <div className="flex items-center">
                                {getStatusIcon(task.status)}
                                <div className="ml-4">
                                    <p className="font-semibold text-slate-200">{task.task}</p>
                                    <p className="text-sm text-slate-400">Team: {task.responsibleTeam}</p>
                                </div>
                            </div>
                            <span className="text-sm font-medium text-slate-300">{task.status}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CommissioningView;