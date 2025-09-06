import { Sensor, SensorStatus, SensorType } from '../../types';
import { getRelativeTimestamp } from '../../utils/time';

export const SENSORS: Sensor[] = [
  { id: 'P-VIB-001', type: SensorType.VibrationPressure, location: { lat: 34.0522, lng: -118.2437, segment: 'Red Line' }, status: SensorStatus.Online, powerLevel: 92, lastSeen: getRelativeTimestamp({ seconds: -5 }), vibration: 0.02, pressure: 502 },
  { id: 'P-VIB-002', type: SensorType.VibrationPressure, location: { lat: 34.0535, lng: -118.2465, segment: 'Interchange' }, status: SensorStatus.Alert, powerLevel: 88, lastSeen: getRelativeTimestamp({ seconds: 0 }), vibration: 1.5, pressure: 480 },
  { id: 'P-VIB-003', type: SensorType.VibrationPressure, location: { lat: 34.0548, lng: -118.2493, segment: 'Red Line' }, status: SensorStatus.Online, powerLevel: 95, lastSeen: getRelativeTimestamp({ seconds: -2 }), vibration: 0.03, pressure: 501 },
  { id: 'P-VIB-004', type: SensorType.Acoustic, location: { lat: 34.0561, lng: -118.2521, segment: 'Blue Line' }, status: SensorStatus.Offline, powerLevel: 15, lastSeen: getRelativeTimestamp({ hours: -1, minutes: -30 }), vibration: 0, pressure: 0 },
  { id: 'P-VIB-005', type: SensorType.Acoustic, location: { lat: 34.0574, lng: -118.2549, segment: 'Blue Line' }, status: SensorStatus.Online, powerLevel: 76, lastSeen: getRelativeTimestamp({ seconds: -4 }), vibration: 0.04, pressure: 499 },
  { id: 'P-VIB-006', type: SensorType.Flowmeter, location: { lat: 34.0587, lng: -118.2577, segment: 'Red Line' }, status: SensorStatus.Alert, powerLevel: 81, lastSeen: getRelativeTimestamp({ seconds: -1 }), vibration: 0.8, pressure: 350 },
  { id: 'P-VIB-007', type: SensorType.Flowmeter, location: { lat: 34.0600, lng: -118.2605, segment: 'Green Line' }, status: SensorStatus.Online, powerLevel: 99, lastSeen: getRelativeTimestamp({ seconds: -3 }), vibration: 0.02, pressure: 505 },
  { id: 'P-VIB-008', type: SensorType.Flowmeter, location: { lat: 34.0613, lng: -118.2633, segment: 'Green Line' }, status: SensorStatus.Online, powerLevel: 65, lastSeen: getRelativeTimestamp({ seconds: -7 }), vibration: 0.05, pressure: 498 },
];
