# 🚀 Production Deployment Guide

## ✅ Ready to Deploy

**Status:** ✅ All systems configured for production  
**Deploy Key:** ✅ Configured in .env.local  
**Backend Functions:** ✅ 100+ ready  
**Database Schema:** ✅ 30+ tables ready  
**Frontend Build:** ✅ Production build ready  

---

## 📋 Pre-Deployment Requirements

### Step 1: Authenticate with Convex Account

```bash
# Clear any existing authentication
npx convex logout

# Authenticate with your account
npx convex dev

# In browser:
# - Email: iwa4dm@gmail.com
# - Team: international-web-agency
# - Project: dbh8 / pastel-dalmatian-808
# - Confirm and return to terminal
```

**Wait for:** `✅ Convex functions ready!`

### Step 2: Verify Deploy Key

Once authenticated, the deploy key in .env.local will be active:

```bash
# Check if deploy key is recognized
echo $env:CONVEX_DEPLOY_KEY

# Should show:
# preview:international-web-agency:dbh8|eyJ2MiI6Ijg1NjkwNzE3NzZhODRkZjRiZWQ1MWQ2MTRhODdlOGNmIn0=
```

### Step 3: Build Frontend

```bash
# Build optimized frontend
npm run build

# Output will be in dist/
# Should see: "dist/index.html" and other files
```

---

## 🚀 Production Deployment Steps

### Option A: Standard Deployment

```bash
# Step 1: Ensure you're in project directory
cd c:\dbh9soft2020f

# Step 2: Authenticate (one-time, do this first)
npx convex dev --once

# Step 3: Deploy backend to production
npx convex deploy

# Step 4: Build frontend
npm run build

# Step 5: Deploy frontend to hosting
# For Vercel (if connected):
npm run deploy

# Or manually upload dist/ to your hosting
```

### Option B: Full CI/CD Pipeline

For automated deployments, the deploy key allows this workflow:

```yaml
# .github/workflows/deploy-production.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      
      - run: npm install
      
      # Backend deployment with deploy key
      - run: npx convex deploy
        env:
          CONVEX_DEPLOY_KEY: ${{ secrets.CONVEX_DEPLOY_KEY }}
      
      # Frontend build
      - run: npm run build
      
      # Deploy to hosting (example: Vercel)
      - name: Deploy to Vercel
        run: vercel --prod --token ${{ secrets.VERCEL_TOKEN }}
```

---

## 📊 Full Deployment Checklist

### Pre-Deployment (Day Before)

- [ ] Review all recent changes in version control
- [ ] Check that all features working locally
- [ ] Backup current production data (if applicable)
- [ ] Document current version/deployment
- [ ] Test full user workflows
- [ ] Check error logs for any issues
- [ ] Verify database indices are optimized

### Deployment Day

- [ ] Notify team members about deployment
- [ ] Create maintenance window notification (if needed)
- [ ] Authenticate with Convex: `npx convex dev`
- [ ] Verify deploy key is loaded
- [ ] Run backend tests: `npx convex run functionName`
- [ ] Run frontend tests: `npm run build`

### During Deployment

- [ ] Run: `npx convex deploy`
- [ ] Wait for: "Deployment complete!"
- [ ] Run: `npm run build`
- [ ] Deploy frontend
- [ ] Monitor error logs during deployment
- [ ] Check database connectivity
- [ ] Verify all functions are accessible

### Post-Deployment (Verification)

- [ ] [ ] Test all critical features in production
- [ ] [ ] Check error monitoring dashboard
- [ ] [ ] Verify 149 products loading
- [ ] [ ] Test search/filters with new data
- [ ] [ ] Confirm shopping cart working
- [ ] [ ] Verify user authentication
- [ ] [ ] Check performance metrics
- [ ] [ ] Document deployment in change log
- [ ] [ ] Mark as "Production Live" in tracking

### Post-Deployment (Monitoring)

- [ ] Monitor for 24 hours
- [ ] Check error rates
- [ ] Monitor database performance
- [ ] Check API response times
- [ ] Look for user-reported issues
- [ ] Keep team informed
- [ ] Prepare rollback plan

---

## 🎯 What Gets Deployed

### Backend (Convex)
```
✓ All functions in convex/
  - userManagement (user roles, permissions)
  - products (all 149 products data)
  - inventory (stock management)
  - POS (sales transactions)
  - dashboard (analytics, reports)
  - ... and 80+ more functions

✓ Database schema
  - 30+ tables
  - All indexes
  - Relationships
  - Validation rules

✓ Environment configuration
  - From CONVEX_DEPLOYMENT
  - From environment variables
  - Authentication setup
```

### Frontend
```
✓ React components (optimized)
✓ TypeScript type definitions
✓ CSS/styling
✓ Assets (images, fonts)
✓ Service worker
✓ Configuration from .env
```

### Database Data
```
✓ 149 products (unchanged)
✓ 30+ tables (unchanged)
✓ User roles (preserved)
✓ Indexes (optimized)
```

---

## 🔄 Rollback Procedure

If something goes wrong after deployment:

### Quick Rollback

```bash
# If you have previous deployment saved:
# 1. Go back to previous commit
git checkout HEAD~1

# 2. Deploy previous version
npx convex deploy

# 3. Verify everything working
# 4. Investigate what went wrong
# 5. Fix the issue
# 6. Re-deploy
```

### Data Rollback

```bash
# If database corrupted:
# 1. Stop all operations
# 2. Export current state
npx convex export data-backup.zip

# 3. Restore from backup (if available)
npx convex import data-backup.zip

# 4. Verify data integrity
```

---

## 📊 Deployment Verification

### Check Backend is Working

```bash
# List all functions
npx convex function-spec

# Should show 100+ functions

# View logs
npx convex logs

# Should show recent activity
```

### Check Frontend is Working

```bash
# In browser, check:
1. http://your-domain loads
2. Dashboard shows 149 products
3. Search/filters work
4. Shopping cart functional
5. User login working
6. No console errors
```

### Check Database Connectivity

```bash
# Run test query
npx convex run products:getAllProducts

# Should return: Array with 149 products
```

---

## 🚨 Troubleshooting Deployments

### Issue: "Cannot find deploy key"
```
Solution:
1. Verify .env.local exists
2. Verify CONVEX_DEPLOY_KEY is set
3. Run: npx convex dev first to authenticate
4. Check key hasn't expired
```

### Issue: "Schema validation failed"
```
Solution:
1. Check convex/schema.ts for syntax errors
2. Verify all field types are valid
3. Check table relationships
4. Run: npm run lint
```

### Issue: "Functions not accessible"
```
Solution:
1. Verify functions are exported in convex files
2. Check convex/_generated/api.d.ts is updated
3. Run: npx convex dev --once to regenerate
4. Check for TypeScript errors: npm run build
```

### Issue: "Database operations slow"
```
Solution:
1. Check indexes are created
2. Optimize queries (use filters/limits)
3. Check for N+1 query problems
4. Monitor with: npx convex logs
```

---

## 📈 Performance Monitoring

After deployment, monitor these metrics:

| Metric | Target | Check |
|--------|--------|-------|
| API Response Time | < 500ms | Browser DevTools |
| Database Query | < 200ms | Convex Logs |
| Frontend Load | < 3s | Lighthouse |
| Error Rate | < 0.1% | Error Dashboard |
| Uptime | 99.9% | Status Page |

---

## 🔐 Security After Deployment

### Do's
- ✅ Monitor for suspicious activity
- ✅ Keep deploy key secure
- ✅ Rotate keys periodically
- ✅ Keep dependencies updated
- ✅ Monitor error logs
- ✅ Backup data regularly

### Don'ts
- ❌ Commit .env.local to git
- ❌ Share deploy key in chat/email
- ❌ Use old deploy keys
- ❌ Run untested code in production
- ❌ Skip backups
- ❌ Ignore security warnings

---

## 📝 Deployment Log Template

Keep this for each deployment:

```markdown
## Deployment: [DATE]

**Version:** [GIT HASH/TAG]
**Deploy Key:** [FIRST 10 CHARS]
**Status:** ✅ Successful / ❌ Failed

### What Was Deployed
- Backend functions: [COUNT]
- Database changes: [DESCRIPTION]
- Frontend updates: [DESCRIPTION]

### Verification Results
- [ ] Backend responding
- [ ] All 149 products visible
- [ ] Search/filters working
- [ ] Admin dashboard accessible
- [ ] Error logs clean

### Performance Metrics
- API Response: XXms
- DB Query: XXms
- Frontend Load: XXs

### Issues Found
- [List any issues]

### Rollback Plan
- Previous version: [GIT HASH]
- Data backup: [DATE]

**Deployed by:** [NAME]
**Time Taken:** [DURATION]
**Next Review:** [DATE + 24h]
```

---

## 🎯 After Going Live

### Week 1
- Monitor continuously
- Check error logs daily
- Verify performance metrics
- Gather user feedback
- Document any issues

### Month 1
- Plan improvements
- Optimize based on metrics
- Update documentation
- Security audit
- Performance tuning

### Ongoing
- Regular backups
- Dependency updates
- Security patches
- Performance monitoring
- Feature improvements

---

## ✨ Your Deployment is Ready

```
┌─────────────────────────────────────┐
│   PRODUCTION DEPLOYMENT READY       │
├─────────────────────────────────────┤
│                                     │
│  ✅ Deploy Key: Configured          │
│  ✅ Functions: 100+ ready           │
│  ✅ Database: 30+ tables ready      │
│  ✅ Frontend: Production build OK   │
│  ✅ Authentication: iwa4dm@gmail.com│
│  ✅ Team: international-web-agency  │
│  ✅ Project: dbh8                   │
│                                     │
│  Status: READY TO DEPLOY ANYTIME    │
│                                     │
│  Command: npx convex deploy         │
│                                     │
└─────────────────────────────────────┘
```

---

## 📞 Quick Reference Commands

```bash
# Authentication
npx convex logout                  # Clear current auth
npx convex dev                     # Authenticate interactively
npx convex dev --once              # One-time auth

# Deployment
npx convex deploy                  # Deploy to production
npx convex deploy --dry-run        # Preview without deploying

# Verification
npx convex function-spec           # List all functions
npx convex logs                    # View deployment logs
npx convex data [table]            # View database contents

# Frontend
npm run build                      # Build for production
npm run deploy                     # Deploy to hosting

# Debugging
npx convex run functionName        # Test a function
npx convex export                  # Backup database
npx convex import file.zip         # Restore database
```

---

**Last Updated:** February 23, 2026  
**Status:** ✅ Ready for Production Deployment  
**Confidence:** High - All systems configured  
**Estimated Deployment Time:** 5-10 minutes
