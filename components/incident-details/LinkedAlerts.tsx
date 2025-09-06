import React from 'react';
import { Alert } from '../../types';
import { getSeverityTextBadgeClass } from '../../utils/badgeStyles';

interface LinkedAlertsProps {
    alerts: Alert[];
}

const LinkedAlerts: React.FC<LinkedAlertsProps> = ({ alerts }) => (
    <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
        <h3 className="font-semibold text-white mb-4">Linked Alerts ({alerts.length})</h3>
        {alerts.length > 0 ? (
            <ul className="space-y-3">
                {alerts.map(alert => (
                    <li key={alert.id} className="text-sm p-3 bg-slate-700/50 rounded-lg">
                        <div className="flex justify-between items-center">
                            <p className="font-semibold text-cyan-400">{alert.id}</p>
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${getSeverityTextBadgeClass(alert.severity)}`}>{alert.severity}</span>
                        </div>
                        <p className="text-xs text-slate-300 mt-1">{alert.type}</p>
                    </li>
                ))}
            </ul>
        ) : (
            <p className="text-center text-slate-400 py-4">No alerts linked to this incident.</p>
        )}
    </div>
);

export default LinkedAlerts;
