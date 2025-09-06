
import React from 'react';
import { Alert, AlertWorkflowStage } from '../../types';

interface KanbanViewProps {
  alert: Alert;
  onStageChange: (newStage: AlertWorkflowStage) => void;
}

const WORKFLOW_STAGES = Object.values(AlertWorkflowStage);

const getStageColors = (stage: AlertWorkflowStage, type: 'bg' | 'text' | 'border') => {
    const colorMap = {
        [AlertWorkflowStage.Triage]: 'cyan',
        [AlertWorkflowStage.Investigating]: 'purple',
        [AlertWorkflowStage.Dispatched]: 'indigo',
        [AlertWorkflowStage.OnSite]: 'blue',
        [AlertWorkflowStage.Resolving]: 'yellow',
        [AlertWorkflowStage.Resolved]: 'green',
    };
    const color = colorMap[stage] || 'slate';
    switch (type) {
        case 'bg': return `bg-${color}-500/20`;
        case 'text': return `text-${color}-400`;
        case 'border': return `border-${color}-500`;
    }
}

const KanbanView: React.FC<KanbanViewProps> = ({ alert, onStageChange }) => {
    const currentStageIndex = WORKFLOW_STAGES.indexOf(alert.stage);
    const nextStage = currentStageIndex < WORKFLOW_STAGES.length - 1 ? WORKFLOW_STAGES[currentStageIndex + 1] : null;

    return (
        <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold mb-6 text-white">Alert Workflow Kanban</h3>
            <div className="flex space-x-4 overflow-x-auto pb-4">
                {WORKFLOW_STAGES.map((stage, index) => (
                    <div key={stage} className="flex-shrink-0 w-64 bg-slate-900/50 rounded-lg p-3">
                        <h4 className={`font-semibold mb-4 ${getStageColors(stage, 'text')}`}>{index + 1}. {stage}</h4>
                        <div className="space-y-3 min-h-[150px]">
                            {alert.stage === stage && (
                                <div className={`p-4 rounded-lg shadow-md border-l-4 ${getStageColors(stage, 'bg')} ${getStageColors(stage, 'border')}`}>
                                    <p className="font-bold text-white text-sm">{alert.id}</p>
                                    <p className="text-xs text-slate-300 mt-1">{alert.type}</p>
                                    <p className="text-xs text-slate-400 mt-2">Severity: {alert.severity}</p>
                                    {nextStage && (
                                        <button 
                                            onClick={() => onStageChange(nextStage)}
                                            className="mt-4 w-full text-sm px-3 py-1.5 bg-cyan-500 text-white font-semibold rounded-md hover:bg-cyan-600 transition-colors"
                                        >
                                            Promote to {nextStage}
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default KanbanView;