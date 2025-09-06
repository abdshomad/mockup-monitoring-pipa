import React from 'react';

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

export default SystemArchitectureDiagram;
