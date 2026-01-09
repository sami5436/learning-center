'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/lib/utils';
import type { RubricItem } from '@/types';
import { writingSubmissionSchema, type WritingSubmissionFormData } from '@/lib/validations';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Send, FileText, CheckCircle } from 'lucide-react';

interface WritingPromptProps {
    prompt: string;
    instructions?: string;
    rubric?: RubricItem[];
    minWords?: number;
    maxWords?: number;
    onSubmit: (content: string) => Promise<void>;
    previousSubmission?: string;
}

export function WritingPrompt({
    prompt,
    instructions,
    rubric,
    minWords = 50,
    maxWords = 500,
    onSubmit,
    previousSubmission,
}: WritingPromptProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(!!previousSubmission);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<WritingSubmissionFormData>({
        resolver: zodResolver(writingSubmissionSchema),
        defaultValues: {
            content: previousSubmission || '',
        },
    });

    const content = watch('content');
    const wordCount = content?.trim().split(/\s+/).filter(Boolean).length || 0;
    const wordProgress = Math.min((wordCount / minWords) * 100, 100);
    const isMinMet = wordCount >= minWords;
    const isMaxExceeded = wordCount > maxWords;

    const onFormSubmit = async (data: WritingSubmissionFormData) => {
        try {
            setIsSubmitting(true);
            setSubmitError(null);
            await onSubmit(data.content);
            setIsSubmitted(true);
        } catch (error) {
            setSubmitError('Failed to submit. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="text-center py-8 animate-fade-in">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center bg-success-100">
                    <CheckCircle className="h-8 w-8 text-success-500" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                    Response Submitted!
                </h3>
                <p className="text-muted-foreground mb-4">
                    Your teacher will review your writing and provide feedback.
                </p>
                <Button variant="ghost" onClick={() => setIsSubmitted(false)}>
                    Edit Response
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Prompt */}
            <Card variant="gradient">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Writing Prompt
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-lg font-medium text-foreground mb-4">
                        {prompt}
                    </p>
                    {instructions && (
                        <p className="text-sm text-muted-foreground">
                            {instructions}
                        </p>
                    )}
                </CardContent>
            </Card>

            {/* Rubric */}
            {rubric && rubric.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">How You&apos;ll Be Graded</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {rubric.map((item, index) => (
                                <div key={index} className="flex justify-between items-start gap-4">
                                    <div>
                                        <p className="font-medium text-foreground">{item.criterion}</p>
                                        <p className="text-sm text-muted-foreground">{item.description}</p>
                                    </div>
                                    <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                                        {item.points} pts
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
                <div>
                    <Textarea
                        {...register('content')}
                        placeholder="Start writing your response here..."
                        className={cn(
                            'min-h-[250px]',
                            isMaxExceeded && 'border-error-500'
                        )}
                        error={errors.content?.message}
                        aria-describedby="word-count"
                    />
                </div>

                {/* Word count */}
                <div className="flex items-center justify-between gap-4" id="word-count">
                    <div className="flex-1">
                        <Progress
                            value={wordProgress}
                            size="sm"
                            variant={isMinMet ? 'success' : 'primary'}
                        />
                    </div>
                    <span className={cn(
                        'text-sm font-medium tabular-nums',
                        isMaxExceeded ? 'text-error-500' : isMinMet ? 'text-success-500' : 'text-muted-foreground'
                    )}>
                        {wordCount} / {minWords} words
                        {isMaxExceeded && ` (max: ${maxWords})`}
                    </span>
                </div>

                {/* Error */}
                {submitError && (
                    <Alert variant="error" onClose={() => setSubmitError(null)}>
                        {submitError}
                    </Alert>
                )}

                {/* Submit */}
                <div className="flex justify-end">
                    <Button
                        type="submit"
                        variant="primary"
                        isLoading={isSubmitting}
                        disabled={!isMinMet || isMaxExceeded}
                    >
                        <Send className="h-4 w-4 mr-2" />
                        Submit Response
                    </Button>
                </div>
            </form>
        </div>
    );
}
