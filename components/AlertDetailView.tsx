
import React, { useState } from 'react';
import { ALERT_DETAILS } from '../constants/alert-details';
import { ICONS } from '../constants';
import { Alert, AlertWorkflowStage } from '../types';
import KanbanView from './alert-workflow/KanbanView';
import TimelineView from './alert-workflow/TimelineView';
import ResolutionModal from './ResolutionModal';
import AIIncidentReportModal from './AIIncidentReportModal';
import AlertSummary from './alert-details/AlertSummary';
import AlertInformation from './alert-details/AlertInformation';
import AIAnalysis from './alert-details/AIAnalysis';
import MultimediaAttachments from './alert-details/MultimediaAttachments';
import { useAlertWorkflow } from '../hooks/useAlertWorkflow';

interface AlertDetailViewProps {
  alert: Alert | undefined;
  onBack: () => void;
}

type AlertDetailTab = 'details' | 'timeline' | 'kanban';

const AlertDetailView: React.FC<AlertDetailViewProps> = ({ alert, onBack }) => {
  const [activeTab, setActiveTab] = useState<AlertDetailTab>('details');
  const {
      currentAlert,
      isResolutionModalOpen,
      isReportModalOpen,
      alertForReport,
      handleStageChange,
      handleConfirmResolution,
      setIsResolutionModalOpen,
      setCurrentAlert,
      setIsReportModalOpen,
  } = useAlertWorkflow(alert);


  const details = currentAlert ? ALERT_DETAILS[currentAlert.type] : null;
  const aiAnalysis = details?.aiInsights;

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
      case 'timeline':
        return <TimelineView history={currentAlert.history || []} />;
      case 'kanban':
        return <KanbanView alert={currentAlert} onStageChange={handleStageChange} />;
      case 'details':
      default:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-6">
              <AlertSummary alert={currentAlert} />
            </div>
            <div className="lg:col-span-2 space-y-6">
              {details && <AlertInformation details={details} />}
              {aiAnalysis && <AIAnalysis aiAnalysis={aiAnalysis} />}
            </div>
            <div className="lg:col-span-3">
              <MultimediaAttachments 
                currentAlert={currentAlert}
                setCurrentAlert={setCurrentAlert}
              />
            </div>
          </div>
        );
    }
  }

  return (
    <>
      <ResolutionModal 
        isOpen={isResolutionModalOpen}
        onClose={() => setIsResolutionModalOpen(false)}
        onConfirm={handleConfirmResolution}
      />
      <AIIncidentReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        alert={alertForReport}
      />
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
              <h2 className="text-2xl font-bold text-white">Alert Details: <span className="text-cyan-400">{currentAlert.id}</span></h2>
              <p className="text-slate-400">{currentAlert.type}</p>
          </div>
          <div className="flex items-center space-x-4">
              {currentAlert.stage !== AlertWorkflowStage.Resolved && (
                <button 
                    onClick={() => window.alert(`Alert ${currentAlert.id} has been promoted to a new incident.`)}
                    className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors flex items-center space-x-2"
                >
                    {React.cloneElement(ICONS.security, { className: 'h-5 w-5' })}
                    <span>Promote to Incident</span>
                </button>
              )}
              <button onClick={onBack} className="px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors">
                  &larr; Back to Alerts Log
              </button>
          </div>
        </div>

        <div className="border-b border-slate-700 mb-4">
            <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                {(['details', 'timeline', 'kanban'] as AlertDetailTab[]).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`${
                            activeTab === tab
                                ? 'border-cyan-400 text-cyan-400'
                                : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-300'
                        } whitespace-nowrap capitalize py-3 px-1 border-b-2 font-medium text-sm transition-colors`}
                    >
                        {tab}
                    </button>
                ))}
            </nav>
        </div>

        <div className="animate-fade-in">
          {renderContent()}
        </div>
      </div>
    </>
  );
};

export default AlertDetailView;