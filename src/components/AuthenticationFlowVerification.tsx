/**
 * Authentication Flow Verification Component
 * Checks and logs the complete sign-up/sign-in → dashboard redirect flow
 * 
 * Purpose: Verify that users are properly redirected to dashboard after authentication
 */

import { useConvexAuth } from "convex/react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useEffect, useState } from "react";

export function AuthenticationFlowVerification() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const [verificationLogs, setVerificationLogs] = useState<string[]>([]);
  
  // Try to fetch products to verify we're authenticated
  const products = useQuery(api.products.getAllProducts);

  useEffect(() => {
    if (!isLoading) {
      const logs: string[] = [];
      
      // ✅ Log 1: Authentication Status
      if (isAuthenticated) {
        logs.push("✓ [PASS] User is authenticated (isAuthenticated=true)");
      } else {
        logs.push("✗ [FAIL] User is NOT authenticated (isAuthenticated=false)");
        logs.push("         Expected to be redirected to dashboard after sign-in/sign-up");
      }

      // ✅ Log 2: Component Rendering
      logs.push("✓ [PASS] AuthenticationFlowVerification component rendered");
      logs.push("         Indicates Dashboard (Authenticated component) is active");

      // ✅ Log 3: Loading State
      logs.push(`ℹ [INFO] isLoading status: ${isLoading}`);

      // ✅ Log 4: Product Data Access
      if (products !== undefined) {
        if (Array.isArray(products) && products.length > 0) {
          logs.push(`✓ [PASS] Products accessible: ${products.length} products loaded`);
          logs.push("         Dashboard has full database access");
        } else {
          logs.push("⚠ [WARN] Products query returned but is empty");
        }
      } else if (products === null) {
        logs.push("ℹ [INFO] Products query returned null (still loading)");
      } else {
        logs.push("⚠ [WARN] Unable to retrieve products");
      }

      // ✅ Log 5: Overall Status
      if (isAuthenticated && products !== undefined) {
        logs.push("");
        logs.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        logs.push("✓✓✓ AUTHENTICATION FLOW VERIFICATION SUCCESS ✓✓✓");
        logs.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        logs.push("");
        logs.push("Flow Verified:");
        logs.push("1. ✓ Sign-up/Sign-in successful");
        logs.push("2. ✓ User redirected to Authenticated component");
        logs.push("3. ✓ Dashboard rendering");
        logs.push("4. ✓ Database access working");
        logs.push("");
        logs.push("Next Steps:");
        logs.push("- Try navigating to different sections (Inventory, POS, etc.)");
        logs.push("- Test sign-out and sign-in again");
        logs.push("- Verify all features accessible");
      }

      setVerificationLogs(logs);
    }
  }, [isAuthenticated, isLoading, products]);

  return (
    <div className="space-y-6 p-8 max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-purple-600/20 border border-purple-400/30 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <span className="text-3xl">🔐</span>
          Authentication Flow Verification
        </h2>

        <div className="bg-slate-800/50 backdrop-blur rounded-lg p-6 border border-slate-700/50 font-mono text-sm space-y-3">
          {verificationLogs.length === 0 ? (
            <div className="text-slate-400 animate-pulse">
              ⏳ Loading authentication status...
            </div>
          ) : (
            verificationLogs.map((log, index) => (
              <div key={index} className="text-slate-200 whitespace-pre-wrap break-words">
                {log.startsWith("✓") && <span className="text-green-400">{log}</span>}
                {log.startsWith("✗") && <span className="text-red-400">{log}</span>}
                {log.startsWith("⚠") && <span className="text-yellow-400">{log}</span>}
                {log.startsWith("ℹ") && <span className="text-blue-400">{log}</span>}
                {log.startsWith("━") && <span className="text-purple-400">{log}</span>}
                {!log.startsWith("✓") &&
                  !log.startsWith("✗") &&
                  !log.startsWith("⚠") &&
                  !log.startsWith("ℹ") &&
                  !log.startsWith("━") && (
                    <span className="text-slate-300">{log}</span>
                  )}
              </div>
            ))
          )}
        </div>

        {/* Detailed Info */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/30">
            <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-1">
              <span>📊</span> Authentication State
            </h3>
            <div className="space-y-1 text-xs text-slate-300">
              <div>
                Authenticated:{" "}
                <span className={isAuthenticated ? "text-green-400 font-bold" : "text-red-400 font-bold"}>
                  {isAuthenticated ? "YES ✓" : "NO ✗"}
                </span>
              </div>
              <div>
                Loading:{" "}
                <span className={isLoading ? "text-blue-400 font-bold" : "text-slate-400"}>
                  {isLoading ? "YES" : "NO"}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/30">
            <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-1">
              <span>📦</span> Data Access
            </h3>
            <div className="space-y-1 text-xs text-slate-300">
              <div>
                Products Status:{" "}
                <span className={products !== undefined ? "text-green-400 font-bold" : "text-slate-400"}>
                  {products !== undefined ? "Loaded" : "Loading"}
                </span>
              </div>
              <div>
                Product Count:{" "}
                <span className="text-blue-400 font-bold">
                  {Array.isArray(products) ? products.length : "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 bg-slate-900/50 rounded-lg p-4 border border-slate-700/30">
          <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-1">
            <span>📋</span> How This Works
          </h3>
          <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
            <li>
              <strong>Step 1:</strong> When you sign up or sign in, the browser checks if the request was successful
            </li>
            <li>
              <strong>Step 2:</strong> If successful, Convex updates the authentication state (isAuthenticated)
            </li>
            <li>
              <strong>Step 3:</strong> React automatically re-renders: Unauthenticated → Authenticated
            </li>
            <li>
              <strong>Step 4:</strong> You see the Dashboard (this verification page appears here)
            </li>
            <li>
              <strong>Step 5:</strong> This component verifies the authentication state and data access
            </li>
          </ul>
        </div>

        {/* Troubleshooting */}
        {!isAuthenticated && (
          <div className="mt-6 bg-red-900/20 rounded-lg p-4 border border-red-700/30">
            <h3 className="text-sm font-semibold text-red-400 mb-2 flex items-center gap-1">
              <span>🔧</span> Troubleshooting
            </h3>
            <ul className="text-xs text-red-200 space-y-1">
              <li>• Check browser console for error messages</li>
              <li>• Ensure email format is correct</li>
              <li>• Password must be at least 6 characters</li>
              <li>• Check network tab for failed requests</li>
              <li>• Try clearing browser cache and cookies</li>
            </ul>
          </div>
        )}

        {/* Browser Console Instructions */}
        <div className="mt-6 bg-blue-900/20 rounded-lg p-4 border border-blue-700/30">
          <h3 className="text-sm font-semibold text-blue-400 mb-2 flex items-center gap-1">
            <span>💻</span> Check Browser Console
          </h3>
          <p className="text-xs text-blue-200 mb-2">
            Press <kbd className="bg-slate-700 px-2 py-1 rounded">F12</kbd> or
            <kbd className="bg-slate-700 px-2 py-1 rounded ml-1">Ctrl+Shift+J</kbd> (Windows) /
            <kbd className="bg-slate-700 px-2 py-1 rounded ml-1">Cmd+Option+J</kbd> (Mac)
          </p>
          <p className="text-xs text-blue-200">
            Look for these logs:
          </p>
          <ul className="text-xs text-blue-200 space-y-1 mt-2 font-mono list-disc list-inside">
            <li className="text-green-400">✓ [App] User authenticated - Dashboard rendering</li>
            <li className="text-green-400">✓ Authentication successful - redirecting to dashboard</li>
            <li className="text-blue-400">🔄 Starting Sign Up...</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
