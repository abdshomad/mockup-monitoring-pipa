import { useState } from 'react';
import { View, SensorType, Incident, Alert, IncidentStatus, AlertSeverity } from '../types';
import { INCIDENTS } from '../constants';
import { getRelativeTimestamp } from '../utils/time';

export const useAppController = () => {
  const [currentView, setCurrentView] = useState<View>('Anomaly Detection');
  const [sensorFilter, setSensorFilter] = useState<SensorType | null>(null);
  const [selectedAlertId, setSelectedAlertId] = useState<string | null>(null);
  const [selectedIncidentId, _setSelectedIncidentId] = useState<string | null>(null);
  const [isPriorityModalOpen, setIsPriorityModalOpen] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [incidents, setIncidents] = useState<Incident[]>(INCIDENTS);

  const setSelectedIncidentId = (id: string | null) => {
    _setSelectedIncidentId(id);
    if (id) {
      const incident = incidents.find(i => i.id === id);
      // If an active incident is selected, automatically switch to the map view
      if (incident && (incident.status === IncidentStatus.Active || incident.status === IncidentStatus.Monitoring)) {
        setCurrentView('Map View');
        setSelectedAlertId(null); // Clear any alert selection
      }
    }
  };

  const handleSetCurrentView = (view: View, type: SensorType | null = null) => {
    setCurrentView(view);
    setSensorFilter(view === 'Sensors' ? type : null);
    setSelectedAlertId(null);
    // If we navigate away from the map, clear the incident selection
    if (view !== 'Map View') {
        _setSelectedIncidentId(null);
    }
  };
  
  const handlePromoteToIncident = (alert: Alert) => {
    const newIncident: Incident = {
        id: `INC-2025-00${incidents.length + 1}`,
        title: `Incident from Alert: ${alert.id}`,
        status: IncidentStatus.Active,
        severity: alert.severity,
        startTime: getRelativeTimestamp({}),
        endTime: null,
        incidentCommander: 'TBD',
        summary: `Incident promoted from ${alert.severity} alert "${alert.type}" on sensor ${alert.sensorId}.`,
        linkedAlertIds: [alert.id],
        log: [
            { timestamp: getRelativeTimestamp({}), entry: `Incident declared from Alert ${alert.id}.`, operator: 'Operator 1', type: 'log' },
            ...alert.history?.map(h => ({
                timestamp: h.timestamp, entry: h.action, operator: h.operator, notes: h.notes, 
                type: 'log' as const
            })) || []
        ],
    };
    setIncidents(prev => [newIncident, ...prev]);
    setCurrentView('Incident Log');
    _setSelectedIncidentId(newIncident.id);
    setSelectedAlertId(null);
  };

  const handleDeclareIncident = (data: { title: string; severity: AlertSeverity; incidentCommander: string; summary: string }) => {
    const newIncident: Incident = {
        id: `INC-2025-00${incidents.length + 1}`,
        status: IncidentStatus.Active,
        startTime: getRelativeTimestamp({}),
        endTime: null,
        linkedAlertIds: [],
        log: [{ timestamp: getRelativeTimestamp({}), entry: 'Incident declared by Operator 1.', operator: 'Operator 1', type: 'log' }],
        ...data,
    };
    setIncidents(prev => [newIncident, ...prev]);
    setSelectedIncidentId(newIncident.id);
  };
  
  const handleUpdateIncident = (updatedIncident: Incident) => {
    setIncidents(prev => prev.map(inc => inc.id === updatedIncident.id ? updatedIncident : inc));
  };

  return {
    currentView,
    sensorFilter,
    selectedAlertId,
    selectedIncidentId,
    isPriorityModalOpen,
    isAssistantOpen,
    incidents,
    handleSetCurrentView,
    setSelectedAlertId,
    setSelectedIncidentId,
    setIsPriorityModalOpen,
    setIsAssistantOpen,
    handlePromoteToIncident,
    handleDeclareIncident,
    handleUpdateIncident,
  };
};
