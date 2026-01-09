'use client';

import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CountdownTimerProps {
    endTime: string; // HH:mm format
    onComplete?: () => void;
    showControls?: boolean;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'minimal' | 'prominent';
}

export function CountdownTimer({
    endTime,
    onComplete,
    showControls = false,
    size = 'md',
    variant = 'default',
}: CountdownTimerProps) {
    const [timeLeft, setTimeLeft] = useState({ minutes: 0, seconds: 0 });
    const [isPaused, setIsPaused] = useState(false);
    const [hasEnded, setHasEnded] = useState(false);

    const calculateTimeLeft = useCallback(() => {
        const now = new Date();
        const [hours, minutes] = endTime.split(':').map(Number);
        const end = new Date();
        end.setHours(hours, minutes, 0, 0);

        const diff = end.getTime() - now.getTime();

        if (diff <= 0) {
            return { minutes: 0, seconds: 0, ended: true };
        }

        const totalSeconds = Math.floor(diff / 1000);
        return {
            minutes: Math.floor(totalSeconds / 60),
            seconds: totalSeconds % 60,
            ended: false,
        };
    }, [endTime]);

    useEffect(() => {
        if (isPaused) return;

        const updateTimer = () => {
            const { minutes, seconds, ended } = calculateTimeLeft();
            setTimeLeft({ minutes, seconds });

            if (ended && !hasEnded) {
                setHasEnded(true);
                onComplete?.();
            }
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);

        return () => clearInterval(interval);
    }, [calculateTimeLeft, isPaused, hasEnded, onComplete]);

    const sizes = {
        sm: 'text-lg',
        md: 'text-3xl',
        lg: 'text-5xl',
    };

    const variants = {
        default: 'bg-card border border-border rounded-xl p-4',
        minimal: '',
        prominent: 'bg-gradient-to-br from-primary-500 to-secondary-500 text-white rounded-2xl p-6 shadow-xl',
    };

    const isLowTime = timeLeft.minutes < 5;

    return (
        <div className={cn('text-center', variants[variant])}>
            <div
                className={cn(
                    'font-mono font-bold tabular-nums',
                    sizes[size],
                    isLowTime && variant !== 'prominent' && 'text-error-500',
                    hasEnded && 'animate-pulse'
                )}
                role="timer"
                aria-live="polite"
                aria-label={`${timeLeft.minutes} minutes and ${timeLeft.seconds} seconds remaining`}
            >
                {String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
            </div>

            {showControls && !hasEnded && (
                <div className="flex justify-center gap-2 mt-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsPaused(!isPaused)}
                        aria-label={isPaused ? 'Resume timer' : 'Pause timer'}
                    >
                        {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                    </Button>
                </div>
            )}

            {hasEnded && (
                <p className="text-sm text-muted-foreground mt-2">Time&apos;s up!</p>
            )}
        </div>
    );
}

// Focus Session Timer - for activity tracking
interface FocusTimerProps {
    initialMinutes?: number;
    onTimeUpdate?: (seconds: number) => void;
    autoStart?: boolean;
}

export function FocusTimer({ initialMinutes = 0, onTimeUpdate, autoStart = true }: FocusTimerProps) {
    const [elapsedSeconds, setElapsedSeconds] = useState(initialMinutes * 60);
    const [isRunning, setIsRunning] = useState(autoStart);

    useEffect(() => {
        if (!isRunning) return;

        const interval = setInterval(() => {
            setElapsedSeconds((prev) => {
                const newValue = prev + 1;
                onTimeUpdate?.(newValue);
                return newValue;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isRunning, onTimeUpdate]);

    const hours = Math.floor(elapsedSeconds / 3600);
    const minutes = Math.floor((elapsedSeconds % 3600) / 60);
    const seconds = elapsedSeconds % 60;

    const formatTime = () => {
        if (hours > 0) {
            return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    return (
        <div className="flex items-center gap-3">
            <div className="font-mono text-lg font-medium tabular-nums text-foreground">
                {formatTime()}
            </div>
            <div className="flex gap-1">
                <button
                    type="button"
                    onClick={() => setIsRunning(!isRunning)}
                    className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                    aria-label={isRunning ? 'Pause timer' : 'Resume timer'}
                >
                    {isRunning ? (
                        <Pause className="h-4 w-4 text-muted-foreground" />
                    ) : (
                        <Play className="h-4 w-4 text-muted-foreground" />
                    )}
                </button>
                <button
                    type="button"
                    onClick={() => setElapsedSeconds(0)}
                    className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                    aria-label="Reset timer"
                >
                    <RotateCcw className="h-4 w-4 text-muted-foreground" />
                </button>
            </div>
        </div>
    );
}
