

import React, { useMemo } from 'react';
import IndonesiaPipelineMap from './PipelineDigitalTwin';
import { ALERTS, TECHNICIANS } from '../constants';
import TimeMachineControls from './TimeMachineControls';
import { TimelineEvent, Incident } from '../types';
import TimeMachineAlertModal from './TimeMachineAlertModal';
import { useTimeMachine } from '../hooks/useTimeMachine';
import IncidentModeUI from './map/IncidentModeUI';


const PLAYBACK_SPEEDS = [1, 4, 8]; // User-selectable speeds

interface MapViewProps {
    incident?: Incident;
    onUpdateIncident: (incident: Incident) => void;
}


const MapView: React.FC<MapViewProps> = ({ incident, onUpdateIncident }) => {
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

    const isIncidentMode = !!incident && (incident.status === 'Active' || incident.status === 'Monitoring');

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
                 {isIncidentMode && (
                    <div className="px-4 py-1.5 bg-red-500/20 text-red-300 font-semibold rounded-full text-sm animate-pulse">
                        INCIDENT RESPONSE MODE
                    </div>
                )}
            </div>
            <div className="bg-slate-800 p-6 rounded-2xl shadow-lg flex-grow flex flex-col">
                <p className="text-slate-300 mb-4 flex-shrink-0">
                    {isIncidentMode 
                        ? `Menanggapi insiden ${incident.id}: ${incident.title}. Gunakan alat di bawah ini untuk mengoordinasikan respons.`
                        : `Peta interaktif ini menampilkan Jaringan Pipa Transmisi Cisem-1 dan integrasinya dengan Pipa Pertagas di Jawa Timur. Gunakan kontrol Time Machine di bawah untuk meninjau aktivitas sensor dan menganalisis peristiwa historis.`
                    }
                </p>
                <div className="flex-grow bg-slate-700 rounded-lg overflow-hidden relative">
                    <IndonesiaPipelineMap 
                        sensors={sensorsAtTime} 
                        alerts={alertsAtTime} 
                        currentTime={new Date(playbackTime)}
                        incident={isIncidentMode ? incident : undefined}
                        isIncidentMode={isIncidentMode}
                    />
                    {isIncidentMode ? (
                        <IncidentModeUI incident={incident} onUpdateIncident={onUpdateIncident} />
                    ) : (
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
                    )}
                </div>
            </div>
        </div>
    );
};

export default MapView;