'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api';
import { ProtectedRoute } from '@/components/protected-route';
import { ApplicationCard } from '@/components/application-card';
import { Application } from '@/lib/types';

export default function DashboardPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await apiClient.getMyApplications();
        setApplications(data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load applications');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <ProtectedRoute requiredRole="candidate">
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">My Applications</h1>

          {error && (
            <div className="rounded-md bg-red-50 p-4 mb-4">
              <p className="text-sm font-medium text-red-800">{error}</p>
            </div>
          )}

          {loading ? (
            <div className="text-center text-gray-600">Loading applications...</div>
          ) : applications.length === 0 ? (
            <div className="text-center text-gray-600">
              No applications yet. <a href="/jobs" className="text-blue-600 hover:text-blue-800">Browse jobs</a>
            </div>
          ) : (
            <div className="space-y-4">
              {applications.map((app) => (
                <ApplicationCard key={app.id} application={app} />
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
