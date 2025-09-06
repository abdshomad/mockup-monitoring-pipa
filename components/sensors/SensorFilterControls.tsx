import React from 'react';
import { SensorStatus } from '../../types';

interface SensorFilterControlsProps {
    statusFilter: SensorStatus | null;
    onFilterChange: (status: SensorStatus | null) => void;
}

const SensorFilterControls: React.FC<SensorFilterControlsProps> = ({ statusFilter, onFilterChange }) => (
    <div className="flex flex-wrap gap-2 items-center">
        <span className="text-slate-400 font-medium mr-2">Filter by status:</span>
        <button
            onClick={() => onFilterChange(null)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors duration-200 ${
                statusFilter === null
                    ? 'bg-cyan-500 text-white shadow-md'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
        >
            All
        </button>
        {Object.values(SensorStatus).map(status => (
            <button
                key={status}
                onClick={() => onFilterChange(status)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors duration-200 ${
                    statusFilter === status
                        ? 'bg-cyan-500 text-white shadow-md'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
            >
                {status}
            </button>
        ))}
    </div>
);

export default SensorFilterControls;
