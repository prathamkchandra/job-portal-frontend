# Job Portal Frontend - Quick Reference

## 🚀 Start Here

```bash
# 1. Navigate to project
cd frontend-job-portal

# 2. Install dependencies (only first time)
npm install

# 3. Configure backend URL
# Edit .env.local and set:
# NEXT_PUBLIC_API_URL=http://localhost:3001/api

# 4. Start development
npm run dev

# 5. Open browser
# http://localhost:3000
```

---

## 📖 Documentation

| Document | Purpose |
|----------|---------|
| README_FRONTEND.md | Complete features and setup |
| SETUP_GUIDE.md | Step-by-step setup instructions |
| IMPLEMENTATION_GUIDE.md | Technical implementation details |
| DELIVERY_SUMMARY.md | Project overview and status |
| VERIFICATION_CHECKLIST.md | Verification and testing checklist |
| **This file** | Quick reference and common commands |

---

## 🎯 Common Tasks

### 1. Change API URL
**File**: `.env.local`
```env
NEXT_PUBLIC_API_URL=http://your-backend-url/api
```
Then restart development server.

### 2. Add a New Page
1. Create file: `src/app/your-page/page.tsx`
2. Add content with React component
3. Use `ProtectedRoute` if auth needed:
```typescript
import { ProtectedRoute } from '@/components/protected-route';

export default function YourPage() {
  return (
    <ProtectedRoute requiredRole="candidate">
      {/* Your content */}
    </ProtectedRoute>
  );
}
```

### 3. Make API Call
Use the `apiClient`:
```typescript
import { apiClient } from '@/lib/api';

// Login
const response = await apiClient.login({ email, password });

// Get jobs
const jobs = await apiClient.getJobs();

// Apply for job
await apiClient.applyForJob(jobId);
```

### 4. Use Auth State
```typescript
import { useAuth } from '@/lib/auth-context';

export default function MyComponent() {
  const { user, logout } = useAuth();
  
  return <div>{user?.email}</div>;
}
```

### 5. Change UI Colors
**File**: `tailwind.config.ts`
```typescript
theme: {
  colors: {
    primary: '#your-color',
    // ...
  }
}
```

---

## 📂 File Quick Reference

### Pages
```
Home              → /
Login             → /login
Signup            → /signup
Jobs              → /jobs (candidates)
Dashboard         → /dashboard (candidates)
Post Job          → /recruiter/post-job (recruiters)
My Jobs           → /recruiter/jobs (recruiters)
View Applicants   → /recruiter/applicants/:jobId (recruiters)
```

### Components Location
```
src/components/
├── navbar.tsx           → Top navigation bar
├── protected-route.tsx  → Auth protection wrapper
├── job-card.tsx         → Job listing card
└── application-card.tsx → Application status card
```

### API Client Location
```
src/lib/api.ts          → All API methods
src/lib/auth-context.tsx → Global auth state
src/lib/types.ts         → TypeScript interfaces
src/lib/config.ts        → Constants and config
```

---

## 🔐 Authentication

### Key Concepts
- JWT tokens stored in cookies
- Auto-injected in API requests
- 401 response → Auto logout
- Protected routes check role

### Auth Flow
```
Signup/Login → Backend returns token → 
Store in cookie → Auto added to requests → 
Protected pages check auth → Redirect if needed
```

### Clear Cache/Cookies
```javascript
// In browser console
document.cookie = "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
// Then refresh page
```

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| "Cannot find module" | Run `npm install` |
| API 404 errors | Check backend is running |
| Can't login | Verify credentials, check backend |
| Token not persisting | Check cookies are enabled |
| Page not found | Check route path spelling |
| TypeScript errors | Run `npm run build` to see all errors |
| Hot reload not working | Restart dev server with `npm run dev` |
| Styling looks wrong | Clear browser cache, restart dev server |

---

## 📊 API Response Examples

### Successful Login
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "role": "candidate"
  }
}
```

### Job Object
```json
{
  "id": 1,
  "title": "Senior React Dev",
  "description": "We're looking for...",
  "requiredSkills": "JavaScript, React",
  "isActive": true,
  "recruiterId": 5
}
```

### Error Response
```json
{
  "message": "Already applied to this job"
}
```

---

## 🧪 Test Scenarios

### Quick Test for Candidates
1. Sign up as candidate
2. Browse /jobs
3. Apply to a job
4. Check /dashboard
5. See application status

### Quick Test for Recruiters
1. Sign up as recruiter
2. Go to /recruiter/post-job
3. Create a job
4. Go to /recruiter/jobs
5. Click "View Applicants"

---

## 💾 Build & Deploy

### Development
```bash
npm run dev
# Runs on http://localhost:3000
# Hot reload enabled
# Source maps enabled
```

### Production Build
```bash
npm run build
npm start
# Optimized for performance
# Ready to deploy
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy Elsewhere
```bash
# Build first
npm run build

# Deploy the .next folder
# Set environment variables in hosting platform
```

---

## 📋 Environment Variables

```env
# Required
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Optional (defaults shown)
# NEXT_PUBLIC_APP_NAME=Job Portal
# NEXT_PUBLIC_DEBUG=false
```

**Note**: All `NEXT_PUBLIC_*` variables are exposed to browser (safe for URLs, not secrets).

---

## 🔗 API Endpoints Summary

```
POST   /auth/login                    → Login
POST   /auth/signup                   → Register
GET    /jobs                          → List jobs
POST   /jobs                          → Create job
GET    /jobs/:id                      → Get job details
PATCH  /jobs/:id                      → Update job
DELETE /jobs/:id                      → Delete job
POST   /applications                  → Apply for job
GET    /applications/my               → My applications
GET    /applications/job/:id          → Get applicants
PATCH  /applications/:id/status       → Update status
GET    /users/profile                 → Get profile
PATCH  /users/profile                 → Update profile
```

---

## 🎨 Tailwind CSS Tips

### Change Primary Color
```typescript
// tailwind.config.ts
theme: {
  colors: {
    primary: '#3b82f6', // Blue
    secondary: '#10b981', // Green
  }
}
```

### Common Utilities
```
Text: text-lg, text-gray-600, text-bold
Spacing: px-4, py-2, m-2, mb-4
Colors: bg-blue-600, text-white
Responsive: sm:, md:, lg:, xl:
Hover: hover:bg-blue-700
```

---

## 🔍 Debugging Tips

### Check Network Requests
1. Open DevTools (F12)
2. Go to Network tab
3. Filter by XHR
4. Check request headers (Authorization)
5. Check response status and body

### Check Authentication
```javascript
// Console
JSON.parse(document.cookie.split('user=')[1])
document.cookie.split('auth_token=')[1]
```

### Check React State
```javascript
// Use React DevTools browser extension
// Or prop drilling to show state
```

### TypeScript Errors
```bash
npm run build
# Shows all TypeScript errors
```

---

## 📚 Resource Links

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Axios Docs](https://axios-http.com)
- [MDN Web Docs](https://developer.mozilla.org)

---

## 💡 Best Practices

1. **Always restart dev server** after `.env.local` changes
2. **Use TypeScript** - catches errors early
3. **Test in incognito mode** - avoids cookie issues
4. **Check console** first when errors occur
5. **Use React DevTools** for debugging
6. **Keep components small** - under 200 lines
7. **Reuse components** - DRY principle
8. **Handle errors gracefully** - show user messages

---

## 🎯 Performance Tips

1. **Use React.memo** for expensive components
2. **Lazy load components** with `dynamic()`
3. **Optimize images** before uploading
4. **Minimize API calls** - batch when possible
5. **Use proper caching** headers
6. **Code splitting** - Next.js does automatically

---

## 🚨 Emergency Fixes

### App won't start
```bash
# Clear caches and reinstall
rm -r node_modules .next
npm install
npm run dev
```

### TypeScript errors
```bash
# Check all errors
npm run build

# Fix types
# Edit tsconfig.json if needed
```

### API not responding
```bash
# Check backend is running
# Verify .env.local URL
# Check browser console for errors
# Check Network tab for failed requests
```

---

## 📞 Getting Help

1. **Check the docs first** - SETUP_GUIDE.md, IMPLEMENTATION_GUIDE.md
2. **Check console errors** - F12 → Console
3. **Check Network tab** - F12 → Network
4. **Google the error** - Usually helps
5. **Ask for backend help** - If API endpoints differ

---

## ✅ Pre-Launch Checklist

- [ ] Backend is running and tested
- [ ] `.env.local` has correct API URL
- [ ] Can signup as candidate
- [ ] Can signup as recruiter
- [ ] Can login with credentials
- [ ] Candidate can browse and apply to jobs
- [ ] Recruiter can post jobs
- [ ] Recruiter can view applicants
- [ ] All features work as expected
- [ ] No console errors
- [ ] Responsive on mobile

---

## 🎁 Useful VS Code Extensions

```
ESLint - linting
Prettier - code formatting
Thunder Client - API testing
REST Client - HTTP requests
CSS Peek - CSS utilities
```

---

## 📝 Commit Message Template

```
[feature] Add job search functionality
[fix] Fix token refresh issue
[refactor] Reorganize component structure
[docs] Update API documentation
[test] Add unit tests for auth
[chore] Update dependencies
```

---

**Quick Reference Version**: 1.0  
**Last Updated**: 2024  
**For Latest Info**: See full documentation files

---

Need more help? 
- 📖 Check README_FRONTEND.md for complete features
- 🚀 Check SETUP_GUIDE.md for step-by-step setup
- 🔧 Check IMPLEMENTATION_GUIDE.md for technical details
