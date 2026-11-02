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
  ExternalLink
} from 'lucide-react';

export default function StudentDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'vacancies' | 'logbook' | 'docs' | 'grades' | 'settings'>('overview');
  
  // Student State
  const [phone, setPhone] = useState('+998 90 123 45 67');
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
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col antialiased text-zinc-900">
      {/* Top Header */}
      <header className="bg-white border-b border-zinc-200/80 sticky top-0 z-30 px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src="/tiu-logo.svg" alt="TIU" className="w-9 h-9 object-contain" />
            <div>
              <h1 className="text-sm font-bold text-zinc-900 leading-tight">Tashkent International University</h1>
              <p className="text-[11px] text-zinc-400">Talaba Amaliyot Portali</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 bg-zinc-50 border border-zinc-200/60 px-3 py-1.5 rounded-xl text-xs">
              <span className="font-semibold text-zinc-900">Sardor Rahimov</span>
              <span className="text-zinc-300">|</span>
              <span className="text-zinc-500 font-mono">DI-202-22</span>
              <span className="text-zinc-300">|</span>
              <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-mono text-[10px] font-bold">STD-2026-0001</span>
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

      {/* Main Container with Sidebar */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 flex-1 flex flex-col md:flex-row gap-6">
        {/* Left Sidebar */}
        <aside className="w-full md:w-60 shrink-0">
          <div className="bg-white border border-zinc-200/80 rounded-2xl p-2.5 shadow-sm space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'overview' ? 'bg-zinc-900 text-white shadow-sm' : 'text-zinc-600 hover:bg-zinc-50'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Bosh sahifa</span>
            </button>

            <button
              onClick={() => setActiveTab('vacancies')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'vacancies' ? 'bg-zinc-900 text-white shadow-sm' : 'text-zinc-600 hover:bg-zinc-50'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Amaliyot o'rni</span>
            </button>

            <button
              onClick={() => setActiveTab('logbook')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'logbook' ? 'bg-zinc-900 text-white shadow-sm' : 'text-zinc-600 hover:bg-zinc-50'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Kundalik</span>
            </button>

            <button
              onClick={() => setActiveTab('docs')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'docs' ? 'bg-zinc-900 text-white shadow-sm' : 'text-zinc-600 hover:bg-zinc-50'
              }`}
            >
              <Download className="w-4 h-4" />
              <span>Hujjatlar & Shartnoma</span>
            </button>

            <button
              onClick={() => setActiveTab('grades')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'grades' ? 'bg-zinc-900 text-white shadow-sm' : 'text-zinc-600 hover:bg-zinc-50'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Davomat & Baholar</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'settings' ? 'bg-zinc-900 text-white shadow-sm' : 'text-zinc-600 hover:bg-zinc-50'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Sozlamalar</span>
            </button>
          </div>
        </aside>

        {/* Content Area */}
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
              {/* Main Internship Card */}
              <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-semibold tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full uppercase">
                      Faol Amaliyot
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
                    <p className="text-xs font-semibold text-zinc-900 mt-0.5">42 / 60 kun bajarildi</p>
                    <div className="w-full bg-zinc-100 rounded-full h-1.5 mt-1.5">
                      <div className="bg-zinc-900 h-1.5 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-sm">
                  <span className="text-xs text-zinc-500">Davomat ko'rsatkichi</span>
                  <p className="text-2xl font-bold text-zinc-900 mt-2">98.5%</p>
                  <p className="text-[11px] text-emerald-600 mt-1">A'lo darajada</p>
                </div>
                <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-sm">
                  <span className="text-xs text-zinc-500">Tasdiqlangan kundaliklar</span>
                  <p className="text-2xl font-bold text-zinc-900 mt-2">{logs.filter(l => l.status === 'APPROVED').length} ta</p>
                  <p className="text-[11px] text-zinc-400 mt-1">Barcha topshirilganlar</p>
                </div>
                <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-sm">
                  <span className="text-xs text-zinc-500">3 Tomonlama Shartnoma</span>
                  <p className="text-xs font-semibold text-emerald-700 mt-2">Tasdiqlangan (PDF tayyor)</p>
                  <button 
                    onClick={() => setActiveTab('docs')}
                    className="mt-2 text-xs text-zinc-900 font-medium underline hover:text-zinc-700"
                  >
                    Yuklab olish &rarr;
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: VACANCIES */}
          {activeTab === 'vacancies' && (
            <div className="space-y-6">
              <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm">
                <h3 className="text-sm font-bold text-zinc-900 mb-1">Hamkor Korxonalar Vakansiyalari</h3>
                <p className="text-xs text-zinc-500 mb-4">TIU bilan rasmiy memorandum tuzilgan tashkilotlar kvotalari</p>

                <div className="space-y-3">
                  {[
                    { name: 'Uzum Technologies MCHJ', role: 'Junior Backend Developer', quota: '3 o\'rin', status: 'TANLANGAN' },
                    { name: 'IT Park Uzbekistan', role: 'Frontend React/Next.js Intern', quota: '5 o\'rin', status: 'Ochiq' },
                    { name: 'Click MCHJ', role: 'QA & Mobile Testing Intern', quota: '2 o\'rin', status: 'Ochiq' },
                    { name: 'Aloqabank ATB', role: 'FinTech Database Intern', quota: '4 o\'rin', status: 'Ochiq' }
                  ].map((v, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-zinc-200/60 bg-zinc-50/50">
                      <div>
                        <h4 className="text-xs font-bold text-zinc-900">{v.name}</h4>
                        <p className="text-xs text-zinc-600 mt-0.5">{v.role}</p>
                        <span className="text-[11px] text-zinc-400">Kvota: {v.quota}</span>
                      </div>
                      <div>
                        {v.status === 'TANLANGAN' ? (
                          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-semibold">
                            Siz biriktirilgansiz
                          </span>
                        ) : (
                          <button className="px-3 py-1.5 bg-zinc-900 text-white rounded-lg text-xs font-medium hover:bg-zinc-800">
                            Ariza topshirish
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Custom Company Submission */}
              <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm">
                <h3 className="text-sm font-bold text-zinc-900 mb-1">Mustaqil Korxona Taklif Qilish</h3>
                <p className="text-xs text-zinc-500 mb-4">Agar amaliyotni o'zingiz topgan boshqa korxonada o'tamoqchi bo'lsangiz rekvizitlarni kiriting:</p>

                <form onSubmit={(e) => { e.preventDefault(); setApplicationSubmitted(true); }} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-700 mb-1">Korxona nomi</label>
                    <input 
                      type="text" 
                      placeholder="MCHJ yoki AJ nomi"
                      value={customCompany.name}
                      onChange={(e) => setCustomCompany({ ...customCompany, name: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-zinc-200 bg-white" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-700 mb-1">STIR (TIN) raqami</label>
                    <input 
                      type="text" 
                      placeholder="9 xonali STIR"
                      value={customCompany.tin}
                      onChange={(e) => setCustomCompany({ ...customCompany, tin: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-zinc-200 bg-white" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-700 mb-1">Rahbar F.I.SH</label>
                    <input 
                      type="text" 
                      placeholder="Direktor ismi"
                      value={customCompany.director}
                      onChange={(e) => setCustomCompany({ ...customCompany, director: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-zinc-200 bg-white" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-700 mb-1">Aloqa telefoni</label>
                    <input 
                      type="text" 
                      placeholder="+998..."
                      value={customCompany.phone}
                      onChange={(e) => setCustomCompany({ ...customCompany, phone: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-zinc-200 bg-white" 
                    />
                  </div>
                  <div className="sm:col-span-2 pt-2">
                    <button type="submit" className="bg-zinc-900 text-white px-5 py-2.5 rounded-xl text-xs font-medium hover:bg-zinc-800">
                      Dekanat tasdiqlashiga yuborish
                    </button>
                    {applicationSubmitted && (
                      <span className="ml-3 text-xs text-emerald-600 font-medium">Ariza dekanatga yuborildi!</span>
                    )}
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* TAB 3: LOGBOOK */}
          {activeTab === 'logbook' && (
            <div className="space-y-6">
              {/* Daily Log Form */}
              <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm">
                <h3 className="text-sm font-bold text-zinc-900 mb-1">Bugungi Amaliyot Kundaligini To'ldirish</h3>
                <p className="text-xs text-zinc-500 mb-4">Sana: {new Date().toISOString().split('T')[0]} (Bugun)</p>

                <form onSubmit={handleAddLog} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-700 mb-1">
                      Bugun korxonada qanday amaliy vazifalarni bajardingiz?
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={newTasks}
                      onChange={(e) => setNewTasks(e.target.value)}
                      placeholder="Bajarilgan ishlar va texnik topshiriqlar haqida batafsil yozing..."
                      className="w-full text-xs p-3 rounded-xl border border-zinc-200 bg-white focus:outline-none focus:border-zinc-900 text-zinc-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-700 mb-1">
                      Ushbu vazifani bajarishda qanday yangi bilim yoki ko'nikmalarni o'rgandingiz?
                    </label>
                    <input
                      type="text"
                      value={newSkills}
                      onChange={(e) => setNewSkills(e.target.value)}
                      placeholder="Masalan: Docker, PostgreSQL tranzaksiyalari, Code review..."
                      className="w-full text-xs p-2.5 rounded-xl border border-zinc-200 bg-white focus:outline-none focus:border-zinc-900 text-zinc-900"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <label className="cursor-pointer inline-flex items-center space-x-2 text-xs text-zinc-600 hover:text-zinc-900 border border-zinc-200 px-3 py-2 rounded-xl bg-zinc-50">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Ishdan rasm/fayl biriktirish</span>
                      <input type="file" className="hidden" />
                    </label>

                    <button
                      type="submit"
                      className="inline-flex items-center space-x-2 bg-zinc-900 text-white px-5 py-2.5 rounded-xl text-xs font-medium hover:bg-zinc-800 transition-all shadow-sm"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Mentorga yuborish</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Log History */}
              <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm">
                <h3 className="text-sm font-bold text-zinc-900 mb-4">O'tgan Kunlar Tarixi</h3>
                <div className="space-y-3">
                  {logs.map((log) => (
                    <div key={log.id} className="p-4 rounded-xl border border-zinc-200/60 bg-zinc-50/40 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-semibold text-zinc-900">{log.date}</span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                          log.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60' : 'bg-amber-50 text-amber-700 border border-amber-200/60'
                        }`}>
                          {log.status === 'APPROVED' ? 'Tasdiqlangan' : 'Kutilmoqda'}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-800">{log.tasks}</p>
                      <p className="text-[11px] text-zinc-400">Ko'nikmalar: {log.skills}</p>
                      {log.feedback && (
                        <p className="text-[11px] text-zinc-500 italic bg-white p-2 rounded-lg border border-zinc-100">
                          Mentor fikri: "{log.feedback}"
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: DOCS */}
          {activeTab === 'docs' && (
            <div className="space-y-6">
              <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-zinc-900">Rasmiy Hujjatlar va 3 Tomonlama Shartnoma</h3>
                <p className="text-xs text-zinc-500">QR-kodli rasmiy hujjatlar universitet va korxona tomonidan tasdiqlangan.</p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between p-4 rounded-xl border border-zinc-200/60 bg-zinc-50/50">
                    <div>
                      <h4 className="text-xs font-bold text-zinc-900">3 Tomonlama Rasmiy Shartnoma (OTM, Talaba, Uzum Tech)</h4>
                      <p className="text-[11px] text-zinc-400 font-mono mt-0.5">Raqam: AMAL-2026-0042 • QR-Hash: 4a9f...e21b</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-zinc-900 text-white rounded-lg text-xs font-medium hover:bg-zinc-800">
                        <Download className="w-3.5 h-3.5" />
                        <span>PDF Yuklab olish</span>
                      </button>
                      <button className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-white border border-zinc-200 text-zinc-700 rounded-lg text-xs font-medium hover:bg-zinc-50">
                        <span>Word (.docx)</span>
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl border border-zinc-200/60 bg-zinc-50/50">
                    <div>
                      <h4 className="text-xs font-bold text-zinc-900">Universitet Rasmiy Amaliyot Yo'llanmasi</h4>
                      <p className="text-[11px] text-zinc-400 font-mono mt-0.5">Rektorat buyrug'i: B-104/26</p>
                    </div>
                    <button className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-zinc-900 text-white rounded-lg text-xs font-medium hover:bg-zinc-800">
                      <Download className="w-3.5 h-3.5" />
                      <span>Yo'llanmani olish (PDF)</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Upload Final Report */}
              <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm">
                <h3 className="text-sm font-bold text-zinc-900 mb-1">Yakuniy Amaliyot Hisoboti Topshirish</h3>
                <p className="text-xs text-zinc-500 mb-4">Amaliyot yakunida tayyorlangan hisobot referat faylini (.pdf formatda) yuklang:</p>

                <div className="border-2 border-dashed border-zinc-200 rounded-2xl p-6 text-center hover:border-zinc-400 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-zinc-400 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-zinc-800">Faylni tanlang yoki sudrab olib keling</p>
                  <p className="text-[11px] text-zinc-400 mt-1">Faqat PDF formatda, maksimal 15 MB</p>
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
                    <span className="text-xs text-zinc-500">🏢 Korxona Mentori Bahosi:</span>
                    <p className="text-2xl font-bold text-zinc-900 mt-2">48 / 50</p>
                    <p className="text-[11px] text-zinc-500 mt-1">Baho: 4.8 / 5.0 (A'lo)</p>
                  </div>

                  <div className="p-4 rounded-xl border border-zinc-200/60 bg-zinc-50/50">
                    <span className="text-xs text-zinc-500">👨‍🏫 OTM Kafedra Bahosi:</span>
                    <p className="text-2xl font-bold text-zinc-900 mt-2">46 / 50</p>
                    <p className="text-[11px] text-zinc-500 mt-1">Himoya komissiyasi xulosasi</p>
                  </div>

                  <div className="p-4 rounded-xl border border-emerald-200/80 bg-emerald-50/40">
                    <span className="text-xs text-emerald-800 font-semibold">🏆 JAMI NATIJA (ECTS):</span>
                    <p className="text-2xl font-bold text-emerald-900 mt-2">94 / 100 ball</p>
                    <p className="text-xs font-bold text-emerald-700 mt-1">"A" (A'lo daraja)</p>
                  </div>
                </div>

                {/* Attendance Breakdown */}
                <div className="pt-4 border-t border-zinc-100">
                  <h4 className="text-xs font-bold text-zinc-900 mb-3">Davomat Taqvimi</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200/60">
                      <p className="text-lg font-bold text-emerald-800">41 kun</p>
                      <p className="text-[11px] text-emerald-600">🟢 Kelgan (1.0x)</p>
                    </div>
                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/60">
                      <p className="text-lg font-bold text-amber-800">1 kun</p>
                      <p className="text-[11px] text-amber-600">🟡 Kech kelgan (0.75x)</p>
                    </div>
                    <div className="p-3 bg-rose-50 rounded-xl border border-rose-200/60">
                      <p className="text-lg font-bold text-rose-800">0 kun</p>
                      <p className="text-[11px] text-rose-600">🔴 Kelmagan (0.0x)</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-xl border border-blue-200/60">
                      <p className="text-lg font-bold text-blue-800">0 kun</p>
                      <p className="text-[11px] text-blue-600">🔵 Sababli (0.5x)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: SETTINGS (Simplified as approved by PO) */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-zinc-900">Shaxsiy Sozlamalar</h3>
                  <p className="text-xs text-zinc-500 mt-0.5">Telefon raqamingiz, parolingiz va Telegram boti bilan aloqa sozlamalari</p>
                </div>

                {settingsSuccess && (
                  <div className="bg-emerald-50 border border-emerald-200/80 rounded-xl p-3 text-emerald-800 text-xs">
                    {settingsSuccess}
                  </div>
                )}

                <form onSubmit={handleSaveSettings} className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-xs font-medium text-zinc-700 mb-1">Telefon Raqamingiz</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
                      <input 
                        type="text" 
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-900"
                      />
                    </div>
                    <p className="text-[11px] text-zinc-400 mt-1">Korxona mentori siz bilan shu raqam orqali bog'lanadi</p>
                  </div>

                  <div className="pt-2 border-t border-zinc-100">
                    <label className="block text-xs font-medium text-zinc-700 mb-1">Joriy Parol</label>
                    <input 
                      type="password" 
                      placeholder="Eski parolingiz"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-700 mb-1">Yangi Parol</label>
                    <input 
                      type="password" 
                      placeholder="Kamida 6 ta belgi"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-900"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="bg-zinc-900 text-white px-5 py-2.5 rounded-xl text-xs font-medium hover:bg-zinc-800 shadow-sm"
                  >
                    O'zgarishlarni saqlash
                  </button>
                </form>

                {/* Telegram Bot Sync Card */}
                <div className="pt-6 border-t border-zinc-100">
                  <h4 className="text-xs font-bold text-zinc-900 mb-2">Telegram Bot Integratsiyasi</h4>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-zinc-200/60 bg-zinc-50/50 gap-3">
                    <div>
                      <p className="text-xs font-semibold text-zinc-900">@tiupm_bot rasmiy boti</p>
                      <p className="text-[11px] text-zinc-500 mt-0.5">Kundalik hisobotlarni to'g'ridan-to'g'ri Telegramdan yuboring</p>
                    </div>
                    <a 
                      href="https://t.me/tiupm_bot" 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center space-x-1.5 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-medium hover:bg-blue-700 transition-colors shadow-sm"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Telegramni Ulash</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
