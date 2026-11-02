'use client';

import React, { useState } from 'react';
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
  ExternalLink,
  LayoutDashboard,
  BarChart3,
  Briefcase,
  GraduationCap,
  BookOpen,
  Copy,
  Phone,
  X,
  MapPin,
  Hash,
  Award,
  KeyRound,
  FileCheck,
  ChevronRight
} from 'lucide-react';
import CollapsibleSidebar, { NavItem } from '@/components/CollapsibleSidebar';

interface StudentItem {
  id: string;
  name: string;
  group: string;
  phone: string;
  teacher: string;
  company: string;
  contract: string;
  status: 'FAOL' | 'KUTILMOQDA' | 'YAKUNLANGAN';
}

interface TeacherItem {
  id: string;
  name: string;
  department: string;
  degree: string;
  phone: string;
  studentCount: number;
}

interface PartnerCompany {
  id: string;
  name: string;
  shortName: string;
  logoBg: string;
  logoText: string;
  tin: string;
  dir: string;
  phone: string;
  address: string;
  quota: number;
  occupied: number;
  category: string;
  status: string;
}

interface ApplicationItem {
  id: string;
  studentName: string;
  group: string;
  company: string;
  mentor: string;
  status: 'SUBMITTED' | 'APPROVED';
  contractNo: string | null;
  date: string;
}

export default function DekanatDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>('monitor');
  const [notification, setNotification] = useState<string | null>(null);
  const [orderNumber, setOrderNumber] = useState('B-104/26');
  const [searchTerm, setSearchTerm] = useState('');
  const [teacherSearchTerm, setTeacherSearchTerm] = useState('');

  // Modals state
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);
  const [createdCredential, setCreatedCredential] = useState<{
    type: 'STUDENT' | 'TEACHER';
    name: string;
    login: string;
    pass: string;
    sub: string;
  } | null>(null);

  const [copiedLogin, setCopiedLogin] = useState(false);
  const [copiedPass, setCopiedPass] = useState(false);

  // Forms state
  const [newStudent, setNewStudent] = useState({
    name: '',
    group: 'DI-202-22',
    phone: '+998 90 ',
    teacher: 'Dotsent Jamshid Karimov',
    company: 'Uzum Technologies MCHJ'
  });

  const [newTeacher, setNewTeacher] = useState({
    name: '',
    department: 'Dasturiy injiniring kafedrasi',
    degree: 'Dotsent',
    phone: '+998 90 '
  });

  // 1. Students Database State
  const [students, setStudents] = useState<StudentItem[]>([
    {
      id: 'ST501824',
      name: 'Bekzod Ergashev',
      group: 'DI-202-22',
      phone: '+998 90 555 55 55',
      teacher: 'Dotsent Jamshid Karimov',
      company: 'Uzum Technologies MCHJ',
      contract: 'AMAL-2026-0041',
      status: 'FAOL'
    },
    {
      id: 'ST501825',
      name: 'Sardor Rahimov',
      group: 'DI-202-22',
      phone: '+998 90 123 45 67',
      teacher: 'Dotsent Jamshid Karimov',
      company: 'Uzum Technologies MCHJ',
      contract: 'AMAL-2026-0042',
      status: 'FAOL'
    },
    {
      id: 'ST501826',
      name: 'Madina Karimova',
      group: 'DI-202-22',
      phone: '+998 90 234 56 78',
      teacher: 'Dotsent Jamshid Karimov',
      company: 'Uzum Technologies MCHJ',
      contract: 'AMAL-2026-0043',
      status: 'FAOL'
    },
    {
      id: 'ST501827',
      name: 'Javohir Toshmatov',
      group: 'DI-201-22',
      phone: '+998 90 345 67 89',
      teacher: 'Professor Farhod Umarov',
      company: 'IT Park Uzbekistan',
      contract: 'Kutilmoqda',
      status: 'KUTILMOQDA'
    },
    {
      id: 'ST501828',
      name: 'Zarnigor Aliyeva',
      group: 'DI-201-22',
      phone: '+998 90 456 78 90',
      teacher: 'Dotsent Aziz Nishonov',
      company: 'Click MCHJ',
      contract: 'Kutilmoqda',
      status: 'KUTILMOQDA'
    }
  ]);

  // 2. Teachers Database State
  const [teachers, setTeachers] = useState<TeacherItem[]>([
    {
      id: 'TC309482',
      name: 'Dotsent Jamshid Karimov',
      department: 'Dasturiy injiniring kafedrasi',
      degree: 'Dotsent',
      phone: '+998 90 333 33 33',
      studentCount: 18
    },
    {
      id: 'TC309483',
      name: 'Professor Farhod Umarov',
      department: 'Sun\'iy intellekt va algoritmlar',
      degree: 'Professor',
      phone: '+998 90 777 12 34',
      studentCount: 22
    },
    {
      id: 'TC309484',
      name: 'Dotsent Aziz Nishonov',
      department: 'Kiberxavfsizlik kafedrasi',
      degree: 'Dotsent',
      phone: '+998 90 888 56 78',
      studentCount: 16
    },
    {
      id: 'TC309485',
      name: 'Katta o\'qituvchi Nilufar Saidova',
      department: 'Raqamli iqtisodiyot va axborot tizimlari',
      degree: 'Katta o\'qituvchi',
      phone: '+998 90 999 43 21',
      studentCount: 14
    }
  ]);

  // 3. Applications Database State
  const [applications, setApplications] = useState<ApplicationItem[]>([
    {
      id: 'app_1',
      studentName: 'Sardor Rahimov',
      group: 'DI-202-22',
      company: 'Uzum Technologies MCHJ',
      mentor: 'Sardor Bekmurodov',
      status: 'APPROVED',
      contractNo: 'AMAL-2026-0042',
      date: '2026-10-28'
    },
    {
      id: 'app_2',
      studentName: 'Madina Karimova',
      group: 'DI-202-22',
      company: 'Uzum Technologies MCHJ',
      mentor: 'Sardor Bekmurodov',
      status: 'APPROVED',
      contractNo: 'AMAL-2026-0043',
      date: '2026-10-29'
    },
    {
      id: 'app_3',
      studentName: 'Javohir Toshmatov',
      group: 'DI-201-22',
      company: 'IT Park Uzbekistan',
      mentor: 'Farrux Zokirov',
      status: 'SUBMITTED',
      contractNo: null,
      date: '2026-11-01'
    },
    {
      id: 'app_4',
      studentName: 'Zarnigor Aliyeva',
      group: 'DI-201-22',
      company: 'Click MCHJ',
      mentor: 'Aziz Nishonov',
      status: 'SUBMITTED',
      contractNo: null,
      date: '2026-11-02'
    }
  ]);

  // 4. Partner Companies Database State
  const [partners, setPartners] = useState<PartnerCompany[]>([
    {
      id: 'c_1',
      name: 'Uzum Technologies MCHJ',
      shortName: 'UZUM',
      logoBg: 'bg-violet-600',
      logoText: 'UZ',
      tin: '305889123',
      dir: 'Shaxzod Rahimov (CTO)',
      phone: '+998 71 200 00 00',
      address: 'Toshkent sh., Mirobod t., Afrosiyob ko\'chasi, 8-A',
      quota: 12,
      occupied: 6,
      category: 'Fintech & E-commerce',
      status: 'Memorandum 2024-2027 faol'
    },
    {
      id: 'c_2',
      name: 'IT Park Uzbekistan',
      shortName: 'IT PARK',
      logoBg: 'bg-emerald-600',
      logoText: 'IP',
      tin: '306123456',
      dir: 'Farhod Ibragimov (Bosh direktor)',
      phone: '+998 71 209 11 99',
      address: 'Toshkent sh., Mirzo Ulug\'bek t., Tepamasjid ko\'chasi, 4',
      quota: 20,
      occupied: 14,
      category: 'IT Texnopark & Incubator',
      status: 'Strategik Hamkorlik Shartnomasi'
    },
    {
      id: 'c_3',
      name: 'Click MCHJ',
      shortName: 'CLICK',
      logoBg: 'bg-blue-600',
      logoText: 'CL',
      tin: '302456789',
      dir: 'Ulugbek Rustamov (Boshqaruv raisi)',
      phone: '+998 71 231 08 80',
      address: 'Toshkent sh., Shayxontohur t., Navoiy ko\'chasi, 18',
      quota: 10,
      occupied: 5,
      category: 'To\'lov tizimlari & FinTech',
      status: 'Faol Memorandum'
    },
    {
      id: 'c_4',
      name: 'Aloqabank ATB',
      shortName: 'ALOQA',
      logoBg: 'bg-red-600',
      logoText: 'AB',
      tin: '200123987',
      dir: 'Kammuna Iriskulov (Boshqaruv raisi)',
      phone: '+998 71 230 77 77',
      address: 'Toshkent sh., Mirobod t., Amir Temur shoh ko\'chasi, 4',
      quota: 15,
      occupied: 8,
      category: 'Bank & Moliyaviy Texnologiyalar',
      status: 'Bosh Shartnoma faol'
    }
  ]);

  // Handlers
  const handleApproveContract = (appId: string) => {
    const generatedNo = `AMAL-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setApplications(applications.map(app => {
      if (app.id === appId) {
        return {
          ...app,
          status: 'APPROVED',
          contractNo: generatedNo
        };
      }
      return app;
    }));

    // Also update student contract status
    const app = applications.find(a => a.id === appId);
    if (app) {
      setStudents(students.map(s => s.name === app.studentName ? { ...s, contract: generatedNo, status: 'FAOL' } : s));
    }

    setNotification('3 Tomonlama shartnoma QR-kod bilan avtomatik generatsiya qilindi (PDF tayyor)!');
    setTimeout(() => setNotification(null), 3500);
  };

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudent.name.trim()) return;

    // Generate ST + 6 digits
    const nextNum = Math.floor(501830 + Math.random() * 100000);
    const generatedLogin = `ST${nextNum}`;
    const initialPass = 'TIU2026!';

    const created: StudentItem = {
      id: generatedLogin,
      name: newStudent.name.trim(),
      group: newStudent.group,
      phone: newStudent.phone,
      teacher: newStudent.teacher,
      company: newStudent.company,
      contract: 'Kutilmoqda',
      status: 'KUTILMOQDA'
    };

    setStudents([created, ...students]);
    setIsStudentModalOpen(false);
    setCreatedCredential({
      type: 'STUDENT',
      name: created.name,
      login: generatedLogin,
      pass: initialPass,
      sub: `${created.group} | Ustoz: ${created.teacher}`
    });

    setNewStudent({
      name: '',
      group: 'DI-202-22',
      phone: '+998 90 ',
      teacher: 'Dotsent Jamshid Karimov',
      company: 'Uzum Technologies MCHJ'
    });
  };

  const handleCreateTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeacher.name.trim()) return;

    // Generate TC + 6 digits
    const nextNum = Math.floor(309485 + Math.random() * 100000);
    const generatedLogin = `TC${nextNum}`;
    const initialPass = 'TIU2026!';

    const created: TeacherItem = {
      id: generatedLogin,
      name: newTeacher.name.trim(),
      department: newTeacher.department,
      degree: newTeacher.degree,
      phone: newTeacher.phone,
      studentCount: 0
    };

    setTeachers([created, ...teachers]);
    setIsTeacherModalOpen(false);
    setCreatedCredential({
      type: 'TEACHER',
      name: created.name,
      login: generatedLogin,
      pass: initialPass,
      sub: `${created.department} | ${created.degree}`
    });

    setNewTeacher({
      name: '',
      department: 'Dasturiy injiniring kafedrasi',
      degree: 'Dotsent',
      phone: '+998 90 '
    });
  };

  const copyToClipboard = (text: string, isLoginField: boolean) => {
    navigator.clipboard.writeText(text);
    if (isLoginField) {
      setCopiedLogin(true);
      setTimeout(() => setCopiedLogin(false), 2000);
    } else {
      setCopiedPass(true);
      setTimeout(() => setCopiedPass(false), 2000);
    }
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('pms_user');
    }
    router.push('/login');
  };

  // Nav Items Configuration with Dropdown Submenus
  const pendingCount = applications.filter(a => a.status === 'SUBMITTED').length;
  const approvedCount = applications.filter(a => a.status === 'APPROVED').length;

  const DEKANAT_NAV_ITEMS: NavItem[] = [
    { 
      id: 'monitor', 
      label: 'Jonli Monitor', 
      icon: LayoutDashboard 
    },
    { 
      id: 'students', 
      label: 'Talabalar Boshqaruvi', 
      icon: GraduationCap,
      badge: `${students.length}`,
      subItems: [
        { id: 'students-list', label: 'Barcha Talabalar', icon: Users, badge: `${students.length}` },
        { id: 'students-import', label: 'Excel Orqali Yuklash', icon: FileSpreadsheet, badge: 'Excel' }
      ]
    },
    { 
      id: 'teachers', 
      label: 'Kafedra Ustozlari', 
      icon: BookOpen,
      badge: `${teachers.length}` 
    },
    { 
      id: 'contracts', 
      label: 'Shartnomalar & Arizalar', 
      icon: FileText,
      badge: pendingCount > 0 ? `${pendingCount} yangi` : undefined,
      subItems: [
        { id: 'contracts-pending', label: 'Kutilayotgan Arizalar', icon: Clock, badge: pendingCount > 0 ? `${pendingCount}` : undefined },
        { id: 'contracts-approved', label: 'Tasdiqlangan Shartnomalar', icon: CheckCircle2, badge: `${approvedCount}` }
      ]
    },
    { 
      id: 'partners', 
      label: 'Hamkor Korxonalar', 
      icon: Briefcase,
      badge: `${partners.length} ta`
    },
    { 
      id: 'reports', 
      label: 'Universitet Hisoboti', 
      icon: BarChart3 
    },
    { 
      id: 'settings', 
      label: 'Sozlamalar & Muhr', 
      icon: Settings 
    },
  ];

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.group.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTeachers = teachers.filter(t => 
    t.name.toLowerCase().includes(teacherSearchTerm.toLowerCase()) ||
    t.department.toLowerCase().includes(teacherSearchTerm.toLowerCase()) ||
    t.id.toLowerCase().includes(teacherSearchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col md:flex-row antialiased text-zinc-900">
      {/* Left Collapsible Animated Sidebar with Accordion Submenus */}
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
                    <p className="text-2xl font-bold text-zinc-900 mt-2">{partners.length} ta</p>
                    <p className="text-[11px] text-zinc-400 mt-1">+4 ta yangi memorandum</p>
                  </div>

                  <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-sm">
                    <span className="text-xs text-zinc-500">Umumiy Davomat</span>
                    <p className="text-2xl font-bold text-zinc-900 mt-2">94.2%</p>
                    <p className="text-[11px] text-emerald-600 mt-1">Yuqori intizom</p>
                  </div>
                </div>

                {/* Quick Shortcuts */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button
                    onClick={() => setActiveTab('students-list')}
                    className="p-4 rounded-2xl bg-white border border-zinc-200/80 hover:border-zinc-300 transition-all text-left group shadow-xs"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-8 h-8 rounded-xl bg-violet-50 text-violet-700 flex items-center justify-center">
                        <GraduationCap className="w-4 h-4" />
                      </div>
                      <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 transition-colors" />
                    </div>
                    <h4 className="text-xs font-bold text-zinc-900">Talabalar Ro'yxati</h4>
                    <p className="text-[11px] text-zinc-400 mt-0.5">Yangi talaba qo'shish va login generatsiya</p>
                  </button>

                  <button
                    onClick={() => setActiveTab('teachers')}
                    className="p-4 rounded-2xl bg-white border border-zinc-200/80 hover:border-zinc-300 transition-all text-left group shadow-xs"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 transition-colors" />
                    </div>
                    <h4 className="text-xs font-bold text-zinc-900">Kafedra Ustozlari</h4>
                    <p className="text-[11px] text-zinc-400 mt-0.5">Ilmiy rahbarlar katalogi va loginlar</p>
                  </button>

                  <button
                    onClick={() => setActiveTab('contracts-pending')}
                    className="p-4 rounded-2xl bg-white border border-zinc-200/80 hover:border-zinc-300 transition-all text-left group shadow-xs"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                        <FileText className="w-4 h-4" />
                      </div>
                      <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 transition-colors" />
                    </div>
                    <h4 className="text-xs font-bold text-zinc-900">Kutilayotgan Shartnomalar</h4>
                    <p className="text-[11px] text-zinc-400 mt-0.5">3 tomonlama arizalarni tasdiqlash</p>
                  </button>
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

            {/* TAB 2-A: STUDENTS LIST */}
            {(activeTab === 'students-list' || activeTab === 'students') && (
              <div className="space-y-6">
                <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 gap-3">
                    <div>
                      <h3 className="text-sm font-bold text-zinc-900">Barcha Talabalar Boshqaruvi</h3>
                      <p className="text-xs text-zinc-500">Talabalar ro'yxati, guruhlari, biriktirilgan ustozi va kirish identifikatorlari</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setIsStudentModalOpen(true)}
                        className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800 shadow-sm transition-all"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Yangi Talaba Qo'shish</span>
                      </button>
                    </div>
                  </div>

                  {/* Search and Filters */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                    <div className="relative w-full sm:w-80">
                      <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-2.5" />
                      <input 
                        type="text" 
                        placeholder="F.I.SH, ID yoki Guruh bo'yicha qidiruv..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-zinc-200 bg-white placeholder-zinc-400 focus:outline-none focus:border-zinc-900"
                      />
                    </div>
                    <span className="text-[11px] text-zinc-400">Jami: {filteredStudents.length} nafar talaba</span>
                  </div>

                  {/* Students Table */}
                  <div className="overflow-x-auto pt-2">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-zinc-50 text-zinc-500 border-b border-zinc-200">
                        <tr>
                          <th className="py-2.5 px-3 font-medium">Login (ID)</th>
                          <th className="py-2.5 px-3 font-medium">F.I.SH</th>
                          <th className="py-2.5 px-3 font-medium">Guruhi</th>
                          <th className="py-2.5 px-3 font-medium">Telefon</th>
                          <th className="py-2.5 px-3 font-medium">Biriktirilgan Ustoz</th>
                          <th className="py-2.5 px-3 font-medium">Amaliyot Korxonasi</th>
                          <th className="py-2.5 px-3 font-medium">Shartnoma</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-100">
                        {filteredStudents.map((st) => (
                          <tr key={st.id} className="hover:bg-zinc-50/50">
                            <td className="py-3 px-3 font-mono font-bold text-violet-700 bg-violet-50/40 rounded-lg">
                              {st.id}
                            </td>
                            <td className="py-3 px-3 font-semibold text-zinc-900">{st.name}</td>
                            <td className="py-3 px-3 font-mono text-zinc-500">{st.group}</td>
                            <td className="py-3 px-3 font-mono text-zinc-600">{st.phone}</td>
                            <td className="py-3 px-3 text-zinc-700 font-medium">{st.teacher}</td>
                            <td className="py-3 px-3 text-zinc-700">{st.company}</td>
                            <td className="py-3 px-3">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                st.contract.startsWith('AMAL') 
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60' 
                                  : 'bg-amber-50 text-amber-700 border border-amber-200/60'
                              }`}>
                                {st.contract}
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

            {/* TAB 2-B: STUDENTS IMPORT */}
            {activeTab === 'students-import' && (
              <div className="space-y-6">
                <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-bold text-zinc-900">Talabalar Ro'yxatini Excel Orqali Ommaviy Yuklash (Bulk Import)</h3>
                      <p className="text-xs text-zinc-500 mt-0.5">Yuzlab talabalarni bitta fayl bilan bazaga kiritish va avtomatik ST-loginlar berish</p>
                    </div>
                    <button className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-white border border-zinc-200 text-zinc-700 rounded-xl text-xs font-medium hover:bg-zinc-50 shadow-sm">
                      <Download className="w-3.5 h-3.5" />
                      <span>Namunaviy Excel Shablonini Olish</span>
                    </button>
                  </div>

                  <div className="border-2 border-dashed border-zinc-200 rounded-2xl p-8 text-center hover:border-zinc-400 transition-colors cursor-pointer bg-zinc-50/50">
                    <FileSpreadsheet className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
                    <p className="text-xs font-bold text-zinc-800">.xlsx formatdagi Excel faylni shu yerga sudrab keling yoki tanlang</p>
                    <p className="text-[11px] text-zinc-400 mt-1">Ustunlar: F.I.SH | Guruh | Telefon | Kafedra | Korxona</p>
                    <input type="file" accept=".xlsx" className="hidden" />
                  </div>

                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200/60 text-xs text-emerald-800 flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Avtomatik Standart Tizim:</strong> Excel yuklanishi bilan har bir talabaga avtomatik ravishda <code>ST50XXXX</code> formatida 2 harf + 6 raqamli rasmiy login va <code>TIU2026!</code> boshlang'ich paroli beriladi.
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: TEACHERS */}
            {activeTab === 'teachers' && (
              <div className="space-y-6">
                <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 gap-3">
                    <div>
                      <h3 className="text-sm font-bold text-zinc-900">Kafedra Ustozlari Katalogi</h3>
                      <p className="text-xs text-zinc-500">Amaliyotga biriktirilgan ilmiy rahbarlar, ularning ilmiy darajalari va yuklamalari</p>
                    </div>

                    <button
                      onClick={() => setIsTeacherModalOpen(true)}
                      className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800 shadow-sm transition-all"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Yangi Ustoz Qo'shish</span>
                    </button>
                  </div>

                  {/* Search */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                    <div className="relative w-full sm:w-80">
                      <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-2.5" />
                      <input 
                        type="text" 
                        placeholder="F.I.SH, ID yoki Kafedra bo'yicha..."
                        value={teacherSearchTerm}
                        onChange={(e) => setTeacherSearchTerm(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-zinc-200 bg-white placeholder-zinc-400 focus:outline-none focus:border-zinc-900"
                      />
                    </div>
                    <span className="text-[11px] text-zinc-400">Jami: {filteredTeachers.length} nafar professor-o'qituvchi</span>
                  </div>

                  {/* Teachers Grid Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {filteredTeachers.map((tc) => (
                      <div key={tc.id} className="p-4 rounded-xl border border-zinc-200/80 bg-zinc-50/40 space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
                              {tc.id}
                            </span>
                            <h4 className="text-xs font-bold text-zinc-900 mt-1.5">{tc.name}</h4>
                            <p className="text-[11px] text-zinc-500">{tc.department}</p>
                          </div>

                          <span className="text-[10px] font-bold bg-white text-zinc-800 border border-zinc-200 px-2 py-0.5 rounded">
                            {tc.degree}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-zinc-600 pt-2 border-t border-zinc-200/60">
                          <span className="font-mono">{tc.phone}</span>
                          <span className="font-semibold text-emerald-700">
                            Biriktirilgan: {tc.studentCount} ta talaba
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4-A: CONTRACTS PENDING */}
            {(activeTab === 'contracts-pending' || activeTab === 'contracts') && (
              <div className="space-y-6">
                <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-zinc-100 gap-3">
                    <div>
                      <h3 className="text-sm font-bold text-zinc-900">Kutilayotgan Shartnoma Arizalari</h3>
                      <p className="text-xs text-zinc-500">Talabalar va korxonalar yuborgan 3 tomonlama arizalarni tekshirish va tasdiqlash</p>
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

                  <div className="space-y-3">
                    {applications.filter(a => a.status === 'SUBMITTED').length === 0 ? (
                      <div className="p-8 text-center text-zinc-400 bg-zinc-50 rounded-2xl border border-dashed border-zinc-200">
                        <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-500 mb-2" />
                        <p className="text-xs font-medium text-zinc-700">Kutilayotgan arizalar yo'q!</p>
                        <p className="text-[11px] text-zinc-400 mt-0.5">Barcha shartnomalar tasdiqlangan.</p>
                      </div>
                    ) : (
                      applications.filter(a => a.status === 'SUBMITTED').map((app) => (
                        <div key={app.id} className="p-4 rounded-xl border border-zinc-200/80 bg-zinc-50/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs font-bold text-zinc-900">{app.studentName}</span>
                              <span className="text-[11px] text-zinc-400 font-mono">({app.group})</span>
                              <span className="text-[10px] bg-amber-50 text-amber-700 border border-amber-200 px-1.5 py-0.2 rounded font-mono">
                                Sana: {app.date}
                              </span>
                            </div>
                            <p className="text-xs text-zinc-600 mt-1">
                              Korxona: <strong>{app.company}</strong> • Korxona Mentori: {app.mentor}
                            </p>
                          </div>

                          <button
                            onClick={() => handleApproveContract(app.id)}
                            className="inline-flex items-center space-x-1.5 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-medium hover:bg-emerald-700 shadow-sm transition-all"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Tasdiqlash & Shartnoma Generatsiya</span>
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4-B: CONTRACTS APPROVED */}
            {activeTab === 'contracts-approved' && (
              <div className="space-y-6">
                <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-4">
                  <div>
                    <h3 className="text-sm font-bold text-zinc-900">Tasdiqlangan 3 Tomonlama Shartnomalar</h3>
                    <p className="text-xs text-zinc-500">QR-kodli, rektorat buyrug'i va OTM muhri qo'yilgan rasmiy shartnomalar</p>
                  </div>

                  <div className="space-y-3">
                    {applications.filter(a => a.status === 'APPROVED').map((app) => (
                      <div key={app.id} className="p-4 rounded-xl border border-zinc-200/80 bg-zinc-50/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-bold text-zinc-900">{app.studentName}</span>
                            <span className="text-[11px] text-zinc-400 font-mono">({app.group})</span>
                            <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                              {app.contractNo}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-600 mt-1">Korxona: <strong>{app.company}</strong> • Mentor: {app.mentor}</p>
                        </div>

                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => {
                              setNotification(`${app.contractNo} PDF shartnomasi muvaffaqiyatli yuklab olindi!`);
                              setTimeout(() => setNotification(null), 3000);
                            }}
                            className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800 shadow-sm"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>PDF Yuklab olish</span>
                          </button>

                          <button 
                            onClick={() => {
                              setNotification(`${app.contractNo} Word (DOCX) shartnomasi muvaffaqiyatli yuklab olindi!`);
                              setTimeout(() => setNotification(null), 3000);
                            }}
                            className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-white border border-zinc-200 text-zinc-700 rounded-xl text-xs font-medium hover:bg-zinc-50"
                          >
                            <span>Word</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: PARTNERS */}
            {activeTab === 'partners' && (
              <div className="space-y-6">
                <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 gap-3">
                    <div>
                      <h3 className="text-sm font-bold text-zinc-900">Hamkor Tashkilotlar & Kvotalar Katalogi</h3>
                      <p className="text-xs text-zinc-500">Rasmiy memorandum va shartnoma imzolangan barcha korxonalar</p>
                    </div>
                    <span className="text-xs text-zinc-500">Jami faol hamkorlar: {partners.length} ta</span>
                  </div>

                  {/* Partner Company Cards with Brand Logos */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {partners.map((c) => (
                      <div key={c.id} className="p-5 rounded-2xl border border-zinc-200/80 bg-zinc-50/40 hover:bg-white transition-all space-y-3.5 shadow-xs">
                        {/* Company Header with Logo Badge */}
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-11 h-11 rounded-2xl ${c.logoBg} text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0`}>
                              {c.logoText}
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-zinc-900">{c.name}</h4>
                              <p className="text-[11px] text-zinc-400 mt-0.5">{c.category}</p>
                            </div>
                          </div>

                          <span className="text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200/60 px-2 py-0.5 rounded">
                            {c.occupied} / {c.quota} band
                          </span>
                        </div>

                        {/* Details */}
                        <div className="text-[11px] text-zinc-600 space-y-1 bg-white p-3 rounded-xl border border-zinc-200/60">
                          <div className="flex items-center space-x-1.5">
                            <span className="text-zinc-400 font-mono">STIR:</span>
                            <span className="font-mono font-bold text-zinc-800">{c.tin}</span>
                          </div>
                          <div>
                            <span className="text-zinc-400">Rahbar:</span> <span className="font-medium text-zinc-800">{c.dir}</span>
                          </div>
                          <div className="flex items-center space-x-1.5">
                            <Phone className="w-3 h-3 text-zinc-400 shrink-0" />
                            <span className="font-mono">{c.phone}</span>
                          </div>
                          <div className="flex items-start space-x-1.5">
                            <MapPin className="w-3 h-3 text-zinc-400 shrink-0 mt-0.5" />
                            <span className="text-zinc-500">{c.address}</span>
                          </div>
                        </div>

                        {/* Quota Progress */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px]">
                            <span className="text-zinc-400">{c.status}</span>
                            <span className="font-bold text-zinc-700">{Math.round((c.occupied / c.quota) * 100)}% to'lgan</span>
                          </div>
                          <div className="w-full bg-zinc-200 rounded-full h-1.5">
                            <div 
                              className="bg-zinc-900 h-1.5 rounded-full transition-all" 
                              style={{ width: `${(c.occupied / c.quota) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 6: REPORTS */}
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

            {/* TAB 7: SETTINGS */}
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
                      defaultValue="Alisher Qodirov"
                      className="w-full text-xs p-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-700 mb-1">Boshlang'ich Import Paroli</label>
                    <input 
                      type="text" 
                      defaultValue="TIU2026!"
                      className="w-full text-xs p-2.5 rounded-xl border border-zinc-200 bg-white font-mono text-zinc-900"
                    />
                    <p className="text-[11px] text-zinc-400 mt-1">Yangi kiritilgan barcha foydalanuvchilar uchun standart parol</p>
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

      {/* MODAL 1: YANGI TALABA QO'SHISH */}
      {isStudentModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-zinc-200/80 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-violet-50 text-violet-700 flex items-center justify-center">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-zinc-900">Yangi Talaba Qo'shish</h3>
                  <p className="text-[10px] text-zinc-400">Avtomatik ST-login va parol generatsiya qilinadi</p>
                </div>
              </div>
              <button 
                onClick={() => setIsStudentModalOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateStudent} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1">Talaba F.I.SH *</label>
                <input 
                  type="text" 
                  required
                  placeholder="Masalan: Sardor Ergashev"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-zinc-200 bg-white placeholder-zinc-400 text-zinc-900 focus:outline-none focus:border-zinc-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">Guruhi *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="DI-202-22"
                    value={newStudent.group}
                    onChange={(e) => setNewStudent({ ...newStudent, group: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-900 focus:outline-none focus:border-zinc-900 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">Telefoni *</label>
                  <input 
                    type="text" 
                    required
                    value={newStudent.phone}
                    onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-900 focus:outline-none focus:border-zinc-900 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1">Biriktiriladigan Ustoz *</label>
                <select
                  value={newStudent.teacher}
                  onChange={(e) => setNewStudent({ ...newStudent, teacher: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-900 focus:outline-none focus:border-zinc-900"
                >
                  {teachers.map(t => (
                    <option key={t.id} value={t.name}>{t.name} ({t.degree})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1">Amaliyot Korxonasi</label>
                <select
                  value={newStudent.company}
                  onChange={(e) => setNewStudent({ ...newStudent, company: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-900 focus:outline-none focus:border-zinc-900"
                >
                  {partners.map(p => (
                    <option key={p.id} value={p.name}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsStudentModalOpen(false)}
                  className="px-3.5 py-2 rounded-xl text-xs font-medium text-zinc-600 hover:bg-zinc-100"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800 shadow-sm transition-all"
                >
                  Talabani Saqlash va Login Yaratish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: YANGI USTOZ QO'SHISH */}
      {isTeacherModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-zinc-200/80 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-zinc-900">Yangi Ustoz Qo'shish</h3>
                  <p className="text-[10px] text-zinc-400">Avtomatik TC-login va parol generatsiya qilinadi</p>
                </div>
              </div>
              <button 
                onClick={() => setIsTeacherModalOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateTeacher} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1">Ustoz F.I.SH *</label>
                <input 
                  type="text" 
                  required
                  placeholder="Masalan: Professor Anvar Qosimov"
                  value={newTeacher.name}
                  onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-zinc-200 bg-white placeholder-zinc-400 text-zinc-900 focus:outline-none focus:border-zinc-900"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1">Kafedrasi *</label>
                <input 
                  type="text" 
                  required
                  value={newTeacher.department}
                  onChange={(e) => setNewTeacher({ ...newTeacher, department: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-900 focus:outline-none focus:border-zinc-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">Ilmiy darajasi *</label>
                  <select
                    value={newTeacher.degree}
                    onChange={(e) => setNewTeacher({ ...newTeacher, degree: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-900 focus:outline-none focus:border-zinc-900"
                  >
                    <option value="Dotsent">Dotsent</option>
                    <option value="Professor">Professor</option>
                    <option value="Katta o'qituvchi">Katta o'qituvchi</option>
                    <option value="Assistent">Assistent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">Telefoni *</label>
                  <input 
                    type="text" 
                    required
                    value={newTeacher.phone}
                    onChange={(e) => setNewTeacher({ ...newTeacher, phone: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-900 focus:outline-none focus:border-zinc-900 font-mono"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsTeacherModalOpen(false)}
                  className="px-3.5 py-2 rounded-xl text-xs font-medium text-zinc-600 hover:bg-zinc-100"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800 shadow-sm transition-all"
                >
                  Ustozni Saqlash va Login Yaratish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: YARATILGAN LOGIN/PAROL NATIJASI (COPY MODAL) */}
      {createdCredential && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-zinc-200 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div className="text-center">
              <h3 className="text-sm font-bold text-zinc-900">Muvaffaqiyatli Saqlandi!</h3>
              <p className="text-xs font-semibold text-zinc-700 mt-1">{createdCredential.name}</p>
              <p className="text-[10px] text-zinc-400">{createdCredential.sub}</p>
            </div>

            {/* Credentials Card */}
            <div className="bg-zinc-50 border border-zinc-200/80 rounded-xl p-3.5 space-y-2.5">
              <div>
                <span className="text-[10px] font-semibold text-zinc-400 block mb-0.5">Foydalanuvchi ID (Login):</span>
                <div className="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-zinc-200">
                  <span className="font-mono font-bold text-xs text-zinc-900 tracking-wider">
                    {createdCredential.login}
                  </span>
                  <button
                    onClick={() => copyToClipboard(createdCredential.login, true)}
                    className="text-zinc-500 hover:text-zinc-900 p-1 rounded hover:bg-zinc-100 transition-colors"
                    title="Nusxalash"
                  >
                    {copiedLogin ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-semibold text-zinc-400 block mb-0.5">Boshlang'ich Parol:</span>
                <div className="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-zinc-200">
                  <span className="font-mono font-bold text-xs text-zinc-900 tracking-wider">
                    {createdCredential.pass}
                  </span>
                  <button
                    onClick={() => copyToClipboard(createdCredential.pass, false)}
                    className="text-zinc-500 hover:text-zinc-900 p-1 rounded hover:bg-zinc-100 transition-colors"
                    title="Nusxalash"
                  >
                    {copiedPass ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            <p className="text-[10px] text-zinc-500 text-center leading-relaxed">
              Ushbu login va parolni nusxalab, foydalanuvchiga taqdim etishingiz mumkin.
            </p>

            <button
              onClick={() => {
                setCreatedCredential(null);
                setCopiedLogin(false);
                setCopiedPass(false);
              }}
              className="w-full py-2.5 bg-zinc-900 text-white rounded-xl text-xs font-semibold hover:bg-zinc-800 transition-all shadow-sm"
            >
              Tushunarli, Yopish
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
