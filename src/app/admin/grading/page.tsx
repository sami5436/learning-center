'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { EmptyState } from '@/components/ui/loading';
import { PageHeader } from '@/components/layout/header';
import { formatRelativeTime } from '@/lib/utils';
import { CheckCircle2, Clock, User, FileText, Star, ChevronRight, Send } from 'lucide-react';

interface Submission {
    id: string;
    student_name: string;
    activity_title: string;
    subject: string;
    content: string;
    submitted_at: string;
}

const mockSubmissions: Submission[] = [
    {
        id: '1',
        student_name: 'Emma',
        activity_title: 'My Community Essay',
        subject: 'ELA',
        content: 'My community is a special place where everyone helps each other. We have a park where kids play and families gather.',
        submitted_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    },
];

export default function AdminGradingPage() {
    const [submissions, setSubmissions] = useState(mockSubmissions);
    const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
    const [feedback, setFeedback] = useState('');
    const [score, setScore] = useState<number>(0);

    const handleSubmitGrade = () => {
        if (!selectedSubmission) return;
        setSubmissions((prev) => prev.filter((s) => s.id !== selectedSubmission.id));
        setSelectedSubmission(null);
        setFeedback('');
        setScore(0);
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <PageHeader title="Grading Queue" description={`${submissions.length} submissions awaiting review`} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-3">
                    {submissions.length === 0 ? (
                        <Card><CardContent className="py-12"><EmptyState icon={<CheckCircle2 className="h-12 w-12 text-success-500" />} title="All caught up!" description="No submissions need grading" /></CardContent></Card>
                    ) : (
                        submissions.map((submission) => (
                            <Card key={submission.id} className={`cursor-pointer ${selectedSubmission?.id === submission.id ? 'border-primary-500 shadow-lg' : 'hover:border-neutral-300'}`} onClick={() => setSelectedSubmission(submission)}>
                                <CardContent className="py-4">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white font-semibold">{submission.student_name.charAt(0)}</div>
                                            <div><p className="font-medium">{submission.student_name}</p><p className="text-sm text-muted-foreground">{submission.activity_title}</p></div>
                                        </div>
                                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                    <div className="flex items-center gap-2 mt-3"><Badge variant="primary" size="sm">{submission.subject}</Badge></div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>

                <div className="lg:col-span-2">
                    {selectedSubmission ? (
                        <Card>
                            <CardHeader><Badge variant="primary" className="mb-2">{selectedSubmission.subject}</Badge><CardTitle>{selectedSubmission.activity_title}</CardTitle></CardHeader>
                            <CardContent className="space-y-6">
                                <div><h4 className="font-medium mb-3">Student Response</h4><div className="p-4 bg-muted/50 rounded-xl"><p>{selectedSubmission.content}</p></div></div>
                                <div><h4 className="font-medium mb-3">Score</h4><div className="flex gap-2">{[1, 2, 3, 4, 5].map((v) => (<button key={v} onClick={() => setScore(v * 20)} className={`p-3 rounded-xl border-2 ${score >= v * 20 ? 'border-warning-500 bg-warning-50' : 'border-border'}`}><Star className={`h-6 w-6 ${score >= v * 20 ? 'fill-current text-warning-500' : ''}`} /></button>))}<span className="ml-4 text-lg font-semibold">{score}%</span></div></div>
                                <Textarea label="Feedback" placeholder="Write feedback..." value={feedback} onChange={(e) => setFeedback(e.target.value)} />
                                <div className="flex justify-end gap-3"><Button variant="ghost" onClick={() => setSelectedSubmission(null)}>Cancel</Button><Button variant="primary" onClick={handleSubmitGrade} disabled={score === 0}><Send className="h-4 w-4 mr-2" />Submit</Button></div>
                            </CardContent>
                        </Card>
                    ) : (
                        <Card><CardContent className="py-12"><EmptyState icon={<FileText className="h-12 w-12" />} title="Select a submission" description="Click to review" /></CardContent></Card>
                    )}
                </div>
            </div>
        </div>
    );
}
