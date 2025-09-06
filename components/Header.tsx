import React from 'react';
// FIX: The 'View' type is exported from '../types', not '../App'.
import { View } from '../types';
import { ICONS } from '../constants';

interface HeaderProps {
  currentView: View;
  activeAlertsCount: number;
  onShowPriorityTasks: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, activeAlertsCount, onShowPriorityTasks }) => {
  const hasAlerts = activeAlertsCount > 0;

  return (
    <header className="bg-slate-800 p-4 shadow-md z-10">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">{currentView}</h2>
        <div className="flex items-center space-x-6">
            <button 
                onClick={onShowPriorityTasks}
                className="relative cursor-pointer text-slate-400 hover:text-purple-400 transition-colors duration-200"
                aria-label="Get AI Priority Tasks"
            >
                {React.cloneElement(ICONS.ai, { className: "h-7 w-7" })}
            </button>
            <div className="relative cursor-pointer">
                {React.cloneElement(ICONS.alerts, { className: `h-6 w-6 transition-colors duration-300 ${hasAlerts ? 'animate-pulse text-red-400' : 'text-slate-400 hover:text-white'}` })}
                {hasAlerts && (
                    <span className="absolute -top-2 -right-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white ring-2 ring-slate-800">
                        {activeAlertsCount}
                    </span>
                )}
            </div>
            <img src="https://picsum.photos/40" alt="User Avatar" className="w-10 h-10 rounded-full" />
        </div>
      </div>
    </header>
  );
};

export default Header;