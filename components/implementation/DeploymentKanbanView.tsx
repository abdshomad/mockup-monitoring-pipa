
import React, { useState } from 'react';
import { SensorDeployment, DeploymentStatus, DeploymentEvent } from '../../types';
import { getKanbanColumnClass } from './utils';
import { getFormattedTimestamp } from '../../utils/time';

const DeploymentCard: React.FC<{ deployment: SensorDeployment; onDragStart: (e: React.DragEvent<HTMLDivElement>, deploymentId: string) => void; onSelect: (id: string) => void }> = ({ deployment, onDragStart, onSelect }) => {
    return (
        <div
            draggable
            onDragStart={(e) => onDragStart(e, deployment.id)}
            className="bg-slate-800 p-3 rounded-lg shadow-md mb-3 cursor-grab active:cursor-grabbing border border-slate-700 hover:border-cyan-400 transition-colors"
        >
            <p className="font-bold text-sm text-white">{deployment.id}</p>
            <p className="text-xs text-slate-300 mt-1 font-mono">{deployment.sensorId}</p>
            <p className="text-xs text-slate-400 mt-2">Team: {deployment.assignedTeam}</p>
            <button onClick={() => onSelect(deployment.id)} className="mt-3 text-xs font-medium text-cyan-400 hover:underline">View Timeline</button>
        </div>
    );
};

const DeploymentKanbanView: React.FC<{
    deployments: SensorDeployment[];
    onSelectDeployment: (id: string) => void;
    setDeployments: React.Dispatch<React.SetStateAction<SensorDeployment[]>>;
}> = ({ deployments, onSelectDeployment, setDeployments }) => {
    
    const [draggedOverColumn, setDraggedOverColumn] = useState<DeploymentStatus | null>(null);

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, deploymentId: string) => {
        e.dataTransfer.setData("deploymentId", deploymentId);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, newStatus: DeploymentStatus) => {
        e.preventDefault();
        const deploymentId = e.dataTransfer.getData("deploymentId");
        
        setDeployments(prevDeployments => {
            const deploymentToUpdate = prevDeployments.find(d => d.id === deploymentId);
            if (deploymentToUpdate && deploymentToUpdate.currentStatus !== newStatus) {
                const newHistoryEvent: DeploymentEvent = {
                    timestamp: getFormattedTimestamp(new Date()),
                    status: newStatus,
                    notes: `Status updated to ${newStatus} via Kanban board.`,
                    operator: 'Operator 1',
                };
                 return prevDeployments.map(d => 
                    d.id === deploymentId 
                    ? { ...d, currentStatus: newStatus, history: [...d.history, newHistoryEvent] } 
                    : d
                );
            }
            return prevDeployments;
        });
        setDraggedOverColumn(null);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>, status: DeploymentStatus) => {
        e.preventDefault();
        setDraggedOverColumn(status);
    };

    return (
        <div className="flex space-x-4 overflow-x-auto pb-4">
            {Object.values(DeploymentStatus).map(status => (
                <div 
                    key={status}
                    onDrop={(e) => handleDrop(e, status)}
                    onDragOver={(e) => handleDragOver(e, status)}
                    onDragLeave={() => setDraggedOverColumn(null)}
                    className={`flex-shrink-0 w-72 bg-slate-900/50 rounded-lg p-3 transition-colors ${draggedOverColumn === status ? 'bg-slate-700/50' : ''}`}
                >
                    <h3 className={`font-semibold mb-4 p-2 rounded-md border-b-2 ${getKanbanColumnClass(status)} text-slate-200`}>
                        {status} ({deployments.filter(d => d.currentStatus === status).length})
                    </h3>
                    <div className="space-y-3 min-h-[calc(100vh-350px)]">
                        {deployments
                            .filter(d => d.currentStatus === status)
                            .map(d => (
                                <DeploymentCard key={d.id} deployment={d} onDragStart={handleDragStart} onSelect={onSelectDeployment} />
                            ))
                        }
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DeploymentKanbanView;
