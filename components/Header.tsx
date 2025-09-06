

import React from 'react';
// FIX: The 'View' type is exported from '../types', not '../App'.
import { View } from '../types';

interface HeaderProps {
  currentView: View;
  activeAlertsCount: number;
}

const Header: React.FC<HeaderProps> = ({ currentView, activeAlertsCount }) => {
  const hasAlerts = activeAlertsCount > 0;

  return (
    <header className="bg-slate-800 p-4 shadow-md z-10">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">{currentView}</h2>
        <div className="flex items-center space-x-4">
            <div className="relative cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-colors duration-300 ${hasAlerts ? 'animate-pulse text-red-400' : 'text-slate-400 hover:text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
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