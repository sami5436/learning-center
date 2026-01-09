import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/supabase/server';

export default async function HomePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  // Redirect based on role
  if (user.profile.role === 'admin') {
    redirect('/admin/dashboard');
  } else {
    redirect('/student/today');
  }
}
