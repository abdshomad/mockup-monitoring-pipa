
import React, { useState } from 'react';
import { ALERTS } from '../constants';
import { Alert, AlertWorkflowStage, AlertSeverity } from '../types';
import { getSeverityBadgeClass } from '../utils/badgeStyles';

const STAGES = Object.values(AlertWorkflowStage);

const getStageColors = (stage: AlertWorkflowStage) => {
    const colorMap = {
        [AlertWorkflowStage.Triage]: 'border-cyan-500',
        [AlertWorkflowStage.Investigating]: 'border-purple-500',
        [AlertWorkflowStage.Dispatched]: 'border-indigo-500',
        [AlertWorkflowStage.OnSite]: 'border-blue-500',
        [AlertWorkflowStage.Resolving]: 'border-yellow-500',
        [AlertWorkflowStage.Resolved]: 'border-green-500',
    };
    return colorMap[stage] || 'border-slate-500';
}

const AlertCard: React.FC<{ alert: Alert, onDragStart: (e: React.DragEvent<HTMLDivElement>, alertId: string) => void, onSelect: (id: string) => void }> = ({ alert, onDragStart, onSelect }) => {
    return (
        <div
            draggable
            onDragStart={(e) => onDragStart(e, alert.id)}
            className="bg-slate-800 p-3 rounded-lg shadow-md mb-3 cursor-grab active:cursor-grabbing border border-slate-700 hover:border-cyan-400 transition-colors"
        >
            <div className="flex justify-between items-start">
                <p className="font-bold text-sm text-white">{alert.id}</p>
                 <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${getSeverityBadgeClass(alert.severity)}`}>{alert.severity}</span>
            </div>
            <p className="text-xs text-slate-300 mt-1">{alert.type}</p>
            <p className="text-xs text-slate-400 mt-2 font-mono">{alert.sensorId}</p>
            <button onClick={() => onSelect(alert.id)} className="mt-3 text-xs font-medium text-cyan-400 hover:underline">View Details</button>
        </div>
    );
};


const KanbanBoardView: React.FC<{ setSelectedAlertId: (id: string | null) => void }> = ({ setSelectedAlertId }) => {
    const [alerts, setAlerts] = useState<Alert[]>(ALERTS);

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, alertId: string) => {
        e.dataTransfer.setData("alertId", alertId);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, newStage: AlertWorkflowStage) => {
        e.preventDefault();
        const alertId = e.dataTransfer.getData("alertId");
        
        setAlerts(prevAlerts => 
            prevAlerts.map(alert => 
                alert.id === alertId ? { ...alert, stage: newStage } : alert
            )
        );
        // In a real app, this would also persist the change.
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Alerts Kanban Board</h2>
            <div className="flex space-x-4 overflow-x-auto pb-4">
                {STAGES.map(stage => (
                    <div 
                        key={stage}
                        onDrop={(e) => handleDrop(e, stage)}
                        onDragOver={handleDragOver}
                        className="flex-shrink-0 w-72 bg-slate-900/50 rounded-lg p-3"
                    >
                        <h3 className={`font-semibold mb-4 p-2 rounded-md border-b-2 ${getStageColors(stage)} text-slate-200`}>{stage}</h3>
                        <div className="space-y-3 min-h-[calc(100vh-250px)]">
                            {alerts
                                .filter(alert => alert.stage === stage)
                                .map(alert => (
                                    <AlertCard key={alert.id} alert={alert} onDragStart={handleDragStart} onSelect={setSelectedAlertId} />
                                ))
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default KanbanBoardView;
