
import { Sensor, SensorStatus, Alert, AlertWorkflowStage, AlertSeverity } from '../types';

/**
 * Calculates a health score for a sensor based on its status, power, readings, and associated alerts.
 * @param sensor - The sensor object.
 * @param alerts - A list of all system alerts.
 * @returns A health score from 0 to 100.
 */
export const calculateHealthScore = (sensor: Sensor, alerts: Alert[]): number => {
    if (sensor.status === SensorStatus.Offline) {
        return 0;
    }

    let score = 100;

    // Power level penalty (up to -20 points)
    if (sensor.powerLevel < 70) {
        score -= (70 - sensor.powerLevel) * 0.4;
    }

    // Vibration penalty (up to -30 points)
    if (sensor.vibration > 1.0) {
        score -= 30;
    } else if (sensor.vibration > 0.5) {
        score -= 15;
    }

    // Pressure penalty (up to -30 points)
    if (sensor.pressure < 400) {
        score -= 30;
    } else if (sensor.pressure < 450) {
        score -= 15;
    }

    // Alerts penalty for unresolved alerts linked to this sensor
    const sensorAlerts = alerts.filter(a => a.sensorId === sensor.id && a.stage !== AlertWorkflowStage.Resolved);
    sensorAlerts.forEach(alert => {
        switch (alert.severity) {
            case AlertSeverity.Critical:
                score -= 25; // Heavy penalty for critical unresolved issues
                break;
            case AlertSeverity.High:
                score -= 15;
                break;
            case AlertSeverity.Medium:
                score -= 5;
                break;
        }
    });

    return Math.max(0, Math.round(score));
};

/**
 * Provides Tailwind CSS classes and a description based on a health score.
 * @param score - The health score (0-100).
 * @returns An object with text color, background color, and a description.
 */
export const getHealthScoreColorClasses = (score: number): { text: string; bg: string; description: string } => {
    if (score > 70) {
        return { text: 'text-green-400', bg: 'bg-green-500', description: 'Excellent' };
    }
    if (score >= 40) {
        return { text: 'text-yellow-400', bg: 'bg-yellow-500', description: 'Fair' };
    }
    return { text: 'text-red-400', bg: 'bg-red-500', description: 'Poor' };
};