import { AlertSeverity } from './alerts';

// --- Incident Types ---

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
  type?: 'log' | 'ai_brief';
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