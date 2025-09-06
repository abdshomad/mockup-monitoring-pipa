import React, { useState, useEffect } from 'react';
import { View } from '../types';
import { ICONS } from '../constants';
import { SensorType } from '../types';

interface SidebarProps {
  currentView: View;
  setCurrentView: (view: View, type?: SensorType | null) => void;
  sensorFilter: SensorType | null;
}

const NavItem: React.FC<{
  viewName: View;
  currentView: View;
  onClick: () => void;
  icon?: JSX.Element;
  isSubItem?: boolean;
}> = ({ viewName, icon, currentView, onClick, isSubItem = false }) => {
  const isActive = currentView === viewName;
  const baseClasses = `flex items-center my-1 rounded-lg cursor-pointer transition-colors duration-200`;
  const padding = isSubItem ? 'p-2' : 'p-3';
  const activeClasses = isSubItem
    ? 'bg-slate-700/50 text-cyan-400 font-semibold'
    : 'bg-cyan-500 text-white shadow-lg';
  const inactiveClasses = 'text-slate-400 hover:bg-slate-700 hover:text-white';

  return (
    <li
      onClick={onClick}
      className={`${baseClasses} ${padding} ${isActive ? activeClasses : inactiveClasses}`}
    >
      {icon && <span className="w-6 h-6">{icon}</span>}
      <span className={`ml-4 font-medium ${isSubItem ? 'text-sm' : ''}`}>{viewName}</span>
    </li>
  );
};

const ChevronIcon: React.FC<{ open: boolean }> = ({ open }) => (
    <svg className={`w-5 h-5 transition-transform duration-200 ${open ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
);

const getSensorTypeIcon = (type: SensorType) => {
    switch (type) {
        case SensorType.VibrationPressure: return ICONS.sensorVibrationPressure;
        case SensorType.Acoustic: return ICONS.sensorAcoustic;
        case SensorType.Flowmeter: return ICONS.sensorFlowmeter;
        default: return null;
    }
};

const ExpandableNavItem: React.FC<{
  label: string;
  icon: JSX.Element;
  views: View[];
  currentView: View;
  isOpen: boolean;
  toggle: () => void;
  children: React.ReactNode;
}> = ({ label, icon, views, currentView, isOpen, toggle, children }) => {
  const isActive = views.includes(currentView);
  return (
    <li>
      <div
        onClick={toggle}
        className={`flex items-center justify-between p-3 my-1 rounded-lg cursor-pointer transition-colors duration-200 ${
          isActive ? 'bg-cyan-500 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-700 hover:text-white'
        }`}
      >
        <div className="flex items-center">
          {icon}
          <span className="ml-4 font-medium">{label}</span>
        </div>
        <ChevronIcon open={isOpen} />
      </div>
      {isOpen && <ul className="pl-6 mt-1 space-y-1">{children}</ul>}
    </li>
  );
};

const menuConfig = {
    preConstruction: ['Planning', 'Site Survey', 'Design', 'Approvals'] as View[],
    construction: ['Implementation', 'Quality Assurance', 'Commissioning'] as View[],
    operations: ['Dashboard', 'Alerts', 'Sensors', 'Map View'] as View[],
    maintenance: ['Maintenance', 'Asset Management'] as View[],
    analysis: ['System Health', 'Alert History', 'Technician Performance'] as View[],
    system: ['User Profile', 'Notifications', 'System Config'] as View[],
};

type SidebarItem = 
    | { type: 'header'; label: string }
    | { type: 'item'; view: View; icon: JSX.Element; }
    | { type: 'expandable'; label: string; icon: JSX.Element; views: View[]; menuKey: keyof typeof menuConfig; children: { view: View }[] }
    | { type: 'sensors' };

const sidebarConfig: SidebarItem[] = [
    { type: 'item', view: 'Dashboard', icon: ICONS.dashboard },
    { type: 'header', label: 'Pre-Construction' },
    { type: 'expandable', label: 'Planning', icon: ICONS.preConstruction, views: menuConfig.preConstruction, menuKey: 'preConstruction', children: [{ view: 'Planning' }, { view: 'Site Survey' }, { view: 'Design' }, { view: 'Approvals' }] },
    { type: 'header', label: 'Construction' },
    { type: 'expandable', label: 'Implementation', icon: ICONS.construction, views: menuConfig.construction, menuKey: 'construction', children: [{ view: 'Implementation' }, { view: 'Quality Assurance' }, { view: 'Commissioning' }] },
    { type: 'header', label: 'Operations' },
    { type: 'item', view: 'Alerts', icon: ICONS.alerts },
    { type: 'sensors' },
    { type: 'item', view: 'Map View', icon: ICONS.map },
    { type: 'header', label: 'Maintenance' },
    { type: 'expandable', label: 'Maintenance', icon: ICONS.maintenance, views: menuConfig.maintenance, menuKey: 'maintenance', children: [{ view: 'Maintenance' }, { view: 'Asset Management' }] },
    { type: 'header', label: 'Analysis & Reporting' },
    { type: 'expandable', label: 'Reporting', icon: ICONS.reporting, views: menuConfig.analysis, menuKey: 'analysis', children: [{ view: 'System Health' }, { view: 'Alert History' }, { view: 'Technician Performance' }] },
    { type: 'header', label: 'System' },
    { type: 'expandable', label: 'Settings', icon: ICONS.settings, views: menuConfig.system, menuKey: 'system', children: [{ view: 'User Profile' }, { view: 'Notifications' }, { view: 'System Config' }] },
];

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, sensorFilter }) => {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = (menu: string) => {
    setOpenMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
  };
  
  useEffect(() => {
    const activeMenu = Object.keys(menuConfig).find(key => 
        menuConfig[key as keyof typeof menuConfig].includes(currentView)
    );
    if (activeMenu && !openMenus[activeMenu]) {
        setOpenMenus(prev => ({ ...prev, [activeMenu]: true }));
    }
  }, [currentView]);


  return (
    <aside className="w-64 flex-shrink-0 bg-slate-800 p-4 flex flex-col justify-between">
      <div>
        <div className="flex items-center mb-10">
           <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-9.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-9.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222 4 2.222V20" /></svg>
           </div>
          <h1 className="text-xl font-bold text-white ml-3">Pipeline Guard</h1>
        </div>
        <nav>
          <ul className="space-y-2">
            {sidebarConfig.map((item, index) => {
                switch (item.type) {
                    case 'header':
                        return <p key={index} className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 pt-4 pb-1">{item.label}</p>;
                    case 'item':
                        return <NavItem key={item.view} viewName={item.view} icon={item.icon} currentView={currentView} onClick={() => setCurrentView(item.view)} />;
                    case 'expandable':
                        return (
                            <ExpandableNavItem key={item.label} label={item.label} icon={item.icon} views={item.views} currentView={currentView} isOpen={!!openMenus[item.menuKey]} toggle={() => toggleMenu(item.menuKey)}>
                                {item.children.map(child => (
                                    <NavItem key={child.view} viewName={child.view} currentView={currentView} onClick={() => setCurrentView(child.view)} isSubItem={true} />
                                ))}
                            </ExpandableNavItem>
                        );
                    case 'sensors':
                        return (
                            <ExpandableNavItem key="sensors" label="Sensors" icon={ICONS.sensors} views={['Sensors']} currentView={currentView} isOpen={!!openMenus.sensors || currentView === 'Sensors'} toggle={() => {toggleMenu('sensors'); setCurrentView('Sensors', null)}}>
                                {Object.values(SensorType).map(type => {
                                    const isSubItemActive = currentView === 'Sensors' && sensorFilter === type;
                                    return (
                                        <li key={type} onClick={(e) => { e.stopPropagation(); setCurrentView('Sensors', type); }}
                                            className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors duration-200 text-sm ${isSubItemActive ? 'bg-slate-700/50 text-cyan-400 font-semibold' : 'text-slate-400 hover:bg-slate-700 hover:text-white'}`}>
                                            <span className="w-6 h-6">{getSensorTypeIcon(type)}</span>
                                            <span className="ml-3">{type}</span>
                                        </li>
                                    );
                                })}
                            </ExpandableNavItem>
                        )
                    default:
                        return null;
                }
            })}
          </ul>
        </nav>
      </div>
      <div className="text-center text-xs text-slate-500">
        <p>System Version 1.0.0</p>
        <p>&copy; 2024. All rights reserved.</p>
      </div>
    </aside>
  );
};

export default Sidebar;