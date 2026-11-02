'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Building2, 
  Users, 
  CalendarCheck, 
  CheckCircle2, 
  Clock, 
  Award, 
  Settings, 
  LogOut, 
  Check, 
  X, 
  ExternalLink,
  AlertCircle,
  Search,
  Filter
} from 'lucide-react';

export default function MentorDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'attendance' | 'inbox' | 'grading' | 'settings'>('overview');

  // Attendance state
  const [attendance, setAttendance] = useState<Record<string, 'PRESENT' | 'LATE' | 'ABSENT' | 'EXCUSED'>>({
    'std_1': 'PRESENT',
    'std_2': 'LATE',
    'std_3': 'PRESENT',
    'std_4': 'PRESENT',
    'std_5': 'PRESENT'
  });

  // Inbox logs state
  const [inboxLogs, setInboxLogs] = useState([
    {
      id: 'log_1',
      studentName: 'Sardor Rahimov',
      group: 'DI-202-22',
      date: '2026-11-01',
      tasks: 'FastAPI WebSockets orqali jonli bildirishnomalar arxitekturasini loyihalash va sinash',
      skills: 'Python, WebSockets, AsyncIO',
      status: 'PENDING'
    },
    {
      id: 'log_2',
      studentName: 'Madina Karimova',
      group: 'DI-202-22',
      date: '2026-11-01',
      tasks: 'Next.js 14 komponentlarida Tailwind CSS bilan oq minimalist shakllarni yaratish',
      skills: 'React, Next.js, Tailwind CSS',
      status: 'PENDING'
    },
    {
      id: 'log_3',
      studentName: 'Javohir Toshmatov',
      group: 'DI-201-22',
      date: '2026-11-01',
      tasks: 'PostgreSQL da 16 ta relyatsion jadval va ACID tranzaksiyalarini optimallashtirish',
      skills: 'PostgreSQL, Database Indexing',
      status: 'PENDING'
    }
  ]);

  // Grading state
  const [gradeInputs, setGradeInputs] = useState<Record<string, { score: number; review: string }>>({
    'std_1': { score: 4.8, review: 'Juda tirishqoq, texnik topshiriqlarni mustaqil va o\'z vaqtida topshirdi.' }
  });

  const [notification, setNotification] = useState<string | null>(null);

  const handleApproveLog = (id: string) => {
    setInboxLogs(inboxLogs.filter(l => l.id !== id));
    setNotification('Kundalik muvaffaqiyatli tasdiqlandi (Approve)! Talabaning davomatiga +1 kun qo\'shildi.');
    setTimeout(() => setNotification(null), 3500);
  };

  const handleRejectLog = (id: string) => {
    setInboxLogs(inboxLogs.filter(l => l.id !== id));
    setNotification('Kundalik talabaga qayta to\'ldirish uchun qaytarildi (Reject).');
    setTimeout(() => setNotification(null), 3500);
  };

  const handleAttendanceChange = (studentId: string, status: 'PRESENT' | 'LATE' | 'ABSENT' | 'EXCUSED') => {
    setAttendance(prev => ({ ...prev, [studentId]: status }));
  };

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
              <p className="text-[11px] text-zinc-400">Korxona Mentori Portali</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 bg-zinc-50 border border-zinc-200/60 px-3 py-1.5 rounded-xl text-xs">
              <span className="font-semibold text-zinc-900">Sardor Bekmurodov</span>
              <span className="text-zinc-300">|</span>
              <span className="text-zinc-500 font-medium">Uzum Technologies MCHJ</span>
              <span className="text-zinc-300">|</span>
              <span className="text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded text-[10px] font-bold">BOSH MUHANDIS</span>
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
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'overview' ? 'bg-zinc-900 text-white shadow-sm' : 'text-zinc-600 hover:bg-zinc-50'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Boshqaruv paneli</span>
            </button>

            <button
              onClick={() => setActiveTab('students')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'students' ? 'bg-zinc-900 text-white shadow-sm' : 'text-zinc-600 hover:bg-zinc-50'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Amaliyotchilar (5)</span>
            </button>

            <button
              onClick={() => setActiveTab('attendance')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'attendance' ? 'bg-zinc-900 text-white shadow-sm' : 'text-zinc-600 hover:bg-zinc-50'
              }`}
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Kunlik Davomat</span>
            </button>

            <button
              onClick={() => setActiveTab('inbox')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'inbox' ? 'bg-zinc-900 text-white shadow-sm' : 'text-zinc-600 hover:bg-zinc-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="w-4 h-4" />
                <span>Kundaliklar Inbox</span>
              </div>
              {inboxLogs.length > 0 && (
                <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${activeTab === 'inbox' ? 'bg-white text-zinc-900' : 'bg-amber-100 text-amber-800'}`}>
                  {inboxLogs.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('grading')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'grading' ? 'bg-zinc-900 text-white shadow-sm' : 'text-zinc-600 hover:bg-zinc-50'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Yakuniy Baholash</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'settings' ? 'bg-zinc-900 text-white shadow-sm' : 'text-zinc-600 hover:bg-zinc-50'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Sozlamalar (Variant A)</span>
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

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-sm">
                  <span className="text-xs text-zinc-500">Jami Biriktirilgan Talabalar</span>
                  <p className="text-2xl font-bold text-zinc-900 mt-2">5 nafar</p>
                  <p className="text-[11px] text-zinc-400 mt-1">Uzum Technologies MCHJ</p>
                </div>

                <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-sm">
                  <span className="text-xs text-zinc-500">Kutilayotgan Kundaliklar</span>
                  <p className="text-2xl font-bold text-amber-600 mt-2">{inboxLogs.length} ta</p>
                  <button 
                    onClick={() => setActiveTab('inbox')}
                    className="text-[11px] text-zinc-900 underline font-semibold mt-1"
                  >
                    Tasdiqlashga o'tish &rarr;
                  </button>
                </div>

                <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-sm">
                  <span className="text-xs text-zinc-500">O'rtacha Davomat Ko'rsatkichi</span>
                  <p className="text-2xl font-bold text-emerald-600 mt-2">96.5%</p>
                  <p className="text-[11px] text-emerald-700 mt-1">A'lo darajada</p>
                </div>
              </div>

              {/* Quick Actions Card */}
              <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm">
                <h3 className="text-sm font-bold text-zinc-900 mb-2">Bugungi Amaliyot Harakatlari</h3>
                <p className="text-xs text-zinc-500 mb-4">Talabalar intizomini saqlash va hisobotlarni 1 ta tugma bilan tasdiqlash paneli</p>
                <div className="flex flex-wrap gap-3">
                  <button 
                    onClick={() => setActiveTab('attendance')}
                    className="px-4 py-2 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800 shadow-sm"
                  >
                    📅 Bugungi Davomatni Belgilash
                  </button>
                  <button 
                    onClick={() => setActiveTab('inbox')}
                    className="px-4 py-2 bg-white border border-zinc-200 text-zinc-700 rounded-xl text-xs font-medium hover:bg-zinc-50"
                  >
                    ✅ Yangi Kundaliklarni Tekshirish ({inboxLogs.length})
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: STUDENTS */}
          {activeTab === 'students' && (
            <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm font-bold text-zinc-900 mb-1">Biriktirilgan Amaliyotchi Talabalar</h3>
              <p className="text-xs text-zinc-500 mb-4">Korxonangizda faol amaliyot o'tayotgan talabalar ro'yxati</p>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-zinc-50 text-zinc-500 border-b border-zinc-200">
                    <tr>
                      <th className="py-2.5 px-3 font-medium">Talaba F.I.SH</th>
                      <th className="py-2.5 px-3 font-medium">Guruhi</th>
                      <th className="py-2.5 px-3 font-medium">Telefon</th>
                      <th className="py-2.5 px-3 font-medium">Muddati</th>
                      <th className="py-2.5 px-3 font-medium">Davomat</th>
                      <th className="py-2.5 px-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {[
                      { id: 'std_1', name: 'Sardor Rahimov', group: 'DI-202-22', phone: '+998 90 123 45 67', progress: '42 / 60 kun', rate: '98.5%', status: 'FAOL' },
                      { id: 'std_2', name: 'Madina Karimova', group: 'DI-202-22', phone: '+998 90 234 56 78', progress: '42 / 60 kun', rate: '95.0%', status: 'FAOL' },
                      { id: 'std_3', name: 'Javohir Toshmatov', group: 'DI-201-22', phone: '+998 90 345 67 89', progress: '40 / 60 kun', rate: '92.0%', status: 'FAOL' },
                      { id: 'std_4', name: 'Zarnigor Aliyeva', group: 'DI-201-22', phone: '+998 90 456 78 90', progress: '42 / 60 kun', rate: '100%', status: 'FAOL' },
                      { id: 'std_5', name: 'Bekzod Ergashev', group: 'DI-202-22', phone: '+998 90 567 89 01', progress: '38 / 60 kun', rate: '94.0%', status: 'FAOL' }
                    ].map((s) => (
                      <tr key={s.id} className="hover:bg-zinc-50/50">
                        <td className="py-3 px-3 font-semibold text-zinc-900">{s.name}</td>
                        <td className="py-3 px-3 font-mono text-zinc-500">{s.group}</td>
                        <td className="py-3 px-3 font-mono text-zinc-600">{s.phone}</td>
                        <td className="py-3 px-3 text-zinc-600">{s.progress}</td>
                        <td className="py-3 px-3 font-semibold text-emerald-700">{s.rate}</td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                            {s.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: ATTENDANCE */}
          {activeTab === 'attendance' && (
            <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-zinc-100 gap-2">
                <div>
                  <h3 className="text-sm font-bold text-zinc-900">Bugungi Kunlik Davomat Jurnali</h3>
                  <p className="text-xs text-zinc-500">Sana: {new Date().toISOString().split('T')[0]}</p>
                </div>
                <div className="flex items-center space-x-2 text-[11px] text-zinc-400">
                  <span>Bir martalik bosish bilan avtomatik saqlanadi</span>
                </div>
              </div>

              <div className="divide-y divide-zinc-100 mt-4">
                {[
                  { id: 'std_1', name: 'Sardor Rahimov', group: 'DI-202-22' },
                  { id: 'std_2', name: 'Madina Karimova', group: 'DI-202-22' },
                  { id: 'std_3', name: 'Javohir Toshmatov', group: 'DI-201-22' },
                  { id: 'std_4', name: 'Zarnigor Aliyeva', group: 'DI-201-22' },
                  { id: 'std_5', name: 'Bekzod Ergashev', group: 'DI-202-22' }
                ].map((st) => (
                  <div key={st.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="text-xs font-semibold text-zinc-900">{st.name}</h4>
                      <p className="text-[11px] text-zinc-400 font-mono">{st.group}</p>
                    </div>

                    <div className="flex items-center space-x-1.5">
                      <button
                        onClick={() => handleAttendanceChange(st.id, 'PRESENT')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                          attendance[st.id] === 'PRESENT'
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                            : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-zinc-100'
                        }`}
                      >
                        🟢 Kelgan (1.0x)
                      </button>

                      <button
                        onClick={() => handleAttendanceChange(st.id, 'LATE')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                          attendance[st.id] === 'LATE'
                            ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                            : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-zinc-100'
                        }`}
                      >
                        🟡 Kech kelgan (0.75x)
                      </button>

                      <button
                        onClick={() => handleAttendanceChange(st.id, 'ABSENT')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                          attendance[st.id] === 'ABSENT'
                            ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                            : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-zinc-100'
                        }`}
                      >
                        🔴 Kelmagan (0.0x)
                      </button>

                      <button
                        onClick={() => handleAttendanceChange(st.id, 'EXCUSED')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                          attendance[st.id] === 'EXCUSED'
                            ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                            : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-zinc-100'
                        }`}
                      >
                        🔵 Sababli (0.5x)
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: INBOX */}
          {activeTab === 'inbox' && (
            <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-4">
              <div>
                <h3 className="text-sm font-bold text-zinc-900">Kundaliklarni 1-Bosishda Tasdiqlash (Inbox)</h3>
                <p className="text-xs text-zinc-500">Talabalar yuborgan kunlik hisobotlar ro'yxati</p>
              </div>

              {inboxLogs.length === 0 ? (
                <div className="text-center py-12 text-zinc-400 text-xs">
                  Barcha kundaliklar tasdiqlangan! Kutilayotgan yangi hisobotlar yo'q.
                </div>
              ) : (
                <div className="space-y-4">
                  {inboxLogs.map((log) => (
                    <div key={log.id} className="p-4 rounded-xl border border-zinc-200/80 bg-zinc-50/50 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs font-bold text-zinc-900">{log.studentName}</span>
                          <span className="ml-2 text-[11px] text-zinc-400 font-mono">({log.group})</span>
                        </div>
                        <span className="text-[11px] text-zinc-500 font-mono">{log.date}</span>
                      </div>

                      <div className="space-y-1">
                        <p className="text-xs text-zinc-800"><strong>Bajarilgan ish:</strong> {log.tasks}</p>
                        <p className="text-[11px] text-zinc-500"><strong>Ko'nikmalar:</strong> {log.skills}</p>
                      </div>

                      <div className="flex items-center space-x-2 pt-2 border-t border-zinc-200/60">
                        <button
                          onClick={() => handleApproveLog(log.id)}
                          className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-medium hover:bg-emerald-700 shadow-sm"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>✓ Tasdiqlash (Approve)</span>
                        </button>
                        <button
                          onClick={() => handleRejectLog(log.id)}
                          className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 bg-white border border-rose-200 text-rose-600 rounded-xl text-xs font-medium hover:bg-rose-50"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>✕ Qaytarish (Reject)</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: GRADING */}
          {activeTab === 'grading' && (
            <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-6">
              <div>
                <h3 className="text-sm font-bold text-zinc-900">Korxona Yakuniy Baholashi (0 — 50 Ball)</h3>
                <p className="text-xs text-zinc-500 mt-0.5">Amaliyot yakunida talabaning bilim va mehnatiga qarab 5.0 shkalada baho qo'ying (tizim 50 ballga o'tkazadi):</p>
              </div>

              <div className="p-4 rounded-xl border border-zinc-200/80 bg-zinc-50/50 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-zinc-900">Sardor Rahimov</h4>
                    <p className="text-[11px] text-zinc-400 font-mono">DI-202-22 • 42/60 kun bajarildi</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                    Ball: 48 / 50 ball
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">
                    Baho (0 dan 5.0 gacha):
                  </label>
                  <input 
                    type="number"
                    step="0.1"
                    min="0"
                    max="5.0"
                    defaultValue={4.8}
                    className="w-32 text-xs p-2.5 rounded-xl border border-zinc-200 bg-white font-bold text-zinc-900"
                  />
                  <span className="ml-3 text-[11px] text-zinc-500">= 48.0 ball (Mentor qismi)</span>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">
                    Rasmiy Xarakteristika va Tavsiyanoma:
                  </label>
                  <textarea 
                    rows={3}
                    defaultValue="Talaba amaliyot davrida o'zini intizomli, tirishqoq muhandis sifatida ko'rsatdi. Texnik topshiriqlarni mustaqil bajardi. Kelgusida korxonamizda ishlashga tavsiya etamiz."
                    className="w-full text-xs p-3 rounded-xl border border-zinc-200 bg-white text-zinc-900"
                  />
                </div>

                <button 
                  onClick={() => {
                    setNotification('Baho va tavsiyanoma OTM bazasiga muvaffaqiyatli saqlandi!');
                    setTimeout(() => setNotification(null), 3000);
                  }}
                  className="px-5 py-2.5 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800 shadow-sm"
                >
                  Bahoni tasdiqlash va OTMga yuborish
                </button>
              </div>
            </div>
          )}

          {/* TAB 6: SETTINGS (Variant A) */}
          {activeTab === 'settings' && (
            <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-6">
              <div>
                <h3 className="text-sm font-bold text-zinc-900">Mentor Sozlamalari (Variant A)</h3>
                <p className="text-xs text-zinc-500 mt-0.5">Shaxsiy rekvizitlaringiz va Telegram bot orqali tezkor tasdiqlash sozlamalari</p>
              </div>

              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">Lavozimingiz</label>
                  <input 
                    type="text" 
                    defaultValue="Bosh muhandis / Yetakchi dasturchi"
                    className="w-full text-xs p-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">Aloqa Telefoni</label>
                  <input 
                    type="text" 
                    defaultValue="+998 90 999 11 22"
                    className="w-full text-xs p-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-900"
                  />
                </div>

                {/* Variant A Notification Mode */}
                <div className="p-4 rounded-xl border border-emerald-200/80 bg-emerald-50/30 space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-emerald-900">⚡ Variant A (Instant Real-Time) Rejimi Faol</span>
                  </div>
                  <p className="text-[11px] text-emerald-800 leading-relaxed">
                    Talaba har safar yangi kundalik topshirganida Telegramingizga darhol <strong>[✅ Tasdiqlash]</strong> va <strong>[❌ Qaytarish]</strong> tugmalari bilan xabar keladi. Bitta bosishda qabul qilasiz.
                  </p>
                </div>

                <div className="pt-2">
                  <a 
                    href="https://t.me/tiupm_bot" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-medium hover:bg-blue-700 shadow-sm"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>@tiupm_bot bilan bog'lanish</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
