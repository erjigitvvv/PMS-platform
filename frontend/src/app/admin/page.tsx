'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Building2, 
  Users, 
  ShieldCheck, 
  Server, 
  Database, 
  Download, 
  RefreshCw, 
  LogOut, 
  AlertTriangle, 
  CheckCircle2, 
  Lock, 
  Settings,
  Activity
} from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'health' | 'users' | 'audit' | 'backups'>('health');
  const [notification, setNotification] = useState<string | null>(null);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('pms_user');
    }
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col antialiased text-zinc-900">
      {/* Top Header */}
      <header className="bg-white border-b border-zinc-200/80 sticky top-0 z-30 px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src="/tiu-logo.svg" alt="TIU" className="w-9 h-9 object-contain" />
            <div>
              <h1 className="text-sm font-bold text-zinc-900 leading-tight">Tashkent International University</h1>
              <p className="text-[11px] text-zinc-400">Tizim Administratori (Super Admin) Portali</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 bg-zinc-50 border border-zinc-200/60 px-3 py-1.5 rounded-xl text-xs">
              <span className="font-semibold text-zinc-900">Tizim Administratori</span>
              <span className="text-zinc-300">|</span>
              <span className="text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded text-[10px] font-bold">SUPER ADMIN</span>
            </div>

            <button 
              onClick={handleLogout}
              className="flex items-center space-x-1.5 text-xs text-zinc-500 hover:text-rose-600 transition-colors bg-zinc-100 hover:bg-rose-50 px-3 py-1.5 rounded-xl border border-zinc-200/60"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Chiqish</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 flex-1 flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <aside className="w-full md:w-60 shrink-0">
          <div className="bg-white border border-zinc-200/80 rounded-2xl p-2.5 shadow-sm space-y-1">
            <button
              onClick={() => setActiveTab('health')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'health' ? 'bg-zinc-900 text-white shadow-sm' : 'text-zinc-600 hover:bg-zinc-50'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Server & API Salomatligi</span>
            </button>

            <button
              onClick={() => setActiveTab('users')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'users' ? 'bg-zinc-900 text-white shadow-sm' : 'text-zinc-600 hover:bg-zinc-50'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Foydalanuvchilar (RBAC)</span>
            </button>

            <button
              onClick={() => setActiveTab('audit')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'audit' ? 'bg-zinc-900 text-white shadow-sm' : 'text-zinc-600 hover:bg-zinc-50'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Xavfsizlik & Audit Loglari</span>
            </button>

            <button
              onClick={() => setActiveTab('backups')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'backups' ? 'bg-zinc-900 text-white shadow-sm' : 'text-zinc-600 hover:bg-zinc-50'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>Zaxira Nusxalari (Backups)</span>
            </button>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 space-y-6">
          {notification && (
            <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-4 flex items-center space-x-3 text-emerald-800 text-xs shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{notification}</span>
            </div>
          )}

          {/* TAB 1: SERVER HEALTH */}
          {activeTab === 'health' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-sm">
                  <span className="text-xs text-zinc-500">FastAPI Asinxron Backend</span>
                  <p className="text-lg font-bold text-emerald-600 mt-2 flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <span>ONLINE (200 OK)</span>
                  </p>
                  <p className="text-[11px] text-zinc-400 mt-1">Port: 8000 • Uvicorn</p>
                </div>

                <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-sm">
                  <span className="text-xs text-zinc-500">PostgreSQL 16 Relyatsion DB</span>
                  <p className="text-lg font-bold text-emerald-600 mt-2 flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <span>CONNECTED</span>
                  </p>
                  <p className="text-[11px] text-zinc-400 mt-1">16 ta Relyatsion Jadval</p>
                </div>

                <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-sm">
                  <span className="text-xs text-zinc-500">Redis & WebSockets</span>
                  <p className="text-lg font-bold text-emerald-600 mt-2 flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <span>ACTIVE</span>
                  </p>
                  <p className="text-[11px] text-zinc-400 mt-1">Real-time Push Channel</p>
                </div>

                <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-sm">
                  <span className="text-xs text-zinc-500">Telegram Bot (@tiupm_bot)</span>
                  <p className="text-lg font-bold text-blue-600 mt-2 flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                    <span>aiogram 3.x RUNNING</span>
                  </p>
                  <p className="text-[11px] text-zinc-400 mt-1">FSM Polling rejimida</p>
                </div>
              </div>

              {/* Service Logs */}
              <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-3">
                <h3 className="text-sm font-bold text-zinc-900">Jonli Tizim Loglari (Uvicorn stdout)</h3>
                <div className="bg-zinc-950 rounded-xl p-4 font-mono text-[11px] text-zinc-300 space-y-1.5 overflow-x-auto">
                  <p><span className="text-emerald-400">[INFO]</span> 2026-11-02 13:20:01 - FastAPI application startup complete on port 8000</p>
                  <p><span className="text-emerald-400">[INFO]</span> 2026-11-02 13:20:05 - PostgreSQL database schema synchronized (16 tables)</p>
                  <p><span className="text-emerald-400">[INFO]</span> 2026-11-02 13:21:12 - WebSocket client connected: /api/v1/ws/live (client: 127.0.0.1)</p>
                  <p><span className="text-blue-400">[DEBUG]</span> 2026-11-02 13:22:45 - Contract generation triggered for AMAL-2026-0042 (PDF sha256 valid)</p>
                  <p><span className="text-emerald-400">[INFO]</span> 2026-11-02 13:24:10 - aiogram bot @tiupm_bot listening to student updates...</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: USERS */}
          {activeTab === 'users' && (
            <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-bold text-zinc-900">Foydalanuvchilar va Rollar Boshqaruvi (RBAC)</h3>
                  <p className="text-xs text-zinc-500">Mas'ul xodimlarga akkaunt ochish va huquqlarni berish</p>
                </div>
                <button className="px-3.5 py-2 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800 shadow-sm">
                  + Yangi Xodim Qo'shish
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-zinc-50 text-zinc-500 border-b border-zinc-200">
                    <tr>
                      <th className="py-2.5 px-3 font-medium">Username</th>
                      <th className="py-2.5 px-3 font-medium">F.I.SH</th>
                      <th className="py-2.5 px-3 font-medium">Roli</th>
                      <th className="py-2.5 px-3 font-medium">Holati</th>
                      <th className="py-2.5 px-3 font-medium">Amal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {[
                      { user: 'admin', name: 'Tizim Administratori', role: 'ADMIN', status: 'FAOL' },
                      { user: 'dekanat', name: 'Jamshid Alimov', role: 'OTM_STAFF', status: 'FAOL' },
                      { user: 'oqituvchi', name: 'Dotsent Alisher Qodirov', role: 'TEACHER', status: 'FAOL' },
                      { user: 'mentor', name: 'Sardor Bekmurodov', role: 'MENTOR', status: 'FAOL' },
                      { user: 'talaba', name: 'Sardor Rahimov', role: 'STUDENT', status: 'FAOL' }
                    ].map((u, i) => (
                      <tr key={i} className="hover:bg-zinc-50/50">
                        <td className="py-3 px-3 font-mono font-bold text-zinc-900">{u.user}</td>
                        <td className="py-3 px-3 font-semibold text-zinc-800">{u.name}</td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-zinc-100 text-zinc-800 font-mono">
                            {u.role}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-emerald-700 font-semibold">{u.status}</td>
                        <td className="py-3 px-3">
                          <button 
                            onClick={() => {
                              setNotification(`${u.user} uchun parol muvaffaqiyatli tiklandi!`);
                              setTimeout(() => setNotification(null), 3000);
                            }}
                            className="text-xs text-zinc-900 font-medium underline hover:text-zinc-600"
                          >
                            Parolni yangilash
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: AUDIT */}
          {activeTab === 'audit' && (
            <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-4">
              <div>
                <h3 className="text-sm font-bold text-zinc-900">Xavfsizlik va Audit Loglari (Anti-Fraud)</h3>
                <p className="text-xs text-zinc-500">Tizimdagi barcha harakatlar, kirishlar va tailgating tekshiruvlari tarixi</p>
              </div>

              <div className="space-y-3">
                {[
                  { time: '13:24:12', user: 'dekanat', action: 'CONTRACT_GENERATE', ip: '192.168.1.14', status: 'SUCCESS' },
                  { time: '13:22:05', user: 'mentor', action: 'APPROVE_LOG', ip: '213.230.87.12', status: 'SUCCESS' },
                  { time: '13:21:40', user: 'talaba', action: 'SUBMIT_LOG', ip: '84.54.72.19', status: 'SUCCESS' },
                  { time: '13:18:10', user: 'unknown', action: 'FAILED_LOGIN (Attempt 1)', ip: '185.120.44.1', status: 'WARNING' }
                ].map((log, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl border border-zinc-200/60 bg-zinc-50/50 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-3">
                      <span className="font-mono text-zinc-400 text-[11px]">{log.time}</span>
                      <span className="font-bold text-zinc-900">{log.user}</span>
                      <span className="font-mono text-zinc-600 bg-white px-2 py-0.5 rounded border border-zinc-200 text-[10px]">{log.action}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="font-mono text-zinc-400 text-[11px]">{log.ip}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        log.status === 'SUCCESS' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                      }`}>
                        {log.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: BACKUPS */}
          {activeTab === 'backups' && (
            <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-bold text-zinc-900">Ma'lumotlar Bazasi Zaxiralari (PostgreSQL pg_dump)</h3>
                  <p className="text-xs text-zinc-500">Har kecha avtomatik olinadigan ACID zaxira fayllari</p>
                </div>
                <button 
                  onClick={() => {
                    setNotification('Yangi zaxira nusxasi (backup_2026_11_02.sql) muvaffaqiyatli olindi!');
                    setTimeout(() => setNotification(null), 3000);
                  }}
                  className="px-4 py-2 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800 shadow-sm"
                >
                  💾 Hozir Zaxira Olish
                </button>
              </div>

              <div className="space-y-3">
                {[
                  { file: 'pms_backup_2026_11_02_020000.sql.gz', size: '14.2 MB', date: 'Bugun, 02:00 (Avtomatik)' },
                  { file: 'pms_backup_2026_11_01_020000.sql.gz', size: '13.9 MB', date: 'Kecha, 02:00 (Avtomatik)' },
                  { file: 'pms_backup_2026_10_31_020000.sql.gz', size: '13.5 MB', date: '31-oktabr, 02:00 (Avtomatik)' }
                ].map((b, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-zinc-200/60 bg-zinc-50/40">
                    <div>
                      <h4 className="text-xs font-mono font-bold text-zinc-900">{b.file}</h4>
                      <p className="text-[11px] text-zinc-400 mt-0.5">{b.size} • {b.date}</p>
                    </div>
                    <button className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-white border border-zinc-200 text-zinc-700 rounded-lg text-xs font-medium hover:bg-zinc-50">
                      <Download className="w-3.5 h-3.5" />
                      <span>Yuklab olish</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
