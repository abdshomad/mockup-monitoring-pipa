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
  predictedFailureDate?: string;
  mtbfHours?: number;
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