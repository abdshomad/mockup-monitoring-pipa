import React from 'react';

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

export default DataFlowDiagram;
