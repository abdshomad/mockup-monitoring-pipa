
import React, { useState, useMemo } from 'react';
// FIX: The 'AlertStatus' type is not exported; 'AlertWorkflowStage' should be used instead.
import { Sensor, AlertSeverity, AlertWorkflowStage } from '../types';
import { ALERTS, STATION_POSITIONS, TRANSPORT_LINES } from '../constants';
import StationMarker from './pipeline/StationMarker';
import Tooltip from './pipeline/Tooltip';
import Legend from './pipeline/Legend';

interface PipelineDigitalTwinProps {
    sensors: Sensor[];
}

const PipelineDigitalTwin: React.FC<PipelineDigitalTwinProps> = ({ sensors }) => {
    const [hoveredSensor, setHoveredSensor] = useState<Sensor | null>(null);

    const heatmapPoints = useMemo(() => {
        // FIX: The 'Alert' type does not have a 'status' property. Use 'stage' instead.
        const activeAlerts = ALERTS.filter(alert => alert.stage !== AlertWorkflowStage.Resolved);

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

                <g filter="url(#heatmapBlur)" className="pointer-events-none">
                    {heatmapPoints.map(point => {
                        const radius = 15 + point.intensity * 8;
                        return (
                            <circle
                                key={`heat-${point.id}`}
                                cx={point.x}
                                cy={point.y}
                                r={radius}
                                fill="rgba(239, 68, 68, 0.6)"
                            />
                        );
                    })}
                </g>

                {sensors.map(sensor => (
                    <StationMarker key={sensor.id} sensor={sensor} onHover={setHoveredSensor} />
                ))}

                <Legend />

                {hoveredSensor && <Tooltip sensor={hoveredSensor} />}
            </svg>
        </div>
    );
};

export default PipelineDigitalTwin;