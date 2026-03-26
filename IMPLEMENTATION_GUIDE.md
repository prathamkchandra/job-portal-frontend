# Job Portal Frontend - Complete Implementation Guide

## 📋 Overview

This is a complete Next.js frontend for a full-stack job portal application with JWT authentication, role-based access control, and modern UI using Tailwind CSS.

## ✅ What's Included

### 1. **Authentication System**
- ✅ User signup (Candidate/Recruiter)
- ✅ User login with JWT tokens
- ✅ Persistent authentication via cookies
- ✅ Auto token injection in API requests
- ✅ Auto logout on token expiry (401)

### 2. **Candidate Features**
- ✅ Browse all job listings
- ✅ View job details
- ✅ Apply for jobs (with duplicate prevention)
- ✅ View personal applications dashboard
- ✅ Track application status (applied/shortlisted/rejected)
- ✅ Profile management

### 3. **Recruiter Features**
- ✅ Post new job listings
- ✅ View own job postings
- ✅ Delete jobs
- ✅ View all applicants for a job
- ✅ Update applicant statuses
- ✅ Manage job visibility (active/inactive)

### 4. **Technical Features**
- ✅ TypeScript for type safety
- ✅ Protected routes with role-based access
- ✅ Responsive design with Tailwind CSS
- ✅ Error handling and loading states
- ✅ API client with axios and interceptors
- ✅ Global authentication context
- ✅ Cookie-based token storage

## 📁 Project Structure

```
frontend-job-portal/
├── src/
│   ├── app/                           # Next.js app directory
│   │   ├── layout.tsx                 # Root layout with AuthProvider
│   │   ├── page.tsx                   # Home page
│   │   ├── login/
│   │   │   └── page.tsx               # Login page
│   │   ├── signup/
│   │   │   └── page.tsx               # Signup page
│   │   ├── dashboard/
│   │   │   └── page.tsx               # Candidate dashboard
│   │   ├── jobs/
│   │   │   └── page.tsx               # Browse jobs (candidates)
│   │   └── recruiter/
│   │       ├── jobs/
│   │       │   └── page.tsx           # View posted jobs (recruiters)
│   │       ├── post-job/
│   │       │   └── page.tsx           # Create new job
│   │       └── applicants/[jobId]/
│   │           └── page.tsx           # View applicants for a job
│   ├── components/                    # Reusable components
│   │   ├── navbar.tsx                 # Navigation bar
│   │   ├── protected-route.tsx        # Protected route wrapper
│   │   ├── job-card.tsx               # Job listing card
│   │   └── application-card.tsx       # Application status card
│   └── lib/                           # Utilities and hooks
│       ├── api.ts                     # API client (axios)
│       ├── auth-context.tsx           # Auth context provider
│       ├── types.ts                   # TypeScript interfaces
│       └── config.ts                  # API configuration
├── public/                            # Static assets
├── .env.local                         # Environment variables
├── package.json                       # Dependencies
├── tsconfig.json                      # TypeScript config
├── next.config.ts                     # Next.js config
├── tailwind.config.ts                 # Tailwind CSS config
├── README_FRONTEND.md                 # Frontend documentation
├── SETUP_GUIDE.md                     # Setup instructions
└── IMPLEMENTATION_GUIDE.md            # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Backend API running on port 3001 (or configured URL)

### Installation Steps

1. **Navigate to project directory**
   ```bash
   cd frontend-job-portal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API URL** (if not on localhost:3001)
   
   Edit `.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:YOUR_PORT/api
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🔐 Authentication Flow

### User Registration
1. User fills signup form (email, password, role)
2. Frontend sends POST request to `/auth/signup`
3. Backend validates and creates user account
4. Backend returns JWT token and user object
5. Frontend stores token in `auth_token` cookie
6. Frontend stores user info in `user` cookie
7. User redirected to home page

### User Login
1. User enters credentials
2. Frontend sends POST request to `/auth/login`
3. Backend validates credentials
4. Backend returns JWT token and user object
5. Frontend stores token and user in cookies
6. API interceptor automatically adds token to future requests

### Token Validation
- Interceptor adds: `Authorization: Bearer <token>` header
- On 401 response: User automatically logged out
- Tokens persist across page refreshes
- Tokens cleared on logout

## 📚 Page Components

### Public Pages
- **`/`** - Home page with CTA buttons
- **`/login`** - User login form
- **`/signup`** - User registration form

### Candidate Pages (Protected)
- **`/jobs`** - Browse all jobs and apply
- **`/dashboard`** - View personal applications

### Recruiter Pages (Protected)
- **`/recruiter/jobs`** - View posted jobs
- **`/recruiter/post-job`** - Create new job
- **`/recruiter/applicants/:jobId`** - Manage applicants

## 🔄 Data Flow

### Getting Jobs (Candidate)
```
/jobs page → API: GET /jobs → Display job cards → User clicks Apply
→ API: POST /applications → Success → Update UI
```

### Posting a Job (Recruiter)
```
/recruiter/post-job → User submits form → API: POST /jobs 
→ Redirect to /recruiter/jobs → Refresh job list
```

### Managing Applicants (Recruiter)
```
/recruiter/jobs → Click View Applicants → 
API: GET /applications/job/:jobId → Display applications →
User clicks status button → API: PATCH /applications/:id/status
→ Update status in UI
```

## 🎨 UI Components

### Navbar
- Logo and branding
- Navigation links (role-specific)
- User info display
- Logout button

### Job Card
- Job title and company (recruiter ID)
- Job description preview
- Required skills as tags
- Active/Inactive status
- Posted date
- Apply button (for candidates) or View Details link
- Status prevention (can't apply twice)

### Application Card
- Job title
- Candidate email (for recruiters)
- Status badge (applied/shortlisted/rejected)
- Applied date
- Status update buttons (for recruiters)

### Protected Route
- Checks authentication status
- Prevents unauthorized access
- Shows loading state
- Redirects to login if not authenticated

## 📡 API Integration

### API Client (lib/api.ts)
- Centralized axios instance
- Automatic token injection
- Error handling
- 401 response handling

### Available Methods
```typescript
// Authentication
apiClient.login(credentials)
apiClient.signup(data)
apiClient.logout()

// Jobs
apiClient.getJobs()
apiClient.getJobById(id)
apiClient.createJob(data)
apiClient.updateJob(id, data)
apiClient.deleteJob(id)

// Applications
apiClient.applyForJob(jobId)
apiClient.getMyApplications()
apiClient.getApplicantsForJob(jobId)
apiClient.updateApplicationStatus(id, status)

// Users
apiClient.getProfile()
apiClient.updateProfile(data)
```

## 🔗 Backend Integration

Your backend should implement these endpoints:

### Authentication
```
POST /api/auth/login
POST /api/auth/signup
```

### Jobs
```
GET /api/jobs
GET /api/jobs/:id
POST /api/jobs               (auth required)
PATCH /api/jobs/:id         (auth required)
DELETE /api/jobs/:id        (auth required)
```

### Applications
```
POST /api/applications              (auth required)
GET /api/applications/my            (auth required)
GET /api/applications/job/:jobId    (auth required)
PATCH /api/applications/:id/status  (auth required)
```

### Users
```
GET /api/users/profile     (auth required)
PATCH /api/users/profile   (auth required)
```

## 🔐 Authorization

Frontend enforces:
- Route-level protection (candidates can't access recruiter pages)
- UI showing role-specific features
- API interceptor includes token

Backend MUST enforce:
- Token validation
- Role-based access (candidates can only apply, not post)
- Recruiter can only manage own jobs
- Proper HTTP status codes (401, 403)

## 🧪 Testing Scenarios

### Test Candidate Flow
1. Sign up as candidate (add skills and resume)
2. Browse jobs
3. Apply for 2-3 jobs
4. Go to dashboard and verify applications
5. See mock status updates (if backend allows)

### Test Recruiter Flow
1. Sign up as recruiter
2. Post 2-3 jobs
3. Go to "My Jobs" and verify posting
4. Apply as candidate to recruiter's jobs
5. Go back as recruiter and manage applicants
6. Update application statuses

### Test Edge Cases
- Try to apply to same job twice
- Try to access recruiter pages as candidate
- Log out and verify redirect
- Refresh page and verify auth persists
- Manually delete auth_token cookie and try to access protected page

## 🛠️ Customization

### Change Colors
Edit `tailwind.config.ts` to customize Tailwind theme:
```typescript
theme: {
  colors: {
    primary: '#your-color',
    // ...
  }
}
```

### Add New Pages
1. Create `src/app/path/page.tsx`
2. Import `ProtectedRoute` if authentication needed
3. Use components and API client

### Modify API Client
Edit `src/lib/api.ts` to:
- Change timeout settings
- Add new endpoints
- Modify interceptors
- Handle different error codes

### Update Types
Edit `src/lib/types.ts` to:
- Add new user fields
- Modify job structure
- Add new status types
- Extend application fields

## 📦 Build & Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Environment Setup for Production
```env
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
```

## 🐛 Debugging

### Check Authentication
```javascript
// In browser console
document.cookie  // View all cookies
JSON.parse(document.cookie.split('user=')[1])  // View user info
```

### Monitor API Requests
- Open DevTools → Network tab
- Check request headers (Authorization header)
- View response status and body

### Enable Verbose Logging
Add to `lib/api.ts`:
```typescript
this.client.interceptors.request.use(config => {
  console.log('API Request:', config);
  return config;
});
```

## ⚠️ Important Notes

1. **Token Security**: In production, use `httpOnly` cookies instead of `js-cookie`
2. **CORS**: Ensure backend has proper CORS headers for your frontend domain
3. **Environment Variables**: Never commit `.env.local` to version control
4. **Input Validation**: Frontend validates, but backend must also validate
5. **Error Handling**: Always show user-friendly error messages

## 📝 Common Modifications

### Add Search/Filter
```typescript
// In jobs page
const [searchTerm, setSearchTerm] = useState('');
const filteredJobs = jobs.filter(job => 
  job.title.includes(searchTerm) || 
  job.description.includes(searchTerm)
);
```

### Add Pagination
```typescript
const [page, setPage] = useState(1);
const itemsPerPage = 10;
const paginatedJobs = jobs.slice(
  (page - 1) * itemsPerPage,
  page * itemsPerPage
);
```

### Add Sorting
```typescript
const [sortBy, setSortBy] = useState('recent');
const sortedJobs = [...jobs].sort((a, b) => {
  if (sortBy === 'recent') 
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  // ...
});
```

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Axios Documentation](https://axios-http.com/)

## 📞 Support

For issues:
1. Check browser console for errors
2. Check Network tab for failed API requests
3. Verify backend is running
4. Check `.env.local` configuration
5. Review error messages in application

---

**Frontend Version**: 1.0.0  
**Created**: 2024  
**Last Updated**: 2024
