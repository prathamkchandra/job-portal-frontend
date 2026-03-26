'use client';

import { useAuth } from '@/lib/auth-context';
import Link from 'next/link';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-gray-50">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white sm:items-center">
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            Welcome to Job Portal
          </h1>
          <p className="text-xl text-gray-600">
            Find your dream job or hire top talents
          </p>

          {!user ? (
            <div className="flex gap-4 mt-8">
              <Link
                href="/login"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
              >
                Sign Up
              </Link>
            </div>
          ) : user.role === 'candidate' ? (
            <Link
              href="/jobs"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold mt-8"
            >
              Browse Jobs
            </Link>
          ) : user.role === 'recruiter' ? (
            <Link
              href="/recruiter/jobs"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold mt-8"
            >
              Manage Jobs
            </Link>
          ) : null}
        </div>
      </main>
    </div>
  );
}
