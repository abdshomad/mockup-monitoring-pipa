
import React, { useMemo } from 'react';
import { TimelineEvent } from '../types';
import { Clock } from 'lucide-react';
import PlaybackControls from './time-machine/PlaybackControls';
import TimelineSlider from './time-machine/TimelineSlider';

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

const TimeMachineControls: React.FC<TimeMachineControlsProps> = (props) => {
    const { currentTime } = props;

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
                <PlaybackControls
                    isPlaying={props.isPlaying}
                    playbackSpeed={props.playbackSpeed}
                    onReset={props.onReset}
                    onPlayPauseToggle={props.onPlayPauseToggle}
                    onSpeedChange={props.onSpeedChange}
                />
                <TimelineSlider
                    startTime={props.startTime}
                    endTime={props.endTime}
                    currentTime={props.currentTime}
                    events={props.events}
                    onTimeChange={props.onTimeChange}
                />
            </div>
        </div>
    );
};

export default TimeMachineControls;
