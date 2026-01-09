'use client';

import { useState } from 'react';
import { Sidebar, Header } from '@/components/layout';

interface DashboardLayoutClientProps {
    role: 'admin' | 'student';
    displayName: string;
    children: React.ReactNode;
}

export function DashboardLayoutClient({ role, displayName, children }: DashboardLayoutClientProps) {
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    return (
        <div className="min-h-screen bg-background">
            {/* Desktop Sidebar */}
            <div className="hidden md:block">
                <Sidebar role={role} displayName={displayName} />
            </div>

            {/* Mobile Sidebar */}
            {showMobileMenu && (
                <>
                    <div
                        className="fixed inset-0 bg-black/50 z-30 md:hidden"
                        onClick={() => setShowMobileMenu(false)}
                        aria-hidden="true"
                    />
                    <div className="fixed inset-y-0 left-0 z-40 md:hidden">
                        <Sidebar role={role} displayName={displayName} />
                    </div>
                </>
            )}

            {/* Main content area */}
            <div className="md:pl-64">
                <Header onMobileMenuToggle={() => setShowMobileMenu(!showMobileMenu)} showMobileMenu={showMobileMenu} />
                <main className="p-4 md:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
