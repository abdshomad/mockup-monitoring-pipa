

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

export interface Asset {
  assetId: string;
  sensorId: string;
  model: string;
  serialNumber: string;
  deploymentDate: string;
  warrantyEndDate: string;
  status: 'Active' | 'In Repair' | 'Decommissioned';
}

export interface Technician {
  id: string;
  name: string;
  team: string;
  stats: {
    tasksCompleted: number;
    avgResponseTime: number; // in hours
    successRate: number; // percentage
  };
}

export enum ApprovalStatus {
  Approved = 'Approved',
  Pending = 'Pending',
  Submitted = 'Submitted',
  Rejected = 'Rejected',
}

export interface Approval {
  id: string;
  name: string;
  authority: string;
  status: ApprovalStatus;
  submitted: string;
  approved: string | null;
}

export interface QACheck {
  id: string;
  sensorId: string;
  checkType: string;
  result: 'Pass' | 'Fail';
  timestamp: string;
  notes: string;
}

export interface CommissioningTask {
  id: string;
  task: string;
  status: 'Completed' | 'In Progress' | 'Not Started';
  responsibleTeam: string;
}

export type View = 
  | 'Dashboard' 
  | 'Alerts' 
  | 'Sensors' 
  | 'Maintenance'
  | 'Map View'
  // Pre-Construction
  | 'Planning'
  | 'Site Survey'
  | 'Design'
  | 'Approvals'
  // Construction
  | 'Implementation'
  | 'Quality Assurance'
  | 'Commissioning'
  // Maintenance
  | 'Asset Management'
  // Reporting
  | 'System Health'
  | 'Alert History'
  | 'Technician Performance'
  // System
  | 'User Profile'
  | 'Notifications'
  | 'System Config';