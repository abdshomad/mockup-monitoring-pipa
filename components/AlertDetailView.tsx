
import React, { useState, useEffect } from 'react';
import { ALERT_DETAILS } from '../constants/alert-details';
import { ICONS } from '../constants';
import { Alert, AlertSeverity, AlertWorkflowStage, AlertAction } from '../types';
import KanbanView from './alert-workflow/KanbanView';
import TimelineView from './alert-workflow/TimelineView';

interface AlertDetailViewProps {
  alert: Alert | undefined;
  onBack: () => void;
}

type AlertDetailTab = 'details' | 'timeline' | 'kanban';

const getSeverityBadgeClass = (severity: AlertSeverity) => {
    switch (severity) {
        case AlertSeverity.Critical: return 'bg-red-500/20 text-red-400';
        case AlertSeverity.High: return 'bg-orange-500/20 text-orange-400';
        case AlertSeverity.Medium: return 'bg-yellow-500/20 text-yellow-400';
        case AlertSeverity.Low: return 'bg-blue-500/20 text-blue-400';
        default: return 'bg-slate-500/20 text-slate-400';
    }
};

const getStageBadgeClass = (stage: AlertWorkflowStage) => {
    switch (stage) {
        case AlertWorkflowStage.Triage: return 'bg-cyan-500/20 text-cyan-400';
        case AlertWorkflowStage.Investigating: return 'bg-purple-500/20 text-purple-400';
        case AlertWorkflowStage.Dispatched: return 'bg-indigo-500/20 text-indigo-400';
        case AlertWorkflowStage.OnSite: return 'bg-blue-500/20 text-blue-400';
        case AlertWorkflowStage.Resolving: return 'bg-yellow-500/20 text-yellow-400';
        case AlertWorkflowStage.Resolved: return 'bg-green-500/20 text-green-400';
        default: return 'bg-slate-500/20 text-slate-400';
    }
};

const WORKFLOW_STAGES = Object.values(AlertWorkflowStage);

const AlertDetailView: React.FC<AlertDetailViewProps> = ({ alert, onBack }) => {
  const [currentAlert, setCurrentAlert] = useState(alert);
  const [isAiAnalysisOpen, setIsAiAnalysisOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<AlertDetailTab>('details');

  useEffect(() => {
    setCurrentAlert(alert);
  }, [alert]);

  const details = currentAlert ? ALERT_DETAILS[currentAlert.type] : null;
  const aiAnalysis = details?.aiInsights;

  const getFormattedTimestamp = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  const handleStageChange = (newStage: AlertWorkflowStage) => {
    if (currentAlert && currentAlert.stage !== newStage) {
      const newAction: AlertAction = {
        timestamp: getFormattedTimestamp(),
        action: `Moved to ${newStage}`,
        operator: 'Operator 1', // Mock operator
      };
      setCurrentAlert({
        ...currentAlert,
        stage: newStage,
        history: [...(currentAlert.history || []), newAction],
      });
    }
  };

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
              <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
                <h3 className="font-semibold text-white mb-4">Summary</h3>
                <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center"><span className="text-slate-400">Timestamp</span><span className="font-mono text-white">{currentAlert.timestamp}</span></div>
                    <div className="flex justify-between items-center"><span className="text-slate-400">Sensor ID</span><span className="font-mono text-white">{currentAlert.sensorId}</span></div>
                    <div className="flex justify-between items-center"><span className="text-slate-400">Segment</span><span className="font-mono text-white">{currentAlert.location.segment}</span></div>
                    <div className="flex justify-between items-center"><span className="text-slate-400">Severity</span><span className={`px-2 py-1 text-xs font-semibold rounded-full ${getSeverityBadgeClass(currentAlert.severity)}`}>{currentAlert.severity}</span></div>
                    <div className="flex justify-between items-center"><span className="text-slate-400">Stage</span><span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStageBadgeClass(currentAlert.stage)}`}>{currentAlert.stage}</span></div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 space-y-6">
              {details && (
                <>
                  <div className="bg-slate-800 p-6 rounded-2xl shadow-lg"><div className="flex items-center mb-3"><span className="text-cyan-400 mr-3">{ICONS.description}</span><h3 className="font-semibold text-white">Description</h3></div><p className="text-slate-300 text-sm leading-relaxed">{details.description}</p></div>
                  <div className="bg-slate-800 p-6 rounded-2xl shadow-lg"><div className="flex items-center mb-3"><span className="text-orange-400 mr-3">{ICONS.causes}</span><h3 className="font-semibold text-white">Potential Causes</h3></div><ul className="space-y-2 text-sm list-disc list-inside text-slate-300">{details.potentialCauses.map((cause, index) => (<li key={index}>{cause}</li>))}</ul></div>
                  <div className="bg-slate-800 p-6 rounded-2xl shadow-lg"><div className="flex items-center mb-3"><span className="text-green-400 mr-3">{ICONS.actions}</span><h3 className="font-semibold text-white">Recommended Actions</h3></div><ul className="space-y-2 text-sm list-disc list-inside text-slate-300">{details.recommendedActions.map((action, index) => (<li key={index}>{action}</li>))}</ul></div>
                </>
              )}
               {aiAnalysis && (
                  <div className="bg-slate-800 p-6 rounded-2xl border border-purple-500/30 shadow-lg"><button onClick={() => setIsAiAnalysisOpen(!isAiAnalysisOpen)} className="w-full flex justify-between items-center text-left" aria-expanded={isAiAnalysisOpen}><div className="flex items-center text-purple-400"><span className="mr-3 h-6 w-6">{ICONS.ai}</span><h3 className="font-semibold text-white text-lg">AI Analysis</h3></div><svg className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isAiAnalysisOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></button><div className={`transition-all duration-500 ease-in-out overflow-hidden ${isAiAnalysisOpen ? 'max-h-[500px] mt-4 pt-4 border-t border-slate-700/50' : 'max-h-0'}`}><div className="space-y-4"><div><h4 className="font-semibold text-purple-300 mb-1">Summary</h4><p className="text-sm text-slate-300 leading-relaxed">{aiAnalysis.summary}</p></div><div><h4 className="font-semibold text-purple-300 mb-2">Probable Causes</h4><ul className="space-y-1.5 text-sm list-disc list-inside text-slate-300">{aiAnalysis.probableCauses.map((cause, i) => <li key={i}>{cause}</li>)}</ul></div><div><h4 className="font-semibold text-purple-300 mb-2">Recommended Actions</h4><ul className="space-y-1.5 text-sm list-disc list-inside text-slate-300">{aiAnalysis.recommendedActions.map((action, i) => <li key={i}>{action}</li>)}</ul></div></div></div></div>
              )}
            </div>
          </div>
        );
    }
  }


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
            <h2 className="text-2xl font-bold text-white">Alert Details: <span className="text-cyan-400">{currentAlert.id}</span></h2>
            <p className="text-slate-400">{currentAlert.type}</p>
        </div>
        <div className="flex items-center space-x-4">
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
  );
};

export default AlertDetailView;