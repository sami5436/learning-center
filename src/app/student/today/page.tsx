import { getCurrentUser } from '@/lib/supabase/server';
import { StudentTodayClient } from './StudentTodayClient';

export const metadata = {
    title: 'Today - HomeSchool',
};

export default async function StudentTodayPage() {
    const user = await getCurrentUser();

    return (
        <StudentTodayClient
            studentName={user?.profile.display_name || 'Student'}
        />
    );
}
