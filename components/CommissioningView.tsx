import React from 'react';
import { COMMISSIONING_TASKS } from '../constants';
import { CommissioningTask } from '../types';

const CommissioningView: React.FC = () => {

    const getStatusIcon = (status: CommissioningTask['status']) => {
        switch (status) {
            case 'Completed':
                return <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>;
            case 'In Progress':
                return <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" /></svg>;
            case 'Not Started':
                 return <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 9a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" /></svg>;
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