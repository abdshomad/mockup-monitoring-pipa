import React, { useState } from 'react';
import SystemArchitectureDiagram from './design/SystemArchitectureDiagram';
import NetworkTopologyDiagram from './design/NetworkTopologyDiagram';
import DataFlowDiagram from './design/DataFlowDiagram';

type DesignTab = 'Architecture' | 'Topology' | 'DataFlow';

const DesignView: React.FC = () => {
    const [activeTab, setActiveTab] = useState<DesignTab>('Architecture');

    const renderContent = () => {
        switch (activeTab) {
            case 'Architecture':
                return <SystemArchitectureDiagram />;
            case 'Topology':
                return <NetworkTopologyDiagram />;
            case 'DataFlow':
                 return <DataFlowDiagram />;
            default:
                return null;
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">System Design & Schematics</h2>
            <div className="bg-slate-800 p-6 rounded-2xl shadow-lg animate-fade-in">
                <div className="border-b border-slate-700 mb-4">
                    <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                        {(['Architecture', 'Topology', 'DataFlow'] as DesignTab[]).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`${
                                    activeTab === tab
                                        ? 'border-cyan-400 text-cyan-400'
                                        : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-300'
                                } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors`}
                            >
                                {tab}
                            </button>
                        ))}
                    </nav>
                </div>
                <div>
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default DesignView;
