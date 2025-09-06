
import React from 'react';
import { Sensor, SensorStatus } from '../../types';
import { INDONESIA_MAP_POSITIONS } from '../../constants';

interface StationMarkerProps {
    sensor: Sensor;
    onHover: (sensor: Sensor | null) => void;
}

const getStatusIndicatorColor = (status: SensorStatus) => {
    switch(status) {
        case SensorStatus.Online: return '#22c55e'; // green-500
        case SensorStatus.Offline: return '#ef4444'; // red-500
        case SensorStatus.Alert: return '#f59e0b'; // amber-500
        default: return '#64748b'; // slate-500
    }
};

const StationMarker: React.FC<StationMarkerProps> = ({ sensor, onHover }) => {
    const position = INDONESIA_MAP_POSITIONS[sensor.id];
    if (!position) return null;
    
    const mainMarkerFill = '#475569'; // slate-600
    const mainMarkerStroke = '#1e293b'; // slate-800
    
    const statusColor = getStatusIndicatorColor(sensor.status);
    const isAlert = sensor.status === SensorStatus.Alert;

    return (
        <g 
            transform={`translate(${position.x}, ${position.y})`}
            onMouseEnter={() => onHover(sensor)}
            onMouseLeave={() => onHover(null)}
            className="cursor-pointer"
        >
            {isAlert && (
                <circle r={8} fill={statusColor}>
                    <animate attributeName="r" from="8" to="25" dur="1.2s" begin="0s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.6" to="0" dur="1.2s" begin="0s" repeatCount="indefinite" />
                </circle>
            )}
             {/* Main sensor station marker */}
             <circle r={6} fill={mainMarkerFill} stroke={mainMarkerStroke} strokeWidth="2" />
             
             {/* Status indicator dot */}
             <circle 
                cx="5" 
                cy="-5" 
                r="3.5" 
                fill={statusColor} 
                stroke={mainMarkerStroke} 
                strokeWidth="1.5" 
             />
        </g>
    );
};

export default StationMarker;
