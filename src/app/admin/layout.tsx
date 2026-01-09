import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/supabase/server';
import { DashboardLayoutClient } from '@/components/layout/dashboard-layout-client';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await getCurrentUser();

    if (!user) {
        redirect('/login');
    }

    if (user.profile.role !== 'admin') {
        redirect('/student/today');
    }

    return (
        <DashboardLayoutClient
            role="admin"
            displayName={user.profile.display_name}
        >
            {children}
        </DashboardLayoutClient>
    );
}
