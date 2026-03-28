'use client';

import { useAuth } from '@/lib/auth-context';
import { apiClient } from '@/lib/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    apiClient.logout();
    router.push('/login');
  };

  return (
    <nav className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white font-bold">
                JP
              </span>
              JobPortal
            </Link>
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-700">
              <Link href="/#jobs" className="hover:text-blue-700 transition-colors">
                Jobs
              </Link>
              <Link href="/#companies" className="hover:text-blue-700 transition-colors">
                Companies
              </Link>
              <Link href="/#services" className="hover:text-blue-700 transition-colors">
                Services
              </Link>
              <Link href="/recruiter" className="hover:text-blue-700 transition-colors">
                For Employers
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <span className="hidden sm:inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 text-sm text-slate-700">
                  <span className="font-semibold">{user.email}</span>
                  <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700 capitalize">
                    {user.role}
                  </span>
                </span>

                {user.role === 'candidate' && (
                  <Link
                    href="/dashboard"
                    className="hidden sm:inline-flex rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-blue-200 hover:text-blue-700"
                  >
                    Dashboard
                  </Link>
                )}

                {user.role === 'recruiter' && (
                  <Link
                    href="/recruiter/post-job"
                    className="hidden sm:inline-flex rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-blue-200 hover:text-blue-700"
                  >
                    Post a Job
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:shadow-md transition-shadow"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-blue-300 hover:text-blue-700"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="rounded-full bg-gradient-to-r from-amber-500 to-rose-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:shadow-md transition-shadow"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
