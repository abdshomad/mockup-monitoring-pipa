import React from 'react';
import { Alert } from '../../types';
import { getSeverityBadgeClass, getStageBadgeClass } from '../../utils/badgeStyles';

interface AlertsTableProps {
    alerts: Alert[];
    onSelectAlert: (id: string) => void;
}

const AlertsTable: React.FC<AlertsTableProps> = ({ alerts, onSelectAlert }) => (
    <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-slate-400">
            <thead className="text-xs text-slate-300 uppercase bg-slate-700/50">
                <tr>
                    <th scope="col" className="px-6 py-3">Alert ID</th>
                    <th scope="col" className="px-6 py-3">Timestamp</th>
                    <th scope="col" className="px-6 py-3">Sensor ID</th>
                    <th scope="col" className="px-6 py-3">Type</th>
                    <th scope="col" className="px-6 py-3">Severity</th>
                    <th scope="col" className="px-6 py-3">Stage</th>
                    <th scope="col" className="px-6 py-3">Actions</th>
                </tr>
            </thead>
            <tbody>
                {alerts.length > 0 ? (
                    alerts.map((alert) => (
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
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStageBadgeClass(alert.stage)}`}>
                                    {alert.stage}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <button onClick={() => onSelectAlert(alert.id)} className="font-medium text-cyan-400 hover:underline">Details</button>
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
);

export default AlertsTable;
