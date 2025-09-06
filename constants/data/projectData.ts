import { Approval, ApprovalStatus, QACheck, CommissioningTask } from '../../types';

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

export const APPROVALS: Approval[] = [
    { id: 'APP-001', name: 'Environmental Impact Assessment', authority: 'Ministry of Environment', status: ApprovalStatus.Approved, submitted: getRelativeDate({ days: -80 }), approved: getRelativeDate({ days: -20 }) },
    { id: 'APP-002', name: 'Right-of-Way Permit', authority: 'National Land Authority', status: ApprovalStatus.Pending, submitted: getRelativeDate({ days: -40 }), approved: null },
    { id: 'APP-003', name: 'Telecom Spectrum License', authority: 'Communications Authority', status: ApprovalStatus.Submitted, submitted: getRelativeDate({ days: -10 }), approved: null },
    { id: 'APP-004', name: 'Construction Safety Plan', authority: 'Occupational Safety Board', status: ApprovalStatus.Rejected, submitted: getRelativeDate({ days: -30 }), approved: null },
];

export const QA_CHECKS: QACheck[] = [
    { id: 'QA-001', sensorId: 'P-VIB-001', checkType: 'Calibration', result: 'Pass', timestamp: getRelativeTimestamp({ days: -3, hours: -1 }), notes: 'Within ±0.5% tolerance.' },
    { id: 'QA-002', sensorId: 'P-VIB-002', checkType: 'Signal Strength', result: 'Pass', timestamp: getRelativeTimestamp({ days: -3, hours: 2 }), notes: '-65 dBm signal strength, excellent.' },
    { id: 'QA-003', sensorId: 'P-VIB-003', checkType: 'Physical Inspection', result: 'Pass', timestamp: getRelativeTimestamp({ days: -2, hours: -2 }), notes: 'No signs of tampering or damage.' },
    { id: 'QA-004', sensorId: 'P-VIB-005', checkType: 'Calibration', result: 'Fail', timestamp: getRelativeTimestamp({ days: -2, hours: 3 }), notes: 'Pressure reading off by 5%. Recalibration required.' },
];

export const COMMISSIONING_TASKS: CommissioningTask[] = [
    { id: 'CT-001', task: 'End-to-End Network Connectivity Test', status: 'Completed', responsibleTeam: 'Network Ops' },
    { id: 'CT-002', task: 'Data Integrity Verification (24-hour run)', status: 'In Progress', responsibleTeam: 'Data Analytics' },
    { id: 'CT-003', task: 'Alert Trigger Simulation (Theft & Leak)', status: 'In Progress', responsibleTeam: 'Field Ops' },
    { id: 'CT-004', task: 'User Acceptance Testing (UAT)', status: 'Not Started', responsibleTeam: 'Project Management' },
    { id: 'CT-005', task: 'System Handover & Documentation Sign-off', status: 'Not Started', responsibleTeam: 'Project Management' },
];