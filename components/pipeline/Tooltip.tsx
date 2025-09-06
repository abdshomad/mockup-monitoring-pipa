import React from 'react';
import { Sensor, SensorStatus } from '../../types';
import { STATION_POSITIONS } from '../../constants';

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
    const position = STATION_POSITIONS[sensor.id];
    const tooltipWidth = 160;
    const tooltipHeight = 70;
    const xOffset = position.x > 550 ? -(tooltipWidth + 15) : 15;
    const yOffset = position.y > 200 ? -(tooltipHeight + 10) : 10;
    const statusColor = getConnectionStatusColor(sensor.status);

    return (
        <g transform={`translate(${position.x + xOffset}, ${position.y + yOffset})`} className="pointer-events-none">
            <rect x="0" y="0" width={tooltipWidth} height={tooltipHeight} rx="8" fill="rgba(15, 23, 42, 0.9)" stroke="#475569" />
            <text x="12" y="22" fill="#e2e8f0" fontSize="13" fontWeight="bold">{sensor.id}</text>
            <text x="12" y="43" fill="#cbd5e1" fontSize="12">Line: 
                <tspan fontWeight="500"> {sensor.location.segment}</tspan>
            </text>
            <text x="12" y="59" fill="#cbd5e1" fontSize="12">Status: 
                <tspan fill={statusColor} fontWeight="500"> {sensor.status}</tspan>
            </text>
        </g>
    );
};

export default Tooltip;
