'use client';
import React, { useState } from 'react';
import { auth, googleProvider } from '../../components/firebase';
import { signInWithPopup } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FaUserTie } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navi = useRouter();
  // Fixed the naming collision here from 'Login' to 'handleGoogleLogin'
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log(user);
      if (user) {
        navi.push('/')
      }
      // Clean string interpolation spacing for toast alert
      toast.success(`Welcome back, ${user.displayName || 'Palace Guest'}!`);
    } catch (error) {
      console.error("Auth error:", error);
      toast.error("Authentication failed. Please try again.");
    }
  };

  const handleLogin = async () => {

    if (name.trim() === '' && password.trim() === '') {
      toast.info("Fill the fields")
      return;
    }
    try {

      const user = await signInWithEmailAndPassword(auth, name, password)
      if (user) {
        navi.push('/')
      }
      if (!user) {
        toast.error("User not found")
      }
      // Clean string interpolation spacing for toast alert
      toast.success(`Welcome back, ${name || 'Palace Guest'}!`);
    } catch (error) {
      console.error("Auth error:", error);
      toast.error("Authentication failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-height-screen min-h-screen w-full bg-black font-sans px-4">

      {/* Container Card - Styled to match the dark Slate & Amber borders of the footer features */}
      <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl bg-slate-950/50 border border-amber-950/30 shadow-2xl backdrop-blur-sm text-gray-400">

        <div className="text-center sm:text-left mb-6">
          <h2 className="text-2xl font-black text-white tracking-tight">
            Pizz<span className="text-orange-500">A</span> Pala<span className="text-orange-600">c</span>e
          </h2>
          <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
            Sign in to access your custom gourmet formulations and live GPS tracking.
          </p>
        </div>

        {/* Credentials Form Layout */}
        <div className="space-y-4">

          {/* Username Input Container */}


        </div>
        <p className='p-2 hover:cursor-pointer' onClick={() => navi.push('/signup')}>No account ?<span className='text-amber-700'> sign up</span></p>
        {/* Visual Content Divider */}
        <div className="flex items-center text-center my-5 text-[10px] uppercase font-bold tracking-widest text-gray-600">
          <div className="flex-1 border-b border-amber-950/20"></div>
          <span className="px-3">Secure Gateway</span>
          <div className="flex-1 border-b border-amber-950/20"></div>
        </div>

        {/* Clean, Full-Width Google Authentication Button */}
        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-3 w-full py-2.5 bg-black border border-amber-950/40 text-white rounded-xl text-sm font-semibold tracking-wide hover:bg-neutral-900 hover:border-orange-500/40 transition-all duration-200 active:scale-[0.98]"
        >
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Continue with Google
        </button>

        <button
          onClick={()=>navi.push('/admin')}
          className="flex items-center justify-center gap-3 mt-4 w-full py-2.5 bg-black border border-amber-950/40 text-white rounded-xl text-sm font-semibold tracking-wide hover:bg-neutral-900 hover:border-orange-500/40 transition-all duration-200 active:scale-[0.98]"
        >
         <FaUserTie/>
          Continue as Admin
        </button>
      </div>
    </div>
  );
}