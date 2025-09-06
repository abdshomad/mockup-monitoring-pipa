import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import AlertsView from './components/AlertsView';
import SensorsView from './components/SensorsView';
import MaintenanceView from './components/MaintenanceView';
import PlanningView from './components/PlanningView';
import { SensorType, AlertStatus } from './types';
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

export type View = 
  | 'Dashboard' 
  | 'Alerts' 
  | 'Sensors' 
  | 'Maintenance'
  | 'Map View'
  // Pre-Construction
  | 'Planning'
  | 'Site Survey'
  | 'Design'
  | 'Approvals'
  // Construction
  | 'Implementation'
  | 'Quality Assurance'
  | 'Commissioning'
  // Maintenance
  | 'Asset Management'
  // Reporting
  | 'System Health'
  | 'Alert History'
  | 'Technician Performance'
  // System
  | 'User Profile'
  | 'Notifications'
  | 'System Config';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('Dashboard');
  const [sensorFilter, setSensorFilter] = useState<SensorType | null>(null);

  const handleSetCurrentView = (view: View, type: SensorType | null = null) => {
    setCurrentView(view);
    setSensorFilter(view === 'Sensors' ? type : null);
  };

  const activeAlertsCount = ALERTS.filter(a => a.status !== AlertStatus.Resolved).length;

  const renderView = () => {
    switch (currentView) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Alerts':
        return <AlertsView />;
      case 'Sensors':
        return <SensorsView sensorFilter={sensorFilter} />;
      case 'Maintenance':
        return <MaintenanceView />;
      case 'Planning':
        return <PlanningView />;
      case 'Map View':
        return <MapView />;
      case 'Site Survey':
        return <SiteSurveyView />;
      case 'Design':
        return <DesignView />;
      case 'Approvals':
        return <ApprovalsView />;
      case 'Implementation':
        return <ImplementationView />;
      case 'Quality Assurance':
        return <QualityAssuranceView />;
      case 'Commissioning':
        return <CommissioningView />;
      case 'Asset Management':
        return <AssetManagementView />;
      case 'System Health':
        return <SystemHealthView />;
      case 'Alert History':
        return <AlertHistoryView />;
      case 'Technician Performance':
        return <TechnicianPerformanceView />;
      case 'User Profile':
        return <UserProfileView />;
      case 'Notifications':
        return <NotificationsView />;
      case 'System Config':
        return <SystemConfigView />;
      default:
        return <Dashboard />;
    }
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