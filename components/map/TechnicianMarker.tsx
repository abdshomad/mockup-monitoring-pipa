import React from 'react';
import { Technician, TechnicianStatus } from '../../types';
import { HardHat } from 'lucide-react';

interface TechnicianMarkerProps {
    technician: Technician;
}

const TechnicianMarker: React.FC<TechnicianMarkerProps> = ({ technician }) => {
    if (!technician.currentLocation) return null;

    const { x, y } = technician.currentLocation;
    const isAvailable = technician.availability === TechnicianStatus.Available;
    const color = isAvailable ? '#22d3ee' : '#f59e0b'; // cyan-400 or amber-500

    return (
        <g transform={`translate(${x}, ${y})`} className="cursor-pointer group">
            <circle r={14} fill={color} stroke="#1e293b" strokeWidth="2" opacity="0.5" />
            <circle r={10} fill={color} stroke="#f8fafc" strokeWidth="2" />
             <foreignObject x="-8" y="-8" width="16" height="16">
                <HardHat className="text-slate-900" size={16} />
            </foreignObject>

            <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                 <rect x="-50" y="-35" width="100" height="30" rx="5" fill="rgba(15, 23, 42, 0.9)" />
                 <text x="0" y="-22" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontWeight="bold">{technician.name}</text>
                 <text x="0" y="-10" textAnchor="middle" fill="#94a3b8" fontSize="9">Team {technician.team}</text>
            </g>
        </g>
    );
};

export default TechnicianMarker;
