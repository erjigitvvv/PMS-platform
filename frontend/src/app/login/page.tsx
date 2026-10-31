'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Lock, 
  User as UserIcon, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { UserRole } from '@/types';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Quick fill demo accounts for testing all 5 roles
  const demoAccounts = [
    { role: 'STUDENT', label: '🎓 Talaba', user: 'talaba', pass: 'Talaba123!' },
    { role: 'MENTOR', label: '🏢 Mentor', user: 'mentor', pass: 'Mentor123!' },
    { role: 'OTM_STAFF', label: '🏛 Dekanat', user: 'dekanat', pass: 'Dekanat123!' },
    { role: 'TEACHER', label: '👨‍🏫 Ustoz', user: 'oqituvchi', pass: 'Ustoz123!' },
    { role: 'ADMIN', label: '👑 Admin', user: 'admin', pass: 'Admin123!' },
  ];

  const handleQuickFill = (acc: typeof demoAccounts[0]) => {
    setUsername(acc.user);
    setPassword(acc.pass);
    setErrorMessage(null);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      // In production: const res = await axios.post('/api/v1/auth/login', { username, password });
      // For immediate client-side and simulated live testing:
      await new Promise(resolve => setTimeout(resolve, 600));

      // Check standard demo accounts or pass valid credentials
      const matchedAccount = demoAccounts.find(a => a.user === username && a.pass === password);
      
      if (matchedAccount || (username && password.length >= 6)) {
        const detectedRole = matchedAccount ? matchedAccount.role : 'STUDENT';
        const sessionData = {
          access_token: 'mock_jwt_token_' + Date.now(),
          user_id: 'usr_' + username,
          username: username,
          role: detectedRole,
          full_name: matchedAccount ? matchedAccount.label.split(' ')[1] : username,
        };

        if (typeof window !== 'undefined') {
          localStorage.setItem('pms_user', JSON.stringify(sessionData));
        }

        router.push('/');
      } else {
        setErrorMessage("Noto'g'ri login yoki parol kiritildi. Qaytadan urinib ko'ring.");
      }
    } catch (err: any) {
      setErrorMessage("Server bilan ulanishda xatolik yuz berdi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col justify-center py-12 sm:px-6 lg:px-8 antialiased selection:bg-zinc-900 selection:text-white">
      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-zinc-900 text-white font-bold text-lg shadow-sm mb-4">
          PMS
        </div>
        <h2 className="text-xl font-semibold text-zinc-900 tracking-tight">
          OTM Amaliyot Boshqaruv Portali
        </h2>
        <p className="mt-1 text-xs text-zinc-500">
          Shaxsiy kabinetingizga kirish uchun login va parolingizni kiriting
        </p>
      </div>

      {/* Main Card */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-8 border border-zinc-200/80 rounded-2xl shadow-subtle space-y-6">
          
          {/* Quick Demo Role Selector Pills */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                Tezkor sinov hisoblari:
              </span>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
              {demoAccounts.map((acc) => (
                <button
                  key={acc.role}
                  type="button"
                  onClick={() => handleQuickFill(acc)}
                  className={`py-1.5 px-2 rounded-xl text-[11px] font-medium border text-center transition-all ${
                    username === acc.user
                      ? 'bg-zinc-900 text-white border-zinc-900 shadow-sm'
                      : 'bg-zinc-50 border-zinc-200/60 text-zinc-600 hover:bg-zinc-100 hover:border-zinc-300'
                  }`}
                >
                  {acc.label}
                </button>
              ))}
            </div>
          </div>

          {/* Error Alert */}
          {errorMessage && (
            <div className="bg-rose-50 border border-rose-200/80 rounded-xl p-3 flex items-start space-x-2 text-rose-700 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form className="space-y-4" onSubmit={handleLogin}>
            {/* Username */}
            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1.5">
                Login / Talaba ID
              </label>
              <div className="relative rounded-xl">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                  <UserIcon className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Masalan: talaba, mentor yoki dekanat"
                  className="block w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-zinc-200 bg-white placeholder-zinc-400 focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-medium text-zinc-700">
                  Parol
                </label>
                <a href="#" className="text-[11px] text-zinc-400 hover:text-zinc-700 transition-colors">
                  Parolni unutdingizmi?
                </a>
              </div>
              <div className="relative rounded-xl">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full pl-9 pr-10 py-2.5 text-xs rounded-xl border border-zinc-200 bg-white placeholder-zinc-400 focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all"
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
            <div className="flex items-center justify-between pt-1">
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

          {/* Telegram Login Info Card */}
          <div className="pt-4 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-400">
            <span>Telegram Bot orqali ham kirish mumkin:</span>
            <a 
              href="https://t.me/tiupm_bot" 
              target="_blank" 
              rel="noreferrer"
              className="text-zinc-900 font-semibold hover:underline"
            >
              @tiupm_bot
            </a>
          </div>
        </div>

        {/* Security Stamp */}
        <div className="mt-6 text-center flex items-center justify-center space-x-1.5 text-zinc-400 text-[11px]">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>256-bit SSL shifrlash &bull; Rasmiy OTM tizimi</span>
        </div>
      </div>
    </div>
  );
}
