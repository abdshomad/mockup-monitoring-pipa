// --- Core Application Types ---

export type View =
  | 'Dashboard'
  | 'Alerts'
  | 'Kanban View'
  | 'Incident Log'
  | 'Sensors'
  | 'Scheduled Maintenance'
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

export interface Attachment {
  type: 'image' | 'audio';
  data: string; // base64 encoded data URI
  mimeType: string;
  fileName: string;
  aiAnalysis?: string;
}


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


// --- Alert & Incident Types ---

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

export enum RunningAlertStatus {
    Investigating = 'Investigating',
    PatrolDispatched = 'Patrol Dispatched',
    Monitoring = 'Monitoring',
}

export interface RunningAlert {
    id: string;
    title: string;
    sensorId: string;
    startTime: string;
    status: RunningAlertStatus;
    icon: 'investigating' | 'security' | 'monitoring';
}

export enum IncidentStatus {
  Active = 'Active',
  Monitoring = 'Monitoring',
  Resolved = 'Resolved',
  PostMortem = 'Post-Mortem',
}

export interface IncidentLogEntry {
  timestamp: string;
  entry: string;
  operator: string;
  notes?: string;
}

export enum FollowUpTaskStatus {
  Open = 'Open',
  InProgress = 'In Progress',
  Completed = 'Completed',
}

export interface FollowUpTask {
  id: string;
  description: string;
  assignedTo: string; // Technician name
  dueDate: string; // YYYY-MM-DD
  status: FollowUpTaskStatus;
}


export interface Incident {
  id: string;
  title: string;
  status: IncidentStatus;
  severity: AlertSeverity;
  startTime: string;
  endTime: string | null;
  incidentCommander: string;
  summary: string;
  linkedAlertIds: string[];
  log: IncidentLogEntry[];
  followUpTasks?: FollowUpTask[];
}


// --- Maintenance & Asset Types ---

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

export interface Asset {
  assetId: string;
  sensorId: string;
  model: string;
  serialNumber: string;
  deploymentDate: string;
  warrantyEndDate: string;
  status: 'Active' | 'In Repair' | 'Decommissioned';
  imageUrl: string;
  firmwareVersion: string;
  technicalSpecifications: {
    operatingTemp: string;
    accuracy: {
      pressure: string;
      vibration: string;
    };
  };
  installationDetails: {
    installedBy: string; // Technician Name
    qaCheckId: string; // Link to a QA check
  };
  maintenanceHistory: MaintenanceTask[];
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


// --- Project Lifecycle Types ---

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

export enum DeploymentStatus {
    Planned = 'Planned',
    AwaitingInstallation = 'Awaiting Installation',
    InProgress = 'In Progress',
    PendingQA = 'Pending QA',
    Active = 'Active',
}

export interface DeploymentEvent {
    timestamp: string;
    status: DeploymentStatus;
    notes: string;
    operator: string;
}

export interface SensorDeployment {
    id: string;
    sensorId: string;
    assetId: string;
    currentStatus: DeploymentStatus;
    segment: string;
    scheduledDate: string;
    assignedTeam: string;
    history: DeploymentEvent[];
}


// --- AI & Charting Types ---

export interface AIInsight {
  id: string;
  category: 'Predictive Maintenance' | 'Operational Efficiency' | 'Risk Assessment';
  title: string;
  insight: string;
  icon: 'predictiveMaintenance' | 'operationalEfficiency' | 'riskAssessment';
}

export interface TimelineEvent {
  id: string;
  timestamp: number;
  description: string;
  severity: AlertSeverity;
  operator?: string;
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