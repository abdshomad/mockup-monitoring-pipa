import React from 'react';
import { Alert, AlertWorkflowStage } from '../../types';
import { ICONS } from '../../constants';

interface AlertDetailHeaderProps {
    alert: Alert;
    onBack: () => void;
}

const AlertDetailHeader: React.FC<AlertDetailHeaderProps> = ({ alert, onBack }) => {
    return (
        <div className="flex justify-between items-center">
            <div>
                <h2 className="text-2xl font-bold text-white">Alert Details: <span className="text-cyan-400">{alert.id}</span></h2>
                <p className="text-slate-400">{alert.type}</p>
            </div>
            <div className="flex items-center space-x-4">
                {alert.stage !== AlertWorkflowStage.Resolved && (
                    <button 
                        onClick={() => window.alert(`Alert ${alert.id} has been promoted to a new incident.`)}
                        className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors flex items-center space-x-2"
                    >
                        {React.cloneElement(ICONS.security, { className: 'h-5 w-5' })}
                        <span>Promote to Incident</span>
                    </button>
                )}
                <button onClick={onBack} className="px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors">
                    &larr; Back to Alerts Log
                </button>
            </div>
        </div>
    );
};

export default AlertDetailHeader;