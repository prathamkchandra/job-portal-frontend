import axios, { AxiosInstance } from 'axios';
import Cookie from 'js-cookie';
import { AuthResponse, LoginRequest, SignupRequest } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add auth token to every request
    this.client.interceptors.request.use((config) => {
      const token = Cookie.get('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Handle 401 responses
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          Cookie.remove('auth_token');
          Cookie.remove('user');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth endpoints
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await this.client.post<AuthResponse>('/auth/login', data);
    if (response.data.token) {
      Cookie.set('auth_token', response.data.token);
      Cookie.set('user', JSON.stringify(response.data.user));
    }
    return response.data;
  }

  async signup(data: SignupRequest): Promise<AuthResponse> {
    const response = await this.client.post<AuthResponse>('/auth/signup', data);
    if (response.data.token) {
      Cookie.set('auth_token', response.data.token);
      Cookie.set('user', JSON.stringify(response.data.user));
    }
    return response.data;
  }

  logout(): void {
    Cookie.remove('auth_token');
    Cookie.remove('user');
  }

  // Job endpoints
  async getJobs() {
    const response = await this.client.get('/jobs');
    return response.data;
  }

  async getJobById(id: number) {
    const response = await this.client.get(`/jobs/${id}`);
    return response.data;
  }

  async createJob(data: any) {
    const response = await this.client.post('/jobs', data);
    return response.data;
  }

  async updateJob(id: number, data: any) {
    const response = await this.client.patch(`/jobs/${id}`, data);
    return response.data;
  }

  async deleteJob(id: number) {
    const response = await this.client.delete(`/jobs/${id}`);
    return response.data;
  }

  // Application endpoints
  async applyForJob(jobId: number) {
    const response = await this.client.post('/applications', { jobId });
    return response.data;
  }

  async getMyApplications() {
    const response = await this.client.get('/applications/my');
    return response.data;
  }

  async getApplicantsForJob(jobId: number) {
    const response = await this.client.get(`/applications/job/${jobId}`);
    return response.data;
  }

  async updateApplicationStatus(applicationId: number, status: string) {
    const response = await this.client.patch(`/applications/${applicationId}/status`, {
      status,
    });
    return response.data;
  }

  // User endpoints
  async getProfile() {
    const response = await this.client.get('/users/profile');
    return response.data;
  }

  async updateProfile(data: any) {
    const response = await this.client.patch('/users/profile', data);
    return response.data;
  }
}

export const apiClient = new ApiClient();
