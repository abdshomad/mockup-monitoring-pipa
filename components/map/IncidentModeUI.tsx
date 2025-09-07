import React from 'react';
import { Incident } from '../../types';
import { Map, PenSquare, Type, Siren } from 'lucide-react';

interface IncidentModeUIProps {
    incident: Incident;
    onUpdateIncident: (incident: Incident) => void;
}

const IncidentModeUI: React.FC<IncidentModeUIProps> = ({ incident }) => {
    return (
        <div className="absolute bottom-0 left-0 right-0 bg-slate-800/80 backdrop-blur-sm p-4 rounded-t-2xl shadow-lg border-t border-red-500/30 animate-fade-in">
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center space-x-3">
                    <Siren className="h-7 w-7 text-red-400" />
                    <div>
                        <h3 className="text-lg font-bold text-white leading-tight">Incident Response: {incident.id}</h3>
                        <p className="text-sm text-slate-300 leading-tight">{incident.title}</p>
                    </div>
                </div>
                <div className="text-right">
                     <p className="text-sm text-slate-400">Commander</p>
                     <p className="font-semibold text-white">{incident.incidentCommander}</p>
                </div>
            </div>
            <div className="flex items-center space-x-4 bg-slate-900/50 p-2 rounded-lg">
                <div className="font-semibold text-sm text-slate-300 mr-2">Tools:</div>
                <button className="flex items-center space-x-2 px-3 py-1.5 bg-slate-700 text-white rounded-md hover:bg-slate-600 transition-colors">
                    <PenSquare className="h-4 w-4" />
                    <span>Draw Area</span>
                </button>
                 <button className="flex items-center space-x-2 px-3 py-1.5 bg-slate-700 text-white rounded-md hover:bg-slate-600 transition-colors">
                    <Type className="h-4 w-4" />
                    <span>Add Text</span>
                </button>
            </div>
        </div>
    );
};

export default IncidentModeUI;
