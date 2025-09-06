import { Incident, IncidentStatus, AlertSeverity, FollowUpTask, FollowUpTaskStatus } from '../../types';
import { getRelativeTimestamp, getRelativeDate } from '../../utils/time';

export const INCIDENTS: Incident[] = [
    {
        id: 'INC-2025-001',
        title: 'Suspected Third-Party Interference at Interchange',
        status: IncidentStatus.Active,
        severity: AlertSeverity.Critical,
        startTime: getRelativeTimestamp({ minutes: -10 }),
        endTime: null,
        incidentCommander: 'Andi (Control Room)',
        summary: 'A critical vibration alert was triggered, consistent with excavation activity. A security patrol has been dispatched and an incident command structure has been established to manage potential pipeline damage or theft.',
        linkedAlertIds: ['A-98721'],
        log: [
            { timestamp: getRelativeTimestamp({ minutes: -10 }), entry: 'Incident declared from critical alert A-98721.', operator: 'System', type: 'log' },
            { timestamp: getRelativeTimestamp({ minutes: -9 }), entry: 'Andi assigned as Incident Commander.', operator: 'System Admin', type: 'log' },
            { timestamp: getRelativeTimestamp({ minutes: -5 }), entry: 'Confirmed patrol dispatch (Alpha-3). Confirmed ETA is 15 minutes from incident start.', operator: 'Andi (Control Room)', type: 'log' },
            { timestamp: getRelativeTimestamp({ minutes: -2 }), entry: 'Notified local law enforcement of potential criminal activity.', operator: 'Andi (Control Room)', notes: 'Reference number LE-45921.', type: 'log' },
        ],
        followUpTasks: [
            { id: 'FUT-001', description: 'Conduct ultrasonic thickness testing on affected pipe section.', assignedTo: 'Alice Johnson', dueDate: getRelativeDate({ days: 4 }), status: FollowUpTaskStatus.Open },
            { id: 'FUT-002', description: 'File preliminary report with local law enforcement.', assignedTo: 'Andi (Control Room)', dueDate: getRelativeDate({ days: 1 }), status: FollowUpTaskStatus.InProgress },
        ]
    },
    {
        id: 'INC-2025-002',
        title: 'Multi-Sensor Comms Blackout in Blue Line Segment',
        status: IncidentStatus.Resolved,
        severity: AlertSeverity.High,
        startTime: getRelativeTimestamp({ days: -2, hours: -4 }),
        endTime: getRelativeTimestamp({ days: -2, hours: 1 }),
        incidentCommander: 'Operator 1',
        summary: 'Multiple sensors in the Blue Line segment went offline simultaneously. Investigation revealed a localized network failure at a gateway due to a power surge. Service was restored after a remote reboot and hardware check.',
        linkedAlertIds: ['A-98717', 'A-98715' /* Fictional */],
        log: [
            { timestamp: getRelativeTimestamp({ days: -2, hours: -4 }), entry: 'Incident declared due to multiple communication timeout alerts.', operator: 'Operator 1', type: 'log' },
            { timestamp: getRelativeTimestamp({ days: -2, hours: -3, minutes: -30 }), entry: 'Network team engaged to investigate gateway BL-GW-02.', operator: 'Operator 1', type: 'log' },
            { timestamp: getRelativeTimestamp({ days: -2, hours: -1 }), entry: 'Network team confirmed power surge. Initiating remote reboot.', operator: 'Tech Team', type: 'log' },
            { timestamp: getRelativeTimestamp({ days: -2, hours: 0, minutes: 45 }), entry: 'Gateway BL-GW-02 back online. All linked sensors are reporting normally.', operator: 'Tech Team', type: 'log' },
            { timestamp: getRelativeTimestamp({ days: -2, hours: 1 }), entry: 'Incident resolved. Root cause: power surge. Follow-up task created to install improved surge protection.', operator: 'Operator 1', type: 'log' },
        ],
        followUpTasks: [
             { id: 'FUT-003', description: 'Install improved surge protection on gateway BL-GW-02.', assignedTo: 'Bob Williams', dueDate: getRelativeDate({ days: 14 }), status: FollowUpTaskStatus.Open },
             { id: 'FUT-004', description: 'Complete and file post-mortem report.', assignedTo: 'Operator 1', dueDate: getRelativeDate({ days: 6 }), status: FollowUpTaskStatus.Completed },
        ]
    }
];