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
  ChevronRight,
  AlertCircle,
  AlertTriangle,
  UserCheck,
  UserPlus,
  CalendarCheck
} from 'lucide-react';
import CollapsibleSidebar, { NavItem } from '@/components/CollapsibleSidebar';

interface StudentItem {
  id: string;
  name: string;
  group: string;
  phone: string;
  teacher: string;
  company: string;
  mentor: string;
  contract: string;
  attendance: string;
  score: string;
  status: 'FAOL' | 'KUTILMOQDA' | 'YAKUNLANGAN';
}

interface TeacherItem {
  id: string;
  name: string;
  department: string;
  degree: string;
  phone: string;
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
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [notification, setNotification] = useState<string | null>(null);
  const [orderNumber, setOrderNumber] = useState('B-104/26');

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [studentFilter, setStudentFilter] = useState<'all' | 'assigned' | 'unassigned' | 'active'>('all');
  const [teacherSearchTerm, setTeacherSearchTerm] = useState('');

  // Modals state
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentItem | null>(null);
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherItem | null>(null);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [assignStudentId, setAssignStudentId] = useState<string>('');

  // Credentials Result Modal state
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

  // State for inline teacher selection in Student Detail modal
  const [inlineTeacherSelect, setInlineTeacherSelect] = useState<string>('');

  // 1. Teachers Database State
  const [teachers, setTeachers] = useState<TeacherItem[]>([
    {
      id: 'TC309482',
      name: 'Dotsent Jamshid Karimov',
      department: 'Dasturiy injiniring kafedrasi',
      degree: 'Dotsent',
      phone: '+998 90 333 33 33'
    },
    {
      id: 'TC309483',
      name: 'Professor Farhod Umarov',
      department: 'Sun\'iy intellekt va algoritmlar',
      degree: 'Professor',
      phone: '+998 90 777 12 34'
    },
    {
      id: 'TC309484',
      name: 'Dotsent Aziz Nishonov',
      department: 'Kiberxavfsizlik kafedrasi',
      degree: 'Dotsent',
      phone: '+998 90 888 56 78'
    },
    {
      id: 'TC309485',
      name: 'Katta o\'qituvchi Nilufar Saidova',
      department: 'Raqamli iqtisodiyot va axborot tizimlari',
      degree: 'Katta o\'qituvchi',
      phone: '+998 90 999 43 21'
    }
  ]);

  // 2. Students Database State
  const [students, setStudents] = useState<StudentItem[]>([
    {
      id: 'ST501824',
      name: 'Bekzod Ergashev',
      group: 'DI-202-22',
      phone: '+998 90 555 55 55',
      teacher: 'Dotsent Jamshid Karimov',
      company: 'Uzum Technologies MCHJ',
      mentor: 'Sardor Bekmurodov',
      contract: 'AMAL-2026-0041',
      attendance: '100% (44/44 kun)',
      score: '48.5 / 50 ball',
      status: 'FAOL'
    },
    {
      id: 'ST501825',
      name: 'Sardor Rahimov',
      group: 'DI-202-22',
      phone: '+998 90 123 45 67',
      teacher: 'Dotsent Jamshid Karimov',
      company: 'Uzum Technologies MCHJ',
      mentor: 'Sardor Bekmurodov',
      contract: 'AMAL-2026-0042',
      attendance: '98.5% (42/60 kun)',
      score: '48.0 / 50 ball',
      status: 'FAOL'
    },
    {
      id: 'ST501826',
      name: 'Madina Karimova',
      group: 'DI-202-22',
      phone: '+998 90 234 56 78',
      teacher: 'Dotsent Jamshid Karimov',
      company: 'Uzum Technologies MCHJ',
      mentor: 'Sardor Bekmurodov',
      contract: 'AMAL-2026-0043',
      attendance: '95.0% (42/60 kun)',
      score: '49.0 / 50 ball',
      status: 'FAOL'
    },
    {
      id: 'ST501827',
      name: 'Javohir Toshmatov',
      group: 'DI-201-22',
      phone: '+998 90 345 67 89',
      teacher: 'Professor Farhod Umarov',
      company: 'IT Park Uzbekistan',
      mentor: 'Farrux Zokirov',
      contract: 'Kutilmoqda',
      attendance: '92.0% (40/60 kun)',
      score: '45.0 / 50 ball',
      status: 'KUTILMOQDA'
    },
    {
      id: 'ST501828',
      name: 'Zarnigor Aliyeva',
      group: 'DI-201-22',
      phone: '+998 90 456 78 90',
      teacher: 'Dotsent Aziz Nishonov',
      company: 'Click MCHJ',
      mentor: 'Aziz Nishonov',
      contract: 'Kutilmoqda',
      attendance: '100% (42/60 kun)',
      score: '47.5 / 50 ball',
      status: 'KUTILMOQDA'
    },
    {
      id: 'ST501829',
      name: 'Otabek Rustamov',
      group: 'DI-201-22',
      phone: '+998 90 678 12 34',
      teacher: 'Biriktirilmagan',
      company: 'IT Park Uzbekistan',
      mentor: 'Farrux Zokirov',
      contract: 'Kutilmoqda',
      attendance: '88.0% (35/60 kun)',
      score: 'Kutilmoqda',
      status: 'KUTILMOQDA'
    },
    {
      id: 'ST501830',
      name: 'Nilufar Qosimova',
      group: 'AI-101-23',
      phone: '+998 90 789 23 45',
      teacher: 'Biriktirilmagan',
      company: 'Aloqabank ATB',
      mentor: 'Kammuna Iriskulov',
      contract: 'Kutilmoqda',
      attendance: '94.0% (38/60 kun)',
      score: 'Kutilmoqda',
      status: 'KUTILMOQDA'
    },
    {
      id: 'ST501831',
      name: 'Doniyor Yusupov',
      group: 'AI-101-23',
      phone: '+998 90 890 34 56',
      teacher: 'Katta o\'qituvchi Nilufar Saidova',
      company: 'Aloqabank ATB',
      mentor: 'Kammuna Iriskulov',
      contract: 'AMAL-2026-0044',
      attendance: '96.0% (40/60 kun)',
      score: '46.0 / 50 ball',
      status: 'FAOL'
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

  // 1-to-Many: Calculate how many students are assigned to a teacher
  const getTeacherAssignedCount = (teacherName: string): number => {
    return students.filter(s => s.teacher === teacherName).length;
  };

  const getCapacityBadge = (count: number) => {
    if (count >= 8) {
      return {
        label: `${count} / 8 nafar (To'lgan)`,
        color: 'bg-rose-50 text-rose-700 border-rose-200/80',
        barColor: 'bg-rose-500'
      };
    }
    if (count >= 5) {
      return {
        label: `${count} / 8 nafar (Yuklama yaxshi)`,
        color: 'bg-amber-50 text-amber-700 border-amber-200/80',
        barColor: 'bg-amber-500'
      };
    }
    return {
      label: `${count} / 8 nafar (O'rin bor)`,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
      barColor: 'bg-emerald-500'
    };
  };

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
    const nextNum = Math.floor(501832 + Math.random() * 100000);
    const generatedLogin = `ST${nextNum}`;
    const initialPass = 'TIU2026!';

    const created: StudentItem = {
      id: generatedLogin,
      name: newStudent.name.trim(),
      group: newStudent.group,
      phone: newStudent.phone,
      teacher: newStudent.teacher,
      company: newStudent.company,
      mentor: 'Belgilanmoqda',
      contract: 'Kutilmoqda',
      attendance: '0% (0/60 kun)',
      score: 'Kutilmoqda',
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
    const nextNum = Math.floor(309486 + Math.random() * 100000);
    const generatedLogin = `TC${nextNum}`;
    const initialPass = 'TIU2026!';

    const created: TeacherItem = {
      id: generatedLogin,
      name: newTeacher.name.trim(),
      department: newTeacher.department,
      degree: newTeacher.degree,
      phone: newTeacher.phone
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

  const handleAssignTeacherToStudent = (studentId: string, teacherName: string) => {
    setStudents(students.map(s => s.id === studentId ? { ...s, teacher: teacherName } : s));
    if (selectedStudent && selectedStudent.id === studentId) {
      setSelectedStudent({ ...selectedStudent, teacher: teacherName });
    }
    setNotification(`Talaba muvaffaqiyatli ${teacherName} ga biriktirildi!`);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAssignStudentDirectly = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTeacher || !assignStudentId) return;
    
    setStudents(students.map(s => s.id === assignStudentId ? { ...s, teacher: selectedTeacher.name } : s));
    setIsAssignModalOpen(false);
    setAssignStudentId('');
    setNotification(`Talaba ${selectedTeacher.name} ga biriktirildi!`);
    setTimeout(() => setNotification(null), 3000);
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
  const unassignedCount = students.filter(s => !s.teacher || s.teacher === 'Biriktirilmagan').length;

  const DEKANAT_NAV_ITEMS: NavItem[] = [
    { 
      id: 'overview', 
      label: 'Asosiy', 
      icon: LayoutDashboard 
    },
    { 
      id: 'students', 
      label: 'Talabalar Boshqaruvi', 
      icon: GraduationCap,
      badge: `${students.length}`,
      subItems: [
        { 
          id: 'students-list', 
          label: 'Barcha Talabalar', 
          icon: Users, 
          badge: unassignedCount > 0 ? `${unassignedCount} ustozsiz` : `${students.length}` 
        },
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

  // Dynamic filter engine for Students
  const filteredStudents = students.filter(s => {
    const q = searchTerm.toLowerCase();
    const matchesSearch = 
      s.name.toLowerCase().includes(q) ||
      s.id.toLowerCase().includes(q) ||
      s.group.toLowerCase().includes(q) ||
      s.company.toLowerCase().includes(q) ||
      (s.teacher && s.teacher.toLowerCase().includes(q));

    if (!matchesSearch) return false;

    if (studentFilter === 'assigned') {
      return s.teacher && s.teacher !== 'Biriktirilmagan';
    }
    if (studentFilter === 'unassigned') {
      return !s.teacher || s.teacher === 'Biriktirilmagan';
    }
    if (studentFilter === 'active') {
      return s.contract && s.contract.startsWith('AMAL');
    }
    return true;
  });

  // Dynamic search engine for Teachers
  const filteredTeachers = teachers.filter(t => {
    const q = teacherSearchTerm.toLowerCase();
    return (
      t.name.toLowerCase().includes(q) ||
      t.department.toLowerCase().includes(q) ||
      t.id.toLowerCase().includes(q) ||
      t.degree.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col md:flex-row antialiased text-zinc-900">
      {/* Left Collapsible Animated Sidebar with Accordion Submenus */}
      <CollapsibleSidebar
        role="OTM_STAFF"
        roleTitle="Axborot Texnologiyalari Fakulteti Dekanati"
        userName="Alisher Qodirov"
        userSub="Fakultet Dekanati | Bosh mutaxassis"
        userBadge="DK204581"
        items={DEKANAT_NAV_ITEMS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top Header with Multi-Dekanat Faculty Scoping */}
        <header className="bg-white border-b border-zinc-200/80 px-6 py-3.5 hidden md:flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center space-x-3 min-w-0">
            <h1 className="text-sm font-bold text-zinc-900 whitespace-nowrap">Tashkent International University</h1>
            <span className="text-zinc-300">/</span>
            <span className="text-xs text-zinc-600 font-semibold truncate bg-blue-50/60 text-blue-900 px-2.5 py-1 rounded-lg border border-blue-100">
              Axborot Texnologiyalari Fakulteti Dekanati (DK204581)
            </span>
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
        <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          <main className="flex-1 space-y-6">
            {notification && (
              <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-4 flex items-center space-x-3 text-emerald-800 text-xs shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{notification}</span>
              </div>
            )}

            {/* TAB 1: ASOSIY DASHBOARD */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* 6 Core KPI Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* KPI 1: Jami Talabalar */}
                  <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-zinc-500">Jami Talabalar</span>
                      <div className="w-8 h-8 rounded-xl bg-zinc-100 text-zinc-700 flex items-center justify-center">
                        <GraduationCap className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="mt-3">
                      <p className="text-2xl font-bold text-zinc-900">{students.length} nafar</p>
                      <p className="text-[11px] text-zinc-500 mt-1">AT Fakulteti bo'yicha jami kontingent</p>
                    </div>
                  </div>

                  {/* KPI 2: Ustoz Biriktirilgan */}
                  <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-zinc-500">Ustozga Biriktirilgan</span>
                      <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                        <UserCheck className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="mt-3">
                      <p className="text-2xl font-bold text-emerald-600">
                        {students.filter(s => s.teacher && s.teacher !== 'Biriktirilmagan').length} nafar
                      </p>
                      <p className="text-[11px] text-emerald-700 mt-1 font-medium">
                        {Math.round((students.filter(s => s.teacher && s.teacher !== 'Biriktirilmagan').length / (students.length || 1)) * 100)}% ta'minlanganlik darajasi
                      </p>
                    </div>
                  </div>

                  {/* KPI 3: Ustozsizlar Ogohlantirishi */}
                  <div 
                    onClick={() => {
                      setActiveTab('students-list');
                      setStudentFilter('unassigned');
                    }}
                    className={`rounded-2xl p-5 border shadow-xs cursor-pointer transition-all flex flex-col justify-between ${
                      unassignedCount > 0 
                        ? 'bg-amber-50/40 border-amber-300 hover:border-amber-400' 
                        : 'bg-white border-zinc-200/80 hover:border-zinc-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-amber-900">Ustozsiz Talabalar</span>
                      <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                        <AlertTriangle className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex items-baseline space-x-2">
                        <p className="text-2xl font-bold text-amber-900">{unassignedCount} nafar</p>
                        {unassignedCount > 0 && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-200/70 text-amber-900 uppercase">
                            Diqqat
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-amber-700 mt-1 font-medium">
                        {unassignedCount > 0 ? 'Zudlik bilan biriktirish uchun bosing' : "Ustozsiz talaba mavjud emas"}
                      </p>
                    </div>
                  </div>

                  {/* KPI 4: Hamkor Korxonalar */}
                  <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-zinc-500">Hamkor Korxonalar</span>
                      <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                        <Briefcase className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="mt-3">
                      <p className="text-2xl font-bold text-zinc-900">{partners.length} ta</p>
                      <p className="text-[11px] text-zinc-500 mt-1">
                        Jami kvota: {partners.reduce((acc, p) => acc + p.quota, 0)} ta (band: {partners.reduce((acc, p) => acc + p.occupied, 0)})
                      </p>
                    </div>
                  </div>

                  {/* KPI 5: Kafedra Ustozlari */}
                  <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-zinc-500">Kafedra Ustozlari</span>
                      <div className="w-8 h-8 rounded-xl bg-violet-50 text-violet-700 flex items-center justify-center">
                        <BookOpen className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="mt-3">
                      <p className="text-2xl font-bold text-zinc-900">{teachers.length} nafar</p>
                      <p className="text-[11px] text-emerald-700 mt-1 font-medium">
                        O'rtacha yuklama: {(students.length / (teachers.length || 1)).toFixed(1)} / 8 nafar
                      </p>
                    </div>
                  </div>

                  {/* KPI 6: Kutilayotgan Shartnomalar */}
                  <div 
                    onClick={() => setActiveTab('contracts-pending')}
                    className="bg-white border border-zinc-200/80 hover:border-zinc-300 rounded-2xl p-5 shadow-xs cursor-pointer transition-all flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-zinc-500">Kutilayotgan Shartnomalar</span>
                      <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
                        <FileText className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="mt-3">
                      <p className="text-2xl font-bold text-zinc-900">{pendingCount} ta</p>
                      <p className="text-[11px] text-indigo-600 mt-1 font-medium">
                        Tasdiqlash va 3-tomonlama QR-muhr kutilmoqda
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Actions Bar */}
                <div className="bg-zinc-50 border border-zinc-200/80 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-zinc-700 uppercase tracking-wider">Tezkor Harakatlar:</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => setIsStudentModalOpen(true)}
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800 transition-all shadow-xs"
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>Yangi Talaba</span>
                    </button>
                    <button
                      onClick={() => setIsTeacherModalOpen(true)}
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-white border border-zinc-200 text-zinc-800 rounded-xl text-xs font-medium hover:bg-zinc-100 transition-all shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Yangi Ustoz</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('students-import')}
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-white border border-zinc-200 text-zinc-800 rounded-xl text-xs font-medium hover:bg-zinc-100 transition-all shadow-xs"
                    >
                      <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Excel Import</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('contracts-pending')}
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-white border border-zinc-200 text-zinc-800 rounded-xl text-xs font-medium hover:bg-zinc-100 transition-all shadow-xs"
                    >
                      <FileText className="w-3.5 h-3.5 text-blue-600" />
                      <span>Arizalar ({pendingCount})</span>
                    </button>
                  </div>
                </div>

                {/* 2-Column: Department Progress & Recent Applications */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Column: Progress per Department (7 cols) */}
                  <div className="lg:col-span-7 bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
                      <div>
                        <h3 className="text-sm font-bold text-zinc-900">Kafedralar Kesimida Amaliyot Progressi</h3>
                        <p className="text-xs text-zinc-500">Amaliyot shartnomalari va ustoz biriktirilishi monitoringi</p>
                      </div>
                      <span className="text-[11px] font-mono font-bold text-zinc-500 bg-zinc-100 px-2.5 py-1 rounded-lg">
                        Semestr: 2026-Bahor
                      </span>
                    </div>
                    
                    <div className="space-y-4 pt-1">
                      {[
                        { dept: 'Dasturiy injiniring kafedrasi', students: '320 nafar', pct: '97%', status: 'A\'lo' },
                        { dept: 'Sun\'iy intellekt va algoritmlar', students: '240 nafar', pct: '95%', status: 'A\'lo' },
                        { dept: 'Raqamli iqtisodiyot va moliya', students: '410 nafar', pct: '91%', status: 'Yaxshi' },
                        { dept: 'Kiberxavfsizlik va axborot himoyasi', students: '270 nafar', pct: '96%', status: 'A\'lo' }
                      ].map((d, i) => (
                        <div key={i} className="space-y-1.5">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-semibold text-zinc-800">{d.dept}</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-zinc-500 font-mono text-[11px]">{d.students}</span>
                              <span className="font-bold text-zinc-900">{d.pct}</span>
                            </div>
                          </div>
                          <div className="w-full bg-zinc-100 rounded-full h-2 overflow-hidden">
                            <div 
                              className="bg-zinc-900 h-2 rounded-full transition-all duration-500" 
                              style={{ width: d.pct }} 
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Recent Applications Feed (5 cols) */}
                  <div className="lg:col-span-5 bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
                        <div>
                          <h3 className="text-sm font-bold text-zinc-900">So'nggi Amaliyot Arizalari</h3>
                          <p className="text-xs text-zinc-500">Kutilayotgan va tasdiqlangan hujjatlar</p>
                        </div>
                        <button 
                          onClick={() => setActiveTab('contracts-pending')}
                          className="text-xs text-blue-600 hover:text-blue-800 font-semibold"
                        >
                          Barchasi
                        </button>
                      </div>

                      <div className="divide-y divide-zinc-100 mt-2">
                        {applications.slice(0, 4).map((app) => (
                          <div key={app.id} className="py-2.5 flex items-center justify-between gap-3">
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-bold text-zinc-900 truncate">{app.studentName}</p>
                              <p className="text-[11px] text-zinc-500 truncate">{app.group} | {app.company}</p>
                            </div>
                            <div className="shrink-0 text-right">
                              {app.status === 'APPROVED' ? (
                                <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-[10px] font-bold">
                                  <Check className="w-3 h-3" />
                                  <span>Tasdiqlangan</span>
                                </span>
                              ) : (
                                <button
                                  onClick={() => handleApproveContract(app.id)}
                                  className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-[10px] font-medium transition-colors shadow-xs"
                                >
                                  <span>Tasdiqlash</span>
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
                      <span>Jami arizalar: {applications.length} ta</span>
                      <span className="font-semibold text-emerald-600">{approvedCount} ta tasdiqlangan</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2-A: STUDENTS LIST & ADVANCED SEARCH & FILTERS */}
            {(activeTab === 'students-list' || activeTab === 'students') && (
              <div className="space-y-6">
                <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 gap-3">
                    <div>
                      <h3 className="text-sm font-bold text-zinc-900">Fakultet Talabalari Boshqaruvi</h3>
                      <p className="text-xs text-zinc-500">Talaba ma'lumotlarini ko'rish yoki ustoz biriktirish uchun talaba qatori ustiga bosing</p>
                    </div>

                    <button
                      onClick={() => setIsStudentModalOpen(true)}
                      className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800 shadow-sm transition-all"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Yangi Talaba Qo'shish</span>
                    </button>
                  </div>

                  {/* Real-time Search and Filter Pills */}
                  <div className="space-y-3 pt-2">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                      <div className="relative w-full sm:w-96">
                        <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-2.5" />
                        <input 
                          type="text" 
                          placeholder="Ism, ID (ST######), Guruh (DI-202-22) yoki Korxona..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-zinc-200 bg-white placeholder-zinc-400 focus:outline-none focus:border-zinc-900 font-sans"
                        />
                      </div>
                      <span className="text-[11px] text-zinc-400">Natija: {filteredStudents.length} / {students.length} nafar</span>
                    </div>

                    {/* Filter Pills */}
                    <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-zinc-100">
                      <button
                        onClick={() => setStudentFilter('all')}
                        className={`px-3 py-1 rounded-xl text-xs font-medium transition-all ${
                          studentFilter === 'all'
                            ? 'bg-zinc-900 text-white shadow-xs'
                            : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700'
                        }`}
                      >
                        Barchasi ({students.length})
                      </button>

                      <button
                        onClick={() => setStudentFilter('assigned')}
                        className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-xl text-xs font-medium transition-all ${
                          studentFilter === 'assigned'
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/60'
                        }`}
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>Ustoz biriktirilgan ({students.length - unassignedCount})</span>
                      </button>

                      <button
                        onClick={() => setStudentFilter('unassigned')}
                        className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-xl text-xs font-medium transition-all ${
                          studentFilter === 'unassigned'
                            ? 'bg-amber-600 text-white shadow-xs'
                            : 'bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200/80'
                        }`}
                      >
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Ustozsizlar ({unassignedCount})</span>
                      </button>

                      <button
                        onClick={() => setStudentFilter('active')}
                        className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-xl text-xs font-medium transition-all ${
                          studentFilter === 'active'
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200/60'
                        }`}
                      >
                        <FileCheck className="w-3.5 h-3.5" />
                        <span>Faol amaliyotda ({students.filter(s => s.contract.startsWith('AMAL')).length})</span>
                      </button>
                    </div>
                  </div>

                  {/* Interactive Students Table */}
                  <div className="overflow-x-auto pt-2">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-zinc-50 text-zinc-500 border-b border-zinc-200">
                        <tr>
                          <th className="py-2.5 px-3 font-medium">Login (ID)</th>
                          <th className="py-2.5 px-3 font-medium">Talaba F.I.SH</th>
                          <th className="py-2.5 px-3 font-medium">Guruhi</th>
                          <th className="py-2.5 px-3 font-medium">Biriktirilgan Ustoz</th>
                          <th className="py-2.5 px-3 font-medium">Amaliyot Korxonasi</th>
                          <th className="py-2.5 px-3 font-medium">Shartnoma</th>
                          <th className="py-2.5 px-3 font-medium text-right">Amal</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-100">
                        {filteredStudents.length === 0 ? (
                          <tr>
                            <td colSpan={7} className="py-8 text-center text-zinc-400">
                              Qidiruv bo'yicha hech qanday talaba topilmadi.
                            </td>
                          </tr>
                        ) : (
                          filteredStudents.map((st) => {
                            const isUnassigned = !st.teacher || st.teacher === 'Biriktirilmagan';

                            return (
                              <tr 
                                key={st.id} 
                                onClick={() => setSelectedStudent(st)}
                                className="hover:bg-zinc-50 cursor-pointer transition-colors group"
                              >
                                <td className="py-3 px-3 font-mono font-bold text-violet-700">
                                  {st.id}
                                </td>
                                <td className="py-3 px-3 font-semibold text-zinc-900 group-hover:text-blue-600 transition-colors">
                                  {st.name}
                                </td>
                                <td className="py-3 px-3 font-mono text-zinc-500">{st.group}</td>
                                <td className="py-3 px-3">
                                  {isUnassigned ? (
                                    <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                                      <AlertCircle className="w-3 h-3 text-rose-600" />
                                      <span>Ustozsiz</span>
                                    </span>
                                  ) : (
                                    <span className="text-zinc-800 font-medium">{st.teacher}</span>
                                  )}
                                </td>
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
                                <td className="py-3 px-3 text-right">
                                  <span className="text-[11px] text-zinc-400 group-hover:text-zinc-900 underline font-medium">
                                    Batafsil
                                  </span>
                                </td>
                              </tr>
                            );
                          })
                        )}
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

            {/* TAB 3: TEACHERS CATALOG & 1-TO-MANY CAPACITY */}
            {activeTab === 'teachers' && (
              <div className="space-y-6">
                <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 gap-3">
                    <div>
                      <h3 className="text-sm font-bold text-zinc-900">Kafedra Ustozlari Katalogi (1-to-Many Yuklama)</h3>
                      <p className="text-xs text-zinc-500">Maksimal limit: har bir ustozga 8 nafargacha amaliyotchi talaba biriktiriladi. Ustoz ustiga bosib talabalarini ko'ring.</p>
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
                    <div className="relative w-full sm:w-96">
                      <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-2.5" />
                      <input 
                        type="text" 
                        placeholder="Ism, ID (TC######), Kafedra yoki Unvon bo'yicha..."
                        value={teacherSearchTerm}
                        onChange={(e) => setTeacherSearchTerm(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-zinc-200 bg-white placeholder-zinc-400 focus:outline-none focus:border-zinc-900"
                      />
                    </div>
                    <span className="text-[11px] text-zinc-400">Jami: {filteredTeachers.length} nafar ilmiy rahbar</span>
                  </div>

                  {/* Teachers Grid Cards with Clickable Detail Trigger */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {filteredTeachers.map((tc) => {
                      const assignedCount = getTeacherAssignedCount(tc.name);
                      const badgeInfo = getCapacityBadge(assignedCount);

                      return (
                        <div 
                          key={tc.id} 
                          onClick={() => setSelectedTeacher(tc)}
                          className="p-5 rounded-2xl border border-zinc-200/80 bg-zinc-50/40 hover:bg-white hover:border-zinc-300 transition-all cursor-pointer space-y-3.5 shadow-xs group"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
                                {tc.id}
                              </span>
                              <h4 className="text-xs font-bold text-zinc-900 group-hover:text-blue-600 transition-colors mt-1.5">
                                {tc.name}
                              </h4>
                              <p className="text-[11px] text-zinc-500">{tc.department}</p>
                            </div>

                            <span className="text-[10px] font-bold bg-white text-zinc-800 border border-zinc-200 px-2.5 py-0.5 rounded-lg">
                              {tc.degree}
                            </span>
                          </div>

                          {/* Workload Capacity Indicator */}
                          <div className="space-y-1.5 bg-white p-3 rounded-xl border border-zinc-200/60">
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-zinc-500 font-medium">Akademik Yuklama:</span>
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${badgeInfo.color}`}>
                                {badgeInfo.label}
                              </span>
                            </div>
                            <div className="w-full bg-zinc-100 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full transition-all ${badgeInfo.barColor}`} 
                                style={{ width: `${Math.min((assignedCount / 8) * 100, 100)}%` }}
                              />
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-[11px] text-zinc-600 pt-1">
                            <span className="font-mono text-zinc-500">{tc.phone}</span>
                            <span className="font-medium text-zinc-900 underline flex items-center space-x-1">
                              <span>Talabalarini ko'rish</span>
                              <ChevronRight className="w-3.5 h-3.5 inline" />
                            </span>
                          </div>
                        </div>
                      );
                    })}
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

      {/* DETAIL MODAL A: TALABA MA'LUMOTLARI VA USTOZ BIRIKTIRISH */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-zinc-200 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-3 border-b border-zinc-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-violet-50 text-violet-700 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-sm font-bold text-zinc-900">{selectedStudent.name}</h3>
                    <span className="font-mono text-[10px] font-bold text-violet-700 bg-violet-50 px-2 py-0.5 rounded border border-violet-200">
                      {selectedStudent.id}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    Guruhi: <span className="font-mono font-semibold text-zinc-700">{selectedStudent.group}</span> • Tel: <span className="font-mono text-zinc-700">{selectedStudent.phone}</span>
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedStudent(null)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Teacher Section (Assigned or Unassigned Inline Assignment) */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-zinc-900">Kafedra Ilmiy Rahbari (Ustoz):</h4>
              {(!selectedStudent.teacher || selectedStudent.teacher === 'Biriktirilmagan') ? (
                <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/40 space-y-3">
                  <div className="flex items-center space-x-2 text-rose-800 text-xs font-semibold">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>Hozircha ustoz biriktirilmagan!</span>
                  </div>
                  <p className="text-[11px] text-rose-700 leading-relaxed">
                    Ushbu talabaga kafedra o'qituvchilaridan birini tanlab zudlik bilan biriktiring:
                  </p>
                  <div className="flex items-center space-x-2">
                    <select
                      value={inlineTeacherSelect}
                      onChange={(e) => setInlineTeacherSelect(e.target.value)}
                      className="flex-1 text-xs p-2 rounded-xl border border-zinc-300 bg-white text-zinc-900"
                    >
                      <option value="">-- Ustozni tanlang --</option>
                      {teachers.map(t => {
                        const count = getTeacherAssignedCount(t.name);
                        return (
                          <option key={t.id} value={t.name}>
                            {t.name} ({count}/8 nafar yuklama)
                          </option>
                        );
                      })}
                    </select>
                    <button
                      disabled={!inlineTeacherSelect}
                      onClick={() => {
                        if (inlineTeacherSelect) {
                          handleAssignTeacherToStudent(selectedStudent.id, inlineTeacherSelect);
                          setInlineTeacherSelect('');
                        }
                      }}
                      className="px-3.5 py-2 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800 disabled:opacity-50 transition-all shadow-xs"
                    >
                      Biriktirish
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-3.5 rounded-xl border border-zinc-200 bg-zinc-50 flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-lg bg-white border border-zinc-200 flex items-center justify-center text-amber-700">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-zinc-900">{selectedStudent.teacher}</p>
                      <p className="text-[10px] text-zinc-400">Dasturiy injiniring kafedrasi</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const newT = prompt('Yangi ustoz ismini tanlang:', selectedStudent.teacher);
                      if (newT && newT !== selectedStudent.teacher) {
                        handleAssignTeacherToStudent(selectedStudent.id, newT);
                      }
                    }}
                    className="text-xs text-zinc-600 hover:text-zinc-900 underline font-medium"
                  >
                    O'zgartirish
                  </button>
                </div>
              )}
            </div>

            {/* Internship Progress & Company Section */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-zinc-900">Amaliyot & Shartnoma Tafsilotlari:</h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl border border-zinc-200/80 bg-zinc-50/50">
                  <span className="text-[10px] text-zinc-400 block">Korxona:</span>
                  <p className="font-semibold text-zinc-900 mt-0.5">{selectedStudent.company}</p>
                  <p className="text-[11px] text-zinc-500">Mentori: {selectedStudent.mentor}</p>
                </div>

                <div className="p-3 rounded-xl border border-zinc-200/80 bg-zinc-50/50">
                  <span className="text-[10px] text-zinc-400 block">Shartnoma Raqami:</span>
                  <p className="font-mono font-bold text-emerald-700 mt-0.5">{selectedStudent.contract}</p>
                  <p className="text-[11px] text-zinc-400">Rektorat buyrug'i: {orderNumber}</p>
                </div>

                <div className="p-3 rounded-xl border border-zinc-200/80 bg-zinc-50/50">
                  <span className="text-[10px] text-zinc-400 block">Davomat ko'rsatkichi:</span>
                  <p className="font-bold text-zinc-900 mt-0.5">{selectedStudent.attendance}</p>
                </div>

                <div className="p-3 rounded-xl border border-zinc-200/80 bg-zinc-50/50">
                  <span className="text-[10px] text-zinc-400 block">Joriy Baho:</span>
                  <p className="font-bold text-emerald-600 mt-0.5">{selectedStudent.score}</p>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedStudent(null)}
                className="px-4 py-2 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800 transition-all shadow-sm"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DETAIL MODAL B: USTOZ MA'LUMOTLARI VA UNGA BIRIKTIRILGAN TALABALAR */}
      {selectedTeacher && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-zinc-200 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-3 border-b border-zinc-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-sm font-bold text-zinc-900">{selectedTeacher.name}</h3>
                    <span className="font-mono text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      {selectedTeacher.id}
                    </span>
                    <span className="text-[10px] font-bold text-zinc-700 bg-zinc-100 px-2 py-0.5 rounded">
                      {selectedTeacher.degree}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    {selectedTeacher.department} • Tel: <span className="font-mono text-zinc-700">{selectedTeacher.phone}</span>
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedTeacher(null)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Capacity status */}
            <div className="p-3.5 rounded-xl border border-zinc-200 bg-zinc-50 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-zinc-800">1-to-Many Akademik Yuklama:</span>
                <p className="text-[11px] text-zinc-500">Maksimal me'yor 8 nafar talabani tashkil etadi.</p>
              </div>
              <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${getCapacityBadge(getTeacherAssignedCount(selectedTeacher.name)).color}`}>
                {getCapacityBadge(getTeacherAssignedCount(selectedTeacher.name)).label}
              </span>
            </div>

            {/* List of Students assigned to this teacher */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-zinc-900">
                  Ushbu ustozga biriktirilgan talabalar ({getTeacherAssignedCount(selectedTeacher.name)} nafar):
                </h4>
                
                {getTeacherAssignedCount(selectedTeacher.name) < 8 && (
                  <button
                    onClick={() => setIsAssignModalOpen(true)}
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800 shadow-xs"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>+ Talaba biriktirish</span>
                  </button>
                )}
              </div>

              <div className="overflow-x-auto border border-zinc-200/80 rounded-xl">
                <table className="w-full text-xs text-left">
                  <thead className="bg-zinc-50 text-zinc-500 border-b border-zinc-200">
                    <tr>
                      <th className="py-2.5 px-3 font-medium">ID</th>
                      <th className="py-2.5 px-3 font-medium">Talaba F.I.SH</th>
                      <th className="py-2.5 px-3 font-medium">Guruhi</th>
                      <th className="py-2.5 px-3 font-medium">Korxona</th>
                      <th className="py-2.5 px-3 font-medium">Shartnoma</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {students.filter(s => s.teacher === selectedTeacher.name).length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-6 text-center text-zinc-400">
                          Ushbu ustozga hozircha hech qanday talaba biriktirilmagan.
                        </td>
                      </tr>
                    ) : (
                      students.filter(s => s.teacher === selectedTeacher.name).map((st) => (
                        <tr key={st.id} className="hover:bg-zinc-50">
                          <td className="py-2.5 px-3 font-mono font-bold text-violet-700">{st.id}</td>
                          <td className="py-2.5 px-3 font-semibold text-zinc-900">{st.name}</td>
                          <td className="py-2.5 px-3 font-mono text-zinc-500">{st.group}</td>
                          <td className="py-2.5 px-3 text-zinc-700">{st.company}</td>
                          <td className="py-2.5 px-3 font-mono text-emerald-700">{st.contract}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedTeacher(null)}
                className="px-4 py-2 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800 transition-all shadow-sm"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QUICK MODAL: BIRIKTIRISH MODALI */}
      {isAssignModalOpen && selectedTeacher && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-zinc-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <h3 className="text-xs font-bold text-zinc-900">{selectedTeacher.name} ga talaba biriktirish</h3>
              <button onClick={() => setIsAssignModalOpen(false)} className="p-1 rounded-lg hover:bg-zinc-100">
                <X className="w-4 h-4 text-zinc-400" />
              </button>
            </div>

            <form onSubmit={handleAssignStudentDirectly} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1">Talabani tanlang:</label>
                <select
                  required
                  value={assignStudentId}
                  onChange={(e) => setAssignStudentId(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-zinc-300 bg-white text-zinc-900"
                >
                  <option value="">-- Talabani tanlang --</option>
                  {students.filter(s => s.teacher !== selectedTeacher.name).map(s => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.group}) — {s.teacher === 'Biriktirilmagan' ? 'Ustozsiz' : s.teacher}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAssignModalOpen(false)}
                  className="px-3.5 py-2 rounded-xl text-xs text-zinc-600 hover:bg-zinc-100"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800"
                >
                  Biriktirish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
                  <option value="Biriktirilmagan">-- Hozircha biriktirilmasin --</option>
                  {teachers.map(t => {
                    const count = getTeacherAssignedCount(t.name);
                    return (
                      <option key={t.id} value={t.name}>
                        {t.name} ({count}/8 nafar yuklama)
                      </option>
                    );
                  })}
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
