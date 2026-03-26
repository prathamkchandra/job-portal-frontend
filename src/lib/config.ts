// API Configuration and Endpoints Reference

export const API_CONFIG = {
  // Base URL - override with NEXT_PUBLIC_API_URL environment variable
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',

  // Authentication endpoints
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
  },

  // Job endpoints
  JOBS: {
    LIST: '/jobs',
    CREATE: '/jobs',
    GET: (jobId: number) => `/jobs/${jobId}`,
    UPDATE: (jobId: number) => `/jobs/${jobId}`,
    DELETE: (jobId: number) => `/jobs/${jobId}`,
  },

  // Application endpoints
  APPLICATIONS: {
    APPLY: '/applications',
    MY_APPLICATIONS: '/applications/my',
    GET_APPLICANTS: (jobId: number) => `/applications/job/${jobId}`,
    UPDATE_STATUS: (applicationId: number) => `/applications/${applicationId}/status`,
  },

  // User endpoints
  USERS: {
    GET_PROFILE: '/users/profile',
    UPDATE_PROFILE: '/users/profile',
  },
};

// HTTP Methods
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
  PUT: 'PUT',
};

// Application statuses
export const APPLICATION_STATUSES = {
  APPLIED: 'applied',
  SHORTLISTED: 'shortlisted',
  REJECTED: 'rejected',
} as const;

// User roles
export const USER_ROLES = {
  CANDIDATE: 'candidate',
  RECRUITER: 'recruiter',
  ADMIN: 'admin',
} as const;

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'Your session has expired. Please log in again.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
};

// Success messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Logged in successfully!',
  SIGNUP_SUCCESS: 'Account created successfully!',
  JOB_CREATED: 'Job posted successfully!',
  JOB_UPDATED: 'Job updated successfully!',
  JOB_DELETED: 'Job deleted successfully!',
  APPLICATION_SUBMITTED: 'Application submitted successfully!',
  APPLICATION_STATUS_UPDATED: 'Application status updated successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!',
};
