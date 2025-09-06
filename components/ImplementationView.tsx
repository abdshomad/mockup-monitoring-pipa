import React, { useState } from 'react';
import { SENSOR_DEPLOYMENTS, ICONS } from '../constants';
import { DeploymentStatus, SensorDeployment, DeploymentEvent } from '../types';
import { getFormattedTimestamp } from '../utils/time';
import { List, Kanban } from 'lucide-react';


// --- Styling & Icons ---

const getStatusBadgeClass = (status: DeploymentStatus) => {
    switch (status) {
        case DeploymentStatus.Planned: return 'bg-slate-500/20 text-slate-400';
        case DeploymentStatus.AwaitingInstallation: return 'bg-cyan-500/20 text-cyan-400';
        case DeploymentStatus.InProgress: return 'bg-yellow-500/20 text-yellow-400';
        case DeploymentStatus.PendingQA: return 'bg-purple-500/20 text-purple-400';
        case DeploymentStatus.Active: return 'bg-green-500/20 text-green-400';
        default: return 'bg-slate-500/20 text-slate-400';
    }
};

const getKanbanColumnClass = (status: DeploymentStatus) => {
     const colorMap = {
        [DeploymentStatus.Planned]: 'border-slate-500',
        [DeploymentStatus.AwaitingInstallation]: 'border-cyan-500',
        [DeploymentStatus.InProgress]: 'border-yellow-500',
        [DeploymentStatus.PendingQA]: 'border-purple-500',
        [DeploymentStatus.Active]: 'border-green-500',
    };
    return colorMap[status] || 'border-slate-500';
}


const getTimelineIcon = (status: DeploymentStatus) => {
    switch (status) {
        case DeploymentStatus.Planned: return ICONS.preConstruction;
        case DeploymentStatus.AwaitingInstallation: return ICONS.assetManagement;
        case DeploymentStatus.InProgress: return ICONS.construction;
        case DeploymentStatus.PendingQA: return ICONS.actions;
        case DeploymentStatus.Active: return ICONS.onlineSensors;
    }
};


// --- Detail View (Unchanged) ---

const DeploymentDetailView: React.FC<{ deployment: SensorDeployment; onBack: () => void; }> = ({ deployment, onBack }) => (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <div>
                <h2 className="text-2xl font-bold text-white">Deployment Timeline: <span className="text-cyan-400">{deployment.id}</span></h2>
                <p className="text-slate-400">Sensor: {deployment.sensorId} | Asset: {deployment.assetId}</p>
            </div>
            <button onClick={onBack} className="px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors">
                &larr; Back to Deployment List
            </button>
        </div>
        <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold mb-6 text-white">Lifecycle Events</h3>
            <div className="relative pl-6">
                <div className="absolute top-0 left-0 h-full w-0.5 bg-slate-700/50 translate-x-2.5"></div>
                <ul className="space-y-8">
                    {deployment.history.map((event: DeploymentEvent, index: number) => (
                        <li key={index} className="relative pl-6">
                            <div className="absolute -left-2 top-0 w-5 h-5 bg-slate-700 rounded-full ring-4 ring-slate-800 flex items-center justify-center text-cyan-400">
                                {getTimelineIcon(event.status)}
                            </div>
                            <div className="ml-4 bg-slate-900/30 p-4 rounded-lg">
                                <p className="text-md font-semibold text-slate-200">{event.status}</p>
                                <p className="text-sm text-slate-400">
                                    by <span className="font-semibold text-slate-300">{event.operator}</span>
                                </p>
                                <p className="text-xs text-slate-500 mt-1">{event.timestamp}</p>
                                <div className="mt-3 pt-3 border-t border-slate-700/50">
                                    <p className="text-sm text-slate-300 leading-relaxed">{event.notes}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
);


// --- List View (Modified to accept props) ---

const DeploymentListView: React.FC<{ deployments: SensorDeployment[]; onSelectDeployment: (id: string) => void; }> = ({ deployments, onSelectDeployment }) => {
    const [statusFilter, setStatusFilter] = useState<DeploymentStatus | null>(null);

    const filteredDeployments = deployments.filter(
        d => !statusFilter || d.currentStatus === statusFilter
    );

    return (
        <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
            <div className="flex flex-wrap gap-2 items-center mb-6">
                <span className="text-slate-400 font-medium mr-2">Filter by status:</span>
                <button onClick={() => setStatusFilter(null)} className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors duration-200 ${!statusFilter ? 'bg-cyan-500 text-white shadow-md' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>
                    All
                </button>
                {Object.values(DeploymentStatus).map(status => (
                    <button key={status} onClick={() => setStatusFilter(status)} className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors duration-200 ${statusFilter === status ? 'bg-cyan-500 text-white shadow-md' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>
                        {status}
                    </button>
                ))}
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-slate-400">
                    <thead className="text-xs text-slate-300 uppercase bg-slate-700/50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Deployment ID</th>
                            <th scope="col" className="px-6 py-3">Sensor / Asset</th>
                            <th scope="col" className="px-6 py-3">Segment</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3">Last Update</th>
                            <th scope="col" className="px-6 py-3">Assigned Team</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDeployments.map(d => (
                            <tr key={d.id} className="bg-slate-800 border-b border-slate-700 hover:bg-slate-700/50">
                                <td className="px-6 py-4 font-medium text-white">{d.id}</td>
                                <td className="px-6 py-4 font-mono">{d.sensorId}<br/>{d.assetId}</td>
                                <td className="px-6 py-4">{d.segment}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeClass(d.currentStatus)}`}>
                                        {d.currentStatus}
                                    </span>
                                </td>
                                <td className="px-6 py-4">{d.history[d.history.length - 1].timestamp}</td>
                                <td className="px-6 py-4">{d.assignedTeam}</td>
                                <td className="px-6 py-4">
                                    <button onClick={() => onSelectDeployment(d.id)} className="font-medium text-cyan-400 hover:underline">View Timeline</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


// --- Kanban View (New Components) ---

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


// --- Main View Component ---

const ImplementationView: React.FC = () => {
    const [deployments, setDeployments] = useState<SensorDeployment[]>(SENSOR_DEPLOYMENTS);
    const [selectedDeploymentId, setSelectedDeploymentId] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');

    const selectedDeployment = deployments.find(d => d.id === selectedDeploymentId);

    if (selectedDeployment) {
        return <DeploymentDetailView deployment={selectedDeployment} onBack={() => setSelectedDeploymentId(null)} />;
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                     <h2 className="text-2xl font-bold text-white">Sensor Installation & Lifecycle Management</h2>
                     <p className="text-slate-300 mt-1">
                        Track the end-to-end progress of sensor deployment and installation in the field.
                    </p>
                </div>
                <div className="flex items-center space-x-2 bg-slate-800 p-1 rounded-lg">
                    <button 
                        onClick={() => setViewMode('list')} 
                        className={`px-3 py-1.5 rounded-md text-sm font-semibold flex items-center space-x-2 transition-colors ${viewMode === 'list' ? 'bg-cyan-500 text-white' : 'text-slate-400 hover:bg-slate-700'}`}
                    >
                        <List className="h-4 w-4" />
                        <span>List</span>
                    </button>
                    <button 
                        onClick={() => setViewMode('kanban')}
                        className={`px-3 py-1.5 rounded-md text-sm font-semibold flex items-center space-x-2 transition-colors ${viewMode === 'kanban' ? 'bg-cyan-500 text-white' : 'text-slate-400 hover:bg-slate-700'}`}
                    >
                         <Kanban className="h-4 w-4" />
                         <span>Kanban</span>
                    </button>
                </div>
            </div>
            
            <div className="animate-fade-in">
                {viewMode === 'list' ? (
                    <DeploymentListView deployments={deployments} onSelectDeployment={setSelectedDeploymentId} />
                ) : (
                    <DeploymentKanbanView deployments={deployments} onSelectDeployment={setSelectedDeploymentId} setDeployments={setDeployments} />
                )}
            </div>
        </div>
    );
};

export default ImplementationView;
