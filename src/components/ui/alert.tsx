import * as React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'info' | 'success' | 'warning' | 'error';
    title?: string;
    onClose?: () => void;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
    ({ className, variant = 'info', title, onClose, children, ...props }, ref) => {
        const variants = {
            info: {
                container: 'bg-primary-50 border-primary-200 text-primary-900',
                icon: <Info className="h-5 w-5 text-primary-600" aria-hidden="true" />,
                iconBg: 'bg-primary-100',
            },
            success: {
                container: 'bg-success-50 border-success-200 text-success-900',
                icon: <CheckCircle2 className="h-5 w-5 text-success-600" aria-hidden="true" />,
                iconBg: 'bg-success-100',
            },
            warning: {
                container: 'bg-warning-50 border-warning-200 text-warning-900',
                icon: <AlertTriangle className="h-5 w-5 text-warning-600" aria-hidden="true" />,
                iconBg: 'bg-warning-100',
            },
            error: {
                container: 'bg-error-50 border-error-200 text-error-900',
                icon: <AlertCircle className="h-5 w-5 text-error-600" aria-hidden="true" />,
                iconBg: 'bg-error-100',
            },
        };

        const { container, icon, iconBg } = variants[variant];

        return (
            <div
                ref={ref}
                role="alert"
                className={cn(
                    'relative flex gap-3 rounded-xl border p-4',
                    container,
                    className
                )}
                {...props}
            >
                <div className={cn('flex-shrink-0 rounded-lg p-1', iconBg)}>
                    {icon}
                </div>
                <div className="flex-1 min-w-0">
                    {title && (
                        <h4 className="font-semibold mb-1">{title}</h4>
                    )}
                    <div className="text-sm">{children}</div>
                </div>
                {onClose && (
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-shrink-0 rounded-lg p-1 hover:bg-black/5 transition-colors"
                        aria-label="Dismiss"
                    >
                        <X className="h-4 w-4" aria-hidden="true" />
                    </button>
                )}
            </div>
        );
    }
);

Alert.displayName = 'Alert';

export { Alert };
