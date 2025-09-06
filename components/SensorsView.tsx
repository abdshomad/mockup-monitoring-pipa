import React, { useState } from 'react';
import { SENSORS } from '../constants';
import { Sensor, SensorStatus, SensorType } from '../types';
import SensorDetailView from './SensorDetailView';
import SensorFilterControls from './sensors/SensorFilterControls';
import SensorTable from './sensors/SensorTable';

interface SensorsViewProps {
    sensorFilter: SensorType | null;
}

const SensorsView: React.FC<SensorsViewProps> = ({ sensorFilter }) => {
    const [selectedSensorId, setSelectedSensorId] = useState<string | null>(null);
    const [statusFilter, setStatusFilter] = useState<SensorStatus | null>(null);

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

            <SensorFilterControls statusFilter={statusFilter} onFilterChange={setStatusFilter} />

            <div className="space-y-8">
                {filteredSensorsExist ? (
                    displayedSensorTypes.map(type => {
                        let sensors = groupedSensors[type] || [];
                        if (statusFilter) {
                            sensors = sensors.filter(sensor => sensor.status === statusFilter);
                        }
                        if (sensors.length === 0) return null;

                        return <SensorTable key={type} type={type} sensors={sensors} onSelectSensor={setSelectedSensorId} />;
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
