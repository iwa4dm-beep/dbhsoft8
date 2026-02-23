# 🧪 Authentication Testing Checklist

## ✅ System Status

```
┌─────────────────────────────────────┐
│  AUTHENTICATION SYSTEM: OPERATIONAL │
├─────────────────────────────────────┤
│                                     │
│  ✅ JWT_PRIVATE_KEY: Set           │
│  ✅ Convex Backend: Ready          │
│  ✅ Frontend Dev: http://localhost:5173
│  ✅ auth:store: Available          │
│  ✅ auth:signIn: Available         │
│  ✅ Database: 149 products         │
│                                     │
│  READY FOR TESTING                 │
│                                     │
└─────────────────────────────────────┘
```

---

## 🧪 Test 1: Browser Login

### Steps:
1. ✅ Frontend opened at http://localhost:5173
2. If prompted - accept browser open
3. You should see **login form**
4. Try login with test account:
   - Email: `test@example.com`
   - Password: `password123`

### Expected Results:
- ✅ No JWT errors in console
- ✅ No "Missing JWT_PRIVATE_KEY" errors
- ✅ Form submits without error
- ✅ Either successful login OR proper auth error (not JWT error)

### What to Check:
```javascript
// Open browser console (F12)
// Look for these errors:
❌ Missing JWT_PRIVATE_KEY       // Should NOT appear
❌ Failed to sign token          // Should NOT appear
✅ Convex errors about auth      // OK - means auth tried to work
✅ Proper error messages          // OK - means validation worked
```

---

## 🧪 Test 2: Dashboard Access

### After Successful Login:
1. Should redirect to dashboard
2. Check if **149 products load**
3. Try to search/filter products
4. Try to use shopping cart

### Expected Results:
- ✅ Dashboard displays
- ✅ Products load successfully
- ✅ Search works
- ✅ Filters work
- ✅ No authentication errors

---

## 🧪 Test 3: Console Verification

### In Browser Console (F12):
```javascript
// Look for these lines:
✅ "[CONVEX]" messages about auth - means it's working
❌ "Missing JWT_PRIVATE_KEY" - means key not loaded (restart needed)
❌ "auth:store" errors - authentication failed (proper error, not JWT)
```

### Network Tab:
```
✅ Check /api/auth requests - should succeed or show validation errors
❌ 500 errors with JWT messages - would mean key not loaded
```

---

## 🧪 Test 4: Specific Auth Functions

### From Browser Console:
```javascript
// This tests if auth:store can be called:
fetch('/.convex/auth.store', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({token: 'test'})
})
.then(r => r.json())
.then(d => console.log('Auth response:', d))

// Expected: Some response (error is OK, but no JWT_PRIVATE_KEY error)
```

---

## 📋 What to Verify

| Test | Expected | Status |
|------|----------|--------|
| Frontend loads | ✅ Page visible | Verify |
| Login form shows | ✅ Form visible | Verify |
| No JWT errors | ❌ Not present | Verify |
| Auth functions work | ✅ Can be called | Verify |
| Database connects | ✅ Data loads | Verify |
| 149 products load | ✅ All visible | Verify |

---

## ⚠️ If Still Getting JWT Errors

### Step 1: Check Environment Variable
```bash
# In terminal:
npx convex env list | grep JWT_PRIVATE_KEY

# Should show:
# JWT_PRIVATE_KEY=LS0tLS1CRUdJ...
```

### Step 2: Check .env.local
```bash
# In terminal:
cat .env.local | grep JWT_PRIVATE_KEY

# Should show the base64 encoded key
```

### Step 3: Restart Everything
```bash
# Kill all node processes
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force

# Wait 3 seconds
Start-Sleep -Seconds 3

# Start fresh
cd c:\dbh9soft2020f
npm run dev
```

### Step 4: Check Convex Logs
```bash
# In a new terminal:
cd c:\dbh9soft2020f
npx convex logs

# Look for JWT_PRIVATE_KEY errors
```

---

## 🔍 Debugging Commands

### See All Environment Variables
```bash
npx convex env list
```

### View Recent Errors
```bash
npx convex logs --search "error" --limit 50
```

### Test auth:store Function
```bash
npx convex run auth:store --args '{"token":"test"}'
```

### Check Function Definitions
```bash
npx convex functions list | grep auth
```

---

## 📊 Success Indicators

### ✅ Authentication Working When:
- [ ] Frontend loads without error
- [ ] Login form displays
- [ ] No JWT_PRIVATE_KEY errors in console
- [ ] Can submit login form
- [ ] Dashboard appears after login
- [ ] 149 products visible
- [ ] Search/filter functionality works

### ❌ Authentication Failed When:
- [ ] "Missing environment variable JWT_PRIVATE_KEY" error
- [ ] "Failed to sign token" error
- [ ] auth:store function errors
- [ ] Browser console has red errors

---

## 🎯 Next Actions After Testing

### If Success ✅
1. Test with different user accounts
2. Verify user roles work
3. Test product operations
4. Test shopping cart
5. Ready for production deployment

### If Error ❌
1. Restart dev server
2. Check environment variables
3. Verify .env.local loaded
4. Check Convex logs for details
5. Contact support with error message

---

## 📞 Quick Help

**Q: Frontend not opening?**
- Browser might be blocked
- Manually open: http://localhost:5173
- Check terminal for "VITE ready" message

**Q: Still seeing JWT error?**
- Kill node: `Get-Process node | Stop-Process -Force`
- Wait 3 seconds
- Restart: `npm run dev`

**Q: Products not loading?**
- Check if logged in first
- Verify 149 products query in dashboard
- Check network tab for errors

**Q: Can't login?**
- Make sure email exists in database
- Check password is correct
- Look for proper auth error (not JWT error)

---

**Authentication System Ready for Testing!** ✅  
**Dev Server Running:** npm run dev  
**Access:** http://localhost:5173  
**Status:** Testing Phase
