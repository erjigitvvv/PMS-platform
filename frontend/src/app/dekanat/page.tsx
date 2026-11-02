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
  CalendarCheck,
  Bell,
  Trash2,
  RefreshCw
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

interface NotificationItem {
  id: string;
  title: string;
  desc: string;
  time: string;
  unread: boolean;
  type: string;
}

const DEKANAT_NAV_ITEMS: NavItem[] = [
  { id: 'overview', label: 'Asosiy', icon: LayoutDashboard },
  { id: 'students-list', label: 'Talabalar Boshqaruvi', icon: GraduationCap, badge: '8' },
  { id: 'teachers', label: 'Kafedra Ustozlari', icon: BookOpen, badge: '4' },
  { id: 'contracts-pending', label: 'Shartnomalar & Arizalar', icon: FileText },
  { id: 'partners', label: 'Hamkor Tashkilotlar', icon: Briefcase, badge: '4' },
  { id: 'settings', label: 'Sozlamalar', icon: Settings },
];

export default function DekanatDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [notification, setNotification] = useState<string | null>(null);
  const [orderNumber, setOrderNumber] = useState('B-104/26');

  // Notification Popover state
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notificationsList, setNotificationsList] = useState<NotificationItem[]>([
    { id: 'n1', title: 'Yangi Shartnoma Arizasi', desc: 'Javohir Toshmatov (DI-201-22) IT Park bilan shartnoma kiritdi.', time: '10 daqiqa oldin', unread: true, type: 'contract' },
    { id: 'n2', title: 'Ustozsiz Talaba Aniqlandi', desc: 'Otabek Rustamov va Nilufar Qosimova uchun ustoz biriktirilmagan.', time: '1 soat oldin', unread: true, type: 'warning' },
    { id: 'n3', title: 'Mentor Baholashi', desc: 'Sardor Bekmurodov 3 nafar talabaga 48+ ball qo\'ydi.', time: '3 soat oldin', unread: true, type: 'score' },
    { id: 'n4', title: 'Davomat Ogohlantirishi', desc: '1 nafar talaba 3 kundan ortiq kundalik yozmagan.', time: 'Kecha', unread: false, type: 'alert' }
  ]);

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [studentFilter, setStudentFilter] = useState<'all' | 'assigned' | 'unassigned' | 'active'>('all');
  const [groupFilter, setGroupFilter] = useState<string>('ALL');
  const [teacherSearchTerm, setTeacherSearchTerm] = useState('');
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);

  // Modals state
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
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
    teacher: '',
    company: ''
  });

  const [newTeacher, setNewTeacher] = useState({
    name: '',
    department: 'Dasturiy injiniring kafedrasi',
    degree: 'Dotsent',
    phone: '+998 90 '
  });

  const [newPartner, setNewPartner] = useState({
    name: '',
    shortName: '',
    category: 'Fintech & IT',
    quota: 10,
    tin: '',
    dir: '',
    phone: '+998 71 ',
    address: ''
  });

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
      attendance: '38.0% (3/60 kun)', // Early warning candidate
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
      attendance: '42.0% (4/60 kun)', // Early warning candidate
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

  const getTeacherAssignedCount = (teacherName: string) => {
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

    const nextNum = Math.floor(501832 + Math.random() * 100000);
    const generatedLogin = `ST${nextNum}`;
    const initialPass = 'TIU2026!';

    const created: StudentItem = {
      id: generatedLogin,
      name: newStudent.name.trim(),
      group: newStudent.group,
      phone: newStudent.phone,
      teacher: newStudent.teacher ? newStudent.teacher : 'Biriktirilmagan',
      company: newStudent.company ? newStudent.company : 'Biriktirilmagan',
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
      teacher: '',
      company: ''
    });
  };

  const handleCreateTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeacher.name.trim()) return;

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
      sub: `${created.department} (${created.degree})`
    });

    setNewTeacher({
      name: '',
      department: 'Dasturiy injiniring kafedrasi',
      degree: 'Dotsent',
      phone: '+998 90 '
    });
  };

  const handleCreatePartner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPartner.name.trim()) return;

    const generatedId = `c_${partners.length + 1}`;
    const initials = newPartner.shortName ? newPartner.shortName.toUpperCase() : newPartner.name.substring(0, 2).toUpperCase();
    const colors = ['bg-indigo-600', 'bg-blue-600', 'bg-emerald-600', 'bg-violet-600', 'bg-amber-600'];
    const randomBg = colors[partners.length % colors.length];

    const created: PartnerCompany = {
      id: generatedId,
      name: newPartner.name.trim(),
      shortName: newPartner.shortName || initials,
      logoBg: randomBg,
      logoText: initials,
      tin: newPartner.tin || '308999123',
      dir: newPartner.dir || 'Direktor',
      phone: newPartner.phone,
      address: newPartner.address || 'Toshkent sh.',
      quota: Number(newPartner.quota) || 10,
      occupied: 0,
      category: newPartner.category,
      status: 'Yangi Hamkorlik memorandumi'
    };

    setPartners([...partners, created]);
    setIsPartnerModalOpen(false);
    setNewPartner({
      name: '',
      shortName: '',
      category: 'Fintech & IT',
      quota: 10,
      tin: '',
      dir: '',
      phone: '+998 71 ',
      address: ''
    });
    setNotification('Yangi hamkor tashkilot muvaffaqiyatli qo\'shildi!');
    setTimeout(() => setNotification(null), 3000);
  };

  // Filter students based on active subtab & search & group filter
  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.company.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesGroup = groupFilter === 'ALL' || s.group === groupFilter;

    if (activeTab === 'students-unassigned' || studentFilter === 'unassigned') {
      return matchesSearch && matchesGroup && (s.teacher === 'Biriktirilmagan' || !s.teacher);
    }
    if (activeTab === 'students-companies' || studentFilter === 'assigned') {
      return matchesSearch && matchesGroup && s.company !== 'Biriktirilmagan';
    }
    if (studentFilter === 'active') {
      return matchesSearch && matchesGroup && s.status === 'FAOL';
    }
    return matchesSearch && matchesGroup;
  });

  const filteredTeachers = teachers.filter(tc =>
    tc.name.toLowerCase().includes(teacherSearchTerm.toLowerCase()) ||
    tc.id.toLowerCase().includes(teacherSearchTerm.toLowerCase()) ||
    tc.department.toLowerCase().includes(teacherSearchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col antialiased selection:bg-zinc-900 selection:text-white">
      {/* Toast Notification Banner */}
      {notification && (
        <div className="fixed top-5 right-5 z-50 bg-zinc-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center space-x-3 text-xs border border-zinc-700 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      <div className="flex flex-1">
        {/* Sidebar */}
        <CollapsibleSidebar
          role="OTM_STAFF"
          roleTitle="Dekanat Boshqaruvi"
          userName="Alisher Qodirov"
          userSub="Dekanat OTM Monitoringi"
          userBadge="OTM_STAFF"
          items={DEKANAT_NAV_ITEMS}
          activeTab={activeTab}
          onTabChange={(id) => {
            if (id === 'students-section' || id === 'contracts-section') return;
            setActiveTab(id);
          }}
          onLogout={() => router.push('/login')}
        />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* Top Header Bar */}
          <header className="sticky top-0 z-30 bg-white border-b border-zinc-200/80 px-6 py-3.5 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200/60">
                DEKANAT PORTALI
              </span>
              <h1 className="text-sm font-bold text-zinc-900 hidden sm:inline">
                Tashkent International University — Amaliyot Boshqaruvi
              </h1>
            </div>

            <div className="flex items-center space-x-3 relative">
              {/* Notification Popover Bell */}
              <div className="relative">
                <button
                  onClick={() => setIsNotifOpen(!isNotifOpen)}
                  className="relative p-2 rounded-xl border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition-all"
                  title="Bildirishnomalar Markazi"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[9px] font-bold flex items-center justify-center">
                    3
                  </span>
                </button>

                {/* Popover Card */}
                {isNotifOpen && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-zinc-200/90 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                      <div className="flex items-center space-x-2">
                        <Bell className="w-4 h-4 text-blue-600" />
                        <h3 className="text-xs font-bold text-zinc-900">Bildirishnomalar Markazi</h3>
                      </div>
                      <button
                        onClick={() => {
                          setNotificationsList(notificationsList.map(n => ({ ...n, unread: false })));
                        }}
                        className="text-[11px] font-medium text-blue-600 hover:underline"
                      >
                        Barchasini o'qilgan deb belgilash
                      </button>
                    </div>

                    <div className="divide-y divide-zinc-100 max-h-80 overflow-y-auto mt-2">
                      {notificationsList.map((notif) => (
                        <div key={notif.id} className={`py-3 px-2 rounded-xl transition-colors ${notif.unread ? 'bg-blue-50/40' : 'hover:bg-zinc-50'}`}>
                          <div className="flex justify-between items-start">
                            <h4 className="text-xs font-semibold text-zinc-900 flex items-center space-x-1.5">
                              {notif.unread && <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />}
                              <span>{notif.title}</span>
                            </h4>
                            <span className="text-[10px] text-zinc-400">{notif.time}</span>
                          </div>
                          <p className="text-[11px] text-zinc-600 mt-1 leading-relaxed">{notif.desc}</p>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-zinc-100 text-center">
                      <button
                        onClick={() => setIsNotifOpen(false)}
                        className="text-xs font-medium text-zinc-500 hover:text-zinc-900"
                      >
                        Yopish
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* User badge */}
              <div className="flex items-center space-x-2 bg-zinc-50 border border-zinc-200/60 px-3 py-1.5 rounded-xl">
                <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                  AQ
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-xs font-bold text-zinc-900 leading-tight">Alisher Qodirov</p>
                  <p className="text-[10px] text-zinc-400">Dekanat OTM</p>
                </div>
              </div>
            </div>
          </header>

          {/* 100% Full-width container */}
          <div className="w-full p-4 sm:p-6 lg:p-8 space-y-6">

            {/* TAB 1: OVERVIEW DASHBOARD */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* KPI Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-xs space-y-2">
                    <div className="flex items-center justify-between text-zinc-500">
                      <span className="text-xs font-semibold">Jami Talabalar</span>
                      <Users className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl font-bold text-zinc-900">32 nafar</span>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">100% qamrov</span>
                    </div>
                    <p className="text-[11px] text-zinc-400">4 ta akademik guruh</p>
                  </div>

                  <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-xs space-y-2">
                    <div className="flex items-center justify-between text-zinc-500">
                      <span className="text-xs font-semibold">Faol Shartnomalar</span>
                      <FileCheck className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl font-bold text-zinc-900">28 ta</span>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">QR Tasdiqlangan</span>
                    </div>
                    <p className="text-[11px] text-zinc-400">4 ta kutilmoqda</p>
                  </div>

                  <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-xs space-y-2">
                    <div className="flex items-center justify-between text-zinc-500">
                      <span className="text-xs font-semibold">Kafedra Ustozlari</span>
                      <BookOpen className="w-4 h-4 text-amber-600" />
                    </div>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl font-bold text-zinc-900">4 nafar</span>
                      <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">Max 8 yuklama</span>
                    </div>
                    <p className="text-[11px] text-zinc-400">Ilmiy rahbarlar</p>
                  </div>

                  <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-xs space-y-2">
                    <div className="flex items-center justify-between text-zinc-500">
                      <span className="text-xs font-semibold">Hamkor Tashkilotlar</span>
                      <Briefcase className="w-4 h-4 text-violet-600" />
                    </div>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl font-bold text-zinc-900">4 ta</span>
                      <span className="text-[10px] font-bold text-violet-600 bg-violet-50 px-1.5 py-0.5 rounded">57 kvota</span>
                    </div>
                    <p className="text-[11px] text-zinc-400">Uzum, IT Park, Click...</p>
                  </div>
                </div>

                {/* Quick Actions Panel */}
                <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold text-zinc-900">Dekanat Tezkor Boshqaruv Paneli</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <button
                      onClick={() => setIsStudentModalOpen(true)}
                      className="flex items-center space-x-3 p-4 rounded-xl border border-zinc-200 hover:border-zinc-900 hover:bg-zinc-50/50 transition-all text-left group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <UserPlus className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-zinc-900">Yangi Talaba Qo'shish</h4>
                        <p className="text-[11px] text-zinc-500">ST###### login va parolni avtomat yaratish</p>
                      </div>
                    </button>

                    <button
                      onClick={() => setIsTeacherModalOpen(true)}
                      className="flex items-center space-x-3 p-4 rounded-xl border border-zinc-200 hover:border-zinc-900 hover:bg-zinc-50/50 transition-all text-left group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <Plus className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-zinc-900">Yangi Ustoz Qo'shish</h4>
                        <p className="text-[11px] text-zinc-500">Kafedra va ilmiy daraja bilan ro'yxatga olish</p>
                      </div>
                    </button>

                    <button
                      onClick={() => setIsOrderModalOpen(true)}
                      className="flex items-center space-x-3 p-4 rounded-xl border border-zinc-200 hover:border-zinc-900 hover:bg-zinc-50/50 transition-all text-left group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-zinc-900">Amaliyot Buyrug'ini Generatsiya (D1)</h4>
                        <p className="text-[11px] text-zinc-500">Rektorat blankasida PDF/Word buyruq</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: STUDENTS MANAGEMENT (All, Unassigned, Companies, Logs) */}
            {(activeTab === 'students-list' || activeTab === 'students-unassigned' || activeTab === 'students-companies' || activeTab === 'students-logs') && (
              <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-zinc-900">
                      {activeTab === 'students-unassigned' ? '⚠️ Ustoz Biriktirilmagan Talabalar' :
                       activeTab === 'students-companies' ? '🏢 Korxona va Mentor Biriktiruvi' :
                       activeTab === 'students-logs' ? '📊 Kundalik va Davomat Monitoringi' : 'Barcha Talabalar Ro\'yxati'}
                    </h3>
                    <p className="text-xs text-zinc-500">Talabalarni guruhlar bo'yicha filtrlash, ustoz va korxonalarni boshqarish.</p>
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

                {/* Filters & Group Pills */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-4 pt-2">
                  {/* Search input */}
                  <div className="relative w-full lg:w-80">
                    <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Ism, ID (ST######) yoki korxona..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-zinc-200 bg-white placeholder-zinc-400 focus:outline-none focus:border-zinc-900"
                    />
                  </div>

                  {/* Group Filter Pills */}
                  <div className="flex items-center space-x-2 overflow-x-auto w-full lg:w-auto pb-1">
                    {['ALL', 'DI-202-22', 'DI-201-22', 'AI-101-23'].map(g => (
                      <button
                        key={g}
                        onClick={() => setGroupFilter(g)}
                        className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                          groupFilter === g
                            ? 'bg-zinc-900 text-white shadow-xs'
                            : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                        }`}
                      >
                        {g === 'ALL' ? 'Barcha guruhlar' : g}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Students Table */}
                <div className="overflow-x-auto border border-zinc-200 rounded-xl">
                  <table className="w-full text-left text-xs text-zinc-700">
                    <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 font-semibold uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="p-3 w-10 text-center">
                          <input
                            type="checkbox"
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedStudentIds(filteredStudents.map(s => s.id));
                              } else {
                                setSelectedStudentIds([]);
                              }
                            }}
                            className="rounded border-zinc-300"
                          />
                        </th>
                        <th className="p-3">Talaba ID / F.I.SH</th>
                        <th className="p-3">Guruh</th>
                        <th className="p-3">Ilmiy Ustoz</th>
                        <th className="p-3">Amaliyot Korxonasi</th>
                        <th className="p-3">Davomat & Ball</th>
                        <th className="p-3 text-right">Amallar</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 bg-white">
                      {filteredStudents.map((st) => (
                        <tr key={st.id} className="hover:bg-zinc-50/80 transition-colors">
                          <td className="p-3 text-center">
                            <input
                              type="checkbox"
                              checked={selectedStudentIds.includes(st.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedStudentIds([...selectedStudentIds, st.id]);
                                } else {
                                  setSelectedStudentIds(selectedStudentIds.filter(id => id !== st.id));
                                }
                              }}
                              className="rounded border-zinc-300"
                            />
                          </td>
                          <td className="p-3">
                            <div className="flex items-center space-x-2">
                              <div>
                                <span className="font-bold text-zinc-950 block">{st.name}</span>
                                <span className="font-mono text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200/60">
                                  {st.id}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="p-3 font-semibold text-zinc-800">{st.group}</td>
                          <td className="p-3">
                            <span className={`px-2 py-1 rounded-lg text-[11px] font-medium ${
                              st.teacher === 'Biriktirilmagan' ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-zinc-100 text-zinc-800'
                            }`}>
                              {st.teacher}
                            </span>
                          </td>
                          <td className="p-3 font-medium text-zinc-800">{st.company}</td>
                          <td className="p-3">
                            <div className="space-y-0.5">
                              <span className="font-semibold text-zinc-900 block">{st.attendance}</span>
                              <span className="text-[10px] text-emerald-600 font-bold">{st.score}</span>
                            </div>
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => setSelectedStudent(st)}
                              className="px-2.5 py-1.5 bg-zinc-900 text-white rounded-lg text-[11px] font-medium hover:bg-zinc-800 transition-colors"
                            >
                              Ko'rish / Tahrir
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 3: TEACHERS CATALOG (FULL TABLE VIEW) */}
            {activeTab === 'teachers' && (
              <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-zinc-900">Kafedra Ustozlari Katalogi va Akademik Yuklama</h3>
                    <p className="text-xs text-zinc-500">Maksimal limit: har bir ustozga 8 nafargacha talaba biriktiriladi (1-to-Many).</p>
                  </div>

                  <button
                    onClick={() => setIsTeacherModalOpen(true)}
                    className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800 shadow-sm transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Yangi Ustoz Qo'shish</span>
                  </button>
                </div>

                <div className="overflow-x-auto border border-zinc-200 rounded-xl">
                  <table className="w-full text-left text-xs text-zinc-700">
                    <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 font-semibold uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="p-3">Ustoz ID / F.I.SH</th>
                        <th className="p-3">Kafedra Nomi</th>
                        <th className="p-3">Ilmiy Unvoni</th>
                        <th className="p-3">Telefon Raqami</th>
                        <th className="p-3">Akademik Yuklama</th>
                        <th className="p-3 text-right">Amallar</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 bg-white">
                      {teachers.map((tc) => {
                        const assignedCount = students.filter(s => s.teacher === tc.name).length;
                        const badgeInfo = getCapacityBadge(assignedCount);

                        return (
                          <tr key={tc.id} className="hover:bg-zinc-50 transition-colors">
                            <td className="p-3">
                              <div className="flex items-center space-x-2">
                                <div>
                                  <span className="font-bold text-zinc-950 block">{tc.name}</span>
                                  <span className="font-mono text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200/60">
                                    {tc.id}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="p-3 font-medium text-zinc-800">{tc.department}</td>
                            <td className="p-3">
                              <span className="px-2 py-0.5 rounded-lg text-[11px] font-semibold bg-zinc-100 text-zinc-800 border border-zinc-200">
                                {tc.degree}
                              </span>
                            </td>
                            <td className="p-3 font-mono text-zinc-600">{tc.phone}</td>
                            <td className="p-3">
                              <div className="space-y-1 w-44">
                                <div className="flex justify-between items-center text-[10px] font-bold">
                                  <span className="text-zinc-600">{assignedCount} / 8 talaba</span>
                                  <span className={assignedCount >= 8 ? 'text-rose-600' : 'text-emerald-600'}>
                                    {Math.round((assignedCount / 8) * 100)}%
                                  </span>
                                </div>
                                <div className="w-full bg-zinc-100 rounded-full h-1.5">
                                  <div
                                    className={`h-1.5 rounded-full transition-all ${badgeInfo.barColor}`}
                                    style={{ width: `${Math.min((assignedCount / 8) * 100, 100)}%` }}
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="p-3 text-right">
                              <button
                                onClick={() => setSelectedTeacher(tc)}
                                className="inline-flex items-center space-x-1 px-3 py-1.5 bg-zinc-900 text-white rounded-lg text-[11px] font-medium hover:bg-zinc-800 transition-colors shadow-xs"
                              >
                                <Users className="w-3 h-3" />
                                <span>Talabalarini ko'rish</span>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 4: CONTRACTS PENDING & APPROVED */}
            {(activeTab === 'contracts-pending' || activeTab === 'contracts') && (
              <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-5">
                <div>
                  <h3 className="text-sm font-bold text-zinc-900">3 Tomonlama Shartnomalar va Arizalar Markazi</h3>
                  <p className="text-xs text-zinc-500">Talabalar yuborgan amaliyot arizalarini tasdiqlang va QR-kodli shartnoma generatsiya qiling.</p>
                </div>

                <div className="overflow-x-auto border border-zinc-200 rounded-xl">
                  <table className="w-full text-left text-xs text-zinc-700">
                    <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 font-semibold uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="p-3">Talaba F.I.SH</th>
                        <th className="p-3">Guruh</th>
                        <th className="p-3">Korxona</th>
                        <th className="p-3">Mentor</th>
                        <th className="p-3">Holati</th>
                        <th className="p-3">Shartnoma №</th>
                        <th className="p-3 text-right">Amal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 bg-white">
                      {applications.map((app) => (
                        <tr key={app.id} className="hover:bg-zinc-50 transition-colors">
                          <td className="p-3 font-bold text-zinc-900">{app.studentName}</td>
                          <td className="p-3 font-semibold text-zinc-800">{app.group}</td>
                          <td className="p-3 font-medium text-zinc-800">{app.company}</td>
                          <td className="p-3 text-zinc-600">{app.mentor}</td>
                          <td className="p-3">
                            <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                              app.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                            }`}>
                              {app.status === 'APPROVED' ? 'TASDIQLANDI' : 'KUTILMOQDA'}
                            </span>
                          </td>
                          <td className="p-3 font-mono font-bold text-blue-600">
                            {app.contractNo || '—'}
                          </td>
                          <td className="p-3 text-right">
                            {app.status === 'SUBMITTED' ? (
                              <button
                                onClick={() => handleApproveContract(app.id)}
                                className="px-3 py-1.5 bg-zinc-900 text-white rounded-xl text-[11px] font-medium hover:bg-zinc-800 shadow-xs"
                              >
                                Tasdiqlash & QR Shartnoma
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  setNotification(`Shartnoma ${app.contractNo} yuklab olindi!`);
                                  setTimeout(() => setNotification(null), 3000);
                                }}
                                className="inline-flex items-center space-x-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-[11px] font-medium border border-emerald-200 hover:bg-emerald-100"
                              >
                                <Download className="w-3 h-3" />
                                <span>PDF Yuklab Olish</span>
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 5: DEKANAT BUYRUG'I (D1) */}
            {activeTab === 'dekanat-order' && (
              <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-zinc-100 gap-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      RASMIY HUJJAT (D1)
                    </span>
                    <h3 className="text-sm font-bold text-zinc-900 mt-1">Toshkent Xalqaro Universiteti Rektorat/Dekanat Buyrug'i</h3>
                    <p className="text-xs text-zinc-500">Talabalarni malakaviy va ishlab chiqarish amaliyotiga yuborish to'g'risida rasmiy buyruq.</p>
                  </div>
                  <button
                    onClick={() => {
                      setNotification('Rektorat rasmiy buyrug\'i PDF formatida muvaffaqiyatli yuklab olindi!');
                      setTimeout(() => setNotification(null), 3000);
                    }}
                    className="inline-flex items-center space-x-2 px-4 py-2.5 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800 shadow-sm"
                  >
                    <Download className="w-4 h-4" />
                    <span>PDF / Word Sifatida Yuklab Olish</span>
                  </button>
                </div>

                {/* Official University Letterhead Preview */}
                <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-8 max-w-3xl mx-auto space-y-6 font-serif text-zinc-800 text-xs leading-relaxed">
                  <div className="text-center space-y-1 pb-4 border-b border-zinc-300">
                    <p className="font-bold text-sm tracking-widest text-zinc-900">TOSHKENT XALQARO UNIVERSITETI</p>
                    <p className="text-[10px] uppercase font-sans text-zinc-500">Tashkent International University • Dekanat Boshqaruvi</p>
                    <p className="font-mono text-xs font-bold pt-2">BUYRUQ № {orderNumber}</p>
                    <p className="text-[11px]">Toshkent shahri, 2026-yil 2-noyabr</p>
                  </div>

                  <div className="space-y-3 font-sans text-xs">
                    <p className="font-bold text-center text-zinc-900 uppercase">
                      "Talabalarni 2025/2026 o'quv yili malakaviy amaliyotiga yuborish va rahbarlarni biriktirish to'g'risida"
                    </p>
                    <p className="text-justify">
                      O'zbekiston Respublikasining "Ta'lim to'g'risida"gi Qonuni, Oliy ta'lim, fan va innovatsiyalar vazirligining amaliyot o'tkazish tartib-qoidalariga asosan hamda Universitetning 2026-yilgi o'quv rejasini ijro etish maqsadida <b>BUYURAMAN:</b>
                    </p>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>Dasturiy injiniring va Sun'iy intellekt yo'nalishlarining 32 nafar talabasi 2026-yil 2-noyabrdan boshlab yetakchi hamkor tashkilotlarga (Uzum Technologies, IT Park, Click, Aloqabank) malakaviy amaliyotga yuborilsin.</li>
                      <li>Talabalarga ilmiy rahbar etib kafedraning tajribali professor-o'qituvchilari (Dotsent Jamshid Karimov va boshqalar) biriktirilsin.</li>
                      <li>O'quv bo'limi boshlig'i amaliyot jarayonining borishini qattiq nazoratga olsin.</li>
                    </ol>
                  </div>

                  <div className="pt-6 border-t border-zinc-300 flex justify-between items-end font-sans text-[11px]">
                    <div>
                      <p className="font-bold">Universitet Rektori:</p>
                      <p className="text-zinc-500">Prof. A. T. Karimov</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">Dekanat rahbari:</p>
                      <p className="text-zinc-500">Alisher Qodirov</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 6: YAKUNIY VEDOMOST (D2) */}
            {activeTab === 'grading-vedomost' && (
              <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 gap-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                      RASMIY QAYDNOMA (D2)
                    </span>
                    <h3 className="text-sm font-bold text-zinc-900 mt-1">Yakuniy Amaliyot Vedomosti (100 ECTS)</h3>
                    <p className="text-xs text-zinc-500">Mentor bahosi (50%) + Ustoz himoya bahosi (50%) jamlangan rasmiy yakuniy reyting qaydnomasi.</p>
                  </div>
                  <button
                    onClick={() => {
                      setNotification('Yakuniy vedomost Excel va PDF formatida yuklab olindi!');
                      setTimeout(() => setNotification(null), 3000);
                    }}
                    className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>Excel / PDF Vedomost Yuklash</span>
                  </button>
                </div>

                <div className="overflow-x-auto border border-zinc-200 rounded-xl">
                  <table className="w-full text-left text-xs text-zinc-700">
                    <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 font-semibold uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="p-3">Talaba F.I.SH</th>
                        <th className="p-3">Guruh</th>
                        <th className="p-3">Korxona Mentor (50)</th>
                        <th className="p-3">Kafedra Ustoz (50)</th>
                        <th className="p-3">Jami Ball (100)</th>
                        <th className="p-3">Harf Baho (ECTS)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 bg-white">
                      {students.map((st, idx) => {
                        const mentorPart = 47 + (idx % 3);
                        const teacherPart = 46 + (idx % 4);
                        const total = mentorPart + teacherPart;
                        const letter = total >= 90 ? "A (A'lo)" : total >= 80 ? "B (Yaxshi)" : "C (Qoniqarli)";

                        return (
                          <tr key={st.id} className="hover:bg-zinc-50">
                            <td className="p-3 font-bold text-zinc-900">{st.name}</td>
                            <td className="p-3 font-semibold text-zinc-800">{st.group}</td>
                            <td className="p-3 font-mono text-blue-600">{mentorPart} / 50</td>
                            <td className="p-3 font-mono text-amber-600">{teacherPart} / 50</td>
                            <td className="p-3 font-mono font-bold text-zinc-900">{total} / 100</td>
                            <td className="p-3">
                              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold rounded border border-emerald-200">
                                {letter}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 7: EARLY WARNING MONITOR (D3) */}
            {activeTab === 'early-warning' && (
              <div className="bg-white border border-rose-200 rounded-2xl p-6 shadow-sm space-y-5">
                <div className="flex items-center space-x-3 pb-3 border-b border-zinc-100">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-zinc-900">Xavf Ostidagi Talabalar Monitoring Markazi (Early Warning)</h3>
                    <p className="text-xs text-zinc-500">3 kundan ortiq kundalik yozmagan yoki davomati past bo'lgan talabalar uchun avtomatik xavf signali.</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {students.filter(s => parseInt(s.attendance) < 60 || s.status === 'KUTILMOQDA').map((st) => (
                    <div key={st.id} className="p-4 rounded-xl border border-rose-200 bg-rose-50/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-0.5 bg-rose-600 text-white font-bold text-[10px] rounded uppercase">
                            Xavf ostida (Warning)
                          </span>
                          <h4 className="text-xs font-bold text-zinc-900">{st.name} ({st.group})</h4>
                        </div>
                        <p className="text-xs text-zinc-600">
                          ID: <span className="font-mono">{st.id}</span> | Korxona: <b>{st.company}</b> | Davomat: <span className="text-rose-600 font-bold">{st.attendance}</span>
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setNotification(`⚠️ ${st.name} ga SMS va Telegram orqali shoshilinch ogohlantirish yuborildi!`);
                          setTimeout(() => setNotification(null), 3500);
                        }}
                        className="px-3.5 py-2 bg-rose-600 text-white rounded-xl text-xs font-medium hover:bg-rose-700 shadow-sm shrink-0"
                      >
                        1-Klik Bilan Ogohlantirish Yuborish
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 8: PARTNERS CATALOG */}
            {activeTab === 'partners' && (
              <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-zinc-900">Hamkor Tashkilotlar Katalogi va Kvotalar</h3>
                    <p className="text-xs text-zinc-500">Universitetning rasmiy amaliyot bazalari va hamkor korxonalari.</p>
                  </div>

                  <button
                    onClick={() => setIsPartnerModalOpen(true)}
                    className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800 shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Yangi Tashkilot Qo'shish</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {partners.map((pr) => (
                    <div key={pr.id} className="p-5 rounded-2xl border border-zinc-200 bg-zinc-50/40 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-xl ${pr.logoBg} text-white font-bold flex items-center justify-center text-xs shadow-sm`}>
                            {pr.logoText}
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-zinc-900">{pr.name}</h4>
                            <p className="text-[11px] text-zinc-500">{pr.category}</p>
                          </div>
                        </div>
                        <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 font-bold text-[10px] rounded border border-emerald-200">
                          {pr.status}
                        </span>
                      </div>

                      <div className="text-[11px] text-zinc-600 space-y-1 bg-white p-3 rounded-xl border border-zinc-200/60">
                        <p><b>STIR (INN):</b> <span className="font-mono">{pr.tin}</span></p>
                        <p><b>Rahbar:</b> {pr.dir}</p>
                        <p><b>Telefon:</b> <span className="font-mono">{pr.phone}</span></p>
                        <p><b>Manzil:</b> {pr.address}</p>
                      </div>

                      <div className="flex justify-between items-center text-xs pt-1">
                        <span className="text-zinc-500">Amaliyot Kvotasi:</span>
                        <span className="font-bold text-zinc-900 bg-white px-2.5 py-1 rounded-lg border border-zinc-200">
                          {pr.occupied} / {pr.quota} talaba biriktirilgan
                        </span>
                      </div>

                      {/* Edit & Delete Action Buttons */}
                      <div className="flex items-center space-x-2 pt-2 border-t border-zinc-200/60">
                        <button
                          onClick={() => {
                            setNewPartner({
                              name: pr.name,
                              shortName: pr.shortName,
                              category: pr.category,
                              quota: pr.quota,
                              tin: pr.tin,
                              dir: pr.dir,
                              phone: pr.phone,
                              address: pr.address
                            });
                            // Remove old and open modal to edit
                            setPartners(partners.filter(p => p.id !== pr.id));
                            setIsPartnerModalOpen(true);
                          }}
                          className="flex-1 py-1.5 bg-white border border-zinc-200 hover:border-zinc-900 text-zinc-700 rounded-xl text-[11px] font-medium transition-all shadow-2xs flex items-center justify-center space-x-1.5"
                        >
                          <RefreshCw className="w-3 h-3 text-zinc-500" />
                          <span>Tahrirlash</span>
                        </button>

                        <button
                          onClick={() => {
                            setPartners(partners.filter(p => p.id !== pr.id));
                            setNotification(`"${pr.name}" tashkiloti ro'yxatdan o'chirildi!`);
                            setTimeout(() => setNotification(null), 3000);
                          }}
                          className="py-1.5 px-3 bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-700 rounded-xl text-[11px] font-medium transition-all flex items-center justify-center space-x-1"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>O'chirish</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </main>
      </div>

      {/* --- MODALS --- */}

      {/* 1. Student Creation Modal with Optional Teacher & Company */}
      {isStudentModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <h3 className="text-sm font-bold text-zinc-900">Yangi Talaba Qo'shish</h3>
              <button onClick={() => setIsStudentModalOpen(false)} className="text-zinc-400 hover:text-zinc-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateStudent} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">Talaba F.I.SH *</label>
                <input
                  type="text"
                  required
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                  placeholder="Masalan: Azizbek Olimov"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">Guruh *</label>
                <select
                  value={newStudent.group}
                  onChange={(e) => setNewStudent({ ...newStudent, group: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900 bg-white"
                >
                  <option value="DI-202-22">DI-202-22</option>
                  <option value="DI-201-22">DI-201-22</option>
                  <option value="AI-101-23">AI-101-23</option>
                  <option value="DT-207-22">DT-207-22</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">Telefon Raqami *</label>
                <input
                  type="text"
                  required
                  value={newStudent.phone}
                  onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900 font-mono"
                />
              </div>

              {/* Optional Teacher */}
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Biriktiriladigan Ustoz <span className="text-zinc-400 font-normal">(Ixtiyoriy)</span>
                </label>
                <select
                  value={newStudent.teacher}
                  onChange={(e) => setNewStudent({ ...newStudent, teacher: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900 bg-white text-zinc-700"
                >
                  <option value="">-- Biriktirilmasin (Keyinroq biriktirish) --</option>
                  {teachers.map(tc => (
                    <option key={tc.id} value={tc.name}>{tc.name} ({tc.department})</option>
                  ))}
                </select>
              </div>

              {/* Optional Company */}
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Amaliyot Korxonasi <span className="text-zinc-400 font-normal">(Ixtiyoriy)</span>
                </label>
                <select
                  value={newStudent.company}
                  onChange={(e) => setNewStudent({ ...newStudent, company: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900 bg-white text-zinc-700"
                >
                  <option value="">-- Tanlanmasin (Keyinroq biriktirish) --</option>
                  {partners.map(pr => (
                    <option key={pr.id} value={pr.name}>{pr.name}</option>
                  ))}
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800 shadow-sm transition-all"
                >
                  Talabani Qo'shish & Login Yaratish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Teacher Creation Modal */}
      {isTeacherModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <h3 className="text-sm font-bold text-zinc-900">Yangi Kafedra Ustozini Qo'shish</h3>
              <button onClick={() => setIsTeacherModalOpen(false)} className="text-zinc-400 hover:text-zinc-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTeacher} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">Ustoz F.I.SH *</label>
                <input
                  type="text"
                  required
                  value={newTeacher.name}
                  onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                  placeholder="Masalan: Dotsent Jamshid Karimov"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">Kafedra *</label>
                <input
                  type="text"
                  required
                  value={newTeacher.department}
                  onChange={(e) => setNewTeacher({ ...newTeacher, department: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">Ilmiy Unvon *</label>
                <select
                  value={newTeacher.degree}
                  onChange={(e) => setNewTeacher({ ...newTeacher, degree: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900 bg-white"
                >
                  <option value="Dotsent">Dotsent</option>
                  <option value="Professor">Professor</option>
                  <option value="Katta o'qituvchi">Katta o'qituvchi</option>
                  <option value="Assistat">Assistat</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">Telefon Raqami *</label>
                <input
                  type="text"
                  required
                  value={newTeacher.phone}
                  onChange={(e) => setNewTeacher({ ...newTeacher, phone: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900 font-mono"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800 shadow-sm transition-all"
                >
                  Ustozni Qo'shish & TC Login Yaratish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. New Partner Company Modal */}
      {isPartnerModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <h3 className="text-sm font-bold text-zinc-900">Yangi Hamkor Tashkilot Qo'shish</h3>
              <button onClick={() => setIsPartnerModalOpen(false)} className="text-zinc-400 hover:text-zinc-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePartner} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">Tashkilot To'liq Nomi *</label>
                <input
                  type="text"
                  required
                  value={newPartner.name}
                  onChange={(e) => setNewPartner({ ...newPartner, name: e.target.value })}
                  placeholder="Masalan: EPAM Systems Uzbekistan"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">Qisqa Nomi (Logotip uchun)</label>
                  <input
                    type="text"
                    value={newPartner.shortName}
                    onChange={(e) => setNewPartner({ ...newPartner, shortName: e.target.value })}
                    placeholder="EPAM"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">Amaliyot Kvotasi *</label>
                  <input
                    type="number"
                    required
                    value={newPartner.quota}
                    onChange={(e) => setNewPartner({ ...newPartner, quota: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">STIR (INN) *</label>
                <input
                  type="text"
                  required
                  value={newPartner.tin}
                  onChange={(e) => setNewPartner({ ...newPartner, tin: e.target.value })}
                  placeholder="305123456"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">Mas'ul Shaxs (HR / Direktor)</label>
                <input
                  type="text"
                  value={newPartner.dir}
                  onChange={(e) => setNewPartner({ ...newPartner, dir: e.target.value })}
                  placeholder="Timur Akhmedov (HR Director)"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">Telefon Raqami *</label>
                <input
                  type="text"
                  required
                  value={newPartner.phone}
                  onChange={(e) => setNewPartner({ ...newPartner, phone: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900 font-mono"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800 shadow-sm"
                >
                  Tashkilotni Saqlash & Bazaga Qo'shish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. Credentials Result Modal */}
      {createdCredential && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <h3 className="text-sm font-bold text-zinc-900">🎉 Muvaffaqiyatli Yaratildi!</h3>
              <button onClick={() => setCreatedCredential(null)} className="text-zinc-400 hover:text-zinc-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 bg-zinc-50 p-4 rounded-2xl border border-zinc-200 text-xs">
              <p><b>Ism:</b> {createdCredential.name}</p>
              <p><b>Ma'lumot:</b> {createdCredential.sub}</p>
              <div className="pt-2 border-t border-zinc-200 space-y-2">
                <div className="flex justify-between items-center bg-white p-2.5 rounded-xl border border-zinc-200">
                  <span className="font-mono font-bold text-blue-600">{createdCredential.login}</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(createdCredential.login);
                      setCopiedLogin(true);
                      setTimeout(() => setCopiedLogin(false), 2000);
                    }}
                    className="text-[11px] text-zinc-500 hover:text-zinc-900 flex items-center space-x-1"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedLogin ? 'Nusxalandi!' : 'Nusxalash'}</span>
                  </button>
                </div>

                <div className="flex justify-between items-center bg-white p-2.5 rounded-xl border border-zinc-200">
                  <span className="font-mono font-bold text-zinc-900">Parol: {createdCredential.pass}</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(createdCredential.pass);
                      setCopiedPass(true);
                      setTimeout(() => setCopiedPass(false), 2000);
                    }}
                    className="text-[11px] text-zinc-500 hover:text-zinc-900 flex items-center space-x-1"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedPass ? 'Nusxalandi!' : 'Nusxalash'}</span>
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => setCreatedCredential(null)}
              className="w-full py-2.5 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800"
            >
              Yopish
            </button>
          </div>
        </div>
      )}

      {/* 5. Student Detail Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <div>
                <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {selectedStudent.id}
                </span>
                <h3 className="text-sm font-bold text-zinc-900 mt-1">{selectedStudent.name}</h3>
              </div>
              <button onClick={() => setSelectedStudent(null)} className="text-zinc-400 hover:text-zinc-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-zinc-700 bg-zinc-50 p-4 rounded-2xl border border-zinc-200">
              <p><b>Guruh:</b> {selectedStudent.group}</p>
              <p><b>Telefon:</b> <span className="font-mono">{selectedStudent.phone}</span></p>
              <p><b>Ilmiy Ustoz:</b> {selectedStudent.teacher}</p>
              <p><b>Amaliyot Korxonasi:</b> {selectedStudent.company}</p>
              <p><b>Mentor:</b> {selectedStudent.mentor}</p>
              <p><b>Shartnoma:</b> <span className="font-mono font-bold text-emerald-600">{selectedStudent.contract}</span></p>
              <p><b>Davomat & Ball:</b> {selectedStudent.attendance} | {selectedStudent.score}</p>
            </div>

            {/* Kunlik Fotohisobotlar bloki */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">Kunlik Fotohisobotlar & Jarayon</h4>
              <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                {[
                  { day: '4/30-kun', date: '02.11.2026', title: 'Docker va API integratsiya', photo: true, score: '⭐⭐⭐⭐⭐ 5', status: '🟢 Tasdiqlangan' },
                  { day: '3/30-kun', date: '31.10.2026', title: 'Frontend Tailwind CSS komponentlari', photo: true, score: '⭐⭐⭐⭐⭐ 5', status: '🟢 Tasdiqlangan' },
                  { day: '2/30-kun', date: '30.10.2026', title: 'Git branching va pull request', photo: false, score: '⭐⭐⭐⭐ 4', status: '🟢 Tasdiqlangan' },
                ].map((log, idx) => (
                  <div key={idx} className="p-3 rounded-xl border border-zinc-200 bg-white space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-xs text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-mono">{log.day} ({log.date})</span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">{log.status}</span>
                    </div>
                    <p className="text-xs text-zinc-800 font-medium">{log.title}</p>
                    <div className="flex items-center justify-between pt-1 border-t border-zinc-100 text-[11px]">
                      <span className="text-zinc-500">Mentor Bahosi: <b className="text-zinc-900">{log.score}</b></span>
                      {log.photo && (
                        <span className="text-blue-600 font-semibold inline-flex items-center space-x-1 cursor-pointer hover:underline">
                          <span>📸 Fotohisobotni ko'rish</span>
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-zinc-700">Ustozni o'zgartirish (Biriktirish):</label>
              <div className="flex space-x-2">
                <select
                  value={inlineTeacherSelect}
                  onChange={(e) => setInlineTeacherSelect(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs rounded-xl border border-zinc-200 bg-white"
                >
                  <option value="">-- Ustozni tanlang --</option>
                  {teachers.map(tc => (
                    <option key={tc.id} value={tc.name}>{tc.name}</option>
                  ))}
                </select>
                <button
                  onClick={() => {
                    if (inlineTeacherSelect) {
                      setStudents(students.map(s => s.id === selectedStudent.id ? { ...s, teacher: inlineTeacherSelect } : s));
                      setSelectedStudent({ ...selectedStudent, teacher: inlineTeacherSelect });
                      setNotification('Talabaga yangi ustoz muvaffaqiyatli biriktirildi!');
                      setTimeout(() => setNotification(null), 3000);
                    }
                  }}
                  className="px-4 py-2 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800"
                >
                  Saqlash
                </button>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedStudent(null)}
                className="px-4 py-2 bg-zinc-200 text-zinc-800 rounded-xl text-xs font-medium hover:bg-zinc-300"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
