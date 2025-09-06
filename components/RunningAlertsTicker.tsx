import React, { useState, useEffect } from 'react';
import { RunningAlert, RunningAlertStatus } from '../types';
import { ICONS } from '../constants';

interface RunningAlertsTickerProps {
    alerts: RunningAlert[];
}

const getStatusColor = (status: RunningAlertStatus) => {
    switch (status) {
        case RunningAlertStatus.PatrolDispatched: return 'text-red-400';
        case RunningAlertStatus.Investigating: return 'text-orange-400';
        case RunningAlertStatus.Monitoring: return 'text-yellow-400';
        default: return 'text-slate-400';
    }
}

const TickerItem: React.FC<{ alert: RunningAlert }> = ({ alert }) => {
    const icon = ICONS[alert.icon];
    const colorClass = getStatusColor(alert.status);

    return (
        <div className="flex items-center space-x-4 mx-2">
            <div className={`p-2 rounded-full bg-slate-700/50 ${colorClass}`}>
                {icon}
            </div>
            <div>
                <p className="font-semibold text-white">{alert.title} <span className="text-sm font-mono text-slate-400">({alert.sensorId})</span></p>
                <p className={`text-sm font-medium ${colorClass}`}>{alert.status} <span className="text-slate-500">since {alert.startTime}</span></p>
            </div>
        </div>
    );
};

const RunningAlertsTicker: React.FC<RunningAlertsTickerProps> = ({ alerts }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (alerts.length <= 1) return;

        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % alerts.length);
        }, 5000); // Change alert every 5 seconds

        return () => clearInterval(timer);
    }, [alerts.length]);

    if (alerts.length === 0) {
        return null;
    }

    const currentAlert = alerts[currentIndex];

    return (
        <div className="bg-slate-800 rounded-2xl p-4 overflow-hidden h-[88px] flex items-center">
             <div key={currentAlert.id} className="animate-fade-in">
                <TickerItem alert={currentAlert} />
             </div>
        </div>
    );
};

export default RunningAlertsTicker;