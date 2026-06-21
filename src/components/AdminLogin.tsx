import React, { useState } from "react";
import { Eye, EyeOff, Lock, User, AlertCircle, Camera } from "lucide-react";

interface AdminLoginProps {
  onLoginSuccess: (token: string) => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (data.success && data.token) {
        sessionStorage.setItem("adminToken", data.token);
        onLoginSuccess(data.token);
      } else {
        setError(data.error || "Invalid credentials. Please try again.");
      }
    } catch {
      setError("Unable to connect. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9000] flex items-center justify-center"
      style={{
        background: "linear-gradient(135deg, #0a0a0a 0%, #111827 50%, #0a0a0a 100%)"
      }}
    >
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "radial-gradient(circle at 25% 25%, #B89058 0%, transparent 50%), radial-gradient(circle at 75% 75%, #B89058 0%, transparent 50%)"
        }}
      />

      <div className="relative w-full max-w-md px-8">
        {/* Logo block */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#B89058]/10 border border-[#B89058]/30 mb-5">
            <Camera size={28} className="text-[#B89058]" />
          </div>
          <h1 className="font-serif text-2xl text-white tracking-wide mb-1">Shutter Stories</h1>
          <p className="text-sm text-white/40 tracking-widest uppercase font-sans">Admin Portal</p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8 border border-white/10"
          style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(20px)" }}
        >
          <h2 className="text-lg font-semibold text-white mb-1 font-sans">Welcome back</h2>
          <p className="text-sm text-white/40 font-sans mb-7">Sign in to access the dashboard</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label className="block text-xs font-medium text-white/60 font-sans mb-2 tracking-wider uppercase">
                Username
              </label>
              <div className="relative">
                <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  id="admin-username"
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  autoComplete="username"
                  placeholder="Enter username"
                  className="w-full pl-10 pr-4 py-3 rounded-xl font-sans text-sm text-white placeholder-white/25 focus:outline-none focus:ring-2 focus:ring-[#B89058]/50 transition-all"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium text-white/60 font-sans mb-2 tracking-wider uppercase">
                Password
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="current-password"
                  placeholder="Enter password"
                  className="w-full pl-10 pr-11 py-3 rounded-xl font-sans text-sm text-white placeholder-white/25 focus:outline-none focus:ring-2 focus:ring-[#B89058]/50 transition-all"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20">
                <AlertCircle size={14} className="text-red-400 shrink-0" />
                <p className="text-xs text-red-400 font-sans">{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              id="admin-login-submit"
              className="w-full py-3.5 rounded-xl font-sans text-sm font-semibold text-black tracking-wide transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              style={{ background: "linear-gradient(135deg, #C9A66B, #B89058)" }}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  Signing in...
                </span>
              ) : "Sign In"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-white/20 font-sans mt-6">
          © 2025 Shutter Stories. Restricted access.
        </p>
      </div>
    </div>
  );
};
