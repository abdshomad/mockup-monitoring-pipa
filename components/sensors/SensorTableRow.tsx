import React from 'react';
import { Sensor, SensorStatus } from '../../types';
import { ALERTS } from '../../constants';
import { calculateHealthScore, getHealthScoreColorClasses } from '../../utils/healthScore';

interface SensorTableRowProps {
    sensor: Sensor;
    onSelectSensor: (id: string) => void;
}

const getConnectionIndicatorClass = (status: SensorStatus) => {
    switch (status) {
        case SensorStatus.Online: return 'bg-green-400';
        case SensorStatus.Alert: return 'bg-yellow-400';
        case SensorStatus.Offline: return 'bg-red-400';
        default: return 'bg-slate-500';
    }
};

const getStatusTextClass = (status: SensorStatus) => {
    switch (status) {
        case SensorStatus.Online: return 'text-green-400';
        case SensorStatus.Offline: return 'text-red-400';
        case SensorStatus.Alert: return 'text-yellow-400';
        default: return 'text-slate-500';
    }
};

const getPowerLevelClass = (level: number) => {
    if (level > 70) return 'bg-green-500';
    if (level > 30) return 'bg-yellow-500';
    return 'bg-red-500';
};

const SensorTableRow: React.FC<SensorTableRowProps> = ({ sensor, onSelectSensor }) => {
    const healthScore = calculateHealthScore(sensor, ALERTS);
    const { text: healthScoreColor } = getHealthScoreColorClasses(healthScore);

    return (
        <tr className="bg-slate-800 border-b border-slate-700 hover:bg-slate-700/50">
            <td className="px-6 py-4 font-medium text-white">
                <span onClick={() => onSelectSensor(sensor.id)} className="text-cyan-400 hover:underline cursor-pointer">{sensor.id}</span>
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center">
                    <div className={`h-2.5 w-2.5 rounded-full mr-2 ${getConnectionIndicatorClass(sensor.status)}`}></div>
                    <span className={getStatusTextClass(sensor.status)}>{sensor.status}</span>
                </div>
            </td>
            <td className="px-6 py-4">
                <span className={`font-semibold ${healthScoreColor}`}>{healthScore}</span>
            </td>
            <td className="px-6 py-4">{sensor.location.segment}</td>
            <td className="px-6 py-4">
                <div className="flex items-center">
                    <div className="w-20 bg-slate-700 rounded-full h-2 mr-2">
                        <div className={`h-2 rounded-full ${getPowerLevelClass(sensor.powerLevel)}`} style={{ width: `${sensor.powerLevel}%` }}></div>
                    </div>
                    <span>{sensor.powerLevel}%</span>
                </div>
            </td>
            <td className="px-6 py-4">{sensor.vibration.toFixed(2)}</td>
            <td className="px-6 py-4">{sensor.pressure}</td>
            <td className="px-6 py-4">{sensor.lastSeen}</td>
            <td className="px-6 py-4">
                <button onClick={() => onSelectSensor(sensor.id)} className="font-medium text-cyan-400 hover:underline">View Details</button>
            </td>
        </tr>
    );
};

export default SensorTableRow;