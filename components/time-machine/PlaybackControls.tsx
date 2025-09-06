
import React from 'react';
import { ICONS } from '../../constants';

interface PlaybackControlsProps {
    isPlaying: boolean;
    playbackSpeed: number;
    onReset: () => void;
    onPlayPauseToggle: () => void;
    onSpeedChange: () => void;
}

const PlaybackControls: React.FC<PlaybackControlsProps> = ({
    isPlaying,
    playbackSpeed,
    onReset,
    onPlayPauseToggle,
    onSpeedChange,
}) => (
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
);

export default PlaybackControls;
