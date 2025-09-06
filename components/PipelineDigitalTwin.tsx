
import React, { useState, useMemo } from 'react';
import { Sensor, SensorStatus, AlertStatus, AlertSeverity } from '../types';
import { TRANSPORT_LINES, STATION_POSITIONS, ALERTS } from '../constants';

interface PipelineDigitalTwinProps {
    sensors: Sensor[];
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

const StationMarker: React.FC<{ sensor: Sensor; onHover: (sensor: Sensor | null) => void; }> = ({ sensor, onHover }) => {
    const position = STATION_POSITIONS[sensor.id];
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
}

const Tooltip: React.FC<{ sensor: Sensor }> = ({ sensor }) => {
    const position = STATION_POSITIONS[sensor.id];
    const tooltipWidth = 160;
    const tooltipHeight = 70;
    const xOffset = position.x > 550 ? -(tooltipWidth + 15) : 15;
    const yOffset = position.y > 200 ? -(tooltipHeight + 10) : 10;
    const statusColor = sensor.status === SensorStatus.Alert ? '#ef4444' : getConnectionStatusColor(sensor.status);

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

const Legend: React.FC = () => {
    return (
        <g transform="translate(20, 200)">
             <rect width="110" height={Object.keys(TRANSPORT_LINES).length * 20 + 15} rx="5" fill="rgba(15, 23, 42, 0.7)" />
            {Object.entries(TRANSPORT_LINES).map(([name, { color }], index) => (
                <g key={name} transform={`translate(10, ${index * 20 + 15})`}>
                    <rect y="-5" width="12" height="12" rx="3" fill={color} />
                    <text x="20" y="4" fill="#e2e8f0" fontSize="12">{name}</text>
                </g>
            ))}
        </g>
    );
};

const PipelineDigitalTwin: React.FC<PipelineDigitalTwinProps> = ({ sensors }) => {
    const [hoveredSensor, setHoveredSensor] = useState<Sensor | null>(null);

    const heatmapPoints = useMemo(() => {
        const activeAlerts = ALERTS.filter(alert => alert.status !== AlertStatus.Resolved);

        const alertsBySensor = activeAlerts.reduce((acc, alert) => {
            if (!acc[alert.sensorId]) {
                acc[alert.sensorId] = [];
            }
            acc[alert.sensorId].push(alert);
            return acc;
        }, {} as Record<string, typeof activeAlerts>);

        return Object.entries(alertsBySensor).map(([sensorId, alerts]) => {
            const position = STATION_POSITIONS[sensorId];
            if (!position) return null;

            const intensity = alerts.reduce((sum, alert) => {
                switch (alert.severity) {
                    case AlertSeverity.Critical: return sum + 3;
                    case AlertSeverity.High: return sum + 2;
                    case AlertSeverity.Medium: return sum + 1;
                    default: return sum;
                }
            }, 0);

            return {
                id: sensorId,
                x: position.x,
                y: position.y,
                intensity,
            };
        }).filter((p): p is { id: string; x: number; y: number; intensity: number; } => p !== null);

    }, []);

    return (
        <div className="w-full h-full bg-slate-700">
            <svg width="100%" height="100%" viewBox="0 0 700 300">
                <defs>
                    <filter id="heatmapBlur" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
                    </filter>
                </defs>

                {/* Transport Lines */}
                {Object.values(TRANSPORT_LINES).map((line, index) => (
                    <path
                        key={index}
                        d={line.path}
                        stroke={line.color}
                        strokeWidth="5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                ))}

                {/* Heatmap Layer */}
                <g filter="url(#heatmapBlur)" className="pointer-events-none">
                    {heatmapPoints.map(point => {
                        const radius = 15 + point.intensity * 8;
                        return (
                            <circle
                                key={`heat-${point.id}`}
                                cx={point.x}
                                cy={point.y}
                                r={radius}
                                fill="rgba(239, 68, 68, 0.6)" // Semi-transparent red
                            />
                        );
                    })}
                </g>

                {/* Station Markers */}
                {sensors.map(sensor => (
                    <StationMarker key={sensor.id} sensor={sensor} onHover={setHoveredSensor} />
                ))}

                {/* Legend */}
                <Legend />

                {/* Tooltip */}
                {hoveredSensor && <Tooltip sensor={hoveredSensor} />}
            </svg>
        </div>
    );
};

export default PipelineDigitalTwin;
