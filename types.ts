














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

export enum AlertWorkflowStage {
  Triage = 'Triage',
  Investigating = 'Investigating',
  Dispatched = 'Dispatched',
  OnSite = 'On-Site',
  Resolving = 'Resolving',
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

export enum TechnicianStatus {
  Available = 'Available',
  OnSite = 'On Site',
  OffDuty = 'Off Duty',
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

export interface Attachment {
  type: 'image' | 'audio';
  data: string; // base64 encoded data URI
  mimeType: string;
  fileName: string;
  aiAnalysis?: string;
}


export interface AlertAction {
  timestamp: string;
  action: string;
  operator: string;
  notes?: string;
  attachment?: Attachment;
}

export interface Alert {
  id:string;
  timestamp: string;
  sensorId: string;
  type: string;
  severity: AlertSeverity;
  stage: AlertWorkflowStage;
  location: {
    segment: string;
  };
  history?: AlertAction[];
  resolutionNotes?: string;
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
  id:string;
  name: string;
  team: string;
  availability: TechnicianStatus;
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

export interface AIInsight {
  id: string;
  category: 'Predictive Maintenance' | 'Operational Efficiency' | 'Risk Assessment';
  title: string;
  insight: string;
  icon: 'predictiveMaintenance' | 'operationalEfficiency' | 'riskAssessment';
}

export interface SensorHistoryEvent {
  timestamp: string; // ISO 8601 format string
  sensorId: string;
  status?: SensorStatus;
  powerLevel?: number;
  vibration?: number;
  pressure?: number;
}

export interface TimelineEvent {
  id: string;
  timestamp: number;
  description: string;
  severity: AlertSeverity;
  operator?: string;
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