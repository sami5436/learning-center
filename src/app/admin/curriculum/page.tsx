'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input, Textarea } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert } from '@/components/ui/alert';
import { EmptyState } from '@/components/ui/loading';
import { PageHeader } from '@/components/layout/header';
import { SUBJECT_LABELS, type Subject, type Unit, type Lesson } from '@/types';
import { cn } from '@/lib/utils';
import {
    Plus,
    Edit2,
    Trash2,
    ChevronRight,
    ChevronDown,
    BookOpen,
    Save,
    X,
    Layers,
    FileText,
} from 'lucide-react';

// Mock data
const mockUnits: (Unit & { lessons: Lesson[] })[] = [
    {
        id: '1',
        subject: 'math',
        title: 'Place Value & Operations',
        description: 'Understanding place value and basic operations with multi-digit numbers',
        order_index: 0,
        created_at: '',
        updated_at: '',
        lessons: [
            { id: 'l1', unit_id: '1', title: 'Understanding Place Value', objectives: ['Identify place value positions'], explanation: '', order_index: 0, estimated_minutes: 30, created_at: '', updated_at: '' },
            { id: 'l2', unit_id: '1', title: 'Comparing Numbers', objectives: ['Compare multi-digit numbers'], explanation: '', order_index: 1, estimated_minutes: 25, created_at: '', updated_at: '' },
            { id: 'l3', unit_id: '1', title: 'Addition & Subtraction', objectives: ['Add and subtract multi-digit numbers'], explanation: '', order_index: 2, estimated_minutes: 35, created_at: '', updated_at: '' },
        ],
    },
    {
        id: '2',
        subject: 'ela',
        title: 'Reading Comprehension Strategies',
        description: 'Building reading comprehension skills through various strategies',
        order_index: 0,
        created_at: '',
        updated_at: '',
        lessons: [
            { id: 'l4', unit_id: '2', title: 'Making Predictions', objectives: ['Make predictions while reading'], explanation: '', order_index: 0, estimated_minutes: 30, created_at: '', updated_at: '' },
            { id: 'l5', unit_id: '2', title: 'Finding Main Ideas', objectives: ['Identify main ideas and details'], explanation: '', order_index: 1, estimated_minutes: 30, created_at: '', updated_at: '' },
        ],
    },
];

export default function AdminCurriculumPage() {
    const [units, setUnits] = useState(mockUnits);
    const [selectedSubject, setSelectedSubject] = useState<Subject | 'all'>('all');
    const [expandedUnits, setExpandedUnits] = useState<Set<string>>(new Set(['1']));
    const [editingUnit, setEditingUnit] = useState<string | null>(null);
    const [showNewUnitForm, setShowNewUnitForm] = useState(false);

    const filteredUnits = selectedSubject === 'all'
        ? units
        : units.filter(u => u.subject === selectedSubject);

    const toggleUnit = (unitId: string) => {
        setExpandedUnits((prev) => {
            const next = new Set(prev);
            if (next.has(unitId)) {
                next.delete(unitId);
            } else {
                next.add(unitId);
            }
            return next;
        });
    };

    const handleDeleteUnit = (unitId: string) => {
        if (confirm('Are you sure you want to delete this unit and all its lessons?')) {
            setUnits((prev) => prev.filter((u) => u.id !== unitId));
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <PageHeader
                title="Curriculum"
                description="Manage units, lessons, and activities"
                action={
                    <Button variant="primary" onClick={() => setShowNewUnitForm(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Unit
                    </Button>
                }
            />

            {/* Subject Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2">
                <button
                    onClick={() => setSelectedSubject('all')}
                    className={cn(
                        'px-4 py-2 rounded-xl font-medium transition-all whitespace-nowrap',
                        selectedSubject === 'all'
                            ? 'bg-primary-500 text-white'
                            : 'bg-muted hover:bg-neutral-200'
                    )}
                >
                    All Subjects
                </button>
                {(Object.keys(SUBJECT_LABELS) as Subject[]).map((subject) => (
                    <button
                        key={subject}
                        onClick={() => setSelectedSubject(subject)}
                        className={cn(
                            'px-4 py-2 rounded-xl font-medium transition-all whitespace-nowrap',
                            selectedSubject === subject
                                ? 'bg-primary-500 text-white'
                                : 'bg-muted hover:bg-neutral-200'
                        )}
                    >
                        {SUBJECT_LABELS[subject]}
                    </button>
                ))}
            </div>

            {/* New Unit Form */}
            {showNewUnitForm && (
                <Card className="border-primary-300 bg-primary-50">
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span>New Unit</span>
                            <button onClick={() => setShowNewUnitForm(false)}>
                                <X className="h-5 w-5 text-muted-foreground" />
                            </button>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Select
                                    label="Subject"
                                    options={Object.entries(SUBJECT_LABELS).map(([value, label]) => ({
                                        value,
                                        label,
                                    }))}
                                />
                                <Input label="Unit Title" placeholder="e.g., Fractions" />
                            </div>
                            <Textarea
                                label="Description"
                                placeholder="Brief description of what this unit covers..."
                            />
                            <div className="flex justify-end gap-2">
                                <Button variant="ghost" onClick={() => setShowNewUnitForm(false)}>
                                    Cancel
                                </Button>
                                <Button variant="primary">
                                    <Save className="h-4 w-4 mr-2" />
                                    Create Unit
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            {/* Units List */}
            {filteredUnits.length === 0 ? (
                <EmptyState
                    icon={<Layers className="h-12 w-12" />}
                    title="No units yet"
                    description="Create your first curriculum unit to get started"
                    action={
                        <Button variant="primary" onClick={() => setShowNewUnitForm(true)}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Unit
                        </Button>
                    }
                />
            ) : (
                <div className="space-y-4">
                    {filteredUnits.map((unit) => {
                        const isExpanded = expandedUnits.has(unit.id);

                        return (
                            <Card key={unit.id}>
                                <CardHeader className="cursor-pointer" onClick={() => toggleUnit(unit.id)}>
                                    <div className="flex items-center gap-4">
                                        <button className="p-1">
                                            {isExpanded ? (
                                                <ChevronDown className="h-5 w-5 text-muted-foreground" />
                                            ) : (
                                                <ChevronRight className="h-5 w-5 text-muted-foreground" />
                                            )}
                                        </button>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3">
                                                <Badge variant="primary" size="sm">
                                                    {SUBJECT_LABELS[unit.subject]}
                                                </Badge>
                                                <h3 className="font-semibold text-lg">{unit.title}</h3>
                                            </div>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                {unit.description}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline">
                                                {unit.lessons.length} lessons
                                            </Badge>
                                            <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); }}>
                                                <Edit2 className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteUnit(unit.id);
                                                }}
                                                className="text-error-500 hover:text-error-600"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>

                                {isExpanded && (
                                    <CardContent className="pt-0">
                                        <div className="border-t pt-4 space-y-2">
                                            {unit.lessons.map((lesson, index) => (
                                                <div
                                                    key={lesson.id}
                                                    className="flex items-center gap-4 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                                                >
                                                    <div className="w-8 h-8 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center font-semibold text-sm">
                                                        {index + 1}
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="font-medium">{lesson.title}</p>
                                                        <p className="text-sm text-muted-foreground">
                                                            {lesson.estimated_minutes} min • {lesson.objectives.length} objectives
                                                        </p>
                                                    </div>
                                                    <Button variant="ghost" size="sm">
                                                        <Edit2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            ))}
                                            <Button variant="ghost" size="sm" className="w-full border border-dashed mt-2">
                                                <Plus className="h-4 w-4 mr-2" />
                                                Add Lesson
                                            </Button>
                                        </div>
                                    </CardContent>
                                )}
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
