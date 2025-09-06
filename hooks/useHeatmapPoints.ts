
import { useMemo } from 'react';
import { AlertSeverity } from '../types';
import { ALERTS, INDONESIA_MAP_POSITIONS } from '../constants';

export const useHeatmapPoints = (currentTime: Date) => {
    return useMemo(() => {
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
        }, {} as Record<string, any[]>);

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
};
