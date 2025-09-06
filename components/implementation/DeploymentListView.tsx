
import React, { useState } from 'react';
import { SensorDeployment, DeploymentStatus } from '../../types';
import { getStatusBadgeClass } from './utils';

const DeploymentListView: React.FC<{ deployments: SensorDeployment[]; onSelectDeployment: (id: string) => void; }> = ({ deployments, onSelectDeployment }) => {
    const [statusFilter, setStatusFilter] = useState<DeploymentStatus | null>(null);

    const filteredDeployments = deployments.filter(
        d => !statusFilter || d.currentStatus === statusFilter
    );

    return (
        <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
            <div className="flex flex-wrap gap-2 items-center mb-6">
                <span className="text-slate-400 font-medium mr-2">Filter by status:</span>
                <button onClick={() => setStatusFilter(null)} className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors duration-200 ${!statusFilter ? 'bg-cyan-500 text-white shadow-md' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>
                    All
                </button>
                {Object.values(DeploymentStatus).map(status => (
                    <button key={status} onClick={() => setStatusFilter(status)} className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors duration-200 ${statusFilter === status ? 'bg-cyan-500 text-white shadow-md' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>
                        {status}
                    </button>
                ))}
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-slate-400">
                    <thead className="text-xs text-slate-300 uppercase bg-slate-700/50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Deployment ID</th>
                            <th scope="col" className="px-6 py-3">Sensor / Asset</th>
                            <th scope="col" className="px-6 py-3">Segment</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3">Last Update</th>
                            <th scope="col" className="px-6 py-3">Assigned Team</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDeployments.map(d => (
                            <tr key={d.id} className="bg-slate-800 border-b border-slate-700 hover:bg-slate-700/50">
                                <td className="px-6 py-4 font-medium text-white">{d.id}</td>
                                <td className="px-6 py-4 font-mono">{d.sensorId}<br/>{d.assetId}</td>
                                <td className="px-6 py-4">{d.segment}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeClass(d.currentStatus)}`}>
                                        {d.currentStatus}
                                    </span>
                                </td>
                                <td className="px-6 py-4">{d.history[d.history.length - 1].timestamp}</td>
                                <td className="px-6 py-4">{d.assignedTeam}</td>
                                <td className="px-6 py-4">
                                    <button onClick={() => onSelectDeployment(d.id)} className="font-medium text-cyan-400 hover:underline">View Timeline</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DeploymentListView;
