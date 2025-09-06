
import React from 'react';
import { MAINTENANCE_SCHEDULE } from '../constants';
import { MaintenanceStatus, MaintenanceTask } from '../types';

const MaintenanceView: React.FC = () => {
    
    const getStatusBadgeClass = (status: MaintenanceStatus) => {
        switch (status) {
            case MaintenanceStatus.Scheduled: return 'bg-cyan-500/20 text-cyan-400';
            case MaintenanceStatus.InProgress: return 'bg-yellow-500/20 text-yellow-400';
            case MaintenanceStatus.Completed: return 'bg-green-500/20 text-green-400';
            default: return 'bg-slate-500/20 text-slate-400';
        }
    };

    return (
        <div className="bg-slate-800 p-6 rounded-2xl shadow-lg animate-fade-in">
            <h3 className="text-xl font-semibold mb-6 text-white">Maintenance Schedule</h3>
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
                        {MAINTENANCE_SCHEDULE.map((task: MaintenanceTask) => (
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
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MaintenanceView;
