import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { PageHeader } from '@/components/layout/header';
import { SUBJECT_LABELS, SUBJECT_COLORS, type Subject } from '@/types';
import {
    Calculator,
    BookOpen,
    Microscope,
    Globe2,
    Sparkles,
    ChevronRight,
} from 'lucide-react';

export const metadata = {
    title: 'Subjects - HomeSchool',
};

const SUBJECT_ICONS: Record<Subject, React.ReactNode> = {
    math: <Calculator className="h-8 w-8" />,
    ela: <BookOpen className="h-8 w-8" />,
    science: <Microscope className="h-8 w-8" />,
    social_studies: <Globe2 className="h-8 w-8" />,
    enrichment: <Sparkles className="h-8 w-8" />,
};

const SUBJECT_GRADIENTS: Record<Subject, string> = {
    math: 'from-primary-500 to-primary-600',
    ela: 'from-secondary-500 to-secondary-600',
    science: 'from-accent-500 to-accent-600',
    social_studies: 'from-warning-500 to-warning-600',
    enrichment: 'from-neutral-500 to-neutral-600',
};

export default async function StudentSubjectsPage() {
    const supabase = await createClient();

    // Fetch units grouped by subject
    const { data: units } = await supabase
        .from('units')
        .select('*, lessons(id)')
        .order('order_index', { ascending: true });

    // Group units by subject
    type UnitWithLessons = { id: string; subject: string; lessons: { id: string }[] | null };
    const subjectData: Record<Subject, { units: UnitWithLessons[]; lessonCount: number; completedCount: number }> = {
        math: { units: [], lessonCount: 0, completedCount: 0 },
        ela: { units: [], lessonCount: 0, completedCount: 0 },
        science: { units: [], lessonCount: 0, completedCount: 0 },
        social_studies: { units: [], lessonCount: 0, completedCount: 0 },
        enrichment: { units: [], lessonCount: 0, completedCount: 0 },
    };

    if (units) {
        units.forEach((unit) => {
            const subject = unit.subject as Subject;
            if (subjectData[subject]) {
                subjectData[subject].units.push(unit as UnitWithLessons);
                subjectData[subject].lessonCount += (unit.lessons as { id: string }[] | null)?.length || 0;
            }
        });
    }

    // Mock completion data
    subjectData.math.completedCount = 4;
    subjectData.ela.completedCount = 3;
    subjectData.science.completedCount = 2;
    subjectData.social_studies.completedCount = 1;

    const subjects = Object.entries(subjectData) as [Subject, typeof subjectData.math][];

    return (
        <div className="space-y-6 animate-fade-in">
            <PageHeader
                title="My Subjects"
                description="Explore your curriculum and continue learning"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subjects.map(([subject, data]) => {
                    const progressPercent = data.lessonCount > 0
                        ? Math.round((data.completedCount / data.lessonCount) * 100)
                        : 0;

                    return (
                        <Link key={subject} href={`/student/subjects/${subject}`}>
                            <Card className="h-full hover:shadow-lg hover:border-neutral-300 transition-all duration-300 group cursor-pointer">
                                <CardHeader className="pb-2">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-2xl bg-gradient-to-br ${SUBJECT_GRADIENTS[subject]} text-white group-hover:scale-110 transition-transform`}>
                                            {SUBJECT_ICONS[subject]}
                                        </div>
                                        <div className="flex-1">
                                            <CardTitle className="text-xl">{SUBJECT_LABELS[subject]}</CardTitle>
                                            <p className="text-sm text-muted-foreground">
                                                {data.units.length} units • {data.lessonCount} lessons
                                            </p>
                                        </div>
                                        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Progress</span>
                                            <span className="font-medium">{progressPercent}%</span>
                                        </div>
                                        <Progress value={progressPercent} variant="primary" />
                                        <p className="text-xs text-muted-foreground">
                                            {data.completedCount} of {data.lessonCount} lessons completed
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
