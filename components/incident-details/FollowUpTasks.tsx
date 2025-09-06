import React, { useState } from 'react';
import { FollowUpTask, FollowUpTaskStatus, Technician } from '../../types';
import { getFollowUpStatusBadgeClass } from '../../utils/badgeStyles';

interface FollowUpTasksProps {
    tasks: FollowUpTask[];
    isEditing: boolean;
    onUpdateTaskStatus: (taskId: string, newStatus: FollowUpTaskStatus) => void;
    onAddTask: (task: Omit<FollowUpTask, 'id' | 'status'>) => void;
    technicians: Technician[];
}

const FollowUpTasks: React.FC<FollowUpTasksProps> = ({ tasks, isEditing, onUpdateTaskStatus, onAddTask, technicians }) => {
    const [newTask, setNewTask] = useState({
        description: '',
        assignedTo: technicians[0]?.name || '',
        dueDate: '',
    });

    const handleAddTask = () => {
        if (!newTask.description || !newTask.dueDate) {
            alert('Please provide a task description and due date.');
            return;
        }
        onAddTask(newTask);
        setNewTask({ description: '', assignedTo: technicians[0]?.name || '', dueDate: '' });
    };
    
    return (
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
                        {tasks.map(task => (
                            <tr key={task.id} className="border-b border-slate-700">
                                <td className="px-4 py-3 text-slate-200">{task.description}</td>
                                <td className="px-4 py-3">{task.assignedTo}</td>
                                <td className="px-4 py-3">{task.dueDate}</td>
                                <td className="px-4 py-3">
                                    {isEditing ? (
                                        <select value={task.status} onChange={(e) => onUpdateTaskStatus(task.id, e.target.value as FollowUpTaskStatus)} className="bg-slate-700 text-white text-xs rounded-md p-1 border border-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-500">
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
                                <td className="p-2"><input type="text" placeholder="New task description..." value={newTask.description} onChange={(e) => setNewTask({...newTask, description: e.target.value})} className="w-full bg-slate-600 text-white placeholder-slate-400 rounded p-1.5 text-xs border border-slate-500" /></td>
                                <td className="p-2">
                                    <select value={newTask.assignedTo} onChange={(e) => setNewTask({...newTask, assignedTo: e.target.value})} className="w-full bg-slate-600 text-white rounded p-1.5 text-xs border border-slate-500">
                                        {technicians.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                                    </select>
                                </td>
                                <td className="p-2"><input type="date" value={newTask.dueDate} onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})} className="w-full bg-slate-600 text-white rounded p-1.5 text-xs border border-slate-500" /></td>
                                <td></td>
                                <td className="p-2"><button onClick={handleAddTask} className="w-full px-2 py-1.5 bg-cyan-500 text-white text-xs font-semibold rounded hover:bg-cyan-600">Add</button></td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {tasks.length === 0 && !isEditing && (
                    <p className="text-center text-slate-500 py-6">No follow-up actions assigned.</p>
                )}
            </div>
        </div>
    );
};

export default FollowUpTasks;
