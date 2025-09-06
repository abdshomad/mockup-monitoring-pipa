
import React from 'react';
import { Sensor, SensorStatus } from '../../types';
import { INDONESIA_MAP_POSITIONS } from '../../constants';

interface TooltipProps {
    sensor: Sensor;
}

const getConnectionStatusColor = (status: SensorStatus) => {
    switch (status) {
        case SensorStatus.Online: return '#22c55e';
        case SensorStatus.Alert: return '#ef4444'; 
        case SensorStatus.Offline: return '#ef4444';
        default: return '#64748b';
    }
}

const Tooltip: React.FC<TooltipProps> = ({ sensor }) => {
    const position = INDONESIA_MAP_POSITIONS[sensor.id];
    if (!position) return null;

    const tooltipWidth = 180;
    const tooltipHeight = 140;
    const xOffset = position.x > 950 ? -(tooltipWidth + 15) : 15;
    const yOffset = position.y > 500 ? -(tooltipHeight + 10) : 10;
    const statusColor = getConnectionStatusColor(sensor.status);

    return (
        <g transform={`translate(${position.x + xOffset}, ${position.y + yOffset})`} className="pointer-events-none">
            <rect x="0" y="0" width={tooltipWidth} height={tooltipHeight} rx="8" fill="rgba(15, 23, 42, 0.9)" stroke="#475569" />
            <text x="12" y="22" fill="#e2e8f0" fontSize="13" fontWeight="bold">{sensor.id}</text>
            <text x="12" y="40" fill="#cbd5e1" fontSize="12">Line: 
                <tspan fontWeight="500"> {sensor.location.segment}</tspan>
            </text>
            <text x="12" y="58" fill="#cbd5e1" fontSize="12">Status: 
                <tspan fill={statusColor} fontWeight="500"> {sensor.status}</tspan>
            </text>
            
            <line x1="10" y1="72" x2={tooltipWidth - 10} y2="72" stroke="#475569" strokeWidth="0.5" />

            <text x="12" y="88" fill="#cbd5e1" fontSize="12">Pressure: 
                <tspan fontWeight="bold" fill="#fff" fontFamily="monospace"> {sensor.pressure} PSI</tspan>
            </text>
            <text x="12" y="106" fill="#cbd5e1" fontSize="12">Vibration: 
                <tspan fontWeight="bold" fill="#fff" fontFamily="monospace"> {sensor.vibration.toFixed(2)} G</tspan>
            </text>
            <text x="12" y="124" fill="#cbd5e1" fontSize="12">Power Level: 
                <tspan fontWeight="bold" fill="#fff" fontFamily="monospace"> {sensor.powerLevel}%</tspan>
            </text>

        </g>
    );
};

export default Tooltip;
