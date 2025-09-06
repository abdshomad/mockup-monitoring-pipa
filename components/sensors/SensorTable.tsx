import React from 'react';
import { Sensor, SensorStatus, SensorType } from '../../types';
import { ALERTS, ICONS } from '../../constants';
import { calculateHealthScore, getHealthScoreColorClasses } from '../../utils/healthScore';

interface SensorTableProps {
    type: SensorType;
    sensors: Sensor[];
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

const getSensorTypeIcon = (type: SensorType) => {
    switch (type) {
        case SensorType.VibrationPressure: return ICONS.sensorVibrationPressure;
        case SensorType.Acoustic: return ICONS.sensorAcoustic;
        case SensorType.Flowmeter: return ICONS.sensorFlowmeter;
        default: return null;
    }
};

const SensorTable: React.FC<SensorTableProps> = ({ type, sensors, onSelectSensor }) => {
    return (
        <div className="bg-slate-800 p-6 rounded-2xl shadow-lg animate-fade-in">
            <div className="flex items-center mb-4">
                {getSensorTypeIcon(type)}
                <h3 className="text-xl font-semibold text-white ml-3">{type}</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-slate-400">
                    <thead className="text-xs text-slate-300 uppercase bg-slate-700/50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Sensor ID</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3">Health Score</th>
                            <th scope="col" className="px-6 py-3">Segment</th>
                            <th scope="col" className="px-6 py-3">Power Level</th>
                            <th scope="col" className="px-6 py-3">Vibration (G)</th>
                            <th scope="col" className="px-6 py-3">Pressure (PSI)</th>
                            <th scope="col" className="px-6 py-3">Last Seen</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sensors.map((sensor) => {
                            const healthScore = calculateHealthScore(sensor, ALERTS);
                            const { text: healthScoreColor } = getHealthScoreColorClasses(healthScore);
                            return (
                                <tr key={sensor.id} className="bg-slate-800 border-b border-slate-700 hover:bg-slate-700/50">
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
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SensorTable;
