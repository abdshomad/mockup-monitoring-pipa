import React from 'react';
import { Sensor, SensorType } from '../../types';
import { ICONS } from '../../constants';
import SensorTableRow from './SensorTableRow';

interface SensorTableProps {
    type: SensorType;
    sensors: Sensor[];
    onSelectSensor: (id: string) => void;
}

const getSensorTypeIcon = (type: SensorType) => {
    switch (type) {
        case SensorType.VibrationPressure: return ICONS.sensorVibrationPressure;
        case SensorType.Acoustic: return ICONS.sensorAcoustic;
        case SensorType.Flowmeter: return ICONS.sensorFlowmeter;
        default: return null;
    }
};

const SensorTable: React.FC<SensorTableProps> = ({ type, sensors, onSelectSensor }) => (
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
                    {sensors.map((sensor) => (
                        <SensorTableRow key={sensor.id} sensor={sensor} onSelectSensor={onSelectSensor} />
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

export default SensorTable;