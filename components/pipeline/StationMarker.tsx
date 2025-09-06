
import React from 'react';
import { Sensor, SensorStatus } from '../../types';
import { INDONESIA_MAP_POSITIONS } from '../../constants';

interface StationMarkerProps {
    sensor: Sensor;
    onHover: (sensor: Sensor | null) => void;
}

const getConnectionStatusColor = (status: SensorStatus) => {
    switch (status) {
        case SensorStatus.Online:
        case SensorStatus.Alert:
            return '#22c55e'; // green-500
        case SensorStatus.Offline:
            return '#ef4444'; // red-500
        default:
            return '#64748b';
    }
}

const StationMarker: React.FC<StationMarkerProps> = ({ sensor, onHover }) => {
    const position = INDONESIA_MAP_POSITIONS[sensor.id];
    if (!position) return null;
    
    const color = getConnectionStatusColor(sensor.status);
    const isAlert = sensor.status === SensorStatus.Alert;

    return (
        <g 
            transform={`translate(${position.x}, ${position.y})`}
            onMouseEnter={() => onHover(sensor)}
            onMouseLeave={() => onHover(null)}
            className="cursor-pointer"
        >
            {isAlert && (
                <circle r={8} fill="#ef4444">
                    <animate attributeName="r" from="8" to="25" dur="1.2s" begin="0s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.6" to="0" dur="1.2s" begin="0s" repeatCount="indefinite" />
                </circle>
            )}
             <circle r={isAlert ? 8 : 6} fill={color} stroke="#1e293b" strokeWidth="2" />
             {sensor.status === SensorStatus.Online && <circle r={3} fill="#fff" />}
        </g>
    )
};

export default StationMarker;