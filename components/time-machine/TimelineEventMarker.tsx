import React from 'react';
import { TimelineEvent, AlertSeverity } from '../../types';

interface TimelineEventMarkerProps {
    event: TimelineEvent;
    startTime: number;
    endTime: number;
}

const getSeverityDotColor = (severity: AlertSeverity) => {
    switch (severity) {
        case AlertSeverity.Critical: return 'bg-red-500';
        case AlertSeverity.High: return 'bg-orange-400';
        case AlertSeverity.Medium: return 'bg-yellow-400';
        case AlertSeverity.Low: return 'bg-blue-400';
        default: return 'bg-slate-500';
    }
};

const getSeverityRingColor = (severity: AlertSeverity) => {
    switch (severity) {
        case AlertSeverity.Critical: return 'ring-red-500';
        case AlertSeverity.High: return 'ring-orange-400';
        case AlertSeverity.Medium: return 'ring-yellow-400';
        case AlertSeverity.Low: return 'ring-blue-400';
        default: return 'ring-slate-500';
    }
};

const operatorImageMap: Record<string, string> = {
    'System': 'system',
    'Andi (Control Room)': 'andi',
    'Budi (Control Room)': 'budi',
    'Operator 1': 'op1',
    'Operator 2': 'op2',
    'Siti (Field Tech)': 'siti',
    'Tech Team': 'techteam',
    'Alice Johnson': 'alice',
    'Bob Williams': 'bob',
    'Charlie Brown': 'charlie',
    'Auto-Dispatch': 'autodispatch',
};

const TimelineEventMarker: React.FC<TimelineEventMarkerProps> = ({ event, startTime, endTime }) => {
    const percent = ((event.timestamp - startTime) / (endTime - startTime)) * 100;
    if (percent < 0 || percent > 100) return null;

    return (
        <div
            className="absolute bottom-full mb-4 -translate-x-1/2 group pointer-events-auto"
            style={{ left: `${percent}%` }}
        >
            {event.operator ? (
                <img
                    src={`https://picsum.photos/seed/${operatorImageMap[event.operator] || event.operator}/24/24`}
                    alt={event.operator}
                    className={`w-6 h-6 rounded-full ring-2 ${getSeverityRingColor(event.severity)} bg-slate-600`}
                />
            ) : (
                <div className={`w-2.5 h-2.5 rounded-full ${getSeverityDotColor(event.severity)} ring-2 ring-slate-800`}></div>
            )}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-2 bg-slate-500"></div>
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-max p-2 bg-slate-900/80 backdrop-blur-sm border border-slate-600 text-white text-xs rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20 whitespace-nowrap">
                <div className="font-bold font-mono">{new Date(event.timestamp).toLocaleString([], { hour: '2-digit', minute:'2-digit', second: '2-digit' })}</div>
                <div>{event.description}</div>
                {event.operator && <div className="font-semibold mt-1">Handled by: {event.operator}</div>}
                <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-slate-600"></div>
            </div>
        </div>
    );
};

export default TimelineEventMarker;