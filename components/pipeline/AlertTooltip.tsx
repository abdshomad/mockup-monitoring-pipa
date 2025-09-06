
import React from 'react';
import { Alert, AlertSeverity } from '../../types';
import { INDONESIA_MAP_POSITIONS } from '../../constants';

interface AlertTooltipProps {
    alert: Alert;
}

const getSeverityColor = (severity: AlertSeverity) => {
    switch (severity) {
        case AlertSeverity.Critical: return '#ef4444';
        case AlertSeverity.High: return '#f97316';
        case AlertSeverity.Medium: return '#eab308';
        case AlertSeverity.Low: return '#3b82f6';
        default: return '#94a3b8';
    }
}

const AlertTooltip: React.FC<AlertTooltipProps> = ({ alert }) => {
    const position = INDONESIA_MAP_POSITIONS[alert.sensorId];
    if (!position) return null;

    const tooltipWidth = 200;
    const tooltipHeight = 90;
    const xOffset = position.x > 950 ? -(tooltipWidth + 20) : 20;
    const yOffset = position.y > 500 ? -(tooltipHeight) : 0;
    const severityColor = getSeverityColor(alert.severity);

    return (
        <g transform={`translate(${position.x + xOffset}, ${position.y + yOffset})`} className="pointer-events-none">
            <rect x="0" y="0" width={tooltipWidth} height={tooltipHeight} rx="8" fill="rgba(15, 23, 42, 0.9)" stroke="#475569" />
            <text x="12" y="22" fill="#e2e8f0" fontSize="13" fontWeight="bold">Alert: {alert.id}</text>
            <text x="12" y="42" fill="#cbd5e1" fontSize="12">{alert.type}</text>
            <text x="12" y="58" fill="#cbd5e1" fontSize="12">Severity: 
                <tspan fill={severityColor} fontWeight="bold"> {alert.severity}</tspan>
            </text>
            <text x="12" y="74" fill="#94a3b8" fontSize="11" fontFamily="monospace">{alert.timestamp}</text>
        </g>
    );
};

export default AlertTooltip;
