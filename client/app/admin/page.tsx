'use client';
import axios from 'axios';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Lock, Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import { FaUserShield } from 'react-icons/fa';
import { toast } from 'react-toastify';

function Admin() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navi = useRouter();

  const Login = async () => {
    if (!name || !password) {
      setError('Please enter both username and password');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await axios.post(`http://localhost:4000/api/admin`, {
        user: name,
        password: password,
      });
      if (res.data === true) {
        navi.push('/adminPanel');
      }
      if (res.data === false) {
        toast.error("UserName or Passsword is Wrong")
      }
      else {
        setError('Invalid username or password');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') Login();
  };

  return (
    /* Deepened background: near-black navy midnight gradient */
    <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-[#020617] via-[#050b18] to-[#091026] px-4 font-sans">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-4 shadow-xl shadow-orange-950/20">
            <FaUserShield className="text-orange-500" size={28} />
          </div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">Admin Gateway</h1>
          <p className="text-slate-500 text-xs mt-1.5">Sign in to access the administrator panel</p>
        </div>

        {/* Card: Ultra-Dark Glassmorphic Obsidian Container */}
        <div className="bg-[#070e20]/90 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 shadow-2xl shadow-black">
          <div className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter username"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#030712] border border-slate-800 rounded-xl text-slate-100 placeholder:text-slate-600 text-sm outline-none focus:border-orange-500/60 focus:ring-2 focus:ring-orange-500/10 transition-all duration-200"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter password"
                  className="w-full pl-10 pr-10 py-2.5 bg-[#030712] border border-slate-800 rounded-xl text-slate-100 placeholder:text-slate-600 text-sm outline-none focus:border-orange-500/60 focus:ring-2 focus:ring-orange-500/10 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div className="flex items-center gap-2 text-xs text-red-400 bg-red-950/30 border border-red-900/40 rounded-xl px-3 py-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={Login}
              disabled={loading}
              className="w-full mt-2 flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-xl shadow-lg shadow-orange-950/40 transition-all duration-200 active:scale-[0.98] text-sm tracking-wide"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                'Authenticate'
              )}
            </button>
          </div>
        </div>

        <p className="text-center text-slate-600 text-xs mt-6">
          Restricted system — authorized personnel only.
        </p>
      </div>
    </div>
  );
}

export default Admin;