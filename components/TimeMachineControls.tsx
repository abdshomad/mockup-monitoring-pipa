import React, { useMemo } from 'react';
import { ICONS } from '../constants';
import { TimelineEvent } from '../types';
import { Clock } from 'lucide-react';
import TimelineEventMarker from './time-machine/TimelineEventMarker';

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
                        
                        <div className="absolute w-full h-full pointer-events-none">
                           {events.map(event => (
                               <TimelineEventMarker 
                                   key={event.id} 
                                   event={event} 
                                   startTime={startTime} 
                                   endTime={endTime} 
                               />
                           ))}
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