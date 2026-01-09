'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Menu, X, Bell, Search, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
    title?: string;
    showMobileMenu?: boolean;
    onMobileMenuToggle?: () => void;
}

export function Header({ title, showMobileMenu = false, onMobileMenuToggle }: HeaderProps) {
    const [showNotifications, setShowNotifications] = useState(false);

    return (
        <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-md border-b border-border">
            <div className="flex items-center justify-between h-16 px-4 md:px-6">
                {/* Left side */}
                <div className="flex items-center gap-4">
                    {/* Mobile menu button */}
                    <button
                        type="button"
                        onClick={onMobileMenuToggle}
                        className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
                        aria-label={showMobileMenu ? 'Close menu' : 'Open menu'}
                    >
                        {showMobileMenu ? (
                            <X className="h-5 w-5" />
                        ) : (
                            <Menu className="h-5 w-5" />
                        )}
                    </button>

                    {/* Mobile logo */}
                    <Link href="/" className="md:hidden flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                            <GraduationCap className="h-5 w-5 text-white" />
                        </div>
                    </Link>

                    {/* Page title */}
                    {title && (
                        <h1 className="hidden md:block text-xl font-semibold text-foreground">
                            {title}
                        </h1>
                    )}
                </div>

                {/* Right side */}
                <div className="flex items-center gap-2">
                    {/* Search (desktop only) */}
                    <div className="hidden md:flex items-center">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <input
                                type="search"
                                placeholder="Search lessons..."
                                className="pl-10 pr-4 py-2 w-64 rounded-xl border border-border bg-muted/50 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                aria-label="Search lessons"
                            />
                        </div>
                    </div>

                    {/* Notifications */}
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setShowNotifications(!showNotifications)}
                            className="relative p-2 rounded-lg hover:bg-muted transition-colors"
                            aria-label="Notifications"
                            aria-expanded={showNotifications}
                        >
                            <Bell className="h-5 w-5 text-muted-foreground" />
                            {/* Notification badge */}
                            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-error-500" />
                        </button>

                        {/* Notifications dropdown */}
                        {showNotifications && (
                            <div className="absolute right-0 mt-2 w-80 rounded-xl border border-border bg-card shadow-xl animate-fade-in">
                                <div className="p-4 border-b border-border">
                                    <h3 className="font-semibold">Notifications</h3>
                                </div>
                                <div className="p-4">
                                    <p className="text-sm text-muted-foreground">No new notifications</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

// Page container component
interface PageContainerProps {
    children: React.ReactNode;
    className?: string;
}

export function PageContainer({ children, className }: PageContainerProps) {
    return (
        <main className={cn('flex-1 p-4 md:p-6 lg:p-8', className)}>
            {children}
        </main>
    );
}

// Page header component
interface PageHeaderProps {
    title: string;
    description?: string;
    action?: React.ReactNode;
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h1>
                {description && (
                    <p className="text-muted-foreground mt-1">{description}</p>
                )}
            </div>
            {action && <div>{action}</div>}
        </div>
    );
}
