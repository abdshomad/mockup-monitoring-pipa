import React from 'react';
import { SENSORS } from '../constants';

const deploymentLog = [
    { id: 'DL-001', sensorId: 'P-VIB-001', team: 'Alpha', date: '2024-07-25', status: 'Completed' },
    { id: 'DL-002', sensorId: 'P-VIB-002', team: 'Alpha', date: '2024-07-25', status: 'Completed' },
    { id: 'DL-003', sensorId: 'P-VIB-004', team: 'Bravo', date: '2024-07-26', status: 'Pending QA' },
    { id: 'DL-004', sensorId: 'P-VIB-005', team: 'Bravo', date: '2024-07-27', status: 'In Progress' },
];

const ImplementationView: React.FC = () => {
    const deployedCount = SENSORS.length * 0.45; // Mock progress
    const totalCount = SENSORS.length;
    const progressPercentage = (deployedCount / totalCount) * 100;

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Implementation Progress</h2>
            <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
                <p className="text-slate-300 mb-4">
                    Track the progress of sensor deployment and installation in the field.
                </p>
                 <div className="mb-4">
                    <div className="flex justify-between mb-1">
                        <span className="text-base font-medium text-cyan-400">Overall Progress</span>
                        <span className="text-sm font-medium text-cyan-400">{progressPercentage.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-4">
                        <div className="bg-cyan-500 h-4 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                    </div>
                 </div>
                 <p className="text-sm text-slate-400 text-center mt-2">{deployedCount.toFixed(0)} of {totalCount} sensors deployed</p>
            </div>
             <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-white">Deployment Log</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-slate-400">
                        <thead className="text-xs text-slate-300 uppercase bg-slate-700/50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Log ID</th>
                                <th scope="col" className="px-6 py-3">Sensor ID</th>
                                <th scope="col" className="px-6 py-3">Team</th>
                                <th scope="col" className="px-6 py-3">Date</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {deploymentLog.map(log => (
                                <tr key={log.id} className="bg-slate-800 border-b border-slate-700 hover:bg-slate-700/50">
                                    <td className="px-6 py-4 font-medium text-white">{log.id}</td>
                                    <td className="px-6 py-4">{log.sensorId}</td>
                                    <td className="px-6 py-4">{log.team}</td>
                                    <td className="px-6 py-4">{log.date}</td>
                                    <td className="px-6 py-4">{log.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ImplementationView;