import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge, MasteryBadge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { PageHeader } from '@/components/layout/header';
import { QuizRunner } from '@/components/activities/quiz-runner';
import { Flashcards } from '@/components/activities/flashcards';
import { ReadingContent, ConceptBox } from '@/components/activities/reading-content';
import Link from 'next/link';
import {
    ChevronLeft,
    Play,
    CheckCircle2,
    Clock,
    Target,
    BookOpen,
    FileQuestion,
    Layers,
    Award,
} from 'lucide-react';

interface LessonPageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: LessonPageProps) {
    const resolvedParams = await params;
    const supabase = await createClient();
    const { data: lesson } = await supabase
        .from('lessons')
        .select('title')
        .eq('id', resolvedParams.id)
        .single();

    return {
        title: lesson?.title ? `${lesson.title} - HomeSchool` : 'Lesson - HomeSchool',
    };
}

export default async function LessonPage({ params }: LessonPageProps) {
    const resolvedParams = await params;
    const supabase = await createClient();

    const { data: lesson, error } = await supabase
        .from('lessons')
        .select(`
      *,
      unit:units(id, subject, title),
      activities(
        *,
        questions(*, options:question_options(*))
      )
    `)
        .eq('id', resolvedParams.id)
        .single();

    if (error || !lesson) {
        notFound();
    }

    const activities = (lesson.activities as any[]) || [];
    const readingActivity = activities.find((a) => a.type === 'reading');
    const quizActivity = activities.find((a) => a.type === 'quiz');
    const flashcardActivity = activities.find((a) => a.type === 'flashcards');
    const challengeActivity = activities.find((a) => a.type === 'challenge');

    // Mock progress
    const completedActivities = 2;
    const totalActivities = activities.length || 4;
    const progressPercent = Math.round((completedActivities / totalActivities) * 100);

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Back link */}
            <Link
                href="/student/subjects"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Subjects
            </Link>

            {/* Lesson Header */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <div>
                    <Badge variant="primary" className="mb-2">
                        {(lesson.unit as any)?.title || 'Unit'}
                    </Badge>
                    <h1 className="text-3xl font-bold text-foreground mb-2">{lesson.title}</h1>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {lesson.estimated_minutes} min
                        </span>
                        <span className="flex items-center gap-1">
                            <Layers className="h-4 w-4" />
                            {totalActivities} activities
                        </span>
                    </div>
                </div>

                <Card className="lg:w-80">
                    <CardContent className="py-4">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium">Lesson Progress</span>
                            <span className="text-sm text-muted-foreground">{progressPercent}%</span>
                        </div>
                        <Progress value={progressPercent} variant="primary" className="mb-4" />
                        <Button variant="primary" className="w-full">
                            <Play className="h-4 w-4 mr-2" />
                            Continue Learning
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Objectives */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5 text-primary-500" />
                        Learning Objectives
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2">
                        {(lesson.objectives as string[])?.map((objective, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <div className="mt-0.5 h-5 w-5 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-xs font-medium">
                                    {index + 1}
                                </div>
                                <span className="text-foreground">{objective}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

            {/* Activities */}
            <div className="space-y-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Activities
                </h2>

                {/* Reading Section */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <BookOpen className="h-5 w-5 text-secondary-500" />
                                Read & Learn
                            </CardTitle>
                            <Badge variant="success" size="sm">
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Complete
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="prose prose-lg max-w-none">
                            <p className="text-foreground leading-relaxed">
                                {lesson.explanation || 'This lesson will teach you important concepts. Read through the material carefully and make sure you understand each section before moving on.'}
                            </p>

                            <ConceptBox title="Key Concept" variant="info">
                                <p>Make sure you understand this important idea before continuing!</p>
                            </ConceptBox>
                        </div>
                    </CardContent>
                </Card>

                {/* Quiz Section Preview */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <FileQuestion className="h-5 w-5 text-accent-500" />
                                Practice Quiz
                            </CardTitle>
                            <Badge variant="warning" size="sm">6 questions</Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                            Test your understanding with these practice questions. You need 85% or higher to demonstrate mastery.
                        </p>
                        <Button variant="secondary">
                            <Play className="h-4 w-4 mr-2" />
                            Start Quiz
                        </Button>
                    </CardContent>
                </Card>

                {/* Flashcards Preview */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <Layers className="h-5 w-5 text-primary-500" />
                                Flashcards
                            </CardTitle>
                            <Badge variant="outline" size="sm">8 cards</Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                            Review key terms and concepts with these flashcards.
                        </p>
                        <Button variant="ghost" className="border">
                            <Play className="h-4 w-4 mr-2" />
                            Study Flashcards
                        </Button>
                    </CardContent>
                </Card>

                {/* Challenge Activity */}
                <Card variant="gradient">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <Award className="h-5 w-5 text-warning-500" />
                                Challenge Activity
                            </CardTitle>
                            <Badge variant="warning" size="sm">⭐ Bonus</Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                            Ready for an extra challenge? This activity goes beyond the basics and tests your deeper understanding.
                        </p>
                        <Button variant="primary">
                            Take the Challenge
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Mastery Status */}
            <Card>
                <CardContent className="py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-semibold text-foreground mb-1">Mastery Status</h3>
                            <p className="text-sm text-muted-foreground">
                                Complete the quiz with 85% or higher twice to master this lesson
                            </p>
                        </div>
                        <MasteryBadge status="practicing" />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
