import React, { useState } from 'react';
import KanbanBoardView from './KanbanBoardView';
import AlertsListView from './alerts/AlertsListView';

const AlertsView: React.FC<{
    setSelectedAlertId: (id: string | null) => void;
}> = ({ setSelectedAlertId }) => {
    const [activeTab, setActiveTab] = useState('list');

    return (
        <div className="space-y-6">
             <div className="border-b border-slate-700">
                <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                    <button
                        onClick={() => setActiveTab('list')}
                        className={`${ activeTab === 'list' ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-300'} whitespace-nowrap capitalize py-3 px-1 border-b-2 font-medium text-sm transition-colors`}
                    >
                        List View
                    </button>
                     <button
                        onClick={() => setActiveTab('kanban')}
                        className={`${ activeTab === 'kanban' ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-300'} whitespace-nowrap capitalize py-3 px-1 border-b-2 font-medium text-sm transition-colors`}
                    >
                        Kanban Board
                    </button>
                </nav>
            </div>
            
            <div className="animate-fade-in">
                {activeTab === 'list' ? (
                    <AlertsListView setSelectedAlertId={setSelectedAlertId} />
                ) : (
                    <KanbanBoardView setSelectedAlertId={setSelectedAlertId} />
                )}
            </div>
        </div>
    );
};


export default AlertsView;
