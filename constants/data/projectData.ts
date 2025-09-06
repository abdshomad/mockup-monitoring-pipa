import { Approval, ApprovalStatus, QACheck, CommissioningTask } from '../../types';

export const APPROVALS: Approval[] = [
    { id: 'APP-001', name: 'Environmental Impact Assessment', authority: 'Ministry of Environment', status: ApprovalStatus.Approved, submitted: '2024-05-10', approved: '2024-07-15' },
    { id: 'APP-002', name: 'Right-of-Way Permit', authority: 'National Land Authority', status: ApprovalStatus.Pending, submitted: '2024-06-20', approved: null },
    { id: 'APP-003', name: 'Telecom Spectrum License', authority: 'Communications Authority', status: ApprovalStatus.Submitted, submitted: '2024-07-22', approved: null },
    { id: 'APP-004', name: 'Construction Safety Plan', authority: 'Occupational Safety Board', status: ApprovalStatus.Rejected, submitted: '2024-07-01', approved: null },
];

export const QA_CHECKS: QACheck[] = [
    { id: 'QA-001', sensorId: 'P-VIB-001', checkType: 'Calibration', result: 'Pass', timestamp: '2024-07-28 10:00', notes: 'Within ±0.5% tolerance.' },
    { id: 'QA-002', sensorId: 'P-VIB-002', checkType: 'Signal Strength', result: 'Pass', timestamp: '2024-07-28 11:30', notes: '-65 dBm signal strength, excellent.' },
    { id: 'QA-003', sensorId: 'P-VIB-003', checkType: 'Physical Inspection', result: 'Pass', timestamp: '2024-07-29 09:00', notes: 'No signs of tampering or damage.' },
    { id: 'QA-004', sensorId: 'P-VIB-005', checkType: 'Calibration', result: 'Fail', timestamp: '2024-07-29 14:00', notes: 'Pressure reading off by 5%. Recalibration required.' },
];

export const COMMISSIONING_TASKS: CommissioningTask[] = [
    { id: 'CT-001', task: 'End-to-End Network Connectivity Test', status: 'Completed', responsibleTeam: 'Network Ops' },
    { id: 'CT-002', task: 'Data Integrity Verification (24-hour run)', status: 'In Progress', responsibleTeam: 'Data Analytics' },
    { id: 'CT-003', task: 'Alert Trigger Simulation (Theft & Leak)', status: 'In Progress', responsibleTeam: 'Field Ops' },
    { id: 'CT-004', task: 'User Acceptance Testing (UAT)', status: 'Not Started', responsibleTeam: 'Project Management' },
    { id: 'CT-005', task: 'System Handover & Documentation Sign-off', status: 'Not Started', responsibleTeam: 'Project Management' },
];
