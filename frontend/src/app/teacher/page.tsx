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
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  AlertCircle,
  ExternalLink,
  MessageSquare,
  LayoutDashboard,
  GraduationCap,
  Briefcase,
  Plus,
  Search,
  Check,
  X,
  FileCheck,
  CalendarCheck,
  BarChart3,
  Image as ImageIcon,
  ChevronRight,
  Filter,
  Printer,
  Send,
  RotateCcw,
  Calendar
} from 'lucide-react';
import CollapsibleSidebar, { NavItem } from '@/components/CollapsibleSidebar';

interface PracticeDay {
  dayNumber: number;
  date: string;
  weekday: string;
  isWeekend: boolean;
  status: 'FULL' | 'PARTIAL' | 'EMPTY' | 'WEEKEND' | 'FUTURE';
  taskDescription?: string;
  skills?: string[];
  photoTitle?: string;
  mentorScore?: number;
  mentorFeedback?: string;
}

interface TeacherStudent {
  id: string;
  name: string;
  group: string;
  company: string;
  mentor: string;
  mentorPhone: string;
  mentorScore: number; // 0 - 50
  attendanceRate: string;
  daysCompleted: string;
  contractNo: string;
  reportFile: string;
  status: 'FAOL' | 'HIMOYA_KUTILMOQDA' | 'BAHOLANDI';
  practiceDays: PracticeDay[];
}

interface LogbookSubmission {
  id: string;
  studentId: string;
  studentName: string;
  group: string;
  company: string;
  date: string;
  tasks: string;
  skills: string;
  mentorFeedback: string;
  mentorApproved: boolean;
  hasPhoto: boolean;
  photoTitle?: string;
  academicStatus?: 'PENDING' | 'ACCEPTED' | 'REVISION';
  academicComment?: string;
}

interface MethodicDocument {
  title: string;
  ext: string;
  date: string;
  type: string;
}

const TEACHER_NAV_ITEMS: NavItem[] = [
  { id: 'overview', label: 'Bosh Sahifa', icon: LayoutDashboard },
  {
    id: 'academic',
    label: 'Akademik Nazorat',
    icon: BookOpen,
    subItems: [
      { id: 'logbook-review', label: 'Kundaliklar Taftishi', icon: FileText, badge: '4 yangi' },
      { id: 'grading-100', label: '100 Ballik ECTS Baholash', icon: Award, badge: 'ECTS' }
    ]
  },
  { id: 'students', label: 'Biriktirilgan Talabalar', icon: Users, badge: '3' },
  { id: 'reports', label: 'Kafedra Hisoboti', icon: BarChart3 },
  { id: 'settings', label: 'Sozlamalar', icon: Settings },
];

// Helper to generate 30 days practice heatmap data
const generateSamplePracticeDays = (): PracticeDay[] => {
  const days: PracticeDay[] = [];
  const startTimestamp = new Date('2026-10-01').getTime();
  const weekdays = ['Yakshanba', 'Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba'];

  for (let i = 1; i <= 30; i++) {
    const d = new Date(startTimestamp + (i - 1) * 24 * 60 * 60 * 1000);
    const dayOfWeek = d.getDay(); // 0 is Sunday, 6 is Saturday
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const weekdayName = weekdays[dayOfWeek];
    const dateStr = d.toISOString().split('T')[0];

    let status: PracticeDay['status'] = 'FULL';
    let taskDesc = '';
    let skillsList: string[] = [];
    let photo = '';
    let score = 5;
    let feedback = '';

    if (isWeekend) {
      status = 'WEEKEND';
      taskDesc = 'Dam olish kuni (Shanba / Yakshanba)';
    } else if (i > 24) {
      status = 'FUTURE';
      taskDesc = 'Kelgusi amaliyot kuni';
    } else if (i === 18) {
      status = 'EMPTY';
      taskDesc = 'Sababsiz hisobot topshirilmadi (O\'tkazib yuborilgan)';
    } else if (i === 12 || i === 19) {
      status = 'PARTIAL';
      taskDesc = 'API endpointlarni loyihalash va bazaga ulanishni sozlash';
      skillsList = ['Node.js', 'PostgreSQL'];
      score = 4;
      feedback = 'Fotohisobot biriktirilishi kutilmoqda.';
    } else {
      status = 'FULL';
      taskDesc = `FastAPI va Docker konteynerlashtirish arxitekturasini ${i}-kuni uchun sozlash`;
      skillsList = ['Docker', 'FastAPI', 'Python'];
      photo = `day_${i}_architecture_screenshot.png`;
      score = 5;
      feedback = 'Vazifalar a’lo darajada bajarildi.';
    }

    days.push({
      dayNumber: i,
      date: dateStr,
      weekday: weekdayName,
      isWeekend,
      status,
      taskDescription: taskDesc,
      skills: skillsList,
      photoTitle: photo,
      mentorScore: score,
      mentorFeedback: feedback
    });
  }
  return days;
};

export default function TeacherDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [notification, setNotification] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Defense scores state (0 - 50)
  const [defenseScores, setDefenseScores] = useState<Record<string, number>>({
    'ST501824': 48.0,
    'ST501825': 46.5,
    'ST501826': 49.0
  });

  // Selected student for detail/logbook modal
  const [selectedStudentForModal, setSelectedStudentForModal] = useState<TeacherStudent | null>(null);
  const [selectedHeatmapDay, setSelectedHeatmapDay] = useState<PracticeDay | null>(null);
  const [academicCommentInput, setAcademicCommentInput] = useState('');

  // Telegram messaging modal state
  const [telegramModalStudent, setTelegramModalStudent] = useState<TeacherStudent | null>(null);
  const [telegramMessageText, setTelegramMessageText] = useState('');

  // ECTS Vedomost modal state
  const [isVedomostModalOpen, setIsVedomostModalOpen] = useState(false);

  // Methodic guide upload modal state
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [newDocTitle, setNewDocTitle] = useState('');
  const [newDocType, setNewDocType] = useState('Malakaviy amaliyot');

  // Documents list state
  const [documentsList, setDocumentsList] = useState<MethodicDocument[]>([
    { title: 'DI-2026: 4-kurs Malakaviy amaliyot dasturi va uslubiy ko\'rsatma', ext: 'PDF (2.4 MB)', date: '2026-09-15', type: 'Malakaviy amaliyot' },
    { title: 'Amaliyot yakuniy hisoboti (Portfolio) rasmiylashtirish standarti', ext: 'DOCX (850 KB)', date: '2026-09-20', type: 'Bitiruv oldi' },
    { title: 'Dasturiy injiniring kafedrasi 100 ballik baholash rubrikasi', ext: 'PDF (1.1 MB)', date: '2026-09-25', type: 'Malakaviy amaliyot' }
  ]);

  // 1. Assigned Students list (Strictly 3 students per teacher limit)
  const [students, setStudents] = useState<TeacherStudent[]>([
    {
      id: 'ST501824',
      name: 'Bekzod Ergashev',
      group: 'DI-202-22',
      company: 'Uzum Technologies MCHJ',
      mentor: 'Sardor Bekmurodov',
      mentorPhone: '+998 90 999 11 22',
      mentorScore: 48.0,
      attendanceRate: '91.6%',
      daysCompleted: '22 / 24 ish kuni',
      contractNo: 'AMAL-2026-0041',
      reportFile: 'Bekzod_Ergashev_Amaliyot_Hisoboti.pdf',
      status: 'FAOL',
      practiceDays: generateSamplePracticeDays()
    },
    {
      id: 'ST501825',
      name: 'Sardor Rahimov',
      group: 'DI-202-22',
      company: 'Uzum Technologies MCHJ',
      mentor: 'Sardor Bekmurodov',
      mentorPhone: '+998 90 999 11 22',
      mentorScore: 47.0,
      attendanceRate: '95.0%',
      daysCompleted: '23 / 24 ish kuni',
      contractNo: 'AMAL-2026-0042',
      reportFile: 'Sardor_Rahimov_Hisobot_2026.pdf',
      status: 'FAOL',
      practiceDays: generateSamplePracticeDays()
    },
    {
      id: 'ST501826',
      name: 'Madina Karimova',
      group: 'DI-202-22',
      company: 'Uzum Technologies MCHJ',
      mentor: 'Sardor Bekmurodov',
      mentorPhone: '+998 90 999 11 22',
      mentorScore: 49.0,
      attendanceRate: '98.0%',
      daysCompleted: '24 / 24 ish kuni',
      contractNo: 'AMAL-2026-0043',
      reportFile: 'Madina_Karimova_Hisobot_2026.pdf',
      status: 'FAOL',
      practiceDays: generateSamplePracticeDays()
    }
  ]);

  // 2. Logbook Submissions with 2-step decision workflow state
  const [logbooks, setLogbooks] = useState<LogbookSubmission[]>([
    {
      id: 'log_1',
      studentId: 'ST501824',
      studentName: 'Bekzod Ergashev',
      group: 'DI-202-22',
      company: 'Uzum Technologies MCHJ',
      date: '2026-11-02',
      tasks: 'FastAPI WebSockets orqali jonli bildirishnomalar arxitekturasini loyihalash va testlash',
      skills: 'Python 3.14, FastAPI, WebSockets, AsyncIO',
      mentorFeedback: 'Ajoyib natija, kod toza yozilgan, arxitekturaviy talablarga javob beradi.',
      mentorApproved: true,
      hasPhoto: true,
      photoTitle: 'websocket_load_test_results.png',
      academicStatus: 'PENDING'
    },
    {
      id: 'log_2',
      studentId: 'ST501825',
      studentName: 'Sardor Rahimov',
      group: 'DI-202-22',
      company: 'Uzum Technologies MCHJ',
      date: '2026-11-01',
      tasks: 'Next.js 14 komponentlarida Tailwind CSS bilan collapsible sidebar va animatsiyalarni yaratish',
      skills: 'React, Next.js, Tailwind CSS, TypeScript',
      mentorFeedback: 'Interfeys juda chiroyli va qulay bo\'ldi. Tasdiqlandi.',
      mentorApproved: true,
      hasPhoto: true,
      photoTitle: 'collapsible_sidebar_figma_preview.png',
      academicStatus: 'PENDING'
    },
    {
      id: 'log_3',
      studentId: 'ST501826',
      studentName: 'Madina Karimova',
      group: 'DI-202-22',
      company: 'Uzum Technologies MCHJ',
      date: '2026-11-01',
      tasks: 'PostgreSQL da ACID tranzaksiyalar va 16 ta jadval schema migratsiyasini sinovdan o\'tkazish',
      skills: 'PostgreSQL, SQLAlchemy, Alembic Migrations',
      mentorFeedback: 'Indexlar to\'g\'ri qo\'yildi, so\'rovlar tezligi 3 barobar oshdi.',
      mentorApproved: true,
      hasPhoto: false,
      academicStatus: 'PENDING'
    }
  ]);

  const calculateGradeLetter = (total: number) => {
    if (total >= 90) return { grade: 'A', label: 'A\'lo', color: 'bg-emerald-50 text-emerald-800 border-emerald-200/80' };
    if (total >= 80) return { grade: 'B', label: 'Yaxshi', color: 'bg-blue-50 text-blue-800 border-blue-200/80' };
    if (total >= 70) return { grade: 'C', label: 'Qoniqarli', color: 'bg-amber-50 text-amber-800 border-amber-200/80' };
    if (total >= 60) return { grade: 'D', label: 'Yetarli', color: 'bg-orange-50 text-orange-800 border-orange-200/80' };
    return { grade: 'F', label: 'Qoniqarsiz', color: 'bg-rose-50 text-rose-800 border-rose-200/80' };
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('pms_user');
    }
    router.push('/login');
  };

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.group.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col md:flex-row antialiased text-zinc-950">
      {/* Left Collapsible Animated Sidebar */}
      <CollapsibleSidebar
        role="TEACHER"
        roleTitle="Kafedra O'qituvchisi Portali"
        userName="Dotsent Jamshid Karimov"
        userSub="Dasturiy injiniring kafedrasi"
        userBadge="TC309482"
        items={TEACHER_NAV_ITEMS}
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
            <span className="text-xs text-zinc-500 font-medium">Kafedra O'qituvchisi (Ilmiy Rahbar) Portali</span>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-zinc-50 border border-zinc-200/60 px-3 py-1.5 rounded-xl text-xs">
              <span className="font-semibold text-zinc-900">Dotsent Jamshid Karimov</span>
              <span className="text-zinc-300">|</span>
              <span className="text-zinc-500 font-medium">Dasturiy injiniring</span>
              <span className="text-zinc-300">|</span>
              <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-mono text-[10px] font-bold border border-amber-200/60">
                TC309482
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
        <div className="flex-1 p-4 sm:p-6 lg:p-8 w-full mx-auto space-y-6">
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
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-sm space-y-3">
                    <span className="text-xs text-zinc-500 font-medium">Menga Biriktirilgan Talabalar</span>
                    <div className="flex items-baseline justify-between">
                      <p className="text-2xl font-bold text-zinc-900">{students.length} / 3 nafar</p>
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">100% to'lgan</span>
                    </div>
                    {/* Animated gradient capacity progress bar */}
                    <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-indigo-500 via-blue-500 to-emerald-500 h-full rounded-full transition-all duration-700 ease-out" style={{ width: '100%' }} />
                    </div>
                  </div>

                  <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-sm">
                    <span className="text-xs text-zinc-500 font-medium">Tekshirilgan Kundaliklar</span>
                    <p className="text-2xl font-bold text-emerald-600 mt-2">124 ta</p>
                    <p className="text-[11px] text-emerald-700 mt-1 font-medium">4 ta yangi ko'rib chiqishda</p>
                  </div>

                  <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-sm">
                    <span className="text-xs text-zinc-500 font-medium">Amaliyot Korxonalari</span>
                    <p className="text-2xl font-bold text-zinc-900 mt-2">3 ta</p>
                    <p className="text-[11px] text-zinc-400 mt-1">Uzum, IT Park, Click</p>
                  </div>

                  <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-sm">
                    <span className="text-xs text-zinc-500 font-medium">O'rtacha Kafedra Bali</span>
                    <p className="text-2xl font-bold text-purple-600 mt-2">46.5 / 50</p>
                    <p className="text-[11px] text-purple-700 mt-1 font-medium">Yuqori akademik natija</p>
                  </div>
                </div>

                {/* Quick Action Navigation Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button
                    onClick={() => setActiveTab('logbook-review')}
                    className="p-4 rounded-2xl bg-white border border-zinc-200/80 hover:border-zinc-300 transition-all text-left shadow-xs group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                        <FileText className="w-4 h-4" />
                      </div>
                      <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 transition-colors" />
                    </div>
                    <h4 className="text-xs font-bold text-zinc-900">Kundaliklar Taftishi</h4>
                    <p className="text-[11px] text-zinc-400 mt-0.5">Yangi foto-hisobotlar va 2 bosqichli qarorlarni qabul qilish</p>
                  </button>

                  <button
                    onClick={() => setActiveTab('grading-100')}
                    className="p-4 rounded-2xl bg-white border border-zinc-200/80 hover:border-zinc-300 transition-all text-left shadow-xs group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                        <Award className="w-4 h-4" />
                      </div>
                      <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 transition-colors" />
                    </div>
                    <h4 className="text-xs font-bold text-zinc-900">100 Ballik ECTS Baholash</h4>
                    <p className="text-[11px] text-zinc-400 mt-0.5">Mentor (50) + OTM (50) rubrikasi va rasmiy Vedomost PDF</p>
                  </button>

                  <button
                    onClick={() => setActiveTab('students')}
                    className="p-4 rounded-2xl bg-white border border-zinc-200/80 hover:border-zinc-300 transition-all text-left shadow-xs group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-8 h-8 rounded-xl bg-violet-50 text-violet-700 flex items-center justify-center">
                        <Users className="w-4 h-4" />
                      </div>
                      <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 transition-colors" />
                    </div>
                    <h4 className="text-xs font-bold text-zinc-900">Biriktirilgan Talabalar</h4>
                    <p className="text-[11px] text-zinc-400 mt-0.5">Davomat, shartnomalar va Telegram orqali xabar yuborish</p>
                  </button>
                </div>

                {/* Academic Guidelines Notice */}
                <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-sm font-bold text-zinc-900 mb-2">Akademik Amaliyot Rahbari Tartibi</h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Talabalarning amaliyot kundaliklarini har hafta muntazam tekshirib boring. Korxona mentori qo'ygan 5.0 shkala balli avtomatik <strong>50 ballga</strong> konvertatsiya qilinadi. Siz kafedrada o'tadigan yakuniy himoyada <strong>0 dan 50 ballgacha</strong> baho kiritasiz. Tizim avtomatik ravishda 100 ballik ECTS tizimida bahoni (A, B, C, D, F) hisoblab beradi.
                  </p>
                </div>
              </div>
            )}

            {/* TAB 2-A: LOGBOOK REVIEW (SUBMENU OF ACADEMIC) */}
            {(activeTab === 'logbook-review' || activeTab === 'academic') && (
              <div className="space-y-6">
                <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 gap-3">
                    <div>
                      <h3 className="text-sm font-bold text-zinc-900">Talabalar Kundaliklari Taftishi & 2 Bosqichli Qaror</h3>
                      <p className="text-xs text-zinc-500">Talabalar bajargan ishlar, amaliy ko'nikmalar, skrinshot/foto-hisobotlar va rasmiy qarorlar</p>
                    </div>
                    <span className="text-xs text-zinc-500 font-medium">Jami hisobotlar: {logbooks.length} ta</span>
                  </div>

                  <div className="space-y-4 pt-2">
                    {logbooks.map((log) => {
                      const statusBadge = log.academicStatus === 'ACCEPTED' ? (
                        <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold">
                          🟢 Tasdiqlandi
                        </span>
                      ) : log.academicStatus === 'REVISION' ? (
                        <span className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-800 border border-rose-200 text-[10px] font-bold">
                          🔴 Qayta ishlashga yuborildi
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold">
                          ⏳ Tekshiruv kutilmoqda
                        </span>
                      );

                      return (
                        <div key={log.id} className="p-4 rounded-xl border border-zinc-200/80 bg-zinc-50/40 space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="flex items-center space-x-2">
                              <span className="text-xs font-bold text-zinc-900">{log.studentName}</span>
                              <span className="text-[11px] text-zinc-400 font-mono">({log.group})</span>
                              <span className="text-[11px] text-zinc-500 font-medium">• {log.company}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              {statusBadge}
                              <span className="text-[11px] text-zinc-500 font-mono">Sana: {log.date}</span>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <p className="text-xs text-zinc-800">
                              <strong>Bajarilgan ish:</strong> {log.tasks}
                            </p>
                            <p className="text-[11px] text-zinc-500">
                              <strong>Egallangan ko'nikmalar:</strong> {log.skills}
                            </p>
                          </div>

                          {/* Mentor Feedback & Verification Badge */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg bg-emerald-50/70 border border-emerald-100 gap-2">
                            <div className="flex items-start space-x-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              <div className="text-[11px]">
                                <span className="font-bold text-emerald-900">Mentor Tasdig'i:</span>
                                <span className="text-emerald-800 ml-1">"{log.mentorFeedback}"</span>
                              </div>
                            </div>

                            {log.hasPhoto && (
                              <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-white border border-emerald-200 text-[10px] font-medium text-emerald-800">
                                <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
                                <span>{log.photoTitle}</span>
                              </div>
                            )}
                          </div>

                          {/* 2-Step Decision Workflow Buttons */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2 gap-3 border-t border-zinc-200/60">
                            <input
                              type="text"
                              placeholder="O'qituvchining akademik izohi yoki kamchiliklar bo'yicha ko'rsatmasi..."
                              value={log.academicComment || ''}
                              onChange={(e) => {
                                const updated = logbooks.map(l => l.id === log.id ? { ...l, academicComment: e.target.value } : l);
                                setLogbooks(updated);
                              }}
                              className="flex-1 text-xs p-2 rounded-xl border border-zinc-200 bg-white text-zinc-900 focus:outline-none focus:border-zinc-900"
                            />

                            <div className="flex items-center space-x-2 shrink-0">
                              <button
                                onClick={() => {
                                  const updated = logbooks.map(l => l.id === log.id ? { ...l, academicStatus: 'ACCEPTED' as const } : l);
                                  setLogbooks(updated);
                                  setNotification(`${log.studentName} ning kundaligi muvaffaqiyatli qabul qilindi!`);
                                  setTimeout(() => setNotification(null), 3000);
                                }}
                                className="inline-flex items-center space-x-1 px-3.5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-medium hover:bg-emerald-700 transition-all shadow-xs"
                              >
                                <Check className="w-3.5 h-3.5" />
                                <span>Qabul Qilish</span>
                              </button>

                              <button
                                onClick={() => {
                                  const updated = logbooks.map(l => l.id === log.id ? { ...l, academicStatus: 'REVISION' as const } : l);
                                  setLogbooks(updated);
                                  setNotification(`${log.studentName} ning kundaligi qayta ishlashga yuborildi!`);
                                  setTimeout(() => setNotification(null), 3000);
                                }}
                                className="inline-flex items-center space-x-1 px-3.5 py-2 bg-rose-600 text-white rounded-xl text-xs font-medium hover:bg-rose-700 transition-all shadow-xs"
                              >
                                <RotateCcw className="w-3.5 h-3.5" />
                                <span>Qayta Ishlashga</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2-B: 100-BALLIK ECTS BAHOLASH (SUBMENU OF ACADEMIC) */}
            {activeTab === 'grading-100' && (
              <div className="space-y-6">
                <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 gap-3 border-b border-zinc-100">
                    <div>
                      <h3 className="text-sm font-bold text-zinc-900">100 Ballik ECTS Baholash Markazi</h3>
                      <p className="text-xs text-zinc-500">Korxona mentori bali (0-50 ball) va Kafedra himoya bali (0-50 ball) yig'indisi asosida avtomatik ECTS hisoblanadi</p>
                    </div>

                    <button
                      onClick={() => setIsVedomostModalOpen(true)}
                      className="inline-flex items-center space-x-2 px-4 py-2 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800 transition-all shadow-sm"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Rasmiy Kafedra ECTS Vedomostini PDF Yuklash</span>
                    </button>
                  </div>

                  <div className="space-y-4 pt-2">
                    {students.map((s) => {
                      const teacherScore = defenseScores[s.id] || 0;
                      const totalScore = s.mentorScore + teacherScore;
                      const ects = calculateGradeLetter(totalScore);

                      return (
                        <div key={s.id} className="p-4 rounded-xl border border-zinc-200/80 bg-zinc-50/40 space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs font-bold text-zinc-900">{s.name}</span>
                                <span className="font-mono text-[10px] font-bold text-violet-700 bg-violet-50 px-2 py-0.5 rounded border border-violet-200">
                                  {s.id}
                                </span>
                                <span className="text-[11px] text-zinc-400 font-mono">({s.group})</span>
                              </div>
                              <p className="text-[11px] text-zinc-500 mt-0.5">{s.company} • Mentori: {s.mentor}</p>
                            </div>

                            <span className={`inline-flex items-center space-x-1.5 text-xs font-bold px-3 py-1 rounded-xl border shadow-xs ${ects.color}`}>
                              <Award className="w-3.5 h-3.5 shrink-0" />
                              <span>JAMI: {totalScore.toFixed(1)} / 100 ball — "{ects.grade}" ({ects.label})</span>
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                            {/* Mentor Score */}
                            <div className="p-3 rounded-xl bg-white border border-zinc-200">
                              <span className="text-[11px] text-zinc-500 flex items-center space-x-1">
                                <Briefcase className="w-3.5 h-3.5 text-zinc-400" />
                                <span>Korxona Mentori Bali:</span>
                              </span>
                              <p className="text-sm font-bold text-zinc-900 mt-1">{s.mentorScore} / 50 ball</p>
                              <span className="text-[10px] text-emerald-600 font-medium">Baho to'liq tasdiqlangan</span>
                            </div>

                            {/* Teacher Defense Score Input */}
                            <div className="p-3 rounded-xl bg-white border border-zinc-200">
                              <span className="text-[11px] text-zinc-500 flex items-center space-x-1">
                                <BookOpen className="w-3.5 h-3.5 text-zinc-400" />
                                <span>OTM Himoya Bali (0 - 50):</span>
                              </span>
                              <div className="flex items-center space-x-2 mt-1">
                                <input
                                  type="number"
                                  min="0"
                                  max="50"
                                  step="0.5"
                                  value={teacherScore}
                                  onChange={(e) => setDefenseScores({
                                    ...defenseScores,
                                    [s.id]: Math.min(50, Math.max(0, parseFloat(e.target.value) || 0))
                                  })}
                                  className="w-24 text-sm font-bold text-zinc-900 p-1.5 border border-zinc-300 rounded-lg text-center focus:outline-none focus:border-zinc-900"
                                />
                                <span className="text-xs text-zinc-400">/ 50 ball</span>
                              </div>
                            </div>

                            {/* Report File Download */}
                            <div className="p-3 rounded-xl bg-white border border-zinc-200 flex flex-col justify-between">
                              <span className="text-[11px] text-zinc-500">Talaba Yakuniy Hisoboti:</span>
                              <button
                                onClick={() => {
                                  setNotification(`${s.reportFile} muvaffaqiyatli yuklab olindi!`);
                                  setTimeout(() => setNotification(null), 3000);
                                }}
                                className="text-[11px] text-zinc-900 font-semibold underline flex items-center space-x-1 mt-1 hover:text-blue-600"
                              >
                                <Download className="w-3.5 h-3.5" />
                                <span className="truncate">{s.reportFile}</span>
                              </button>
                            </div>
                          </div>

                          <div className="flex justify-end pt-1">
                            <button
                              onClick={() => {
                                setNotification(`${s.name} uchun yakuniy ${totalScore.toFixed(1)} ball va "${ects.grade}" ECTS bahosi tasdiqlandi va dekanatga yuborildi!`);
                                setTimeout(() => setNotification(null), 3500);
                              }}
                              className="px-4 py-2 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800 shadow-sm transition-all"
                            >
                              Bahoni Tasdiqlash va Dekanatga Yuborish
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: ASSIGNED STUDENTS (BIRIKTIRILGAN TALABALAR) */}
            {activeTab === 'students' && (
              <div className="space-y-6">
                <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 gap-3">
                    <div>
                      <h3 className="text-sm font-bold text-zinc-900">Menga Biriktirilgan Amaliyotchi Talabalar</h3>
                      <p className="text-xs text-zinc-500">Dekanat tomonidan sizga ilmiy rahbar sifatida biriktirilgan talabalar ro'yxati</p>
                    </div>

                    <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200/80 rounded-xl">
                      Yuklama: {students.length} / 3 nafar (100% to'lgan)
                    </span>
                  </div>

                  {/* Search Input */}
                  <div className="relative w-full sm:w-80 pt-1">
                    <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-3.5" />
                    <input
                      type="text"
                      placeholder="Talaba ismi, ID yoki guruhi bo'yicha..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-zinc-200 bg-white placeholder-zinc-400 focus:outline-none focus:border-zinc-900"
                    />
                  </div>

                  {/* Interactive Table with Row Click to Modal */}
                  <div className="overflow-x-auto pt-2">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-zinc-50 text-zinc-500 border-b border-zinc-200">
                        <tr>
                          <th className="py-2.5 px-3 font-medium">Student ID</th>
                          <th className="py-2.5 px-3 font-medium">Talaba F.I.SH</th>
                          <th className="py-2.5 px-3 font-medium">Guruhi</th>
                          <th className="py-2.5 px-3 font-medium">Amaliyot Korxonasi</th>
                          <th className="py-2.5 px-3 font-medium">Mentor F.I.SH</th>
                          <th className="py-2.5 px-3 font-medium">Davomat</th>
                          <th className="py-2.5 px-3 font-medium text-right">Amallar</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-100">
                        {filteredStudents.map((s) => (
                          <tr
                            key={s.id}
                            className="hover:bg-zinc-50 transition-colors group"
                          >
                            <td
                              onClick={() => {
                                setSelectedStudentForModal(s);
                                setSelectedHeatmapDay(s.practiceDays[0] || null);
                              }}
                              className="py-3 px-3 font-mono font-bold text-violet-700 cursor-pointer"
                            >
                              {s.id}
                            </td>
                            <td
                              onClick={() => {
                                setSelectedStudentForModal(s);
                                setSelectedHeatmapDay(s.practiceDays[0] || null);
                              }}
                              className="py-3 px-3 font-semibold text-zinc-900 group-hover:text-blue-600 transition-colors cursor-pointer"
                            >
                              {s.name}
                            </td>
                            <td className="py-3 px-3 font-mono text-zinc-500">{s.group}</td>
                            <td className="py-3 px-3 text-zinc-700">{s.company}</td>
                            <td className="py-3 px-3 text-zinc-700">{s.mentor}</td>
                            <td className="py-3 px-3 font-semibold text-emerald-700">{s.attendanceRate} ({s.daysCompleted})</td>
                            <td className="py-3 px-3 text-right space-x-2">
                              <button
                                onClick={() => setTelegramModalStudent(s)}
                                className="inline-flex items-center space-x-1 px-2.5 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-[11px] font-medium transition-colors"
                                title="Telegram orqali xabar yuborish"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                                <span>Telegram</span>
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedStudentForModal(s);
                                  setSelectedHeatmapDay(s.practiceDays[0] || null);
                                }}
                                className="inline-flex items-center space-x-1 px-2.5 py-1 bg-zinc-900 text-white hover:bg-zinc-800 rounded-lg text-[11px] font-medium transition-colors"
                              >
                                <span>Taftish</span>
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

            {/* TAB 4: REPORTS (KAFEDRA HISOBOTI) */}
            {activeTab === 'reports' && (
              <div className="space-y-6">
                <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-zinc-100 gap-3">
                    <div>
                      <h3 className="text-sm font-bold text-zinc-900">Kafedra Amaliyot Hisobotlari & Sillabuslar</h3>
                      <p className="text-xs text-zinc-500">Uslubiy ko'rsatmalar, amaliyot dasturlari va yakuniy kafedra baholari eksporti</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setIsUploadModalOpen(true)}
                        className="inline-flex items-center space-x-1.5 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-medium hover:bg-indigo-700 shadow-sm transition-all"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>+ Yangi Uslubiy Qo'llanma Yuklash</span>
                      </button>

                      <button
                        onClick={() => {
                          setNotification('Kafedra hisoboti Excel formati shakllantirildi va yuklab olindi!');
                          setTimeout(() => setNotification(null), 3000);
                        }}
                        className="inline-flex items-center space-x-1.5 px-4 py-2 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800 shadow-sm"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Hisobotni Yuklash (XLSX)</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {documentsList.map((doc, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-zinc-200/60 bg-zinc-50/40">
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="text-xs font-bold text-zinc-900">{doc.title}</h4>
                            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                              {doc.type}
                            </span>
                          </div>
                          <p className="text-[11px] text-zinc-400 font-mono mt-0.5">{doc.ext} • {doc.date}</p>
                        </div>
                        <button
                          onClick={() => {
                            setNotification(`${doc.title} yuklab olindi!`);
                            setTimeout(() => setNotification(null), 2500);
                          }}
                          className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-white border border-zinc-200 text-zinc-700 rounded-lg text-xs font-medium hover:bg-zinc-50"
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

            {/* TAB 5: SETTINGS */}
            {activeTab === 'settings' && (
              <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-zinc-900">Kafedra O'qituvchisi Sozlamalari</h3>
                  <p className="text-xs text-zinc-500 mt-0.5">Aloqa ma'lumotlari, qabul soatlari va bildirishnoma parametrlari</p>
                </div>

                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-xs font-medium text-zinc-700 mb-1">F.I.SH</label>
                    <input
                      type="text"
                      defaultValue="Dotsent Jamshid Karimov"
                      className="w-full text-xs p-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-700 mb-1">Telefon Raqami</label>
                    <input
                      type="text"
                      defaultValue="+998 90 333 33 33"
                      className="w-full text-xs p-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-700 mb-1">Konsultatsiya va Qabul Soatlari</label>
                    <input
                      type="text"
                      defaultValue="Chorshanba va Juma 14:00 - 16:00 (304-xona)"
                      className="w-full text-xs p-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-900"
                    />
                    <p className="text-[11px] text-zinc-400 mt-1">Talabalar konsultatsiya uchun shu vaqtlarda murojaat qilishadi</p>
                  </div>

                  <div className="p-4 rounded-xl border border-zinc-200/80 bg-zinc-50/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-zinc-900">Kritik Davomat Bildirishnomasi</span>
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-zinc-900 rounded" />
                    </div>
                    <p className="text-[11px] text-zinc-500">
                      Talaba 2 kun ketma-ket amaliyotga kelmasa Telegram orqali ogohlantirish olish
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setNotification('O\'qituvchi sozlamalari saqlandi!');
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

      {/* INTERACTIVE FULL DOSSIER MODAL WITH CONTRIBUTIONS HEATMAP */}
      {selectedStudentForModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-zinc-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
            {/* Gradient Top Line */}
            <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 via-blue-500 to-emerald-500 shrink-0" />

            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              {/* Modal Header */}
              <div className="flex items-start justify-between pb-4 border-b border-zinc-100">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-2xl bg-violet-50 text-violet-700 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-base font-bold text-zinc-900">{selectedStudentForModal.name}</h3>
                      <span className="font-mono text-xs font-bold text-violet-700 bg-violet-50 px-2 py-0.5 rounded border border-violet-200">
                        {selectedStudentForModal.id}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      Guruhi: <span className="font-mono text-zinc-800 font-semibold">{selectedStudentForModal.group}</span> • Shartnoma: <span className="font-mono text-emerald-700 font-semibold">{selectedStudentForModal.contractNo}</span> • Korxona: <span className="font-semibold text-zinc-800">{selectedStudentForModal.company}</span>
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedStudentForModal(null)}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 hover:rotate-90 transition-transform duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* KPI Block: Attendance & Progress */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-2">
                  <span className="text-xs text-zinc-500 font-medium">Haqiqiy Ish Kunlari Davomati</span>
                  <div className="flex items-baseline justify-between">
                    <p className="text-xl font-bold text-emerald-600">22 / 24 kun</p>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">91.6%</span>
                  </div>
                  <div className="w-full bg-zinc-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full transition-all duration-700 ease-out" style={{ width: '91.6%' }} />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-2">
                  <span className="text-xs text-zinc-500 font-medium">Dam Olish Kunlari Hisobi</span>
                  <p className="text-xl font-bold text-zinc-900 mt-1">6 kun</p>
                  <p className="text-[11px] text-zinc-400">Shanba va Yakshanba (hisobga kiritilmagan)</p>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-2">
                  <span className="text-xs text-zinc-500 font-medium">Mentor va OTM ECTS Bali</span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs font-semibold text-zinc-700">Mentor: {selectedStudentForModal.mentorScore}/50</span>
                    <span className="text-xs font-semibold text-blue-600">OTM: {defenseScores[selectedStudentForModal.id] || 0}/50</span>
                  </div>
                  <p className="text-xs font-bold text-emerald-700">
                    Jami: {selectedStudentForModal.mentorScore + (defenseScores[selectedStudentForModal.id] || 0)} / 100 ({calculateGradeLetter(selectedStudentForModal.mentorScore + (defenseScores[selectedStudentForModal.id] || 0)).grade})
                  </p>
                </div>
              </div>

              {/* CONTRIBUTIONS HEATMAP (30-DAY PRACTICE MATRIX) */}
              <div className="space-y-3 p-4 rounded-2xl border border-zinc-200 bg-white shadow-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">30 Kunlik Amaliyot Matritsasi (Contributions Heatmap)</h4>
                    <p className="text-[11px] text-zinc-500">Har bir katakcha ustiga bosib kunlik hisobot va fotolavhani tekshiring</p>
                  </div>
                  <div className="flex items-center space-x-3 text-[10px] font-medium text-zinc-600">
                    <span className="flex items-center space-x-1"><span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 inline-block" /><span>To'liq (Full)</span></span>
                    <span className="flex items-center space-x-1"><span className="w-2.5 h-2.5 rounded-sm bg-amber-400 inline-block" /><span>Chala (Partial)</span></span>
                    <span className="flex items-center space-x-1"><span className="w-2.5 h-2.5 rounded-sm bg-rose-500 inline-block" /><span>Bo'sh (Empty)</span></span>
                    <span className="flex items-center space-x-1"><span className="w-2.5 h-2.5 rounded-sm bg-zinc-200 border border-dashed border-zinc-400 inline-block" /><span>Dam olish</span></span>
                  </div>
                </div>

                {/* Heatmap Grid (30 boxes) */}
                <div className="grid grid-cols-10 sm:grid-cols-15 gap-2 pt-2">
                  {selectedStudentForModal.practiceDays.map((pd) => {
                    let bgClass = 'bg-emerald-500 text-white hover:bg-emerald-600';
                    if (pd.status === 'PARTIAL') bgClass = 'bg-amber-400 text-zinc-900 hover:bg-amber-500';
                    if (pd.status === 'EMPTY') bgClass = 'bg-rose-500 text-white hover:bg-rose-600';
                    if (pd.status === 'WEEKEND') bgClass = 'bg-zinc-100 text-zinc-400 border border-dashed border-zinc-300';
                    if (pd.status === 'FUTURE') bgClass = 'bg-zinc-50 text-zinc-300 border border-zinc-200';

                    const isSelected = selectedHeatmapDay?.dayNumber === pd.dayNumber;

                    return (
                      <button
                        key={pd.dayNumber}
                        onClick={() => setSelectedHeatmapDay(pd)}
                        title={`${pd.dayNumber}-kun (${pd.date}): ${pd.taskDescription}`}
                        className={`h-9 rounded-lg flex flex-col items-center justify-center font-mono text-[11px] font-bold transition-all transform hover:scale-105 ${bgClass} ${
                          isSelected ? 'ring-2 ring-zinc-900 ring-offset-2 shadow-md' : ''
                        }`}
                      >
                        <span>{pd.dayNumber}</span>
                        <span className="text-[8px] opacity-80">{pd.isWeekend ? 'Dam' : 'Kun'}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SELECTED DAY DETAILS PANEL */}
              {selectedHeatmapDay && (
                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/90 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-zinc-200">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-indigo-600" />
                      <span className="text-xs font-bold text-zinc-900">
                        {selectedHeatmapDay.dayNumber}-kun ({selectedHeatmapDay.date}, {selectedHeatmapDay.weekday}) — {
                          selectedHeatmapDay.status === 'FULL' ? '🟢 To\'liq Tasdiqlangan' :
                          selectedHeatmapDay.status === 'PARTIAL' ? '🟡 Chala Hisobot' :
                          selectedHeatmapDay.status === 'EMPTY' ? '🔴 Sababsiz Qoldirilgan' :
                          selectedHeatmapDay.status === 'WEEKEND' ? '⚪ Dam Olish Kuni' : '⏳ Kelgusi Kun'
                        }
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-zinc-500">Mentor Bali: ⭐ {selectedHeatmapDay.mentorScore || 0}/5</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <p className="text-zinc-800">
                      <strong>Talaba yozgan ish:</strong> {selectedHeatmapDay.taskDescription}
                    </p>

                    {selectedHeatmapDay.skills && selectedHeatmapDay.skills.length > 0 && (
                      <div className="flex items-center space-x-1.5 flex-wrap gap-y-1">
                        <strong className="text-zinc-600 mr-1">Ko'nikmalar:</strong>
                        {selectedHeatmapDay.skills.map((skill, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded bg-zinc-200 text-zinc-800 text-[10px] font-mono font-bold">
                            [{skill}]
                          </span>
                        ))}
                      </div>
                    )}

                    {selectedHeatmapDay.photoTitle && (
                      <div className="flex items-center space-x-2 p-2 rounded-xl bg-white border border-zinc-200">
                        <ImageIcon className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="text-[11px] font-medium text-zinc-700 truncate">{selectedHeatmapDay.photoTitle}</span>
                        <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold ml-auto">📸 Tasdiqlangan Foto</span>
                      </div>
                    )}

                    {selectedHeatmapDay.status === 'EMPTY' && (
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-rose-600 font-medium">Talaba bu kuni hisobot topshirmagan!</span>
                        <button
                          onClick={() => {
                            setTelegramModalStudent(selectedStudentForModal);
                            setSelectedStudentForModal(null);
                          }}
                          className="inline-flex items-center space-x-1 px-3 py-1.5 bg-blue-600 text-white rounded-xl text-xs font-medium hover:bg-blue-700 shadow-xs"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Talabaga Telegramdan Eslatma Yuborish</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* OTM Defense Score Input & Footer Actions */}
              <div className="pt-2 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-3 w-full sm:w-auto">
                  <span className="text-xs font-bold text-zinc-700">OTM Himoya Bali (0-50):</span>
                  <input
                    type="number"
                    min="0"
                    max="50"
                    step="0.5"
                    value={defenseScores[selectedStudentForModal.id] || 0}
                    onChange={(e) => setDefenseScores({
                      ...defenseScores,
                      [selectedStudentForModal.id]: Math.min(50, Math.max(0, parseFloat(e.target.value) || 0))
                    })}
                    className="w-20 text-xs font-bold text-zinc-900 p-2 border border-zinc-300 rounded-xl text-center focus:outline-none focus:border-zinc-900"
                  />
                  <span className="text-xs text-zinc-400">/ 50</span>
                </div>

                <div className="flex space-x-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => {
                      setIsVedomostModalOpen(true);
                    }}
                    className="inline-flex items-center space-x-1.5 px-4 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-xl text-xs font-medium transition-all"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Vedomost PDF</span>
                  </button>

                  <button
                    onClick={() => {
                      setNotification(`${selectedStudentForModal.name} ning to'liq dosye tahrirlari va bahosi saqlandi!`);
                      setSelectedStudentForModal(null);
                      setTimeout(() => setNotification(null), 3000);
                    }}
                    className="px-5 py-2.5 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800 shadow-sm transition-all"
                  >
                    Saqlash va Yopish
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TELEGRAM MESSAGING MODAL (@tiupm_bot) */}
      {telegramModalStudent && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-zinc-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-sky-400 to-indigo-600" />
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-zinc-900">Telegram Xabar Jo'natish (@tiupm_bot)</h3>
                    <p className="text-[11px] text-zinc-500">Qabul qiluvchi: <span className="font-semibold text-zinc-900">{telegramModalStudent.name}</span> ({telegramModalStudent.group})</p>
                  </div>
                </div>
                <button
                  onClick={() => setTelegramModalStudent(null)}
                  className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 hover:rotate-90 transition-transform duration-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-zinc-700">Xabar matni:</label>
                <textarea
                  rows={4}
                  placeholder="Masalan: Hurmatli talaba, yakuniy amaliyot hisobotingizni 10-noyabrgacha yuklashingiz shart."
                  value={telegramMessageText}
                  onChange={(e) => setTelegramMessageText(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-zinc-200 bg-white placeholder-zinc-400 text-zinc-900 focus:outline-none focus:border-zinc-900 resize-none"
                />
                <p className="text-[10px] text-zinc-400">Ushbu bildirishnoma @tiupm_bot orqali talabaning shaxsiy Telegram akkauntiga darhol yuboriladi.</p>
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-zinc-100">
                <button
                  onClick={() => setTelegramModalStudent(null)}
                  className="px-3.5 py-2 rounded-xl text-xs text-zinc-600 hover:bg-zinc-100"
                >
                  Bekor qilish
                </button>
                <button
                  onClick={() => {
                    setNotification(`${telegramModalStudent.name} ga @tiupm_bot orqali xabar muvaffaqiyatli jo'natildi!`);
                    setTelegramModalStudent(null);
                    setTelegramMessageText('');
                    setTimeout(() => setNotification(null), 3000);
                  }}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-medium hover:bg-blue-700 shadow-sm transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Xabarni Jo'natish</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RASMIY KAFEDRA ECTS VEDOMOST PDF MODAL */}
      {isVedomostModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-zinc-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="h-1.5 w-full bg-gradient-to-r from-indigo-600 via-blue-600 to-emerald-600" />
            <div className="p-6 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-zinc-900">Tashkent International University</h3>
                    <p className="text-xs text-zinc-500 font-medium">Rasmiy Kafedra ECTS Baholash Vedomosti (2025/2026)</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsVedomostModalOpen(false)}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 hover:rotate-90 transition-transform duration-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Vedomost Printable Preview Area */}
              <div className="p-4 rounded-xl border border-zinc-200 bg-zinc-50/70 space-y-4 font-mono text-xs text-zinc-800">
                <div className="text-center pb-2 border-b border-zinc-200 space-y-1">
                  <p className="font-bold text-sm text-zinc-900">O'ZBEKISTON RESPUBLIKASI OLIY TA'LIM, FAN VA INNOVATSIYALAR VAZIRLIGI</p>
                  <p className="font-bold text-indigo-700">TASHKENT INTERNATIONAL UNIVERSITY</p>
                  <p className="text-[11px] text-zinc-600">Dasturiy injiniring kafedrasi • 4-kurs Malakaviy Ishlab Chiqarish Amaliyoti</p>
                </div>

                <div className="grid grid-cols-2 text-[11px] text-zinc-700 pb-2">
                  <p><strong>O'quv yili:</strong> 2025/2026 (Kuzgi semestr)</p>
                  <p><strong>Fan / Modul:</strong> Malakaviy Amaliyot</p>
                  <p><strong>Ilmiy rahbar:</strong> Dotsent J. Karimov</p>
                  <p><strong>Guruh:</strong> DI-202-22</p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-[11px] text-left border-collapse">
                    <thead>
                      <tr className="bg-zinc-200 text-zinc-900">
                        <th className="p-2 border border-zinc-300">ID</th>
                        <th className="p-2 border border-zinc-300">F.I.SH</th>
                        <th className="p-2 border border-zinc-300 text-center">Mentor (50)</th>
                        <th className="p-2 border border-zinc-300 text-center">Himoya (50)</th>
                        <th className="p-2 border border-zinc-300 text-center">Jami (100)</th>
                        <th className="p-2 border border-zinc-300 text-center">ECTS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((s) => {
                        const tScore = defenseScores[s.id] || 0;
                        const total = s.mentorScore + tScore;
                        const ects = calculateGradeLetter(total);
                        return (
                          <tr key={s.id} className="bg-white">
                            <td className="p-2 border border-zinc-300 font-bold">{s.id}</td>
                            <td className="p-2 border border-zinc-300 font-semibold">{s.name}</td>
                            <td className="p-2 border border-zinc-350 text-center">{s.mentorScore}</td>
                            <td className="p-2 border border-zinc-300 text-center">{tScore}</td>
                            <td className="p-2 border border-zinc-300 text-center font-bold">{total.toFixed(1)}</td>
                            <td className="p-2 border border-zinc-300 text-center font-bold text-emerald-700">{ects.grade} ({ects.label})</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="pt-4 flex justify-between items-end text-[11px] text-zinc-700 border-t border-zinc-200">
                  <div>
                    <p>Kafedra mudiri: ____________ (imzo)</p>
                    <p className="mt-1">Ilmiy rahbar: ____________ (imzo)</p>
                  </div>
                  <div className="text-right">
                    <p>Sana: 2026-11-05</p>
                    <p className="text-emerald-700 font-bold mt-1">M.O'. (University Seal)</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-zinc-100">
                <button
                  onClick={() => setIsVedomostModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-zinc-600 hover:bg-zinc-100"
                >
                  Yopish
                </button>
                <button
                  onClick={() => {
                    setNotification('Rasmiy Kafedra ECTS Vedomosti PDF formati yuklab olindi!');
                    setIsVedomostModalOpen(false);
                    setTimeout(() => setNotification(null), 3000);
                  }}
                  className="inline-flex items-center space-x-1.5 px-5 py-2 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800 shadow-sm transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>PDF Sifatida Yuklab Olish</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* METHODIC GUIDE & SYLLABUS UPLOAD MODAL */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-zinc-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <Upload className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-bold text-zinc-900">Yangi Uslubiy Qo'llanma / Sillabus Yuklash</h3>
                </div>
                <button
                  onClick={() => setIsUploadModalOpen(false)}
                  className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 hover:rotate-90 transition-transform duration-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-medium text-zinc-700 mb-1">Hujjat Nomi:</label>
                  <input
                    type="text"
                    placeholder="Masalan: Axborot xavfsizligi fanidan amaliyot qo'llanmasi"
                    value={newDocTitle}
                    onChange={(e) => setNewDocTitle(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-900 focus:outline-none focus:border-zinc-900"
                  />
                </div>

                <div>
                  <label className="block font-medium text-zinc-700 mb-1">Amaliyot Turi:</label>
                  <select
                    value={newDocType}
                    onChange={(e) => setNewDocType(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-900 focus:outline-none focus:border-zinc-900"
                  >
                    <option value="Malakaviy amaliyot">Malakaviy amaliyot</option>
                    <option value="Bitiruv oldi">Bitiruv oldi amaliyoti</option>
                    <option value="Kafedra uslubiyoti">Kafedra uslubiyoti</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-zinc-700 mb-1">Faylni Tanlang (.pdf, .docx):</label>
                  <input
                    type="file"
                    accept=".pdf,.docx"
                    className="w-full text-xs text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-zinc-900 file:text-white hover:file:bg-zinc-800"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-zinc-100">
                <button
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-3.5 py-2 rounded-xl text-xs text-zinc-600 hover:bg-zinc-100"
                >
                  Bekor qilish
                </button>
                <button
                  onClick={() => {
                    if (!newDocTitle.trim()) {
                      alert('Iltimos, hujjat nomini kiriting!');
                      return;
                    }
                    setDocumentsList([
                      { title: newDocTitle, ext: 'PDF (1.8 MB)', date: '2026-11-05', type: newDocType },
                      ...documentsList
                    ]);
                    setNotification(`"${newDocTitle}" muvaffaqiyatli yuklandi va kafedra ro'yxatiga qo'shildi!`);
                    setIsUploadModalOpen(false);
                    setNewDocTitle('');
                    setTimeout(() => setNotification(null), 3000);
                  }}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-medium hover:bg-indigo-700 shadow-sm transition-all"
                >
                  Yuklash va Saqlash
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
