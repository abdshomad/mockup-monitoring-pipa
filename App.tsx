import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import AlertsView from './components/AlertsView';
import SensorsView from './components/SensorsView';
import MaintenanceView from './components/MaintenanceView';
import PlanningView from './components/PlanningView';
import { SensorType, View, AlertWorkflowStage } from './types';
import { ALERTS, ICONS } from './constants';
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
import AIPriorityTasksModal from './components/AIPriorityTasksModal';
import AIAssistant from './components/AIAssistant';
import IncidentLogView from './components/IncidentLogView';
import KanbanBoardView from './components/KanbanBoardView';
import AlertDetailView from './components/AlertDetailView';

const viewComponents: Record<View, React.FC<any>> = {
  'Dashboard': Dashboard,
  'Alerts': AlertsView,
  'Kanban View': KanbanBoardView,
  'Incident Log': IncidentLogView,
  'Sensors': SensorsView,
  'Scheduled Maintenance': MaintenanceView,
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
  const [selectedAlertId, setSelectedAlertId] = useState<string | null>(null);
  const [isPriorityModalOpen, setIsPriorityModalOpen] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  const handleSetCurrentView = (view: View, type: SensorType | null = null) => {
    setCurrentView(view);
    setSensorFilter(view === 'Sensors' ? type : null);
    setSelectedAlertId(null);
  };

  const activeAlertsCount = ALERTS.filter(a => a.stage !== AlertWorkflowStage.Resolved).length;

  const renderView = () => {
    if (selectedAlertId) {
        const selectedAlert = ALERTS.find(a => a.id === selectedAlertId);
        return <AlertDetailView alert={selectedAlert} onBack={() => setSelectedAlertId(null)} />;
    }

    if (currentView === 'Sensors') {
      return <SensorsView sensorFilter={sensorFilter} />;
    }
    if (currentView === 'Dashboard') {
        return <Dashboard setCurrentView={handleSetCurrentView} />;
    }
     if (currentView === 'Alerts' || currentView === 'Kanban View') {
        const Component = viewComponents[currentView];
        return <Component setSelectedAlertId={setSelectedAlertId} />;
    }

    const Component = viewComponents[currentView] || Dashboard;
    return <Component />;
  };

  return (
    <div className="flex h-screen bg-slate-900 font-sans">
      <AIPriorityTasksModal isOpen={isPriorityModalOpen} onClose={() => setIsPriorityModalOpen(false)} />
      <Sidebar 
        currentView={currentView} 
        setCurrentView={handleSetCurrentView}
        sensorFilter={sensorFilter} 
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
            currentView={currentView} 
            activeAlertsCount={activeAlertsCount}
            onShowPriorityTasks={() => setIsPriorityModalOpen(true)}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-900 p-4 sm:p-6 lg:p-8">
          {renderView()}
        </main>
      </div>

      <AIAssistant isOpen={isAssistantOpen} onClose={() => setIsAssistantOpen(false)} currentView={currentView} sensorFilter={sensorFilter} />
      
      <button
        onClick={() => setIsAssistantOpen(true)}
        className={`chat-fab fixed bottom-8 right-8 h-16 w-16 bg-purple-600 text-white rounded-full shadow-lg flex items-center justify-center z-30 ${isAssistantOpen ? 'scale-0' : 'scale-100'}`}
        aria-label="Open AI Assistant"
      >
        {React.cloneElement(ICONS.ai, { className: "h-8 w-8" })}
      </button>

    </div>
  );
};

export default App;
