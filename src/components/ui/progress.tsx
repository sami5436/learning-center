import * as React from 'react';
import { cn } from '@/lib/utils';

interface ProgressProps {
    value: number;
    max?: number;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'accent';
    showLabel?: boolean;
    label?: string;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
    ({ value, max = 100, size = 'md', variant = 'primary', showLabel = false, label }, ref) => {
        const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

        const sizes = {
            sm: 'h-1.5',
            md: 'h-2.5',
            lg: 'h-4',
        };

        const variants = {
            primary: 'bg-primary-500',
            secondary: 'bg-secondary-500',
            success: 'bg-success-500',
            warning: 'bg-warning-500',
            accent: 'bg-accent-500',
        };

        return (
            <div ref={ref} className="w-full">
                {(showLabel || label) && (
                    <div className="flex justify-between items-center mb-1.5">
                        {label && <span className="text-sm font-medium text-foreground">{label}</span>}
                        {showLabel && (
                            <span className="text-sm text-muted-foreground">{Math.round(percentage)}%</span>
                        )}
                    </div>
                )}
                <div
                    className={cn('w-full bg-muted rounded-full overflow-hidden', sizes[size])}
                    role="progressbar"
                    aria-valuenow={value}
                    aria-valuemin={0}
                    aria-valuemax={max}
                >
                    <div
                        className={cn(
                            'h-full rounded-full transition-all duration-500 ease-out',
                            variants[variant]
                        )}
                        style={{ width: `${percentage}%` }}
                    />
                </div>
            </div>
        );
    }
);

Progress.displayName = 'Progress';

export { Progress };
