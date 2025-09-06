
import React, { useState } from 'react';
import { SENSOR_DEPLOYMENTS } from '../constants';
import { SensorDeployment } from '../types';
import { List, Kanban } from 'lucide-react';
import DeploymentDetailView from './implementation/DeploymentDetailView';
import DeploymentListView from './implementation/DeploymentListView';
import DeploymentKanbanView from './implementation/DeploymentKanbanView';

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
