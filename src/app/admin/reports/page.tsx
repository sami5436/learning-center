import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge, MasteryBadge } from '@/components/ui/badge';
import { PageHeader } from '@/components/layout/header';
import { SUBJECT_LABELS, type Subject } from '@/types';
import { BarChart3, TrendingUp, Target, Users, Award, Calendar } from 'lucide-react';

export const metadata = { title: 'Reports - HomeSchool' };

export default async function AdminReportsPage() {
    const subjectProgress: Record<Subject, number> = { math: 75, ela: 60, science: 45, social_studies: 30, enrichment: 10 };
    const masteryData = { mastered: 8, practicing: 12, not_started: 5 };

    return (
        <div className="space-y-6 animate-fade-in">
            <PageHeader title="Progress Reports" description="Track student progress and mastery" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card><CardContent className="pt-6"><div className="flex items-center gap-4"><div className="p-3 rounded-xl bg-success-50"><Award className="h-6 w-6 text-success-600" /></div><div><p className="text-sm text-muted-foreground">Skills Mastered</p><p className="text-2xl font-bold">{masteryData.mastered}</p></div></div></CardContent></Card>
                <Card><CardContent className="pt-6"><div className="flex items-center gap-4"><div className="p-3 rounded-xl bg-warning-50"><Target className="h-6 w-6 text-warning-600" /></div><div><p className="text-sm text-muted-foreground">In Progress</p><p className="text-2xl font-bold">{masteryData.practicing}</p></div></div></CardContent></Card>
                <Card><CardContent className="pt-6"><div className="flex items-center gap-4"><div className="p-3 rounded-xl bg-primary-100"><TrendingUp className="h-6 w-6 text-primary-600" /></div><div><p className="text-sm text-muted-foreground">Avg. Score</p><p className="text-2xl font-bold">87%</p></div></div></CardContent></Card>
                <Card><CardContent className="pt-6"><div className="flex items-center gap-4"><div className="p-3 rounded-xl bg-secondary-100"><Calendar className="h-6 w-6 text-secondary-600" /></div><div><p className="text-sm text-muted-foreground">Days Active</p><p className="text-2xl font-bold">24</p></div></div></CardContent></Card>
            </div>

            <Card><CardHeader><CardTitle className="flex items-center gap-2"><BarChart3 className="h-5 w-5" />Progress by Subject</CardTitle></CardHeader><CardContent className="space-y-4">
                {(Object.entries(subjectProgress) as [Subject, number][]).map(([subject, progress]) => (
                    <div key={subject}><div className="flex justify-between mb-2"><span className="font-medium">{SUBJECT_LABELS[subject]}</span><span className="text-muted-foreground">{progress}%</span></div><Progress value={progress} variant="primary" /></div>
                ))}
            </CardContent></Card>

            <Card><CardHeader><CardTitle>Mastery Overview</CardTitle></CardHeader><CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-4 rounded-xl bg-success-50"><p className="text-3xl font-bold text-success-600">{masteryData.mastered}</p><p className="text-sm text-success-700">Mastered</p></div>
                    <div className="p-4 rounded-xl bg-warning-50"><p className="text-3xl font-bold text-warning-600">{masteryData.practicing}</p><p className="text-sm text-warning-700">Practicing</p></div>
                    <div className="p-4 rounded-xl bg-muted"><p className="text-3xl font-bold text-muted-foreground">{masteryData.not_started}</p><p className="text-sm text-muted-foreground">Not Started</p></div>
                </div>
            </CardContent></Card>
        </div>
    );
}
