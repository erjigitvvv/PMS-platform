'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Lock, 
  User as UserIcon, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  AlertCircle,
  ShieldCheck,
  Building2,
  Briefcase,
  BookOpen,
  GraduationCap,
  KeyRound,
  CheckCircle2
} from 'lucide-react';

interface RolePreset {
  id: string;
  role: string;
  login: string;
  label: string;
  name: string;
  pass: string;
  icon: React.ElementType;
  color: string;
}

const DEMO_ACCOUNTS: RolePreset[] = [
  {
    id: 'ADMIN',
    role: 'ADMIN',
    login: 'AD987789',
    label: 'Admin',
    name: 'Asosiy Administrator',
    pass: 'Admin123!',
    icon: ShieldCheck,
    color: 'text-indigo-600 bg-indigo-50 border-indigo-200'
  },
  {
    id: 'OTM_STAFF',
    role: 'OTM_STAFF',
    login: 'DK204581',
    label: 'Dekanat',
    name: 'Alisher Qodirov (Dekanat)',
    pass: 'Dekanat123!',
    icon: Building2,
    color: 'text-blue-600 bg-blue-50 border-blue-200'
  },
  {
    id: 'MENTOR',
    role: 'MENTOR',
    login: 'MN408193',
    label: 'Mentor',
    name: 'Sardor Bekmurodov (Uzum Tech)',
    pass: 'Mentor123!',
    icon: Briefcase,
    color: 'text-emerald-600 bg-emerald-50 border-emerald-200'
  },
  {
    id: 'TEACHER',
    role: 'TEACHER',
    login: 'TC309482',
    label: 'Ustoz',
    name: 'Dotsent Jamshid Karimov',
    pass: 'Ustoz123!',
    icon: BookOpen,
    color: 'text-amber-600 bg-amber-50 border-amber-200'
  },
  {
    id: 'STUDENT',
    role: 'STUDENT',
    login: 'ST501824',
    label: 'Talaba',
    name: 'Bekzod Ergashev (Talaba)',
    pass: 'Talaba123!',
    icon: GraduationCap,
    color: 'text-violet-600 bg-violet-50 border-violet-200'
  }
];

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('ST501824');
  const [password, setPassword] = useState('Talaba123!');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSelectPreset = (preset: RolePreset) => {
    setUsername(preset.login);
    setPassword(preset.pass);
    setErrorMessage(null);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 350));

      const trimmedUser = username.trim().toUpperCase();
      let detectedRole = 'STUDENT';
      let fullName = username;

      // Smart role detection based on 2-letter prefix or exact login
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
      {/* Brand Header with TIU Logo */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="flex justify-center mb-3">
          <div className="w-16 h-16 rounded-2xl bg-white border border-zinc-200/80 p-2 shadow-xs flex items-center justify-center">
            <img 
              src="/tiu-logo.svg" 
              alt="Tashkent International University" 
              className="h-full w-full object-contain"
            />
          </div>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight leading-snug">
          Tashkent International University
        </h1>
        <p className="mt-1 text-xs font-semibold text-zinc-600">
          OTM Talabalari Amaliyotini Boshqarish Platformasi (PMS)
        </p>
        <div className="mt-2 inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-zinc-100 border border-zinc-200/60 text-[11px] font-mono text-zinc-500">
          <span>Login formati: 2 ta harf + 6 ta raqam</span>
        </div>
      </div>

      {/* Main Card */}
      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-7 px-6 sm:px-8 border border-zinc-200/80 rounded-2xl shadow-subtle space-y-5">
          
          {/* Quick Role Fill Buttons (Pure Vector Icons) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-semibold text-zinc-500">
              <span className="flex items-center space-x-1">
                <KeyRound className="w-3.5 h-3.5 text-zinc-400" />
                <span>Tezkor test kirish rollari:</span>
              </span>
              <span className="text-[10px] text-zinc-400 font-mono">Bitta bosishda to'ldiriladi</span>
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {DEMO_ACCOUNTS.map((preset) => {
                const Icon = preset.icon;
                const isSelected = username === preset.login;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleSelectPreset(preset)}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl border text-[10px] font-medium transition-all ${
                      isSelected 
                        ? 'border-zinc-900 bg-zinc-900 text-white shadow-xs' 
                        : 'border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 text-zinc-700 bg-white'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 mb-1 ${isSelected ? 'text-white' : preset.color.split(' ')[0]}`} />
                    <span className="truncate w-full text-center leading-none">{preset.label}</span>
                    <span className={`text-[9px] font-mono mt-0.5 leading-none ${isSelected ? 'text-zinc-300' : 'text-zinc-400'}`}>
                      {preset.login.slice(0, 2)}
                    </span>
                  </button>
                );
              })}
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
            {/* ID Input */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-zinc-700">
                  Foydalanuvchi ID (Login)
                </label>
                <span className="text-[10px] font-mono text-zinc-400">
                  Masalan: AD987789
                </span>
              </div>
              <div className="relative rounded-xl">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                  <UserIcon className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toUpperCase())}
                  placeholder="AD987789 yoki ST501824"
                  className="block w-full pl-9 pr-3 py-2.5 text-xs font-mono rounded-xl border border-zinc-200 bg-white placeholder-zinc-400 focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all text-zinc-900 uppercase tracking-wider"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-zinc-700">
                  Parol
                </label>
                <span className="text-[10px] font-mono text-zinc-400">
                  Demo: Talaba123! / Admin123!
                </span>
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
              <div className="flex items-center space-x-1 text-emerald-600 text-[11px] font-medium">
                <CheckCircle2 className="w-3 h-3" />
                <span>Xavfsiz ulanish (SSL)</span>
              </div>
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

          {/* Role Logins Reference Table */}
          <div className="pt-3 border-t border-zinc-100">
            <p className="text-[11px] font-semibold text-zinc-600 mb-2">Rasmiy Role ID ma'lumotnomasi:</p>
            <div className="space-y-1 font-mono text-[11px] text-zinc-500">
              <div className="flex justify-between items-center py-0.5 px-2 rounded-lg bg-zinc-50">
                <span className="font-sans text-zinc-700">Administrator:</span>
                <span className="font-bold text-zinc-900">AD987789</span>
              </div>
              <div className="flex justify-between items-center py-0.5 px-2 rounded-lg bg-zinc-50">
                <span className="font-sans text-zinc-700">Dekanat (OTM):</span>
                <span className="font-bold text-zinc-900">DK204581</span>
              </div>
              <div className="flex justify-between items-center py-0.5 px-2 rounded-lg bg-zinc-50">
                <span className="font-sans text-zinc-700">Korxona Mentori:</span>
                <span className="font-bold text-zinc-900">MN408193</span>
              </div>
              <div className="flex justify-between items-center py-0.5 px-2 rounded-lg bg-zinc-50">
                <span className="font-sans text-zinc-700">Kafedra O'qituvchisi:</span>
                <span className="font-bold text-zinc-900">TC309482</span>
              </div>
              <div className="flex justify-between items-center py-0.5 px-2 rounded-lg bg-zinc-50">
                <span className="font-sans text-zinc-700">Amaliyotchi Talaba:</span>
                <span className="font-bold text-zinc-900">ST501824</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
