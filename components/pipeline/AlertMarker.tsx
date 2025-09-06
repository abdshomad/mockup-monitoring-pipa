
import React from 'react';
import { Alert, AlertSeverity } from '../../types';
import { INDONESIA_MAP_POSITIONS } from '../../constants';

interface AlertMarkerProps {
    alert: Alert;
    onClick: (e: React.MouseEvent) => void;
}

const getSeverityColor = (severity: AlertSeverity) => {
    switch (severity) {
        case AlertSeverity.Critical: return '#ef4444'; // red-500
        case AlertSeverity.High: return '#f97316';     // orange-500
        case AlertSeverity.Medium: return '#eab308';   // yellow-500
        case AlertSeverity.Low: return '#3b82f6';      // blue-500
        default: return '#64748b';                     // slate-500
    }
};

const AlertMarker: React.FC<AlertMarkerProps> = ({ alert, onClick }) => {
    // A sensor might be decommissioned and not in the positions list anymore.
    const position = INDONESIA_MAP_POSITIONS[alert.sensorId];
    if (!position) return null;

    const color = getSeverityColor(alert.severity);

    return (
        <g
            transform={`translate(${position.x}, ${position.y})`}
            onClick={onClick}
            className="cursor-pointer group"
        >
            <path
                d="M0 -9 L9 0 L0 9 L-9 0 Z"
                fill={color}
                stroke="#1e293b"
                strokeWidth="2"
                className="transition-transform duration-200 group-hover:scale-125"
            />
        </g>
    );
};

export default AlertMarker;
