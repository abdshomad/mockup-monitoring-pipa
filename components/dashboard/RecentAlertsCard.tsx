import React from 'react';
import { Alert } from '../../types';

interface RecentAlertsCardProps {
    recentAlerts: Alert[];
}

const getSeverityClass = (severity: string) => {
    switch (severity) {
        case 'Critical': return 'text-red-400';
        case 'High': return 'text-orange-400';
        case 'Medium': return 'text-yellow-400';
        default: return 'text-blue-400';
    }
};

const RecentAlertsCard: React.FC<RecentAlertsCardProps> = ({ recentAlerts }) => (
    <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-white">Recent Alerts</h3>
        <ul className="space-y-4">
            {recentAlerts.map(alert => (
                <li key={alert.id} className="flex items-start space-x-3">
                    <div className={`mt-1 flex-shrink-0 h-2.5 w-2.5 rounded-full ${getSeverityClass(alert.severity).replace('text-', 'bg-')}`}></div>
                    <div>
                        <p className="font-semibold text-slate-200">{alert.type}</p>
                        <p className="text-sm text-slate-400">Sensor {alert.sensorId} - {alert.location.segment}</p>
                    </div>
                </li>
            ))}
        </ul>
    </div>
);

export default RecentAlertsCard;
