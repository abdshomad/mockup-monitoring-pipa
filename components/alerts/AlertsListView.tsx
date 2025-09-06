import React, { useState } from 'react';
import { ALERTS } from '../../constants';
import { AlertWorkflowStage } from '../../types';
import AlertsFilterControls from './AlertsFilterControls';
import AlertsTable from './AlertsTable';

const AlertsListView: React.FC<{ setSelectedAlertId: (id: string | null) => void }> = ({ setSelectedAlertId }) => {
    const [stageFilter, setStageFilter] = useState<AlertWorkflowStage | null>(null);

    const filteredAlerts = ALERTS.filter(
        (alert) => !stageFilter || alert.stage === stageFilter
    );

    return (
        <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold mb-6 text-white">Alerts Log</h3>
            <AlertsFilterControls 
                stageFilter={stageFilter} 
                onFilterChange={setStageFilter} 
            />
            <AlertsTable 
                alerts={filteredAlerts} 
                onSelectAlert={setSelectedAlertId} 
            />
        </div>
    );
};

export default AlertsListView;
