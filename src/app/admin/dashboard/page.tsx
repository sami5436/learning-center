import { createClient, getCurrentUser, getStudentsForAdmin } from '@/lib/supabase/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/layout/header';
import {
    Users,
    BookOpen,
    ClipboardCheck,
    TrendingUp,
    Clock,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';
import Link from 'next/link';

export const metadata = {
    title: 'Admin Dashboard - HomeSchool',
};

export default async function AdminDashboardPage() {
    const user = await getCurrentUser();
    const students = await getStudentsForAdmin(user!.id);

    const supabase = await createClient();

    // Get pending submissions for grading
    const { data: pendingSubmissions } = await supabase
        .from('submissions')
        .select('id, created_at, activity:activities(title)')
        .eq('is_graded', false)
        .order('created_at', { ascending: false })
        .limit(5);

    // Quick stats (would be real data in production)
    const stats = {
        totalStudents: students.length,
        lessonsCompleted: 12,
        pendingGrading: pendingSubmissions?.length || 0,
        avgProgress: 68,
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <PageHeader
                title="Welcome back!"
                description="Here's what's happening with your students today."
            />

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-primary-100">
                                <Users className="h-6 w-6 text-primary-600" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Students</p>
                                <p className="text-2xl font-bold">{stats.totalStudents}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-success-50">
                                <BookOpen className="h-6 w-6 text-success-600" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Lessons Completed</p>
                                <p className="text-2xl font-bold">{stats.lessonsCompleted}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-warning-50">
                                <ClipboardCheck className="h-6 w-6 text-warning-600" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Pending Grading</p>
                                <p className="text-2xl font-bold">{stats.pendingGrading}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-secondary-100">
                                <TrendingUp className="h-6 w-6 text-secondary-600" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Avg. Progress</p>
                                <p className="text-2xl font-bold">{stats.avgProgress}%</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Students Overview */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span>Students</span>
                            <Link href="/admin/students" className="text-sm text-primary-600 hover:underline font-normal">
                                View all
                            </Link>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {students.length === 0 ? (
                            <div className="text-center py-8">
                                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                <p className="text-muted-foreground">No students yet</p>
                                <Link href="/admin/students" className="text-primary-600 hover:underline text-sm">
                                    Add your first student
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {students.slice(0, 3).map((student) => (
                                    <div
                                        key={student.id}
                                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted transition-colors"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white font-semibold">
                                            {student.profile?.display_name?.charAt(0) || 'S'}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium truncate">
                                                {student.profile?.display_name || 'Student'}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                Grade {student.grade_level}
                                            </p>
                                        </div>
                                        <Badge variant="success" size="sm">Active</Badge>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Pending Grading */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span>Needs Grading</span>
                            <Link href="/admin/grading" className="text-sm text-primary-600 hover:underline font-normal">
                                View all
                            </Link>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {!pendingSubmissions || pendingSubmissions.length === 0 ? (
                            <div className="text-center py-8">
                                <CheckCircle2 className="h-12 w-12 text-success-500 mx-auto mb-4" />
                                <p className="text-muted-foreground">All caught up!</p>
                                <p className="text-sm text-muted-foreground">No submissions need grading</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {pendingSubmissions.map((submission) => (
                                    <Link
                                        key={submission.id}
                                        href={`/admin/grading/${submission.id}`}
                                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors"
                                    >
                                        <div className="p-2 rounded-lg bg-warning-50">
                                            <AlertCircle className="h-4 w-4 text-warning-600" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium truncate">
                                                {(submission.activity as { title: string }[] | null)?.[0]?.title || 'Activity'}
                                            </p>
                                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                Submitted recently
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Today's Schedule Overview */}
            <Card>
                <CardHeader>
                    <CardTitle>Today&apos;s Schedule Progress</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Overall Completion</span>
                            <span className="text-sm text-muted-foreground">3 of 4 blocks</span>
                        </div>
                        <Progress value={75} size="lg" variant="primary" />
                        <div className="grid grid-cols-4 gap-2 text-center text-xs">
                            <div className="p-2 rounded-lg bg-success-50 text-success-600">
                                ✓ Math
                            </div>
                            <div className="p-2 rounded-lg bg-success-50 text-success-600">
                                ✓ ELA
                            </div>
                            <div className="p-2 rounded-lg bg-primary-50 text-primary-600">
                                → Science
                            </div>
                            <div className="p-2 rounded-lg bg-muted text-muted-foreground">
                                Social Studies
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
