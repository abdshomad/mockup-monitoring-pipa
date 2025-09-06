

import React, { useState } from 'react';
import { ALERTS } from '../constants';
import { Alert, AlertSeverity, AlertWorkflowStage } from '../types';
import { getSeverityBadgeClass, getStageBadgeClass } from '../utils/badgeStyles';

const AlertsView: React.FC<{ setSelectedAlertId: (id: string | null) => void }> = ({ setSelectedAlertId }) => {
    const [stageFilter, setStageFilter] = useState<AlertWorkflowStage | null>(null);

    const filteredAlerts = ALERTS.filter(
        (alert) => !stageFilter || alert.stage === stageFilter
    );

    return (
        <div className="bg-slate-800 p-6 rounded-2xl shadow-lg animate-fade-in">
            <h3 className="text-xl font-semibold mb-6 text-white">Alerts Log</h3>

            <div className="flex flex-wrap gap-2 items-center mb-6">
                <span className="text-slate-400 font-medium mr-2">Filter by stage:</span>
                <button
                    onClick={() => setStageFilter(null)}
                    className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors duration-200 ${
                        stageFilter === null
                            ? 'bg-cyan-500 text-white shadow-md'
                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                >
                    All
                </button>
                {Object.values(AlertWorkflowStage).map(stage => (
                    <button
                        key={stage}
                        onClick={() => setStageFilter(stage)}
                        className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors duration-200 ${
                            stageFilter === stage
                                ? 'bg-cyan-500 text-white shadow-md'
                                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        }`}
                    >
                        {stage}
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
                            <th scope="col" className="px-6 py-3">Stage</th>
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
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStageBadgeClass(alert.stage)}`}>
                                            {alert.stage}
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
