
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
  icon: JSX.Element;
  currentView: View;
  onClick: () => void;
}> = ({ viewName, icon, currentView, onClick }) => {
  const isActive = currentView === viewName;
  return (
    <li
      onClick={onClick}
      className={`flex items-center p-3 my-1 rounded-lg cursor-pointer transition-colors duration-200 ${
        isActive
          ? 'bg-cyan-500 text-white shadow-lg'
          : 'text-slate-400 hover:bg-slate-700 hover:text-white'
      }`}
    >
      {icon}
      <span className="ml-4 font-medium">{viewName}</span>
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


const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, sensorFilter }) => {
  const [isSensorsSubMenuOpen, setSensorsSubMenuOpen] = useState(false);
  
  useEffect(() => {
    if (currentView !== 'Sensors') {
      setSensorsSubMenuOpen(false);
    } else if (currentView === 'Sensors' && !isSensorsSubMenuOpen) {
      setSensorsSubMenuOpen(true);
    }
  }, [currentView]);

  const isSensorsActive = currentView === 'Sensors';

  return (
    <aside className="w-64 flex-shrink-0 bg-slate-800 p-4 flex flex-col justify-between">
      <div>
        <div className="flex items-center mb-10">
           <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-9.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-9.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222 4 2.222V20" /></svg>
           </div>
          <h1 className="text-xl font-bold text-white ml-3">Pipeline Gaurd</h1>
        </div>
        <nav>
          <ul>
            <NavItem viewName="Dashboard" icon={ICONS.dashboard} currentView={currentView} onClick={() => setCurrentView('Dashboard')} />
            <NavItem viewName="Alerts" icon={ICONS.alerts} currentView={currentView} onClick={() => setCurrentView('Alerts')} />
            <li>
                <div
                    onClick={() => {
                        if (currentView === 'Sensors') {
                          setSensorsSubMenuOpen(!isSensorsSubMenuOpen);
                        } else {
                          setSensorsSubMenuOpen(true);
                        }
                        setCurrentView('Sensors', null);
                    }}
                    className={`flex items-center justify-between p-3 my-1 rounded-lg cursor-pointer transition-colors duration-200 ${
                        isSensorsActive && !sensorFilter
                          ? 'bg-cyan-500 text-white shadow-lg'
                          : 'text-slate-400 hover:bg-slate-700 hover:text-white'
                      }`}
                >
                    <div className="flex items-center">
                        {ICONS.sensors}
                        <span className="ml-4 font-medium">Sensors</span>
                    </div>
                    <ChevronIcon open={isSensorsSubMenuOpen} />
                </div>
                {isSensorsSubMenuOpen && (
                    <ul className="pl-6 mt-1 space-y-1">
                        {Object.values(SensorType).map(type => {
                            const isSubItemActive = isSensorsActive && sensorFilter === type;
                            return (
                                <li
                                    key={type}
                                    onClick={(e) => {
                                      e.stopPropagation(); // Prevent parent onClick from firing
                                      setCurrentView('Sensors', type);
                                    }}
                                    className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors duration-200 text-sm ${
                                        isSubItemActive
                                        ? 'bg-slate-700/50 text-cyan-400 font-semibold'
                                        : 'text-slate-400 hover:bg-slate-700 hover:text-white'
                                    }`}
                                >
                                    <span className="w-6 h-6">{getSensorTypeIcon(type)}</span>
                                    <span className="ml-3">{type}</span>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </li>
            <NavItem viewName="Maintenance" icon={ICONS.maintenance} currentView={currentView} onClick={() => setCurrentView('Maintenance')} />
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