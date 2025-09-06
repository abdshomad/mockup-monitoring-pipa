import React from 'react';
import { Sensor, SensorStatus } from '../../types';

interface SensorStatusDetailsProps {
    sensor: Sensor;
}

const getStatusIndicatorClass = (status: SensorStatus) => {
    switch (status) {
        case SensorStatus.Online: return 'bg-green-500 text-green-100';
        case SensorStatus.Offline: return 'bg-red-500 text-red-100';
        case SensorStatus.Alert: return 'bg-red-500 text-red-100';
        default: return 'bg-slate-500 text-slate-100';
    }
};

const SensorStatusDetails: React.FC<SensorStatusDetailsProps> = ({ sensor }) => {
    const statusClass = getStatusIndicatorClass(sensor.status);
    
    return (
        <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
            <h3 className="font-semibold text-white mb-4">Current Status</h3>
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <span className="text-slate-400">Status</span>
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${statusClass}`}>{sensor.status}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-slate-400">Power Level</span>
                    <span className="font-mono text-white">{sensor.powerLevel}%</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-slate-400">Vibration</span>
                    <span className="font-mono text-white">{sensor.vibration.toFixed(2)} G</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-slate-400">Pressure</span>
                    <span className="font-mono text-white">{sensor.pressure} PSI</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-slate-400">Segment</span>
                    <span className="font-mono text-white">{sensor.location.segment}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-slate-400">Last Seen</span>
                    <span className="font-mono text-white">{sensor.lastSeen}</span>
                </div>
            </div>
        </div>
    );
};

export default SensorStatusDetails;