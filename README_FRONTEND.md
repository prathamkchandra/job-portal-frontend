# Job Portal Frontend

A modern Next.js frontend for a job portal application with role-based access (candidates and recruiters).

## Features

### For Candidates
- **User Authentication**: Sign up and login with JWT tokens
- **Browse Jobs**: View all available job postings
- **Apply for Jobs**: Submit applications to job listings
- **Track Applications**: View status of their applications (applied, shortlisted, rejected)
- **Manage Profile**: Update skills and resume URL

### For Recruiters
- **Post Jobs**: Create new job listings with title, description, and required skills
- **Manage Listings**: View and delete posted jobs
- **View Applicants**: See all candidates who applied to their jobs
- **Update Status**: Update application status (applied → shortlisted → rejected)

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **js-cookie** - Cookie management for JWT tokens

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with AuthProvider and Navbar
│   ├── page.tsx                # Home page
│   ├── login/page.tsx          # Login page
│   ├── signup/page.tsx         # Signup page
│   ├── dashboard/page.tsx      # Candidate dashboard (view applications)
│   ├── jobs/page.tsx           # Job listing page for candidates
│   └── recruiter/
│       ├── jobs/page.tsx       # Recruiter's posted jobs
│       ├── post-job/page.tsx   # Create new job listing
│       └── applicants/[jobId]/ # View applicants for a job
├── components/
│   ├── navbar.tsx              # Navigation bar
│   ├── protected-route.tsx     # Route protection component
│   ├── job-card.tsx            # Job listing card
│   └── application-card.tsx    # Application status card
└── lib/
    ├── api.ts                  # API client with axios
    ├── auth-context.tsx        # Authentication context provider
    └── types.ts                # TypeScript interfaces and types
```

## Setup

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure the backend API URL in `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Endpoints Used

The frontend expects the following backend endpoints:

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration

### Jobs
- `GET /api/jobs` - List all jobs
- `GET /api/jobs/:id` - Get job details
- `POST /api/jobs` - Create a new job (recruiter only)
- `PATCH /api/jobs/:id` - Update a job (recruiter only)
- `DELETE /api/jobs/:id` - Delete a job (recruiter only)

### Applications
- `POST /api/applications` - Apply for a job
- `GET /api/applications/my` - Get candidate's applications
- `GET /api/applications/job/:jobId` - Get applicants for a job (recruiter only)
- `PATCH /api/applications/:id/status` - Update application status (recruiter only)

### Users
- `GET /api/users/profile` - Get user profile
- `PATCH /api/users/profile` - Update user profile

## Authentication Flow

1. User signs up or logs in
2. Backend returns JWT token and user object
3. Token is stored in cookies
4. Token is automatically added to all API requests via axios interceptor
5. On 401 response, user is redirected to login page

## Usage Examples

### Test Candidate Account
1. Sign up as a candidate
2. Add skills and resume URL
3. Browse available jobs from the Jobs page
4. Click "Apply Now" to submit applications
5. View application status in the Dashboard

### Test Recruiter Account
1. Sign up as a recruiter
2. Click "Post Job" in the navbar
3. Fill in job details and post
4. Go to "My Jobs" to view posted jobs
5. Click "View Applicants" to manage applications
6. Update application status for each applicant

## Environment Variables

```env
# Backend API URL (defaults to http://localhost:3001/api)
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Development

The project uses:
- **ESLint** for code linting
- **Tailwind CSS** for styling
- **TypeScript** for type safety
- **Next.js App Router** for file-based routing

## Features Included

✅ JWT authentication with cookie storage
✅ Role-based access control (Candidate/Recruiter)
✅ Protected routes
✅ Responsive design with Tailwind CSS
✅ Error handling and loading states
✅ API client with automatic token injection
✅ Auth context for global auth state

## Future Enhancements

- [ ] Profile page with profile picture upload
- [ ] Search and filter jobs by skills, location, salary
- [ ] Email notifications for applications
- [ ] Advanced applicant filtering for recruiters
- [ ] Admin dashboard for managing users and jobs
- [ ] Pagination for large job listings
- [ ] Rich text editor for job descriptions
- [ ] File upload for resume PDFs

## Troubleshooting

### API Connection Issues
- Ensure backend is running on the configured port
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Verify CORS settings on the backend

### Authentication Issues
- Clear browser cookies if stuck on login
- Check browser console for API errors
- Verify JWT token format in cookies

### UI Issues
- Ensure Tailwind CSS is properly built
- Check for missing TypeScript types
- Verify component imports use correct paths

## Support

For issues or questions, refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Axios Documentation](https://axios-http.com/)
