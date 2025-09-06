import React from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import AIPriorityTasksModal from './components/AIPriorityTasksModal';
import AIAssistant from './components/AIAssistant';
import { ICONS, ALERTS } from './constants';
import { AlertWorkflowStage } from './types';
import { useAppController } from './hooks/useAppController';
import MainContent from './components/MainContent';

const App: React.FC = () => {
  const controller = useAppController();
  const activeAlertsCount = ALERTS.filter(a => a.stage !== AlertWorkflowStage.Resolved).length;

  return (
    <div className="flex h-screen bg-slate-900 font-sans">
      <AIPriorityTasksModal 
        isOpen={controller.isPriorityModalOpen} 
        onClose={() => controller.setIsPriorityModalOpen(false)} 
      />
      <Sidebar 
        currentView={controller.currentView} 
        setCurrentView={controller.handleSetCurrentView}
        sensorFilter={controller.sensorFilter} 
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
            currentView={controller.currentView} 
            activeAlertsCount={activeAlertsCount}
            onShowPriorityTasks={() => controller.setIsPriorityModalOpen(true)}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-900 p-4 sm:p-6 lg:p-8">
          <MainContent {...controller} />
        </main>
      </div>

      <AIAssistant 
        isOpen={controller.isAssistantOpen} 
        onClose={() => controller.setIsAssistantOpen(false)} 
        currentView={controller.currentView} 
        sensorFilter={controller.sensorFilter} 
      />
      
      <button
        onClick={() => controller.setIsAssistantOpen(true)}
        className={`chat-fab fixed bottom-8 right-8 h-16 w-16 bg-purple-600 text-white rounded-full shadow-lg flex items-center justify-center z-30 ${controller.isAssistantOpen ? 'scale-0' : 'scale-100'}`}
        aria-label="Open AI Assistant"
      >
        {React.cloneElement(ICONS.ai, { className: "h-8 w-8" })}
      </button>
    </div>
  );
};

export default App;
