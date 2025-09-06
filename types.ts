
export enum SensorStatus {
  Online = 'Online',
  Offline = 'Offline',
  Alert = 'Alert',
}

export enum AlertSeverity {
  Critical = 'Critical',
  High = 'High',
  Medium = 'Medium',
  Low = 'Low',
}

export enum AlertStatus {
  New = 'New',
  Acknowledged = 'Acknowledged',
  InProgress = 'In Progress',
  Resolved = 'Resolved',
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
}

export interface Alert {
  id: string;
  timestamp: string;
  sensorId: string;
  type: string;
  severity: AlertSeverity;
  status: AlertStatus;
  location: {
    segment: string;
  };
}

export interface ChartDataPoint {
  time: string;
  vibration: number;
  pressure: number;
}
