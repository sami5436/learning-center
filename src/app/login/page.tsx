'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createClient } from '@/lib/supabase/client';
import { loginSchema, magicLinkSchema, type LoginFormData, type MagicLinkFormData } from '@/lib/validations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert } from '@/components/ui/alert';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { GraduationCap, Mail, Key } from 'lucide-react';

type AuthMode = 'password' | 'magic-link';

export default function LoginPage() {
    const router = useRouter();
    const [mode, setMode] = useState<AuthMode>('password');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const passwordForm = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: '', password: '' },
    });

    const magicLinkForm = useForm<MagicLinkFormData>({
        resolver: zodResolver(magicLinkSchema),
        defaultValues: { email: '' },
    });

    const handlePasswordLogin = async (data: LoginFormData) => {
        try {
            setIsLoading(true);
            setMessage(null);

            const supabase = createClient();
            const { error } = await supabase.auth.signInWithPassword({
                email: data.email,
                password: data.password,
            });

            if (error) {
                setMessage({ type: 'error', text: error.message });
                return;
            }

            router.refresh();
        } catch {
            setMessage({ type: 'error', text: 'An unexpected error occurred' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleMagicLink = async (data: MagicLinkFormData) => {
        try {
            setIsLoading(true);
            setMessage(null);

            const supabase = createClient();
            const { error } = await supabase.auth.signInWithOtp({
                email: data.email,
                options: {
                    emailRedirectTo: `${window.location.origin}/auth/callback`,
                },
            });

            if (error) {
                setMessage({ type: 'error', text: error.message });
                return;
            }

            setMessage({ type: 'success', text: 'Check your email for a login link!' });
        } catch {
            setMessage({ type: 'error', text: 'An unexpected error occurred' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 p-4">
            <div className="w-full max-w-md space-y-6 animate-fade-in">
                {/* Logo */}
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 shadow-lg shadow-primary-500/25 mb-4">
                        <GraduationCap className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-foreground">HomeSchool</h1>
                    <p className="text-muted-foreground mt-1">Welcome back! Let&apos;s learn something new today.</p>
                </div>

                <Card variant="elevated">
                    <CardHeader className="text-center pb-2">
                        <CardTitle>Sign In</CardTitle>
                        <CardDescription>
                            Choose your preferred sign-in method
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {/* Mode toggle */}
                        <div className="flex bg-muted p-1 rounded-xl" role="tablist">
                            <button
                                type="button"
                                role="tab"
                                aria-selected={mode === 'password'}
                                onClick={() => setMode('password')}
                                className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm font-medium transition-all ${mode === 'password'
                                        ? 'bg-card text-foreground shadow-sm'
                                        : 'text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                <Key className="w-4 h-4" />
                                Password
                            </button>
                            <button
                                type="button"
                                role="tab"
                                aria-selected={mode === 'magic-link'}
                                onClick={() => setMode('magic-link')}
                                className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm font-medium transition-all ${mode === 'magic-link'
                                        ? 'bg-card text-foreground shadow-sm'
                                        : 'text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                <Mail className="w-4 h-4" />
                                Magic Link
                            </button>
                        </div>

                        {/* Alert */}
                        {message && (
                            <Alert
                                variant={message.type === 'success' ? 'success' : 'error'}
                                onClose={() => setMessage(null)}
                            >
                                {message.text}
                            </Alert>
                        )}

                        {/* Password form */}
                        {mode === 'password' && (
                            <form onSubmit={passwordForm.handleSubmit(handlePasswordLogin)} className="space-y-4">
                                <Input
                                    {...passwordForm.register('email')}
                                    type="email"
                                    label="Email"
                                    placeholder="you@example.com"
                                    error={passwordForm.formState.errors.email?.message}
                                    autoComplete="email"
                                />
                                <Input
                                    {...passwordForm.register('password')}
                                    type="password"
                                    label="Password"
                                    placeholder="••••••••"
                                    error={passwordForm.formState.errors.password?.message}
                                    autoComplete="current-password"
                                />
                                <Button
                                    type="submit"
                                    variant="primary"
                                    className="w-full"
                                    isLoading={isLoading}
                                >
                                    Sign In
                                </Button>
                            </form>
                        )}

                        {/* Magic link form */}
                        {mode === 'magic-link' && (
                            <form onSubmit={magicLinkForm.handleSubmit(handleMagicLink)} className="space-y-4">
                                <Input
                                    {...magicLinkForm.register('email')}
                                    type="email"
                                    label="Email"
                                    placeholder="you@example.com"
                                    hint="We'll send you a magic link to sign in"
                                    error={magicLinkForm.formState.errors.email?.message}
                                    autoComplete="email"
                                />
                                <Button
                                    type="submit"
                                    variant="primary"
                                    className="w-full"
                                    isLoading={isLoading}
                                >
                                    Send Magic Link
                                </Button>
                            </form>
                        )}
                    </CardContent>
                </Card>

                {/* Footer */}
                <p className="text-center text-sm text-muted-foreground">
                    Need help? Contact your parent or teacher.
                </p>
            </div>
        </div>
    );
}
