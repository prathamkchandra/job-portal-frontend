'use client';

import { Job } from '@/lib/types';
import Link from 'next/link';

interface JobCardProps {
  job: Job;
  showRecruiterInfo?: boolean;
  onApply?: (jobId: number) => void;
  isApplied?: boolean;
}

export function JobCard({
  job,
  showRecruiterInfo = false,
  onApply,
  isApplied = false,
}: JobCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-4 hover:shadow-lg transition">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
          {showRecruiterInfo && (
            <p className="text-sm text-gray-600 mt-1">
              Recruiter ID: {job.recruiterId}
            </p>
          )}
        </div>
        <span className={`px-3 py-1 rounded text-sm font-medium ${
          job.isActive
            ? 'bg-green-100 text-green-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
          {job.isActive ? 'Active' : 'Inactive'}
        </span>
      </div>

      <p className="text-gray-700 mb-4">{job.description}</p>

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
          href={`/jobs/${job.id}`}
          className="flex-1 text-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          View Details
        </Link>
        {onApply && (
          <button
            onClick={() => onApply(job.id)}
            disabled={isApplied}
            className={`flex-1 px-4 py-2 rounded ${
              isApplied
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {isApplied ? 'Already Applied' : 'Apply Now'}
          </button>
        )}
      </div>
    </div>
  );
}
