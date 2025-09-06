import React from 'react';
import { Alert } from '../../types';
import { getSeverityBadgeClass } from '../../utils/badgeStyles';

interface SensorRecentAlertsProps {
    alerts: Alert[];
}

const SensorRecentAlerts: React.FC<SensorRecentAlertsProps> = ({ alerts }) => {
    return (
        <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
            <h3 className="font-semibold text-white mb-4">Recent Alerts</h3>
            {alerts.length > 0 ? (
                <ul className="space-y-3">
                    {alerts.map(alert => (
                        <li key={alert.id} className="text-sm p-3 bg-slate-700/50 rounded-lg">
                            <div className="flex justify-between items-center">
                                <p className="text-slate-300">{alert.type}</p>
                                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${getSeverityBadgeClass(alert.severity)}`}>{alert.severity}</span>
                            </div>
                            <p className="text-xs text-slate-400 mt-1">{alert.timestamp}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-slate-400 py-4">No recent alerts for this sensor.</p>
            )}
        </div>
    );
};

export default SensorRecentAlerts;