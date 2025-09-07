import React from 'react';
import { View } from '../types';
import { useAppController } from '../hooks/useAppController';
import { ALERTS } from '../constants';

// Import all view components
import Dashboard from './Dashboard';
import AlertsView from './AlertsView';
import IncidentLogView from './IncidentLogView';
import SensorsView from './SensorsView';
import MaintenanceView from './MaintenanceView';
import MapView from './MapView';
import PlanningView from './PlanningView';
import SiteSurveyView from './SiteSurveyView';
import DesignView from './DesignView';
import ApprovalsView from './ApprovalsView';
import ImplementationView from './ImplementationView';
import QualityAssuranceView from './QualityAssuranceView';
import CommissioningView from './CommissioningView';
import AssetManagementView from './AssetManagementView';
import SystemHealthView from './SystemHealthView';
import AlertHistoryView from './AlertHistoryView';
import TechnicianPerformanceView from './TechnicianPerformanceView';
import UserProfileView from './UserProfileView';
import NotificationsView from './NotificationsView';
import SystemConfigView from './SystemConfigView';
import AlertDetailView from './AlertDetailView';
import IncidentDetailView from './IncidentDetailView';
import LoraWANView from './LoraWANView';
import AnomalyDetectionView from './AnomalyDetectionView';

const viewComponents: Record<View, React.FC<any>> = {
  'Dashboard': Dashboard, 'Alerts': AlertsView, 'Incident Log': IncidentLogView, 'Sensors': SensorsView,
  'Scheduled Maintenance': MaintenanceView, 'Map View': MapView, 'Planning': PlanningView,
  'Site Survey': SiteSurveyView, 'Design': DesignView, 'Approvals': ApprovalsView,
  'Implementation': ImplementationView, 'Quality Assurance': QualityAssuranceView,
  'Commissioning': CommissioningView, 'Asset Management': AssetManagementView,
  'System Health': SystemHealthView, 'Alert History': AlertHistoryView,
  'Technician Performance': TechnicianPerformanceView, 'Anomaly Detection': AnomalyDetectionView, 'User Profile': UserProfileView,
  'Notifications': NotificationsView, 'System Config': SystemConfigView, 'LoRaWAN Network': LoraWANView,
};

type MainContentProps = ReturnType<typeof useAppController>;

const MainContent: React.FC<MainContentProps> = (props) => {
  const { 
    currentView, selectedAlertId, selectedIncidentId, incidents, sensorFilter,
    handleSetCurrentView, setSelectedAlertId, setSelectedIncidentId, 
    handlePromoteToIncident, handleDeclareIncident, handleUpdateIncident
  } = props;
  
  if (selectedAlertId) {
    const selectedAlert = ALERTS.find(a => a.id === selectedAlertId);
    return <AlertDetailView alert={selectedAlert} onBack={() => setSelectedAlertId(null)} onPromoteToIncident={handlePromoteToIncident} />;
  }

  if (selectedIncidentId) {
      const selectedIncident = incidents.find(i => i.id === selectedIncidentId);
      const linkedAlerts = ALERTS.filter(a => selectedIncident?.linkedAlertIds.includes(a.id));
      return <IncidentDetailView incident={selectedIncident} linkedAlerts={linkedAlerts} onBack={() => setSelectedIncidentId(null)} onUpdate={handleUpdateIncident} />;
  }

  // FIX: Refactor rendering logic to a switch statement for type safety and clarity.
  // This resolves issues where incorrect props were being passed to components due to
  // complex conditional logic that confused the TypeScript type checker.
  switch (currentView) {
    case 'Dashboard':
      return <Dashboard setCurrentView={handleSetCurrentView} />;
    case 'Alerts':
      return <AlertsView setSelectedAlertId={setSelectedAlertId} />;
    case 'Sensors':
      return <SensorsView sensorFilter={sensorFilter} />;
    case 'Incident Log':
      return <IncidentLogView incidents={incidents} onSelectIncident={setSelectedIncidentId} onDeclareIncident={handleDeclareIncident} />;
    default:
      const Component = viewComponents[currentView];
      // Fallback to dashboard with correct props if component is not found.
      return Component ? <Component /> : <Dashboard setCurrentView={handleSetCurrentView} />;
  }
};

export default MainContent;