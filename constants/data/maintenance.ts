import { MaintenanceTask, MaintenanceStatus, Technician, TechnicianStatus } from '../../types';
import { getRelativeDate } from '../../utils/time';

export const MAINTENANCE_SCHEDULE: MaintenanceTask[] = [
  { id: 'M-009', sensorId: 'P-VIB-001', task: 'Quarterly Sensor Casing Inspection', scheduledDate: getRelativeDate({ days: -30 }), assignedTechnician: 'Alice Johnson', status: MaintenanceStatus.Completed },
  { id: 'M-007', sensorId: 'P-VIB-007', task: 'Solar Panel Cleaning', scheduledDate: getRelativeDate({ days: -10 }), assignedTechnician: 'Bob Williams', status: MaintenanceStatus.Completed },
  { id: 'M-003', sensorId: 'P-VIB-005', task: 'Firmware Update v1.2.3', scheduledDate: getRelativeDate({ days: -2 }), assignedTechnician: 'Alice Johnson', status: MaintenanceStatus.Completed },
  { id: 'M-005', sensorId: 'P-VIB-006', task: 'Flowmeter Accuracy Verification', scheduledDate: getRelativeDate({ days: -1 }), assignedTechnician: 'Bob Williams', status: MaintenanceStatus.Completed },
  { id: 'M-006', sensorId: 'P-VIB-001', task: 'Antenna Signal Test', scheduledDate: getRelativeDate({ days: 0 }), assignedTechnician: 'Alice Johnson', status: MaintenanceStatus.InProgress },
  { id: 'M-002', sensorId: 'P-VIB-008', task: 'Routine Calibration Check', scheduledDate: getRelativeDate({ days: 2 }), assignedTechnician: 'Bob Williams', status: MaintenanceStatus.Scheduled },
  { id: 'M-004', sensorId: 'P-VIB-002', task: 'Post-Alert Sensor Inspection', scheduledDate: getRelativeDate({ days: 3 }), assignedTechnician: 'Charlie Brown', status: MaintenanceStatus.Scheduled },
  { id: 'M-001', sensorId: 'P-VIB-004', task: 'Battery Replacement & Full Diagnostic', scheduledDate: getRelativeDate({ days: 5 }), assignedTechnician: 'Alice Johnson', status: MaintenanceStatus.Scheduled },
  { id: 'M-008', sensorId: 'P-VIB-003', task: 'Acoustic Membrane Check', scheduledDate: getRelativeDate({ days: 10 }), assignedTechnician: 'Charlie Brown', status: MaintenanceStatus.Scheduled },
];

export const TECHNICIANS: Technician[] = [
  { id: 'T-001', name: 'Alice Johnson', team: 'Alpha', availability: TechnicianStatus.Available, stats: { tasksCompleted: 42, avgResponseTime: 4.2, successRate: 98 } },
  { id: 'T-002', name: 'Bob Williams', team: 'Bravo', availability: TechnicianStatus.OnSite, stats: { tasksCompleted: 35, avgResponseTime: 5.1, successRate: 95 } },
  { id: 'T-003', name: 'Charlie Brown', team: 'Alpha', availability: TechnicianStatus.OffDuty, stats: { tasksCompleted: 38, avgResponseTime: 4.5, successRate: 97 } },
];
