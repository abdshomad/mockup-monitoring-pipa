import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import AlertsView from './components/AlertsView';
import SensorsView from './components/SensorsView';
import MaintenanceView from './components/MaintenanceView';
import PlanningView from './components/PlanningView';
import { SensorType, AlertStatus, View } from './types';
import { ALERTS } from './constants';
import MapView from './components/MapView';
import SiteSurveyView from './components/SiteSurveyView';
import DesignView from './components/DesignView';
import ApprovalsView from './components/ApprovalsView';
import ImplementationView from './components/ImplementationView';
import QualityAssuranceView from './components/QualityAssuranceView';
import CommissioningView from './components/CommissioningView';
import AssetManagementView from './components/AssetManagementView';
import SystemHealthView from './components/SystemHealthView';
import AlertHistoryView from './components/AlertHistoryView';
import TechnicianPerformanceView from './components/TechnicianPerformanceView';
import UserProfileView from './components/UserProfileView';
import NotificationsView from './components/NotificationsView';
import SystemConfigView from './components/SystemConfigView';

const viewComponents: Record<View, React.FC<any>> = {
  'Dashboard': Dashboard,
  'Alerts': AlertsView,
  'Sensors': SensorsView,
  'Maintenance': MaintenanceView,
  'Map View': MapView,
  'Planning': PlanningView,
  'Site Survey': SiteSurveyView,
  'Design': DesignView,
  'Approvals': ApprovalsView,
  'Implementation': ImplementationView,
  'Quality Assurance': QualityAssuranceView,
  'Commissioning': CommissioningView,
  'Asset Management': AssetManagementView,
  'System Health': SystemHealthView,
  'Alert History': AlertHistoryView,
  'Technician Performance': TechnicianPerformanceView,
  'User Profile': UserProfileView,
  'Notifications': NotificationsView,
  'System Config': SystemConfigView,
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('Dashboard');
  const [sensorFilter, setSensorFilter] = useState<SensorType | null>(null);

  const handleSetCurrentView = (view: View, type: SensorType | null = null) => {
    setCurrentView(view);
    setSensorFilter(view === 'Sensors' ? type : null);
  };

  const activeAlertsCount = ALERTS.filter(a => a.status !== AlertStatus.Resolved).length;

  // FIX: Explicitly handle rendering for components that require props to satisfy
  // TypeScript's type checking for dynamic components.
  const renderView = () => {
    if (currentView === 'Sensors') {
      return <SensorsView sensorFilter={sensorFilter} />;
    }
    const Component = viewComponents[currentView] || Dashboard;
    return <Component />;
  };

  return (
    <div className="flex h-screen bg-slate-900 font-sans">
      <Sidebar 
        currentView={currentView} 
        setCurrentView={handleSetCurrentView}
        sensorFilter={sensorFilter} 
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header currentView={currentView} activeAlertsCount={activeAlertsCount} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-900 p-4 sm:p-6 lg:p-8">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default App;