'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { X, Maximize2, Minimize2, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BREAK_SUGGESTIONS } from '@/types';

interface FocusModeProps {
    blockTitle: string;
    endTime: string;
    onClose: () => void;
    onComplete?: () => void;
    children?: React.ReactNode;
}

export function FocusMode({ blockTitle, endTime, onClose, onComplete, children }: FocusModeProps) {
    const [timeLeft, setTimeLeft] = useState({ minutes: 0, seconds: 0 });
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [showBreakSuggestion, setShowBreakSuggestion] = useState(false);

    useEffect(() => {
        const calculateTimeLeft = () => {
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
        };

        const updateTimer = () => {
            const { minutes, seconds, ended } = calculateTimeLeft();
            setTimeLeft({ minutes, seconds });

            if (ended) {
                onComplete?.();
                setShowBreakSuggestion(true);
            }
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);

        return () => clearInterval(interval);
    }, [endTime, onComplete]);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    const progress = (() => {
        const totalMinutes = 45; // Default block duration
        const remainingMinutes = timeLeft.minutes + timeLeft.seconds / 60;
        return Math.max(0, Math.min(100, ((totalMinutes - remainingMinutes) / totalMinutes) * 100));
    })();

    const isLowTime = timeLeft.minutes < 5;
    const breakSuggestion = BREAK_SUGGESTIONS[Math.floor(Math.random() * BREAK_SUGGESTIONS.length)];

    return (
        <div className="fixed inset-0 z-50 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
            {/* Progress bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-neutral-700">
                <div
                    className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 transition-all duration-1000"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Controls */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
                <button
                    type="button"
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className="p-2 rounded-lg bg-neutral-700/50 hover:bg-neutral-700 text-white transition-colors"
                    aria-label={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
                >
                    {soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
                </button>
                <button
                    type="button"
                    onClick={toggleFullscreen}
                    className="p-2 rounded-lg bg-neutral-700/50 hover:bg-neutral-700 text-white transition-colors"
                    aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                >
                    {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
                </button>
                <button
                    type="button"
                    onClick={onClose}
                    className="p-2 rounded-lg bg-neutral-700/50 hover:bg-neutral-700 text-white transition-colors"
                    aria-label="Exit focus mode"
                >
                    <X className="h-5 w-5" />
                </button>
            </div>

            {/* Main content */}
            <div className="h-full flex flex-col items-center justify-center px-4">
                {showBreakSuggestion ? (
                    <div className="text-center animate-fade-in">
                        <div className="text-6xl mb-6">🎉</div>
                        <h2 className="text-3xl font-bold text-white mb-4">Great job!</h2>
                        <p className="text-xl text-neutral-300 mb-8">{breakSuggestion.text}</p>
                        <Button variant="primary" size="lg" onClick={onClose}>
                            Continue
                        </Button>
                    </div>
                ) : (
                    <>
                        {/* Block title */}
                        <h2 className="text-xl font-medium text-neutral-400 mb-4">{blockTitle}</h2>

                        {/* Timer */}
                        <div
                            className={cn(
                                'text-8xl md:text-9xl font-mono font-bold tabular-nums transition-colors duration-300',
                                isLowTime ? 'text-error-400' : 'text-white'
                            )}
                            role="timer"
                            aria-live="polite"
                        >
                            {String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
                        </div>

                        {/* Status text */}
                        <p className="text-neutral-500 mt-4 text-lg">
                            {isLowTime ? 'Almost done! Keep going!' : 'Stay focused. You got this!'}
                        </p>

                        {/* Lesson content area */}
                        {children && (
                            <div className="mt-8 w-full max-w-4xl bg-neutral-800/50 rounded-2xl p-6 max-h-[40vh] overflow-y-auto">
                                {children}
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Motivational pulse */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                <div className="flex items-center gap-2 text-neutral-500">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-500" />
                    </span>
                    Focus Mode Active
                </div>
            </div>
        </div>
    );
}
