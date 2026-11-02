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
  Filter
} from 'lucide-react';
import CollapsibleSidebar, { NavItem } from '@/components/CollapsibleSidebar';

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
  academicComment?: string;
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
  { id: 'students', label: 'Biriktirilgan Talabalar', icon: Users, badge: '6' },
  { id: 'reports', label: 'Kafedra Hisoboti', icon: BarChart3 },
  { id: 'settings', label: 'Sozlamalar', icon: Settings },
];

export default function TeacherDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [notification, setNotification] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Defense scores state (0 - 50)
  const [defenseScores, setDefenseScores] = useState<Record<string, number>>({
    'ST501824': 48.0,
    'ST501825': 46.5,
    'ST501826': 49.0,
    'ST501832': 42.0,
    'ST501833': 44.0,
    'ST501834': 0.0
  });

  // Selected student for detail/logbook modal
  const [selectedStudentForModal, setSelectedStudentForModal] = useState<TeacherStudent | null>(null);
  const [academicCommentInput, setAcademicCommentInput] = useState('');

  // 1. Assigned Students list
  const [students, setStudents] = useState<TeacherStudent[]>([
    {
      id: 'ST501824',
      name: 'Bekzod Ergashev',
      group: 'DI-202-22',
      company: 'Uzum Technologies MCHJ',
      mentor: 'Sardor Bekmurodov',
      mentorPhone: '+998 90 999 11 22',
      mentorScore: 48.0,
      attendanceRate: '100%',
      daysCompleted: '44 / 44 kun',
      contractNo: 'AMAL-2026-0041',
      reportFile: 'Bekzod_Ergashev_Amaliyot_Hisoboti.pdf',
      status: 'FAOL'
    },
    {
      id: 'ST501825',
      name: 'Sardor Rahimov',
      group: 'DI-202-22',
      company: 'Uzum Technologies MCHJ',
      mentor: 'Sardor Bekmurodov',
      mentorPhone: '+998 90 999 11 22',
      mentorScore: 47.0,
      attendanceRate: '98.5%',
      daysCompleted: '42 / 60 kun',
      contractNo: 'AMAL-2026-0042',
      reportFile: 'Sardor_Rahimov_Hisobot_2026.pdf',
      status: 'FAOL'
    },
    {
      id: 'ST501826',
      name: 'Madina Karimova',
      group: 'DI-202-22',
      company: 'Uzum Technologies MCHJ',
      mentor: 'Sardor Bekmurodov',
      mentorPhone: '+998 90 999 11 22',
      mentorScore: 49.0,
      attendanceRate: '95.0%',
      daysCompleted: '42 / 60 kun',
      contractNo: 'AMAL-2026-0043',
      reportFile: 'Madina_Karimova_Hisobot_2026.pdf',
      status: 'FAOL'
    },
    {
      id: 'ST501832',
      name: 'Akobir Rustamov',
      group: 'DI-202-22',
      company: 'Click MCHJ',
      mentor: 'Ulugbek Rustamov',
      mentorPhone: '+998 90 777 55 66',
      mentorScore: 44.0,
      attendanceRate: '92.0%',
      daysCompleted: '38 / 60 kun',
      contractNo: 'AMAL-2026-0045',
      reportFile: 'Akobir_Rustamov_Portfolio.pdf',
      status: 'FAOL'
    },
    {
      id: 'ST501833',
      name: 'Gulnoza Xoliqova',
      group: 'DI-201-22',
      company: 'IT Park Uzbekistan',
      mentor: 'Farrux Zokirov',
      mentorPhone: '+998 90 888 33 44',
      mentorScore: 46.0,
      attendanceRate: '96.5%',
      daysCompleted: '40 / 60 kun',
      contractNo: 'AMAL-2026-0046',
      reportFile: 'Gulnoza_Xoliqova_Hisobot.pdf',
      status: 'FAOL'
    },
    {
      id: 'ST501834',
      name: 'Shaxboz Ismoilov',
      group: 'DI-201-22',
      company: 'Aloqabank ATB',
      mentor: 'Kammuna Iriskulov',
      mentorPhone: '+998 90 555 44 33',
      mentorScore: 42.0,
      attendanceRate: '88.0%',
      daysCompleted: '35 / 60 kun',
      contractNo: 'AMAL-2026-0047',
      reportFile: 'Shaxboz_Ismoilov_Amaliyot.pdf',
      status: 'HIMOYA_KUTILMOQDA'
    }
  ]);

  // 2. Logbook Submissions
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
      photoTitle: 'websocket_load_test_results.png'
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
      photoTitle: 'collapsible_sidebar_figma_preview.png'
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
      hasPhoto: false
    },
    {
      id: 'log_4',
      studentId: 'ST501832',
      studentName: 'Akobir Rustamov',
      group: 'DI-202-22',
      company: 'Click MCHJ',
      date: '2026-10-31',
      tasks: 'To\'lov shlyuzlari API integratsiyasi va webhook payloadlarida xavfsizlik cheklarini yozish',
      skills: 'HMAC Signature, REST API, Payment Security',
      mentorFeedback: 'Xavfsizlik talablariga to\'liq javob beradi.',
      mentorApproved: true,
      hasPhoto: true,
      photoTitle: 'payment_webhook_response.png'
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
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col md:flex-row antialiased text-zinc-900">
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
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-sm">
                    <span className="text-xs text-zinc-500">Menga Biriktirilgan Talabalar</span>
                    <p className="text-2xl font-bold text-zinc-900 mt-2">{students.length} nafar</p>
                    <p className="text-[11px] text-zinc-400 mt-1">Maksimal limit: 8 nafar</p>
                  </div>

                  <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-sm">
                    <span className="text-xs text-zinc-500">Tekshirilgan Kundaliklar</span>
                    <p className="text-2xl font-bold text-emerald-600 mt-2">124 ta</p>
                    <p className="text-[11px] text-emerald-700 mt-1">4 ta yangi ko'rib chiqishda</p>
                  </div>

                  <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-sm">
                    <span className="text-xs text-zinc-500">Amaliyot Korxonalari</span>
                    <p className="text-2xl font-bold text-zinc-900 mt-2">3 ta</p>
                    <p className="text-[11px] text-zinc-400 mt-1">Uzum, IT Park, Click</p>
                  </div>

                  <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-sm">
                    <span className="text-xs text-zinc-500">O'rtacha Kafedra Bali</span>
                    <p className="text-2xl font-bold text-purple-600 mt-2">46.5 / 50</p>
                    <p className="text-[11px] text-purple-700 mt-1">Yuqori akademik natija</p>
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
                    <p className="text-[11px] text-zinc-400 mt-0.5">Yangi foto-hisobotlar va kunlik topshiriqlarni tekshiring</p>
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
                    <p className="text-[11px] text-zinc-400 mt-0.5">Mentor (50) + OTM (50) rubrikasini to'ldirish</p>
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
                    <p className="text-[11px] text-zinc-400 mt-0.5">Davomat va korxona shartnomalarini ko'rish</p>
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
                      <h3 className="text-sm font-bold text-zinc-900">Talabalar Kundaliklari Taftishi</h3>
                      <p className="text-xs text-zinc-500">Talabalar bajargan ishlar, amaliy ko'nikmalar, skrinshot/foto-hisobotlar va mentor tasdiqlari</p>
                    </div>
                    <span className="text-xs text-zinc-500 font-medium">Jami hisobotlar: {logbooks.length} ta</span>
                  </div>

                  <div className="space-y-4 pt-2">
                    {logbooks.map((log) => (
                      <div key={log.id} className="p-4 rounded-xl border border-zinc-200/80 bg-zinc-50/40 space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-bold text-zinc-900">{log.studentName}</span>
                            <span className="text-[11px] text-zinc-400 font-mono">({log.group})</span>
                            <span className="text-[11px] text-zinc-500 font-medium">• {log.company}</span>
                          </div>
                          <span className="text-[11px] text-zinc-500 font-mono">Sana: {log.date}</span>
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

                        {/* Teacher's Academic Recommendation Field */}
                        <div className="flex items-center space-x-2 pt-1">
                          <input 
                            type="text" 
                            placeholder="Ushbu kundalikka ilmiy-metodik tavsiya yoki izohingizni yozing..."
                            className="flex-1 text-xs p-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-900 focus:outline-none focus:border-zinc-900"
                          />
                          <button 
                            onClick={() => {
                              setNotification(`${log.studentName} ning kundaligiga ilmiy tavsiya yuborildi!`);
                              setTimeout(() => setNotification(null), 3000);
                            }}
                            className="px-3.5 py-2.5 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800 transition-all shadow-xs"
                          >
                            Izoh Qoldirish
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2-B: 100-BALLIK ECTS BAHOLASH (SUBMENU OF ACADEMIC) */}
            {activeTab === 'grading-100' && (
              <div className="space-y-6">
                <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-4">
                  <div>
                    <h3 className="text-sm font-bold text-zinc-900">100 Ballik ECTS Baholash Markazi</h3>
                    <p className="text-xs text-zinc-500">Korxona mentori bali (0-50 ball) va Kafedra himoya bali (0-50 ball) yig'indisi asosida avtomatik ECTS hisoblanadi</p>
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

                    <span className="text-xs font-semibold px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200/80 rounded-xl">
                      Yuklama: {students.length} / 8 nafar
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
                          <th className="py-2.5 px-3 font-medium text-right">Amal</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-100">
                        {filteredStudents.map((s) => (
                          <tr 
                            key={s.id} 
                            onClick={() => setSelectedStudentForModal(s)}
                            className="hover:bg-zinc-50 cursor-pointer transition-colors group"
                          >
                            <td className="py-3 px-3 font-mono font-bold text-violet-700">{s.id}</td>
                            <td className="py-3 px-3 font-semibold text-zinc-900 group-hover:text-blue-600 transition-colors">
                              {s.name}
                            </td>
                            <td className="py-3 px-3 font-mono text-zinc-500">{s.group}</td>
                            <td className="py-3 px-3 text-zinc-700">{s.company}</td>
                            <td className="py-3 px-3 text-zinc-700">{s.mentor}</td>
                            <td className="py-3 px-3 font-semibold text-emerald-700">{s.attendanceRate} ({s.daysCompleted})</td>
                            <td className="py-3 px-3 text-right">
                              <span className="text-[11px] text-zinc-400 group-hover:text-zinc-900 underline font-medium">
                                Taftish
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

            {/* TAB 4: REPORTS (KAFEDRA HISOBOTI) */}
            {activeTab === 'reports' && (
              <div className="space-y-6">
                <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-zinc-100 gap-3">
                    <div>
                      <h3 className="text-sm font-bold text-zinc-900">Kafedra Amaliyot Hisobotlari & Sillabuslar</h3>
                      <p className="text-xs text-zinc-500">Uslubiy ko'rsatmalar, amaliyot dasturlari va yakuniy kafedra baholari eksporti</p>
                    </div>

                    <button 
                      onClick={() => {
                        setNotification('Kafedra hisoboti Excel formati shakllantirildi va yuklab olindi!');
                        setTimeout(() => setNotification(null), 3000);
                      }}
                      className="inline-flex items-center space-x-1.5 px-4 py-2 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800 shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Kafedra Yakuniy Hisobotini Yuklash (XLSX)</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {[
                      { title: 'DI-2026: 4-kurs Malakaviy amaliyot dasturi va uslubiy ko\'rsatma', ext: 'PDF (2.4 MB)', date: '2026-09-15' },
                      { title: 'Amaliyot yakuniy hisoboti (Portfolio) rasmiylashtirish standarti', ext: 'DOCX (850 KB)', date: '2026-09-20' },
                      { title: 'Dasturiy injiniring kafedrasi 100 ballik baholash rubrikasi', ext: 'PDF (1.1 MB)', date: '2026-09-25' }
                    ].map((doc, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-zinc-200/60 bg-zinc-50/40">
                        <div>
                          <h4 className="text-xs font-bold text-zinc-900">{doc.title}</h4>
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

      {/* INTERACTIVE DETAIL MODAL: TALABA KUNDALIGI VA TAFTISH KARTASI */}
      {selectedStudentForModal && (
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
                    <h3 className="text-sm font-bold text-zinc-900">{selectedStudentForModal.name}</h3>
                    <span className="font-mono text-[10px] font-bold text-violet-700 bg-violet-50 px-2 py-0.5 rounded border border-violet-200">
                      {selectedStudentForModal.id}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    Guruhi: <span className="font-mono text-zinc-700">{selectedStudentForModal.group}</span> • Shartnoma: <span className="font-mono text-emerald-700">{selectedStudentForModal.contractNo}</span>
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedStudentForModal(null)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Status Cards */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl border border-zinc-200/80 bg-zinc-50/50">
                <span className="text-[10px] text-zinc-400 block">Amaliyot Korxonasi:</span>
                <p className="font-semibold text-zinc-900 mt-0.5">{selectedStudentForModal.company}</p>
                <p className="text-[11px] text-zinc-500">Mentori: {selectedStudentForModal.mentor}</p>
              </div>

              <div className="p-3 rounded-xl border border-zinc-200/80 bg-zinc-50/50">
                <span className="text-[10px] text-zinc-400 block">Davomat Natijasi:</span>
                <p className="font-bold text-emerald-600 mt-0.5">{selectedStudentForModal.attendanceRate}</p>
                <p className="text-[11px] text-zinc-500">{selectedStudentForModal.daysCompleted}</p>
              </div>

              <div className="p-3 rounded-xl border border-zinc-200/80 bg-zinc-50/50">
                <span className="text-[10px] text-zinc-400 block">Mentor Bali (0-50):</span>
                <p className="font-bold text-zinc-900 mt-0.5">{selectedStudentForModal.mentorScore} / 50 ball</p>
              </div>

              <div className="p-3 rounded-xl border border-zinc-200/80 bg-zinc-50/50">
                <span className="text-[10px] text-zinc-400 block">OTM Himoya Bali:</span>
                <p className="font-bold text-blue-600 mt-0.5">{defenseScores[selectedStudentForModal.id] || 0} / 50 ball</p>
              </div>
            </div>

            {/* Academic Comment Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-zinc-700">Ilmiy Rahbar Taqrizi / Izohi:</label>
              <textarea 
                rows={3}
                placeholder="Talabaning amaliyot faoliyati bo'yicha ilmiy xulosangizni yozing..."
                value={academicCommentInput}
                onChange={(e) => setAcademicCommentInput(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-zinc-200 bg-white placeholder-zinc-400 text-zinc-900 focus:outline-none focus:border-zinc-900 resize-none"
              />
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-between pt-2 border-t border-zinc-100">
              <button
                onClick={() => {
                  setNotification(`${selectedStudentForModal.reportFile} yuklab olindi!`);
                  setTimeout(() => setNotification(null), 2500);
                }}
                className="inline-flex items-center space-x-1.5 text-xs text-zinc-700 hover:text-zinc-900 font-medium"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Hisobot faylini ko'rish</span>
              </button>

              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedStudentForModal(null)}
                  className="px-3.5 py-2 rounded-xl text-xs text-zinc-600 hover:bg-zinc-100"
                >
                  Yopish
                </button>
                <button
                  onClick={() => {
                    setNotification(`${selectedStudentForModal.name} ning taqrizi saqlandi!`);
                    setSelectedStudentForModal(null);
                    setAcademicCommentInput('');
                    setTimeout(() => setNotification(null), 3000);
                  }}
                  className="px-4 py-2 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800 shadow-sm"
                >
                  Taqrizni Saqlash
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
