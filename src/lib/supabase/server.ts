import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createClient() {
    const cookieStore = await cookies();

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        );
                    } catch {
                        // The `setAll` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
            },
        }
    );
}

// Get current user profile with role
export async function getCurrentUser() {
    const supabase = await createClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        return null;
    }

    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    if (profileError || !profile) {
        return null;
    }

    return {
        ...user,
        profile,
    };
}

// Get student data if user is a student
export async function getStudentData(profileId: string) {
    const supabase = await createClient();

    const { data: student, error } = await supabase
        .from('students')
        .select('*, profile:profiles(*)')
        .eq('profile_id', profileId)
        .single();

    if (error) {
        return null;
    }

    return student;
}

// Get all students for an admin (parent)
export async function getStudentsForAdmin(adminId: string) {
    const supabase = await createClient();

    const { data: students, error } = await supabase
        .from('students')
        .select('*, profile:profiles(*)')
        .eq('parent_id', adminId)
        .order('created_at', { ascending: true });

    if (error) {
        return [];
    }

    return students;
}
