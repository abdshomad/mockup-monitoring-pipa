
import { useState, useEffect, useCallback, useRef } from 'react';

export const useCountdown = (initialCount: number, onEnd: () => void, isInitiallyPaused = false) => {
    const [count, setCount] = useState(initialCount);
    const [isPaused, setIsPaused] = useState(isInitiallyPaused);
    const intervalRef = useRef<number | null>(null);

    const endCallback = useRef(onEnd);
    useEffect(() => {
        endCallback.current = onEnd;
    }, [onEnd]);

    useEffect(() => {
        if (!isPaused && count > 0) {
            intervalRef.current = window.setInterval(() => {
                setCount(prev => prev - 1);
            }, 1000);
        } else if (count === 0) {
            endCallback.current();
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [count, isPaused]);

    const toggle = useCallback(() => setIsPaused(p => !p), []);
    
    const reset = useCallback((newCount = initialCount) => {
        setCount(newCount);
        setIsPaused(isInitiallyPaused);
    }, [initialCount, isInitiallyPaused]);

    return { count, isPaused, toggle, reset };
};
