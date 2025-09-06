import { Approval, ApprovalStatus, QACheck, CommissioningTask } from '../../types';
import { getRelativeTimestamp, getRelativeDate } from '../../utils/time';

export const APPROVALS: Approval[] = [
    { 
        id: 'APP-001', 
        name: 'Environmental Impact Assessment', 
        authority: 'Ministry of Environment', 
        status: ApprovalStatus.Approved, 
        submitted: getRelativeDate({ days: -80 }), 
        approved: getRelativeDate({ days: -20 }),
        history: [
            { timestamp: getRelativeTimestamp({ days: -80 }), status: ApprovalStatus.Submitted, notes: 'Initial submission package sent.', operator: 'Project Manager' },
            { timestamp: getRelativeTimestamp({ days: -50 }), status: ApprovalStatus.Pending, notes: 'Authority requested additional geological survey data.', operator: 'System' },
            { timestamp: getRelativeTimestamp({ days: -45 }), status: ApprovalStatus.Submitted, notes: 'Additional data submitted.', operator: 'Project Manager' },
            { timestamp: getRelativeTimestamp({ days: -20 }), status: ApprovalStatus.Approved, notes: 'Full approval granted with minor conditions.', operator: 'System' },
        ],
        documents: [
            { id: 'DOC-001', name: 'EIA_Submission_Package.pdf', type: 'PDF', url: '#', uploadedAt: getRelativeTimestamp({ days: -80 }) },
            { id: 'DOC-002', name: 'Geological_Survey_Addendum.pdf', type: 'PDF', url: '#', uploadedAt: getRelativeTimestamp({ days: -45 }) },
            { id: 'DOC-003', name: 'Final_Approval_Certificate.pdf', type: 'PDF', url: '#', uploadedAt: getRelativeTimestamp({ days: -20 }) },
        ]
    },
    { 
        id: 'APP-002', 
        name: 'Right-of-Way Permit', 
        authority: 'National Land Authority', 
        status: ApprovalStatus.Pending, 
        submitted: getRelativeDate({ days: -40 }), 
        approved: null,
        history: [
            { timestamp: getRelativeTimestamp({ days: -40 }), status: ApprovalStatus.Submitted, notes: 'Submitted for review.', operator: 'Project Manager' },
            { timestamp: getRelativeTimestamp({ days: -15 }), status: ApprovalStatus.Pending, notes: 'Currently under final review by the land authority committee.', operator: 'System' },
        ],
        documents: [
            { id: 'DOC-004', name: 'RightOfWay_Application.pdf', type: 'PDF', url: '#', uploadedAt: getRelativeTimestamp({ days: -40 }) },
        ]
    },
    { 
        id: 'APP-003', 
        name: 'Telecom Spectrum License', 
        authority: 'Communications Authority', 
        status: ApprovalStatus.Submitted, 
        submitted: getRelativeDate({ days: -10 }), 
        approved: null,
        history: [
            { timestamp: getRelativeTimestamp({ days: -10 }), status: ApprovalStatus.Submitted, notes: 'Application filed.', operator: 'Project Manager' },
        ],
        documents: []
    },
    { 
        id: 'APP-004', 
        name: 'Construction Safety Plan', 
        authority: 'Occupational Safety Board', 
        status: ApprovalStatus.Rejected, 
        submitted: getRelativeDate({ days: -30 }), 
        approved: null,
        history: [
            { timestamp: getRelativeTimestamp({ days: -30 }), status: ApprovalStatus.Submitted, notes: 'Safety plan submitted.', operator: 'Project Manager' },
            { timestamp: getRelativeTimestamp({ days: -5 }), status: ApprovalStatus.Rejected, notes: 'Plan rejected. Section 4.2 regarding on-site emergency response is insufficient. Resubmission required.', operator: 'System' },
        ],
        documents: [
            { id: 'DOC-005', name: 'Safety_Plan_v1.pdf', type: 'PDF', url: '#', uploadedAt: getRelativeTimestamp({ days: -30 }) },
            { id: 'DOC-006', name: 'Rejection_Notice.pdf', type: 'PDF', url: '#', uploadedAt: getRelativeTimestamp({ days: -5 }) },
        ]
    },
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
