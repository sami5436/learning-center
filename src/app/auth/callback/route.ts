import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get('code');
    const token_hash = searchParams.get('token_hash');
    const type = searchParams.get('type');
    const next = searchParams.get('next') ?? '/';

    const supabase = await createClient();

    // Handle PKCE code exchange (used by magic link with PKCE)
    if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
            console.error('Code exchange error:', error);
            return NextResponse.redirect(`${origin}/login?error=auth_callback_error`);
        }
    }

    // Handle token hash (used by email OTP/magic link without PKCE)
    if (token_hash && type) {
        const { error } = await supabase.auth.verifyOtp({
            token_hash,
            type: type as 'email' | 'magiclink',
        });
        if (error) {
            console.error('OTP verification error:', error);
            return NextResponse.redirect(`${origin}/login?error=auth_callback_error`);
        }
    }

    // Get user after authentication
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
        // Check if profile exists
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();

        // If no profile exists, the trigger should have created one, but let's handle the case
        if (profileError || !profile) {
            console.log('No profile found, user may need admin to set role');
            // Default to student for new users
            return NextResponse.redirect(`${origin}/student/today`);
        }

        const redirectPath = profile.role === 'admin'
            ? '/admin/dashboard'
            : '/student/today';

        return NextResponse.redirect(`${origin}${redirectPath}`);
    }

    // No user found after auth attempt, redirect to login
    return NextResponse.redirect(`${origin}/login?error=no_user`);
}
