
import React from 'react';
import { SENSORS, ALERTS, CHART_DATA, ICONS } from '../constants';
import { SensorStatus, AlertStatus } from '../types';
import StatCard from './StatCard';
import DataChart from './DataChart';

const Dashboard: React.FC = () => {
    const onlineSensors = SENSORS.filter(s => s.status === SensorStatus.Online).length;
    const activeAlerts = ALERTS.filter(a => a.status !== AlertStatus.Resolved).length;
    const recentAlerts = ALERTS.slice(0, 4);

    const getSeverityClass = (severity: string) => {
        switch (severity) {
            case 'Critical': return 'text-red-400';
            case 'High': return 'text-orange-400';
            case 'Medium': return 'text-yellow-400';
            default: return 'text-blue-400';
        }
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="System Status" value="Operational" icon={ICONS.systemStatus}>
                     <span className="text-sm font-medium text-green-400">All systems normal</span>
                </StatCard>
                <StatCard title="Total Sensors" value={SENSORS.length.toString()} icon={ICONS.totalSensors}>
                     <span className="text-sm font-medium text-slate-400">Across 3 segments</span>
                </StatCard>
                <StatCard title="Online Sensors" value={`${onlineSensors} / ${SENSORS.length}`} icon={ICONS.onlineSensors}>
                    <div className="w-full bg-slate-700 rounded-full h-1.5 mt-1">
                        <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${(onlineSensors/SENSORS.length)*100}%` }}></div>
                    </div>
                </StatCard>
                <StatCard title="Active Alerts" value={activeAlerts.toString()} icon={ICONS.activeAlerts}>
                    <span className="text-sm font-medium text-red-400">{ALERTS.filter(a => a.severity === "Critical").length} critical</span>
                </StatCard>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-slate-800 p-6 rounded-2xl shadow-lg">
                    <h3 className="text-xl font-semibold mb-4 text-white">Pipeline Digital Twin</h3>
                    <div className="aspect-video bg-slate-700 rounded-lg overflow-hidden relative">
                         <img src="https://i.imgur.com/8YvI0s5.png" alt="Pipeline Map" className="w-full h-full object-cover"/>
                         <div className="absolute top-1/4 left-1/3 animate-pulse">
                            <span className="relative flex h-4 w-4">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-slate-900"></span>
                            </span>
                         </div>
                    </div>
                </div>

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
            </div>

            <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
                 <h3 className="text-xl font-semibold mb-4 text-white">System-Wide Activity</h3>
                 <DataChart data={CHART_DATA} />
            </div>
        </div>
    );
};

export default Dashboard;
