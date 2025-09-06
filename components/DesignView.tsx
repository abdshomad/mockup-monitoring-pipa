import React, { useState } from 'react';

type DesignTab = 'Architecture' | 'Topology' | 'DataFlow';

const SystemArchitectureDiagram: React.FC = () => (
    <svg width="100%" height="300" viewBox="0 0 400 200" className="bg-slate-700/50 rounded-lg">
        <defs><marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" /></marker></defs>
        <text x="10" y="20" fill="#cbd5e1" fontSize="12" fontWeight="bold">System Architecture</text>
        {/* Sensor Tier */}
        <rect x="20" y="40" width="80" height="40" rx="5" fill="#334155" stroke="#475569" />
        <text x="35" y="65" fill="#e2e8f0" fontSize="10">Sensors</text>
        {/* Gateway Tier */}
        <rect x="160" y="40" width="80" height="40" rx="5" fill="#334155" stroke="#475569" />
        <text x="175" y="65" fill="#e2e8f0" fontSize="10">Gateways</text>
        {/* Cloud Tier */}
        <rect x="300" y="40" width="80" height="120" rx="5" fill="#334155" stroke="#475569" />
        <text x="325" y="65" fill="#e2e8f0" fontSize="10">Cloud</text>
        <text x="315" y="105" fill="#e2e8f0" fontSize="10">Processing</text>
        <text x="320" y="145" fill="#e2e8f0" fontSize="10">Database</text>
        {/* UI Tier */}
        <rect x="160" y="120" width="80" height="40" rx="5" fill="#334155" stroke="#475569" />
        <text x="170" y="145" fill="#e2e8f0" fontSize="10">Web App (UI)</text>
        {/* Arrows */}
        <path d="M100 60 H 160" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
        <path d="M240 60 H 300" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
        <path d="M300 100 V 140" stroke="#64748b" strokeWidth="2" />
        <path d="M240 140 H 300" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
    </svg>
);

const NetworkTopologyDiagram: React.FC = () => (
    <svg width="100%" height="300" viewBox="0 0 500 200" className="bg-slate-700/50 rounded-lg">
        <defs>
            <marker id="arrow-topo" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
            </marker>
        </defs>
        <text x="10" y="20" fill="#cbd5e1" fontSize="12" fontWeight="bold">Network Topology</text>
        
        {/* Sensors */}
        <g>
            <text x="30" y="40" fill="#9ca3af" fontSize="10">Sensors (LoRaWAN)</text>
            <circle cx="50" cy="60" r="8" fill="#4ade80" />
            <circle cx="50" cy="90" r="8" fill="#4ade80" />
            <circle cx="50" cy="120" r="8" fill="#4ade80" />
            <circle cx="50" cy="150" r="8" fill="#4ade80" />
        </g>

        {/* Gateways */}
        <g>
            <text x="180" y="40" fill="#9ca3af" fontSize="10">Field Gateways</text>
            <rect x="200" y="70" width="30" height="20" rx="3" fill="#60a5fa" />
            <rect x="200" y="120" width="30" height="20" rx="3" fill="#60a5fa" />
        </g>
        
        {/* Central Server */}
        <g>
            <text x="380" y="40" fill="#9ca3af" fontSize="10">Central Server / Cloud</text>
            <rect x="400" y="80" width="60" height="50" rx="5" fill="#a78bfa" />
            <path d="M 410 90 L 450 90 M 410 100 L 450 100 M 410 110 L 450 110 M 410 120 L 430 120" stroke="#1e293b" strokeWidth="2" />
        </g>
        
        {/* Connections */}
        <path d="M 58 65 L 200 80" stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" />
        <path d="M 58 85 L 200 80" stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" />
        <path d="M 58 125 L 200 130" stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" />
        <path d="M 58 145 L 200 130" stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" />
        
        <path d="M 230 80 H 350 C 370 80, 380 95, 400 95" stroke="#64748b" strokeWidth="2" fill="none" markerEnd="url(#arrow-topo)" />
        <text x="260" y="75" fill="#9ca3af" fontSize="9">Cellular/Fiber Backbone</text>
        <path d="M 230 130 H 350 C 370 130, 380 115, 400 115" stroke="#64748b" strokeWidth="2" fill="none" markerEnd="url(#arrow-topo)" />
    </svg>
);


const DataFlowDiagram: React.FC = () => (
    <svg width="100%" height="300" viewBox="0 0 600 150" className="bg-slate-700/50 rounded-lg">
         <defs>
            <marker id="dataArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#60a5fa" />
            </marker>
        </defs>
        <text x="10" y="20" fill="#cbd5e1" fontSize="12" fontWeight="bold">Data Flow</text>

        {/* Stages */}
        <g>
            <text x="30" y="50" textAnchor="middle" fill="#e2e8f0" fontSize="10">Sensors</text>
            <text x="30" y="65" textAnchor="middle" fill="#9ca3af" fontSize="9">Acquisition</text>
            <rect x="10" y="70" width="40" height="40" rx="20" fill="#4ade80" />
        </g>
        <g>
            <text x="130" y="50" textAnchor="middle" fill="#e2e8f0" fontSize="10">Gateway</text>
            <text x="130" y="65" textAnchor="middle" fill="#9ca3af" fontSize="9">Transmission</text>
            <rect x="110" y="70" width="40" height="40" rx="5" fill="#60a5fa" />
        </g>
         <g>
            <text x="230" y="50" textAnchor="middle" fill="#e2e8f0" fontSize="10">Cloud Ingest</text>
            <text x="230" y="65" textAnchor="middle" fill="#9ca3af" fontSize="9">Processing</text>
             <path d="M210 90 L 230 70 L 250 90 L 230 110 Z" fill="#a78bfa" />
        </g>
        <g>
            <text x="330" y="50" textAnchor="middle" fill="#e2e8f0" fontSize="10">Database</text>
            <text x="330" y="65" textAnchor="middle" fill="#9ca3af" fontSize="9">Storage</text>
            <ellipse cx="330" cy="90" rx="25" ry="20" fill="#f472b6" />
        </g>
        <g>
            <text x="430" y="50" textAnchor="middle" fill="#e2e8f0" fontSize="10">Analytics</text>
            <text x="430" y="65" textAnchor="middle" fill="#9ca3af" fontSize="9">Alerting</text>
            <rect x="410" y="70" width="40" height="40" rx="5" fill="#f59e0b" />
        </g>
        <g>
            <text x="530" y="50" textAnchor="middle" fill="#e2e8f0" fontSize="10">Dashboard</text>
            <text x="530" y="65" textAnchor="middle" fill="#9ca3af" fontSize="9">Presentation</text>
            <rect x="510" y="70" width="40" height="40" rx="5" fill="#22d3ee" />
        </g>

        {/* Arrows */}
        <path d="M 55 90 H 105" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#dataArrow)" />
        <text x="60" y="85" fill="#9ca3af" fontSize="9">Raw Data</text>
        <path d="M 155 90 H 205" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#dataArrow)" />
        <text x="155" y="85" fill="#9ca3af" fontSize="9">Encrypted</text>
        <path d="M 255 90 H 300" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#dataArrow)" />
        <path d="M 360 90 H 405" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#dataArrow)" />
        <text x="360" y="85" fill="#9ca3af" fontSize="9">Processed</text>
        <path d="M 455 90 H 505" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#dataArrow)" />
        <text x="455" y="85" fill="#9ca3af" fontSize="9">Insights</text>
    </svg>
);


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