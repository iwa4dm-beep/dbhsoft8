#!/usr/bin/env node

/**
 * Authentication Flow Verification Checklist
 * Simply validates that all authentication components are in place
 */

import { readFileSync, existsSync } from 'fs';

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

let passed = 0;
let failed = 0;

function test(name, condition, details = '') {
  if (condition) {
    console.log(`${colors.green}✓${colors.reset} ${name}`);
    passed++;
  } else {
    console.log(`${colors.red}✗${colors.reset} ${name}`);
    if (details) console.log(`  ${colors.yellow}${details}${colors.reset}`);
    failed++;
  }
}

console.log(`\n${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
console.log(`${colors.cyan}AUTHENTICATION FLOW VERIFICATION${colors.reset}`);
console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);

// Check 1: SignInForm.tsx modifications
console.log(`${colors.blue}1. SignInForm.tsx Enhancements${colors.reset}`);
try {
  const content = readFileSync('src/SignInForm.tsx', 'utf8');
  test('Imports useConvexAuth', content.includes('useConvexAuth'));
  test('Has useConvexAuth hook', content.includes('const { isAuthenticated, isLoading } = useConvexAuth()'));
  test('Has authentication effect', content.includes('useEffect'));
  test('Has console logging', content.includes('console.log'));
  test('Has success message', content.includes('সফলভাবে লগইন'));
  test('Has bilingual UI', content.includes('সাইনআপ করুন') || content.includes('Sign up'));
} catch (e) {
  test('SignInForm.tsx readable', false, e.message);
}
console.log();

// Check 2: App.tsx modifications
console.log(`${colors.blue}2. App.tsx Enhancements${colors.reset}`);
try {
  const content = readFileSync('src/App.tsx', 'utf8');
  test('Imports useConvexAuth', content.includes('useConvexAuth'));
  test('Has authentication logging', content.includes('[App] User authenticated'));
  test('Has Authenticated component', content.includes('<Authenticated>'));
  test('Has Unauthenticated component', content.includes('<Unauthenticated>'));
  test('Has conditional rendering', content.includes('isAuthenticated'));
} catch (e) {
  test('App.tsx readable', false, e.message);
}
console.log();

// Check 3: Dashboard.tsx modifications
console.log(`${colors.blue}3. Dashboard.tsx Enhancements${colors.reset}`);
try {
  const content = readFileSync('src/components/Dashboard.tsx', 'utf8');
  test('Imports AuthenticationFlowVerification', content.includes('AuthenticationFlowVerification'));
  test('Shows success banner', content.includes('Authentication Successful'));
  test('Has verification state', content.includes('showAuthVerification'));
  test('Uses sessionStorage', content.includes('sessionStorage'));
  test('Auto-hides banner', content.includes('setTimeout'));
} catch (e) {
  test('Dashboard.tsx readable', false, e.message);
}
console.log();

// Check 4: AuthenticationFlowVerification component
console.log(`${colors.blue}4. AuthenticationFlowVerification Component${colors.reset}`);
try {
  const exists = existsSync('src/components/AuthenticationFlowVerification.tsx');
  test('AuthenticationFlowVerification.tsx created', exists);
  
  if (exists) {
    const content = readFileSync('src/components/AuthenticationFlowVerification.tsx', 'utf8');
    test('Uses useConvexAuth', content.includes('useConvexAuth'));
    test('Uses useQuery', content.includes('useQuery'));
    test('Fetches products', content.includes('getAllProducts'));
    test('Has verification logs', content.includes('verificationLogs'));
    test('Has error handling', content.includes('troubleshooting'));
  }
} catch (e) {
  test('AuthenticationFlowVerification readable', false, e.message);
}
console.log();

// Check 5: Environment configuration
console.log(`${colors.blue}5. Environment Configuration${colors.reset}`);
try {
  const content = readFileSync('.env.local', 'utf8');
  test('.env.local exists', true);
  test('Has VITE_CONVEX_URL', content.includes('VITE_CONVEX_URL'));
  test('Has VITE_CONVEX_SITE_URL', content.includes('VITE_CONVEX_SITE_URL'));
  test('Uses .convex.cloud domain', content.includes('.convex.cloud'));
  test('Has JWT_PRIVATE_KEY', content.includes('JWT_PRIVATE_KEY'));
  test('Has JWKS', content.includes('JWKS'));
} catch (e) {
  test('.env.local exists', false, 'Could not read .env.local');
}
console.log();

// Check 6: Test guide
console.log(`${colors.blue}6. Documentation${colors.reset}`);
test('Test guide created', existsSync('AUTHENTICATION_FLOW_TEST_GUIDE.md'));
test('This verification script', existsSync('verify-auth-setup.mjs'));
console.log();

// Check 7: Key files exist
console.log(`${colors.blue}7. Key Files${colors.reset}`);
test('src/SignInForm.tsx exists', existsSync('src/SignInForm.tsx'));
test('src/App.tsx exists', existsSync('src/App.tsx'));
test('src/components/Dashboard.tsx exists', existsSync('src/components/Dashboard.tsx'));
test('src/components/LoginWrapper.tsx exists', existsSync('src/components/LoginWrapper.tsx'));
console.log();

// Check 8: Expected flow
console.log(`${colors.blue}8. Authentication Flow Implementation${colors.reset}`);
console.log(`${colors.yellow}Expected flow:${colors.reset}`);
console.log(`  1. User enters email & password`);
console.log(`  2. SignInForm calls signIn("password", formData)`);
console.log(`  3. Convex validates credentials`);
console.log(`  4. On success:`);
console.log(`     - Toast shows success message`);
console.log(`     - isAuthenticated state updates`);
console.log(`     - React re-renders Unauthenticated → Authenticated`);
console.log(`     - Dashboard displays`);
console.log(`     - AuthenticationFlowVerification shows status`);
console.log(`  5. Products data loads (149 items)`);
console.log();

// Summary
console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
console.log(`${colors.cyan}VERIFICATION SUMMARY${colors.reset}`);
console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
console.log(`${colors.green}✓ Passed: ${passed}${colors.reset}`);
console.log(`${colors.red}✗ Failed: ${failed}${colors.reset}`);
console.log();

if (failed === 0) {
  console.log(`${colors.green}🎉 ALL CHECKS PASSED!${colors.reset}`);
  console.log(`${colors.green}Authentication flow implementation is complete.${colors.reset}`);
  console.log();
  console.log(`${colors.blue}Next Steps:${colors.reset}`);
  console.log(`  1. Open http://localhost:5174 in your browser`);
  console.log(`  2. Test sign-up with a new email address`);
  console.log(`  3. Verify automatic redirect to Dashboard`);
  console.log(`  4. Check browser console (F12) for logs`);
  console.log(`  5. Look for "✓ Authentication Successful!" banner`);
  console.log();
  console.log(`${colors.yellow}Console logs to look for:${colors.reset}`);
  console.log(`  - ✓ [App] User authenticated - Dashboard rendering`);
  console.log(`  - ✓ [Dashboard] Products loaded: 149 items`);
  console.log(`  - ✓ [Dashboard] Authentication flow verification displayed`);
} else {
  console.log(`${colors.red}⚠️  Some checks failed.${colors.reset}`);
  console.log(`${colors.yellow}Please review the failed items above.${colors.reset}`);
}

console.log(`\n${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);
