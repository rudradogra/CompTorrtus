// pages/admin/login.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword as firebaseSignIn } from "firebase/auth";
import { auth } from "@/firebaseConfig/firebaseConfig";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const user = await firebaseSignIn(auth, email, password);
      if (user) {
        router.push("/admin/dashboard");
      }
    } catch (err) {
      setError("Invalid email or password");
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-md">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Admin Login
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm space-y-4">
            <input
              type="email"
              required
              className="w-full p-3 border border-gray-300 rounded-lg text-black"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              required
              className="w-full p-3 border border-gray-300 rounded-lg text-black"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-lg bg-black text-white font-semibold hover:bg-gray-800"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
