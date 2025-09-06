
import React, { useState, useMemo } from 'react';
import { Sensor, AlertSeverity, Alert } from '../types';
import { ALERTS, INDONESIA_MAP_POSITIONS } from '../constants';
import StationMarker from './pipeline/StationMarker';
import Tooltip from './pipeline/Tooltip';
import IndonesiaMapSvg from './pipeline/IndonesiaMapSvg';

interface IndonesiaPipelineMapProps {
    sensors: Sensor[];
    currentTime: Date;
}

const IndonesiaPipelineMap: React.FC<IndonesiaPipelineMapProps> = ({ sensors, currentTime }) => {
    const [hoveredSensor, setHoveredSensor] = useState<Sensor | null>(null);

    const heatmapPoints = useMemo(() => {
        const activeAlerts = ALERTS.filter(alert => {
            const alertStartTime = new Date(alert.timestamp);
            if (alertStartTime > currentTime) {
                return false; // Alert hasn't happened yet
            }

            // Check if the alert has been resolved and if so, when.
            const resolvedAction = alert.history?.find(h => h.action.includes('Resolved'));
            if (resolvedAction) {
                const resolvedTime = new Date(resolvedAction.timestamp);
                if (resolvedTime <= currentTime) {
                    return false; // Alert was resolved at or before the playback time.
                }
            }
            
            return true; // Alert started and was not yet resolved at the playback time.
        });

        const alertsBySensor = activeAlerts.reduce((acc, alert) => {
            if (!acc[alert.sensorId]) {
                acc[alert.sensorId] = [];
            }
            acc[alert.sensorId].push(alert);
            return acc;
        }, {} as Record<string, Alert[]>);

        return Object.entries(alertsBySensor).map(([sensorId, alerts]) => {
            const position = INDONESIA_MAP_POSITIONS[sensorId];
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

    }, [currentTime]);

    return (
        <div className="relative w-full h-full bg-slate-700">
            <IndonesiaMapSvg />
            <svg width="100%" height="100%" viewBox="0 0 1195 625" className="absolute top-0 left-0">
                <defs>
                    <filter id="heatmapBlur" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
                    </filter>
                </defs>

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

                {hoveredSensor && <Tooltip sensor={hoveredSensor} />}
            </svg>
        </div>
    );
};

export default IndonesiaPipelineMap;