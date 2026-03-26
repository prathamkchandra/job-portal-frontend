# Frontend Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

This will install:
- `next` - React framework
- `react` - React library
- `typescript` - Type support
- `tailwindcss` - CSS framework
- `axios` - HTTP client
- `js-cookie` - Cookie management

### 2. Configure Backend URL
Edit `.env.local` and set your backend API URL:
```env
NEXT_PUBLIC_API_URL=http://localhost:YOUR_BACKEND_PORT/api
```

Default: `http://localhost:3001/api`

### 3. Run Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Project Files Created

### Pages
- ✅ `src/app/page.tsx` - Home page
- ✅ `src/app/login/page.tsx` - Login page
- ✅ `src/app/signup/page.tsx` - Signup page
- ✅ `src/app/dashboard/page.tsx` - Candidate dashboard
- ✅ `src/app/jobs/page.tsx` - Job listings
- ✅ `src/app/recruiter/jobs/page.tsx` - Recruiter's jobs
- ✅ `src/app/recruiter/post-job/page.tsx` - Post new job
- ✅ `src/app/recruiter/applicants/[jobId]/page.tsx` - View applicants

### Components
- ✅ `src/components/navbar.tsx` - Navigation bar
- ✅ `src/components/protected-route.tsx` - Protected routes
- ✅ `src/components/job-card.tsx` - Job listing card
- ✅ `src/components/application-card.tsx` - Application status card

### Libraries
- ✅ `src/lib/api.ts` - API client with axios
- ✅ `src/lib/auth-context.tsx` - Global auth state
- ✅ `src/lib/types.ts` - TypeScript types and interfaces

### Configuration
- ✅ `.env.local` - Environment variables
- ✅ `tailwind.config.ts` - Tailwind CSS config
- ✅ `tsconfig.json` - TypeScript config
- ✅ `next.config.ts` - Next.js config

## Testing the Application

### Test Flow 1: Candidate
1. Go to `http://localhost:3000`
2. Click "Sign Up"
3. Register as a **Candidate**
4. Add some skills (e.g., "JavaScript, React, Node.js")
5. Add resume URL (can be any URL, e.g., "https://example.com/resume.pdf")
6. Click "Browse Jobs" when logged in
7. Click "Apply Now" on any job
8. Check "Dashboard" to see your applications

### Test Flow 2: Recruiter
1. Go to `http://localhost:3000`
2. Click "Sign Up"
3. Register as a **Recruiter**
4. Click "Post Job" in navbar
5. Fill in job details and submit
6. Go to "My Jobs" to see posted jobs
7. Click "View Applicants" to manage applications
8. Change application statuses (applied → shortlisted → rejected)

## API Response Examples

### Login/Signup Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "role": "candidate",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

### Job Response
```json
{
  "id": 1,
  "title": "Senior React Developer",
  "description": "We're looking for...",
  "requiredSkills": "JavaScript, React, TypeScript",
  "isActive": true,
  "createdAt": "2024-01-01T00:00:00Z",
  "recruiterId": 5
}
```

### Application Response
```json
{
  "id": 1,
  "status": "applied",
  "appliedAt": "2024-01-02T10:30:00Z",
  "jobId": 1,
  "candidateId": 3,
  "job": {
    "id": 1,
    "title": "Senior React Developer",
    "description": "...",
    "requiredSkills": "JavaScript, React, TypeScript",
    "recruiterId": 5
  }
}
```

## Common Issues & Solutions

### Issue: "Cannot find module '@/lib/...'"
**Solution**: Ensure paths in `tsconfig.json` are correctly set to `{"@/*": ["./src/*"]}`

### Issue: "API connection refused"
**Solution**: Make sure your backend is running and `NEXT_PUBLIC_API_URL` is correct

### Issue: "Token not persisting"
**Solution**: Check browser cookies are enabled. Token is stored in `auth_token` cookie.

### Issue: "Can't apply for job - 409 Conflict"
**Solution**: You've already applied to this job. This is expected behavior.

### Issue: "Unauthorized - 401"
**Solution**: Your token might have expired. Log out and log back in.

## Environment Setup Checklist

- [ ] Node.js 18+ installed
- [ ] `npm install` completed
- [ ] Backend server running
- [ ] `.env.local` created with correct API URL
- [ ] `npm run dev` started successfully
- [ ] Browser opens to `http://localhost:3000`

## Next Steps

1. **Test all authentication flows** - signup, login, logout
2. **Test candidate features** - browse jobs, apply, view dashboard
3. **Test recruiter features** - post job, view applicants, update status
4. **Test error handling** - invalid credentials, missing fields
5. **Test protected routes** - try accessing recruiter pages as candidate

## Build for Production

```bash
npm run build
npm start
```

This will create an optimized production build and start the server.

## Additional Resources

- Backend API Documentation: Check your backend README
- Next.js Docs: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com
- TypeScript: https://www.typescriptlang.org/docs
