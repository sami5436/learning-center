import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, formatDistanceToNow, addMinutes, parse, isWithinInterval } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import type { ScheduleBlock, DayOfWeek, ScheduleBlockWithTime } from '@/types';

// Merge Tailwind classes safely
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Format time in 12-hour format
export function formatTime(time: string): string {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
}

// Parse HH:mm to Date object (using today's date)
export function parseTime(time: string): Date {
    return parse(time, 'HH:mm', new Date());
}

// Add minutes to HH:mm time and return new HH:mm
export function addMinutesToTime(time: string, minutes: number): string {
    const date = parseTime(time);
    const newDate = addMinutes(date, minutes);
    return format(newDate, 'HH:mm');
}

// Get current day of week
export function getCurrentDayOfWeek(): DayOfWeek | null {
    const day = new Date().getDay();
    const days: (DayOfWeek | null)[] = [null, 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', null];
    return days[day];
}

// Check if current time is within a block
export function isBlockCurrent(startTime: string, endTime: string): boolean {
    const now = new Date();
    const start = parseTime(startTime);
    const end = parseTime(endTime);

    // Set the dates to today for comparison
    start.setFullYear(now.getFullYear(), now.getMonth(), now.getDate());
    end.setFullYear(now.getFullYear(), now.getMonth(), now.getDate());

    return isWithinInterval(now, { start, end });
}

// Calculate daily schedule with times
export function calculateDailySchedule(
    blocks: ScheduleBlock[],
    startTime: string,
    day: DayOfWeek
): ScheduleBlockWithTime[] {
    const dayBlocks = blocks
        .filter(b => b.day === day)
        .sort((a, b) => a.order_index - b.order_index);

    let currentTime = startTime;

    return dayBlocks.map(block => {
        const blockStartTime = currentTime;
        const blockEndTime = addMinutesToTime(currentTime, block.duration_minutes);
        currentTime = blockEndTime;

        return {
            ...block,
            start_time: blockStartTime,
            end_time: blockEndTime,
            is_current: isBlockCurrent(blockStartTime, blockEndTime),
            is_complete: parseTime(blockEndTime) < new Date(),
        };
    });
}

// Get time remaining in block
export function getTimeRemaining(endTime: string): { minutes: number; seconds: number } {
    const now = new Date();
    const end = parseTime(endTime);
    end.setFullYear(now.getFullYear(), now.getMonth(), now.getDate());

    const diffMs = end.getTime() - now.getTime();

    if (diffMs <= 0) {
        return { minutes: 0, seconds: 0 };
    }

    const totalSeconds = Math.floor(diffMs / 1000);
    return {
        minutes: Math.floor(totalSeconds / 60),
        seconds: totalSeconds % 60,
    };
}

// Format duration
export function formatDuration(minutes: number): string {
    if (minutes < 60) {
        return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (remainingMinutes === 0) {
        return `${hours} hr`;
    }
    return `${hours} hr ${remainingMinutes} min`;
}

// Calculate score percentage
export function calculateScorePercent(score: number, maxScore: number): number {
    if (maxScore === 0) return 0;
    return Math.round((score / maxScore) * 100);
}

// Get mastery status from scores
export function getMasteryStatus(scores: number[]): 'not_started' | 'practicing' | 'mastered' {
    if (scores.length === 0) return 'not_started';
    const passingScores = scores.filter(s => s >= 85);
    if (passingScores.length >= 2) return 'mastered';
    return 'practicing';
}

// Format relative time
export function formatRelativeTime(date: string | Date): string {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
}

// Get greeting based on time of day
export function getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
}

// Truncate text with ellipsis
export function truncate(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength - 3) + '...';
}

// Generate random ID
export function generateId(): string {
    return Math.random().toString(36).substring(2, 15);
}

// Shuffle array (for quiz questions)
export function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}
