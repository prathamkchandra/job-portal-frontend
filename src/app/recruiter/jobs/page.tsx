'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api';
import { ProtectedRoute } from '@/components/protected-route';
import { Job } from '@/lib/types';
import Link from 'next/link';

export default function RecruiterJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // In a real app, you'd have an endpoint to get recruiter's own jobs
        const data = await apiClient.getJobs();
        setJobs(data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleDelete = async (jobId: number) => {
    if (!confirm('Are you sure you want to delete this job?')) return;

    try {
      await apiClient.deleteJob(jobId);
      setJobs(jobs.filter((j) => j.id !== jobId));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete job');
    }
  };

  return (
    <ProtectedRoute requiredRole="recruiter">
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Job Postings</h1>
            <Link
              href="/recruiter/post-job"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold"
            >
              Post New Job
            </Link>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4 mb-4">
              <p className="text-sm font-medium text-red-800">{error}</p>
            </div>
          )}

          {loading ? (
            <div className="text-center text-gray-600">Loading jobs...</div>
          ) : jobs.length === 0 ? (
            <div className="text-center text-gray-600">
              No jobs posted yet.{' '}
              <Link href="/recruiter/post-job" className="text-blue-600 hover:text-blue-800">
                Create your first job posting
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <div key={job.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                      <p className="text-gray-600 mt-2">{job.description}</p>
                    </div>
                    <span className={`px-3 py-1 rounded text-sm font-medium ${
                      job.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {job.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Required Skills:</h4>
                    <div className="flex flex-wrap gap-2">
                      {job.requiredSkills.split(',').map((skill) => (
                        <span
                          key={skill.trim()}
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                        >
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 mb-4">
                    Posted on {new Date(job.createdAt).toLocaleDateString()}
                  </p>

                  <div className="flex gap-3">
                    <Link
                      href={`/recruiter/applicants/${job.id}`}
                      className="flex-1 text-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      View Applicants
                    </Link>
                    <button
                      onClick={() => handleDelete(job.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
