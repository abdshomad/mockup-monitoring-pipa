
import React, { useMemo } from 'react';
import IndonesiaPipelineMap from './PipelineDigitalTwin';
import { ALERTS } from '../constants';
import TimeMachineControls from './TimeMachineControls';
import { TimelineEvent } from '../types';
import TimeMachineAlertModal from './TimeMachineAlertModal';
import { useTimeMachine } from '../hooks/useTimeMachine';

const PLAYBACK_SPEEDS = [1, 4, 8]; // User-selectable speeds

const MapView: React.FC = () => {
    const {
        timeRange,
        playbackTime,
        isPlaying,
        userPlaybackSpeed,
        sensorsAtTime,
        alertsAtTime,
        focusedAlert,
        handleTimeChange,
        handlePlayPause,
        handleSpeedChange,
        handleReset,
        handleCloseAlertModal,
    } = useTimeMachine(PLAYBACK_SPEEDS);

    const timelineEvents = useMemo((): TimelineEvent[] => {
        return ALERTS.map(alert => {
            const lastAction = alert.history && alert.history.length > 0 ? alert.history[alert.history.length - 1] : null;
            return {
                id: alert.id,
                timestamp: new Date(alert.timestamp).getTime(),
                description: `Alert ${alert.id}: ${alert.type}`,
                severity: alert.severity,
                operator: lastAction?.operator,
            };
        })
        .filter(event => event.timestamp >= timeRange.startTime && event.timestamp <= timeRange.endTime)
        .sort((a, b) => a.timestamp - b.timestamp); // Ensure events are sorted chronologically
    }, [timeRange]);


    return (
        <div className="space-y-6 h-full flex flex-col">
            <TimeMachineAlertModal alert={focusedAlert} onClose={handleCloseAlertModal} />
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Peta Pipa Transmisi Cisem-1 & Pertagas</h2>
            </div>
            <div className="bg-slate-800 p-6 rounded-2xl shadow-lg flex-grow flex flex-col">
                <p className="text-slate-300 mb-4 flex-shrink-0">
                    Peta interaktif ini menampilkan Jaringan Pipa Transmisi Cisem-1 dan integrasinya dengan Pipa Pertagas di Jawa Timur. Gunakan kontrol Time Machine di bawah untuk meninjau aktivitas sensor dan menganalisis peristiwa historis.
                </p>
                <div className="flex-grow bg-slate-700 rounded-lg overflow-hidden relative">
                    <IndonesiaPipelineMap 
                        sensors={sensorsAtTime} 
                        alerts={alertsAtTime} 
                        currentTime={new Date(playbackTime)} 
                    />
                    <TimeMachineControls
                        startTime={timeRange.startTime}
                        endTime={timeRange.endTime}
                        currentTime={playbackTime}
                        isPlaying={isPlaying}
                        playbackSpeed={userPlaybackSpeed}
                        events={timelineEvents}
                        onTimeChange={handleTimeChange}
                        onPlayPauseToggle={handlePlayPause}
                        onSpeedChange={handleSpeedChange}
                        onReset={handleReset}
                    />
                </div>
            </div>
        </div>
    );
};

export default MapView;