

import { Sensor, Alert, SensorStatus, AlertSeverity, AlertWorkflowStage, SensorType, RunningAlert, RunningAlertStatus, MaintenanceTask, MaintenanceStatus, Asset, Technician, AIInsight } from '../../types';

// --- TIME HELPER FUNCTIONS ---
const MOCK_CURRENT_DATE = new Date('2025-09-06T14:30:00Z');

const formatTimestamp = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
}

const getRelativeTimestamp = (offset: { days?: number, hours?: number, minutes?: number, seconds?: number }): string => {
    const now = new Date(MOCK_CURRENT_DATE);
    if (offset.days) now.setDate(now.getDate() + offset.days);
    if (offset.hours) now.setHours(now.getHours() + offset.hours);
    if (offset.minutes) now.setMinutes(now.getMinutes() + offset.minutes);
    if (offset.seconds) now.setSeconds(now.getSeconds() + offset.seconds);
    return formatTimestamp(now);
};

const getRelativeDate = (offset: { days?: number, months?: number, years?: number }): string => {
    const now = new Date(MOCK_CURRENT_DATE);
    if (offset.years) now.setFullYear(now.getFullYear() + offset.years);
    if (offset.months) now.setMonth(now.getMonth() + offset.months);
    if (offset.days) now.setDate(now.getDate() + offset.days);
    return formatDate(now);
};

// --- DYNAMIC DATE CONSTANTS ---

const alert1_triggerTime = new Date(MOCK_CURRENT_DATE.getTime() - 10 * 60 * 1000); // 10 minutes ago
const alert2_triggerTime = new Date(MOCK_CURRENT_DATE.getTime() - 25 * 60 * 1000); // 25 minutes ago
const alert3_triggerTime = new Date(MOCK_CURRENT_DATE.getTime() - 45 * 60 * 1000); // 45 minutes ago
const alert4_triggerTime = new Date(MOCK_CURRENT_DATE.getTime() - (24 * 60 * 60 * 1000 + 5*60*1000)); // 1 day and 5 mins ago
const alert5_triggerTime = new Date(MOCK_CURRENT_DATE.getTime() - (30 * 60 * 60 * 1000)); // 30 hours ago

// --- MOCK DATA ---

export const SENSORS: Sensor[] = [
  { id: 'P-VIB-001', type: SensorType.VibrationPressure, location: { lat: 34.0522, lng: -118.2437, segment: 'Red Line' }, status: SensorStatus.Online, powerLevel: 92, lastSeen: getRelativeTimestamp({ seconds: -5 }), vibration: 0.02, pressure: 502 },
  { id: 'P-VIB-002', type: SensorType.VibrationPressure, location: { lat: 34.0535, lng: -118.2465, segment: 'Interchange' }, status: SensorStatus.Alert, powerLevel: 88, lastSeen: getRelativeTimestamp({ seconds: 0 }), vibration: 1.5, pressure: 480 },
  { id: 'P-VIB-003', type: SensorType.VibrationPressure, location: { lat: 34.0548, lng: -118.2493, segment: 'Red Line' }, status: SensorStatus.Online, powerLevel: 95, lastSeen: getRelativeTimestamp({ seconds: -2 }), vibration: 0.03, pressure: 501 },
  { id: 'P-VIB-004', type: SensorType.Acoustic, location: { lat: 34.0561, lng: -118.2521, segment: 'Blue Line' }, status: SensorStatus.Offline, powerLevel: 15, lastSeen: getRelativeTimestamp({ hours: -1, minutes: -30 }), vibration: 0, pressure: 0 },
  { id: 'P-VIB-005', type: SensorType.Acoustic, location: { lat: 34.0574, lng: -118.2549, segment: 'Blue Line' }, status: SensorStatus.Online, powerLevel: 76, lastSeen: getRelativeTimestamp({ seconds: -4 }), vibration: 0.04, pressure: 499 },
  { id: 'P-VIB-006', type: SensorType.Flowmeter, location: { lat: 34.0587, lng: -118.2577, segment: 'Red Line' }, status: SensorStatus.Alert, powerLevel: 81, lastSeen: getRelativeTimestamp({ seconds: -1 }), vibration: 0.8, pressure: 350 },
  { id: 'P-VIB-007', type: SensorType.Flowmeter, location: { lat: 34.0600, lng: -118.2605, segment: 'Green Line' }, status: SensorStatus.Online, powerLevel: 99, lastSeen: getRelativeTimestamp({ seconds: -3 }), vibration: 0.02, pressure: 505 },
  { id: 'P-VIB-008', type: SensorType.Flowmeter, location: { lat: 34.0613, lng: -118.2633, segment: 'Green Line' }, status: SensorStatus.Online, powerLevel: 65, lastSeen: getRelativeTimestamp({ seconds: -7 }), vibration: 0.05, pressure: 498 },
];

export const ALERTS: Alert[] = [
  { 
    id: 'A-98721', 
    timestamp: formatTimestamp(alert1_triggerTime),
    sensorId: 'P-VIB-002', 
    type: 'Anomalous Vibration Detected', 
    severity: AlertSeverity.Critical, 
    stage: AlertWorkflowStage.Dispatched, 
    location: { segment: 'Alpha-2' },
    history: [
      { timestamp: formatTimestamp(alert1_triggerTime), action: 'Alert Triggered', operator: 'System' },
      { timestamp: formatTimestamp(new Date(alert1_triggerTime.getTime() + 5 * 1000)), action: 'Moved to Triage', operator: 'System' },
      { timestamp: formatTimestamp(new Date(alert1_triggerTime.getTime() + 65 * 1000)), action: 'AI Analysis Completed', operator: 'System' },
      { timestamp: formatTimestamp(new Date(alert1_triggerTime.getTime() + 120 * 1000)), action: 'Moved to Investigating', operator: 'Operator 1' },
      { timestamp: formatTimestamp(new Date(alert1_triggerTime.getTime() + 300 * 1000)), action: 'Moved to Dispatched', operator: 'Auto-Dispatch' },
    ]
  },
  { 
    id: 'A-98720', 
    timestamp: formatTimestamp(alert2_triggerTime),
    sensorId: 'P-VIB-006', 
    type: 'Sudden Pressure Drop', 
    severity: AlertSeverity.High, 
    stage: AlertWorkflowStage.Investigating, 
    location: { segment: 'Bravo-3' },
    history: [
      { timestamp: formatTimestamp(alert2_triggerTime), action: 'Alert Triggered', operator: 'System' },
      { timestamp: formatTimestamp(new Date(alert2_triggerTime.getTime() + 5 * 1000)), action: 'Moved to Triage', operator: 'System' },
      { timestamp: formatTimestamp(new Date(alert2_triggerTime.getTime() + 45 * 1000)), action: 'Moved to Investigating', operator: 'Operator 1' },
    ]
  },
  { 
    id: 'A-98719', 
    timestamp: formatTimestamp(alert3_triggerTime),
    sensorId: 'P-VIB-008', 
    type: 'Low Power Warning', 
    severity: AlertSeverity.Medium, 
    stage: AlertWorkflowStage.Triage, 
    location: { segment: 'Charlie-2' },
    history: [
      { timestamp: formatTimestamp(alert3_triggerTime), action: 'Alert Triggered', operator: 'System' },
      { timestamp: formatTimestamp(new Date(alert3_triggerTime.getTime() + 5 * 1000)), action: 'Moved to Triage', operator: 'System' },
    ]
  },
  { 
    id: 'A-98718', 
    timestamp: formatTimestamp(alert4_triggerTime),
    sensorId: 'P-VIB-001', 
    type: 'Minor Fluctuation', 
    severity: AlertSeverity.Low, 
    stage: AlertWorkflowStage.Resolved, 
    location: { segment: 'Alpha-1' },
    history: [
      { timestamp: formatTimestamp(alert4_triggerTime), action: 'Alert Triggered', operator: 'System' },
      { timestamp: formatTimestamp(new Date(alert4_triggerTime.getTime() + 5 * 1000)), action: 'Moved to Triage', operator: 'System' },
      { timestamp: formatTimestamp(new Date(alert4_triggerTime.getTime() + 60 * 1000)), action: 'Moved to Investigating', operator: 'Operator 2' },
      { timestamp: formatTimestamp(new Date(alert4_triggerTime.getTime() + 780 * 1000)), action: 'Moved to Resolved', operator: 'Operator 2' },
    ]
  },
  { 
    id: 'A-98717', 
    timestamp: formatTimestamp(alert5_triggerTime),
    sensorId: 'P-VIB-005', 
    type: 'Communication Timeout', 
    severity: AlertSeverity.Medium, 
    stage: AlertWorkflowStage.Resolved, 
    location: { segment: 'Bravo-2' },
    history: [
      { timestamp: formatTimestamp(alert5_triggerTime), action: 'Alert Triggered', operator: 'System' },
      { timestamp: formatTimestamp(new Date(alert5_triggerTime.getTime() + 5 * 1000)), action: 'Moved to Triage', operator: 'System' },
      { timestamp: formatTimestamp(new Date(alert5_triggerTime.getTime() + 60 * 1000)), action: 'Moved to Investigating', operator: 'Operator 1' },
      { timestamp: formatTimestamp(new Date(alert5_triggerTime.getTime() + 600 * 1000)), action: 'Moved to Resolving', operator: 'Tech Team' },
      { timestamp: formatTimestamp(new Date(alert5_triggerTime.getTime() + 1500 * 1000)), action: 'Moved to Resolved', operator: 'Tech Team' },
    ]
  },
];

export const RUNNING_ALERTS: RunningAlert[] = [
    { id: 'RA-001', title: 'Potential Theft Activity', sensorId: 'P-VIB-002', startTime: formatTime(alert1_triggerTime), status: RunningAlertStatus.PatrolDispatched, icon: 'security' },
    { id: 'RA-002', title: 'Pressure Anomaly', sensorId: 'P-VIB-006', startTime: formatTime(alert2_triggerTime), status: RunningAlertStatus.Investigating, icon: 'investigating' },
    { id: 'RA-003', title: 'Low Power Warning', sensorId: 'P-VIB-008', startTime: formatTime(alert3_triggerTime), status: RunningAlertStatus.Monitoring, icon: 'monitoring' },
];

export const MAINTENANCE_SCHEDULE: MaintenanceTask[] = [
  { id: 'M-001', sensorId: 'P-VIB-004', task: 'Battery Replacement & Full Diagnostic', scheduledDate: getRelativeDate({ days: 5 }), assignedTechnician: 'Alice Johnson', status: MaintenanceStatus.Scheduled },
  { id: 'M-002', sensorId: 'P-VIB-008', task: 'Routine Calibration Check', scheduledDate: getRelativeDate({ days: 2 }), assignedTechnician: 'Bob Williams', status: MaintenanceStatus.Scheduled },
  { id: 'M-003', sensorId: 'P-VIB-005', task: 'Firmware Update v1.2.3', scheduledDate: getRelativeDate({ days: -2 }), assignedTechnician: 'Alice Johnson', status: MaintenanceStatus.Completed },
  { id: 'M-004', sensorId: 'P-VIB-002', task: 'Post-Alert Sensor Inspection', scheduledDate: getRelativeDate({ days: 3 }), assignedTechnician: 'Charlie Brown', status: MaintenanceStatus.Scheduled },
  { id: 'M-005', sensorId: 'P-VIB-006', task: 'Flowmeter Accuracy Verification', scheduledDate: getRelativeDate({ days: -1 }), assignedTechnician: 'Bob Williams', status: MaintenanceStatus.Completed },
];

export const ASSETS: Asset[] = SENSORS.map((sensor, index) => ({
  assetId: `ASSET-0${index + 1}`,
  sensorId: sensor.id,
  model: sensor.type === SensorType.Acoustic ? 'Acoustic-X2' : (sensor.type === SensorType.Flowmeter ? 'FlowMaster-5k' : 'VibraPress-Pro'),
  serialNumber: `SN-18${index}XYZ${index * 3}`,
  deploymentDate: getRelativeDate({ years: -1, months: -(index % 6), days: -15 }),
  warrantyEndDate: getRelativeDate({ years: 2, months: -(index % 6), days: -15 }),
  status: sensor.status === SensorStatus.Offline ? 'In Repair' : 'Active',
}));

export const TECHNICIANS: Technician[] = [
  { id: 'T-001', name: 'Alice Johnson', team: 'Alpha', stats: { tasksCompleted: 42, avgResponseTime: 4.2, successRate: 98 } },
  { id: 'T-002', name: 'Bob Williams', team: 'Bravo', stats: { tasksCompleted: 35, avgResponseTime: 5.1, successRate: 95 } },
  { id: 'T-003', name: 'Charlie Brown', team: 'Alpha', stats: { tasksCompleted: 38, avgResponseTime: 4.5, successRate: 97 } },
];

export const AI_INSIGHTS: AIInsight[] = [
  {
    id: 'ai-1',
    category: 'Predictive Maintenance',
    title: 'Sensor P-VIB-008 Power Degradation',
    insight: 'Power level for P-VIB-008 is trending down 5% faster than model predictions. Recommend scheduling battery inspection within the next 14 days to prevent unplanned downtime.',
    icon: 'predictiveMaintenance',
  },
  {
    id: 'ai-2',
    category: 'Operational Efficiency',
    title: 'Pressure Stabilization Opportunity',
    insight: 'Minor pressure fluctuations in the Green Line correlate with pump station startups. Adjusting the ramp-up sequence could improve flow consistency by up to 3%.',
    icon: 'operationalEfficiency',
  },
  {
    id: 'ai-3',
    category: 'Risk Assessment',
    title: 'Increased Vibration in Interchange',
    insight: 'The recent alert on P-VIB-002 is part of a pattern of increased low-level vibration over the past 48 hours. This elevates the risk score for the Interchange segment by 15%.',
    icon: 'riskAssessment',
  },
];