
import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { ALERTS } from '../constants';
import { Alert, TimelineEvent } from '../types';
import { calculateSensorsAtTime, calculateAlertsAtTime, calculateNextPlaybackState, MOCK_CURRENT_DATE, TIME_WINDOW_HOURS } from '../utils/timeMachineUtils';

export const useTimeMachine = (playbackSpeeds: number[]) => {
    const timeRange = useMemo(() => {
        const endTime = MOCK_CURRENT_DATE.getTime();
        const startTime = endTime - TIME_WINDOW_HOURS * 60 * 60 * 1000;
        return { startTime, endTime };
    }, []);
    
    const [playbackTime, setPlaybackTime] = useState(timeRange.startTime);
    const [isPlaying, setIsPlaying] = useState(false);
    const [userPlaybackSpeed, setUserPlaybackSpeed] = useState(playbackSpeeds[2]);
    const [focusedAlert, setFocusedAlert] = useState<Alert | null>(null);
    const [pausedForAlert, setPausedForAlert] = useState(false);
    const intervalRef = useRef<number | null>(null);

    const timelineEvents = useMemo((): TimelineEvent[] => {
        return ALERTS.map(alert => ({
            id: alert.id,
            timestamp: new Date(alert.timestamp).getTime(),
            description: `Alert ${alert.id}: ${alert.type}`,
            severity: alert.severity,
        })).filter(event => event.timestamp >= timeRange.startTime && event.timestamp <= timeRange.endTime)
           .sort((a, b) => a.timestamp - b.timestamp);
    }, [timeRange]);

    const sensorsAtTime = useMemo(() => calculateSensorsAtTime(playbackTime), [playbackTime]);
    const alertsAtTime = useMemo(() => calculateAlertsAtTime(playbackTime), [playbackTime]);

    useEffect(() => {
        if (isPlaying) {
            intervalRef.current = window.setInterval(() => {
                setPlaybackTime(prevTime => {
                    const { nextTime, triggeredEventId } = calculateNextPlaybackState({
                        currentTime: prevTime,
                        endTime: timeRange.endTime,
                        events: timelineEvents,
                        speed: userPlaybackSpeed,
                    });

                    if (triggeredEventId) {
                        const alertToFocus = ALERTS.find(a => a.id === triggeredEventId);
                        if (alertToFocus) {
                            setFocusedAlert(alertToFocus);
                            setIsPlaying(false);
                            setPausedForAlert(true);
                            return new Date(alertToFocus.timestamp).getTime();
                        }
                    }

                    if (nextTime >= timeRange.endTime) {
                        setIsPlaying(false);
                        return timeRange.endTime;
                    }
                    return nextTime;
                });
            }, 100);
        } else if (intervalRef.current) {
            window.clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        return () => { if (intervalRef.current) window.clearInterval(intervalRef.current); };
    }, [isPlaying, timeRange.endTime, userPlaybackSpeed, timelineEvents]);

    const handlePlayPause = useCallback(() => {
        if (playbackTime >= timeRange.endTime) setPlaybackTime(timeRange.startTime);
        setIsPlaying(prev => !prev);
        setPausedForAlert(false);
    }, [playbackTime, timeRange.endTime, timeRange.startTime]);

    const handleSpeedChange = useCallback(() => {
        const currentIndex = playbackSpeeds.indexOf(userPlaybackSpeed);
        setUserPlaybackSpeed(playbackSpeeds[(currentIndex + 1) % playbackSpeeds.length]);
    }, [userPlaybackSpeed, playbackSpeeds]);

    const handleReset = useCallback(() => {
        setIsPlaying(false);
        setPausedForAlert(false);
        setPlaybackTime(timeRange.startTime);
    }, [timeRange.startTime]);
    
    const handleCloseAlertModal = useCallback(() => {
        setFocusedAlert(null);
        if (pausedForAlert) {
            setIsPlaying(true);
            setPausedForAlert(false);
        }
    }, [pausedForAlert]);

    const handleTimeChange = useCallback((time: number) => {
        setIsPlaying(false);
        setPausedForAlert(false);
        setPlaybackTime(time);
    }, []);

    return {
        timeRange, playbackTime, isPlaying, userPlaybackSpeed, sensorsAtTime,
        alertsAtTime, focusedAlert, handleTimeChange, handlePlayPause,
        handleSpeedChange, handleReset, handleCloseAlertModal,
    };
};