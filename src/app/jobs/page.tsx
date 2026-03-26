'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api';
import { ProtectedRoute } from '@/components/protected-route';
import { JobCard } from '@/components/job-card';
import { Job } from '@/lib/types';

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [appliedJobIds, setAppliedJobIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobsData = await apiClient.getJobs();
        setJobs(jobsData);

        // Get user's applications to show which jobs they've applied to
        const applicationsData = await apiClient.getMyApplications();
        setAppliedJobIds(applicationsData.map((app: any) => app.jobId));
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleApply = async (jobId: number) => {
    try {
      setSuccessMessage('');
      await apiClient.applyForJob(jobId);
      setAppliedJobIds([...appliedJobIds, jobId]);
      setSuccessMessage('Application submitted successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to apply for job');
    }
  };

  return (
    <ProtectedRoute requiredRole="candidate">
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Available Jobs</h1>
          <p className="text-gray-600 mb-8">Browse and apply to job listings</p>

          {error && (
            <div className="rounded-md bg-red-50 p-4 mb-4">
              <p className="text-sm font-medium text-red-800">{error}</p>
            </div>
          )}

          {successMessage && (
            <div className="rounded-md bg-green-50 p-4 mb-4">
              <p className="text-sm font-medium text-green-800">{successMessage}</p>
            </div>
          )}

          {loading ? (
            <div className="text-center text-gray-600">Loading jobs...</div>
          ) : jobs.length === 0 ? (
            <div className="text-center text-gray-600">No jobs available at the moment.</div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onApply={handleApply}
                  isApplied={appliedJobIds.includes(job.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
