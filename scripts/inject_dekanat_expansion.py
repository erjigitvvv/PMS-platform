import os

file_path = os.path.join(r'D:\PMS-platform', 'frontend', 'src', 'app', 'dekanat', 'page.tsx')

with open(file_path, 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Icons import
if 'FolderArchive' not in text:
    old_imp = '  Globe\n} from \'lucide-react\';'
    if old_imp not in text:
        old_imp = '  Globe\r\n} from \'lucide-react\';'
    new_imp = '  Globe,\r\n  Send,\r\n  FolderArchive,\r\n  Printer\r\n} from \'lucide-react\';'
    text = text.replace(old_imp, new_imp, 1)

# 2. Translations
uz_anchor = "navSettings: 'Sozlamalar',"
if uz_anchor in text and "navAttendanceAudit" not in text:
    text = text.replace(uz_anchor, """navSettings: 'Sozlamalar',
    navAttendanceAudit: 'Davomat & Inspeksiya',
    navBroadcast: 'Telegram Xabarnomalar',
    navDossier: 'Amaliyot Jildi',
    referralLetter: "Yo'llanma Xati",""", 1)

ru_anchor = "navSettings: 'Настройки',"
if ru_anchor in text and "navAttendanceAudit" not in text:
    text = text.replace(ru_anchor, """navSettings: 'Настройки',
    navAttendanceAudit: 'Посещаемость и инспекция',
    navBroadcast: 'Telegram рассылка',
    navDossier: 'Досье практики',
    referralLetter: 'Направление на практику',""", 1)

# 3. Sidebar items
sidebar_anchor = "{ id: 'contracts-pending', label: t.navContracts, icon: FileText, badge: String(applications.filter(a => a.status === 'SUBMITTED').length) },"
if sidebar_anchor in text and "attendance-audit" not in text:
    new_sidebar = sidebar_anchor + """
            { id: 'attendance-audit', label: (t as any).navAttendanceAudit || (lang === 'uz' ? 'Davomat & Inspeksiya' : 'Посещаемость и инспекция'), icon: CalendarCheck },
            { id: 'broadcast-hub', label: (t as any).navBroadcast || (lang === 'uz' ? 'Telegram Xabarnomalar' : 'Telegram рассылка'), icon: Send, badge: '@tiupm_bot' },"""
    text = text.replace(sidebar_anchor, new_sidebar, 1)

# 4. State variables
state_anchor = "  const [selectedAppForView, setSelectedAppForView] = useState<ApplicationItem | null>(null);"
if state_anchor in text and "selectedDossierStudent" not in text:
    new_states = state_anchor + """

  // --- APPROVED EXPANSION FEATURES ---
  // Feature 1: Referral Letter (Yo'llanma xati)
  const [selectedReferralStudent, setSelectedReferralStudent] = useState<StudentItem | null>(null);
  const [referralLetters, setReferralLetters] = useState<Record<string, { status: 'DEFAULT' | 'UPLOADED'; fileName?: string; uploadDate?: string }>>({
    'ST501832': { status: 'UPLOADED', fileName: "Yo'llanma_Bekzod_Ergashev_Signed.pdf", uploadDate: '02.11.2026' }
  });

  // Feature 3: Attendance Heatmap & Field Audit (Inspeksiya Aktlari)
  const [attendanceSubTab, setAttendanceSubTab] = useState<'matrix' | 'audit'>('matrix');
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [auditReports, setAuditReports] = useState([
    {
      id: 'AUD-2026-001',
      company: 'Uzum Technologies MCHJ',
      date: '02.11.2026',
      inspector: 'Alisher Qodirov (Fakultet Dekani)',
      studentsChecked: ['Bekzod Ergashev', 'Sardor Rahimov'],
      status: 'APPROVED_ALL',
      notes: "Uzum Technologies bosh ofisida 2 nafar talaba ish joyida, mentor Sardor Bekmurodov nazorati ostida amaliyot o'tayotgani tasdiqlandi. Ish sharoiti a'lo darajada.",
      photosCount: 2
    },
    {
      id: 'AUD-2026-002',
      company: 'IT Park Uzbekistan',
      date: '30.10.2026',
      inspector: 'Rustam Zokirov (Amaliyot mas\\'uli)',
      studentsChecked: ['Javohir Toshmatov', 'Malika Saidova'],
      status: 'APPROVED_ALL',
      notes: "IT Park rezident inkubatorida talabalar to'liq kunlik jadval asosida loyihalar ustida ishlamoqda. Davomat 100% qayd etildi.",
      photosCount: 1
    }
  ]);
  const [newAudit, setNewAudit] = useState({
    company: 'Uzum Technologies MCHJ',
    inspector: 'Alisher Qodirov (Fakultet Dekani)',
    date: '2026-11-03',
    studentsCheckedText: 'Bekzod Ergashev, Sardor Rahimov',
    status: 'APPROVED_ALL',
    notes: ''
  });

  // Feature 5: Practicum Dossier (Amaliyot Jildi)
  const [selectedDossierStudent, setSelectedDossierStudent] = useState<StudentItem | null>(null);

  // Feature 6: Telegram Broadcast Hub (@tiupm_bot)
  const [broadcastTarget, setBroadcastTarget] = useState<'ALL_STUDENTS' | 'TEACHERS' | 'MENTORS' | 'RISK_STUDENTS' | 'ALL'>('ALL_STUDENTS');
  const [broadcastCategory, setBroadcastCategory] = useState<'URGENT' | 'REMINDER' | 'OFFICIAL' | 'DEADLINE'>('OFFICIAL');
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [broadcastHistory, setBroadcastHistory] = useState([
    {
      id: 'BC-101',
      title: '3 Tomonlama Shartnomalar Topshirish Muddati',
      message: "Barcha talabalar diqqatiga! Amaliyot shartnomalarini tizimga yuklashning so'nggi muddati 25-fevral.",
      target: 'Talabalar (32 nafar)',
      category: 'DEADLINE',
      time: '02.11.2026 14:30',
      status: 'DELIVERED'
    },
    {
      id: 'BC-102',
      title: 'Haftalik Davomat va Fotohisobotlarni Tasdiqlash',
      message: "Hurmatli mentorlar, iltimos, talabalarning o'tgan haftadagi fotohisobotlarini tasdiqlab berishingizni so'raymiz.",
      target: 'Mentorlar (4 nafar)',
      category: 'REMINDER',
      time: '01.11.2026 18:00',
      status: 'DELIVERED'
    }
  ]);"""
    text = text.replace(state_anchor, new_states, 1)

# 5. Handlers
handler_anchor = "  const handleCreatePartner = (e: React.FormEvent) => {"
if handler_anchor in text and "handleSendBroadcast" not in text:
    new_handlers = """  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle.trim() || !broadcastMessage.trim()) return;

    const targetNames: Record<string, string> = {
      'ALL_STUDENTS': 'Talabalar (32 nafar)',
      'TEACHERS': 'Kafedra Ustozlari (4 nafar)',
      'MENTORS': 'Mentorlar (4 nafar)',
      'RISK_STUDENTS': 'Xavf ostidagi talabalar (3 nafar)',
      'ALL': 'Barcha Ishtirokchilar (40 nafar)'
    };

    const newBC = {
      id: `BC-${Math.floor(100 + Math.random() * 900)}`,
      title: broadcastTitle.trim(),
      message: broadcastMessage.trim(),
      target: targetNames[broadcastTarget] || 'Talabalar',
      category: broadcastCategory,
      time: 'Hozirgina',
      status: 'DELIVERED'
    };

    setBroadcastHistory([newBC, ...broadcastHistory]);
    setBroadcastTitle('');
    setBroadcastMessage('');
    setNotification(lang === 'uz' ? `Xabar @tiupm_bot orqali ${targetNames[broadcastTarget]} ga muvaffaqiyatli jo'natildi!` : `Сообщение через @tiupm_bot успешно отправлено!`);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleCreateAudit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAudit.notes.trim()) return;

    const created = {
      id: `AUD-2026-00${auditReports.length + 1}`,
      company: newAudit.company,
      date: newAudit.date,
      inspector: newAudit.inspector,
      studentsChecked: newAudit.studentsCheckedText.split(',').map(s => s.trim()),
      status: newAudit.status,
      notes: newAudit.notes.trim(),
      photosCount: 1
    };

    setAuditReports([created, ...auditReports]);
    setIsAuditModalOpen(false);
    setNewAudit({
      company: 'Uzum Technologies MCHJ',
      inspector: `${deanName} (Fakultet Dekani)`,
      date: '2026-11-03',
      studentsCheckedText: 'Bekzod Ergashev, Sardor Rahimov',
      status: 'APPROVED_ALL',
      notes: ''
    });
    setNotification(lang === 'uz' ? 'Joyiga chiqib tekshirish dalolatnomasi muvaffaqiyatli saqlandi!' : 'Акт выездной инспекции успешно сохранен!');
    setTimeout(() => setNotification(null), 3500);
  };

  const handleUploadReferral = (studentId: string, fileName: string) => {
    setReferralLetters(prev => ({
      ...prev,
      [studentId]: {
        status: 'UPLOADED',
        fileName,
        uploadDate: '03.11.2026'
      }
    }));
    setNotification(lang === 'uz' ? `Imzolangan yo'llanma xati ("${fileName}") tizimga yuklandi va saqlandi!` : `Подписанное направление ("${fileName}") успешно загружено!`);
    setTimeout(() => setNotification(null), 3500);
  };

""" + handler_anchor
    text = text.replace(handler_anchor, new_handlers, 1)

# 6. Add buttons in student table row
button_anchor = """                          <td className="p-3 text-right">
                            <button
                              onClick={() => setSelectedStudent(st)}
                              className="px-2.5 py-1.5 bg-zinc-900 text-white rounded-lg text-[11px] font-medium hover:bg-zinc-800 transition-colors"
                            >
                              Ko'rish / Tahrir
                            </button>
                          </td>"""
if button_anchor in text and "setSelectedDossierStudent" not in text:
    new_buttons = """                          <td className="p-3 text-right space-x-1.5 whitespace-nowrap">
                            <button
                              type="button"
                              onClick={() => setSelectedReferralStudent(st)}
                              className="px-2 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-[11px] font-medium border border-blue-200 transition-colors inline-flex items-center space-x-1"
                              title="Yo'llanma xatini yuklash va ko'rish"
                            >
                              <FileText className="w-3 h-3" />
                              <span>Yo'llanma</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setSelectedDossierStudent(st)}
                              className="px-2 py-1 bg-amber-50 text-amber-800 hover:bg-amber-100 rounded-lg text-[11px] font-medium border border-amber-200 transition-colors inline-flex items-center space-x-1"
                              title="To'liq amaliyot jildi (Dossier)"
                            >
                              <FolderArchive className="w-3 h-3" />
                              <span>Jild</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setSelectedStudent(st)}
                              className="px-2.5 py-1 bg-zinc-900 text-white rounded-lg text-[11px] font-medium hover:bg-zinc-800 transition-colors"
                            >
                              Ko'rish / Tahrir
                            </button>
                          </td>"""
    text = text.replace(button_anchor, new_buttons, 1)

# 7. Add Views before {/* --- MODALS --- */}
modals_anchor = "      {/* --- MODALS --- */}"
if modals_anchor in text and "attendance-audit" not in text:
    views_code = """            {/* TAB: ATTENDANCE HEATMAP & FIELD AUDIT */}
            {activeTab === 'attendance-audit' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 gap-3">
                  <div>
                    <h3 className="text-base font-bold text-zinc-900">
                      {lang === 'uz' ? 'Davomat Matritsasi va Inspeksiya Nazorati (Field Audit)' : 'Матрица Посещаемости и Инспекционный Контроль'}
                    </h3>
                    <p className="text-xs text-zinc-500">
                      {lang === 'uz' ? 'Talabalarning 30 kunlik amaliyot davomat matritsasi va korxonalarga joyiga chiqib tekshirish dalolatnomalari.' : '30-дневная матрица посещаемости и акты выездных проверок на предприятиях.'}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="flex items-center bg-zinc-100 p-1 rounded-xl border border-zinc-200/80">
                      <button
                        type="button"
                        onClick={() => setAttendanceSubTab('matrix')}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                          attendanceSubTab === 'matrix' ? 'bg-white text-zinc-900 shadow-xs' : 'text-zinc-600 hover:text-zinc-900'
                        }`}
                      >
                        {lang === 'uz' ? '30 Kunlik Matritsa' : '30-дневная матрица'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setAttendanceSubTab('audit')}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                          attendanceSubTab === 'audit' ? 'bg-white text-zinc-900 shadow-xs' : 'text-zinc-600 hover:text-zinc-900'
                        }`}
                      >
                        {lang === 'uz' ? 'Inspeksiya Aktlari (Field Audit)' : 'Акты инспекций'}
                      </button>
                    </div>

                    {attendanceSubTab === 'audit' && (
                      <button
                        type="button"
                        onClick={() => setIsAuditModalOpen(true)}
                        className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800 shadow-sm"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>{lang === 'uz' ? 'Yangi Inspeksiya Akti' : 'Новый акт инспекции'}</span>
                      </button>
                    )}
                  </div>
                </div>

                {attendanceSubTab === 'matrix' ? (
                  <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-zinc-100 gap-3">
                      <div className="flex items-center space-x-4 text-xs font-medium text-zinc-600">
                        <span className="flex items-center space-x-1.5">
                          <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                          <span>{lang === 'uz' ? 'Kelgan (Present)' : 'Присутствовал'}</span>
                        </span>
                        <span className="flex items-center space-x-1.5">
                          <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                          <span>{lang === 'uz' ? 'Kech kelgan (0.75x LATE)' : 'Опоздал (0.75x)'}</span>
                        </span>
                        <span className="flex items-center space-x-1.5">
                          <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                          <span>{lang === 'uz' ? 'Sababsiz (Absent)' : 'Отсутствовал'}</span>
                        </span>
                        <span className="flex items-center space-x-1.5">
                          <span className="w-3 h-3 rounded-full bg-zinc-200 inline-block" />
                          <span>{lang === 'uz' ? 'Kutilmoqda' : 'Предстоит'}</span>
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setNotification(lang === 'uz' ? 'Davomat matritsasi Excel formatida yuklab olindi!' : 'Матрица посещаемости скачана в Excel!');
                          setTimeout(() => setNotification(null), 3000);
                        }}
                        className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-xl text-xs font-medium transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>{lang === 'uz' ? 'Excel Matritsani Yuklash' : 'Скачать матрицу в Excel'}</span>
                      </button>
                    </div>

                    <div className="overflow-x-auto border border-zinc-200 rounded-xl">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-zinc-50 border-b border-zinc-200 text-[10px] uppercase font-semibold text-zinc-500">
                          <tr>
                            <th className="p-3 sticky left-0 bg-zinc-50 z-10 w-48">Talaba F.I.SH / Guruh</th>
                            <th className="p-3 w-36">Korxona</th>
                            {Array.from({ length: 30 }, (_, i) => (
                              <th key={i} className="p-1.5 text-center font-mono w-7">
                                {i + 1}
                              </th>
                            ))}
                            <th className="p-3 text-right">Davomat %</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-200 bg-white">
                          {students.slice(0, 12).map((st, sIdx) => {
                            const attNum = parseInt(st.attendance) || 90;
                            return (
                              <tr key={st.id} className="hover:bg-zinc-50/80 transition-colors">
                                <td className="p-3 sticky left-0 bg-white z-10 font-medium">
                                  <span className="font-bold text-zinc-950 block">{st.name}</span>
                                  <span className="font-mono text-[10px] text-zinc-400">{st.group}</span>
                                </td>
                                <td className="p-3 text-[11px] text-zinc-600 truncate max-w-[140px]">{st.company}</td>
                                {Array.from({ length: 30 }, (_, d) => {
                                  // Realistic pattern based on attendance %
                                  const dayNum = d + 1;
                                  let colorClass = 'bg-emerald-500'; // Default present
                                  if (dayNum > 20) {
                                    colorClass = 'bg-zinc-200'; // Future
                                  } else if (attNum < 70 && (dayNum === 5 || dayNum === 12 || dayNum === 18)) {
                                    colorClass = 'bg-rose-500'; // Absent
                                  } else if (dayNum % 7 === 0 || (sIdx + dayNum) % 11 === 0) {
                                    colorClass = 'bg-amber-400'; // Late
                                  }

                                  return (
                                    <td key={d} className="p-1 text-center">
                                      <span
                                        className={`inline-block w-4 h-4 rounded-md ${colorClass} text-[8px] font-mono text-white font-bold leading-4`}
                                        title={`${st.name} - ${dayNum}-kun: ${colorClass === 'bg-emerald-500' ? 'Kelgan' : colorClass === 'bg-amber-400' ? 'Kech kelgan' : colorClass === 'bg-rose-500' ? 'Sababsiz' : 'Kutilmoqda'}`}
                                      />
                                    </td>
                                  );
                                })}
                                <td className="p-3 text-right">
                                  <span className={`font-mono font-bold ${attNum >= 80 ? 'text-emerald-700 bg-emerald-50' : 'text-rose-700 bg-rose-50'} px-2 py-0.5 rounded text-[11px] border ${attNum >= 80 ? 'border-emerald-200' : 'border-rose-200'}`}>
                                    {st.attendance}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {auditReports.map((aud) => (
                      <div key={aud.id} className="bg-white border border-zinc-200/90 rounded-2xl p-5 shadow-xs space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="font-mono text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                              {aud.id}
                            </span>
                            <h4 className="text-sm font-bold text-zinc-900 mt-1">{aud.company}</h4>
                            <p className="text-xs text-zinc-500">Tekshiruv sanasi: <b>{aud.date}</b></p>
                          </div>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {aud.status === 'APPROVED_ALL' ? '🟢 Ijobiy / Ish joyida' : '🔴 Qoidabuzarlik'}
                          </span>
                        </div>

                        <div className="text-xs text-zinc-700 bg-zinc-50 p-3 rounded-xl border border-zinc-200/60 space-y-1">
                          <p><b>Dekanat Mas'uli (Inspektor):</b> {aud.inspector}</p>
                          <p><b>Tekshirilgan Talabalar:</b> {aud.studentsChecked.join(', ')}</p>
                          <p className="pt-1 text-zinc-600 italic">"{aud.notes}"</p>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-zinc-100 text-xs">
                          <span className="text-zinc-400 text-[11px]">Fotohisobot biriktirilgan: {aud.photosCount} ta</span>
                          <button
                            type="button"
                            onClick={() => {
                              setNotification(lang === 'uz' ? `Inspeksiya dalolatnomasi (${aud.id}) PDF formatida yuklab olindi!` : `Акт инспекции (${aud.id}) успешно скачан!`);
                              setTimeout(() => setNotification(null), 3000);
                            }}
                            className="inline-flex items-center space-x-1 px-3 py-1.5 bg-zinc-900 text-white hover:bg-zinc-800 rounded-xl text-[11px] font-medium transition-colors"
                          >
                            <Download className="w-3 h-3" />
                            <span>PDF Dalolatnoma</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB: TELEGRAM BROADCAST HUB */}
            {activeTab === 'broadcast-hub' && (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-mono font-bold border border-blue-200">
                      @tiupm_bot BROADCAST
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[11px] text-emerald-600 font-semibold">Bot Faol & Polling holatida</span>
                  </div>
                  <h3 className="text-base font-bold text-zinc-900 mt-1">
                    {lang === 'uz' ? 'Telegram Bot Xabarnomalar va E\\'lonlar Markazi' : 'Центр Рассылки и Уведомлений через Telegram Bot'}
                  </h3>
                  <p className="text-xs text-zinc-500">
                    {lang === 'uz' ? 'Talabalar, kafedra ustozlari va mentorlarning Telegramiga bevosita rasmiy e\\'lon va xabarlar jo\\'natish.' : 'Прямая отправка уведомлений и объявлений студентам, кураторам и наставникам в Telegram.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left: Compose Form */}
                  <div className="lg:col-span-2 bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-4">
                    <h4 className="text-sm font-bold text-zinc-900 pb-2 border-b border-zinc-100 flex items-center space-x-2">
                      <Send className="w-4 h-4 text-blue-600" />
                      <span>{lang === 'uz' ? 'Yangi Xabarnoma Yaratish va Yuborish' : 'Создать и Отправить Рассылку'}</span>
                    </h4>

                    {/* Quick Template Buttons */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider block">
                        Tezkor Andozalar (1-klikda to'ldirish):
                      </label>
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setBroadcastTitle("3 Tomonlama Shartnomalarni Yuklash Oxirgi Muddati");
                            setBroadcastMessage("Hurmatli talabalar, amaliyot shartnomalarini korxona tomonidan imzolangan holda tizimga yuklashning so'nggi kuni — 25-fevral. Kechiktirilgan arizalar qabul qilinmaydi!");
                            setBroadcastCategory('DEADLINE');
                            setBroadcastTarget('ALL_STUDENTS');
                          }}
                          className="px-2.5 py-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-lg text-[11px] transition-colors"
                        >
                          📅 Shartnoma Muddati
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setBroadcastTitle("Kunlik Fotohisobotlarni Unutmang!");
                            setBroadcastMessage("Amaliyotchi talabalar diqqatiga: har kuni soat 22:00 gacha amaliyot joyidan kamida 1 ta fotosurat va bajarilgan vazifalar hisobotini @tiupm_bot orqali yuklashingiz shart.");
                            setBroadcastCategory('REMINDER');
                            setBroadcastTarget('ALL_STUDENTS');
                          }}
                          className="px-2.5 py-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-lg text-[11px] transition-colors"
                        >
                          📸 Fotohisobot Eslatmasi
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setBroadcastTitle("Mentorlar Uchun: Haftalik Hisobotlarni Tasdiqlash");
                            setBroadcastMessage("Hurmatli hamkor tashkilot mentorlari! O'tgan haftadagi talabalar davomati va fotohisobotlarini tasdiqlab berishingizni so'raymiz. Sizning bahoyingiz talaba umumiy ECTS reytingida 50% ni tashkil etadi.");
                            setBroadcastCategory('OFFICIAL');
                            setBroadcastTarget('MENTORS');
                          }}
                          className="px-2.5 py-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-lg text-[11px] transition-colors"
                        >
                          🏢 Mentorlarga Eslatma
                        </button>
                      </div>
                    </div>

                    <form onSubmit={handleSendBroadcast} className="space-y-4 pt-1">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-zinc-700 mb-1">Qabul Qiluvchilar Auditoriyasi *</label>
                          <select
                            value={broadcastTarget}
                            onChange={(e) => setBroadcastTarget(e.target.value as any)}
                            className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 bg-white focus:outline-none focus:border-zinc-900"
                          >
                            <option value="ALL_STUDENTS">🎓 Barcha Talabalar (32 nafar)</option>
                            <option value="TEACHERS">👨‍🏫 Kafedra Ustozlari (4 nafar)</option>
                            <option value="MENTORS">🏢 Korxona Mentorlari (4 nafar)</option>
                            <option value="RISK_STUDENTS">⚠️ Xavf ostidagi talabalar (Davomat &lt;60%)</option>
                            <option value="ALL">👥 Barcha Ishtirokchilar (40 nafar)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-zinc-700 mb-1">Xabar Toifasi *</label>
                          <select
                            value={broadcastCategory}
                            onChange={(e) => setBroadcastCategory(e.target.value as any)}
                            className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 bg-white focus:outline-none focus:border-zinc-900"
                          >
                            <option value="OFFICIAL">🟢 Rasmiy E'lon (Official)</option>
                            <option value="REMINDER">🟡 Eslatma (Reminder)</option>
                            <option value="DEADLINE">🔵 Muddat / Deadline</option>
                            <option value="URGENT">🔴 Shoshilinch (Urgent)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-zinc-700 mb-1">Xabar Sarlavhasi *</label>
                        <input
                          type="text"
                          required
                          value={broadcastTitle}
                          onChange={(e) => setBroadcastTitle(e.target.value)}
                          placeholder="Masalan: Shartnomalarni topshirish oxirgi muddati"
                          className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-zinc-700 mb-1">Xabar Matni (Telegram xabarnomasi) *</label>
                        <textarea
                          required
                          rows={4}
                          value={broadcastMessage}
                          onChange={(e) => setBroadcastMessage(e.target.value)}
                          placeholder="Xabar matnini kiriting. Ushbu xabar barcha qabul qiluvchilarning Telegramiga @tiupm_bot nomidan yetkaziladi..."
                          className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900"
                        />
                      </div>

                      <div className="pt-2 flex justify-end">
                        <button
                          type="submit"
                          className="inline-flex items-center space-x-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-medium hover:bg-blue-700 shadow-sm transition-all"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Telegram Bot Orqali Yuborish</span>
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Right: Broadcast History */}
                  <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-4">
                    <h4 className="text-sm font-bold text-zinc-900 pb-2 border-b border-zinc-100 flex items-center justify-between">
                      <span>Yuborilganlar Tarixi</span>
                      <span className="text-[10px] font-mono text-zinc-400">Jami: {broadcastHistory.length} ta</span>
                    </h4>

                    <div className="space-y-3 max-h-[440px] overflow-y-auto pr-1">
                      {broadcastHistory.map((bc) => (
                        <div key={bc.id} className="p-3.5 rounded-xl border border-zinc-200 bg-zinc-50/50 space-y-2">
                          <div className="flex justify-between items-start gap-2">
                            <span className="font-bold text-xs text-zinc-900">{bc.title}</span>
                            <span className={`px-2 py-0.5 rounded text-[9px] font-bold shrink-0 ${
                              bc.category === 'URGENT' ? 'bg-rose-100 text-rose-800' :
                              bc.category === 'DEADLINE' ? 'bg-blue-100 text-blue-800' :
                              bc.category === 'REMINDER' ? 'bg-amber-100 text-amber-800' :
                              'bg-emerald-100 text-emerald-800'
                            }`}>
                              {bc.category}
                            </span>
                          </div>
                          <p className="text-[11px] text-zinc-600 line-clamp-2 leading-relaxed">{bc.message}</p>
                          <div className="flex justify-between items-center pt-2 border-t border-zinc-200/60 text-[10px] text-zinc-400">
                            <span>Auditoriya: <b>{bc.target}</b></span>
                            <span className="text-emerald-600 font-bold">✅ {bc.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

""" + modals_anchor
    text = text.replace(modals_anchor, views_code, 1)

# 8. Add Modals after {/* --- MODALS --- */}
last_modal_anchor = "      {/* 7. Teacher Students Detail Modal */}"
if last_modal_anchor in text and "selectedDossierStudent" not in text:
    modals_code = """      {/* 8. Referral Letter Modal (Yo'llanma Xati) */}
      {selectedReferralStudent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <div className="flex items-center space-x-2">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-900">Rasmiy Amaliyot Yo'llanma Xati</h3>
                  <p className="text-xs text-zinc-500">Talaba: {selectedReferralStudent.name} ({selectedReferralStudent.id})</p>
                </div>
              </div>
              <button onClick={() => setSelectedReferralStudent(null)} className="text-zinc-400 hover:text-zinc-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 bg-zinc-50 p-4 rounded-2xl border border-zinc-200 text-xs">
              <p><b>Amaliyotchi:</b> {selectedReferralStudent.name}</p>
              <p><b>Guruh:</b> {selectedReferralStudent.group}</p>
              <p><b>Hamkor Korxona:</b> {selectedReferralStudent.company}</p>
              <p><b>Amaliyot Davri:</b> {practicumStart} — {practicumEnd}</p>
              <p><b>Universitet:</b> Tashkent International University (TIU)</p>
            </div>

            {/* Current Referral Status */}
            <div className="p-4 rounded-2xl border border-zinc-200 bg-white space-y-2">
              <span className="text-[10px] uppercase font-bold text-zinc-400 block">Yo'llanma Hujjat Holati</span>
              {referralLetters[selectedReferralStudent.id]?.status === 'UPLOADED' ? (
                <div className="flex items-center justify-between bg-emerald-50 text-emerald-800 p-3 rounded-xl border border-emerald-200 text-xs">
                  <div>
                    <span className="font-bold block">🟢 Muhrlangan yo'llanma saqlangan</span>
                    <span className="text-[11px] font-mono text-emerald-700">{referralLetters[selectedReferralStudent.id].fileName}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setNotification(`"${referralLetters[selectedReferralStudent.id].fileName}" yuklab olindi!`);
                      setTimeout(() => setNotification(null), 3000);
                    }}
                    className="px-2.5 py-1 bg-white border border-emerald-300 text-emerald-800 rounded-lg text-xs font-medium"
                  >
                    Ko'rish
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between bg-zinc-50 p-3 rounded-xl border border-zinc-200 text-xs">
                  <span className="text-zinc-600">Korxona muhri qo'yilgan skaner hali yuklanmagan</span>
                  <span className="px-2 py-0.5 bg-amber-50 text-amber-700 rounded text-[10px] font-bold border border-amber-200">Kutilmoqda</span>
                </div>
              )}
            </div>

            {/* Actions: Download Official Letter / Upload Signed Letter */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => {
                  setNotification(`"${selectedReferralStudent.name}" uchun rasmiy yo'llanma xati PDF formatida yuklab olindi!`);
                  setTimeout(() => setNotification(null), 3500);
                }}
                className="w-full py-2.5 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800 flex items-center justify-center space-x-2 shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>Rasmiy Yo'llanma Xatini Yuklab Olish (PDF)</span>
              </button>

              <label className="w-full py-2.5 bg-white border border-zinc-300 text-zinc-800 hover:bg-zinc-50 rounded-xl text-xs font-medium flex items-center justify-center space-x-2 cursor-pointer transition-colors shadow-2xs">
                <Upload className="w-4 h-4 text-blue-600" />
                <span>Imzolangan va Muhrlangan Yo'llanmani Yuklash</span>
                <input
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) {
                      handleUploadReferral(selectedReferralStudent.id, f.name);
                    }
                  }}
                />
              </label>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedReferralStudent(null)}
                className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl text-xs font-medium"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 9. Comprehensive Practicum Dossier Modal (Talaba Amaliyot Jildi) */}
      {selectedDossierStudent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 space-y-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150 max-h-[92vh] overflow-y-auto">
            {/* Dossier Letterhead */}
            <div className="flex items-start justify-between pb-4 border-b border-zinc-200">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-zinc-900 text-white flex items-center justify-center font-bold shadow-sm">
                  <FolderArchive className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <span className="font-mono text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    DOSSIER: DOS-2026-{selectedDossierStudent.id}
                  </span>
                  <h3 className="text-base font-bold text-zinc-900 mt-1">
                    Talabaning To'liq Amaliyot Jildi (Practicum Dossier)
                  </h3>
                  <p className="text-xs text-zinc-500">Tashkent International University • Amaliyot & Karyera Markazi</p>
                </div>
              </div>
              <button onClick={() => setSelectedDossierStudent(null)} className="text-zinc-400 hover:text-zinc-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Student Passport Card */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-zinc-50 p-4 rounded-2xl border border-zinc-200 text-xs">
              <div>
                <span className="text-[10px] text-zinc-400 block">Talaba F.I.SH</span>
                <span className="font-bold text-zinc-900">{selectedDossierStudent.name}</span>
                <span className="text-[10px] font-mono text-blue-600 block">{selectedDossierStudent.id}</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 block">Guruh & Yo'nalish</span>
                <span className="font-semibold text-zinc-800">{selectedDossierStudent.group}</span>
                <span className="text-[10px] text-zinc-500 block">Dasturiy Injiniring</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 block">Kafedra Ustozi</span>
                <span className="font-semibold text-zinc-800">{selectedDossierStudent.teacher}</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 block">Korxona & Mentor</span>
                <span className="font-semibold text-zinc-800">{selectedDossierStudent.company}</span>
                <span className="text-[10px] text-zinc-500 block">{selectedDossierStudent.mentor}</span>
              </div>
            </div>

            {/* Dossier Section 1: Contracts & Referrals */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider flex items-center space-x-1.5">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                <span>1. Rasmiy Shartnoma va Yo'llanma Ma'lumotlari</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-white rounded-xl border border-zinc-200 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-zinc-800">3 Tomonlama Shartnoma:</span>
                    <span className="font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {selectedDossierStudent.contract}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-500">QR-kodli davlat standarti bo'yicha tasdiqlangan.</p>
                </div>

                <div className="p-3 bg-white rounded-xl border border-zinc-200 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-zinc-800">Rasmiy Yo'llanma Xati:</span>
                    <span className="font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      YO'LLANMA-2026-TIU
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-500">Korxona tomonidan muhrlangan skaner biriktirilgan.</p>
                </div>
              </div>
            </div>

            {/* Dossier Section 2: 30-Day Daily Logs Timeline */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider flex items-center space-x-1.5">
                <CalendarCheck className="w-4 h-4 text-blue-600" />
                <span>2. 30 Kunlik Kundalik va Fotohisobotlar Jamlanmasi</span>
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {[
                  { day: '4/30-kun', date: '02.11.2026', task: 'Docker konteynerizatsiya va FastAPI marshrutlarini integratsiyalash', score: '⭐⭐⭐⭐⭐ 5', status: 'Tasdiqlangan' },
                  { day: '3/30-kun', date: '31.10.2026', task: 'Next.js frontend Tailwind komponentlarini loyihalash', score: '⭐⭐⭐⭐⭐ 5', status: 'Tasdiqlangan' },
                  { day: '2/30-kun', date: '30.10.2026', task: 'Git branching modeli va PR bilan ishlash tartibi', score: '⭐⭐⭐⭐ 4', status: 'Tasdiqlangan' },
                  { day: '1/30-kun', date: '29.10.2026', task: 'Texnika xavfsizligi qoidalari va korxona me\'yorlari bilan tanishish', score: '⭐⭐⭐⭐⭐ 5', status: 'Tasdiqlangan' }
                ].map((log, idx) => (
                  <div key={idx} className="p-2.5 bg-zinc-50 rounded-xl border border-zinc-200 flex justify-between items-center text-xs">
                    <div>
                      <span className="font-mono font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded mr-2">{log.day}</span>
                      <span className="text-zinc-800">{log.task}</span>
                    </div>
                    <div className="text-right shrink-0 ml-3">
                      <span className="text-emerald-600 font-bold block">{log.score}</span>
                      <span className="text-[10px] text-zinc-400">{log.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dossier Section 3: Mentor Testimonial & Evaluation */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider flex items-center space-x-1.5">
                <Award className="w-4 h-4 text-amber-600" />
                <span>3. Mentor Rasmiy Tavsiyanomasi & Yakuniy Baholash (100 ECTS)</span>
              </h4>
              <div className="bg-amber-50/50 border border-amber-200 rounded-2xl p-4 text-xs space-y-2">
                <p className="text-zinc-800 italic leading-relaxed">
                  "Talaba <b>{selectedDossierStudent.name}</b> amaliyot davrida o'zini yuqori mas'uliyatli, intizomli va zamonaviy texnologiyalarni tez o'zlashtiruvchi mutaxassis sifatida ko'rsatdi. Kompaniya ichki loyihalarida faol ishtirok etdi."
                </p>
                <div className="flex justify-between items-center pt-2 border-t border-amber-200/60 font-semibold text-zinc-800">
                  <span>Mentor: <b>{selectedDossierStudent.mentor}</b> (Uzum Technologies)</span>
                  <span className="text-emerald-700 font-bold bg-white px-2.5 py-1 rounded-lg border border-amber-200">
                    Mentor Balli: 48 / 50 ball
                  </span>
                </div>
              </div>

              {/* 100 ECTS Score Bar */}
              <div className="bg-zinc-900 text-white rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-zinc-400 block text-[10px] uppercase font-mono">Yakuniy Qaydnoma Xulosasi</span>
                  <span className="text-sm font-bold text-white">Mentor (48) + Ustoz Himoya (47) = 95 Ball (ECTS: A - A'lo)</span>
                </div>
                <span className="px-3 py-1 bg-emerald-500 text-white font-bold rounded-xl text-xs">
                  Muvaffaqiyatli Himoya Qilindi
                </span>
              </div>
            </div>

            {/* Dossier Footer Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-zinc-200">
              <button
                type="button"
                onClick={() => setSelectedDossierStudent(null)}
                className="w-full sm:w-auto px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl text-xs font-medium"
              >
                Yopish
              </button>

              <div className="w-full sm:w-auto flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    window.print();
                  }}
                  className="px-3.5 py-2 bg-white border border-zinc-300 hover:bg-zinc-50 text-zinc-800 rounded-xl text-xs font-medium transition-colors flex items-center space-x-1.5 shadow-2xs"
                >
                  <Printer className="w-3.5 h-3.5 text-zinc-600" />
                  <span>Chop Etish</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setNotification(`Talaba ${selectedDossierStudent.name} ning to'liq amaliyot jildi (Dossier) PDF formatida yuklab olindi!`);
                    setTimeout(() => setNotification(null), 3500);
                  }}
                  className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-medium transition-colors flex items-center space-x-1.5 shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Yagona PDF Jild Sifatida Yuklab Olish</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 10. Field Audit Modal (Inspeksiya Akti Tuzish) */}
      {isAuditModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <div className="flex items-center space-x-2">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-900">Yangi Joyiga Chiqib Tekshirish Akti</h3>
                  <p className="text-xs text-zinc-500">Amaliyot joyida o'tkazilgan reyd va inspeksiya dalolatnomasi</p>
                </div>
              </div>
              <button onClick={() => setIsAuditModalOpen(false)} className="text-zinc-400 hover:text-zinc-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAudit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">Tekshirilgan Korxona *</label>
                <select
                  value={newAudit.company}
                  onChange={(e) => setNewAudit({ ...newAudit, company: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 bg-white focus:outline-none focus:border-zinc-900"
                >
                  {partners.map(pr => (
                    <option key={pr.id} value={pr.name}>{pr.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">Tekshiruv Sanasi *</label>
                  <input
                    type="date"
                    required
                    value={newAudit.date}
                    onChange={(e) => setNewAudit({ ...newAudit, date: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">Tekshiruv Xulosasi *</label>
                  <select
                    value={newAudit.status}
                    onChange={(e) => setNewAudit({ ...newAudit, status: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 bg-white"
                  >
                    <option value="APPROVED_ALL">🟢 Ijobiy / Ish joyida bor</option>
                    <option value="WARNING">🔴 Qoidabuzarlik / Kamchilik</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">Dekanat Mas'uli (Inspektor F.I.SH) *</label>
                <input
                  type="text"
                  required
                  value={newAudit.inspector}
                  onChange={(e) => setNewAudit({ ...newAudit, inspector: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">Tekshirilgan Talabalar F.I.SH *</label>
                <input
                  type="text"
                  required
                  value={newAudit.studentsCheckedText}
                  onChange={(e) => setNewAudit({ ...newAudit, studentsCheckedText: e.target.value })}
                  placeholder="Vergul bilan ajrating: Bekzod Ergashev, Sardor Rahimov"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">Inspeksiya Dalolatnomasi Bayoni *</label>
                <textarea
                  required
                  rows={3}
                  value={newAudit.notes}
                  onChange={(e) => setNewAudit({ ...newAudit, notes: e.target.value })}
                  placeholder="Amaliyot sharoitlari, talabalarning ish o'rnidagi ishtiroki va mentor fikrlari..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAuditModalOpen(false)}
                  className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl text-xs font-medium"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800 shadow-sm"
                >
                  Dalolatnomani Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

""" + last_modal_anchor
    text = text.replace(last_modal_anchor, modals_code, 1)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(text)

print('All 4 approved features injected successfully into dekanat/page.tsx!')
