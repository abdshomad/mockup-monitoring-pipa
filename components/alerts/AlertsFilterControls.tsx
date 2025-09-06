import React from 'react';
import { AlertWorkflowStage } from '../../types';

interface AlertsFilterControlsProps {
    stageFilter: AlertWorkflowStage | null;
    onFilterChange: (stage: AlertWorkflowStage | null) => void;
}

const AlertsFilterControls: React.FC<AlertsFilterControlsProps> = ({ stageFilter, onFilterChange }) => (
    <div className="flex flex-wrap gap-2 items-center mb-6">
        <span className="text-slate-400 font-medium mr-2">Filter by stage:</span>
        <button
            onClick={() => onFilterChange(null)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors duration-200 ${
                stageFilter === null
                    ? 'bg-cyan-500 text-white shadow-md'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
        >
            All
        </button>
        {Object.values(AlertWorkflowStage).map(stage => (
            <button
                key={stage}
                onClick={() => onFilterChange(stage)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors duration-200 ${
                    stageFilter === stage
                        ? 'bg-cyan-500 text-white shadow-md'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
            >
                {stage}
            </button>
        ))}
    </div>
);

export default AlertsFilterControls;
