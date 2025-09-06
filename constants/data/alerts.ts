import { Alert, AlertSeverity, AlertWorkflowStage, RunningAlert, RunningAlertStatus } from '../../types';
// FIX: The 'formatTimestamp' function is not exported; 'getFormattedTimestamp' should be used instead.
import { getFormattedTimestamp, formatTime, MOCK_CURRENT_DATE } from '../../utils/time';
import { MOCK_IMAGE_BASE64_DATA_URI } from './media';

// --- DYNAMIC DATE CONSTANTS ---
const alert1_triggerTime = new Date(MOCK_CURRENT_DATE.getTime() - 10 * 60 * 1000); // 10 minutes ago
const alert2_triggerTime = new Date(MOCK_CURRENT_DATE.getTime() - 25 * 60 * 1000); // 25 minutes ago
const alert3_triggerTime = new Date(MOCK_CURRENT_DATE.getTime() - 45 * 60 * 1000); // 45 minutes ago
const alert4_triggerTime = new Date(MOCK_CURRENT_DATE.getTime() - (24 * 60 * 60 * 1000 + 5*60*1000)); // 1 day and 5 mins ago
const alert5_triggerTime = new Date(MOCK_CURRENT_DATE.getTime() - (30 * 60 * 60 * 1000)); // 30 hours ago


export const ALERTS: Alert[] = [
  { 
    id: 'A-98721', 
    timestamp: getFormattedTimestamp(alert1_triggerTime),
    sensorId: 'P-VIB-002', 
    type: 'Anomalous Vibration Detected', 
    severity: AlertSeverity.Critical, 
    stage: AlertWorkflowStage.Dispatched, 
    location: { segment: 'Alpha-2' },
    history: [
      { timestamp: getFormattedTimestamp(alert1_triggerTime), action: 'Alert Triggered', operator: 'System' },
      { timestamp: getFormattedTimestamp(new Date(alert1_triggerTime.getTime() + 5 * 1000)), action: 'Moved to Triage', operator: 'System' },
      { timestamp: getFormattedTimestamp(new Date(alert1_triggerTime.getTime() + 65 * 1000)), action: 'AI Analysis Completed', operator: 'System' },
      { timestamp: getFormattedTimestamp(new Date(alert1_triggerTime.getTime() + 120 * 1000)), action: 'Moved to Investigating', operator: 'Andi (Control Room)', notes: 'Correlating with upstream sensor data. No anomalies detected on adjacent sensors.' },
      { timestamp: getFormattedTimestamp(new Date(alert1_triggerTime.getTime() + 300 * 1000)), action: 'Moved to Dispatched', operator: 'Auto-Dispatch', notes: 'Patrol team Alpha-3 dispatched. ETA 15 minutes.' },
      {
        timestamp: getFormattedTimestamp(new Date(alert1_triggerTime.getTime() + 400 * 1000)),
        action: 'Field Observation',
        operator: 'Siti (Field Tech)',
        notes: 'Visual inspection confirms significant external corrosion at weld joint. Recommend immediate ultrasonic thickness testing.',
        attachment: {
            type: 'image',
            data: MOCK_IMAGE_BASE64_DATA_URI,
            mimeType: 'image/jpeg',
            fileName: 'pipe-corrosion.jpg'
        }
    }
    ]
  },
  { 
    id: 'A-98720', 
    timestamp: getFormattedTimestamp(alert2_triggerTime),
    sensorId: 'P-VIB-006', 
    type: 'Sudden Pressure Drop', 
    severity: AlertSeverity.High, 
    stage: AlertWorkflowStage.Investigating, 
    location: { segment: 'Bravo-3' },
    history: [
      { timestamp: getFormattedTimestamp(alert2_triggerTime), action: 'Alert Triggered', operator: 'System' },
      { timestamp: getFormattedTimestamp(new Date(alert2_triggerTime.getTime() + 5 * 1000)), action: 'Moved to Triage', operator: 'System' },
      { timestamp: getFormattedTimestamp(new Date(alert2_triggerTime.getTime() + 45 * 1000)), action: 'Moved to Investigating', operator: 'Andi (Control Room)' },
      { 
        timestamp: getFormattedTimestamp(new Date(alert2_triggerTime.getTime() + 300 * 1000)),
        action: 'Initial Assessment',
        operator: 'Budi (Control Room)',
        notes: 'Correlated pressure drop with upstream pump station E-12 shutdown for emergency maintenance. Monitoring for pressure stabilization. No leak suspected at this time.'
    }
    ]
  },
  { 
    id: 'A-98719', 
    timestamp: getFormattedTimestamp(alert3_triggerTime),
    sensorId: 'P-VIB-008', 
    type: 'Low Power Warning', 
    severity: AlertSeverity.Medium, 
    stage: AlertWorkflowStage.Triage, 
    location: { segment: 'Charlie-2' },
    history: [
      { timestamp: getFormattedTimestamp(alert3_triggerTime), action: 'Alert Triggered', operator: 'System' },
      { timestamp: getFormattedTimestamp(new Date(alert3_triggerTime.getTime() + 5 * 1000)), action: 'Moved to Triage', operator: 'System' },
    ]
  },
  { 
    id: 'A-98718', 
    timestamp: getFormattedTimestamp(alert4_triggerTime),
    sensorId: 'P-VIB-001', 
    type: 'Minor Fluctuation', 
    severity: AlertSeverity.Low, 
    stage: AlertWorkflowStage.Resolved, 
    location: { segment: 'Alpha-1' },
    history: [
      { timestamp: getFormattedTimestamp(alert4_triggerTime), action: 'Alert Triggered', operator: 'System' },
      { timestamp: getFormattedTimestamp(new Date(alert4_triggerTime.getTime() + 5 * 1000)), action: 'Moved to Triage', operator: 'System' },
      { timestamp: getFormattedTimestamp(new Date(alert4_triggerTime.getTime() + 60 * 1000)), action: 'Moved to Investigating', operator: 'Operator 2' },
      { timestamp: getFormattedTimestamp(new Date(alert4_triggerTime.getTime() + 780 * 1000)), action: 'Moved to Resolved', operator: 'Operator 2' },
    ]
  },
  { 
    id: 'A-98717', 
    timestamp: getFormattedTimestamp(alert5_triggerTime),
    sensorId: 'P-VIB-005', 
    type: 'Communication Timeout', 
    severity: AlertSeverity.Medium, 
    stage: AlertWorkflowStage.Resolved, 
    location: { segment: 'Bravo-2' },
    history: [
      { timestamp: getFormattedTimestamp(alert5_triggerTime), action: 'Alert Triggered', operator: 'System' },
      { timestamp: getFormattedTimestamp(new Date(alert5_triggerTime.getTime() + 5 * 1000)), action: 'Moved to Triage', operator: 'System' },
      { timestamp: getFormattedTimestamp(new Date(alert5_triggerTime.getTime() + 60 * 1000)), action: 'Moved to Investigating', operator: 'Operator 1' },
      { timestamp: getFormattedTimestamp(new Date(alert5_triggerTime.getTime() + 600 * 1000)), action: 'Moved to Resolving', operator: 'Tech Team' },
      { timestamp: getFormattedTimestamp(new Date(alert5_triggerTime.getTime() + 1500 * 1000)), action: 'Moved to Resolved', operator: 'Tech Team' },
    ]
  },
];

export const RUNNING_ALERTS: RunningAlert[] = [
    { id: 'RA-001', title: 'Potential Theft Activity', sensorId: 'P-VIB-002', startTime: formatTime(alert1_triggerTime), status: RunningAlertStatus.PatrolDispatched, icon: 'security' },
    { id: 'RA-002', title: 'Pressure Anomaly', sensorId: 'P-VIB-006', startTime: formatTime(alert2_triggerTime), status: RunningAlertStatus.Investigating, icon: 'investigating' },
    { id: 'RA-003', title: 'Low Power Warning', sensorId: 'P-VIB-008', startTime: formatTime(alert3_triggerTime), status: RunningAlertStatus.Monitoring, icon: 'monitoring' },
];
