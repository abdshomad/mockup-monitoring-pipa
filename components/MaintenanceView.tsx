
import React, { useState } from 'react';
import { MAINTENANCE_SCHEDULE } from '../constants';
import { MaintenanceStatus, MaintenanceTask } from '../types';

const MaintenanceView: React.FC = () => {
    const [statusFilter, setStatusFilter] = useState<MaintenanceStatus | null>(null);

    const getStatusBadgeClass = (status: MaintenanceStatus) => {
        switch (status) {
            case MaintenanceStatus.Scheduled: return 'bg-cyan-500/20 text-cyan-400';
            case MaintenanceStatus.InProgress: return 'bg-yellow-500/20 text-yellow-400';
            case MaintenanceStatus.Completed: return 'bg-green-500/20 text-green-400';
            default: return 'bg-slate-500/20 text-slate-400';
        }
    };

    const filteredTasks = MAINTENANCE_SCHEDULE.filter(
        (task) => !statusFilter || task.status === statusFilter
    );

    return (
        <div className="bg-slate-800 p-6 rounded-2xl shadow-lg animate-fade-in">
            <h3 className="text-xl font-semibold mb-6 text-white">Maintenance Schedule</h3>

            <div className="flex flex-wrap gap-2 items-center mb-6">
                <span className="text-slate-400 font-medium mr-2">Filter by status:</span>
                <button
                    onClick={() => setStatusFilter(null)}
                    className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors duration-200 ${
                        statusFilter === null
                            ? 'bg-cyan-500 text-white shadow-md'
                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                >
                    All
                </button>
                {Object.values(MaintenanceStatus).map(status => (
                    <button
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors duration-200 ${
                            statusFilter === status
                                ? 'bg-cyan-500 text-white shadow-md'
                                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        }`}
                    >
                        {status}
                    </button>
                ))}
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-slate-400">
                    <thead className="text-xs text-slate-300 uppercase bg-slate-700/50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Task ID</th>
                            <th scope="col" className="px-6 py-3">Sensor ID</th>
                            <th scope="col" className="px-6 py-3">Task</th>
                            <th scope="col" className="px-6 py-3">Scheduled Date</th>
                            <th scope="col" className="px-6 py-3">Assigned Technician</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTasks.length > 0 ? (
                            filteredTasks.map((task: MaintenanceTask) => (
                                <tr key={task.id} className="bg-slate-800 border-b border-slate-700 hover:bg-slate-700/50">
                                    <td className="px-6 py-4 font-medium text-white">{task.id}</td>
                                    <td className="px-6 py-4">{task.sensorId}</td>
                                    <td className="px-6 py-4">{task.task}</td>
                                    <td className="px-6 py-4">{task.scheduledDate}</td>
                                    <td className="px-6 py-4">{task.assignedTechnician}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeClass(task.status)}`}>
                                            {task.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="text-center py-8 text-slate-400">
                                    No maintenance tasks match the current filter criteria.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MaintenanceView;
