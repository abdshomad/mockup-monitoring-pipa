

import React, { useState, useEffect } from 'react';
import { View } from '../App';
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

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, sensorFilter }) => {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = (menu: string) => {
    setOpenMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
  };

  const menuConfig = {
    preConstruction: ['Planning', 'Site Survey', 'Design', 'Approvals'] as View[],
    construction: ['Implementation', 'Quality Assurance', 'Commissioning'] as View[],
    operations: ['Dashboard', 'Alerts', 'Sensors', 'Map View'] as View[],
    maintenance: ['Maintenance', 'Asset Management'] as View[],
    analysis: ['System Health', 'Alert History', 'Technician Performance'] as View[],
    system: ['User Profile', 'Notifications', 'System Config'] as View[],
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
             <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 mt-4 mb-1">Pre-Construction</p>
             <ExpandableNavItem label="Planning" icon={ICONS.preConstruction} views={menuConfig.preConstruction} currentView={currentView} isOpen={!!openMenus.preConstruction} toggle={() => toggleMenu('preConstruction')}>
                <NavItem viewName="Planning" currentView={currentView} onClick={() => setCurrentView('Planning')} isSubItem={true} />
                <NavItem viewName="Site Survey" currentView={currentView} onClick={() => setCurrentView('Site Survey')} isSubItem={true} />
                <NavItem viewName="Design" currentView={currentView} onClick={() => setCurrentView('Design')} isSubItem={true} />
                <NavItem viewName="Approvals" currentView={currentView} onClick={() => setCurrentView('Approvals')} isSubItem={true} />
             </ExpandableNavItem>
             
             <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 mt-4 mb-1">Construction</p>
             <ExpandableNavItem label="Implementation" icon={ICONS.construction} views={menuConfig.construction} currentView={currentView} isOpen={!!openMenus.construction} toggle={() => toggleMenu('construction')}>
                <NavItem viewName="Implementation" currentView={currentView} onClick={() => setCurrentView('Implementation')} isSubItem={true} />
                <NavItem viewName="Quality Assurance" currentView={currentView} onClick={() => setCurrentView('Quality Assurance')} isSubItem={true} />
                <NavItem viewName="Commissioning" currentView={currentView} onClick={() => setCurrentView('Commissioning')} isSubItem={true} />
             </ExpandableNavItem>

            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 mt-4 mb-1">Operations</p>
            <NavItem viewName="Dashboard" icon={ICONS.dashboard} currentView={currentView} onClick={() => setCurrentView('Dashboard')} />
            <NavItem viewName="Alerts" icon={ICONS.alerts} currentView={currentView} onClick={() => setCurrentView('Alerts')} />
            <ExpandableNavItem label="Sensors" icon={ICONS.sensors} views={['Sensors']} currentView={currentView} isOpen={!!openMenus.sensors || currentView === 'Sensors'} toggle={() => {toggleMenu('sensors'); setCurrentView('Sensors', null)}}>
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
            <NavItem viewName="Map View" icon={ICONS.map} currentView={currentView} onClick={() => setCurrentView('Map View')} />

            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 mt-4 mb-1">Maintenance</p>
             <ExpandableNavItem label="Maintenance" icon={ICONS.maintenance} views={menuConfig.maintenance} currentView={currentView} isOpen={!!openMenus.maintenance} toggle={() => toggleMenu('maintenance')}>
                <NavItem viewName="Maintenance" currentView={currentView} onClick={() => setCurrentView('Maintenance')} isSubItem={true} />
                <NavItem viewName="Asset Management" currentView={currentView} onClick={() => setCurrentView('Asset Management')} isSubItem={true} />
             </ExpandableNavItem>

            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 mt-4 mb-1">Analysis & Reporting</p>
            <ExpandableNavItem label="Reporting" icon={ICONS.reporting} views={menuConfig.analysis} currentView={currentView} isOpen={!!openMenus.analysis} toggle={() => toggleMenu('analysis')}>
                <NavItem viewName="System Health" currentView={currentView} onClick={() => setCurrentView('System Health')} isSubItem={true} />
                <NavItem viewName="Alert History" currentView={currentView} onClick={() => setCurrentView('Alert History')} isSubItem={true} />
                <NavItem viewName="Technician Performance" currentView={currentView} onClick={() => setCurrentView('Technician Performance')} isSubItem={true} />
            </ExpandableNavItem>
            
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 mt-4 mb-1">System</p>
            <ExpandableNavItem label="Settings" icon={ICONS.settings} views={menuConfig.system} currentView={currentView} isOpen={!!openMenus.system} toggle={() => toggleMenu('system')}>
                <NavItem viewName="User Profile" currentView={currentView} onClick={() => setCurrentView('User Profile')} isSubItem={true} />
                <NavItem viewName="Notifications" currentView={currentView} onClick={() => setCurrentView('Notifications')} isSubItem={true} />
                <NavItem viewName="System Config" currentView={currentView} onClick={() => setCurrentView('System Config')} isSubItem={true} />
            </ExpandableNavItem>
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