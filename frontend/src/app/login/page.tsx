'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Lock, 
  User as UserIcon, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  AlertCircle 
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 350));

      const trimmedUser = username.trim().toUpperCase();
      let detectedRole = 'STUDENT';
      let fullName = username;

      // Smart role detection based on 2-letter prefix or keyword
      if (trimmedUser.startsWith('AD') || trimmedUser.includes('ADMIN')) {
        detectedRole = 'ADMIN';
        fullName = 'Tizim Administratori';
      } else if (trimmedUser.startsWith('DK') || trimmedUser.includes('DEKAN') || trimmedUser.includes('STAFF')) {
        detectedRole = 'OTM_STAFF';
        fullName = 'Alisher Qodirov (Dekanat)';
      } else if (trimmedUser.startsWith('MN') || trimmedUser.includes('MENTOR')) {
        detectedRole = 'MENTOR';
        fullName = 'Sardor Bekmurodov (Uzum Tech)';
      } else if (trimmedUser.startsWith('TC') || trimmedUser.startsWith('OQ') || trimmedUser.includes('USTOZ') || trimmedUser.includes('TEACHER')) {
        detectedRole = 'TEACHER';
        fullName = 'Dotsent Jamshid Karimov';
      } else if (trimmedUser.startsWith('ST') || trimmedUser.startsWith('TL') || trimmedUser.includes('TALABA')) {
        detectedRole = 'STUDENT';
        fullName = 'Bekzod Ergashev (Talaba)';
      }

      if (username && password.length >= 4) {
        const sessionData = {
          access_token: 'jwt_token_' + Date.now(),
          user_id: 'usr_' + trimmedUser,
          username: trimmedUser,
          role: detectedRole,
          full_name: fullName,
        };

        if (typeof window !== 'undefined') {
          localStorage.setItem('pms_user', JSON.stringify(sessionData));
        }

        const roleRedirects: Record<string, string> = {
          STUDENT: '/student',
          MENTOR: '/mentor',
          TEACHER: '/teacher',
          OTM_STAFF: '/dekanat',
          ADMIN: '/admin',
        };

        const target = roleRedirects[detectedRole] || '/student';
        router.push(target);
      } else {
        setErrorMessage("Noto'g'ri ID yoki parol kiritildi. Qaytadan urinib ko'ring.");
      }
    } catch (err: any) {
      setErrorMessage("Server bilan ulanishda xatolik yuz berdi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col justify-center py-10 sm:px-6 lg:px-8 antialiased selection:bg-zinc-900 selection:text-white">
      {/* Brand Header with Official Borderless TIU Logo */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="flex justify-center mb-4">
          <img 
            src="/tiu-official-logo.png" 
            alt="Tashkent International University" 
            className="h-20 w-auto object-contain"
          />
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight leading-snug">
          Tashkent International University
        </h1>
        <p className="mt-1 text-xs font-semibold text-zinc-600">
          OTM Talabalari Amaliyotini Boshqarish Platformasi (PMS)
        </p>
      </div>

      {/* Main Card */}
      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-8 border border-zinc-200/80 rounded-2xl shadow-subtle space-y-5">
          
          {/* Error Alert */}
          {errorMessage && (
            <div className="bg-rose-50 border border-rose-200/80 rounded-xl p-3 flex items-start space-x-2 text-rose-700 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form className="space-y-4" onSubmit={handleLogin}>
            {/* ID Input */}
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                Foydalanuvchi ID (Login)
              </label>
              <div className="relative rounded-xl">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                  <UserIcon className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toUpperCase())}
                  placeholder="AD987789"
                  className="block w-full pl-9 pr-3 py-2.5 text-xs font-mono rounded-xl border border-zinc-200 bg-white placeholder-zinc-400 focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all text-zinc-900 uppercase tracking-wider"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                Parol
              </label>
              <div className="relative rounded-xl">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Parolni kiriting"
                  className="block w-full pl-9 pr-10 py-2.5 text-xs rounded-xl border border-zinc-200 bg-white placeholder-zinc-400 focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all text-zinc-900"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-zinc-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-0.5">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-3.5 h-3.5 text-zinc-900 border-zinc-300 rounded focus:ring-zinc-900"
                />
                <span className="ml-2 text-xs text-zinc-500">Meni eslab qol</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-2.5 px-4 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-900 transition-all shadow-sm flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isLoading ? (
                <span>Tekshirilmoqda...</span>
              ) : (
                <>
                  <span>Tizimga kirish</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
