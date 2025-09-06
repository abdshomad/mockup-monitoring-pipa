import React, { useState } from 'react';
import { INCIDENTS, ALERTS, TECHNICIANS } from '../constants';
import { Incident, IncidentStatus, AlertSeverity, Alert } from '../types';
import IncidentDetailView from './IncidentDetailView';
import DeclareIncidentModal from './DeclareIncidentModal';
import { getRelativeTimestamp } from '../utils/time';

const IncidentLogView: React.FC = () => {
    const [selectedIncidentId, setSelectedIncidentId] = useState<string | null>(null);
    const [incidents, setIncidents] = useState<Incident[]>(INCIDENTS);
    const [isDeclareModalOpen, setIsDeclareModalOpen] = useState(false);

    const getStatusBadgeClass = (status: IncidentStatus) => {
        switch (status) {
            case IncidentStatus.Active: return 'bg-red-500/20 text-red-400 animate-pulse';
            case IncidentStatus.Monitoring: return 'bg-yellow-500/20 text-yellow-400';
            case IncidentStatus.Resolved: return 'bg-green-500/20 text-green-400';
            case IncidentStatus.PostMortem: return 'bg-blue-500/20 text-blue-400';
            default: return 'bg-slate-500/20 text-slate-400';
        }
    };
    
    const getSeverityBadgeClass = (severity: AlertSeverity) => {
        switch (severity) {
            case AlertSeverity.Critical: return 'bg-red-500/20 text-red-400';
            case AlertSeverity.High: return 'bg-orange-500/20 text-orange-400';
            case AlertSeverity.Medium: return 'bg-yellow-500/20 text-yellow-400';
            case AlertSeverity.Low: return 'bg-blue-500/20 text-blue-400';
            default: return 'bg-slate-500/20 text-slate-400';
        }
    };
    
    const handleUpdateIncident = (updatedIncident: Incident) => {
        setIncidents(prevIncidents =>
            prevIncidents.map(inc =>
                inc.id === updatedIncident.id ? updatedIncident : inc
            )
        );
        setSelectedIncidentId(null); // Go back to list view
    };

    const handleDeclareIncident = (data: { title: string; severity: AlertSeverity; incidentCommander: string; summary: string }) => {
        const newIncident: Incident = {
            id: `INC-2025-00${incidents.length + 1}`,
            title: data.title,
            status: IncidentStatus.Active, // New incidents are always active
            severity: data.severity,
            startTime: getRelativeTimestamp({}),
            endTime: null,
            incidentCommander: data.incidentCommander,
            summary: data.summary,
            linkedAlertIds: [],
            log: [
                { timestamp: getRelativeTimestamp({}), entry: 'Incident declared by Operator 1.', operator: 'Operator 1' }
            ],
        };
        setIncidents(prev => [newIncident, ...prev]);
        setIsDeclareModalOpen(false);
    };

    if (selectedIncidentId) {
        const selectedIncident = incidents.find(i => i.id === selectedIncidentId);
        const linkedAlerts = ALERTS.filter(a => selectedIncident?.linkedAlertIds.includes(a.id));
        return <IncidentDetailView incident={selectedIncident} linkedAlerts={linkedAlerts} onBack={() => setSelectedIncidentId(null)} onUpdate={handleUpdateIncident} />;
    }

    return (
        <>
            <DeclareIncidentModal
                isOpen={isDeclareModalOpen}
                onClose={() => setIsDeclareModalOpen(false)}
                onDeclare={handleDeclareIncident}
                technicians={TECHNICIANS}
            />
            <div className="bg-slate-800 p-6 rounded-2xl shadow-lg animate-fade-in">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-white">Incident Management Log</h3>
                    <button onClick={() => setIsDeclareModalOpen(true)} className="px-4 py-2 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition-colors shadow-md">
                        Declare New Incident
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-slate-400">
                        <thead className="text-xs text-slate-300 uppercase bg-slate-700/50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Incident ID</th>
                                <th scope="col" className="px-6 py-3">Title</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3">Severity</th>
                                <th scope="col" className="px-6 py-3">Start Time</th>
                                <th scope="col" className="px-6 py-3">Commander</th>
                                <th scope="col" className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {incidents.map((incident) => (
                                <tr key={incident.id} className="bg-slate-800 border-b border-slate-700 hover:bg-slate-700/50">
                                    <td className="px-6 py-4 font-medium text-white">{incident.id}</td>
                                    <td className="px-6 py-4">{incident.title}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeClass(incident.status)}`}>
                                            {incident.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getSeverityBadgeClass(incident.severity)}`}>
                                            {incident.severity}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">{incident.startTime}</td>
                                    <td className="px-6 py-4">{incident.incidentCommander}</td>
                                    <td className="px-6 py-4">
                                        <button onClick={() => setSelectedIncidentId(incident.id)} className="font-medium text-cyan-400 hover:underline">Details</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default IncidentLogView;