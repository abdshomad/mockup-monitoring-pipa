import React from 'react';
import PipelineDigitalTwin from './PipelineDigitalTwin';
import { SENSORS } from '../constants';

const MapView: React.FC = () => {
    return (
        <div className="space-y-6 h-full flex flex-col">
            <h2 className="text-2xl font-bold text-white">Live Pipeline Map</h2>
            <div className="bg-slate-800 p-6 rounded-2xl shadow-lg flex-grow flex flex-col">
                <p className="text-slate-300 mb-4 flex-shrink-0">
                    This view displays a live, interactive map of the entire pipeline network.
                    Sensors are plotted on the map, with their status indicated by color.
                    Hover over a sensor to view its status and ID.
                </p>
                <div className="flex-grow bg-slate-700 rounded-lg overflow-hidden relative">
                    <PipelineDigitalTwin sensors={SENSORS} />
                </div>
            </div>
        </div>
    );
};

export default MapView;
