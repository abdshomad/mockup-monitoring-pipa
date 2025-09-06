
import React from 'react';
import { ALERTS } from '../constants';
import { AlertSeverity, AlertStatus } from '../types';

const AlertsView: React.FC = () => {
    
    const getSeverityBadgeClass = (severity: AlertSeverity) => {
        switch (severity) {
            case AlertSeverity.Critical: return 'bg-red-500/20 text-red-400';
            case AlertSeverity.High: return 'bg-orange-500/20 text-orange-400';
            case AlertSeverity.Medium: return 'bg-yellow-500/20 text-yellow-400';
            case AlertSeverity.Low: return 'bg-blue-500/20 text-blue-400';
            default: return 'bg-slate-500/20 text-slate-400';
        }
    };
    
    const getStatusBadgeClass = (status: AlertStatus) => {
        switch (status) {
            case AlertStatus.New: return 'bg-cyan-500/20 text-cyan-400';
            case AlertStatus.Acknowledged: return 'bg-purple-500/20 text-purple-400';
            case AlertStatus.InProgress: return 'bg-indigo-500/20 text-indigo-400';
            case AlertStatus.Resolved: return 'bg-green-500/20 text-green-400';
            default: return 'bg-slate-500/20 text-slate-400';
        }
    };

    return (
        <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold mb-6 text-white">Alerts Log</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-slate-400">
                    <thead className="text-xs text-slate-300 uppercase bg-slate-700/50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Alert ID</th>
                            <th scope="col" className="px-6 py-3">Timestamp</th>
                            <th scope="col" className="px-6 py-3">Sensor ID</th>
                            <th scope="col" className="px-6 py-3">Type</th>
                            <th scope="col" className="px-6 py-3">Severity</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ALERTS.map((alert) => (
                            <tr key={alert.id} className="bg-slate-800 border-b border-slate-700 hover:bg-slate-700/50">
                                <td className="px-6 py-4 font-medium text-white">{alert.id}</td>
                                <td className="px-6 py-4">{alert.timestamp}</td>
                                <td className="px-6 py-4">{alert.sensorId}</td>
                                <td className="px-6 py-4">{alert.type}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getSeverityBadgeClass(alert.severity)}`}>
                                        {alert.severity}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeClass(alert.status)}`}>
                                        {alert.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <a href="#" className="font-medium text-cyan-400 hover:underline">Details</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AlertsView;
