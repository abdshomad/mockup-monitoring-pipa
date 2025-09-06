import React from 'react';
import { Incident, Technician } from '../../types';
import { getIncidentStatusBadgeClass, getSeverityTextBadgeClass } from '../../utils/badgeStyles';

interface IncidentSummaryProps {
    incident: Incident;
    isEditing: boolean;
    setEditedIncident: React.Dispatch<React.SetStateAction<Incident | undefined>>;
    technicians: Technician[];
}

const IncidentSummary: React.FC<IncidentSummaryProps> = ({ incident, isEditing, setEditedIncident, technicians }) => {
    
    const handleInputChange = (field: keyof Incident, value: string) => {
        setEditedIncident(prev => prev ? { ...prev, [field]: value } : undefined);
    };

    return (
        <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
            <h3 className="font-semibold text-white mb-4">Incident Summary</h3>
            <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                    <span className="text-slate-400">Status</span>
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getIncidentStatusBadgeClass(incident.status)}`}>{incident.status}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-slate-400">Severity</span>
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${getSeverityTextBadgeClass(incident.severity)}`}>{incident.severity}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-slate-400">Commander</span>
                    {isEditing ? (
                        <select 
                            value={incident.incidentCommander} 
                            onChange={(e) => handleInputChange('incidentCommander', e.target.value)}
                            className="w-40 text-right bg-slate-700 font-mono text-white rounded-md p-1 border border-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                        >
                            {technicians.map(tech => <option key={tech.id} value={tech.name}>{tech.name}</option>)}
                        </select>
                    ) : (
                        <span className="font-mono text-white">{incident.incidentCommander}</span>
                    )}
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-slate-400">Start Time</span>
                    <span className="font-mono text-white">{incident.startTime}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-slate-400">End Time</span>
                    <span className="font-mono text-white">{incident.endTime || 'Ongoing'}</span>
                </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-700/50">
                <h4 className="text-slate-400 mb-2">Summary</h4>
                {isEditing ? (
                    <textarea
                        value={incident.summary}
                        onChange={(e) => handleInputChange('summary', e.target.value)}
                        rows={4}
                        className="w-full bg-slate-700 text-sm text-white placeholder-slate-400 rounded-lg p-2 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                ) : (
                    <p className="text-sm text-slate-300">{incident.summary}</p>
                )}
            </div>
        </div>
    );
};

export default IncidentSummary;
