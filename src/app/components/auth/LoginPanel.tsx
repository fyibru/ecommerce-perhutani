'use client'
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup, User } from "firebase/auth";
import { useState } from "react";

export default function LoginPanel() {
    const [user, setUser] = useState<User | null>(null);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-100 to-emerald-300">
      <div className="bg-white shadow-xl p-8 rounded-2xl w-full max-w-md text-center space-y-6">
        <h2 className="text-3xl font-bold text-emerald-600">Login to Your Account</h2>
        <p className="text-gray-600">Use your Google account to sign in</p>
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-full font-semibold transition"
        >
          Sign in with Google
        </button>

        {user && (
          <div className="mt-6 text-left">
            <p className="text-lg font-semibold">Welcome, {user.displayName}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        )}
      </div>
    </div>
  );
}
