
import React, { useState } from 'react';
import { Alert } from '../types';
import KanbanView from './alert-workflow/KanbanView';
import TimelineView from './alert-workflow/TimelineView';
import ResolutionModal from './ResolutionModal';
import AIIncidentReportModal from './AIIncidentReportModal';
import { useAlertWorkflow } from '../hooks/useAlertWorkflow';
import AlertDetailHeader from './alert-details/AlertDetailHeader';
import AlertDetailsTab from './alert-details/AlertDetailsTab';

interface AlertDetailViewProps {
  alert: Alert | undefined;
  onBack: () => void;
  onPromoteToIncident: (alert: Alert) => void;
}

type AlertDetailTab = 'details' | 'timeline' | 'kanban';

const TABS: AlertDetailTab[] = ['details', 'timeline', 'kanban'];

const AlertDetailView: React.FC<AlertDetailViewProps> = ({ alert, onBack, onPromoteToIncident }) => {
  const [activeTab, setActiveTab] = useState<AlertDetailTab>('details');
  const {
      currentAlert, isResolutionModalOpen, isReportModalOpen, alertForReport,
      handleStageChange, handleConfirmResolution, setIsResolutionModalOpen,
      setCurrentAlert, setIsReportModalOpen,
  } = useAlertWorkflow(alert);

  if (!currentAlert) {
    return (
      <div className="text-center p-10">
        <h2 className="text-xl text-red-400">Alert not found.</h2>
        <button onClick={onBack} className="mt-4 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600">
          Back to Alerts
        </button>
      </div>
    );
  }

  const renderContent = () => {
    switch(activeTab) {
      case 'timeline': return <TimelineView history={currentAlert.history || []} />;
      case 'kanban': return <KanbanView alert={currentAlert} onStageChange={handleStageChange} />;
      case 'details':
      default: return <AlertDetailsTab currentAlert={currentAlert} setCurrentAlert={setCurrentAlert} />;
    }
  }

  return (
    <>
      <ResolutionModal isOpen={isResolutionModalOpen} onClose={() => setIsResolutionModalOpen(false)} onConfirm={handleConfirmResolution} />
      <AIIncidentReportModal isOpen={isReportModalOpen} onClose={() => setIsReportModalOpen(false)} alert={alertForReport} />
      
      <div className="space-y-6">
        <AlertDetailHeader alert={currentAlert} onBack={onBack} onPromoteToIncident={onPromoteToIncident} />

        <div className="border-b border-slate-700 mb-4">
            <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                {TABS.map((tab) => (
                    <button key={tab} onClick={() => setActiveTab(tab)}
                        className={`${ activeTab === tab ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-300'} whitespace-nowrap capitalize py-3 px-1 border-b-2 font-medium text-sm transition-colors`}>
                        {tab}
                    </button>
                ))}
            </nav>
        </div>

        <div className="animate-fade-in">{renderContent()}</div>
      </div>
    </>
  );
};

export default AlertDetailView;
