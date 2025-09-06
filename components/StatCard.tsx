
import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  icon: JSX.Element;
  children: React.ReactNode;
  onClick?: () => void;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, children, onClick }) => {
  const isClickable = !!onClick;
  return (
    <div 
      className={`bg-slate-800 p-5 rounded-2xl shadow-lg flex items-center space-x-4 h-full ${isClickable ? 'cursor-pointer hover:bg-slate-700/50 transition-colors' : ''}`}
      onClick={onClick}
    >
      <div className="p-3 rounded-full bg-slate-700/50">
        {icon}
      </div>
      <div>
        <p className="text-sm text-slate-400 font-medium">{title}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
        {children}
      </div>
    </div>
  );
};

export default StatCard;