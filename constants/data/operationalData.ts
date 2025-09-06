import { Sensor, Alert, SensorStatus, AlertSeverity, AlertStatus, SensorType, RunningAlert, RunningAlertStatus, MaintenanceTask, MaintenanceStatus, Asset, Technician } from '../../types';

export const SENSORS: Sensor[] = [
  { id: 'P-VIB-001', type: SensorType.VibrationPressure, location: { lat: 34.0522, lng: -118.2437, segment: 'Red Line' }, status: SensorStatus.Online, powerLevel: 92, lastSeen: '2024-07-31 10:00:00', vibration: 0.02, pressure: 502 },
  { id: 'P-VIB-002', type: SensorType.VibrationPressure, location: { lat: 34.0535, lng: -118.2465, segment: 'Interchange' }, status: SensorStatus.Alert, powerLevel: 88, lastSeen: '2024-07-31 10:00:05', vibration: 1.5, pressure: 480 },
  { id: 'P-VIB-003', type: SensorType.VibrationPressure, location: { lat: 34.0548, lng: -118.2493, segment: 'Red Line' }, status: SensorStatus.Online, powerLevel: 95, lastSeen: '2024-07-31 10:00:03', vibration: 0.03, pressure: 501 },
  { id: 'P-VIB-004', type: SensorType.Acoustic, location: { lat: 34.0561, lng: -118.2521, segment: 'Blue Line' }, status: SensorStatus.Offline, powerLevel: 15, lastSeen: '2024-07-31 08:30:10', vibration: 0, pressure: 0 },
  { id: 'P-VIB-005', type: SensorType.Acoustic, location: { lat: 34.0574, lng: -118.2549, segment: 'Blue Line' }, status: SensorStatus.Online, powerLevel: 76, lastSeen: '2024-07-31 10:00:01', vibration: 0.04, pressure: 499 },
  { id: 'P-VIB-006', type: SensorType.Flowmeter, location: { lat: 34.0587, lng: -118.2577, segment: 'Red Line' }, status: SensorStatus.Alert, powerLevel: 81, lastSeen: '2024-07-31 09:55:15', vibration: 0.8, pressure: 350 },
  { id: 'P-VIB-007', type: SensorType.Flowmeter, location: { lat: 34.0600, lng: -118.2605, segment: 'Green Line' }, status: SensorStatus.Online, powerLevel: 99, lastSeen: '2024-07-31 10:00:04', vibration: 0.02, pressure: 505 },
  { id: 'P-VIB-008', type: SensorType.Flowmeter, location: { lat: 34.0613, lng: -118.2633, segment: 'Green Line' }, status: SensorStatus.Online, powerLevel: 65, lastSeen: '2024-07-31 09:59:58', vibration: 0.05, pressure: 498 },
];

export const ALERTS: Alert[] = [
  { id: 'A-98721', timestamp: '2024-07-31 10:00:05', sensorId: 'P-VIB-002', type: 'Anomalous Vibration Detected', severity: AlertSeverity.Critical, status: AlertStatus.InProgress, location: { segment: 'Alpha-2' } },
  { id: 'A-98720', timestamp: '2024-07-31 09:55:15', sensorId: 'P-VIB-006', type: 'Sudden Pressure Drop', severity: AlertSeverity.High, status: AlertStatus.Acknowledged, location: { segment: 'Bravo-3' } },
  { id: 'A-98719', timestamp: '2024-07-31 09:45:30', sensorId: 'P-VIB-008', type: 'Low Power Warning', severity: AlertSeverity.Medium, status: AlertStatus.InProgress, location: { segment: 'Charlie-2' } },
  { id: 'A-98718', timestamp: '2024-07-30 14:12:00', sensorId: 'P-VIB-001', type: 'Minor Fluctuation', severity: AlertSeverity.Low, status: AlertStatus.Resolved, location: { segment: 'Alpha-1' } },
  { id: 'A-98717', timestamp: '2024-07-30 11:05:00', sensorId: 'P-VIB-005', type: 'Communication Timeout', severity: AlertSeverity.Medium, status: AlertStatus.Resolved, location: { segment: 'Bravo-2' } },
];

export const RUNNING_ALERTS: RunningAlert[] = [
    { id: 'RA-001', title: 'Potential Theft Activity', sensorId: 'P-VIB-002', startTime: '10:01 AM', status: RunningAlertStatus.PatrolDispatched, icon: 'security' },
    { id: 'RA-002', title: 'Pressure Anomaly', sensorId: 'P-VIB-006', startTime: '09:55 AM', status: RunningAlertStatus.Investigating, icon: 'investigating' },
    { id: 'RA-003', title: 'Low Power Warning', sensorId: 'P-VIB-008', startTime: '09:45 AM', status: RunningAlertStatus.Monitoring, icon: 'monitoring' },
];

export const MAINTENANCE_SCHEDULE: MaintenanceTask[] = [
  { id: 'M-001', sensorId: 'P-VIB-004', task: 'Battery Replacement & Full Diagnostic', scheduledDate: '2024-08-05', assignedTechnician: 'Alice Johnson', status: MaintenanceStatus.Scheduled },
  { id: 'M-002', sensorId: 'P-VIB-008', task: 'Routine Calibration Check', scheduledDate: '2024-08-02', assignedTechnician: 'Bob Williams', status: MaintenanceStatus.InProgress },
  { id: 'M-003', sensorId: 'P-VIB-005', task: 'Firmware Update v1.2.3', scheduledDate: '2024-07-29', assignedTechnician: 'Alice Johnson', status: MaintenanceStatus.Completed },
  { id: 'M-004', sensorId: 'P-VIB-002', task: 'Post-Alert Sensor Inspection', scheduledDate: '2024-08-03', assignedTechnician: 'Charlie Brown', status: MaintenanceStatus.Scheduled },
  { id: 'M-005', sensorId: 'P-VIB-006', task: 'Flowmeter Accuracy Verification', scheduledDate: '2024-07-30', assignedTechnician: 'Bob Williams', status: MaintenanceStatus.Completed },
];

export const ASSETS: Asset[] = SENSORS.map((sensor, index) => ({
  assetId: `ASSET-0${index + 1}`,
  sensorId: sensor.id,
  model: sensor.type === SensorType.Acoustic ? 'Acoustic-X2' : (sensor.type === SensorType.Flowmeter ? 'FlowMaster-5k' : 'VibraPress-Pro'),
  serialNumber: `SN-18${index}XYZ${index * 3}`,
  deploymentDate: `2023-0${Math.floor(index / 2) + 1}-15`,
  warrantyEndDate: `2026-0${Math.floor(index / 2) + 1}-15`,
  status: sensor.status === SensorStatus.Offline ? 'In Repair' : 'Active',
}));

export const TECHNICIANS: Technician[] = [
  { id: 'T-001', name: 'Alice Johnson', team: 'Alpha', stats: { tasksCompleted: 42, avgResponseTime: 4.2, successRate: 98 } },
  { id: 'T-002', name: 'Bob Williams', team: 'Bravo', stats: { tasksCompleted: 35, avgResponseTime: 5.1, successRate: 95 } },
  { id: 'T-003', name: 'Charlie Brown', team: 'Alpha', stats: { tasksCompleted: 38, avgResponseTime: 4.5, successRate: 97 } },
];
