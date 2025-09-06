
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

export enum SensorType {
  VibrationPressure = 'Vibration & Pressure',
  Acoustic = 'Acoustic',
  Flowmeter = 'Flowmeter',
}

export enum RunningAlertStatus {
    Investigating = 'Investigating',
    PatrolDispatched = 'Patrol Dispatched',
    Monitoring = 'Monitoring',
}

export enum MaintenanceStatus {
  Scheduled = 'Scheduled',
  InProgress = 'In Progress',
  Completed = 'Completed',
}

export interface MaintenanceTask {
  id: string;
  sensorId: string;
  task: string;
  scheduledDate: string;
  assignedTechnician: string;
  status: MaintenanceStatus;
}


export interface RunningAlert {
    id: string;
    title: string;
    sensorId: string;
    startTime: string;
    status: RunningAlertStatus;
    icon: 'investigating' | 'security' | 'monitoring';
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

export interface PressureDataPoint {
  day: string;
  avg: number;
  range: [number, number];
}

export interface VibrationDataPoint {
  day: string;
  avg: number;
  max: number;
}

export interface AlertsTrendDataPoint {
  day: string;
  count: number;
}