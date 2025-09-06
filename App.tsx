
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import AlertsView from './components/AlertsView';
import SensorsView from './components/SensorsView';

export type View = 'Dashboard' | 'Alerts' | 'Sensors';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('Dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Alerts':
        return <AlertsView />;
      case 'Sensors':
        return <SensorsView />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-900 font-sans">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header currentView={currentView} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-900 p-4 sm:p-6 lg:p-8">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default App;
