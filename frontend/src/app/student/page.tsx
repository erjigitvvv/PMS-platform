'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Building2, 
  FileText, 
  CalendarCheck, 
  Award, 
  LogOut, 
  Plus, 
  Bell, 
  Clock, 
  Download, 
  Send,
  Upload,
  Settings,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Phone,
  Lock,
  ExternalLink,
  Briefcase,
  BookOpen,
  XCircle,
  FileCheck,
  LayoutDashboard
} from 'lucide-react';
import CollapsibleSidebar, { NavItem } from '@/components/CollapsibleSidebar';

const STUDENT_NAV_ITEMS: NavItem[] = [
  { id: 'overview', label: 'Bosh sahifa', icon: LayoutDashboard },
  { id: 'vacancies', label: "Amaliyot o'rni", icon: Briefcase },
  { id: 'logbook', label: 'Kundalik', icon: FileText, badge: 'Faol' },
  { id: 'docs', label: 'Hujjatlar & Shartnoma', icon: FileCheck },
  { id: 'grades', label: 'Davomat & Baholar', icon: Award },
  { id: 'settings', label: 'Sozlamalar', icon: Settings },
];

export default function StudentDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'vacancies' | 'logbook' | 'docs' | 'grades' | 'settings'>('overview');
  
  // Student State
  const [phone, setPhone] = useState('+998 90 555 55 55');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [settingsSuccess, setSettingsSuccess] = useState<string | null>(null);

  // New log form state
  const [newTasks, setNewTasks] = useState('');
  const [newSkills, setNewSkills] = useState('');
  const [notification, setNotification] = useState<string | null>(null);

  // Custom company state
  const [customCompany, setCustomCompany] = useState({ name: '', tin: '', director: '', phone: '' });
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  // Logbook history
  const [logs, setLogs] = useState([
    {
      id: '1',
      date: '2026-10-30',
      tasks: 'FastAPI arxitekturasi va relyatsion modellar bilan ishlash',
      skills: 'Python, SQLAlchemy, Git',
      status: 'APPROVED',
      feedback: 'Ajoyib natija, kod toza yozilgan.'
    },
    {
      id: '2',
      date: '2026-10-31',
      tasks: 'JWT autentifikatsiya va RBAC ruxsatlar matritsasi',
      skills: 'Security, JWT, Role Guards',
      status: 'APPROVED',
      feedback: 'Mentor tomonidan qabul qilindi'
    },
    {
      id: '3',
      date: '2026-11-01',
      tasks: 'WebSockets orqali jonli bildirishnomalar yuborish tizimini sozlash',
      skills: 'WebSockets, Async IO',
      status: 'PENDING',
      feedback: 'Tekshirilmoqda'
    }
  ]);

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTasks) return;
    const newEntry = {
      id: String(Date.now()),
      date: new Date().toISOString().split('T')[0],
      tasks: newTasks,
      skills: newSkills || 'Umumiy amaliy ko\'nikmalar',
      status: 'PENDING',
      feedback: 'Tekshirilmoqda'
    };
    setLogs([newEntry, ...logs]);
    setNewTasks('');
    setNewSkills('');
    setNotification('Bugungi kundalik muvaffaqiyatli mentorga yuborildi!');
    setTimeout(() => setNotification(null), 4000);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsSuccess('Sozlamalar (telefon va parol) muvaffaqiyatli yangilandi!');
    setOldPassword('');
    setNewPassword('');
    setTimeout(() => setSettingsSuccess(null), 3000);
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('pms_user');
    }
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col md:flex-row antialiased text-zinc-900">
      {/* Left Collapsible Animated Sidebar */}
      <CollapsibleSidebar
        role="STUDENT"
        roleTitle="Talaba Amaliyot Portali"
        userName="Bekzod Ergashev"
        userSub="DI-202-22 | Dasturiy injiniring"
        userBadge="ST501824"
        items={STUDENT_NAV_ITEMS}
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
            <span className="text-xs text-zinc-500 font-medium">Talaba Shaxsiy Kabineti</span>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-zinc-50 border border-zinc-200/60 px-3 py-1.5 rounded-xl text-xs">
              <span className="font-semibold text-zinc-900">Bekzod Ergashev</span>
              <span className="text-zinc-300">|</span>
              <span className="text-zinc-500 font-mono">DI-202-22</span>
              <span className="text-zinc-300">|</span>
              <span className="text-violet-700 bg-violet-50 px-2 py-0.5 rounded font-mono text-[10px] font-bold border border-violet-200/60">
                ST501824
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
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto space-y-6">
          {notification && (
            <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-4 flex items-center space-x-3 text-emerald-800 text-xs shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{notification}</span>
            </div>
          )}

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Main Internship Card */}
              <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-semibold tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full uppercase border border-emerald-200/60 inline-flex items-center space-x-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 inline mr-1" />
                      <span>Faol Amaliyot</span>
                    </span>
                    <h2 className="text-xl font-bold text-zinc-900 mt-2">Uzum Technologies MCHJ</h2>
                    <p className="text-xs text-zinc-500 mt-0.5">Junior Backend Developer amaliyotchi o'rni</p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('logbook')}
                    className="inline-flex items-center justify-center space-x-2 bg-zinc-900 text-white px-4 py-2.5 rounded-xl text-xs font-medium hover:bg-zinc-800 transition-all shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Bugungi kundalikni to'ldirish</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-zinc-100">
                  <div>
                    <span className="text-[11px] text-zinc-400">Korxona Mentori:</span>
                    <p className="text-xs font-semibold text-zinc-900 mt-0.5">Sardor Bekmurodov</p>
                    <p className="text-[11px] text-zinc-500 font-mono">+998 90 999 11 22</p>
                  </div>
                  <div>
                    <span className="text-[11px] text-zinc-400">OTM Ilmiy Rahbari:</span>
                    <p className="text-xs font-semibold text-zinc-900 mt-0.5">Dotsent Alisher Qodirov</p>
                    <p className="text-[11px] text-zinc-500">Dasturiy injiniring kafedrasi</p>
                  </div>
                  <div>
                    <span className="text-[11px] text-zinc-400">Amaliyot Muddati:</span>
                    <p className="text-xs font-semibold text-zinc-900 mt-0.5">2026-11-01 dan 2026-12-15 gacha</p>
                    <p className="text-[11px] text-emerald-600 font-medium">Qolgan vaqt: 44 kun</p>
                  </div>
                </div>
              </div>

              {/* Progress & Quick Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center justify-between text-zinc-400 mb-2">
                    <span className="text-xs font-medium">To'ldirilgan hisobotlar</span>
                    <FileText className="w-4 h-4" />
                  </div>
                  <p className="text-2xl font-bold text-zinc-900">3 / 45</p>
                  <p className="text-[11px] text-zinc-500 mt-1">Har kuni soat 18:00 gacha</p>
                </div>

                <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center justify-between text-zinc-400 mb-2">
                    <span className="text-xs font-medium">Davomat ko'rsatkichi</span>
                    <CalendarCheck className="w-4 h-4" />
                  </div>
                  <p className="text-2xl font-bold text-emerald-600">100%</p>
                  <p className="text-[11px] text-zinc-500 mt-1">1 kun Kech (0.75x hisobida)</p>
                </div>

                <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center justify-between text-zinc-400 mb-2">
                    <span className="text-xs font-medium">Shartnoma holati</span>
                    <Download className="w-4 h-4" />
                  </div>
                  <p className="text-sm font-bold text-zinc-900">AMAL-2026-0041</p>
                  <p className="text-[11px] text-emerald-600 mt-1">3 tomonlama tasdiqlangan</p>
                </div>

                <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center justify-between text-zinc-400 mb-2">
                    <span className="text-xs font-medium">Joriy ECTS Bahosi</span>
                    <Award className="w-4 h-4" />
                  </div>
                  <p className="text-2xl font-bold text-zinc-900">94 / 100</p>
                  <p className="text-[11px] text-zinc-500 mt-1">"A" (A'lo daraja)</p>
                </div>
              </div>

              {/* Recent Logs Table */}
              <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-zinc-900">So'nggi Kundalik Yozuvlari</h3>
                  <button 
                    onClick={() => setActiveTab('logbook')} 
                    className="text-xs text-zinc-500 hover:text-zinc-900 font-medium"
                  >
                    Barchasini ko'rish →
                  </button>
                </div>

                <div className="divide-y divide-zinc-100">
                  {logs.slice(0, 3).map((log) => (
                    <div key={log.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-mono font-semibold text-zinc-900">{log.date}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            log.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                          }`}>
                            {log.status === 'APPROVED' ? 'Tasdiqlangan' : 'Kutilmoqda'}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-600">{log.tasks}</p>
                      </div>
                      <span className="text-[11px] text-zinc-400 italic sm:text-right shrink-0">
                        {log.feedback}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: VACANCIES */}
          {activeTab === 'vacancies' && (
            <div className="space-y-6">
              <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-zinc-900">Hamkor Korxonalar Vakansiyalari</h3>
                  <p className="text-xs text-zinc-500 mt-1">OTM bilan 3 tomonlama rasmiy shartnomaga ega hamkor kompaniyalar</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Vacancy 1 */}
                  <div className="border border-zinc-200/80 rounded-2xl p-5 hover:border-zinc-300 transition-all space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                          Hamkor Korxona
                        </span>
                        <h4 className="text-sm font-bold text-zinc-900 mt-2">Junior Backend Developer</h4>
                        <p className="text-xs text-zinc-600 font-medium">Uzum Technologies MCHJ</p>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-center font-bold text-zinc-700 text-xs">
                        UZUM
                      </div>
                    </div>
                    <p className="text-xs text-zinc-500">Python, FastAPI, PostgreSQL va Git bilan ishlash ko'nikmalari talab qilinadi.</p>
                    <div className="flex items-center justify-between pt-2 border-t border-zinc-100 text-xs">
                      <span className="text-zinc-400 font-mono">Kvota: 3 / 5 o'rin</span>
                      <span className="text-emerald-700 font-semibold">Ariza qabul qilingan</span>
                    </div>
                  </div>

                  {/* Vacancy 2 */}
                  <div className="border border-zinc-200/80 rounded-2xl p-5 hover:border-zinc-300 transition-all space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                          Hamkor Korxona
                        </span>
                        <h4 className="text-sm font-bold text-zinc-900 mt-2">Frontend Developer intern</h4>
                        <p className="text-xs text-zinc-600 font-medium">IT Park Uzbekistan</p>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-center font-bold text-zinc-700 text-xs">
                        ITP
                      </div>
                    </div>
                    <p className="text-xs text-zinc-500">React, Next.js, Tailwind CSS va zamonaviy veb texnologiyalari.</p>
                    <div className="flex items-center justify-between pt-2 border-t border-zinc-100 text-xs">
                      <span className="text-zinc-400 font-mono">Kvota: 5 / 8 o'rin</span>
                      <button className="text-zinc-900 font-medium hover:underline">Ariza topshirish →</button>
                    </div>
                  </div>
                </div>

                {/* Custom Company Option */}
                <div className="pt-6 border-t border-zinc-100">
                  <h4 className="text-xs font-bold text-zinc-900 mb-1">O'z Korxonangizni Kiritish (Individual tanlov)</h4>
                  <p className="text-xs text-zinc-500 mb-4">Agar boshqa kompaniyada amaliyot o'tamoqchi bo'lsangiz, rekvizitlarini kiriting:</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
                    <input 
                      type="text" 
                      placeholder="Korxona to'liq nomi" 
                      value={customCompany.name}
                      onChange={(e) => setCustomCompany({ ...customCompany, name: e.target.value })}
                      className="px-3.5 py-2 text-xs rounded-xl border border-zinc-200 bg-white"
                    />
                    <input 
                      type="text" 
                      placeholder="STIR / INN (9 xonali)" 
                      value={customCompany.tin}
                      onChange={(e) => setCustomCompany({ ...customCompany, tin: e.target.value })}
                      className="px-3.5 py-2 text-xs rounded-xl border border-zinc-200 bg-white font-mono"
                    />
                    <input 
                      type="text" 
                      placeholder="Rahbar F.I.SH" 
                      value={customCompany.director}
                      onChange={(e) => setCustomCompany({ ...customCompany, director: e.target.value })}
                      className="px-3.5 py-2 text-xs rounded-xl border border-zinc-200 bg-white"
                    />
                    <input 
                      type="text" 
                      placeholder="Telefon raqami" 
                      value={customCompany.phone}
                      onChange={(e) => setCustomCompany({ ...customCompany, phone: e.target.value })}
                      className="px-3.5 py-2 text-xs rounded-xl border border-zinc-200 bg-white"
                    />
                  </div>
                  <button 
                    onClick={() => {
                      setApplicationSubmitted(true);
                      setTimeout(() => setApplicationSubmitted(false), 4000);
                    }}
                    className="mt-3 px-4 py-2 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800 transition-all shadow-sm"
                  >
                    Dekanatga Tasdiqlash Uchun Yuborish
                  </button>

                  {applicationSubmitted && (
                    <p className="text-xs text-emerald-600 mt-2 font-medium flex items-center">
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                      <span>Individual korxona arizasi dekanatga yuborildi!</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: LOGBOOK */}
          {activeTab === 'logbook' && (
            <div className="space-y-6">
              {/* Daily Log Form */}
              <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-zinc-900">Bugungi Amaliyot Kundaligini To'ldirish</h3>
                    <p className="text-xs text-zinc-500 mt-0.5">Sana: {new Date().toISOString().split('T')[0]} | Topshirish vaqti: 18:00 gacha</p>
                  </div>
                  <span className="text-[11px] font-mono bg-zinc-100 text-zinc-600 px-2.5 py-1 rounded-lg">
                    Kunlik hisobot
                  </span>
                </div>

                <form onSubmit={handleAddLog} className="space-y-4 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                      Bugun bajarilgan amaliy ishlar va vazifalar:
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={newTasks}
                      onChange={(e) => setNewTasks(e.target.value)}
                      placeholder="Bugun korxonada qanday topshiriqlar ustida ishladingiz? Aniq va batafsil yozing..."
                      className="w-full p-3 text-xs rounded-xl border border-zinc-200 bg-white placeholder-zinc-400 focus:outline-none focus:border-zinc-900 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                      O'rganilgan yangi texnologiyalar va ko'nikmalar:
                    </label>
                    <input
                      type="text"
                      value={newSkills}
                      onChange={(e) => setNewSkills(e.target.value)}
                      placeholder="Masalan: Docker, FastAPI Middleware, Git rebase"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-zinc-200 bg-white placeholder-zinc-400 focus:outline-none focus:border-zinc-900 transition-all"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-2 text-zinc-400 text-xs">
                      <Upload className="w-4 h-4" />
                      <span>Ixtiyoriy: Skrinshot yoki foto-isbot biriktirish</span>
                    </div>

                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800 transition-all shadow-sm flex items-center space-x-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Mentorga Tasdiqlashga Yuborish</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Log History */}
              <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-zinc-900">O'tgan Kunlar Tarixi</h3>

                <div className="space-y-3">
                  {logs.map((log) => (
                    <div key={log.id} className="p-4 rounded-xl border border-zinc-200/70 bg-zinc-50/50 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-mono font-bold text-zinc-900">{log.date}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            log.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                          }`}>
                            {log.status === 'APPROVED' ? 'Tasdiqlangan' : 'Tekshiruvda'}
                          </span>
                        </div>
                        <span className="text-[11px] text-zinc-400 font-mono">ID: #{log.id}</span>
                      </div>

                      <p className="text-xs text-zinc-700">{log.tasks}</p>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2 border-t border-zinc-200/60 text-[11px] text-zinc-500 gap-1">
                        <span>Ko'nikmalar: <strong className="text-zinc-700">{log.skills}</strong></span>
                        <span className="italic text-zinc-400">Izoh: {log.feedback}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: DOCS & CONTRACT */}
          {activeTab === 'docs' && (
            <div className="space-y-6">
              <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-zinc-900">Rasmiy Hujjatlar va 3 Tomonlama Shartnoma</h3>
                  <p className="text-xs text-zinc-500 mt-1">OTM, Korxona va Talaba o'rtasida tasdiqlangan yuridik shartnoma</p>
                </div>

                {/* Contract Card */}
                <div className="border border-zinc-200/80 rounded-2xl p-5 bg-zinc-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                      Raqam: AMAL-2026-0041
                    </span>
                    <h4 className="text-sm font-bold text-zinc-900 mt-1">Uch Tomonlama Amaliyot Shartnomasi</h4>
                    <p className="text-xs text-zinc-500">TIU Universiteti — Uzum Technologies MCHJ — Bekzod Ergashev</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        setNotification('Rasmiy shartnoma (PDF) muvaffaqiyatli yuklab olindi!');
                        setTimeout(() => setNotification(null), 3000);
                      }}
                      className="inline-flex items-center space-x-2 bg-zinc-900 text-white px-3.5 py-2 rounded-xl text-xs font-medium hover:bg-zinc-800 transition-all shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>PDF Yuklab Olish</span>
                    </button>
                    <button
                      onClick={() => {
                        setNotification('Rasmiy shartnoma (Word) muvaffaqiyatli yuklab olindi!');
                        setTimeout(() => setNotification(null), 3000);
                      }}
                      className="inline-flex items-center space-x-2 bg-white border border-zinc-200 text-zinc-700 px-3.5 py-2 rounded-xl text-xs font-medium hover:bg-zinc-50 transition-all shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>DOCX (Word)</span>
                    </button>
                  </div>
                </div>

                {/* Referral Document Card (Sprint 1 Student Access) */}
                <div className="border border-indigo-200/80 rounded-2xl p-5 bg-indigo-50/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200/60">
                      YO'LLANMA XATI № YX-2026-041
                    </span>
                    <h4 className="text-sm font-bold text-zinc-900 mt-1">Rasmiy Amaliyot Yo'llanma Xati</h4>
                    <p className="text-xs text-zinc-500">Korxonaga taqdim etish uchun imzolangan va muhrlangan yo'llanma xati</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        setNotification('Rasmiy yo\'llanma xati (PDF) yuklab olindi!');
                        setTimeout(() => setNotification(null), 3000);
                      }}
                      className="inline-flex items-center space-x-2 bg-indigo-600 text-white px-3.5 py-2 rounded-xl text-xs font-medium hover:bg-indigo-700 transition-all shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Yo'llanmani Yuklab Olish (PDF)</span>
                    </button>
                  </div>
                </div>

                {/* Document Requirements Checklist */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold text-zinc-900">Talab Qilinadigan Yakuniy Hujjatlar:</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center space-x-2 text-zinc-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>3 tomonlama shartnoma (Imzolangan va PDF shaklda)</span>
                    </div>
                    <div className="flex items-center space-x-2 text-zinc-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Elektron amaliyot kundaligi (45 kunlik to'liq yozuvlar)</span>
                    </div>
                    <div className="flex items-center space-x-2 text-zinc-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Korxona mentorining tavsifnomasi va 0-5 ballik bahosi</span>
                    </div>
                    <div className="flex items-center space-x-2 text-zinc-500">
                      <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>Yakuniy amaliyot hisoboti va kafedradagi himoya (Amaliyot so'ngida)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: GRADES */}
          {activeTab === 'grades' && (
            <div className="space-y-6">
              <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-6">
                <h3 className="text-sm font-bold text-zinc-900">100 Ballik Baholash va Davomat Natijalari</h3>

                {/* Score Big Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl border border-zinc-200/60 bg-zinc-50/50">
                    <span className="text-xs text-zinc-500 flex items-center space-x-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Korxona Mentori Bahosi:</span>
                    </span>
                    <p className="text-2xl font-bold text-zinc-900 mt-2">48 / 50</p>
                    <p className="text-[11px] text-zinc-500 mt-1">Baho: 4.8 / 5.0 (A'lo)</p>
                  </div>

                  <div className="p-4 rounded-xl border border-zinc-200/60 bg-zinc-50/50">
                    <span className="text-xs text-zinc-500 flex items-center space-x-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-zinc-400" />
                      <span>OTM Kafedra Bahosi:</span>
                    </span>
                    <p className="text-2xl font-bold text-zinc-900 mt-2">46 / 50</p>
                    <p className="text-[11px] text-zinc-500 mt-1">Himoya komissiyasi xulosasi</p>
                  </div>

                  <div className="p-4 rounded-xl border border-emerald-200/80 bg-emerald-50/40">
                    <span className="text-xs text-emerald-800 font-semibold flex items-center space-x-1.5">
                      <Award className="w-3.5 h-3.5 text-emerald-600" />
                      <span>JAMI NATIJA (ECTS):</span>
                    </span>
                    <p className="text-2xl font-bold text-emerald-900 mt-2">94 / 100 ball</p>
                    <p className="text-xs font-bold text-emerald-700 mt-1">"A" (A'lo daraja)</p>
                  </div>
                </div>

                {/* Attendance Breakdown (Pure Vector Icons) */}
                <div className="pt-4 border-t border-zinc-100">
                  <h4 className="text-xs font-bold text-zinc-900 mb-3">Davomat Taqvimi</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200/60">
                      <p className="text-lg font-bold text-emerald-800">41 kun</p>
                      <div className="flex items-center justify-center space-x-1 text-[11px] text-emerald-600 font-medium mt-0.5">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Kelgan (1.0x)</span>
                      </div>
                    </div>
                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/60">
                      <p className="text-lg font-bold text-amber-800">1 kun</p>
                      <div className="flex items-center justify-center space-x-1 text-[11px] text-amber-600 font-medium mt-0.5">
                        <Clock className="w-3 h-3" />
                        <span>Kech kelgan (0.75x)</span>
                      </div>
                    </div>
                    <div className="p-3 bg-rose-50 rounded-xl border border-rose-200/60">
                      <p className="text-lg font-bold text-rose-800">0 kun</p>
                      <div className="flex items-center justify-center space-x-1 text-[11px] text-rose-600 font-medium mt-0.5">
                        <XCircle className="w-3 h-3" />
                        <span>Kelmagan (0.0x)</span>
                      </div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-xl border border-blue-200/60">
                      <p className="text-lg font-bold text-blue-800">0 kun</p>
                      <div className="flex items-center justify-center space-x-1 text-[11px] text-blue-600 font-medium mt-0.5">
                        <HelpCircle className="w-3 h-3" />
                        <span>Sababli (0.5x)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-zinc-900">Shaxsiy Profil va Xavfsizlik Sozlamalari</h3>
                  <p className="text-xs text-zinc-500 mt-1">Aloqa ma'lumotlari va tizimga kirish parolini yangilash</p>
                </div>

                {settingsSuccess && (
                  <div className="bg-emerald-50 border border-emerald-200/80 rounded-xl p-3 flex items-center space-x-2 text-emerald-800 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{settingsSuccess}</span>
                  </div>
                )}

                <form onSubmit={handleSaveSettings} className="space-y-4 max-w-lg">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">
                      F.I.SH (O'zgartirib bo'lmaydi):
                    </label>
                    <input
                      type="text"
                      disabled
                      value="Bekzod Ergashev"
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-zinc-200 bg-zinc-100 text-zinc-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">
                      Talaba ID Raqami:
                    </label>
                    <input
                      type="text"
                      disabled
                      value="ST501824"
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-zinc-200 bg-zinc-100 text-zinc-500 font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">
                      Bog'lanish telefoni:
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-zinc-200 bg-white text-zinc-900"
                      />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-zinc-100 space-y-3">
                    <h4 className="text-xs font-bold text-zinc-900">Parolni Yangilash</h4>
                    <div>
                      <input
                        type="password"
                        placeholder="Eski parol"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-zinc-200 bg-white text-zinc-900"
                      />
                    </div>
                    <div>
                      <input
                        type="password"
                        placeholder="Yangi parol"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-zinc-200 bg-white text-zinc-900"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800 transition-all shadow-sm"
                  >
                    O'zgarishlarni Saqlash
                  </button>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
