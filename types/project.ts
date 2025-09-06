// --- Project Lifecycle Types ---

export enum ApprovalStatus {
  Approved = 'Approved',
  Pending = 'Pending',
  Submitted = 'Submitted',
  Rejected = 'Rejected',
}

export interface ApprovalHistoryEntry {
  timestamp: string;
  status: ApprovalStatus;
  notes: string;
  operator: string;
}

export interface ApprovalDocument {
  id: string;
  name: string;
  type: 'PDF' | 'Word' | 'Image';
  url: string; // a mock url
  uploadedAt: string;
}

export interface Approval {
  id: string;
  name: string;
  authority: string;
  status: ApprovalStatus;
  submitted: string;
  approved: string | null;
  history?: ApprovalHistoryEntry[];
  documents?: ApprovalDocument[];
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
