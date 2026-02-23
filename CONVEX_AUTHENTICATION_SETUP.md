# 🔐 Convex Account Authentication & Project Link Setup

## 📋 Your Account Details

- **Email:** iwa4dm@gmail.com  
- **Team:** international-web-agency  
- **Project:** dbh8  
- **Deployment:** pastel-dalmatian-808  
- **Dashboard URL:** https://dashboard.convex.dev/t/international-web-agency/dbh8/pastel-dalmatian-808

---

## 🚀 Setup Instructions

### Step 1: Open Terminal

Open your terminal in the project directory:
```bash
cd c:\dbh9soft2020f
```

### Step 2: Start Convex Dev & Authenticate

Run the following command:
```bash
npx convex dev
```

**What will happen:**
1. Convex will detect no authentication
2. A login URL will appear in the terminal
3. Browser will open automatically
4. You'll be prompted to login with: **iwa4dm@gmail.com**

### Step 3: Authenticate in Browser

When the browser opens:
1. Click "Sign in" or "Login"
2. Enter your email: **iwa4dm@gmail.com**
3. Complete any required verification (OTP, password)
4. You'll be redirected to select a project

### Step 4: Select the Correct Project

When asked to choose a project, select:
- **Team:** international-web-agency
- **Project:** dbh8
- **Deployment:** pastel-dalmatian-808

### Step 5: Return to Terminal

After authentication:
- The terminal will show "✅ Convex functions ready!"
- Functions will be synced
- Your project is now authenticated

### Step 6: Start Development Server

In a new terminal window, run:
```bash
npm run dev
```

This will:
- Start Vite frontend on localhost:5173
- Sync backend with Convex
- Connect to your 149 products database

---

## ✅ Current Configuration

Your `.convexrc` is already set up:

```json
{
  "projectId": "pastel-dalmatian-808"
}
```

Your `.env.local` is configured:

```dotenv
VITE_CONVEX_URL=https://pastel-dalmatian-808.convex.cloud
CONVEX_DEPLOYMENT=dev:pastel-dalmatian-808
VITE_CONVEX_SITE_URL=https://pastel-dalmatian-808.convex.site
VITE_APP_NAME=DBH Soft
VITE_APP_TITLE=DBH Soft - POS & Inventory Management
VITE_ENV=development
VITE_ENABLE_ADVANCED_SEARCH=true
VITE_ENABLE_FILTERS=true
VITE_ENABLE_DEBUG_LOGGING=true
```

---

## 🔗 Direct Links

### Direct to Your Project
- **Dashboard:** https://dashboard.convex.dev/t/international-web-agency/dbh8/pastel-dalmatian-808
- **Data:** https://dashboard.convex.dev/t/international-web-agency/dbh8/pastel-dalmatian-808/data
- **Settings:** https://dashboard.convex.dev/t/international-web-agency/dbh8/pastel-dalmatian-808/settings

### After Authentication
- **Frontend:** http://localhost:5173 (after running npm run dev)
- **Backend Functions:** Accessible via ConvexReactClient
- **Database:** 149 products + 30+ tables

---

## 📊 What You'll Have Access To

### Backend Functions (100+)
- ✅ userManagement (listRoles, createUser, etc.)
- ✅ products (getAllProducts, getByBarcode, etc.)
- ✅ inventory (list, updateStock, etc.)
- ✅ POS (createSale, processSale, etc.)
- ✅ dashboard (getStats, getAnalytics, etc.)
- ✅ ... and 80+ more

### Database Tables (30+)
- ✅ products (149 items)
- ✅ users & userManagement
- ✅ inventory & branches
- ✅ sales & transactions
- ✅ customers & employees
- ✅ ... and more

### Features
- ✅ Advanced search with debouncing
- ✅ Multi-criteria filtering
- ✅ Shopping cart & POS
- ✅ Inventory management
- ✅ User & role management
- ✅ Real-time data sync

---

## 🆘 Troubleshooting

### Issue: "Login URL not appearing"
**Solution:** 
```bash
# Manually visit this URL in your browser:
https://convex.dev/t/international-web-agency

# Then navigate to project: dbh8 / pastel-dalmatian-808
```

### Issue: "Wrong project selected"
**Solution:**
1. Run: `npx convex logout`
2. Delete: `C:\Users\[YourUsername]\.convex\config.json`
3. Run: `npx convex dev` again
4. Choose the correct project when prompted

### Issue: "Connection refused"
**Solution:**
1. Ensure you're authenticated first
2. Make sure .env.local is in the project root
3. Check Node.js version: `node --version` (should be 18+)
4. Clear node_modules: `rm -r node_modules && npm install`

### Issue: "Cannot find functions"
**Solution:**
Regenerate types with:
```bash
# Kill any running dev server first
npx convex dev --once
```

---

## ⏱️ Expected Timeline

| Step | Time |
|------|------|
| Authentication | 1-2 minutes |
| Project Selection | 1 minute |
| Convex Sync | 5-10 seconds |
| Frontend Build | 30 seconds |
| **Total** | **~3-5 minutes** |

---

## 🎯 After Setup Verification

Once authenticated and running `npm run dev`, verify:

1. **Terminal Output Should Show:**
   ```
   ✅ Convex functions ready!
   ✅ VITE v6.4.1 ready in XXXms
   ➜  Local:   http://localhost:5173/
   ```

2. **Browser Should Show:**
   - Dashboard with 149 products
   - Advanced search working
   - Filters functional
   - No "Could not find function" errors

3. **Console Should Show:**
   - No red errors
   - Data loading from Convex backend
   - Real-time sync indicators

---

## 📝 Next Commands to Run

```bash
# After you complete the browser authentication:

# Terminal 1: Start backend (if not already running)
npx convex dev

# Terminal 2: Start frontend
npm run dev

# This will:
# ✓ Open browser at http://localhost:5173
# ✓ Load all 149 products
# ✓ Connect to your Convex backend
# ✓ Enable real-time data sync
```

---

## 🔑 Key Information to Remember

| Setting | Value |
|---------|-------|
| **Email** | iwa4dm@gmail.com |
| **Team** | international-web-agency |
| **Project** | dbh8 |
| **Deployment** | pastel-dalmatian-808 |
| **Frontend URL** | http://localhost:5173 |
| **Backend Type** | Convex (Serverless) |
| **Database Size** | 149 products + 30+ tables |
| **Auth Provider** | @convex-dev/auth |

---

## ✨ What's Configured & Ready

- ✅ `.convexrc` - Project ID configured
- ✅ `.env.local` - Environment variables set
- ✅ `src/main.tsx` - ConvexAuthProvider setup
- ✅ `convex/schema.ts` - Database schema complete
- ✅ `convex/*.ts` - All functions ready
- ✅ `src/components` - Frontend components built
- ✅ Build pipeline - Ready for production

---

## 📞 Need Help?

If you encounter any issues:

1. **Check authentication:** `npx convex dashboard`
2. **Check functions:** Look at `convex/ ` directory
3. **Check database:** Visit `https://dashboard.convex.dev/t/international-web-agency/dbh8/pastel-dalmatian-808/data`
4. **Check connection:** Run `npm run dev` and look for error messages

---

**Status:** ✅ Ready for Authentication  
**Last Updated:** February 23, 2026  
**Next Step:** Authenticate with iwa4dm@gmail.com account
