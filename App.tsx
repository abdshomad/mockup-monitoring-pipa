
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import AlertsView from './components/AlertsView';
import SensorsView from './components/SensorsView';
import MaintenanceView from './components/MaintenanceView';
import { SensorType, AlertStatus } from './types';
import { ALERTS } from './constants';

export type View = 'Dashboard' | 'Alerts' | 'Sensors' | 'Maintenance';

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