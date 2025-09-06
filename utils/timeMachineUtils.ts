import { Sensor, Alert, TimelineEvent } from '../types';
import { SENSOR_HISTORY, BASE_SENSORS, ALERTS } from '../constants';

export const MOCK_CURRENT_DATE = new Date('2025-09-06T14:30:00Z');
export const TIME_WINDOW_HOURS = 48;
const TIME_INCREMENT_MS = 1 * 60 * 1000; // 1 minute
const FAST_FORWARD_MULTIPLIER = 2;

export const calculateSensorsAtTime = (playbackTime: number): Sensor[] => {
    const sensorsMap = new Map<string, Sensor>(JSON.parse(JSON.stringify(BASE_SENSORS)).map((s: Sensor) => [s.id, s]));
    for (const event of SENSOR_HISTORY) {
        if (new Date(event.timestamp).getTime() <= playbackTime) {
            const sensor = sensorsMap.get(event.sensorId);
            if (sensor) {
                const { sensorId, ...updates } = event;
                sensorsMap.set(event.sensorId, { ...sensor, ...updates, lastSeen: event.timestamp });
            }
        } else {
            break;
        }
    }
    return Array.from(sensorsMap.values());
};

export const calculateAlertsAtTime = (playbackTime: number): Alert[] => {
    return ALERTS.filter(a => new Date(a.timestamp).getTime() <= playbackTime);
};

interface PlaybackStateParams {
    currentTime: number;
    endTime: number;
    events: TimelineEvent[];
    speed: number;
}

export const calculateNextPlaybackState = ({ currentTime, endTime, events, speed }: PlaybackStateParams) => {
    let effectiveSpeed = speed;
    const nextEvent = events.find(event => event.timestamp > currentTime);

    // If the next event is far away, speed up playback
    if (!nextEvent || nextEvent.timestamp > currentTime + 1 * 60 * 60 * 1000) {
        effectiveSpeed *= FAST_FORWARD_MULTIPLIER;
    }

    const nextTime = currentTime + (TIME_INCREMENT_MS * effectiveSpeed);
    const triggeredEvent = events.find(event => event.timestamp > currentTime && event.timestamp <= nextTime);

    return {
        nextTime: Math.min(nextTime, endTime),
        triggeredEventId: triggeredEvent?.id || null,
    };
};
