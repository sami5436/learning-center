import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
                    supabaseResponse = NextResponse.next({
                        request,
                    });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    // Get user and profile
    const {
        data: { user },
    } = await supabase.auth.getUser();

    const publicPaths = ['/login', '/auth/callback', '/'];
    const isPublicPath = publicPaths.some(path =>
        request.nextUrl.pathname === path || request.nextUrl.pathname.startsWith('/auth/')
    );

    // Redirect unauthenticated users to login
    if (!user && !isPublicPath) {
        const url = request.nextUrl.clone();
        url.pathname = '/login';
        return NextResponse.redirect(url);
    }

    // If user is authenticated, check role-based access
    if (user) {
        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();

        // If no profile exists yet, let them through to create one or use default
        if (!profile) {
            // Allow access to any page for now, or redirect to a setup page
            if (request.nextUrl.pathname === '/login') {
                const url = request.nextUrl.clone();
                url.pathname = '/student/today'; // Default to student
                return NextResponse.redirect(url);
            }
            return supabaseResponse;
        }

        const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
        const isStudentRoute = request.nextUrl.pathname.startsWith('/student');

        // Redirect based on role
        // Admin trying to access student routes
        if (isStudentRoute && profile.role === 'admin') {
            const url = request.nextUrl.clone();
            url.pathname = '/admin/dashboard';
            return NextResponse.redirect(url);
        }

        // Student trying to access admin routes
        if (isAdminRoute && profile.role === 'student') {
            const url = request.nextUrl.clone();
            url.pathname = '/student/today';
            return NextResponse.redirect(url);
        }

        // Redirect authenticated users from login to dashboard
        if (request.nextUrl.pathname === '/login') {
            const url = request.nextUrl.clone();
            url.pathname = profile.role === 'admin' ? '/admin/dashboard' : '/student/today';
            return NextResponse.redirect(url);
        }

        // Redirect root to appropriate dashboard
        if (request.nextUrl.pathname === '/') {
            const url = request.nextUrl.clone();
            url.pathname = profile.role === 'admin' ? '/admin/dashboard' : '/student/today';
            return NextResponse.redirect(url);
        }
    }

    return supabaseResponse;
}
