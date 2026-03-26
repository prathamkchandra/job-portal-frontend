'use client';

import { Application, ApplicationStatus } from '@/lib/types';

interface ApplicationCardProps {
  application: Application;
  showCandidate?: boolean;
  onStatusChange?: (applicationId: number, status: ApplicationStatus) => void;
}

const statusColors: Record<ApplicationStatus, string> = {
  applied: 'bg-blue-100 text-blue-800',
  shortlisted: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
};

const statusOptions: ApplicationStatus[] = ['applied', 'shortlisted', 'rejected'];

export function ApplicationCard({
  application,
  showCandidate = false,
  onStatusChange,
}: ApplicationCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-4">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900">
            {application.job?.title || 'Job Listing'}
          </h3>
          {showCandidate && application.candidate && (
            <p className="text-sm text-gray-600 mt-1">
              Candidate: {application.candidate.email}
            </p>
          )}
        </div>
        <span className={`px-3 py-1 rounded text-sm font-medium ${statusColors[application.status]}`}>
          {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
        </span>
      </div>

      {application.job?.description && (
        <p className="text-gray-700 mb-4 line-clamp-2">{application.job.description}</p>
      )}

      <p className="text-xs text-gray-500 mb-4">
        Applied on {new Date(application.appliedAt).toLocaleDateString()}
      </p>

      {onStatusChange && (
        <div className="flex gap-2">
          {statusOptions.map((status) => (
            <button
              key={status}
              onClick={() => onStatusChange(application.id, status)}
              className={`px-3 py-1 rounded text-sm font-medium transition ${
                application.status === status
                  ? statusColors[status]
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
