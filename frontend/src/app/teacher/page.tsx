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
  MessageSquare
} from 'lucide-react';

export default function TeacherDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'logbooks' | 'syllabus' | 'defense' | 'settings'>('overview');

  const [notification, setNotification] = useState<string | null>(null);

  // Grading states
  const [defenseScores, setDefenseScores] = useState<Record<string, number>>({
    'std_1': 46.0,
    'std_2': 48.0,
    'std_3': 42.0
  });

  const [academicNote, setAcademicNote] = useState('');

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('pms_user');
    }
    router.push('/login');
  };

  const calculateGradeLetter = (total: number) => {
    if (total >= 90) return { grade: 'A', label: 'A\'lo' };
    if (total >= 80) return { grade: 'B', label: 'Yaxshi' };
    if (total >= 70) return { grade: 'C', label: 'Qoniqarli' };
    if (total >= 60) return { grade: 'D', label: 'Yetarli' };
    return { grade: 'F', label: 'Qoniqarsiz' };
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
              <p className="text-[11px] text-zinc-400">Kafedra O'qituvchisi (Ilmiy Rahbar) Portali</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 bg-zinc-50 border border-zinc-200/60 px-3 py-1.5 rounded-xl text-xs">
              <span className="font-semibold text-zinc-900">Dotsent Alisher Qodirov</span>
              <span className="text-zinc-300">|</span>
              <span className="text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded text-[10px] font-bold">DASTURIY INJINIRING KAFEDRASI</span>
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

      {/* Main Container */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 flex-1 flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <aside className="w-full md:w-60 shrink-0">
          <div className="bg-white border border-zinc-200/80 rounded-2xl p-2.5 shadow-sm space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'overview' ? 'bg-zinc-900 text-white shadow-sm' : 'text-zinc-600 hover:bg-zinc-50'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Monitoring Paneli</span>
            </button>

            <button
              onClick={() => setActiveTab('students')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'students' ? 'bg-zinc-900 text-white shadow-sm' : 'text-zinc-600 hover:bg-zinc-50'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Mening Talabalarim (18)</span>
            </button>

            <button
              onClick={() => setActiveTab('logbooks')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'logbooks' ? 'bg-zinc-900 text-white shadow-sm' : 'text-zinc-600 hover:bg-zinc-50'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Kundaliklar Nazorati</span>
            </button>

            <button
              onClick={() => setActiveTab('syllabus')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'syllabus' ? 'bg-zinc-900 text-white shadow-sm' : 'text-zinc-600 hover:bg-zinc-50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Sillabus va Dasturlar</span>
            </button>

            <button
              onClick={() => setActiveTab('defense')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'defense' ? 'bg-zinc-900 text-white shadow-sm' : 'text-zinc-600 hover:bg-zinc-50'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Yakuniy Himoya & ECTS</span>
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

        {/* Content */}
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
                  <span className="text-xs text-zinc-500">Biriktirilgan Talabalar</span>
                  <p className="text-2xl font-bold text-zinc-900 mt-2">18 nafar</p>
                  <p className="text-[11px] text-zinc-400 mt-1">DI-202-22, DI-201-22</p>
                </div>

                <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-sm">
                  <span className="text-xs text-zinc-500">Faol Amaliyot O'tayotgan</span>
                  <p className="text-2xl font-bold text-emerald-600 mt-2">16 nafar</p>
                  <p className="text-[11px] text-emerald-700 mt-1">88.9% faol</p>
                </div>

                <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-sm">
                  <span className="text-xs text-zinc-500">Hamkor Korxonalar Soni</span>
                  <p className="text-2xl font-bold text-zinc-900 mt-2">8 ta</p>
                  <p className="text-[11px] text-zinc-400 mt-1">Toshkent shahar</p>
                </div>

                <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-sm">
                  <span className="text-xs text-zinc-500">Himoyaga Tayyor Hisobotlar</span>
                  <p className="text-2xl font-bold text-purple-600 mt-2">4 ta</p>
                  <p className="text-[11px] text-purple-700 mt-1">Ko'rib chiqish lozim</p>
                </div>
              </div>

              {/* Notice Card */}
              <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm">
                <h3 className="text-sm font-bold text-zinc-900 mb-2">Akademik Amaliyot Rahbari Eslatmasi</h3>
                <p className="text-xs text-zinc-600 leading-relaxed mb-4">
                  Talabalarning amaliyot kundaliklarini muntazam tekshirib boring. Korxona mentori qo'ygan 50 ballik bahodan so'ng, siz kafedrada o'tadigan himoyada <strong>0 dan 50 ballgacha</strong> o'z bahoingizni kiritasiz. Tizim avtomatik ravishda 100 ballik ECTS tizimida bahoni hisoblab beradi.
                </p>
                <button 
                  onClick={() => setActiveTab('defense')}
                  className="px-4 py-2 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800 shadow-sm"
                >
                  🎓 Yakuniy Himoyalarni Ko'rish
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: STUDENTS */}
          {activeTab === 'students' && (
            <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm font-bold text-zinc-900 mb-1">Mening Ilmiy Biriktirilgan Talabalarim (18)</h3>
              <p className="text-xs text-zinc-500 mb-4">Korxonalarga biriktirilgan va siz nazorat qilayotgan talabalar ro'yxati</p>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-zinc-50 text-zinc-500 border-b border-zinc-200">
                    <tr>
                      <th className="py-2.5 px-3 font-medium">Talaba F.I.SH</th>
                      <th className="py-2.5 px-3 font-medium">Guruhi</th>
                      <th className="py-2.5 px-3 font-medium">Korxona</th>
                      <th className="py-2.5 px-3 font-medium">Mentor F.I.SH</th>
                      <th className="py-2.5 px-3 font-medium">Mentor Tel</th>
                      <th className="py-2.5 px-3 font-medium">Progress</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {[
                      { name: 'Sardor Rahimov', group: 'DI-202-22', company: 'Uzum Technologies MCHJ', mentor: 'Sardor Bekmurodov', phone: '+998 90 999 11 22', progress: '42 / 60 kun' },
                      { name: 'Madina Karimova', group: 'DI-202-22', company: 'Uzum Technologies MCHJ', mentor: 'Sardor Bekmurodov', phone: '+998 90 999 11 22', progress: '42 / 60 kun' },
                      { name: 'Javohir Toshmatov', group: 'DI-201-22', company: 'IT Park Uzbekistan', mentor: 'Farrux Zokirov', phone: '+998 90 888 33 44', progress: '40 / 60 kun' },
                      { name: 'Zarnigor Aliyeva', group: 'DI-201-22', company: 'Click MCHJ', mentor: 'Aziz Nishonov', phone: '+998 90 777 55 66', progress: '42 / 60 kun' }
                    ].map((s, idx) => (
                      <tr key={idx} className="hover:bg-zinc-50/50">
                        <td className="py-3 px-3 font-semibold text-zinc-900">{s.name}</td>
                        <td className="py-3 px-3 font-mono text-zinc-500">{s.group}</td>
                        <td className="py-3 px-3 text-zinc-700">{s.company}</td>
                        <td className="py-3 px-3 text-zinc-700">{s.mentor}</td>
                        <td className="py-3 px-3 font-mono text-zinc-500">{s.phone}</td>
                        <td className="py-3 px-3 font-semibold text-emerald-700">{s.progress}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: LOGBOOKS */}
          {activeTab === 'logbooks' && (
            <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-4">
              <div>
                <h3 className="text-sm font-bold text-zinc-900">Kundaliklar Monitoringi & Akademik Izoh</h3>
                <p className="text-xs text-zinc-500">Talabalar bajargan ishlar va mentor bergan tasdiqlarni masofadan ko'rish</p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    student: 'Sardor Rahimov',
                    group: 'DI-202-22',
                    company: 'Uzum Technologies MCHJ',
                    date: '2026-11-01',
                    tasks: 'FastAPI WebSockets orqali jonli bildirishnomalar arxitekturasini loyihalash va sinash',
                    mentorReview: 'Ajoyib natija, kod toza yozilgan.'
                  },
                  {
                    student: 'Madina Karimova',
                    group: 'DI-202-22',
                    company: 'Uzum Technologies MCHJ',
                    date: '2026-11-01',
                    tasks: 'Next.js 14 komponentlarida Tailwind CSS bilan oq minimalist shakllarni yaratish',
                    mentorReview: 'Dizayn standartlariga mos, ma\'qullandi.'
                  }
                ].map((l, i) => (
                  <div key={i} className="p-4 rounded-xl border border-zinc-200/80 bg-zinc-50/50 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-zinc-900">{l.student} ({l.group}) • {l.company}</span>
                      <span className="text-[11px] text-zinc-500 font-mono">{l.date}</span>
                    </div>
                    <p className="text-xs text-zinc-800"><strong>Bajarilgan ish:</strong> {l.tasks}</p>
                    <p className="text-[11px] text-emerald-700 font-semibold bg-emerald-50/60 p-2 rounded-lg border border-emerald-100">
                      Mentor Fikri: "{l.mentorReview}"
                    </p>

                    <div className="pt-2 flex items-center space-x-2">
                      <input 
                        type="text" 
                        placeholder="Talabaga ilmiy tavsiya / izoh qoldiring..."
                        className="flex-1 text-xs p-2 rounded-xl border border-zinc-200 bg-white"
                      />
                      <button 
                        onClick={() => {
                          setNotification('Akademik tavsiya talabaga yuborildi!');
                          setTimeout(() => setNotification(null), 3000);
                        }}
                        className="px-3 py-2 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800"
                      >
                        Yuborish
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SYLLABUS */}
          {activeTab === 'syllabus' && (
            <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-bold text-zinc-900">Kafedra Amaliyot Dasturi va Sillabuslar</h3>
                  <p className="text-xs text-zinc-500">Talabalar yuklab olishi mumkin bo'lgan uslubiy ko'rsatmalar</p>
                </div>
                <button className="px-3.5 py-2 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800 shadow-sm">
                  + Yangi Sillabus Yuklash
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
                    <button className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-white border border-zinc-200 text-zinc-700 rounded-lg text-xs font-medium hover:bg-zinc-50">
                      <Download className="w-3.5 h-3.5" />
                      <span>Yuklab olish</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: DEFENSE */}
          {activeTab === 'defense' && (
            <div className="space-y-6">
              <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-zinc-900">Kafedra Yakuniy Himoyasi va 100 Ballik ECTS Baholash</h3>
                  <p className="text-xs text-zinc-500">Mentor (0-50 ball) va Ustoz (0-50 ball) rubrikalari asosida jami 100 ball hisoblanadi</p>
                </div>

                <div className="space-y-4">
                  {[
                    { id: 'std_1', name: 'Sardor Rahimov', group: 'DI-202-22', mentorScore: 48.0, file: 'Sardor_Rahimov_Hisobot_2026.pdf' },
                    { id: 'std_2', name: 'Madina Karimova', group: 'DI-202-22', mentorScore: 49.0, file: 'Madina_Karimova_Hisobot_2026.pdf' },
                    { id: 'std_3', name: 'Javohir Toshmatov', group: 'DI-201-22', mentorScore: 45.0, file: 'Javohir_Toshmatov_Hisobot_2026.pdf' }
                  ].map((s) => {
                    const teacherScore = defenseScores[s.id] || 0;
                    const totalScore = s.mentorScore + teacherScore;
                    const ects = calculateGradeLetter(totalScore);

                    return (
                      <div key={s.id} className="p-4 rounded-xl border border-zinc-200/80 bg-zinc-50/40 space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <span className="text-xs font-bold text-zinc-900">{s.name}</span>
                            <span className="text-[11px] text-zinc-400 font-mono ml-2">({s.group})</span>
                          </div>
                          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/60">
                            🏆 JAMI: {totalScore.toFixed(1)} / 100 ball — "{ects.grade}" ({ects.label})
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                          <div className="p-2.5 rounded-lg bg-white border border-zinc-200">
                            <span className="text-[11px] text-zinc-500">🏢 Korxona Mentori:</span>
                            <p className="text-sm font-bold text-zinc-900 mt-1">{s.mentorScore} / 50 ball</p>
                          </div>

                          <div className="p-2.5 rounded-lg bg-white border border-zinc-200">
                            <span className="text-[11px] text-zinc-500">👨‍🏫 OTM Himoya Bali (0-50):</span>
                            <input 
                              type="number"
                              min="0"
                              max="50"
                              step="0.5"
                              value={teacherScore}
                              onChange={(e) => setDefenseScores({ ...defenseScores, [s.id]: parseFloat(e.target.value) || 0 })}
                              className="w-24 text-sm font-bold text-zinc-900 p-1 mt-1 border border-zinc-300 rounded"
                            />
                          </div>

                          <div className="p-2.5 rounded-lg bg-white border border-zinc-200 flex items-center justify-between">
                            <span className="text-[11px] text-zinc-500">Talaba Hisoboti:</span>
                            <button className="text-[11px] text-zinc-900 font-semibold underline flex items-center space-x-1">
                              <Download className="w-3 h-3" />
                              <span>{s.file}</span>
                            </button>
                          </div>
                        </div>

                        <button 
                          onClick={() => {
                            setNotification(`${s.name} uchun yakuniy ${totalScore.toFixed(1)} ball va "${ects.grade}" ECTS bahosi tasdiqlandi!`);
                            setTimeout(() => setNotification(null), 3500);
                          }}
                          className="px-4 py-2 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800 shadow-sm"
                        >
                          Yakuniy Bahoni Tasdiqlash
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: SETTINGS */}
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
                    defaultValue="Dotsent Alisher Qodirov"
                    className="w-full text-xs p-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">Telefon Raqami</label>
                  <input 
                    type="text" 
                    defaultValue="+998 90 765 43 21"
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
  );
}
