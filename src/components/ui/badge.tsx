import * as React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'outline';
    size?: 'sm' | 'md';
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
    ({ className, variant = 'default', size = 'md', ...props }, ref) => {
        const variants = {
            default: 'bg-muted text-foreground',
            primary: 'bg-primary-100 text-primary-700',
            secondary: 'bg-secondary-100 text-secondary-700',
            success: 'bg-success-50 text-success-600',
            warning: 'bg-warning-50 text-warning-600',
            error: 'bg-error-50 text-error-600',
            outline: 'bg-transparent border border-border text-foreground',
        };

        const sizes = {
            sm: 'px-2 py-0.5 text-xs',
            md: 'px-2.5 py-1 text-sm',
        };

        return (
            <span
                ref={ref}
                className={cn(
                    'inline-flex items-center font-medium rounded-full',
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            />
        );
    }
);

Badge.displayName = 'Badge';

// Mastery badge - special variant for mastery status
interface MasteryBadgeProps {
    status: 'not_started' | 'practicing' | 'mastered';
    size?: 'sm' | 'md';
}

const MasteryBadge: React.FC<MasteryBadgeProps> = ({ status, size = 'md' }) => {
    const statusConfig = {
        not_started: { label: 'Not Started', variant: 'default' as const },
        practicing: { label: 'Practicing', variant: 'warning' as const },
        mastered: { label: 'Mastered', variant: 'success' as const },
    };

    const { label, variant } = statusConfig[status];

    return <Badge variant={variant} size={size}>{label}</Badge>;
};

export { Badge, MasteryBadge };
