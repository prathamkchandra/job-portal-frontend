'use client';

import { useAuth } from '@/lib/auth-context';
import Link from 'next/link';

export default function Home() {
  const { user } = useAuth();

  const filters = [
    'Remote',
    'MNC',
    'Marketing',
    'HR',
    'Software',
    'Startup',
    'Supply Chain',
    'Fortune 500',
    'Sales',
    'Banking & Finance',
    'Data Science',
  ];

  const companies = [
    { name: 'Google', openings: '214 roles', tone: 'from-blue-500 to-blue-600' },
    { name: 'Adobe', openings: '102 roles', tone: 'from-amber-500 to-rose-500' },
    { name: 'Netflix', openings: '87 roles', tone: 'from-slate-800 to-slate-700' },
    { name: 'Salesforce', openings: '156 roles', tone: 'from-sky-500 to-cyan-500' },
    { name: 'Flipkart', openings: '64 roles', tone: 'from-indigo-500 to-violet-500' },
    { name: 'Accenture', openings: '190 roles', tone: 'from-emerald-500 to-teal-500' },
  ];

  const services = [
    { title: 'Resume review', desc: 'ATS-safe formatting & keyword boost', icon: '🧭' },
    { title: 'Interview prep', desc: 'Role-specific mock interviews', icon: '🎯' },
    { title: 'Career coaching', desc: '1:1 guidance for your next move', icon: '🤝' },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_15%_20%,#e3f2ff,transparent_32%),radial-gradient(circle_at_80%_0%,#ffe5d0,transparent_30%),linear-gradient(180deg,#f9fbff_0%,#ffffff_55%,#f9fbff_100%)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-10 top-24 h-52 w-52 rounded-full bg-blue-100 blur-3xl" />
        <div className="absolute right-10 top-10 h-40 w-40 rounded-full bg-amber-100 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 bg-sky-50 blur-3xl" />
      </div>

      <main className="relative mx-auto flex w-full max-w-7xl flex-col gap-16 px-6 pb-20 pt-10 lg:px-10">
        <section id="jobs" className="flex flex-col items-center gap-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
            5 lakh+ jobs for you to explore
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
              Find your dream job now
            </h1>
            <p className="text-lg text-slate-600 sm:text-xl">
              Search by skills, experience, and location to land the role you deserve.
            </p>
          </div>

          <div className="w-full max-w-5xl rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_24px_70px_-35px_rgba(15,23,42,0.25)]">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <div className="flex flex-1 items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                <span className="text-slate-400">🔍</span>
                <input
                  type="text"
                  placeholder="Enter skills / designations / companies"
                  className="w-full bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
                />
              </div>
              <div className="flex flex-1 items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                <span className="text-slate-400">📈</span>
                <input
                  type="text"
                  placeholder="Select experience"
                  className="w-full bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
                />
              </div>
              <div className="flex flex-1 items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                <span className="text-slate-400">📍</span>
                <input
                  type="text"
                  placeholder="Enter location"
                  className="w-full bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
                />
              </div>
              <button className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl lg:w-auto">
                Search
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              {filters.map((filter) => (
                <button
                  key={filter}
                  className="flex items-center gap-2 rounded-full border border-slate-100 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700"
                >
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 text-xs text-blue-600">
                    ●
                  </span>
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-semibold text-slate-600">
            <span className="rounded-full bg-white/80 px-4 py-2 shadow-sm backdrop-blur">Trending roles</span>
            <span className="rounded-full bg-white/80 px-4 py-2 shadow-sm backdrop-blur">Verified employers</span>
            <span className="rounded-full bg-white/80 px-4 py-2 shadow-sm backdrop-blur">Smart recommendations</span>
          </div>

          {!user ? (
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/signup"
                className="rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl"
              >
                Create your profile
              </Link>
              <Link
                href="/login"
                className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-700"
              >
                Login
              </Link>
            </div>
          ) : user.role === 'candidate' ? (
            <Link
              href="/jobs"
              className="rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl"
            >
              Continue to jobs
            </Link>
          ) : (
            <Link
              href="/recruiter/post-job"
              className="rounded-full bg-gradient-to-r from-amber-500 to-rose-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl"
            >
              Post a job
            </Link>
          )}
        </section>

        <section id="companies" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">Top companies hiring now</h2>
            <Link
              href="/jobs"
              className="text-sm font-semibold text-blue-700 hover:text-blue-800"
            >
              View all jobs →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {companies.map((company) => (
              <div
                key={company.name}
                className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.35)] transition hover:-translate-y-1"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${company.tone} text-white text-lg font-semibold`}
                  >
                    {company.name[0]}
                  </span>
                  <div>
                    <p className="text-base font-semibold text-slate-900">{company.name}</p>
                    <p className="text-sm text-slate-500">{company.openings}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
                  <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  Actively hiring
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="services" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">Career services for candidates</h2>
            <span className="text-sm font-semibold text-blue-700">Personalized & expert-led</span>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.35)]"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-lg">
                    {service.icon}
                  </span>
                  <h3 className="text-base font-semibold text-slate-900">{service.title}</h3>
                </div>
                <p className="mt-3 text-sm text-slate-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
