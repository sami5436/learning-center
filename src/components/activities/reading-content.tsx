import * as React from 'react';
import { cn } from '@/lib/utils';

interface ReadingContentProps {
    content: string;
    className?: string;
}

export function ReadingContent({ content, className }: ReadingContentProps) {
    return (
        <article
            className={cn(
                'prose prose-lg max-w-none',
                // Custom prose styling
                'prose-headings:text-foreground prose-headings:font-bold',
                'prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4',
                'prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3',
                'prose-p:text-foreground prose-p:leading-relaxed prose-p:mb-4',
                'prose-strong:text-foreground prose-strong:font-semibold',
                'prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6',
                'prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-6',
                'prose-li:text-foreground prose-li:mb-2',
                'prose-blockquote:border-l-4 prose-blockquote:border-primary-500 prose-blockquote:bg-primary-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:italic',
                'prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono',
                'prose-pre:bg-neutral-900 prose-pre:rounded-xl prose-pre:p-4 prose-pre:overflow-x-auto',
                'prose-img:rounded-xl prose-img:shadow-lg',
                className
            )}
            dangerouslySetInnerHTML={{ __html: content }}
        />
    );
}

// Highlight box for key concepts
interface ConceptBoxProps {
    title: string;
    children: React.ReactNode;
    variant?: 'info' | 'tip' | 'warning' | 'example';
}

export function ConceptBox({ title, children, variant = 'info' }: ConceptBoxProps) {
    const variants = {
        info: 'border-primary-300 bg-primary-50',
        tip: 'border-success-300 bg-success-50',
        warning: 'border-warning-300 bg-warning-50',
        example: 'border-secondary-300 bg-secondary-50',
    };

    const icons = {
        info: '💡',
        tip: '✨',
        warning: '⚠️',
        example: '📝',
    };

    return (
        <div className={cn('rounded-xl border-2 p-4 my-6', variants[variant])}>
            <h4 className="font-semibold text-foreground flex items-center gap-2 mb-2">
                <span>{icons[variant]}</span>
                {title}
            </h4>
            <div className="text-foreground text-sm">{children}</div>
        </div>
    );
}

// Vocabulary word with definition
interface VocabularyWordProps {
    word: string;
    definition: string;
    example?: string;
}

export function VocabularyWord({ word, definition, example }: VocabularyWordProps) {
    return (
        <div className="border-l-4 border-accent-500 pl-4 py-2 my-4">
            <p className="font-bold text-foreground">{word}</p>
            <p className="text-muted-foreground text-sm">{definition}</p>
            {example && (
                <p className="text-sm italic text-neutral-600 mt-1">
                    Example: &quot;{example}&quot;
                </p>
            )}
        </div>
    );
}
