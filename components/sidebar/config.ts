import { View } from '../../types';
import { ICONS } from '../../constants';

export const menuConfig = {
    preConstruction: ['Planning', 'Site Survey', 'Design', 'Approvals'] as View[],
    construction: ['Implementation', 'Quality Assurance', 'Commissioning'] as View[],
    operations: ['Dashboard', 'Alerts', 'Incident Log', 'Sensors', 'Map View'] as View[],
    maintenance: ['Scheduled Maintenance', 'Asset Management'] as View[],
    analysis: ['System Health', 'Alert History', 'Technician Performance'] as View[],
    system: ['User Profile', 'Notifications', 'System Config'] as View[],
};

export type SidebarItem = 
    | { type: 'header'; label: string }
    | { type: 'item'; view: View; icon: JSX.Element; }
    | { type: 'expandable'; label: string; icon: JSX.Element; views: View[]; menuKey: keyof typeof menuConfig; children: { view: View }[] }
    | { type: 'sensors' };

export const sidebarConfig: SidebarItem[] = [
    { type: 'item', view: 'Dashboard', icon: ICONS.dashboard },
    { type: 'header', label: 'Pre-Construction' },
    { type: 'expandable', label: 'Planning', icon: ICONS.preConstruction, views: menuConfig.preConstruction, menuKey: 'preConstruction', children: [{ view: 'Planning' }, { view: 'Site Survey' }, { view: 'Design' }, { view: 'Approvals' }] },
    { type: 'header', label: 'Construction' },
    { type: 'expandable', label: 'Implementation', icon: ICONS.construction, views: menuConfig.construction, menuKey: 'construction', children: [{ view: 'Implementation' }, { view: 'Quality Assurance' }, { view: 'Commissioning' }] },
    { type: 'header', label: 'Operations' },
    { type: 'item', view: 'Alerts', icon: ICONS.alerts },
    { type: 'item', view: 'Incident Log', icon: ICONS.incidentLog },
    { type: 'sensors' },
    { type: 'item', view: 'Map View', icon: ICONS.map },
    { type: 'header', label: 'Maintenance' },
    { type: 'expandable', label: 'Maintenance', icon: ICONS.maintenance, views: menuConfig.maintenance, menuKey: 'maintenance', children: [{ view: 'Scheduled Maintenance' }, { view: 'Asset Management' }] },
    { type: 'header', label: 'Analysis & Reporting' },
    { type: 'expandable', label: 'Reporting', icon: ICONS.reporting, views: menuConfig.analysis, menuKey: 'analysis', children: [{ view: 'System Health' }, { view: 'Alert History' }, { view: 'Technician Performance' }] },
    { type: 'header', label: 'System' },
    { type: 'expandable', label: 'Settings', icon: ICONS.settings, views: menuConfig.system, menuKey: 'system', children: [{ view: 'User Profile' }, { view: 'Notifications' }, { view: 'System Config' }] },
];
