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
  Activity,
  Save,
  Plus,
  Briefcase,
  AlertCircle,
  Search,
  ExternalLink,
  X,
  Copy,
  Check
} from 'lucide-react';
import CollapsibleSidebar, { NavItem } from '@/components/CollapsibleSidebar';

interface FacultyItem {
  id: string;
  name: string;
  code: string;
  dekanatLogin: string;
  dekanatAdmin: string;
  deptsCount: number;
  studentsCount: number;
  status: string;
}

interface GroupQuotaItem {
  code: string;
  faculty: string;
  studentsTotal: number;
  internshipActive: number;
  contractApproved: number;
  unassignedTeachers: number;
}

interface AntiTailgatingLog {
  id: string;
  timestamp: string;
  studentId: string;
  studentName: string;
  mentorName: string;
  company: string;
  studentIp: string;
  mentorIp: string;
  isSameIp: boolean;
  riskLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'SHUBHALI' | 'TEKSHIRILMOQDA' | 'TASDIQLANDI';
}

const ADMIN_NAV_ITEMS: NavItem[] = [
  { id: 'overview', label: 'Tizim Nazorati', icon: Activity },
  {
    id: 'structure',
    label: 'Universitet Tuzilmasi',
    icon: Building2,
    subItems: [
      { id: 'faculties-depts', label: 'Fakultet & Dekanatlar', icon: Building2, badge: '4 ta' },
      { id: 'groups-quotas', label: 'Guruhlar & Kvotalar', icon: Users, badge: '12' }
    ]
  },
  {
    id: 'security',
    label: 'Xavfsizlik & Anti-Fraud',
    icon: ShieldCheck,
    subItems: [
      { id: 'antifraud-logs', label: 'Anti-Tailgating Jurnali', icon: ShieldCheck, badge: '2 shubhali' },
      { id: 'system-backups', label: 'Tizim Zaxirasi (Backups)', icon: Database }
    ]
  },
  { id: 'partners', label: 'Hamkor Korxonalar', icon: Briefcase, badge: '4 faol' },
  { id: 'settings', label: 'Foydalanuvchilar (RBAC)', icon: Settings },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [notification, setNotification] = useState<string | null>(null);

  // Modals state
  const [isFacultyModalOpen, setIsFacultyModalOpen] = useState(false);
  const [newFaculty, setNewFaculty] = useState({
    name: '',
    code: 'ATRI',
    dekanatAdmin: '',
    deptsCount: 3
  });

  // 1. Faculties State
  const [faculties, setFaculties] = useState<FacultyItem[]>([
    {
      id: 'fac_1',
      name: 'Axborot texnologiyalari fakulteti',
      code: 'ATRI',
      dekanatLogin: 'DK204581',
      dekanatAdmin: 'Alisher Qodirov',
      deptsCount: 4,
      studentsCount: 680,
      status: 'FAOL'
    },
    {
      id: 'fac_2',
      name: 'Raqamli iqtisodiyot va moliya fakulteti',
      code: 'RIM',
      dekanatLogin: 'DK204582',
      dekanatAdmin: 'Umarov S.R.',
      deptsCount: 3,
      studentsCount: 420,
      status: 'FAOL'
    },
    {
      id: 'fac_3',
      name: 'Kiberxavfsizlik va axborot tizimlari fakulteti',
      code: 'KTF',
      dekanatLogin: 'DK204583',
      dekanatAdmin: 'Qosimov Z.A.',
      deptsCount: 3,
      studentsCount: 340,
      status: 'FAOL'
    },
    {
      id: 'fac_4',
      name: 'Menejment va xalqaro munosabatlar fakulteti',
      code: 'MXM',
      dekanatLogin: 'DK204584',
      dekanatAdmin: 'Saidov B.T.',
      deptsCount: 2,
      studentsCount: 290,
      status: 'FAOL'
    }
  ]);

  // 2. Groups Quotas State
  const [groups, setGroups] = useState<GroupQuotaItem[]>([
    { code: 'DI-202-22', faculty: 'Axborot texnologiyalari', studentsTotal: 28, internshipActive: 28, contractApproved: 28, unassignedTeachers: 0 },
    { code: 'DI-201-22', faculty: 'Axborot texnologiyalari', studentsTotal: 26, internshipActive: 24, contractApproved: 22, unassignedTeachers: 2 },
    { code: 'AI-101-23', faculty: 'Axborot texnologiyalari', studentsTotal: 30, internshipActive: 28, contractApproved: 26, unassignedTeachers: 1 },
    { code: 'KB-301-21', faculty: 'Kiberxavfsizlik', studentsTotal: 25, internshipActive: 25, contractApproved: 24, unassignedTeachers: 0 },
    { code: 'RI-401-22', faculty: 'Raqamli iqtisodiyot', studentsTotal: 32, internshipActive: 30, contractApproved: 28, unassignedTeachers: 2 }
  ]);

  // 3. Anti-Tailgating Logs State
  const [tailgatingLogs, setTailgatingLogs] = useState<AntiTailgatingLog[]>([
    {
      id: 'at_1',
      timestamp: '2026-11-02 11:15:20',
      studentId: 'ST501825',
      studentName: 'Sardor Rahimov',
      mentorName: 'Sardor Bekmurodov',
      company: 'Uzum Technologies MCHJ',
      studentIp: '213.230.87.12',
      mentorIp: '213.230.87.12',
      isSameIp: true,
      riskLevel: 'HIGH',
      status: 'SHUBHALI'
    },
    {
      id: 'at_2',
      timestamp: '2026-11-02 10:42:15',
      studentId: 'ST501830',
      studentName: 'Nilufar Qosimova',
      mentorName: 'Kammuna Iriskulov',
      company: 'Aloqabank ATB',
      studentIp: '84.54.72.19',
      mentorIp: '84.54.72.19',
      isSameIp: true,
      riskLevel: 'HIGH',
      status: 'SHUBHALI'
    },
    {
      id: 'at_3',
      timestamp: '2026-11-02 09:30:10',
      studentId: 'ST501824',
      studentName: 'Bekzod Ergashev',
      mentorName: 'Sardor Bekmurodov',
      company: 'Uzum Technologies MCHJ',
      studentIp: '185.120.44.18',
      mentorIp: '213.230.87.12',
      isSameIp: false,
      riskLevel: 'LOW',
      status: 'TASDIQLANDI'
    },
    {
      id: 'at_4',
      timestamp: '2026-11-01 16:55:04',
      studentId: 'ST501826',
      studentName: 'Madina Karimova',
      mentorName: 'Sardor Bekmurodov',
      company: 'Uzum Technologies MCHJ',
      studentIp: '185.120.44.20',
      mentorIp: '213.230.87.12',
      isSameIp: false,
      riskLevel: 'LOW',
      status: 'TASDIQLANDI'
    }
  ]);

  // 4. Backups State
  const [backups, setBackups] = useState([
    { file: 'pms_backup_2026_11_02_020000.sql.gz', size: '14.2 MB', date: 'Bugun, 02:00 (Avtomatik)' },
    { file: 'pms_backup_2026_11_01_020000.sql.gz', size: '13.9 MB', date: 'Kecha, 02:00 (Avtomatik)' },
    { file: 'pms_backup_2026_10_31_020000.sql.gz', size: '13.5 MB', date: '31-oktabr, 02:00 (Avtomatik)' }
  ]);

  const handleCreateFaculty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFaculty.name.trim()) return;

    const generatedDekanatLogin = `DK${Math.floor(204585 + Math.random() * 10000)}`;
    const newEntry: FacultyItem = {
      id: `fac_${Date.now()}`,
      name: newFaculty.name.trim(),
      code: newFaculty.code.toUpperCase(),
      dekanatLogin: generatedDekanatLogin,
      dekanatAdmin: newFaculty.dekanatAdmin.trim() || 'Fakultet Dekani',
      deptsCount: newFaculty.deptsCount || 3,
      studentsCount: 0,
      status: 'FAOL'
    };

    setFaculties([...faculties, newEntry]);
    setIsFacultyModalOpen(false);
    setNewFaculty({ name: '', code: 'ATRI', dekanatAdmin: '', deptsCount: 3 });
    setNotification(`Yangi fakultet qo'shildi! Dekanat kirish logini: ${generatedDekanatLogin}`);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleTakeBackup = () => {
    const newBackup = {
      file: `pms_backup_${new Date().toISOString().slice(0, 10).replace(/-/g, '_')}_manual.sql.gz`,
      size: '14.3 MB',
      date: 'Hozir (Qo\'lda olingan)'
    };
    setBackups([newBackup, ...backups]);
    setNotification('Yangi PostgreSQL pg_dump zaxira nusxasi muvaffaqiyatli saqlandi!');
    setTimeout(() => setNotification(null), 3000);
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
        role="ADMIN"
        roleTitle="Tizim Administratori"
        userName="Asosiy Administrator"
        userSub="Boshqaruv & Super Admin"
        userBadge="AD987789"
        items={ADMIN_NAV_ITEMS}
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
            <span className="text-xs text-zinc-500 font-medium">Tizim Administratori (Super Admin) Portali</span>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-zinc-50 border border-zinc-200/60 px-3 py-1.5 rounded-xl text-xs">
              <span className="font-semibold text-zinc-900">Asosiy Administrator</span>
              <span className="text-zinc-300">|</span>
              <span className="text-zinc-500 font-medium">Boshqaruv</span>
              <span className="text-zinc-300">|</span>
              <span className="text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded font-mono text-[10px] font-bold border border-indigo-200/60">
                AD987789
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

            {/* TAB 1: OVERVIEW (SERVER HEALTH) */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-sm">
                    <span className="text-xs text-zinc-500">FastAPI Asinxron Backend</span>
                    <p className="text-lg font-bold text-emerald-600 mt-2 flex items-center space-x-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                      <span>ONLINE (200 OK)</span>
                    </p>
                    <p className="text-[11px] text-zinc-400 mt-1">Port: 8000 • Uvicorn Worker</p>
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
                    <span className="text-xs text-zinc-500">Anti-Tailgating Holati</span>
                    <p className="text-lg font-bold text-amber-600 mt-2 flex items-center space-x-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                      <span>2 SHUBHALI IP</span>
                    </p>
                    <p className="text-[11px] text-zinc-400 mt-1">Avtomatik bayroq qo'yilgan</p>
                  </div>
                </div>

                {/* Service Logs */}
                <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-3">
                  <h3 className="text-sm font-bold text-zinc-900">Jonli Tizim Loglari (Uvicorn stdout)</h3>
                  <div className="bg-zinc-950 rounded-xl p-4 font-mono text-[11px] text-zinc-300 space-y-1.5 overflow-x-auto">
                    <p><span className="text-emerald-400">[INFO]</span> 2026-11-02 11:20:01 - FastAPI application startup complete on port 8000</p>
                    <p><span className="text-emerald-400">[INFO]</span> 2026-11-02 11:20:05 - PostgreSQL database schema synchronized (16 tables)</p>
                    <p><span className="text-amber-400">[WARN]</span> 2026-11-02 11:15:20 - Anti-fraud alert: Student ST501825 and Mentor logged from identical IP 213.230.87.12</p>
                    <p><span className="text-blue-400">[DEBUG]</span> 2026-11-02 11:22:45 - Contract generation triggered for AMAL-2026-0042 (PDF sha256 valid)</p>
                    <p><span className="text-emerald-400">[INFO]</span> 2026-11-02 11:24:10 - aiogram bot @tiupm_bot listening to student updates...</p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2-A: FACULTIES & DEPARTMENTS (SUBMENU OF STRUCTURE) */}
            {(activeTab === 'faculties-depts' || activeTab === 'structure') && (
              <div className="space-y-6">
                <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 gap-3">
                    <div>
                      <h3 className="text-sm font-bold text-zinc-900">Universitet Fakultetlari va Dekanatlar (Multi-Dekanat)</h3>
                      <p className="text-xs text-zinc-500">Har bir fakultet dekanatiga 2 harf + 6 raqamli maxsus boshqaruv hisobi biriktirilgan</p>
                    </div>
                    <button 
                      onClick={() => setIsFacultyModalOpen(true)}
                      className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800 shadow-sm"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Yangi Fakultet Qo'shish</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {faculties.map((f) => (
                      <div key={f.id} className="p-4 rounded-xl border border-zinc-200/80 bg-zinc-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-zinc-900 text-xs">{f.name}</span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-200 text-zinc-700 font-bold">{f.code}</span>
                            <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                              Dekanat: {f.dekanatLogin}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-500 mt-1">
                            Dekan: <strong>{f.dekanatAdmin}</strong> • Kafedralar soni: {f.deptsCount} ta • Talabalar: {f.studentsCount} nafar
                          </p>
                        </div>
                        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/60 self-start sm:self-auto">
                          {f.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2-B: GROUPS & QUOTAS (SUBMENU OF STRUCTURE) */}
            {activeTab === 'groups-quotas' && (
              <div className="space-y-6">
                <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-4">
                  <div>
                    <h3 className="text-sm font-bold text-zinc-900">Akademik Guruhlar va Amaliyot Kvotalari</h3>
                    <p className="text-xs text-zinc-500">Fakultet guruhlari bo'yicha shartnomalar ta'minoti va ustoz biriktiruvi</p>
                  </div>

                  <div className="overflow-x-auto pt-2">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-zinc-50 text-zinc-500 border-b border-zinc-200">
                        <tr>
                          <th className="py-2.5 px-3 font-medium">Guruh Kodi</th>
                          <th className="py-2.5 px-3 font-medium">Fakulteti</th>
                          <th className="py-2.5 px-3 font-medium">Jami Talabalar</th>
                          <th className="py-2.5 px-3 font-medium">Amaliyotda Faol</th>
                          <th className="py-2.5 px-3 font-medium">Shartnoma Tasdiqlangan</th>
                          <th className="py-2.5 px-3 font-medium">Ustozsizlar</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-100">
                        {groups.map((g, idx) => (
                          <tr key={idx} className="hover:bg-zinc-50/50">
                            <td className="py-3 px-3 font-mono font-bold text-zinc-900">{g.code}</td>
                            <td className="py-3 px-3 text-zinc-700">{g.faculty}</td>
                            <td className="py-3 px-3 font-semibold text-zinc-900">{g.studentsTotal} nafar</td>
                            <td className="py-3 px-3 text-emerald-700 font-medium">{g.internshipActive} nafar</td>
                            <td className="py-3 px-3 font-bold text-zinc-900">{g.contractApproved} ta</td>
                            <td className="py-3 px-3">
                              {g.unassignedTeachers > 0 ? (
                                <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                                  <AlertCircle className="w-3 h-3 text-amber-600" />
                                  <span>{g.unassignedTeachers} nafar</span>
                                </span>
                              ) : (
                                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                                  To'liq biriktirilgan
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3-A: ANTI-TAILGATING LOGS (SUBMENU OF SECURITY) */}
            {(activeTab === 'antifraud-logs' || activeTab === 'security') && (
              <div className="space-y-6">
                <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 gap-3">
                    <div>
                      <h3 className="text-sm font-bold text-zinc-900">Anti-Tailgating & Anti-Fraud Jurnali</h3>
                      <p className="text-xs text-zinc-500">Talaba va mentor IP manzillari bir xil bo'lib chiqqan soxtalashtirish xavfi monitoringi</p>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-xl bg-amber-50 text-amber-800 border border-amber-200">
                      2 ta yuqori xavfli holat aniqlandi
                    </span>
                  </div>

                  <div className="overflow-x-auto pt-2">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-zinc-50 text-zinc-500 border-b border-zinc-200">
                        <tr>
                          <th className="py-2.5 px-3 font-medium">Vaqt</th>
                          <th className="py-2.5 px-3 font-medium">Talaba</th>
                          <th className="py-2.5 px-3 font-medium">Mentor & Korxona</th>
                          <th className="py-2.5 px-3 font-medium">Talaba IP</th>
                          <th className="py-2.5 px-3 font-medium">Mentor IP</th>
                          <th className="py-2.5 px-3 font-medium">Xavf Darajasi</th>
                          <th className="py-2.5 px-3 font-medium">Holati</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-100">
                        {tailgatingLogs.map((log) => (
                          <tr key={log.id} className="hover:bg-zinc-50/50">
                            <td className="py-3 px-3 font-mono text-zinc-400 text-[11px]">{log.timestamp}</td>
                            <td className="py-3 px-3">
                              <span className="font-semibold text-zinc-900 block">{log.studentName}</span>
                              <span className="font-mono text-[10px] text-zinc-400">{log.studentId}</span>
                            </td>
                            <td className="py-3 px-3">
                              <span className="text-zinc-800 font-medium block">{log.mentorName}</span>
                              <span className="text-[10px] text-zinc-500">{log.company}</span>
                            </td>
                            <td className="py-3 px-3 font-mono text-zinc-700">{log.studentIp}</td>
                            <td className="py-3 px-3 font-mono text-zinc-700">{log.mentorIp}</td>
                            <td className="py-3 px-3">
                              {log.isSameIp ? (
                                <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                                  <AlertTriangle className="w-3 h-3 text-rose-600" />
                                  <span>1 xil IP (Tailgating)</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                  <Check className="w-3 h-3 text-emerald-600" />
                                  <span>Toza</span>
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-3">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                log.status === 'SHUBHALI' ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'bg-emerald-50 text-emerald-700'
                              }`}>
                                {log.status}
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

            {/* TAB 3-B: SYSTEM BACKUPS (SUBMENU OF SECURITY) */}
            {activeTab === 'system-backups' && (
              <div className="space-y-6">
                <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-zinc-100 gap-3">
                    <div>
                      <h3 className="text-sm font-bold text-zinc-900">Ma'lumotlar Bazasi Zaxiralari (PostgreSQL pg_dump)</h3>
                      <p className="text-xs text-zinc-500">ACID tranzaksiyalari himoyalangan, har kecha avtomatik olinadigan zaxira nusxalari</p>
                    </div>

                    <button 
                      onClick={handleTakeBackup}
                      className="inline-flex items-center space-x-2 px-4 py-2 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800 shadow-sm transition-all"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Hozir Zaxira Olish</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {backups.map((b, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-zinc-200/60 bg-zinc-50/40">
                        <div>
                          <h4 className="text-xs font-mono font-bold text-zinc-900">{b.file}</h4>
                          <p className="text-[11px] text-zinc-400 mt-0.5">{b.size} • {b.date}</p>
                        </div>
                        <button 
                          onClick={() => {
                            setNotification(`${b.file} muvaffaqiyatli yuklab olindi!`);
                            setTimeout(() => setNotification(null), 2500);
                          }}
                          className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-white border border-zinc-200 text-zinc-700 rounded-lg text-xs font-medium hover:bg-zinc-50 shadow-xs"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Yuklab olish</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: PARTNERS */}
            {activeTab === 'partners' && (
              <div className="space-y-6">
                <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 gap-3">
                    <div>
                      <h3 className="text-sm font-bold text-zinc-900">Hamkor Korxonalar & Vakansiya Kvotalari</h3>
                      <p className="text-xs text-zinc-500">Tizimda ro'yxatdan o'tgan korxonalar va ularning qabul kvotalari</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {[
                      { name: 'Uzum Technologies MCHJ', tin: '305889123', dir: 'Shaxzod Rahimov', phone: '+998 71 200 00 00', quota: 12, occupied: 6 },
                      { name: 'IT Park Uzbekistan', tin: '306123456', dir: 'Farhod Ibragimov', phone: '+998 71 209 11 99', quota: 20, occupied: 14 },
                      { name: 'Click MCHJ', tin: '302456789', dir: 'Ulugbek Rustamov', phone: '+998 71 231 08 80', quota: 10, occupied: 5 },
                      { name: 'Aloqabank ATB', tin: '200123987', dir: 'Kammuna Iriskulov', phone: '+998 71 230 77 77', quota: 15, occupied: 8 }
                    ].map((c, i) => (
                      <div key={i} className="p-4 rounded-xl border border-zinc-200/80 bg-zinc-50/40 space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-xs font-bold text-zinc-900">{c.name}</h4>
                            <p className="text-[11px] text-zinc-400 font-mono mt-0.5">STIR: {c.tin}</p>
                          </div>
                          <span className="text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200/60 px-2 py-0.5 rounded">
                            {c.occupied} / {c.quota} band
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
              </div>
            )}

            {/* TAB 5: SETTINGS & RBAC */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-4">
                  <div>
                    <h3 className="text-sm font-bold text-zinc-900">Foydalanuvchilar va Rollar Boshqaruvi (RBAC)</h3>
                    <p className="text-xs text-zinc-500">2 harf + 6 raqamli standart loginlar bilan barcha 5 ta rol hisoblarining faollik holati</p>
                  </div>

                  <div className="overflow-x-auto pt-2">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-zinc-50 text-zinc-500 border-b border-zinc-200">
                        <tr>
                          <th className="py-2.5 px-3 font-medium">Username (ID)</th>
                          <th className="py-2.5 px-3 font-medium">F.I.SH</th>
                          <th className="py-2.5 px-3 font-medium">Roli</th>
                          <th className="py-2.5 px-3 font-medium">Holati</th>
                          <th className="py-2.5 px-3 font-medium">Amal</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-100">
                        {[
                          { user: 'AD987789', name: 'Asosiy Administrator', role: 'ADMIN', status: 'FAOL' },
                          { user: 'DK204581', name: 'Alisher Qodirov (ATRI Dekanat)', role: 'OTM_STAFF', status: 'FAOL' },
                          { user: 'DK204582', name: 'Umarov S.R. (Iqtisodiyot Dekanat)', role: 'OTM_STAFF', status: 'FAOL' },
                          { user: 'TC309482', name: 'Dotsent Jamshid Karimov', role: 'TEACHER', status: 'FAOL' },
                          { user: 'MN408193', name: 'Sardor Bekmurodov (Uzum Tech)', role: 'MENTOR', status: 'FAOL' },
                          { user: 'ST501824', name: 'Bekzod Ergashev (Talaba)', role: 'STUDENT', status: 'FAOL' }
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
                                  setNotification(`${u.user} uchun yangi parol tiklandi!`);
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
              </div>
            )}
          </main>
        </div>
      </div>

      {/* MODAL: YANGI FAKULTET QO'SHISH */}
      {isFacultyModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-zinc-200 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-zinc-900">Yangi Fakultet & Dekanat Qo'shish</h3>
                  <p className="text-[10px] text-zinc-400">Avtomatik DK-login generatsiya qilinadi</p>
                </div>
              </div>
              <button 
                onClick={() => setIsFacultyModalOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateFaculty} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1">Fakultet Nomi *</label>
                <input 
                  type="text"
                  required
                  placeholder="Masalan: Logistika va transport fakulteti"
                  value={newFaculty.name}
                  onChange={(e) => setNewFaculty({ ...newFaculty, name: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-900 focus:outline-none focus:border-zinc-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">Qisqartma Kodi *</label>
                  <input 
                    type="text"
                    required
                    placeholder="LTF"
                    value={newFaculty.code}
                    onChange={(e) => setNewFaculty({ ...newFaculty, code: e.target.value.toUpperCase() })}
                    className="w-full text-xs p-2.5 rounded-xl border border-zinc-200 bg-white font-mono uppercase text-zinc-900 focus:outline-none focus:border-zinc-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">Kafedralar Soni</label>
                  <input 
                    type="number"
                    min="1"
                    max="10"
                    value={newFaculty.deptsCount}
                    onChange={(e) => setNewFaculty({ ...newFaculty, deptsCount: parseInt(e.target.value) || 3 })}
                    className="w-full text-xs p-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-900 focus:outline-none focus:border-zinc-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1">Dekanat Mas'uli F.I.SH *</label>
                <input 
                  type="text"
                  required
                  placeholder="Dotsent Alisher Qodirov"
                  value={newFaculty.dekanatAdmin}
                  onChange={(e) => setNewFaculty({ ...newFaculty, dekanatAdmin: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-900 focus:outline-none focus:border-zinc-900"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsFacultyModalOpen(false)}
                  className="px-3.5 py-2 rounded-xl text-xs text-zinc-600 hover:bg-zinc-100"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800 shadow-sm"
                >
                  Fakultetni Saqlash va DK-login Yaratish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
