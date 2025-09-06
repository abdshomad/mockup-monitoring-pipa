import React, { useState, useEffect } from 'react';
import { Incident, Alert, IncidentStatus, AlertSeverity, FollowUpTask, FollowUpTaskStatus, Technician } from '../types';
import { ICONS, TECHNICIANS } from '../constants';

interface IncidentDetailViewProps {
  incident: Incident | undefined;
  linkedAlerts: Alert[];
  onBack: () => void;
  onUpdate: (incident: Incident) => void;
}

const getStatusBadgeClass = (status: IncidentStatus) => {
    switch (status) {
        case IncidentStatus.Active: return 'bg-red-500/20 text-red-400';
        case IncidentStatus.Monitoring: return 'bg-yellow-500/20 text-yellow-400';
        case IncidentStatus.Resolved: return 'bg-green-500/20 text-green-400';
        case IncidentStatus.PostMortem: return 'bg-blue-500/20 text-blue-400';
        default: return 'bg-slate-500/20 text-slate-400';
    }
};

const getSeverityBadgeClass = (severity: AlertSeverity) => {
    switch (severity) {
        case AlertSeverity.Critical: return 'bg-red-500 text-white';
        case AlertSeverity.High: return 'bg-orange-500 text-white';
        case AlertSeverity.Medium: return 'bg-yellow-500 text-black';
        case AlertSeverity.Low: return 'bg-blue-500 text-white';
        default: return 'bg-slate-500 text-white';
    }
};

const getFollowUpStatusBadgeClass = (status: FollowUpTaskStatus) => {
    switch (status) {
        case FollowUpTaskStatus.Open: return 'bg-cyan-500/20 text-cyan-400';
        case FollowUpTaskStatus.InProgress: return 'bg-yellow-500/20 text-yellow-400';
        case FollowUpTaskStatus.Completed: return 'bg-green-500/20 text-green-400';
        default: return 'bg-slate-500/20 text-slate-400';
    }
};


const IncidentDetailView: React.FC<IncidentDetailViewProps> = ({ incident, linkedAlerts, onBack, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedIncident, setEditedIncident] = useState<Incident | undefined>(incident);
  const [newFollowUpTask, setNewFollowUpTask] = useState({
      description: '',
      assignedTo: TECHNICIANS[0]?.name || '',
      dueDate: '',
  });


  useEffect(() => {
    setEditedIncident(incident);
  }, [incident]);

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
  
  const handleSave = () => {
    onUpdate(editedIncident);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedIncident(incident);
    setIsEditing(false);
  };

   const handleUpdateFollowUpStatus = (taskId: string, newStatus: FollowUpTaskStatus) => {
      if (!editedIncident) return;
      const updatedTasks = (editedIncident.followUpTasks || []).map(task => 
          task.id === taskId ? { ...task, status: newStatus } : task
      );
      setEditedIncident({ ...editedIncident, followUpTasks: updatedTasks });
  };

  const handleAddFollowUpTask = () => {
      if (!editedIncident || !newFollowUpTask.description || !newFollowUpTask.dueDate) {
        alert('Please provide a task description and due date.');
        return;
      }
      const newTask: FollowUpTask = {
          id: `FUT-${Date.now()}`,
          status: FollowUpTaskStatus.Open,
          ...newFollowUpTask
      };
      const updatedTasks = [...(editedIncident.followUpTasks || []), newTask];
      setEditedIncident({ ...editedIncident, followUpTasks: updatedTasks });
      // Reset form
      setNewFollowUpTask({
          description: '',
          assignedTo: TECHNICIANS[0]?.name || '',
          dueDate: '',
      });
  };


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
            <h2 className="text-2xl font-bold text-white">Incident Details: <span className="text-cyan-400">{incident.id}</span></h2>
            {isEditing ? (
                <input 
                    type="text"
                    value={editedIncident.title}
                    onChange={(e) => setEditedIncident({ ...editedIncident, title: e.target.value })}
                    className="mt-1 w-full max-w-md bg-slate-700 text-white placeholder-slate-400 rounded-lg p-2 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
            ) : (
                <p className="text-slate-400">{incident.title}</p>
            )}
        </div>
         <div className="flex items-center space-x-4">
            {isEditing ? (
                <>
                    <button onClick={handleCancel} className="px-4 py-2 bg-slate-600 text-white font-semibold rounded-lg hover:bg-slate-500 transition-colors">Cancel</button>
                    <button onClick={handleSave} className="px-4 py-2 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition-colors">Save Changes</button>
                </>
            ) : (
                <>
                    <button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-slate-600 text-white font-semibold rounded-lg hover:bg-slate-500 transition-colors">Edit Incident</button>
                    <button onClick={onBack} className="px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors">
                        &larr; Back to Incident Log
                    </button>
                </>
            )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
            <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
                <h3 className="font-semibold text-white mb-4">Incident Summary</h3>
                <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center"><span className="text-slate-400">Status</span><span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusBadgeClass(incident.status)}`}>{incident.status}</span></div>
                    <div className="flex justify-between items-center"><span className="text-slate-400">Severity</span><span className={`px-3 py-1 text-xs font-bold rounded-full ${getSeverityBadgeClass(incident.severity)}`}>{incident.severity}</span></div>
                    <div className="flex justify-between items-center">
                        <span className="text-slate-400">Commander</span>
                         {isEditing ? (
                            <select 
                                value={editedIncident.incidentCommander} 
                                onChange={(e) => setEditedIncident({ ...editedIncident, incidentCommander: e.target.value })}
                                className="w-40 text-right bg-slate-700 font-mono text-white rounded-md p-1 border border-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                            >
                                {TECHNICIANS.map(tech => <option key={tech.id} value={tech.name}>{tech.name}</option>)}
                            </select>
                        ) : (
                            <span className="font-mono text-white">{incident.incidentCommander}</span>
                        )}
                    </div>
                    <div className="flex justify-between items-center"><span className="text-slate-400">Start Time</span><span className="font-mono text-white">{incident.startTime}</span></div>
                    <div className="flex justify-between items-center"><span className="text-slate-400">End Time</span><span className="font-mono text-white">{incident.endTime || 'Ongoing'}</span></div>
                </div>
                 <div className="mt-4 pt-4 border-t border-slate-700/50">
                    <h4 className="text-slate-400 mb-2">Summary</h4>
                     {isEditing ? (
                        <textarea
                            value={editedIncident.summary}
                            onChange={(e) => setEditedIncident({ ...editedIncident, summary: e.target.value })}
                            rows={4}
                            className="w-full bg-slate-700 text-sm text-white placeholder-slate-400 rounded-lg p-2 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                     ) : (
                        <p className="text-sm text-slate-300">{incident.summary}</p>
                     )}
                 </div>
            </div>
            <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
                <h3 className="font-semibold text-white mb-4">Linked Alerts ({linkedAlerts.length})</h3>
                {linkedAlerts.length > 0 ? (
                    <ul className="space-y-3">
                        {linkedAlerts.map(alert => (
                            <li key={alert.id} className="text-sm p-3 bg-slate-700/50 rounded-lg">
                                <div className="flex justify-between items-center">
                                    <p className="font-semibold text-cyan-400">{alert.id}</p>
                                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${getSeverityBadgeClass(alert.severity)}`}>{alert.severity}</span>
                                </div>
                                <p className="text-xs text-slate-300 mt-1">{alert.type}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-slate-400 py-4">No alerts linked to this incident.</p>
                )}
            </div>
        </div>
        <div className="lg:col-span-2 space-y-6">
             <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
                 <h3 className="text-xl font-semibold mb-4 text-white">Incident Log</h3>
                 <div className="relative pl-6">
                    <div className="absolute top-0 left-0 h-full w-0.5 bg-slate-700/50 translate-x-2.5"></div>
                    <ul className="space-y-6">
                        {incident.log.map((entry, index) => (
                            <li key={index} className="relative pl-6">
                                <div className="absolute -left-2 top-0 w-5 h-5 bg-slate-700 rounded-full ring-4 ring-slate-800 flex items-center justify-center">
                                    {ICONS.dashboard}
                                </div>
                                <div className="ml-4">
                                    <p className="text-md font-semibold text-slate-200">{entry.entry}</p>
                                    <p className="text-sm text-slate-400">by <span className="font-semibold text-slate-300">{entry.operator}</span></p>
                                    <p className="text-xs text-slate-500 mt-1">{entry.timestamp}</p>
                                    {entry.notes && <p className="mt-2 text-sm text-slate-300 bg-slate-700/50 p-2 rounded-md">Note: {entry.notes}</p>}
                                </div>
                            </li>
                        ))}
                    </ul>
                 </div>
            </div>
            <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-white">Follow-Up Actions</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-slate-400">
                        <thead className="text-xs text-slate-300 uppercase bg-slate-700/50">
                            <tr>
                                <th scope="col" className="px-4 py-2">Description</th>
                                <th scope="col" className="px-4 py-2">Assigned To</th>
                                <th scope="col" className="px-4 py-2">Due Date</th>
                                <th scope="col" className="px-4 py-2">Status</th>
                                {isEditing && <th scope="col" className="px-4 py-2"></th>}
                            </tr>
                        </thead>
                        <tbody>
                            {(editedIncident.followUpTasks || []).map(task => (
                                <tr key={task.id} className="border-b border-slate-700">
                                    <td className="px-4 py-3 text-slate-200">{task.description}</td>
                                    <td className="px-4 py-3">{task.assignedTo}</td>
                                    <td className="px-4 py-3">{task.dueDate}</td>
                                    <td className="px-4 py-3">
                                        {isEditing ? (
                                            <select value={task.status} onChange={(e) => handleUpdateFollowUpStatus(task.id, e.target.value as FollowUpTaskStatus)} className="bg-slate-700 text-white text-xs rounded-md p-1 border border-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-500">
                                                {Object.values(FollowUpTaskStatus).map(s => <option key={s} value={s}>{s}</option>)}
                                            </select>
                                        ) : (
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getFollowUpStatusBadgeClass(task.status)}`}>{task.status}</span>
                                        )}
                                    </td>
                                    {isEditing && <td></td>}
                                </tr>
                            ))}
                            {isEditing && (
                                <tr className="bg-slate-700/50">
                                    <td className="p-2"><input type="text" placeholder="New task description..." value={newFollowUpTask.description} onChange={(e) => setNewFollowUpTask({...newFollowUpTask, description: e.target.value})} className="w-full bg-slate-600 text-white placeholder-slate-400 rounded p-1.5 text-xs border border-slate-500" /></td>
                                    <td className="p-2">
                                        <select value={newFollowUpTask.assignedTo} onChange={(e) => setNewFollowUpTask({...newFollowUpTask, assignedTo: e.target.value})} className="w-full bg-slate-600 text-white rounded p-1.5 text-xs border border-slate-500">
                                            {TECHNICIANS.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                                        </select>
                                    </td>
                                    <td className="p-2"><input type="date" value={newFollowUpTask.dueDate} onChange={(e) => setNewFollowUpTask({...newFollowUpTask, dueDate: e.target.value})} className="w-full bg-slate-600 text-white rounded p-1.5 text-xs border border-slate-500" /></td>
                                    <td></td>
                                    <td className="p-2"><button onClick={handleAddFollowUpTask} className="w-full px-2 py-1.5 bg-cyan-500 text-white text-xs font-semibold rounded hover:bg-cyan-600">Add</button></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                     {(editedIncident.followUpTasks || []).length === 0 && !isEditing && (
                        <p className="text-center text-slate-500 py-6">No follow-up actions assigned.</p>
                     )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentDetailView;