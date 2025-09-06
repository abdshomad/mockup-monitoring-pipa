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
            <PipelineDigitalTwin sensors={sensors} />
        </div>
    </div>
);

export default DigitalTwinCard;
