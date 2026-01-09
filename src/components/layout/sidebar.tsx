'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
    Home,
    Calendar,
    BookOpen,
    Users,
    ClipboardCheck,
    BarChart3,
    GraduationCap,
    BookMarked,
    Trophy,
    Settings,
    LogOut,
} from 'lucide-react';

interface SidebarItem {
    label: string;
    href: string;
    icon: React.ReactNode;
}

const adminItems: SidebarItem[] = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: <Home className="h-5 w-5" /> },
    { label: 'Schedule', href: '/admin/schedule', icon: <Calendar className="h-5 w-5" /> },
    { label: 'Curriculum', href: '/admin/curriculum', icon: <BookOpen className="h-5 w-5" /> },
    { label: 'Students', href: '/admin/students', icon: <Users className="h-5 w-5" /> },
    { label: 'Grading', href: '/admin/grading', icon: <ClipboardCheck className="h-5 w-5" /> },
    { label: 'Reports', href: '/admin/reports', icon: <BarChart3 className="h-5 w-5" /> },
];

const studentItems: SidebarItem[] = [
    { label: 'Today', href: '/student/today', icon: <Home className="h-5 w-5" /> },
    { label: 'Subjects', href: '/student/subjects', icon: <BookMarked className="h-5 w-5" /> },
    { label: 'Progress', href: '/student/progress', icon: <Trophy className="h-5 w-5" /> },
];

interface SidebarProps {
    role: 'admin' | 'student';
    displayName: string;
}

export function Sidebar({ role, displayName }: SidebarProps) {
    const pathname = usePathname();
    const items = role === 'admin' ? adminItems : studentItems;

    return (
        <aside className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border flex flex-col z-40">
            {/* Logo / Brand */}
            <div className="p-6 border-b border-border">
                <Link href={role === 'admin' ? '/admin/dashboard' : '/student/today'} className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                        <GraduationCap className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h1 className="font-bold text-lg text-foreground">HomeSchool</h1>
                        <p className="text-xs text-muted-foreground">Learning Platform</p>
                    </div>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 overflow-y-auto" aria-label="Main navigation">
                <ul className="space-y-1">
                    {items.map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={cn(
                                        'flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group',
                                        isActive
                                            ? 'bg-primary-100 text-primary-700 font-medium'
                                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                    )}
                                    aria-current={isActive ? 'page' : undefined}
                                >
                                    <span className={cn(
                                        'transition-transform duration-200',
                                        isActive ? 'scale-110' : 'group-hover:scale-105'
                                    )}>
                                        {item.icon}
                                    </span>
                                    {item.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* User section */}
            <div className="p-4 border-t border-border">
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/50 mb-2">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white font-semibold text-sm">
                        {displayName.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{displayName}</p>
                        <p className="text-xs text-muted-foreground capitalize">{role}</p>
                    </div>
                </div>

                <div className="flex gap-2">
                    <Link
                        href="/settings"
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted transition-colors"
                    >
                        <Settings className="h-4 w-4" />
                        Settings
                    </Link>
                    <form action="/auth/signout" method="post" className="flex-1">
                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-error-500 transition-colors"
                        >
                            <LogOut className="h-4 w-4" />
                            Logout
                        </button>
                    </form>
                </div>
            </div>
        </aside>
    );
}
