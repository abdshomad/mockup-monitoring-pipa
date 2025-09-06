import { Attachment } from './shared';

// --- Alert Types ---

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
