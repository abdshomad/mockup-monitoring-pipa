import React, { useState, useMemo, useEffect, useRef } from 'react';
import PipelineDigitalTwin from './PipelineDigitalTwin';
import { SENSORS, SENSOR_HISTORY, BASE_SENSORS, ALERTS } from '../constants';
import TimeMachineControls from './TimeMachineControls';
import { Sensor, TimelineEvent, Alert } from '../types';
import TimeMachineAlertModal from './TimeMachineAlertModal';

const MOCK_CURRENT_DATE = new Date('2025-09-06T14:30:00Z');
const TIME_WINDOW_HOURS = 48;
const PLAYBACK_SPEEDS = [1, 4, 8]; // User-selectable speeds


const MapView: React.FC = () => {
    const [playbackTime, setPlaybackTime] = useState(MOCK_CURRENT_DATE.getTime());
    const [isPlaying, setIsPlaying] = useState(false);
    const [userPlaybackSpeed, setUserPlaybackSpeed] = useState(PLAYBACK_SPEEDS[2]);
    const [focusedAlert, setFocusedAlert] = useState<Alert | null>(null);
    const [pausedForAlert, setPausedForAlert] = useState(false);
    const intervalRef = useRef<number | null>(null);

    const timeRange = useMemo(() => {
        const endTime = MOCK_CURRENT_DATE.getTime();
        const startTime = endTime - TIME_WINDOW_HOURS * 60 * 60 * 1000;
        return { startTime, endTime };
    }, []);

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

    const sensorsAtTime = useMemo(() => {
        // Start with a deep copy of the base state of sensors
        const sensorsMap = new Map<string, Sensor>(
            JSON.parse(JSON.stringify(BASE_SENSORS)).map((s: Sensor) => [s.id, s])
        );

        // Apply historical changes up to the playback time
        for (const event of SENSOR_HISTORY) {
            if (new Date(event.timestamp).getTime() <= playbackTime) {
                const sensor = sensorsMap.get(event.sensorId);
                if (sensor) {
                    const { sensorId, ...updates } = event;
                    const updatedSensor = { ...sensor, ...updates, lastSeen: event.timestamp };
                    sensorsMap.set(event.sensorId, updatedSensor);
                }
            } else {
                // Since history is sorted, we can break early
                break;
            }
        }
        
        return Array.from(sensorsMap.values());
    }, [playbackTime]);

    useEffect(() => {
        if (isPlaying) {
            const timeIncrementMs = 1 * 60 * 1000; // Simulate 1 minute per tick
            const intervalDelay = 100; // Tick every 100ms

            intervalRef.current = window.setInterval(() => {
                setPlaybackTime(prevTime => {
                    // Determine effective playback speed for this tick
                    let effectiveSpeed = userPlaybackSpeed;
                    const lookAheadWindowMs = 1 * 60 * 60 * 1000; // 1 hour

                    const nextEvent = timelineEvents.find(event => event.timestamp > prevTime);

                    if (!nextEvent || nextEvent.timestamp > prevTime + lookAheadWindowMs) {
                        // If no upcoming events in the next hour, double the speed
                        effectiveSpeed = userPlaybackSpeed * 2;
                    }

                    const nextTime = prevTime + (timeIncrementMs * effectiveSpeed);
                    
                    // Find the first event that occurs within this time tick
                    const triggeredEvents = timelineEvents.filter(
                        event => event.timestamp > prevTime && event.timestamp <= nextTime
                    );

                    const firstTriggeredEvent = triggeredEvents[0]; // Already sorted

                    if (firstTriggeredEvent) {
                        const alertToFocus = ALERTS.find(a => a.id === firstTriggeredEvent.id);
                        if (alertToFocus) {
                            setFocusedAlert(alertToFocus);
                            setIsPlaying(false);
                            setPausedForAlert(true);
                            // Jump precisely to the event time to avoid skipping it
                            return firstTriggeredEvent.timestamp;
                        }
                    }

                    if (nextTime >= timeRange.endTime) {
                        setIsPlaying(false);
                        return timeRange.endTime;
                    }
                    return nextTime;
                });
            }, intervalDelay);
        } else if (intervalRef.current) {
            window.clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        return () => {
            if (intervalRef.current) {
                window.clearInterval(intervalRef.current);
            }
        };
    }, [isPlaying, timeRange.endTime, userPlaybackSpeed, timelineEvents]);

    const handlePlayPause = () => {
        if (playbackTime >= timeRange.endTime) {
            setPlaybackTime(timeRange.startTime); // Reset if at the end
            setUserPlaybackSpeed(PLAYBACK_SPEEDS[2]);
        }
        setIsPlaying(!isPlaying);
        setPausedForAlert(false);
    };

    const handleSpeedChange = () => {
        const currentIndex = PLAYBACK_SPEEDS.indexOf(userPlaybackSpeed);
        const nextIndex = (currentIndex + 1) % PLAYBACK_SPEEDS.length;
        setUserPlaybackSpeed(PLAYBACK_SPEEDS[nextIndex]);
    };

    const handleReset = () => {
        setIsPlaying(false);
        setPausedForAlert(false);
        setPlaybackTime(timeRange.startTime);
        setUserPlaybackSpeed(PLAYBACK_SPEEDS[2]);
    };
    
    const handleCloseAlertModal = () => {
        setFocusedAlert(null);
        if (pausedForAlert) {
            setIsPlaying(true);
            setPausedForAlert(false);
        }
    };
    
    // The map now always reflects the historical playback time.
    const displayedSensors = sensorsAtTime;
    const displayedTime = new Date(playbackTime);

    return (
        <div className="space-y-6 h-full flex flex-col">
            <TimeMachineAlertModal alert={focusedAlert} onClose={handleCloseAlertModal} />
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Pipeline Map</h2>
            </div>
            <div className="bg-slate-800 p-6 rounded-2xl shadow-lg flex-grow flex flex-col">
                <p className="text-slate-300 mb-4 flex-shrink-0">
                    This interactive map displays the pipeline network. Use the Time Machine controls below to scrub through the last 48 hours of sensor activity and analyze historical events.
                </p>
                <div className="flex-grow bg-slate-700 rounded-lg overflow-hidden relative">
                    <PipelineDigitalTwin sensors={displayedSensors} currentTime={displayedTime} />
                    <TimeMachineControls
                        startTime={timeRange.startTime}
                        endTime={timeRange.endTime}
                        currentTime={playbackTime}
                        isPlaying={isPlaying}
                        playbackSpeed={userPlaybackSpeed}
                        events={timelineEvents}
                        onTimeChange={(time) => {
                            setIsPlaying(false);
                            setPausedForAlert(false);
                            setPlaybackTime(time);
                        }}
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