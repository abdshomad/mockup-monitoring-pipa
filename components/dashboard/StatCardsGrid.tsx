import React from 'react';
import StatCard from '../StatCard';
import { ICONS } from '../../constants';
import { View } from '../../types';

interface StatCardsGridProps {
    onlineSensors: number;
    totalSensors: number;
    activeAlerts: number;
    criticalAlerts: number;
    setCurrentView: (view: View) => void;
}

const StatCardsGrid: React.FC<StatCardsGridProps> = ({ onlineSensors, totalSensors, activeAlerts, criticalAlerts, setCurrentView }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="System Status" value="Operational" icon={ICONS.systemStatus}>
            <span className="text-sm font-medium text-green-400">All systems normal</span>
        </StatCard>
        <StatCard title="Total Sensors" value={totalSensors.toString()} icon={ICONS.totalSensors} onClick={() => setCurrentView('Sensors')}>
            <span className="text-sm font-medium text-slate-400">Across 3 segments</span>
        </StatCard>
        <StatCard title="Online Sensors" value={`${onlineSensors} / ${totalSensors}`} icon={ICONS.onlineSensors} onClick={() => setCurrentView('Sensors')}>
            <div className="w-full bg-slate-700 rounded-full h-1.5 mt-1">
                <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${(onlineSensors / totalSensors) * 100}%` }}></div>
            </div>
        </StatCard>
        <StatCard title="Active Alerts" value={activeAlerts.toString()} icon={ICONS.activeAlerts} onClick={() => setCurrentView('Alerts')}>
            <span className="text-sm font-medium text-red-400">{criticalAlerts} critical</span>
        </StatCard>
    </div>
);

export default StatCardsGrid;