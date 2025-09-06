
import React from 'react';
import { TimelineEvent } from '../../types';
import TimelineEventMarker from './TimelineEventMarker';

interface TimelineSliderProps {
    startTime: number;
    endTime: number;
    currentTime: number;
    events: TimelineEvent[];
    onTimeChange: (time: number) => void;
}

const TimelineSlider: React.FC<TimelineSliderProps> = ({
    startTime,
    endTime,
    currentTime,
    events,
    onTimeChange,
}) => (
    <div className="flex-grow flex items-center space-x-3">
        <span className="text-xs text-slate-400 font-mono">{new Date(startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
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
        <span className="text-xs text-slate-400 font-mono">{new Date(endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
    </div>
);

export default TimelineSlider;
