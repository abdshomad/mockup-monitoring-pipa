import React from 'react';

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

export default NetworkTopologyDiagram;
