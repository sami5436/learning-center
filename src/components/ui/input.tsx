import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    hint?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, label, error, hint, id, ...props }, ref) => {
        const inputId = id || React.useId();
        const errorId = `${inputId}-error`;
        const hintId = `${inputId}-hint`;

        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="block text-sm font-medium text-foreground mb-1.5"
                    >
                        {label}
                    </label>
                )}
                <input
                    type={type}
                    id={inputId}
                    ref={ref}
                    aria-invalid={!!error}
                    aria-describedby={error ? errorId : hint ? hintId : undefined}
                    className={cn(
                        'flex w-full rounded-xl border bg-card px-4 py-2.5 text-base transition-all duration-200',
                        'placeholder:text-muted-foreground',
                        'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
                        'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted',
                        error
                            ? 'border-error-500 focus:ring-error-500 focus:border-error-500'
                            : 'border-border hover:border-neutral-400',
                        className
                    )}
                    {...props}
                />
                {hint && !error && (
                    <p id={hintId} className="mt-1.5 text-sm text-muted-foreground">
                        {hint}
                    </p>
                )}
                {error && (
                    <p id={errorId} className="mt-1.5 text-sm text-error-500" role="alert">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    hint?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, label, error, hint, id, ...props }, ref) => {
        const textareaId = id || React.useId();
        const errorId = `${textareaId}-error`;
        const hintId = `${textareaId}-hint`;

        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={textareaId}
                        className="block text-sm font-medium text-foreground mb-1.5"
                    >
                        {label}
                    </label>
                )}
                <textarea
                    id={textareaId}
                    ref={ref}
                    aria-invalid={!!error}
                    aria-describedby={error ? errorId : hint ? hintId : undefined}
                    className={cn(
                        'flex w-full rounded-xl border bg-card px-4 py-2.5 text-base transition-all duration-200 min-h-[100px] resize-y',
                        'placeholder:text-muted-foreground',
                        'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
                        'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted',
                        error
                            ? 'border-error-500 focus:ring-error-500 focus:border-error-500'
                            : 'border-border hover:border-neutral-400',
                        className
                    )}
                    {...props}
                />
                {hint && !error && (
                    <p id={hintId} className="mt-1.5 text-sm text-muted-foreground">
                        {hint}
                    </p>
                )}
                {error && (
                    <p id={errorId} className="mt-1.5 text-sm text-error-500" role="alert">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

Textarea.displayName = 'Textarea';

export { Input, Textarea };
