'use client';

import { cn } from '@/lib/utils';
import { formatTime } from '@/lib/utils';
import type { ScheduleBlockWithTime, Subject } from '@/types';
import { SUBJECT_LABELS, BREAK_SUGGESTIONS } from '@/types';
import {
    Clock,
    Play,
    Check,
    Coffee,
    BookOpen,
    Calculator,
    Microscope,
    Globe2,
    Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const SUBJECT_ICONS: Record<Subject | 'break', React.ReactNode> = {
    math: <Calculator className="h-5 w-5" />,
    ela: <BookOpen className="h-5 w-5" />,
    science: <Microscope className="h-5 w-5" />,
    social_studies: <Globe2 className="h-5 w-5" />,
    enrichment: <Sparkles className="h-5 w-5" />,
    break: <Coffee className="h-5 w-5" />,
};

const SUBJECT_BG_COLORS: Record<Subject | 'break', string> = {
    math: 'bg-primary-100 border-primary-300 text-primary-700',
    ela: 'bg-secondary-100 border-secondary-300 text-secondary-700',
    science: 'bg-accent-100 border-accent-300 text-accent-700',
    social_studies: 'bg-warning-50 border-warning-300 text-warning-700',
    enrichment: 'bg-neutral-100 border-neutral-300 text-neutral-700',
    break: 'bg-success-50 border-success-300 text-success-700',
};

interface TimelineProps {
    blocks: ScheduleBlockWithTime[];
    currentBlockId?: string;
    onStartBlock?: (blockId: string) => void;
}

export function Timeline({ blocks, currentBlockId, onStartBlock }: TimelineProps) {
    const getRandomBreakSuggestion = () => {
        const index = Math.floor(Math.random() * BREAK_SUGGESTIONS.length);
        return BREAK_SUGGESTIONS[index];
    };

    return (
        <div className="relative" role="list" aria-label="Today's schedule">
            {/* Timeline line */}
            <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-border" aria-hidden="true" />

            <div className="space-y-4">
                {blocks.map((block, index) => {
                    const isCurrent = block.is_current;
                    const isComplete = block.is_complete;
                    const subjectKey = block.block_type === 'break' ? 'break' : block.subject || 'enrichment';

                    return (
                        <div
                            key={block.id}
                            role="listitem"
                            className={cn(
                                'relative flex gap-4 pl-2',
                                isCurrent && 'animate-fade-in'
                            )}
                        >
                            {/* Timeline dot */}
                            <div
                                className={cn(
                                    'relative z-10 flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center border-2 transition-all duration-300',
                                    isComplete && 'bg-success-500 border-success-500 text-white',
                                    isCurrent && !isComplete && 'bg-primary-500 border-primary-500 text-white ring-4 ring-primary-200',
                                    !isCurrent && !isComplete && SUBJECT_BG_COLORS[subjectKey]
                                )}
                                aria-hidden="true"
                            >
                                {isComplete ? (
                                    <Check className="h-5 w-5" />
                                ) : (
                                    SUBJECT_ICONS[subjectKey]
                                )}
                            </div>

                            {/* Block content */}
                            <div
                                className={cn(
                                    'flex-1 rounded-xl border p-4 transition-all duration-300',
                                    isCurrent && 'border-primary-300 bg-primary-50 shadow-lg shadow-primary-500/10',
                                    isComplete && 'bg-muted/50 border-border',
                                    !isCurrent && !isComplete && 'bg-card border-border hover:border-neutral-300'
                                )}
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                                            <Clock className="h-3.5 w-3.5" />
                                            <span>
                                                {formatTime(block.start_time)} - {formatTime(block.end_time)}
                                            </span>
                                            <span className="text-neutral-300">•</span>
                                            <span>{block.duration_minutes} min</span>
                                        </div>

                                        <h3 className={cn(
                                            'font-semibold text-lg',
                                            isComplete && 'text-muted-foreground'
                                        )}>
                                            {block.block_type === 'break' ? block.title : SUBJECT_LABELS[block.subject as Subject] || block.title}
                                        </h3>

                                        {/* Break suggestion */}
                                        {block.block_type === 'break' && isCurrent && (
                                            <p className="text-sm text-success-600 mt-2 flex items-center gap-2">
                                                {getRandomBreakSuggestion().text}
                                            </p>
                                        )}

                                        {/* Lessons preview */}
                                        {block.block_type === 'subject' && block.lessons && block.lessons.length > 0 && (
                                            <div className="mt-3 space-y-2">
                                                {block.lessons.slice(0, 2).map((lesson) => (
                                                    <Link
                                                        key={lesson.id}
                                                        href={`/student/lesson/${lesson.id}`}
                                                        className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                                                    >
                                                        → {lesson.title}
                                                    </Link>
                                                ))}
                                                {block.lessons.length > 2 && (
                                                    <p className="text-xs text-muted-foreground">
                                                        +{block.lessons.length - 2} more lessons
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    {/* Action button */}
                                    {isCurrent && block.block_type === 'subject' && (
                                        <Button
                                            variant="primary"
                                            size="sm"
                                            onClick={() => onStartBlock?.(block.id)}
                                            className="flex-shrink-0"
                                        >
                                            <Play className="h-4 w-4 mr-1" />
                                            Start
                                        </Button>
                                    )}
                                </div>

                                {/* Current indicator */}
                                {isCurrent && (
                                    <div className="mt-3 pt-3 border-t border-primary-200">
                                        <p className="text-sm font-medium text-primary-600 flex items-center gap-2">
                                            <span className="relative flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" />
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500" />
                                            </span>
                                            Currently Active
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// Compact timeline for sidebar or mobile
interface CompactTimelineProps {
    blocks: ScheduleBlockWithTime[];
    currentBlockId?: string;
}

export function CompactTimeline({ blocks, currentBlockId }: CompactTimelineProps) {
    return (
        <div className="space-y-2" role="list" aria-label="Schedule overview">
            {blocks.map((block) => {
                const isCurrent = block.is_current;
                const isComplete = block.is_complete;
                const subjectKey = block.block_type === 'break' ? 'break' : block.subject || 'enrichment';

                return (
                    <div
                        key={block.id}
                        role="listitem"
                        className={cn(
                            'flex items-center gap-3 p-2 rounded-lg transition-all',
                            isCurrent && 'bg-primary-100',
                            isComplete && 'opacity-50'
                        )}
                    >
                        <div
                            className={cn(
                                'w-8 h-8 rounded-lg flex items-center justify-center',
                                isComplete && 'bg-success-100 text-success-600',
                                isCurrent && !isComplete && 'bg-primary-500 text-white',
                                !isCurrent && !isComplete && SUBJECT_BG_COLORS[subjectKey]
                            )}
                        >
                            {isComplete ? (
                                <Check className="h-4 w-4" />
                            ) : (
                                <span className="text-xs font-medium">{formatTime(block.start_time).split(' ')[0]}</span>
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className={cn(
                                'text-sm font-medium truncate',
                                isComplete && 'text-muted-foreground'
                            )}>
                                {block.block_type === 'break' ? 'Break' : SUBJECT_LABELS[block.subject as Subject] || block.title}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
