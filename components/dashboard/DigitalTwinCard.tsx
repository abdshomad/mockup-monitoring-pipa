import React from 'react';
import PipelineDigitalTwin from '../PipelineDigitalTwin';
import { Sensor } from '../../types';

interface DigitalTwinCardProps {
    sensors: Sensor[];
}

const DigitalTwinCard: React.FC<DigitalTwinCardProps> = ({ sensors }) => (
    <div className="lg:col-span-2 bg-slate-800 p-6 rounded-2xl shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-white">Pipeline Digital Twin</h3>
        <div className="aspect-video bg-slate-700 rounded-lg overflow-hidden relative">
            {/* FIX: The 'PipelineDigitalTwin' component requires a 'currentTime' prop to render alerts correctly.
                 This is now provided using a constant date consistent with the mock data timeline. */}
            <PipelineDigitalTwin sensors={sensors} currentTime={new Date('2025-09-06T14:30:00Z')} />
        </div>
    </div>
);

export default DigitalTwinCard;
