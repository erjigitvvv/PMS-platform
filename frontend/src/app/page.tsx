'use client';

import React, { useState } from 'react';
import { 
  GraduationCap, 
  Building2, 
  FileText, 
  CalendarCheck, 
  Award, 
  Users, 
  CheckCircle2, 
  Clock, 
  FileDown, 
  Plus, 
  Bell, 
  Search, 
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Send,
  Download
} from 'lucide-react';
import { StatsCard } from '@/components/StatsCard';
import { StatusBadge } from '@/components/StatusBadge';
import { UserRole } from '@/types';

export default function Dashboard() {
  const [currentRole, setCurrentRole] = useState<UserRole>('STUDENT');
  const [notification, setNotification] = useState<string | null>(
    'Real-time: Yangi 3 tomonlama shartnoma tasdiqlandi (PDF tayyor)'
  );

  // Demo logs for student & mentor
  const [logs, setLogs] = useState([
    {
      id: '1',
      date: '2026-10-30',
      tasks: 'FastAPI arxitekturasi va PostgreSQL ma\'lumotlar bazasi modellarini yaratish',
      skills: 'Python, SQLAlchemy, Git',
      status: 'APPROVED',
      feedback: 'Ajoyib natija, kod toza yozilgan.'
    },
    {
      id: '2',
      date: '2026-10-31',
      tasks: 'JWT autentifikatsiya va 5 ta rol ruxsatlari matritsasini ishlab chiqish',
      skills: 'Security, JWT, RBAC',
      status: 'PENDING',
      feedback: ''
    }
  ]);

  const [newTask, setNewTask] = useState('');
  const [newSkills, setNewSkills] = useState('');

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask) return;
    const newEntry = {
      id: String(Date.now()),
      date: new Date().toISOString().split('T')[0],
      tasks: newTask,
      skills: newSkills || 'Umumiy amaliy ko\'nikmalar',
      status: 'PENDING',
      feedback: ''
    };
    setLogs([newEntry, ...logs]);
    setNewTask('');
    setNewSkills('');
    setNotification('Yangi kundalik kiritildi va mentorga yuborildi!');
  };

  const handleApproveLog = (id: string) => {
    setLogs(logs.map(log => log.id === id ? { ...log, status: 'APPROVED', feedback: 'Mentor tomonidan tasdiqlandi' } : log));
    setNotification('Talaba kundaligi muvaffaqiyatli tasdiqlandi (Approve)!');
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col antialiased">
      {/* Top Pure White Header */}
      <header className="bg-white border-b border-zinc-200/80 sticky top-0 z-30 px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-zinc-900 text-white flex items-center justify-center font-bold text-sm tracking-wider">
              PMS
            </div>
            <div>
              <h1 className="text-sm font-semibold text-zinc-900 leading-tight">OTM Amaliyot Portali</h1>
              <p className="text-[11px] text-zinc-400">Practicum Management Platform</p>
            </div>
          </div>

          {/* Interactive Role Switcher for Demo */}
          <div className="flex items-center space-x-1.5 bg-zinc-100/80 p-1 rounded-xl border border-zinc-200/60">
            {(['STUDENT', 'MENTOR', 'OTM_STAFF', 'TEACHER', 'ADMIN'] as UserRole[]).map((role) => (
              <button
                key={role}
                onClick={() => setCurrentRole(role)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 ${
                  currentRole === role
                    ? 'bg-white text-zinc-900 shadow-sm border border-zinc-200/80'
                    : 'text-zinc-500 hover:text-zinc-800'
                }`}
              >
                {role === 'STUDENT' && '🎓 Talaba'}
                {role === 'MENTOR' && '🏢 Mentor'}
                {role === 'OTM_STAFF' && '🏛 Dekanat'}
                {role === 'TEACHER' && '👨‍🏫 Ustoz'}
                {role === 'ADMIN' && '👑 Admin'}
              </button>
            ))}
          </div>

          {/* User profile & Notification indicator */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <button className="w-8 h-8 rounded-lg border border-zinc-200 flex items-center justify-center text-zinc-600 hover:bg-zinc-50">
                <Bell className="w-4 h-4" />
              </button>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white"></span>
            </div>
            <div className="h-6 w-[1px] bg-zinc-200"></div>
            <div className="text-right hidden sm:block">
              <p className="text-xs font-medium text-zinc-900">
                {currentRole === 'STUDENT' && 'Bekzod Ergashev (Talaba)'}
                {currentRole === 'MENTOR' && 'Sardor Bekmurodov (Uzum Lead)'}
                {currentRole === 'OTM_STAFF' && 'Alisher Qodirov (Dekanat)'}
                {currentRole === 'TEACHER' && 'Dotsent Jamshid Karimov'}
                {currentRole === 'ADMIN' && 'Tizim Administratori'}
              </p>
              <p className="text-[11px] text-zinc-400 capitalize">{currentRole.toLowerCase()}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Real-time Notification Banner */}
      {notification && (
        <div className="bg-white border-b border-emerald-100 px-6 py-2">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-emerald-800">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{notification}</span>
            </div>
            <button 
              onClick={() => setNotification(null)}
              className="text-zinc-400 hover:text-zinc-600 text-xs ml-4"
            >
              Yopish
            </button>
          </div>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8 space-y-8">
        
        {/* Section 1: Top Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          <StatsCard 
            title="Amaliyot muddati" 
            value="45 / 60 kun" 
            subtitle="Tugashiga 15 kun qoldi" 
            icon={Clock} 
            trend="75%" 
          />
          <StatsCard 
            title="Tasdiqlangan kundaliklar" 
            value="28 ta" 
            subtitle="Jami yozilgan: 30 ta" 
            icon={CheckCircle2} 
            trend="+2 yangi" 
          />
          <StatsCard 
            title="Davomat ko'rsatkichi" 
            value="98.5%" 
            subtitle="29 kun hozir bo'lgan" 
            icon={CalendarCheck} 
          />
          <StatsCard 
            title="Kutilayotgan Ball" 
            value="94 / 100" 
            subtitle="Mentor: 48 | OTM: 46 (A)" 
            icon={Award} 
            trend="A'lo" 
          />
        </div>

        {/* Section 2: 3-Party Contract & Details Card */}
        <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Rasmiy Hujjat</span>
              <StatusBadge status="APPROVED" />
            </div>
            <h2 className="text-base font-semibold text-zinc-900">Uch Tomonlama Elektron Shartnoma № AMAL-2026-089</h2>
            <p className="text-xs text-zinc-500">
              Tomonlar: <b>TIU Universiteti</b> &bull; <b>Uzum Technologies MCHJ</b> &bull; <b>Bekzod Ergashev</b>
            </p>
          </div>
          <div className="flex items-center space-x-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none inline-flex items-center justify-center space-x-2 px-4 py-2 bg-white border border-zinc-200 text-zinc-700 rounded-xl text-xs font-medium hover:bg-zinc-50 transition-all">
              <FileDown className="w-4 h-4 text-zinc-500" />
              <span>Word (.docx)</span>
            </button>
            <button className="flex-1 md:flex-none inline-flex items-center justify-center space-x-2 px-4 py-2 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800 transition-all shadow-sm">
              <Download className="w-4 h-4" />
              <span>PDF Yuklab olish</span>
            </button>
          </div>
        </div>

        {/* Section 3: Role Specific Content */}
        {currentRole === 'STUDENT' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left 2 Cols: Daily Log List */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-zinc-900">Mening Amaliyot Kundaligim</h3>
                  <p className="text-xs text-zinc-500">Har kunlik bajarilgan vazifalar va o'rganilgan ko'nikmalar</p>
                </div>
              </div>

              <div className="space-y-3">
                {logs.map((log) => (
                  <div key={log.id} className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-subtle space-y-3 hover:border-zinc-300 transition-all">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-zinc-400">{log.date}</span>
                      <StatusBadge status={log.status} />
                    </div>
                    <p className="text-sm font-medium text-zinc-800 leading-relaxed">{log.tasks}</p>
                    <div className="flex items-center justify-between pt-2 border-t border-zinc-100 text-xs">
                      <span className="text-zinc-500"><b>Ko'nikmalar:</b> {log.skills}</span>
                      {log.feedback && <span className="text-emerald-600 italic">{log.feedback}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 1 Col: Add New Log Form */}
            <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-subtle h-fit space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-zinc-900">Bugungi Hisobotni Yozish</h3>
                <p className="text-xs text-zinc-500 mt-0.5">Sana: {new Date().toLocaleDateString('uz-UZ')}</p>
              </div>

              <form onSubmit={handleAddLog} className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">Bajarilgan ishlar</label>
                  <textarea
                    rows={4}
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Bugun korxonada qanday amaliy vazifalarni bajardingiz?.."
                    className="w-full text-xs p-3 rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900 transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">O'rganilgan ko'nikmalar</label>
                  <input
                    type="text"
                    value={newSkills}
                    onChange={(e) => setNewSkills(e.target.value)}
                    placeholder="Masalan: Docker, API integratsiya..."
                    className="w-full text-xs p-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-zinc-900 text-white text-xs font-medium rounded-xl hover:bg-zinc-800 transition-all shadow-sm flex items-center justify-center space-x-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Mentorga Tasdiqlashga Yuborish</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {currentRole === 'MENTOR' && (
          <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-subtle space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-zinc-900">Korxona Mentori Boshqaruv Paneli</h3>
                <p className="text-xs text-zinc-500">Talabalar kiritgan kundaliklarni 1 ta tugma bilan tekshirish va tasdiqlash</p>
              </div>
            </div>

            <div className="divide-y divide-zinc-100">
              {logs.map((log) => (
                <div key={log.id} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-semibold text-zinc-900">Bekzod Ergashev</span>
                      <span className="text-zinc-300">&bull;</span>
                      <span className="text-xs text-zinc-400">{log.date}</span>
                      <StatusBadge status={log.status} />
                    </div>
                    <p className="text-xs text-zinc-700">{log.tasks}</p>
                    <p className="text-[11px] text-zinc-400">Ko'nikmalar: {log.skills}</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    {log.status === 'PENDING' ? (
                      <>
                        <button 
                          onClick={() => handleApproveLog(log.id)}
                          className="px-3.5 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-medium hover:bg-emerald-700 transition-all shadow-sm"
                        >
                          Tasdiqlash (Approve)
                        </button>
                        <button className="px-3.5 py-1.5 bg-white border border-rose-200 text-rose-600 rounded-xl text-xs font-medium hover:bg-rose-50 transition-all">
                          Qaytarish
                        </button>
                      </>
                    ) : (
                      <span className="text-xs text-emerald-600 font-medium">✓ Tasdiqlangan</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentRole === 'OTM_STAFF' && (
          <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-subtle space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-semibold text-zinc-900">OTM Amaliyot Bo'limi / Dekanat</h3>
                <p className="text-xs text-zinc-500">Talabalar bazasini Excel orqali import qilish va monitoring</p>
              </div>
              <div className="flex items-center space-x-3">
                <button className="px-4 py-2 bg-white border border-zinc-200 text-zinc-800 rounded-xl text-xs font-medium hover:bg-zinc-50 transition-all flex items-center space-x-2">
                  <FileDown className="w-4 h-4 text-zinc-500" />
                  <span>Excel Shablonini olish</span>
                </button>
                <button className="px-4 py-2 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800 transition-all shadow-sm flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Excel (.xlsx) yuklash</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-zinc-200 text-zinc-400 font-medium uppercase tracking-wider">
                    <th className="py-3 px-4">Talaba F.I.SH</th>
                    <th className="py-3 px-4">Guruh</th>
                    <th className="py-3 px-4">Biriktirilgan Korxona</th>
                    <th className="py-3 px-4">Amaliyot Turi</th>
                    <th className="py-3 px-4">Shartnoma</th>
                    <th className="py-3 px-4">Holat</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 text-zinc-700">
                  <tr>
                    <td className="py-3.5 px-4 font-medium text-zinc-900">Bekzod Ergashev</td>
                    <td className="py-3.5 px-4">DI-202-22</td>
                    <td className="py-3.5 px-4">Uzum Technologies MCHJ</td>
                    <td className="py-3.5 px-4">Ishlab chiqarish</td>
                    <td className="py-3.5 px-4 font-mono text-[11px]">AMAL-2026-089</td>
                    <td className="py-3.5 px-4"><StatusBadge status="APPROVED" /></td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-medium text-zinc-900">Malika Usmonova</td>
                    <td className="py-3.5 px-4">DI-202-22</td>
                    <td className="py-3.5 px-4">Click MCHJ</td>
                    <td className="py-3.5 px-4">Malakaviy</td>
                    <td className="py-3.5 px-4 font-mono text-[11px]">AMAL-2026-090</td>
                    <td className="py-3.5 px-4"><StatusBadge status="IN_PROGRESS" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200/80 bg-white py-6 mt-12 text-center text-xs text-zinc-400">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 PMS Platform. Oliy ta'lim muassasasi talabalar amaliyotini boshqarish tizimi.</p>
          <div className="flex items-center space-x-4">
            <span className="text-zinc-500">Design: Minimalist Clean White</span>
            <span>&bull;</span>
            <span className="text-emerald-600 font-medium">● Real-time WebSockets Active</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
