'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/layout/header';
import { DAYS_OF_WEEK, SUBJECT_LABELS, type DayOfWeek, type Subject, type BlockType } from '@/types';
import { cn } from '@/lib/utils';
import {
    Plus,
    Trash2,
    GripVertical,
    Clock,
    Save,
    Coffee,
    Calculator,
    BookOpen,
    Microscope,
    Globe2,
} from 'lucide-react';

interface ScheduleBlock {
    id: string;
    day: DayOfWeek;
    block_type: BlockType;
    subject?: Subject;
    title: string;
    duration_minutes: number;
    order_index: number;
}

const SUBJECT_ICONS: Record<Subject, React.ReactNode> = {
    math: <Calculator className="h-4 w-4" />,
    ela: <BookOpen className="h-4 w-4" />,
    science: <Microscope className="h-4 w-4" />,
    social_studies: <Globe2 className="h-4 w-4" />,
    enrichment: <span className="h-4 w-4">✨</span>,
};

// Initial mock schedule
const initialBlocks: ScheduleBlock[] = [
    { id: '1', day: 'monday', block_type: 'subject', subject: 'math', title: 'Math', duration_minutes: 45, order_index: 0 },
    { id: '2', day: 'monday', block_type: 'break', title: 'Morning Break', duration_minutes: 10, order_index: 1 },
    { id: '3', day: 'monday', block_type: 'subject', subject: 'ela', title: 'ELA', duration_minutes: 45, order_index: 2 },
    { id: '4', day: 'monday', block_type: 'break', title: 'Lunch Break', duration_minutes: 30, order_index: 3 },
    { id: '5', day: 'monday', block_type: 'subject', subject: 'science', title: 'Science', duration_minutes: 45, order_index: 4 },
    { id: '6', day: 'monday', block_type: 'break', title: 'Afternoon Break', duration_minutes: 10, order_index: 5 },
    { id: '7', day: 'monday', block_type: 'subject', subject: 'social_studies', title: 'Social Studies', duration_minutes: 45, order_index: 6 },
];

// Copy blocks to all weekdays
const generateWeekSchedule = (template: ScheduleBlock[]): ScheduleBlock[] => {
    const allBlocks: ScheduleBlock[] = [];
    DAYS_OF_WEEK.forEach((day, dayIdx) => {
        template.forEach((block, blockIdx) => {
            allBlocks.push({
                ...block,
                id: `${day}-${blockIdx}`,
                day,
            });
        });
    });
    return allBlocks;
};

export default function AdminSchedulePage() {
    const [blocks, setBlocks] = useState<ScheduleBlock[]>(generateWeekSchedule(initialBlocks));
    const [selectedDay, setSelectedDay] = useState<DayOfWeek>('monday');
    const [startTime, setStartTime] = useState('09:00');
    const [hasChanges, setHasChanges] = useState(false);

    const dayBlocks = blocks
        .filter((block) => block.day === selectedDay)
        .sort((a, b) => a.order_index - b.order_index);

    const calculateBlockTime = (index: number): string => {
        const [hours, minutes] = startTime.split(':').map(Number);
        let totalMinutes = hours * 60 + minutes;

        for (let i = 0; i < index; i++) {
            totalMinutes += dayBlocks[i].duration_minutes;
        }

        const h = Math.floor(totalMinutes / 60);
        const m = totalMinutes % 60;
        const period = h >= 12 ? 'PM' : 'AM';
        const displayH = h % 12 || 12;
        return `${displayH}:${String(m).padStart(2, '0')} ${period}`;
    };

    const handleUpdateBlock = (id: string, updates: Partial<ScheduleBlock>) => {
        setBlocks((prev) =>
            prev.map((block) => (block.id === id ? { ...block, ...updates } : block))
        );
        setHasChanges(true);
    };

    const handleAddBlock = (type: BlockType) => {
        const maxIndex = Math.max(...dayBlocks.map((b) => b.order_index), -1);
        const newBlock: ScheduleBlock = {
            id: `${selectedDay}-${Date.now()}`,
            day: selectedDay,
            block_type: type,
            subject: type === 'subject' ? 'math' : undefined,
            title: type === 'break' ? 'Break' : 'Subject Block',
            duration_minutes: type === 'break' ? 10 : 45,
            order_index: maxIndex + 1,
        };
        setBlocks((prev) => [...prev, newBlock]);
        setHasChanges(true);
    };

    const handleDeleteBlock = (id: string) => {
        setBlocks((prev) => prev.filter((block) => block.id !== id));
        setHasChanges(true);
    };

    const handleCopyToAllDays = () => {
        const templateBlocks = dayBlocks;
        const newBlocks: ScheduleBlock[] = [];

        DAYS_OF_WEEK.forEach((day) => {
            templateBlocks.forEach((block, idx) => {
                newBlocks.push({
                    ...block,
                    id: `${day}-${idx}-${Date.now()}`,
                    day,
                });
            });
        });

        setBlocks(newBlocks);
        setHasChanges(true);
    };

    const handleSave = () => {
        // Would save to database
        setHasChanges(false);
        alert('Schedule saved!');
    };

    const totalMinutes = dayBlocks.reduce((sum, b) => sum + b.duration_minutes, 0);
    const totalHours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;

    return (
        <div className="space-y-6 animate-fade-in">
            <PageHeader
                title="Weekly Schedule"
                description="Configure the daily learning schedule"
                action={
                    <Button variant="primary" onClick={handleSave} disabled={!hasChanges}>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                    </Button>
                }
            />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Settings Sidebar */}
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle>Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Input
                            label="Start Time"
                            type="time"
                            value={startTime}
                            onChange={(e) => {
                                setStartTime(e.target.value);
                                setHasChanges(true);
                            }}
                        />

                        <div className="pt-2 border-t">
                            <p className="text-sm font-medium mb-2">Total Duration</p>
                            <p className="text-2xl font-bold text-primary-600">
                                {totalHours}h {remainingMinutes}m
                            </p>
                        </div>

                        <div className="pt-2 space-y-2">
                            <Button
                                variant="secondary"
                                size="sm"
                                className="w-full"
                                onClick={handleCopyToAllDays}
                            >
                                Copy to All Days
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Schedule Editor */}
                <div className="lg:col-span-3 space-y-4">
                    {/* Day Tabs */}
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {DAYS_OF_WEEK.map((day) => (
                            <button
                                key={day}
                                onClick={() => setSelectedDay(day)}
                                className={cn(
                                    'px-4 py-2 rounded-xl font-medium capitalize transition-all whitespace-nowrap',
                                    selectedDay === day
                                        ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                                        : 'bg-muted hover:bg-neutral-200'
                                )}
                            >
                                {day}
                            </button>
                        ))}
                    </div>

                    {/* Blocks */}
                    <Card>
                        <CardContent className="py-4">
                            <div className="space-y-3">
                                {dayBlocks.map((block, index) => (
                                    <div
                                        key={block.id}
                                        className={cn(
                                            'flex items-center gap-3 p-4 rounded-xl border-2 transition-all',
                                            block.block_type === 'break'
                                                ? 'bg-success-50 border-success-200'
                                                : 'bg-card border-border hover:border-primary-300'
                                        )}
                                    >
                                        <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />

                                        <div className="text-sm text-muted-foreground w-20">
                                            {calculateBlockTime(index)}
                                        </div>

                                        {block.block_type === 'break' ? (
                                            <div className="flex items-center gap-2 flex-1">
                                                <Coffee className="h-5 w-5 text-success-600" />
                                                <Input
                                                    value={block.title}
                                                    onChange={(e) => handleUpdateBlock(block.id, { title: e.target.value })}
                                                    className="max-w-[200px]"
                                                />
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2 flex-1">
                                                {block.subject && SUBJECT_ICONS[block.subject]}
                                                <Select
                                                    value={block.subject || 'math'}
                                                    onChange={(e) => handleUpdateBlock(block.id, {
                                                        subject: e.target.value as Subject,
                                                        title: SUBJECT_LABELS[e.target.value as Subject]
                                                    })}
                                                    options={[
                                                        { value: 'math', label: 'Math' },
                                                        { value: 'ela', label: 'ELA' },
                                                        { value: 'science', label: 'Science' },
                                                        { value: 'social_studies', label: 'Social Studies' },
                                                        { value: 'enrichment', label: 'Enrichment' },
                                                    ]}
                                                    className="max-w-[180px]"
                                                />
                                            </div>
                                        )}

                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-muted-foreground" />
                                            <Input
                                                type="number"
                                                value={block.duration_minutes}
                                                onChange={(e) => handleUpdateBlock(block.id, {
                                                    duration_minutes: parseInt(e.target.value) || 10
                                                })}
                                                className="w-16 text-center"
                                                min={5}
                                                max={120}
                                            />
                                            <span className="text-sm text-muted-foreground">min</span>
                                        </div>

                                        <button
                                            onClick={() => handleDeleteBlock(block.id)}
                                            className="p-2 rounded-lg hover:bg-error-50 text-muted-foreground hover:text-error-500 transition-colors"
                                            aria-label="Delete block"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}

                                {/* Add buttons */}
                                <div className="flex gap-2 pt-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleAddBlock('subject')}
                                        className="border border-dashed"
                                    >
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Subject
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleAddBlock('break')}
                                        className="border border-dashed"
                                    >
                                        <Coffee className="h-4 w-4 mr-2" />
                                        Add Break
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
