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
  LayoutDashboard,
  MapPin
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
  const [customCompany, setCustomCompany] = useState({ 
    name: '', 
    tin: '', 
    director: '', 
    phone: '', 
    address: '', 
    reason: '', 
    isOfficeConfirmed: false 
  });
  const [selectedPartnerCompany, setSelectedPartnerCompany] = useState<any | null>(null);
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

          {/* TAB 2: VACANCIES & 3D FOLDER POCKET CATALOG */}
          {activeTab === "vacancies" && (
            <div className="space-y-6">
              <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-zinc-100 gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-zinc-900">Hamkor Tashkilotlar 3D Katalogi</h3>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      OTM bilan 3 tomonlama rasmiy shartnomaga ega kompaniyalar • Qat'iy talab: 🏢 Faqat ofisda (masofaviy taqiqlanadi)
                    </p>
                  </div>
                  <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-xl border border-purple-200">
                    3D Folder Pocket
                  </span>
                </div>

                {/* 3D Folder Pocket Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {[
                    {
                      id: "uzum",
                      name: "Uzum Technologies MCHJ",
                      category: "Fintech & E-Commerce",
                      address: "Toshkent sh., Yashnobod t., Farg'ona yo'li 12",
                      quota: 5,
                      occupied: 3,
                      tin: "309876541",
                      director: "Jasur Boboyev",
                      phone: "+998 78 777 07 07",
                      desc: "Python, FastAPI, React va zamonaviy servislar bilan ishlash.",
                      logoText: "UZUM",
                      bg: "bg-purple-600",
                      badge: "Bo'sh 2 ta o'rin"
                    },
                    {
                      id: "itpark",
                      name: "IT Park Uzbekistan",
                      category: "IT Hub & Incubator",
                      address: "Toshkent sh., Mirzo Ulug'bek t., Tepamasjid 4",
                      quota: 8,
                      occupied: 5,
                      tin: "306541289",
                      director: "Farhod Ibragimov",
                      phone: "+998 71 209 11 99",
                      desc: "Full-stack loyihalar, Startap inkubatsiya va Web dasturlash.",
                      logoText: "ITP",
                      bg: "bg-indigo-600",
                      badge: "Bo'sh 3 ta o'rin"
                    },
                    {
                      id: "click",
                      name: "Click MCHJ",
                      category: "To'lov Tizimi",
                      address: "Toshkent sh., Shayxontohur t., Navoiy 18",
                      quota: 4,
                      occupied: 2,
                      tin: "302345890",
                      director: "Ulug'bek Rustamov",
                      phone: "+998 71 231 08 80",
                      desc: "Mikroservislar arxitekturasi, yuqori yuklamali to'lov modullari.",
                      logoText: "CLICK",
                      bg: "bg-blue-600",
                      badge: "Bo'sh 2 ta o'rin"
                    }
                  ].map((comp) => (
                    <div
                      key={comp.id}
                      onClick={() => setSelectedPartnerCompany(comp)}
                      className="relative h-52 rounded-3xl overflow-hidden cursor-pointer group shadow-md hover:shadow-xl
                                 bg-gradient-to-br from-purple-700 via-indigo-700 to-indigo-900 transition-all duration-300
                                 hover:-translate-y-1 folder-pocket border border-purple-500/30 flex flex-col justify-between p-5"
                    >
                      {/* Top section: Logo, Name, Badges */}
                      <div className="z-10 space-y-2">
                        <div className="flex items-start justify-between">
                          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md text-white font-extrabold flex items-center justify-center text-xs shadow-md border border-white/30">
                            {comp.logoText}
                          </div>
                          <span className="px-2.5 py-0.5 bg-emerald-400 text-emerald-950 font-bold text-[10px] rounded-full shadow-xs">
                            {comp.badge}
                          </span>
                        </div>

                        <div>
                          <h4 className="text-sm font-bold text-white tracking-tight group-hover:text-purple-100 transition-colors">
                            {comp.name}
                          </h4>
                          <p className="text-[11px] text-purple-200 mt-0.5">{comp.category}</p>
                        </div>
                      </div>

                      {/* Middle: Office-Only Badge */}
                      <div className="z-10 flex items-center justify-between text-[11px] text-white/90 pt-1">
                        <span className="inline-flex items-center space-x-1 bg-white/15 px-2 py-0.5 rounded-lg border border-white/20">
                          <span>🏢 Faqat Ofisda</span>
                        </span>
                        <span className="font-mono text-xs font-semibold">
                          {comp.occupied}/{comp.quota} kvota
                        </span>
                      </div>

                      {/* White Pocket Overlay Effect (Folder Pocket) */}
                      <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xs rounded-t-2xl p-4 pt-3.5 shadow-lg border-t border-purple-200/60 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        <div className="flex items-center text-[10px] text-zinc-500 space-x-1 truncate">
                          <MapPin className="w-3 h-3 text-purple-600 shrink-0" />
                          <span className="truncate">{comp.address}</span>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-[10px] font-bold text-purple-700">Tafsilot &amp; Ariza</span>
                          <span className="text-xs text-zinc-400 group-hover:text-zinc-900 group-hover:translate-x-1 transition-all">&rarr;</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Custom Company Option with Personal Justification & In-Office Commitment */}
                <div className="pt-6 border-t border-zinc-100 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
                        O'z Korxonangizni Kiritish (Individual tanlov arizasi)
                      </h4>
                      <p className="text-xs text-zinc-500 mt-0.5">
                        Agar ro'yxatda bo'lmagan mustaqil korxonada amaliyot o'tamoqchi bo'lsangiz, rekvizitlar va asoslantirilgan izoh bilan Dekanatga ariza yuboring.
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 text-[10px] font-bold border border-amber-200">
                      Dekanat Tasdig'i Talab Etiladi
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-zinc-50/70 border border-zinc-200">
                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-700 mb-1">Korxona To'liq Nomi:</label>
                      <input 
                        type="text" 
                        placeholder="Masalan: 'Techno Soft Solutions' MCHJ" 
                        value={customCompany.name}
                        onChange={(e) => setCustomCompany({ ...customCompany, name: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-zinc-200 bg-white focus:outline-none focus:border-zinc-900"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-700 mb-1">STIR / INN (9 xonali raqam):</label>
                      <input 
                        type="text" 
                        placeholder="301234567" 
                        value={customCompany.tin}
                        onChange={(e) => setCustomCompany({ ...customCompany, tin: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-zinc-200 bg-white font-mono focus:outline-none focus:border-zinc-900"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-700 mb-1">Korxona Rahbari F.I.SH:</label>
                      <input 
                        type="text" 
                        placeholder="Masalan: Alimov Sardor Karimovich" 
                        value={customCompany.director}
                        onChange={(e) => setCustomCompany({ ...customCompany, director: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-zinc-200 bg-white focus:outline-none focus:border-zinc-900"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-700 mb-1">Korxona / Rahbar Telefon Raqami:</label>
                      <input 
                        type="text" 
                        placeholder="+998 90 123 45 67" 
                        value={customCompany.phone}
                        onChange={(e) => setCustomCompany({ ...customCompany, phone: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-zinc-200 bg-white focus:outline-none focus:border-zinc-900"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-zinc-700 mb-1">Korxona Yuridik Manzili:</label>
                      <input 
                        type="text" 
                        placeholder="Toshkent sh., Yunusobod t., Amir Temur ko'chasi 45-uy" 
                        value={customCompany.address}
                        onChange={(e) => setCustomCompany({ ...customCompany, address: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-zinc-200 bg-white focus:outline-none focus:border-zinc-900"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-zinc-700 mb-1">
                        Nima uchun ushbu korxona tanlandi va qanday amaliyot o'tamoqchisiz? (Asoslantirilgan izoh):
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Ushbu kompaniyada qanday vazifalar bajarmoqchisiz va bu sizning mutaxassisligingizga qanday mos keladi?..."
                        value={customCompany.reason}
                        onChange={(e) => setCustomCompany({ ...customCompany, reason: e.target.value })}
                        className="w-full p-3 text-xs rounded-xl border border-zinc-200 bg-white placeholder-zinc-400 focus:outline-none focus:border-zinc-900"
                      />
                    </div>

                    <div className="sm:col-span-2 pt-1">
                      <label className="flex items-start space-x-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={customCompany.isOfficeConfirmed}
                          onChange={(e) => setCustomCompany({ ...customCompany, isOfficeConfirmed: e.target.checked })}
                          className="mt-0.5 rounded border-zinc-300 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="text-xs text-zinc-700">
                          <b>Qat'iy Talab:</b> Amaliyot masofaviy (online) emas, haftasiga 5 kun korxona ofisida bevosita o'talishini tasdiqlayman.
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => {
                        if (!customCompany.name.trim() || !customCompany.tin.trim() || !customCompany.reason.trim()) {
                          setNotification("⚠️ Iltimos, korxona nomi, STIR va asoslantirilgan izohni to'liq kiriting!");
                          setTimeout(() => setNotification(null), 3500);
                          return;
                        }
                        if (!customCompany.isOfficeConfirmed) {
                          setNotification("⚠️ Amaliyot faqat ofisda o'talishi shartiga rozilik bildirishingiz kerak!");
                          setTimeout(() => setNotification(null), 3500);
                          return;
                        }
                        setApplicationSubmitted(true);
                        setNotification("Individual korxona arizasi dekanat ko'rib chiqishi uchun muvaffaqiyatli yuborildi!");
                        setTimeout(() => {
                          setApplicationSubmitted(false);
                          setNotification(null);
                        }, 5000);
                      }}
                      className="px-5 py-2.5 bg-zinc-900 text-white rounded-xl text-xs font-semibold hover:bg-zinc-800 transition-all shadow-sm"
                    >
                      Dekanatga Tasdiqlash Uchun Yuborish
                    </button>

                    {applicationSubmitted && (
                      <span className="text-xs text-emerald-700 font-semibold flex items-center bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                        <span>Ariza dekanatga yuborildi (Kutilmoqda)</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Modal for viewing partner company details */}
          {selectedPartnerCompany && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
              <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl">
                <div className="h-2 w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600" />
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-[10px] font-bold">
                        {selectedPartnerCompany.category}
                      </span>
                      <h3 className="text-base font-bold text-zinc-900 mt-1">{selectedPartnerCompany.name}</h3>
                      <p className="text-xs text-zinc-500 flex items-center mt-0.5">
                        <MapPin className="w-3 h-3 mr-1 text-zinc-400" />
                        <span>{selectedPartnerCompany.address}</span>
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedPartnerCompany(null)}
                      className="p-1.5 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-xl"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/70 text-xs space-y-2">
                    <p className="text-zinc-700">{selectedPartnerCompany.desc}</p>
                    <div className="pt-2 border-t border-zinc-200 grid grid-cols-2 gap-2 text-zinc-600">
                      <div><b>STIR (INN):</b> <span className="font-mono">{selectedPartnerCompany.tin}</span></div>
                      <div><b>Rahbar:</b> {selectedPartnerCompany.director}</div>
                      <div><b>Telefon:</b> <span className="font-mono">{selectedPartnerCompany.phone}</span></div>
                      <div><b>Kvota:</b> <span className="font-semibold text-emerald-700">{selectedPartnerCompany.occupied}/{selectedPartnerCompany.quota} band</span></div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-200 text-xs text-purple-900 flex items-center space-x-2">
                    <span>🏢</span>
                    <span>Ushbu korxonada amaliyot to'liq ofis formatida o'taladi (dushanba-juma).</span>
                  </div>

                  <div className="flex justify-end space-x-2 pt-2 border-t border-zinc-100">
                    <button
                      onClick={() => setSelectedPartnerCompany(null)}
                      className="px-4 py-2 text-xs text-zinc-600 hover:text-zinc-900"
                    >
                      Yopish
                    </button>
                    <button
                      onClick={() => {
                        setSelectedPartnerCompany(null);
                        setNotification(`${selectedPartnerCompany.name} korxonasiga amaliyot arizangiz muvaffaqiyatli topshirildi!`);
                        setTimeout(() => setNotification(null), 3500);
                      }}
                      className="px-4 py-2 bg-purple-700 text-white rounded-xl text-xs font-semibold hover:bg-purple-800 transition-all shadow-xs"
                    >
                      Arizani Tasdiqlash
                    </button>
                  </div>
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
