"use client";
import { useAuthActions } from "@convex-dev/auth/react";
import { useConvexAuth } from "convex/react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export function SignInForm() {
  const { signIn } = useAuthActions();
  const { isAuthenticated, isLoading } = useConvexAuth();
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
  const [submitting, setSubmitting] = useState(false);

  // ✅ নতুন: সাইনআপ/সাইনইন এর পরে রিডাইরেক্ট নিশ্চিত করা
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      console.log("✓ Authentication successful - redirecting to dashboard");
      // Authenticated component will automatically show Dashboard
      // No explicit redirect needed - React will re-render based on isAuthenticated
    }
  }, [isAuthenticated, isLoading]);

  return (
    <div className="w-full">
      <form
        className="flex flex-col gap-form-field"
        onSubmit={(e) => {
          e.preventDefault();
          
          if (submitting) return; // Prevent double submission
          
          setSubmitting(true);
          const formData = new FormData(e.target as HTMLFormElement);
          formData.set("flow", flow);
          
          console.log(`🔄 Starting ${flow === "signIn" ? "Sign In" : "Sign Up"}...`);
          
          void signIn("password", formData)
            .then(() => {
              console.log(`✓ ${flow === "signIn" ? "Sign In" : "Sign Up"} successful`);
              
              // ✅ নতুন: সাফল্যের বার্তা দেখাও
              toast.success(
                flow === "signIn" 
                  ? "✓ সফলভাবে লগইন হয়েছেন (Signed in successfully!)" 
                  : "✓ অ্যাকাউন্ট তৈরি সফল (Account created successfully!)"
              );
              
              console.log("🎯 isAuthenticated status will update and Dashboard will automatically render");
              
              // ✅ নতুন: ফর্ম রিসেট করো
              (e.target as HTMLFormElement).reset();
              
              // Button ডিসেবল রাখো যতক্ষণ রিঅ্যাক্ট রি-রেন্ডার না হয়
              // Component Authenticated দ্বারা প্রতিস্থাপিত হবে
            })
            .catch((error) => {
              console.error(`❌ ${flow === "signIn" ? "Sign In" : "Sign Up"} failed:`, error);
              
              let toastTitle = "";
              if (error.message.includes("Invalid password")) {
                toastTitle = "❌ পাসওয়ার্ড ভুল (Invalid password)। আবার চেষ্টা করুন।";
              } else if (error.message.includes("already exists")) {
                toastTitle = "❌ এই ইমেইল ইতিমধ্যে রেজিস্ট্রেড (Email already registered)। লগইন করুন।";
              } else if (error.message.includes("user with this email")) {
                toastTitle = "❌ ইমেইল পাওয়া যায়নি (Email not found)। সাইনআপ করুন।";
              } else {
                toastTitle =
                  flow === "signIn"
                    ? "❌ লগইন ব্যর্থ (Sign in failed)। সাইনআপ চেষ্টা করুন?"
                    : "❌ সাইনআপ ব্যর্থ (Sign up failed)। লগইন চেষ্টা করুন?";
              }
              toast.error(toastTitle);
              setSubmitting(false);
            });
        }}
      >
        <input
          className="auth-input-field"
          type="email"
          name="email"
          placeholder="Email"
          required
          disabled={submitting || isLoading}
        />
        <input
          className="auth-input-field"
          type="password"
          name="password"
          placeholder="Password"
          required
          disabled={submitting || isLoading}
        />
        <button 
          className="auth-button" 
          type="submit" 
          disabled={submitting || isLoading}
        >
          {submitting || isLoading ? (
            <>
              <span>⏳</span>
              {flow === "signIn" ? " লগইন হচ্ছে..." : " সাইনআপ হচ্ছে..."}
            </>
          ) : (
            flow === "signIn" ? "লগইন করুন" : "সাইনআপ করুন"
          )}
        </button>
        <div className="text-center text-sm text-secondary">
          <span>
            {flow === "signIn"
              ? "অ্যাকাউন্ট নেই? (Don't have an account?) "
              : "ইতিমধ্যে অ্যাকাউন্ট আছে? (Already have an account?) "}
          </span>
          <button
            type="button"
            className="text-primary hover:text-primary-hover hover:underline font-medium cursor-pointer disabled:opacity-50"
            onClick={() => setFlow(flow === "signIn" ? "signUp" : "signIn")}
            disabled={submitting || isLoading}
          >
            {flow === "signIn" ? "সাইনআপ করুন" : "লগইন করুন"}
          </button>
        </div>
      </form>
      <div className="flex items-center justify-center my-3">
      </div>
    </div>
  );
}
