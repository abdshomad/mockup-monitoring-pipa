

import React from 'react';
import IndonesiaPipelineMap from '../PipelineDigitalTwin';
import { Sensor } from '../../types';
import { ALERTS } from '../../constants';

interface DigitalTwinCardProps {
    sensors: Sensor[];
}

const DigitalTwinCard: React.FC<DigitalTwinCardProps> = ({ sensors }) => {
    const fixedTime = new Date('2025-09-06T14:30:00Z');
    const historicalAlerts = ALERTS.filter(a => new Date(a.timestamp) <= fixedTime);

    return (
        <div className="lg:col-span-2 bg-slate-800 p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-white">Pipeline Digital Twin</h3>
            <div className="aspect-video bg-slate-700 rounded-lg overflow-hidden relative">
                <IndonesiaPipelineMap 
                    sensors={sensors} 
                    alerts={historicalAlerts} 
                    currentTime={fixedTime} 
                    // FIX: Added the required 'isIncidentMode' prop, which is false in this context.
                    isIncidentMode={false}
                />
            </div>
        </div>
    );
};

export default DigitalTwinCard;