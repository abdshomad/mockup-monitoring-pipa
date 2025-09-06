import React, { useState } from 'react';
import { ALERTS } from '../constants';
import { Alert, AlertSeverity, AlertStatus } from '../types';
import AlertDetailView from './AlertDetailView';

const AlertsView: React.FC = () => {
    const [selectedAlertId, setSelectedAlertId] = useState<string | null>(null);
    const [statusFilter, setStatusFilter] = useState<AlertStatus | null>(null);
    
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

    if (selectedAlertId) {
        const selectedAlert = ALERTS.find(a => a.id === selectedAlertId);
        return <AlertDetailView alert={selectedAlert} onBack={() => setSelectedAlertId(null)} />;
    }

    const filteredAlerts = ALERTS.filter(
        (alert) => !statusFilter || alert.status === statusFilter
    );

    return (
        <div className="bg-slate-800 p-6 rounded-2xl shadow-lg animate-fade-in">
            <h3 className="text-xl font-semibold mb-6 text-white">Alerts Log</h3>

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
                {Object.values(AlertStatus).map(status => (
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
                        {filteredAlerts.length > 0 ? (
                            filteredAlerts.map((alert) => (
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
                                        <button onClick={() => setSelectedAlertId(alert.id)} className="font-medium text-cyan-400 hover:underline">Details</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="text-center py-8 text-slate-400">
                                    No alerts match the current filter criteria.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AlertsView;