import React, { useMemo } from 'react';
import { ICONS } from '../constants';
import { TimelineEvent, AlertSeverity } from '../types';
import { Clock } from 'lucide-react';

interface TimeMachineControlsProps {
    startTime: number;
    endTime: number;
    currentTime: number;
    isPlaying: boolean;
    playbackSpeed: number;
    events: TimelineEvent[];
    onTimeChange: (time: number) => void;
    onPlayPauseToggle: () => void;
    onSpeedChange: () => void;
    onReset: () => void;
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

const TimeMachineControls: React.FC<TimeMachineControlsProps> = ({
    startTime,
    endTime,
    currentTime,
    isPlaying,
    playbackSpeed,
    events,
    onTimeChange,
    onPlayPauseToggle,
    onSpeedChange,
    onReset,
}) => {
    const formattedTime = useMemo(() => new Date(currentTime).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }), [currentTime]);

    return (
        <div className="absolute bottom-0 left-0 right-0 bg-slate-800/80 backdrop-blur-sm p-4 rounded-t-2xl shadow-lg border-t border-slate-700 animate-fade-in">
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center space-x-2">
                    <Clock className="h-6 w-6 text-cyan-400" />
                    <h3 className="text-lg font-semibold text-white">Time Machine</h3>
                </div>
                <div className="text-center w-48 bg-slate-700/50 p-2 rounded-lg">
                    <p className="text-sm font-semibold text-slate-200">{formattedTime}</p>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                    <button 
                        onClick={onReset} 
                        className="p-2 rounded-full bg-slate-700 text-white hover:bg-slate-600 transition-colors"
                        aria-label="Reset to start"
                    >
                        {ICONS.rewind}
                    </button>
                    <button 
                        onClick={onPlayPauseToggle} 
                        className="p-2 rounded-full bg-cyan-500 text-white hover:bg-cyan-600 transition-colors"
                        aria-label={isPlaying ? "Pause" : "Play"}
                    >
                        {isPlaying ? ICONS.pause : ICONS.play}
                    </button>
                    <button 
                        onClick={onSpeedChange} 
                        className="p-2 rounded-full bg-slate-700 text-white hover:bg-slate-600 transition-colors flex items-center space-x-1"
                        aria-label="Change playback speed"
                    >
                        {ICONS.fastForward}
                        <span className="text-xs font-bold w-4">{playbackSpeed}x</span>
                    </button>
                </div>
                <div className="flex-grow flex items-center space-x-3">
                     <span className="text-xs text-slate-400 font-mono">{new Date(startTime).toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' })}</span>
                     <div className="relative w-full h-12 flex items-center">
                        <div className="absolute top-1/2 -translate-y-1/2 w-full h-2 bg-slate-700 rounded-lg"></div>
                        
                        {/* Event Markers */}
                        <div className="absolute w-full h-full pointer-events-none">
                           {events.map(event => {
                               const percent = ((event.timestamp - startTime) / (endTime - startTime)) * 100;
                               if (percent < 0 || percent > 100) return null;

                               return (
                                   <div
                                       key={event.id}
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
                           })}
                        </div>

                         <input
                            type="range"
                            min={startTime}
                            max={endTime}
                            value={currentTime}
                            onChange={(e) => onTimeChange(Number(e.target.value))}
                            className="time-machine-slider w-full h-2 appearance-none cursor-pointer bg-transparent focus:outline-none relative z-10"
                        />
                     </div>
                     <span className="text-xs text-slate-400 font-mono">{new Date(endTime).toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' })}</span>
                </div>
            </div>
        </div>
    );
};

export default TimeMachineControls;