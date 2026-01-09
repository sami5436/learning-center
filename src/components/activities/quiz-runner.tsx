'use client';

import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import type { Question, QuestionOption, SubmissionAnswer } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/input';
import { Check, X, ChevronRight, RotateCcw, Trophy, Lightbulb } from 'lucide-react';

interface QuizRunnerProps {
    questions: Question[];
    onComplete: (answers: SubmissionAnswer[], score: number, maxScore: number) => void;
    onProgress?: (current: number, total: number) => void;
    showHints?: boolean;
    allowRetry?: boolean;
}

export function QuizRunner({
    questions,
    onComplete,
    onProgress,
    showHints = true,
    allowRetry = true,
}: QuizRunnerProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<SubmissionAnswer[]>([]);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [shortAnswer, setShortAnswer] = useState('');
    const [showFeedback, setShowFeedback] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const currentQuestion = questions[currentIndex];
    const progress = ((currentIndex + 1) / questions.length) * 100;

    const getCorrectAnswer = useCallback((question: Question): string[] => {
        if (question.type === 'short_answer') {
            return question.correct_answer ? [question.correct_answer.toLowerCase().trim()] : [];
        }
        return question.options?.filter(o => o.is_correct).map(o => o.id) || [];
    }, []);

    const checkAnswer = useCallback(() => {
        const correctAnswers = getCorrectAnswer(currentQuestion);
        let isCorrect = false;
        let pointsEarned = 0;

        if (currentQuestion.type === 'short_answer') {
            isCorrect = correctAnswers.includes(shortAnswer.toLowerCase().trim());
        } else if (currentQuestion.type === 'multi_select') {
            const sortedSelected = [...selectedOptions].sort();
            const sortedCorrect = [...correctAnswers].sort();
            isCorrect = sortedSelected.length === sortedCorrect.length &&
                sortedSelected.every((v, i) => v === sortedCorrect[i]);
        } else {
            isCorrect = selectedOptions.length === 1 && correctAnswers.includes(selectedOptions[0]);
        }

        if (isCorrect) {
            pointsEarned = currentQuestion.points;
        }

        const answer: SubmissionAnswer = {
            question_id: currentQuestion.id,
            answer: currentQuestion.type === 'short_answer' ? shortAnswer : selectedOptions,
            is_correct: isCorrect,
            points_earned: pointsEarned,
        };

        setAnswers(prev => [...prev, answer]);
        setShowFeedback(true);

        return isCorrect;
    }, [currentQuestion, selectedOptions, shortAnswer, getCorrectAnswer]);

    const handleNext = () => {
        setShowFeedback(false);
        setShowHint(false);
        setSelectedOptions([]);
        setShortAnswer('');

        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
            onProgress?.(currentIndex + 2, questions.length);
        } else {
            // Calculate final score
            const score = answers.reduce((sum, a) => sum + (a.points_earned || 0), 0);
            const maxScore = questions.reduce((sum, q) => sum + q.points, 0);
            setIsComplete(true);
            onComplete(answers, score, maxScore);
        }
    };

    const handleRetry = () => {
        setCurrentIndex(0);
        setAnswers([]);
        setSelectedOptions([]);
        setShortAnswer('');
        setShowFeedback(false);
        setShowHint(false);
        setIsComplete(false);
        onProgress?.(1, questions.length);
    };

    const toggleOption = (optionId: string) => {
        if (currentQuestion.type === 'multi_select') {
            setSelectedOptions(prev =>
                prev.includes(optionId)
                    ? prev.filter(id => id !== optionId)
                    : [...prev, optionId]
            );
        } else {
            setSelectedOptions([optionId]);
        }
    };

    const hasAnswered = currentQuestion.type === 'short_answer'
        ? shortAnswer.trim().length > 0
        : selectedOptions.length > 0;

    const lastAnswer = answers[answers.length - 1];
    const wasCorrect = lastAnswer?.is_correct;

    // Completion screen
    if (isComplete) {
        const score = answers.reduce((sum, a) => sum + (a.points_earned || 0), 0);
        const maxScore = questions.reduce((sum, q) => sum + q.points, 0);
        const percentage = Math.round((score / maxScore) * 100);
        const passed = percentage >= 85;

        return (
            <div className="text-center py-8 animate-fade-in">
                <div className={cn(
                    'w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center',
                    passed ? 'bg-success-100' : 'bg-warning-50'
                )}>
                    <Trophy className={cn(
                        'h-10 w-10',
                        passed ? 'text-success-500' : 'text-warning-500'
                    )} />
                </div>

                <h2 className="text-2xl font-bold text-foreground mb-2">
                    {passed ? 'Great Job!' : 'Keep Practicing!'}
                </h2>

                <p className="text-muted-foreground mb-6">
                    You scored {score} out of {maxScore} points ({percentage}%)
                </p>

                <div className="flex justify-center gap-3">
                    {allowRetry && !passed && (
                        <Button variant="secondary" onClick={handleRetry}>
                            <RotateCcw className="h-4 w-4 mr-2" />
                            Try Again
                        </Button>
                    )}
                    <Button variant="primary" onClick={() => onComplete(answers, score, maxScore)}>
                        Continue
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Progress */}
            <div className="flex items-center gap-4">
                <Progress value={progress} size="sm" variant="primary" />
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                    {currentIndex + 1} / {questions.length}
                </span>
            </div>

            {/* Question */}
            <Card>
                <CardContent className="py-6">
                    <div className="flex items-start justify-between gap-4 mb-6">
                        <h3 className="text-lg font-medium text-foreground">
                            {currentQuestion.question_text}
                        </h3>
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full whitespace-nowrap">
                            {currentQuestion.points} pts
                        </span>
                    </div>

                    {/* Answer options */}
                    {(currentQuestion.type === 'multiple_choice' || currentQuestion.type === 'multi_select') && (
                        <div className="space-y-3">
                            {currentQuestion.type === 'multi_select' && (
                                <p className="text-sm text-muted-foreground mb-2">Select all that apply</p>
                            )}
                            {currentQuestion.options?.map((option) => {
                                const isSelected = selectedOptions.includes(option.id);
                                const showResult = showFeedback;
                                const isCorrectOption = option.is_correct;

                                return (
                                    <button
                                        key={option.id}
                                        type="button"
                                        onClick={() => !showFeedback && toggleOption(option.id)}
                                        disabled={showFeedback}
                                        className={cn(
                                            'w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all',
                                            !showResult && isSelected && 'border-primary-500 bg-primary-50',
                                            !showResult && !isSelected && 'border-border hover:border-neutral-300',
                                            showResult && isCorrectOption && 'border-success-500 bg-success-50',
                                            showResult && isSelected && !isCorrectOption && 'border-error-500 bg-error-50'
                                        )}
                                        aria-pressed={isSelected}
                                    >
                                        <div className={cn(
                                            'w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0',
                                            !showResult && isSelected && 'border-primary-500 bg-primary-500',
                                            !showResult && !isSelected && 'border-neutral-300',
                                            showResult && isCorrectOption && 'border-success-500 bg-success-500',
                                            showResult && isSelected && !isCorrectOption && 'border-error-500 bg-error-500'
                                        )}>
                                            {showResult && isCorrectOption && <Check className="h-4 w-4 text-white" />}
                                            {showResult && isSelected && !isCorrectOption && <X className="h-4 w-4 text-white" />}
                                            {!showResult && isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                                        </div>
                                        <span className={cn(
                                            'text-foreground',
                                            showResult && isCorrectOption && 'font-medium text-success-700',
                                            showResult && isSelected && !isCorrectOption && 'text-error-700'
                                        )}>
                                            {option.text}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    {/* Short answer */}
                    {currentQuestion.type === 'short_answer' && (
                        <div>
                            <Textarea
                                value={shortAnswer}
                                onChange={(e) => setShortAnswer(e.target.value)}
                                placeholder="Type your answer here..."
                                disabled={showFeedback}
                                className="min-h-[100px]"
                            />
                            {showFeedback && (
                                <p className="mt-2 text-sm text-muted-foreground">
                                    Correct answer: {currentQuestion.correct_answer}
                                </p>
                            )}
                        </div>
                    )}

                    {/* Feedback */}
                    {showFeedback && currentQuestion.explanation && (
                        <Alert variant={wasCorrect ? 'success' : 'info'} className="mt-4">
                            <strong>{wasCorrect ? 'Correct!' : 'Not quite.'}</strong> {currentQuestion.explanation}
                        </Alert>
                    )}
                </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex items-center justify-between">
                {showHints && currentQuestion.hint && !showFeedback && (
                    <Button variant="ghost" size="sm" onClick={() => setShowHint(!showHint)}>
                        <Lightbulb className="h-4 w-4 mr-2" />
                        {showHint ? 'Hide Hint' : 'Show Hint'}
                    </Button>
                )}
                {(!showHints || !currentQuestion.hint) && <div />}

                {!showFeedback ? (
                    <Button
                        variant="primary"
                        onClick={checkAnswer}
                        disabled={!hasAnswered}
                    >
                        Check Answer
                    </Button>
                ) : (
                    <Button variant="primary" onClick={handleNext}>
                        {currentIndex < questions.length - 1 ? (
                            <>
                                Next <ChevronRight className="h-4 w-4 ml-1" />
                            </>
                        ) : (
                            'Finish Quiz'
                        )}
                    </Button>
                )}
            </div>

            {/* Hint display */}
            {showHint && currentQuestion.hint && (
                <Alert variant="info" className="animate-fade-in">
                    <strong>Hint:</strong> {currentQuestion.hint}
                </Alert>
            )}
        </div>
    );
}
