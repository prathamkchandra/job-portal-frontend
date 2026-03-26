// User types
export type Role = 'candidate' | 'recruiter' | 'admin';

export interface User {
  id: number;
  email: string;
  role: Role;
  createdAt: string;
}

export interface Profile {
  id: number;
  userId: number;
  skills: string;
  resumeUrl: string;
  updatedAt: string;
}

// Job types
export interface Job {
  id: number;
  title: string;
  description: string;
  requiredSkills: string;
  isActive: boolean;
  createdAt: string;
  recruiterId: number;
}

// Application types
export type ApplicationStatus = 'applied' | 'shortlisted' | 'rejected';

export interface Application {
  id: number;
  status: ApplicationStatus;
  appliedAt: string;
  jobId: number;
  candidateId: number;
  job?: Job;
  candidate?: {
    id: number;
    email: string;
  };
}

// Auth types
export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  role: Role;
  skills?: string;
  resumeUrl?: string;
}
