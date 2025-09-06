import React from 'react';
import { ALERT_DETAILS } from '../constants/alert-details';
import { ICONS } from '../constants';
import { Alert, AlertSeverity, AlertStatus } from '../types';
import { useGeminiAnalysis, AIAnalysis } from '../hooks/useGeminiAnalysis';

interface AlertDetailViewProps {
  alert: Alert | undefined;
  onBack: () => void;
}

const getSeverityBadgeClass = (severity: AlertSeverity) => {
    switch (severity) {
        case AlertSeverity.Critical: return 'bg-red-500/20 text-red-400';
        case AlertSeverity.High: return 'bg-orange-500/20 text-orange-400';
        case AlertSeverity.Medium: return 'bg-yellow-500/20 text-yellow-400';
        case AlertSeverity.Low: return 'bg-blue-500/20 text-blue-400';
        default: return 'bg-slate-500/20 text-slate-400';
    }
};

const getStatusBadgeClass = (status: AlertStatus) => {
    switch (status) {
        case AlertStatus.New: return 'bg-cyan-500/20 text-cyan-400';
        case AlertStatus.Acknowledged: return 'bg-purple-500/20 text-purple-400';
        case AlertStatus.InProgress: return 'bg-indigo-500/20 text-indigo-400';
        case AlertStatus.Resolved: return 'bg-green-500/20 text-green-400';
        default: return 'bg-slate-500/20 text-slate-400';
    }
};

const AILoader: React.FC = () => (
    <div className="flex flex-col items-center justify-center text-center text-slate-400 p-8">
        <svg className="animate-spin h-8 w-8 text-purple-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="font-semibold text-slate-300">Analyzing alert with Gemini...</p>
        <p className="text-sm">This may take a moment.</p>
    </div>
);

const AlertDetailView: React.FC<AlertDetailViewProps> = ({ alert, onBack }) => {
  const details = alert ? ALERT_DETAILS[alert.type] : null;
  const [analyze, { data: aiAnalysis, loading: isLoading, error }] = useGeminiAnalysis();

  const handleAnalyze = () => {
    if (alert) {
        analyze(alert);
    }
  };

  if (!alert) {
    return (
      <div className="text-center p-10">
        <h2 className="text-xl text-red-400">Alert not found.</h2>
        <button onClick={onBack} className="mt-4 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600">
          Back to Alerts
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
            <h2 className="text-2xl font-bold text-white">Alert Details: <span className="text-cyan-400">{alert.id}</span></h2>
            <p className="text-slate-400">{alert.type}</p>
        </div>
        <button onClick={onBack} className="px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors">
            &larr; Back to Alerts Log
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-white">Summary</h3>
                <button
                    onClick={handleAnalyze}
                    disabled={isLoading}
                    className="flex items-center px-3 py-1.5 bg-purple-600 text-white text-xs font-semibold rounded-full hover:bg-purple-700 transition-colors disabled:bg-purple-800/50 disabled:cursor-not-allowed shadow-md"
                >
                    {ICONS.ai}
                    <span className="ml-2">{isLoading ? 'Analyzing...' : 'Analyze with AI'}</span>
                </button>
            </div>
            <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                    <span className="text-slate-400">Timestamp</span>
                    <span className="font-mono text-white">{alert.timestamp}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-slate-400">Sensor ID</span>
                    <span className="font-mono text-white">{alert.sensorId}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-slate-400">Segment</span>
                    <span className="font-mono text-white">{alert.location.segment}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-slate-400">Severity</span>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getSeverityBadgeClass(alert.severity)}`}>
                        {alert.severity}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-slate-400">Status</span>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeClass(alert.status)}`}>
                        {alert.status}
                    </span>
                </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          {details ? (
            <>
              <div className="bg-slate-800 p-6 rounded-2xl shadow-lg animate-fade-in">
                <div className="flex items-center mb-3">
                    <span className="text-cyan-400 mr-3">{ICONS.description}</span>
                    <h3 className="font-semibold text-white">Description</h3>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{details.description}</p>
              </div>

              <div className="bg-slate-800 p-6 rounded-2xl shadow-lg animate-fade-in" style={{animationDelay: '100ms'}}>
                <div className="flex items-center mb-3">
                    <span className="text-orange-400 mr-3">{ICONS.causes}</span>
                    <h3 className="font-semibold text-white">Potential Causes</h3>
                </div>
                <ul className="space-y-2 text-sm list-disc list-inside text-slate-300">
                  {details.potentialCauses.map((cause, index) => (
                    <li key={index}>{cause}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-800 p-6 rounded-2xl shadow-lg animate-fade-in" style={{animationDelay: '200ms'}}>
                <div className="flex items-center mb-3">
                    <span className="text-green-400 mr-3">{ICONS.actions}</span>
                    <h3 className="font-semibold text-white">Recommended Actions</h3>
                </div>
                <ul className="space-y-2 text-sm list-disc list-inside text-slate-300">
                  {details.recommendedActions.map((action, index) => (
                    <li key={index}>{action}</li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <div className="bg-slate-800 p-6 rounded-2xl shadow-lg text-center text-slate-400">
                No detailed information available for this alert type.
            </div>
          )}
           {(isLoading || error || aiAnalysis) && (
              <div className="bg-slate-800 p-6 rounded-2xl shadow-lg border border-purple-500/30 animate-fade-in">
                  {isLoading && <AILoader />}
                  {error && <p className="text-center text-red-400">{error}</p>}
                  {aiAnalysis && (
                      <div className="space-y-4">
                          <div className="flex items-center mb-3 text-purple-400">
                                <span className="mr-3 h-6 w-6">{ICONS.ai}</span>
                                <h3 className="font-semibold text-white text-lg">Gemini AI Analysis</h3>
                          </div>
                          <div>
                            <h4 className="font-semibold text-purple-300 mb-1">Summary</h4>
                            <p className="text-sm text-slate-300 leading-relaxed">{aiAnalysis.summary}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-purple-300 mb-2">Probable Causes</h4>
                            <ul className="space-y-1.5 text-sm list-disc list-inside text-slate-300">
                                {aiAnalysis.probableCauses.map((cause, i) => <li key={i}>{cause}</li>)}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-purple-300 mb-2">Recommended Actions</h4>
                            <ul className="space-y-1.5 text-sm list-disc list-inside text-slate-300">
                                {aiAnalysis.recommendedActions.map((action, i) => <li key={i}>{action}</li>)}
                            </ul>
                          </div>
                      </div>
                  )}
              </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertDetailView;
