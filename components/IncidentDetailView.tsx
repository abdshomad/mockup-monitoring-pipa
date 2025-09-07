
import React, { useState, useEffect, useMemo } from 'react';
import { Incident, FollowUpTask, FollowUpTaskStatus, Alert, IncidentLogEntry, IncidentStatus, AlertSeverity } from '../../types';
import { TECHNICIANS, ICONS } from '../../constants';
import IncidentSummary from './incident-details/IncidentSummary';
import LinkedAlerts from './incident-details/LinkedAlerts';
import IncidentEventLog from './incident-details/IncidentEventLog';
import FollowUpTasks from './incident-details/FollowUpTasks';
import AIBriefingGenerator from './incident-details/AIBriefingGenerator';
import AIVideoBriefingModal from './AIVideoBriefingModal';

interface IncidentDetailViewProps {
  incident: Incident | undefined;
  linkedAlerts: Alert[];
  onBack: () => void;
  onUpdate: (incident: Incident) => void;
}

const IncidentDetailView: React.FC<IncidentDetailViewProps> = ({ incident, linkedAlerts, onBack, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedIncident, setEditedIncident] = useState<Incident | undefined>(incident);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  useEffect(() => { setEditedIncident(incident); }, [incident]);
  
  const hasBrief = useMemo(() => incident?.log.some(entry => entry.type === 'ai_brief'), [incident]);

  if (!incident || !editedIncident) {
    return (
      <div className="text-center p-10">
        <h2 className="text-xl text-red-400">Incident not found.</h2>
        <button onClick={onBack} className="mt-4 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600">
          Back to Log
        </button>
      </div>
    );
  }
  
  const handleSave = () => { onUpdate(editedIncident); setIsEditing(false); };
  const handleCancel = () => { setEditedIncident(incident); setIsEditing(false); };
  
  const handleUpdateFollowUpStatus = (taskId: string, newStatus: FollowUpTaskStatus) => {
      const updatedTasks = (editedIncident.followUpTasks || []).map(task => 
          task.id === taskId ? { ...task, status: newStatus } : task
      );
      setEditedIncident({ ...editedIncident, followUpTasks: updatedTasks });
  };

  const handleAddFollowUpTask = (newTask: Omit<FollowUpTask, 'id' | 'status'>) => {
      const taskToAdd: FollowUpTask = { id: `FUT-${Date.now()}`, status: FollowUpTaskStatus.Open, ...newTask };
      const updatedTasks = [...(editedIncident.followUpTasks || []), taskToAdd];
      setEditedIncident({ ...editedIncident, followUpTasks: updatedTasks });
  };
  
  const handleBriefGenerated = (brief: IncidentLogEntry) => {
    if (!incident) return;
    // Insert the brief as the second item in the log
    const updatedLog = [incident.log[0], brief, ...incident.log.slice(1)];
    onUpdate({ ...incident, log: updatedLog });
  };

  const handleVideoBriefingComplete = (videoUrl: string) => {
    const updatedIncident = { ...incident, videoBriefingUrl: videoUrl };
    onUpdate(updatedIncident);
    setEditedIncident(updatedIncident); // Update local state as well
  };

  const shouldShowAIBriefGenerator = !hasBrief && 
    (incident.severity === AlertSeverity.Critical || incident.severity === AlertSeverity.High) &&
    (incident.status === IncidentStatus.Active || incident.status === IncidentStatus.Monitoring);

  return (
    <>
      <AIVideoBriefingModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        incident={incident}
        onBriefingComplete={handleVideoBriefingComplete}
      />
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Incident: <span className="text-cyan-400">{incident.id}</span></h2>
          <div className="flex items-center space-x-4">
              {isEditing ? (
                  <>
                      <button onClick={handleCancel} className="px-4 py-2 bg-slate-600 text-white font-semibold rounded-lg hover:bg-slate-500">Cancel</button>
                      <button onClick={handleSave} className="px-4 py-2 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600">Save</button>
                  </>
              ) : (
                  <>
                      {incident.status === IncidentStatus.Resolved && (
                        <button 
                            onClick={() => setIsVideoModalOpen(true)}
                            className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
                        >
                            {React.cloneElement(ICONS.video, { className: 'h-5 w-5' })}
                            <span>{incident.videoBriefingUrl ? 'View' : 'Generate'} Video Briefing</span>
                        </button>
                      )}
                      <button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-slate-600 text-white font-semibold rounded-lg hover:bg-slate-500">Edit</button>
                      <button onClick={onBack} className="px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600">&larr; Back to Log</button>
                  </>
              )}
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
              <IncidentSummary incident={editedIncident} isEditing={isEditing} setEditedIncident={setEditedIncident} technicians={TECHNICIANS} />
              <LinkedAlerts alerts={linkedAlerts} />
          </div>
          <div className="lg:col-span-2 space-y-6">
              {shouldShowAIBriefGenerator && <AIBriefingGenerator incident={incident} onBriefGenerated={handleBriefGenerated} />}
              <IncidentEventLog log={incident.log} />
              <FollowUpTasks tasks={editedIncident.followUpTasks || []} isEditing={isEditing} onUpdateTaskStatus={handleUpdateFollowUpStatus} onAddTask={handleAddFollowUpTask} technicians={TECHNICIANS} />
          </div>
        </div>
      </div>
    </>
  );
};

export default IncidentDetailView;