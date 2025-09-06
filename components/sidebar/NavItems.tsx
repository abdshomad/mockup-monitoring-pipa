import React from 'react';
import { View } from '../../types';
import { ChevronRight } from 'lucide-react';

export const NavItem: React.FC<{
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

export const ExpandableNavItem: React.FC<{
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
        <ChevronRight className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} />
      </div>
      {isOpen && <ul className="pl-6 mt-1 space-y-1">{children}</ul>}
    </li>
  );
};
