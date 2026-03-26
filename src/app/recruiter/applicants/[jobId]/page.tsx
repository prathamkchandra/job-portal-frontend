'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api';
import { ProtectedRoute } from '@/components/protected-route';
import { ApplicationCard } from '@/components/application-card';
import { Application, ApplicationStatus } from '@/lib/types';
import { useParams } from 'next/navigation';

export default function ApplicantsPage() {
  const params = useParams();
  const jobId = Number(params.jobId);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const data = await apiClient.getApplicantsForJob(jobId);
        setApplications(data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load applicants');
      } finally {
        setLoading(false);
      }
    };

    if (jobId) {
      fetchApplicants();
    }
  }, [jobId]);

  const handleStatusChange = async (applicationId: number, status: ApplicationStatus) => {
    try {
      await apiClient.updateApplicationStatus(applicationId, status);
      setApplications(
        applications.map((app) =>
          app.id === applicationId ? { ...app, status } : app
        )
      );
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update application status');
    }
  };

  return (
    <ProtectedRoute requiredRole="recruiter">
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Applicants for Job #{jobId}</h1>

          {error && (
            <div className="rounded-md bg-red-50 p-4 mb-4">
              <p className="text-sm font-medium text-red-800">{error}</p>
            </div>
          )}

          {loading ? (
            <div className="text-center text-gray-600">Loading applicants...</div>
          ) : applications.length === 0 ? (
            <div className="text-center text-gray-600">No applicants yet for this job.</div>
          ) : (
            <div className="space-y-4">
              {applications.map((app) => (
                <ApplicationCard
                  key={app.id}
                  application={app}
                  showCandidate={true}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
