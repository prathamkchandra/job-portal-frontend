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
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="font-bold text-xl text-blue-600">
              JobPortal
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-gray-700">
                  {user.email} <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{user.role}</span>
                </span>

                {user.role === 'candidate' && (
                  <Link href="/jobs" className="text-blue-600 hover:text-blue-800">
                    Jobs
                  </Link>
                )}

                {user.role === 'recruiter' && (
                  <>
                    <Link href="/recruiter/jobs" className="text-blue-600 hover:text-blue-800">
                      My Jobs
                    </Link>
                    <Link href="/recruiter/post-job" className="text-blue-600 hover:text-blue-800">
                      Post Job
                    </Link>
                  </>
                )}

                {user.role === 'candidate' && (
                  <Link href="/dashboard" className="text-blue-600 hover:text-blue-800">
                    Dashboard
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-blue-600 hover:text-blue-800">
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
