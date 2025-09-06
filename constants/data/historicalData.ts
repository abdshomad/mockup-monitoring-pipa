import { Sensor, SensorStatus, SensorType, SensorHistoryEvent } from '../../types';

const MOCK_CURRENT_DATE = new Date('2025-09-06T14:30:00Z');

// This represents the state of sensors before any of the historical events occurred.
export const BASE_SENSORS: Sensor[] = [
    { id: 'P-VIB-001', type: SensorType.VibrationPressure, location: { lat: 34.0522, lng: -118.2437, segment: 'Red Line' }, status: SensorStatus.Online, powerLevel: 98, lastSeen: '', vibration: 0.02, pressure: 503 },
    { id: 'P-VIB-002', type: SensorType.VibrationPressure, location: { lat: 34.0535, lng: -118.2465, segment: 'Interchange' }, status: SensorStatus.Online, powerLevel: 90, lastSeen: '', vibration: 0.04, pressure: 500 },
    { id: 'P-VIB-003', type: SensorType.VibrationPressure, location: { lat: 34.0548, lng: -118.2493, segment: 'Red Line' }, status: SensorStatus.Online, powerLevel: 96, lastSeen: '', vibration: 0.03, pressure: 501 },
    { id: 'P-VIB-004', type: SensorType.Acoustic, location: { lat: 34.0561, lng: -118.2521, segment: 'Blue Line' }, status: SensorStatus.Online, powerLevel: 80, lastSeen: '', vibration: 0.01, pressure: 498 },
    { id: 'P-VIB-005', type: SensorType.Acoustic, location: { lat: 34.0574, lng: -118.2549, segment: 'Blue Line' }, status: SensorStatus.Online, powerLevel: 79, lastSeen: '', vibration: 0.04, pressure: 499 },
    { id: 'P-VIB-006', type: SensorType.Flowmeter, location: { lat: 34.0587, lng: -118.2577, segment: 'Red Line' }, status: SensorStatus.Online, powerLevel: 85, lastSeen: '', vibration: 0.03, pressure: 502 },
    { id: 'P-VIB-007', type: SensorType.Flowmeter, location: { lat: 34.0600, lng: -118.2605, segment: 'Green Line' }, status: SensorStatus.Online, powerLevel: 99, lastSeen: '', vibration: 0.02, pressure: 505 },
    { id: 'P-VIB-008', type: SensorType.Flowmeter, location: { lat: 34.0613, lng: -118.2633, segment: 'Green Line' }, status: SensorStatus.Online, powerLevel: 70, lastSeen: '', vibration: 0.05, pressure: 498 },
];


// Events corresponding to alerts
export const SENSOR_HISTORY: SensorHistoryEvent[] = [
    // P-VIB-001 -> Low Alert A-98718, triggered 1 day 5 mins ago, now resolved.
    {
        timestamp: '2025-09-05T14:25:00Z', // Trigger time
        sensorId: 'P-VIB-001',
        status: SensorStatus.Alert,
        vibration: 0.3, // Minor fluctuation
    },
    {
        timestamp: '2025-09-05T18:38:20Z', // Resolution time (from alert history)
        sensorId: 'P-VIB-001',
        status: SensorStatus.Online,
        vibration: 0.02,
    },
    // P-VIB-005 -> Medium Alert A-98717, triggered 30 hours ago, now resolved.
    {
        timestamp: '2025-09-05T08:30:00Z', // Trigger time
        sensorId: 'P-VIB-005',
        status: SensorStatus.Alert,
    },
    {
        timestamp: '2025-09-05T13:30:00Z', // Resolution time (from alert history)
        sensorId: 'P-VIB-005',
        status: SensorStatus.Online,
    },
    // P-VIB-004 -> Offline, happened 1.5 hours ago
    {
        timestamp: '2025-09-06T13:00:00Z', // Offline time
        sensorId: 'P-VIB-004',
        status: SensorStatus.Offline,
        powerLevel: 15,
        vibration: 0,
        pressure: 0,
    },
    // P-VIB-008 -> Medium Alert A-98719, triggered 45 mins ago (low power)
    {
        timestamp: '2025-09-06T13:45:00Z', // Same as alert trigger time
        sensorId: 'P-VIB-008',
        powerLevel: 65,
    },
    // P-VIB-006 -> High Alert A-98720, triggered 25 mins ago
    {
        timestamp: '2025-09-06T14:05:00Z', // Same as alert trigger time
        sensorId: 'P-VIB-006',
        status: SensorStatus.Alert,
        vibration: 0.8,
        pressure: 350,
    },
    // P-VIB-002 -> Critical Alert A-98721, triggered 10 mins ago
    {
        timestamp: '2025-09-06T14:20:00Z', // Same as alert trigger time
        sensorId: 'P-VIB-002',
        status: SensorStatus.Alert,
        vibration: 1.5,
        pressure: 480,
    },
].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()); // Sort chronologically
