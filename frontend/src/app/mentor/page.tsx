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
  Filter,
  LayoutDashboard,
  FileText,
  XCircle,
  HelpCircle,
  Zap,
  Briefcase
} from 'lucide-react';
import CollapsibleSidebar, { NavItem } from '@/components/CollapsibleSidebar';

const MENTOR_NAV_ITEMS: NavItem[] = [
  { id: 'overview', label: 'Boshqaruv paneli', icon: LayoutDashboard },
  { id: 'students', label: 'Amaliyotchilar', icon: Users, badge: '5' },
  { id: 'attendance', label: 'Kunlik davomat', icon: CalendarCheck },
  { id: 'inbox', label: 'Kundaliklar Inbox', icon: FileText, badge: '3 yangi' },
  { id: 'grading', label: 'Yakuniy baholash', icon: Award },
  { id: 'settings', label: 'Sozlamalar & Bot', icon: Settings },
];

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

  const currentNavItems = MENTOR_NAV_ITEMS.map(item => {
    if (item.id === 'inbox') {
      return { ...item, badge: inboxLogs.length > 0 ? `${inboxLogs.length} yangi` : undefined };
    }
    return item;
  });

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col md:flex-row antialiased text-zinc-900">
      {/* Left Collapsible Animated Sidebar */}
      <CollapsibleSidebar
        role="MENTOR"
        roleTitle="Korxona Mentori Portali"
        userName="Sardor Bekmurodov"
        userSub="Uzum Technologies | Bosh muhandis"
        userBadge="MN408193"
        items={currentNavItems}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top Header */}
        <header className="bg-white border-b border-zinc-200/80 px-6 py-3.5 hidden md:flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center space-x-3">
            <h1 className="text-sm font-bold text-zinc-900">Tashkent International University</h1>
            <span className="text-zinc-300">/</span>
            <span className="text-xs text-zinc-500 font-medium">Korxona Mentori Portali</span>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-zinc-50 border border-zinc-200/60 px-3 py-1.5 rounded-xl text-xs">
              <span className="font-semibold text-zinc-900">Sardor Bekmurodov</span>
              <span className="text-zinc-300">|</span>
              <span className="text-zinc-500 font-medium">Uzum Technologies</span>
              <span className="text-zinc-300">|</span>
              <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-mono text-[10px] font-bold border border-emerald-200/60">
                MN408193
              </span>
            </div>

            <button 
              onClick={handleLogout}
              className="flex items-center space-x-1.5 text-xs text-zinc-500 hover:text-rose-600 transition-colors bg-zinc-100 hover:bg-rose-50 px-3 py-1.5 rounded-xl border border-zinc-200/60"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Chiqish</span>
            </button>
          </div>
        </header>

        {/* Content Body */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto space-y-6">
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
                      className="text-[11px] text-zinc-900 font-semibold underline mt-1 block"
                    >
                      Kundaliklar Inboxga o'tish
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
                      className="inline-flex items-center space-x-2 px-4 py-2 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800 shadow-sm"
                    >
                      <CalendarCheck className="w-3.5 h-3.5" />
                      <span>Bugungi Davomatni Belgilash</span>
                    </button>
                    <button 
                      onClick={() => setActiveTab('inbox')}
                      className="inline-flex items-center space-x-2 px-4 py-2 bg-white border border-zinc-200 text-zinc-700 rounded-xl text-xs font-medium hover:bg-zinc-50"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-zinc-500" />
                      <span>Yangi Kundaliklarni Tekshirish ({inboxLogs.length})</span>
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

                      <div className="flex items-center space-x-1.5 flex-wrap gap-y-1.5">
                        <button
                          onClick={() => handleAttendanceChange(st.id, 'PRESENT')}
                          className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                            attendance[st.id] === 'PRESENT'
                              ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                              : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-zinc-100'
                          }`}
                        >
                          <CheckCircle2 className={`w-3.5 h-3.5 ${attendance[st.id] === 'PRESENT' ? 'text-white' : 'text-emerald-500'}`} />
                          <span>Kelgan (1.0x)</span>
                        </button>

                        <button
                          onClick={() => handleAttendanceChange(st.id, 'LATE')}
                          className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                            attendance[st.id] === 'LATE'
                              ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                              : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-zinc-100'
                          }`}
                        >
                          <Clock className={`w-3.5 h-3.5 ${attendance[st.id] === 'LATE' ? 'text-white' : 'text-amber-500'}`} />
                          <span>Kech kelgan (0.75x)</span>
                        </button>

                        <button
                          onClick={() => handleAttendanceChange(st.id, 'ABSENT')}
                          className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                            attendance[st.id] === 'ABSENT'
                              ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                              : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-zinc-100'
                          }`}
                        >
                          <XCircle className={`w-3.5 h-3.5 ${attendance[st.id] === 'ABSENT' ? 'text-white' : 'text-rose-500'}`} />
                          <span>Kelmagan (0.0x)</span>
                        </button>

                        <button
                          onClick={() => handleAttendanceChange(st.id, 'EXCUSED')}
                          className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                            attendance[st.id] === 'EXCUSED'
                              ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                              : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-zinc-100'
                          }`}
                        >
                          <HelpCircle className={`w-3.5 h-3.5 ${attendance[st.id] === 'EXCUSED' ? 'text-white' : 'text-blue-500'}`} />
                          <span>Sababli (0.5x)</span>
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
                  <div className="p-8 text-center text-zinc-400 bg-zinc-50 rounded-2xl border border-dashed border-zinc-200">
                    <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-500 mb-2" />
                    <p className="text-xs font-medium text-zinc-700">Hamma kundaliklar tekshirib bo'lindi!</p>
                    <p className="text-[11px] text-zinc-400 mt-0.5">Yangi hisobotlar kelganda bu yerda paydo bo'ladi.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {inboxLogs.map((log) => (
                      <div key={log.id} className="p-4 rounded-xl border border-zinc-200/80 bg-zinc-50/50 space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-bold text-zinc-900">{log.studentName}</span>
                            <span className="text-[11px] text-zinc-400 font-mono">({log.group})</span>
                          </div>
                          <span className="text-[11px] text-zinc-500 font-mono">Topshirilgan sana: {log.date}</span>
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
                            <span>Tasdiqlash (Approve)</span>
                          </button>
                          <button
                            onClick={() => handleRejectLog(log.id)}
                            className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 bg-white border border-rose-200 text-rose-600 rounded-xl text-xs font-medium hover:bg-rose-50"
                          >
                            <X className="w-3.5 h-3.5" />
                            <span>Qaytarish (Reject)</span>
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
                      <p className="text-[11px] text-zinc-500">DI-202-22 | Uzum Technologies MCHJ</p>
                    </div>
                    <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded-lg border border-blue-200">
                      Baho: 48.0 / 50 ball (96%)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-zinc-700 mb-1">Baho (0.0 dan 5.0 gacha)</label>
                      <input 
                        type="number" 
                        min="0" 
                        max="5.0" 
                        step="0.1" 
                        defaultValue="4.8"
                        className="w-full text-xs p-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-700 mb-1">Mentorning yozma tavsifi</label>
                      <input 
                        type="text" 
                        defaultValue="Juda tirishqoq, texnik topshiriqlarni mustaqil va o'z vaqtida topshirdi."
                        className="w-full text-xs p-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-900"
                      />
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      setNotification('Sardor Rahimov uchun 48 balllik mentor bahosi dekanat va kafedraga yuborildi!');
                      setTimeout(() => setNotification(null), 3500);
                    }}
                    className="px-4 py-2 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800 shadow-sm"
                  >
                    Yakuniy Bahoni Saqlash va Tasdiqlash
                  </button>
                </div>
              </div>
            )}

            {/* TAB 6: SETTINGS */}
            {activeTab === 'settings' && (
              <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-zinc-900">Mentor Profili va Bildirishnomalar</h3>
                  <p className="text-xs text-zinc-500">Telegram bot orqali tezkor hisobotlarni tasdiqlash sozlamalari</p>
                </div>

                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-xs font-medium text-zinc-700 mb-1">F.I.SH</label>
                    <input 
                      type="text" 
                      defaultValue="Sardor Bekmurodov" 
                      className="w-full text-xs p-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-700 mb-1">Korxona Nomi</label>
                    <input 
                      type="text" 
                      defaultValue="Uzum Technologies MCHJ" 
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
                      <Zap className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="text-xs font-bold text-emerald-900">Variant A (Instant Real-Time) Rejimi Faol</span>
                    </div>
                    <p className="text-[11px] text-emerald-800 leading-relaxed">
                      Talaba har safar yangi kundalik topshirganida Telegramingizga darhol <strong>[Tasdiqlash]</strong> va <strong>[Qaytarish]</strong> tugmalari bilan xabar keladi. Bitta bosishda qabul qilasiz.
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
    </div>
  );
}
