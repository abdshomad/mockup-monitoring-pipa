// --- Sensor & Data Reading Types ---

export enum SensorStatus {
  Online = 'Online',
  Offline = 'Offline',
  Alert = 'Alert',
}

export enum SensorType {
  VibrationPressure = 'Vibration & Pressure',
  Acoustic = 'Acoustic',
  Flowmeter = 'Flowmeter',
}

export interface Sensor {
  id: string;
  location: {
    lat: number;
    lng: number;
    segment: string;
  };
  status: SensorStatus;
  powerLevel: number; // Percentage
  lastSeen: string;
  vibration: number; // Current reading in G
  pressure: number; // Current reading in PSI
  type: SensorType;
}

export interface SensorHistoryEvent {
  timestamp: string; // ISO 8601 format string
  sensorId: string;
  status?: SensorStatus;
  powerLevel?: number;
  vibration?: number;
  pressure?: number;
}
