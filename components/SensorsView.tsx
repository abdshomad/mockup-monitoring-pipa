
import React from 'react';
import { SENSORS } from '../constants';
import { SensorStatus } from '../types';

const SensorsView: React.FC = () => {

    const getStatusIndicatorClass = (status: SensorStatus) => {
        switch (status) {
            case SensorStatus.Online: return 'text-green-400';
            case SensorStatus.Offline: return 'text-slate-500';
            case SensorStatus.Alert: return 'text-red-400';
            default: return 'text-slate-500';
        }
    };
    
    const getPowerLevelClass = (level: number) => {
        if (level > 70) return 'bg-green-500';
        if (level > 30) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    return (
        <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold mb-6 text-white">Sensor Network Status</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-slate-400">
                    <thead className="text-xs text-slate-300 uppercase bg-slate-700/50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Sensor ID</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3">Segment</th>
                            <th scope="col" className="px-6 py-3">Power Level</th>
                            <th scope="col" className="px-6 py-3">Vibration (G)</th>
                            <th scope="col" className="px-6 py-3">Pressure (PSI)</th>
                            <th scope="col" className="px-6 py-3">Last Seen</th>
                        </tr>
                    </thead>
                    <tbody>
                        {SENSORS.map((sensor) => (
                            <tr key={sensor.id} className="bg-slate-800 border-b border-slate-700 hover:bg-slate-700/50">
                                <td className="px-6 py-4 font-medium text-white">{sensor.id}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <div className={`h-2.5 w-2.5 rounded-full mr-2 ${getStatusIndicatorClass(sensor.status).replace('text-', 'bg-')}`}></div>
                                        <span className={getStatusIndicatorClass(sensor.status)}>{sensor.status}</span>
                                    </div>
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
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SensorsView;
