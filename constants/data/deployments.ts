import { SensorDeployment, DeploymentStatus, DeploymentEvent } from '../../types';
import { getRelativeTimestamp, getRelativeDate } from '../../utils/time';

export const SENSOR_DEPLOYMENTS: SensorDeployment[] = [
    {
        id: 'DEP-001',
        sensorId: 'P-VIB-001',
        assetId: 'ASSET-01',
        currentStatus: DeploymentStatus.Active,
        segment: 'Red Line',
        scheduledDate: getRelativeDate({ days: -10 }),
        assignedTeam: 'Alpha',
        history: [
            { timestamp: getRelativeTimestamp({ days: -12 }), status: DeploymentStatus.Planned, notes: 'Deployment scheduled.', operator: 'Project Manager' },
            { timestamp: getRelativeTimestamp({ days: -10 }), status: DeploymentStatus.AwaitingInstallation, notes: 'Asset assigned, ready for field team.', operator: 'System' },
            { timestamp: getRelativeTimestamp({ days: -8 }), status: DeploymentStatus.InProgress, notes: 'Team Alpha started installation.', operator: 'Alice Johnson' },
            { timestamp: getRelativeTimestamp({ days: -7 }), status: DeploymentStatus.PendingQA, notes: 'Installation complete. Awaiting QA check.', operator: 'Alice Johnson' },
            { timestamp: getRelativeTimestamp({ days: -6 }), status: DeploymentStatus.Active, notes: 'QA check passed (QA-001). Sensor is now online and active.', operator: 'System' },
        ]
    },
    {
        id: 'DEP-002',
        sensorId: 'P-VIB-002',
        assetId: 'ASSET-02',
        currentStatus: DeploymentStatus.Active,
        segment: 'Interchange',
        scheduledDate: getRelativeDate({ days: -9 }),
        assignedTeam: 'Bravo',
        history: [
            { timestamp: getRelativeTimestamp({ days: -11 }), status: DeploymentStatus.Planned, notes: 'Deployment scheduled.', operator: 'Project Manager' },
            { timestamp: getRelativeTimestamp({ days: -9 }), status: DeploymentStatus.InProgress, notes: 'Team Bravo started installation.', operator: 'Bob Williams' },
            { timestamp: getRelativeTimestamp({ days: -8 }), status: DeploymentStatus.PendingQA, notes: 'Installation complete. Awaiting QA check.', operator: 'Bob Williams' },
            { timestamp: getRelativeTimestamp({ days: -7 }), status: DeploymentStatus.Active, notes: 'QA check passed (QA-002). Sensor is now online and active.', operator: 'System' },
        ]
    },
    {
        id: 'DEP-003',
        sensorId: 'P-VIB-003',
        assetId: 'ASSET-03',
        currentStatus: DeploymentStatus.Active,
        segment: 'Red Line',
        scheduledDate: getRelativeDate({ days: -8 }),
        assignedTeam: 'Alpha',
        history: [
            { timestamp: getRelativeTimestamp({ days: -9 }), status: DeploymentStatus.Planned, notes: 'Deployment scheduled.', operator: 'Project Manager' },
            { timestamp: getRelativeTimestamp({ days: -5 }), status: DeploymentStatus.InProgress, notes: 'Team Alpha started installation.', operator: 'Alice Johnson' },
            { timestamp: getRelativeTimestamp({ days: -4 }), status: DeploymentStatus.PendingQA, notes: 'Installation complete. Awaiting QA check.', operator: 'Alice Johnson' },
            { timestamp: getRelativeTimestamp({ days: -3 }), status: DeploymentStatus.Active, notes: 'QA check passed (QA-003). Sensor is now online and active.', operator: 'System' },
        ]
    },
    {
        id: 'DEP-004',
        sensorId: 'P-VIB-004',
        assetId: 'ASSET-04',
        currentStatus: DeploymentStatus.PendingQA,
        segment: 'Blue Line',
        scheduledDate: getRelativeDate({ days: -4 }),
        assignedTeam: 'Bravo',
        history: [
            { timestamp: getRelativeTimestamp({ days: -5 }), status: DeploymentStatus.Planned, notes: 'Deployment scheduled.', operator: 'Project Manager' },
            { timestamp: getRelativeTimestamp({ days: -3 }), status: DeploymentStatus.InProgress, notes: 'Team Bravo started installation.', operator: 'Bob Williams' },
            { timestamp: getRelativeTimestamp({ days: -1 }), status: DeploymentStatus.PendingQA, notes: 'Installation complete. Awaiting QA check.', operator: 'Bob Williams' },
        ]
    },
    {
        id: 'DEP-005',
        sensorId: 'P-VIB-005',
        assetId: 'ASSET-05',
        currentStatus: DeploymentStatus.InProgress,
        segment: 'Blue Line',
        scheduledDate: getRelativeDate({ days: 0 }),
        assignedTeam: 'Alpha',
        history: [
            { timestamp: getRelativeTimestamp({ days: -2 }), status: DeploymentStatus.Planned, notes: 'Deployment scheduled.', operator: 'Project Manager' },
            { timestamp: getRelativeTimestamp({ days: 0, hours: -4 }), status: DeploymentStatus.InProgress, notes: 'Team Alpha is on-site and beginning installation.', operator: 'Alice Johnson' },
        ]
    },
    {
        id: 'DEP-006',
        sensorId: 'P-VIB-006',
        assetId: 'ASSET-06',
        currentStatus: DeploymentStatus.AwaitingInstallation,
        segment: 'Red Line',
        scheduledDate: getRelativeDate({ days: 2 }),
        assignedTeam: 'Bravo',
        history: [
            { timestamp: getRelativeTimestamp({ days: -1 }), status: DeploymentStatus.Planned, notes: 'Deployment scheduled. Asset allocated.', operator: 'Project Manager' },
            { timestamp: getRelativeTimestamp({ days: 0 }), status: DeploymentStatus.AwaitingInstallation, notes: 'Asset has been dispatched to field team.', operator: 'Logistics' },
        ]
    },
    {
        id: 'DEP-007',
        sensorId: 'P-VIB-007',
        assetId: 'ASSET-07',
        currentStatus: DeploymentStatus.Planned,
        segment: 'Green Line',
        scheduledDate: getRelativeDate({ days: 7 }),
        assignedTeam: 'Alpha',
        history: [
            { timestamp: getRelativeTimestamp({ days: 0 }), status: DeploymentStatus.Planned, notes: 'Deployment added to schedule for next week.', operator: 'Project Manager' },
        ]
    },
    {
        id: 'DEP-008',
        sensorId: 'P-VIB-008',
        assetId: 'ASSET-08',
        currentStatus: DeploymentStatus.Planned,
        segment: 'Green Line',
        scheduledDate: getRelativeDate({ days: 8 }),
        assignedTeam: 'Bravo',
        history: [
            { timestamp: getRelativeTimestamp({ days: 0 }), status: DeploymentStatus.Planned, notes: 'Deployment added to schedule for next week.', operator: 'Project Manager' },
        ]
    }
];
