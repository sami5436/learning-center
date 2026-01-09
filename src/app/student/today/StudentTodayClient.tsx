'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/layout/header';
import { Timeline } from '@/components/schedule/timeline';
import { CountdownTimer } from '@/components/schedule/countdown-timer';
import { FocusMode } from '@/components/schedule/focus-mode';
import type { ScheduleBlockWithTime, DayOfWeek } from '@/types';
import { SUBJECT_LABELS, BREAK_SUGGESTIONS } from '@/types';
import {
    getGreeting,
    formatTime,
    getCurrentDayOfWeek,
    calculateDailySchedule,
} from '@/lib/utils';
import {
    Sun,
    Trophy,
    Flame,
    Target,
    Play,
    Coffee,
} from 'lucide-react';
import Link from 'next/link';

// Mock data for today's schedule
const mockBlocks = [
    { id: '1', template_id: 't1', day: 'friday' as DayOfWeek, block_type: 'subject' as const, subject: 'math' as const, title: 'Math', duration_minutes: 45, order_index: 0, created_at: '', updated_at: '' },
    { id: '2', template_id: 't1', day: 'friday' as DayOfWeek, block_type: 'break' as const, title: 'Morning Break', duration_minutes: 10, order_index: 1, created_at: '', updated_at: '' },
    { id: '3', template_id: 't1', day: 'friday' as DayOfWeek, block_type: 'subject' as const, subject: 'ela' as const, title: 'ELA', duration_minutes: 45, order_index: 2, created_at: '', updated_at: '' },
    { id: '4', template_id: 't1', day: 'friday' as DayOfWeek, block_type: 'break' as const, title: 'Lunch Break', duration_minutes: 30, order_index: 3, created_at: '', updated_at: '' },
    { id: '5', template_id: 't1', day: 'friday' as DayOfWeek, block_type: 'subject' as const, subject: 'science' as const, title: 'Science', duration_minutes: 45, order_index: 4, created_at: '', updated_at: '' },
    { id: '6', template_id: 't1', day: 'friday' as DayOfWeek, block_type: 'break' as const, title: 'Afternoon Break', duration_minutes: 10, order_index: 5, created_at: '', updated_at: '' },
    { id: '7', template_id: 't1', day: 'friday' as DayOfWeek, block_type: 'subject' as const, subject: 'social_studies' as const, title: 'Social Studies', duration_minutes: 45, order_index: 6, created_at: '', updated_at: '' },
];

interface StudentTodayClientProps {
    studentName: string;
}

export function StudentTodayClient({ studentName }: StudentTodayClientProps) {
    const [blocks, setBlocks] = useState<ScheduleBlockWithTime[]>([]);
    const [focusModeBlock, setFocusModeBlock] = useState<ScheduleBlockWithTime | null>(null);
    const [currentTime, setCurrentTime] = useState(new Date());

    // Update current time every minute
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    // Calculate schedule
    useEffect(() => {
        const day = getCurrentDayOfWeek();
        if (day) {
            const dayBlocks = mockBlocks.filter(b => b.day === day || b.day === 'friday'); // Use friday for demo
            const scheduledBlocks = calculateDailySchedule(dayBlocks, '09:00', 'friday');
            setBlocks(scheduledBlocks);
        }
    }, [currentTime]);

    const currentBlock = blocks.find(b => b.is_current);
    const completedBlocks = blocks.filter(b => b.is_complete && b.block_type === 'subject').length;
    const totalSubjectBlocks = blocks.filter(b => b.block_type === 'subject').length;
    const progressPercent = totalSubjectBlocks > 0 ? (completedBlocks / totalSubjectBlocks) * 100 : 0;

    const handleStartBlock = (blockId: string) => {
        const block = blocks.find(b => b.id === blockId);
        if (block) {
            setFocusModeBlock(block);
        }
    };

    const firstName = studentName.split(' ')[0];
    const isWeekend = getCurrentDayOfWeek() === null;
    const breakSuggestion = BREAK_SUGGESTIONS[Math.floor(Math.random() * BREAK_SUGGESTIONS.length)];

    return (
        <div className="space-y-6 animate-fade-in">
            {focusModeBlock && (
                <FocusMode
                    blockTitle={focusModeBlock.subject ? SUBJECT_LABELS[focusModeBlock.subject] : focusModeBlock.title}
                    endTime={focusModeBlock.end_time}
                    onClose={() => setFocusModeBlock(null)}
                />
            )}

            {/* Header with greeting */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-3">
                        <Sun className="h-8 w-8 text-warning-500" />
                        {getGreeting()}, {firstName}! 👋
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        {isWeekend ? "It's the weekend! Time to relax." : "Let's have a great learning day!"}
                    </p>
                </div>

                {/* Quick stats */}
                <div className="flex gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-accent-100 rounded-xl">
                        <Flame className="h-5 w-5 text-accent-500" />
                        <span className="font-semibold text-accent-700">5 day streak! 🔥</span>
                    </div>
                    <div className="flex items,center gap-2 px-4 py-2 bg-success-50 rounded-xl">
                        <Trophy className="h-5 w-5 text-success-500" />
                        <span className="font-semibold text-success-700">8 badges</span>
                    </div>
                </div>
            </div>

            {isWeekend ? (
                <Card variant="gradient">
                    <CardContent className="py-12 text-center">
                        <div className="text-6xl mb-4">🎉</div>
                        <h2 className="text-2xl font-bold mb-2">Weekend Mode!</h2>
                        <p className="text-muted-foreground mb-6">
                            No classes today. Enjoy your break and come back refreshed on Monday!
                        </p>
                        <div className="flex justify-center gap-4">
                            <Link href="/student/subjects">
                                <Button variant="secondary">Review Lessons</Button>
                            </Link>
                            <Link href="/student/progress">
                                <Button variant="ghost">View Progress</Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content - Schedule */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Current Block Card */}
                        {currentBlock && (
                            <Card variant={currentBlock.block_type === 'break' ? 'default' : 'gradient'}>
                                <CardHeader>
                                    <CardTitle className="flex items-center justify-between">
                                        <span>
                                            {currentBlock.block_type === 'break' ? '☕ Break Time!' : '📚 Current Block'}
                                        </span>
                                        <Badge variant="primary">Now</Badge>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        <div>
                                            <h3 className="text-2xl font-bold">
                                                {currentBlock.subject
                                                    ? SUBJECT_LABELS[currentBlock.subject]
                                                    : currentBlock.title}
                                            </h3>
                                            <p className="text-muted-foreground">
                                                {formatTime(currentBlock.start_time)} - {formatTime(currentBlock.end_time)}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <CountdownTimer
                                                endTime={currentBlock.end_time}
                                                size="lg"
                                                variant="prominent"
                                            />
                                            {currentBlock.block_type === 'subject' && (
                                                <Button
                                                    variant="primary"
                                                    size="lg"
                                                    onClick={() => handleStartBlock(currentBlock.id)}
                                                >
                                                    <Play className="h-5 w-5 mr-2" />
                                                    Focus Mode
                                                </Button>
                                            )}
                                        </div>
                                    </div>

                                    {currentBlock.block_type === 'break' && (
                                        <div className="mt-4 p-4 bg-success-50 rounded-xl">
                                            <p className="text-success-700 font-medium flex items-center gap-2">
                                                <Coffee className="h-5 w-5" />
                                                {breakSuggestion.text}
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        )}

                        {/* Full Schedule Timeline */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    <span>Today&apos;s Schedule</span>
                                    <span className="text-sm font-normal text-muted-foreground">
                                        {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                                    </span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Timeline
                                    blocks={blocks}
                                    currentBlockId={currentBlock?.id}
                                    onStartBlock={handleStartBlock}
                                />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Progress Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Target className="h-5 w-5 text-primary-500" />
                                    Today&apos;s Progress
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-primary-600">
                                            {completedBlocks}/{totalSubjectBlocks}
                                        </div>
                                        <p className="text-sm text-muted-foreground">Subjects Completed</p>
                                    </div>
                                    <Progress value={progressPercent} size="lg" variant="primary" />
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        <div className="p-2 rounded-lg bg-muted text-center">
                                            <p className="font-semibold">2h 15m</p>
                                            <p className="text-xs text-muted-foreground">Time Spent</p>
                                        </div>
                                        <div className="p-2 rounded-lg bg-muted text-center">
                                            <p className="font-semibold">85%</p>
                                            <p className="text-xs text-muted-foreground">Avg Score</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Links */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Links</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Link
                                    href="/student/subjects"
                                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors"
                                >
                                    <div className="p-2 rounded-lg bg-primary-100">
                                        <Target className="h-4 w-4 text-primary-600" />
                                    </div>
                                    <span className="font-medium">Browse Subjects</span>
                                </Link>
                                <Link
                                    href="/student/progress"
                                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors"
                                >
                                    <div className="p-2 rounded-lg bg-success-50">
                                        <Trophy className="h-4 w-4 text-success-600" />
                                    </div>
                                    <span className="font-medium">View Achievements</span>
                                </Link>
                            </CardContent>
                        </Card>

                        {/* Motivation Card */}
                        <Card variant="gradient">
                            <CardContent className="py-6 text-center">
                                <div className="text-4xl mb-3">💪</div>
                                <p className="font-medium text-foreground">
                                    &quot;Education is the passport to the future.&quot;
                                </p>
                                <p className="text-sm text-muted-foreground mt-1">- Malcolm X</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}
        </div>
    );
}
