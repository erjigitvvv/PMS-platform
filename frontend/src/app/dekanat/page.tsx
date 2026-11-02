'use client';

import React, { useState } from 'react';
import CollapsibleSidebar, { NavItem } from '@/components/CollapsibleSidebar';
import { LayoutDashboard, BarChart3, Briefcase } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { 
  Building2, 
  Users, 
  FileText, 
  Download, 
  Upload, 
  Settings, 
  LogOut, 
  Plus, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  FileSpreadsheet,
  ShieldCheck,
  Check,
  ExternalLink
} from 'lucide-react';

const DEKANAT_NAV_ITEMS: NavItem[] = [
  { id: 'monitor', label: 'Jonli Monitor', icon: LayoutDashboard },
  { id: 'import', label: 'Talabalar & Excel', icon: FileSpreadsheet, badge: 'Excel' },
  { id: 'contracts', label: 'Arizalar & Shartnomalar', icon: FileText, badge: '4 yangi' },
  { id: 'partners', label: 'Hamkor Korxonalar', icon: Briefcase },
  { id: 'reports', label: 'Universitet Hisoboti', icon: BarChart3 },
  { id: 'settings', label: 'Sozlamalar & Muhr', icon: Settings },
];

export default function DekanatDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'monitor' | 'import' | 'contracts' | 'partners' | 'reports' | 'settings'>('monitor');

  const [orderNumber, setOrderNumber] = useState('B-104/26');
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState<string | null>(null);

  // Contracts list state
  const [applications, setApplications] = useState([
    {
      id: 'app_1',
      studentName: 'Sardor Rahimov',
      group: 'DI-202-22',
      company: 'Uzum Technologies MCHJ',
      mentor: 'Sardor Bekmurodov',
      status: 'APPROVED',
      contractNo: 'AMAL-2026-0042'
    },
    {
      id: 'app_2',
      studentName: 'Madina Karimova',
      group: 'DI-202-22',
      company: 'Uzum Technologies MCHJ',
      mentor: 'Sardor Bekmurodov',
      status: 'APPROVED',
      contractNo: 'AMAL-2026-0043'
    },
    {
      id: 'app_3',
      studentName: 'Javohir Toshmatov',
      group: 'DI-201-22',
      company: 'IT Park Uzbekistan',
      mentor: 'Farrux Zokirov',
      status: 'SUBMITTED',
      contractNo: null
    },
    {
      id: 'app_4',
      studentName: 'Zarnigor Aliyeva',
      group: 'DI-201-22',
      company: 'Click MCHJ',
      mentor: 'Aziz Nishonov',
      status: 'SUBMITTED',
      contractNo: null
    }
  ]);

  const handleApproveContract = (appId: string) => {
    setApplications(applications.map(app => {
      if (app.id === appId) {
        return {
          ...app,
          status: 'APPROVED',
          contractNo: `AMAL-2026-${Math.floor(1000 + Math.random() * 9000)}`
        };
      }
      return app;
    }));
    setNotification('3 Tomonlama shartnoma QR-kod bilan avtomatik generatsiya qilindi (PDF tayyor)!');
    setTimeout(() => setNotification(null), 3500);
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
        role="OTM_STAFF"
        roleTitle="Dekanat & Amaliyot Bo'limi"
        userName="Alisher Qodirov"
        userSub="Boshqarma Boshlig'i"
        userBadge="DK204581"
        items={DEKANAT_NAV_ITEMS}
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
            <span className="text-xs text-zinc-500 font-medium">Dekanat & Amaliyot Boshqarmasi</span>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-zinc-50 border border-zinc-200/60 px-3 py-1.5 rounded-xl text-xs">
              <span className="font-semibold text-zinc-900">Alisher Qodirov</span>
              <span className="text-zinc-300">|</span>
              <span className="text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-mono text-[10px] font-bold border border-blue-200/60">
                DK204581
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

        {/* Content */}
        <main className="flex-1 space-y-6">
          {notification && (
            <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-4 flex items-center space-x-3 text-emerald-800 text-xs shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{notification}</span>
            </div>
          )}

          {/* TAB 1: MONITOR */}
          {activeTab === 'monitor' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-sm">
                  <span className="text-xs text-zinc-500">Amaliyotdagi Talabalar</span>
                  <p className="text-2xl font-bold text-zinc-900 mt-2">1,240 nafar</p>
                  <p className="text-[11px] text-zinc-400 mt-1">OTM bo'yicha jami</p>
                </div>

                <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-sm">
                  <span className="text-xs text-zinc-500">Shartnomasi Tasdiqlangan</span>
                  <p className="text-2xl font-bold text-emerald-600 mt-2">1,180 ta</p>
                  <p className="text-[11px] text-emerald-700 mt-1">95.1% ta'minlangan</p>
                </div>

                <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-sm">
                  <span className="text-xs text-zinc-500">Faol Hamkor Korxonalar</span>
                  <p className="text-2xl font-bold text-zinc-900 mt-2">48 ta</p>
                  <p className="text-[11px] text-zinc-400 mt-1">+4 ta yangi memorandum</p>
                </div>

                <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-sm">
                  <span className="text-xs text-zinc-500">Umumiy Davomat</span>
                  <p className="text-2xl font-bold text-zinc-900 mt-2">94.2%</p>
                  <p className="text-[11px] text-emerald-600 mt-1">Yuqori intizom</p>
                </div>
              </div>

              {/* Progress per Department */}
              <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-zinc-900">Kafedralar Kesimida Amaliyot Progressi</h3>
                
                <div className="space-y-3">
                  {[
                    { dept: 'Dasturiy injiniring kafedrasi', students: '320 nafar', pct: '97%' },
                    { dept: 'Sun\'iy intellekt va ma\'lumotlar tahlili', students: '240 nafar', pct: '95%' },
                    { dept: 'Raqamli iqtisodiyot va moliya kafedrasi', students: '410 nafar', pct: '91%' },
                    { dept: 'Kiberxavfsizlik kafedrasi', students: '270 nafar', pct: '96%' }
                  ].map((d, i) => (
                    <div key={i} className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="font-semibold text-zinc-800">{d.dept} ({d.students})</span>
                        <span className="font-bold text-zinc-900">{d.pct}</span>
                      </div>
                      <div className="w-full bg-zinc-100 rounded-full h-2">
                        <div className="bg-zinc-900 h-2 rounded-full" style={{ width: d.pct }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: IMPORT */}
          {activeTab === 'import' && (
            <div className="space-y-6">
              {/* Dropzone */}
              <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-zinc-900">Talabalar Ro'yxatini Excel Orqali Yuklash (Bulk Import)</h3>
                    <p className="text-xs text-zinc-500 mt-0.5">Yuzlab talabalarni bitta tugma bilan bazaga kiritish va Student ID berish</p>
                  </div>
                  <button className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-white border border-zinc-200 text-zinc-700 rounded-xl text-xs font-medium hover:bg-zinc-50 shadow-sm">
                    <Download className="w-3.5 h-3.5" />
                    <span>Namunaviy Excel Shablonini Olish</span>
                  </button>
                </div>

                <div className="border-2 border-dashed border-zinc-200 rounded-2xl p-8 text-center hover:border-zinc-400 transition-colors cursor-pointer bg-zinc-50/50">
                  <FileSpreadsheet className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
                  <p className="text-xs font-bold text-zinc-800">.xlsx formatdagi Excel faylni shu yerga sudrab keling yoki tanlang</p>
                  <p className="text-[11px] text-zinc-400 mt-1">Ustunlar: F.I.SH | Guruh | Username | Boshlang'ich Parol | Telefon</p>
                  <input type="file" accept=".xlsx" className="hidden" />
                </div>

                <div className="mt-4 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200/60 text-xs text-emerald-800 flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Avtomatik Tizim:</strong> Excel yuklanishi bilan har bir talabaga avtomatik ravishda <code>STD-2026-XXXX</code> formatida unikal ID va standart kirish paroli beriladi.
                  </span>
                </div>
              </div>

              {/* Table */}
              <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 gap-3">
                  <h4 className="text-xs font-bold text-zinc-900">Baza dagi Talabalar Ro'yxati (1,240)</h4>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-2.5" />
                      <input 
                        type="text" 
                        placeholder="F.I.SH yoki ID bo'yicha..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8 pr-3 py-1.5 text-xs rounded-xl border border-zinc-200 bg-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-zinc-50 text-zinc-500 border-b border-zinc-200">
                      <tr>
                        <th className="py-2.5 px-3 font-medium">Student ID</th>
                        <th className="py-2.5 px-3 font-medium">F.I.SH</th>
                        <th className="py-2.5 px-3 font-medium">Guruhi</th>
                        <th className="py-2.5 px-3 font-medium">Korxona</th>
                        <th className="py-2.5 px-3 font-medium">Shartnoma</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                      {[
                        { id: 'STD-2026-0001', name: 'Sardor Rahimov', group: 'DI-202-22', company: 'Uzum Technologies MCHJ', contract: 'AMAL-2026-0042' },
                        { id: 'STD-2026-0002', name: 'Madina Karimova', group: 'DI-202-22', company: 'Uzum Technologies MCHJ', contract: 'AMAL-2026-0043' },
                        { id: 'STD-2026-0003', name: 'Javohir Toshmatov', group: 'DI-201-22', company: 'IT Park Uzbekistan', contract: 'Kutilmoqda' },
                        { id: 'STD-2026-0004', name: 'Zarnigor Aliyeva', group: 'DI-201-22', company: 'Click MCHJ', contract: 'Kutilmoqda' }
                      ].map((t) => (
                        <tr key={t.id} className="hover:bg-zinc-50/50">
                          <td className="py-3 px-3 font-mono font-bold text-zinc-900">{t.id}</td>
                          <td className="py-3 px-3 font-semibold text-zinc-800">{t.name}</td>
                          <td className="py-3 px-3 font-mono text-zinc-500">{t.group}</td>
                          <td className="py-3 px-3 text-zinc-600">{t.company}</td>
                          <td className="py-3 px-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              t.contract.startsWith('AMAL') ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60' : 'bg-amber-50 text-amber-700 border border-amber-200/60'
                            }`}>
                              {t.contract}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CONTRACTS */}
          {activeTab === 'contracts' && (
            <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-zinc-100 gap-3">
                <div>
                  <h3 className="text-sm font-bold text-zinc-900">3 Tomonlama Shartnomalarni Rasmiylashtirish</h3>
                  <p className="text-xs text-zinc-500">Rektorat buyrug'i asosida avtomatik QR-kodli shartnomalar generatsiyasi</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-zinc-500 font-medium">Buyruq №:</span>
                  <input 
                    type="text" 
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    className="w-28 text-xs p-1.5 rounded-xl border border-zinc-200 bg-white font-mono font-bold text-zinc-900"
                  />
                </div>
              </div>

              <div className="space-y-4">
                {applications.map((app) => (
                  <div key={app.id} className="p-4 rounded-xl border border-zinc-200/80 bg-zinc-50/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-zinc-900">{app.studentName}</span>
                        <span className="text-[11px] text-zinc-400 font-mono">({app.group})</span>
                      </div>
                      <p className="text-xs text-zinc-600 mt-1">Korxona: <strong>{app.company}</strong> • Mentor: {app.mentor}</p>
                      {app.contractNo && (
                        <p className="text-[11px] text-emerald-700 font-mono mt-0.5">Shartnoma raqami: {app.contractNo}</p>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      {app.status === 'SUBMITTED' ? (
                        <button
                          onClick={() => handleApproveContract(app.id)}
                          className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-medium hover:bg-emerald-700 shadow-sm"
                        >
                          Tasdiqlash & Shartnoma Generatsiya
                        </button>
                      ) : (
                        <div className="flex space-x-2">
                          <button className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800 shadow-sm">
                            <Download className="w-3.5 h-3.5" />
                            <span>PDF Yuklab olish</span>
                          </button>
                          <button className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-white border border-zinc-200 text-zinc-700 rounded-xl text-xs font-medium hover:bg-zinc-50">
                            <span>Word</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PARTNERS */}
          {activeTab === 'partners' && (
            <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-zinc-900">Hamkor Korxonalar & Kvotalar</h3>
                  <p className="text-xs text-zinc-500">Rasmiy shartnoma tuzilgan tashkilotlar ro'yxati</p>
                </div>
                <button className="px-3.5 py-2 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800 shadow-sm">
                  + Yangi Korxona Qo'shish
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {[
                  { name: 'Uzum Technologies MCHJ', tin: '305889123', dir: 'Shaxzod Rahimov', phone: '+998 71 200 00 00', quota: 10, occupied: 5 },
                  { name: 'IT Park Uzbekistan', tin: '306123456', dir: 'Farhod Ibragimov', phone: '+998 71 209 11 99', quota: 15, occupied: 8 },
                  { name: 'Click MCHJ', tin: '302456789', dir: 'Ulugbek Rustamov', phone: '+998 71 231 08 80', quota: 8, occupied: 4 },
                  { name: 'Aloqabank ATB', tin: '200123987', dir: 'Kammuna Iriskulov', phone: '+998 71 230 77 77', quota: 12, occupied: 6 }
                ].map((c, i) => (
                  <div key={i} className="p-4 rounded-xl border border-zinc-200/80 bg-zinc-50/40 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-xs font-bold text-zinc-900">{c.name}</h4>
                        <p className="text-[11px] text-zinc-400 font-mono mt-0.5">STIR: {c.tin}</p>
                      </div>
                      <span className="text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200/60 px-2 py-0.5 rounded">
                        Kvota: {c.occupied} / {c.quota} band
                      </span>
                    </div>

                    <div className="text-[11px] text-zinc-600 space-y-0.5">
                      <p>Rahbar: {c.dir}</p>
                      <p className="font-mono">Telefon: {c.phone}</p>
                    </div>

                    <div className="w-full bg-zinc-200 rounded-full h-1.5">
                      <div className="bg-zinc-900 h-1.5 rounded-full" style={{ width: `${(c.occupied / c.quota) * 100}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: REPORTS */}
          {activeTab === 'reports' && (
            <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-zinc-100 gap-3">
                <div>
                  <h3 className="text-sm font-bold text-zinc-900">Universitet Yakuniy Amaliyot Hisoboti (Vazirlik Standarti)</h3>
                  <p className="text-xs text-zinc-500">Semestr amaliyot natijalarini to'liq eksport qilish</p>
                </div>
                <button 
                  onClick={() => {
                    setNotification('Yagona hisobot Excel fayli shakllantirildi va yuklab olindi!');
                    setTimeout(() => setNotification(null), 3500);
                  }}
                  className="inline-flex items-center space-x-2 px-4 py-2.5 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800 shadow-sm"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Yagona Yakuniy Hisobotni Excelga Yuklab Olish</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border border-zinc-200/60 bg-zinc-50/50">
                  <span className="text-xs text-zinc-500">Jami Baholanganlar</span>
                  <p className="text-2xl font-bold text-zinc-900 mt-2">1,120 nafar</p>
                  <p className="text-[11px] text-zinc-400 mt-1">90.3% himoya topshirgan</p>
                </div>
                <div className="p-4 rounded-xl border border-zinc-200/60 bg-zinc-50/50">
                  <span className="text-xs text-zinc-500">A'lo Daraja ("A")</span>
                  <p className="text-2xl font-bold text-emerald-600 mt-2">680 nafar</p>
                  <p className="text-[11px] text-emerald-700 mt-1">60.7% a'lochi</p>
                </div>
                <div className="p-4 rounded-xl border border-zinc-200/60 bg-zinc-50/50">
                  <span className="text-xs text-zinc-500">Ish Taklifi (Job Offer) Olganlar</span>
                  <p className="text-2xl font-bold text-purple-600 mt-2">142 nafar</p>
                  <p className="text-[11px] text-purple-700 mt-1">Bandlik kafolatlangan</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-6">
              <div>
                <h3 className="text-sm font-bold text-zinc-900">Dekanat Sozlamalari & E-Imzo Faksimilesi</h3>
                <p className="text-xs text-zinc-500 mt-0.5">3 Tomonlama shartnomalarda avtomatik aks etuvchi OTM rekvizitlari</p>
              </div>

              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">Mas'ul Xodim F.I.SH</label>
                  <input 
                    type="text" 
                    defaultValue="Jamshid Alimov"
                    className="w-full text-xs p-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">Boshlang'ich Import Paroli</label>
                  <input 
                    type="text" 
                    defaultValue="Talaba123!"
                    className="w-full text-xs p-2.5 rounded-xl border border-zinc-200 bg-white font-mono text-zinc-900"
                  />
                  <p className="text-[11px] text-zinc-400 mt-1">Exceldan yangi kiritilgan barcha talabalar uchun standart parol</p>
                </div>

                <div className="p-4 rounded-xl border border-zinc-200/80 bg-zinc-50/50 space-y-2">
                  <h4 className="text-xs font-bold text-zinc-900">OTM Rasmiy Dumaloq Muhri (Faksimile)</h4>
                  <p className="text-[11px] text-zinc-500">Generatsiya bo'ladigan shartnomalar tagiga tushuvchi muhr fayli:</p>
                  <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>tiu_official_seal_2026.png (Faol)</span>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    setNotification('Dekanat sozlamalari saqlandi!');
                    setTimeout(() => setNotification(null), 3000);
                  }}
                  className="px-5 py-2.5 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800 shadow-sm"
                >
                  Sozlamalarni Saqlash
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}