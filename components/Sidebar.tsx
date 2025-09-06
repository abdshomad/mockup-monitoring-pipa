
import React from 'react';
import { View } from '../App';
import { ICONS } from '../constants';

interface SidebarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
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

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView }) => {
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
            <NavItem viewName="Sensors" icon={ICONS.sensors} currentView={currentView} onClick={() => setCurrentView('Sensors')} />
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
