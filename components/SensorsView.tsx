
import React, { useState } from 'react';
import { SENSORS, ICONS, ALERTS } from '../constants';
import { Sensor, SensorStatus, SensorType } from '../types';
import SensorDetailView from './SensorDetailView';
import { calculateHealthScore, getHealthScoreColorClasses } from '../utils/healthScore';

interface SensorsViewProps {
    sensorFilter: SensorType | null;
}

const SensorsView: React.FC<SensorsViewProps> = ({ sensorFilter }) => {
    const [selectedSensorId, setSelectedSensorId] = useState<string | null>(null);
    const [statusFilter, setStatusFilter] = useState<SensorStatus | null>(null);

    const getConnectionIndicatorClass = (status: SensorStatus) => {
        switch (status) {
            case SensorStatus.Online:
                return 'bg-green-400';
            case SensorStatus.Alert:
                 return 'bg-yellow-400';
            case SensorStatus.Offline:
                return 'bg-red-400';
            default:
                return 'bg-slate-500';
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
    
    if (selectedSensorId) {
        return <SensorDetailView sensorId={selectedSensorId} onBack={() => setSelectedSensorId(null)} />;
    }

    const groupedSensors = SENSORS.reduce((acc, sensor) => {
        (acc[sensor.type] = acc[sensor.type] || []).push(sensor);
        return acc;
    }, {} as Record<SensorType, Sensor[]>);

    const sensorTypeOrder: SensorType[] = [
        SensorType.VibrationPressure,
        SensorType.Acoustic,
        SensorType.Flowmeter,
    ];

    const displayedSensorTypes = sensorFilter
        ? sensorTypeOrder.filter(type => type === sensorFilter)
        : sensorTypeOrder;
        
    const filteredSensorsExist = displayedSensorTypes.some(type => {
        const sensorsOfType = groupedSensors[type] || [];
        if (!statusFilter) {
            return sensorsOfType.length > 0;
        }
        return sensorsOfType.some(sensor => sensor.status === statusFilter);
    });

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">
                Sensor Network Status
                {sensorFilter && <span className="text-slate-400">: <span className="text-cyan-400">{sensorFilter}</span></span>}
            </h2>

            <div className="flex flex-wrap gap-2 items-center">
                <span className="text-slate-400 font-medium mr-2">Filter by status:</span>
                 <button
                    onClick={() => setStatusFilter(null)}
                    className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors duration-200 ${
                        statusFilter === null
                            ? 'bg-cyan-500 text-white shadow-md'
                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                >
                    All
                </button>
                {Object.values(SensorStatus).map(status => (
                    <button
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors duration-200 ${
                            statusFilter === status
                                ? 'bg-cyan-500 text-white shadow-md'
                                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        }`}
                    >
                        {status}
                    </button>
                ))}
            </div>

            <div className="space-y-8">
                {filteredSensorsExist ? (
                    displayedSensorTypes.map(type => {
                        let sensors = groupedSensors[type];
                        if (!sensors || sensors.length === 0) return null;

                        if (statusFilter) {
                            sensors = sensors.filter(sensor => sensor.status === statusFilter);
                        }
                        
                        if (sensors.length === 0) {
                            return null;
                        }

                        return (
                            <div key={type} className="bg-slate-800 p-6 rounded-2xl shadow-lg animate-fade-in">
                                <div className="flex items-center mb-4">
                                    {getSensorTypeIcon(type as SensorType)}
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
                                                            <span 
                                                                onClick={() => setSelectedSensorId(sensor.id)} 
                                                                className="text-cyan-400 hover:underline cursor-pointer"
                                                            >
                                                                {sensor.id}
                                                            </span>
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
                                                                    <div className={`h-2 rounded-full ${getPowerLevelClass(sensor.powerLevel)}`} style={{width: `${sensor.powerLevel}%`}}></div>
                                                                </div>
                                                                <span>{sensor.powerLevel}%</span>
                                                             </div>
                                                        </td>
                                                        <td className="px-6 py-4">{sensor.vibration.toFixed(2)}</td>
                                                        <td className="px-6 py-4">{sensor.pressure}</td>
                                                        <td className="px-6 py-4">{sensor.lastSeen}</td>
                                                        <td className="px-6 py-4">
                                                            <button 
                                                                onClick={() => setSelectedSensorId(sensor.id)} 
                                                                className="font-medium text-cyan-400 hover:underline"
                                                            >
                                                                View Details
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="bg-slate-800 p-10 rounded-2xl shadow-lg text-center animate-fade-in">
                        <p className="text-slate-400">No sensors match the current filter criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SensorsView;