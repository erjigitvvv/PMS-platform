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
  RefreshCw,
  Globe,
  BookUser, // Added for Assign Teacher action
  Send // Added for Telegram Message action
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
  logoUrl?: string;
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
  studentId?: string;
  group: string;
  company: string;
  mentor: string;
  status: 'SUBMITTED' | 'APPROVED' | 'REJECTED';
  contractNo: string | null;
  date: string;
  docFile?: string;
  comment?: string;
}

interface NotificationItem {
  id: string;
  title: string;
  desc: string;
  time: string;
  unread: boolean;
  type: string;
}

type Lang = 'uz' | 'ru';

const translations = {
  uz: {
    portalTitle: 'Tashkent International University',
    portalSubtitle: 'Amaliyot Boshqaruv Portali',
    dekanatRole: 'Dekanat Boshqaruvi',
    dekanatSub: 'Amaliyot & Karyera Markazi',
    logout: 'Tizimdan chiqish',
    notificationsTitle: 'Bildirishnomalar Markazi',
    markAllRead: "Barchasini o'qilgan deb belgilash",
    close: 'Yopish',
    currentLogin: 'Joriy Login',
    // Nav Items
    navOverview: 'Asosiy',
    navStudents: 'Talabalar Boshqaruvi',
    navTeachers: 'Kafedra Ustozlari',
    navContracts: 'Shartnomalar & Arizalar',
    navPartners: 'Hamkor Tashkilotlar',
    navSettings: 'Sozlamalar',
    // Subnav
    subNavAllStudents: 'Barcha Talabalar',
    subNavUnassigned: 'Biriktirilmaganlar',
    subNavCompanies: "Korxonalar Bo'yicha",
    subNavLogs: 'Davomat & Kundalik',
    // Overview
    overviewTitle: 'Fakultet Dekanati Jonli Monitoringi',
    overviewSubtitle: "Talabalar amaliyoti, shartnomalar holati va ustozlar yuklamasi",
    kpiTotalStudents: 'Jami Talabalar',
    kpiTotalStudentsSub: '100% qamrov',
    kpiApprovedContracts: 'Tasdiqlangan Shartnomalar',
    kpiApprovedContractsSub: 'ta kutilmoqda',
    kpiPartners: 'Hamkor Korxonalar',
    kpiPartnersSub: 'faol memorandum',
    kpiAttendance: "O'rtacha Davomat",
    kpiAttendanceSub: "A'lo ko'rsatkich",
    recentApplications: "So'nggi Shartnoma Arizalari",
    recentApplicationsSub: "Talabalar kiritgan arizalarni tezkor ko'rib chiqish va tasdiqlash",
    quickActions: 'Tezkor Amallar',
    actionAddStudent: "Talaba qo'shish",
    actionAddTeacher: "Ustoz qo'shish",
    actionAddPartner: "Hamkor qo'shish",
    actionDownloadReport: 'Hisobotni yuklab olish',
    // Students
    studentsTitle: "Talabalar Ro'yxati va Amaliyot Boshqaruvi",
    studentsSubtitle: "Fakultet talabalarini guruhlar va amaliyot o'rinlari bo'yicha monitoring qilish",
    searchStudentPlaceholder: "Talaba F.I.SH yoki ID raqami bo'yicha qidiruv...",
    allGroups: 'Barcha guruhlar',
    filterAll: 'Barchasi',
    filterAssigned: 'Biriktirilgan',
    filterUnassigned: 'Biriktirilmagan',
    filterActive: 'Faol',
    btnExportExcel: 'Excelga yuklash',
    btnAddStudent: "Yangi Talaba Qo'shish",
    thStudentId: 'Talaba ID',
    thStudentName: 'F.I.SH',
    thGroup: 'Guruh',
    thCompany: 'Korxona',
    thTeacher: 'Kafedra Ustozi',
    thContract: 'Shartnoma',
    thAttendance: 'Davomat',
    thStatus: 'Holati',
    thActions: 'Amallar',
    btnView: "Ko'rish",
    btnAssign: 'Biriktirish',
    statusActive: 'FAOL',
    statusPending: 'KUTILMOQDA',
    statusApproved: 'TASDIQLANDI',
    statusRejected: 'RAD ETILDI',
    // Teachers
    teachersTitle: 'Kafedra Ustozlari va Ilmiy Rahbariyat',
    teachersSubtitle: "Amaliyotchi talabalarga biriktirilgan o'qituvchilar yuklamasi monitoringi",
    searchTeacherPlaceholder: "Ustoz F.I.SH yoki kafedra bo'yicha qidiruv...",
    btnAddTeacher: "Yangi Ustoz Qo'shish",
    thTeacherName: 'Ustoz F.I.SH',
    thDepartment: 'Kafedra / Departament',
    thDegree: 'Ilmiy Unvon',
    thPhone: 'Telefon',
    thAssignedStudents: 'Biriktirilgan Talabalar',
    thQuotaBadge: 'Maksimal Kvota',
    quotaFull: "To'lgan (3/3)",
    quotaAvailable: "O'rin bor",
    quotaLimitNote: 'Fakultet qoidasi: har bir ustozga maksimal 3 nafar talaba',
    // Contracts
    contractsTitle: '3 Tomonlama Shartnomalar va Arizalar Markazi',
    contractsSubtitle: "Talabalar yuborgan amaliyot arizalarini tasdiqlang va QR-kodli shartnoma generatsiya qiling.",
    thDocument: 'Biriktirilgan Hujjat',
    thContractNo: 'Shartnoma №',
    thDekanatComment: 'Dekanat Izohi',
    btnReview: "Ko'rib chiqish",
    btnDecision: 'Qaror qabul qilish',
    btnApprove: 'Tasdiqlash & QR Shartnoma',
    btnReject: 'Rad Etish',
    btnDownloadPdf: 'PDF',
    btnDownloadDocx: 'Word',
    // Review Modal
    reviewModalTitle: "3 Tomonlama Shartnoma & Ariza Ko'rigi",
    reviewModalId: 'Ariza identifikatori',
    commentLabel: "Dekanat Mas'uli Izohi / Xulosasi (Rad etishda MAJBURIY, kamida 10 ta belgi)",
    commentPlaceholder: "Tasdiqlashda izoh ixtiyoriy, rad etilganda sabab yozilishi shart (kamida 10 ta belgi)...",
    commentNotice: "Eslatma: Rad etish uchun kamida 10 ta belgi asoslantirilgan sabab kiritilishi shart. Ushbu izoh talaba kabinetida aks etadi.",
    // Add Student Modal
    modalAddStudentTitle: "Yangi Talaba Qo'shish",
    lblStudentName: 'Talaba F.I.SH *',
    phStudentName: 'Masalan: Azizbek Olimov',
    lblGroup: 'Guruh *',
    phGroup: 'Masalan: DI-202-22',
    lblPhone: 'Telefon Raqami *',
    lblAssignTeacher: 'Biriktiriladigan Ustoz (Ixtiyoriy)',
    phSearchTeacher: 'Ustoz nomini qidirish...',
    optNoTeacher: '-- Biriktirilmasin (Keyinroq biriktirish) --',
    lblAssignCompany: 'Amaliyot Korxonasi (Ixtiyoriy)',
    optNoCompany: '-- Tanlanmasin (Keyinroq biriktirish) --',
    btnSubmitStudent: "Talabani Qo'shish & Login Yaratish",
    // Add Teacher Modal
    modalAddTeacherTitle: "Yangi Kafedra Ustozini Qo'shish",
    lblTeacherName: 'Ustoz F.I.SH *',
    phTeacherName: 'Masalan: Dotsent Jamshid Karimov',
    lblDepartment: 'Kafedra / Departament *',
    phDepartment: 'Kafedra yoki departament nomini kiriting',
    lblDegree: 'Ilmiy Unvon / Lavozim *',
    phDegree: "Masalan: Dotsent, PhD, professor yoki Katta o'qituvchi",
    fixedQuotaTitle: "Qat'iy kvota cheklovi: maksimal 3 nafar talaba",
    fixedQuotaDesc: "Tizim qoidasiga ko'ra har bir biriktirilgan ustoz uchun maksimal 3 ta talaba biriktirish limit qoidasi o'rnatilgan.",
    btnSubmitTeacher: "Ustozni Qo'shish & TC Login Yaratish",
    // Settings 6 Blocks
    settingsTitle: 'Dekanat va Fakultet Kengaytirilgan Sozlamalari',
    settingsSubtitle: "Fakultet profili, amaliyot taqvimi, muhr & rekvizitlar, akademik qoidalar, xabarnomalar va xavfsizlik.",
    setTabAll: 'Barchasi',
    setTabProfile: '1. Rahbariyat Profili',
    setTabCalendar: '2. Amaliyot Taqvimi',
    setTabLegal: '3. Muhr & Rekvizitlar',
    setTabRules: '4. Qoidalar & Limitlar',
    setTabAlerts: '5. Ogohlantirishlar',
    setTabSecurity: '6. Akkaunt Xavfsizligi',
    // Block 1
    block1Title: 'Fakultet va Rahbariyat Profili',
    block1Desc: "Rasmiy buyruqlarda (D1) va 3 tomonlama shartnomalarda ko'rinadigan rekvizitlar.",
    lblFacultyName: "Fakultet To'liq Nomi:",
    lblDeanName: 'Dekan F.I.SH:',
    lblDeanDeputy: "Dekan O'rinbosari / Amaliyot Mas'uli:",
    lblFacultyPhone: 'Aloqa Telefoni:',
    lblFacultyEmail: 'Xizmat E-pochtasi:',
    lblRoomNumber: 'Xona Raqami:',
    btnSaveProfile: 'Profilni Saqlash',
    // Block 2
    block2Title: 'Amaliyot Taqvimi va Muddatlar',
    block2Desc: "O'quv yili, semestr, arizalar qabuli, amaliyot davri va yakuniy himoya muddatlari.",
    lblAcademicYear: "O'quv Yili:",
    lblSemester: 'Semestr:',
    lblAppDeadline: 'Ariza Topshirish Oxirgi Muddati (Deadline):',
    lblPracticumStart: 'Amaliyot Boshlanishi:',
    lblPracticumEnd: 'Amaliyot Yakuni:',
    lblDailyLogTime: 'Kunlik Kundalik Topshirish Vaqti:',
    lblFinalDefenseDate: 'Yakuniy Himoya Sanasi:',
    btnSaveCalendar: 'Muddatlarni Saqlash',
    // Block 3
    block3Title: 'Hujjatlar, Muhr va Yuridik Rekvizitlar',
    block3Desc: "Rasmiy hujjat prefikslari, OTM gerbli muhri faksimilesi va bank rekvizitlari.",
    lblOrderPrefix: "Dekanat Buyrug'i Prefiksi:",
    lblContractPrefix: '3 Tomonlama Shartnoma Prefiksi:',
    lblOfficialSeal: 'Universitet Gerbli Dumaloq Muhri (Faksimile):',
    lblDeanSignature: 'Dekan E-imzo Faksimilesi:',
    lblBankRequisites: 'OTM Bank Rekvizitlari & STIR:',
    btnUploadSeal: 'Muhrni Yangilash',
    btnUploadSignature: 'Imzoni Yangilash',
    btnSaveLegal: 'Hujjat Sozlamalarini Saqlash',
    // Block 4
    block4Title: 'Akademik Qoidalar va Cheklovlar',
    block4Desc: "Ustozlar yuklamasi, minimal davomat, talabalar boshlang'ich paroli va jarima qoidalari.",
    lblMaxStudentsRule: 'Bir Ustozga Maksimal Talabalar Soni:',
    maxStudentsRuleExplanation: "Qat'iy 3 nafar talaba. Ushbu qoida amaliyot sifatini kafolatlash uchun o'rnatilgan va o'zgartirilmaydi.",
    lblMinAttendance: 'Minimal Davomat Chegarasi (%):',
    lblDefaultPassword: "Yangi Talabalar Standart Paroli:",
    lblLatePenaltyToggle: 'Kechiktirilgan hisobotlar uchun jarima ballari hisoblansin',
    latePenaltyDesc: "Belgilangan vaqtdan (22:00) keyin kiritilgan kundaliklar bahosidan avtomatik 5% jarima chegiriladi.",
    btnSaveRules: 'Qoidalarni Saqlash',
    // Block 5
    block5Title: 'Favqulodda Xabarnomalar va Alertlar',
    block5Desc: "Kritik holatlar bo'yicha dekanatga va Telegram botga avtomatik xabarlar.",
    lblAlertAbsence: "3 kun ketma-ket amaliyotga kelmagan talaba bo'yicha dekanatga darhol ogohlantirish yuborilsin",
    lblAlertMissingContract: "Amaliyot boshlanishiga 5 kun qolganda shartnomasiz talabalar monitoringi faollashtirilsin",
    lblTelegramIntegration: 'Telegram Bot Integratsiyasi (Chat ID / Webhook):',
    telegramActiveBadge: '● Telegram Bot Faol (@tiupm_bot)',
    btnSaveAlerts: 'Xabarnomalarni Saqlash',
    // Block 6
    block6Title: 'Dekan Akkaunti Xavfsizligi',
    block6Desc: "Dekanat boshqaruv hisobi kirish ID raqami va maxfiy parolini yangilang.",
    lblDekanatId: 'Dekanat Login Identifikatori:',
    lblCurrentPassword: 'Joriy Parol:',
    lblNewPassword: 'Yangi Parol:',
    lblConfirmPassword: 'Yangi Parolni Tasdiqlang:',
    btnSaveSecurity: 'Xavfsizlik Sozlamalarini Saqlash'
  },
  ru: {
    portalTitle: 'Tashkent International University',
    portalSubtitle: 'Портал Управления Практикой',
    dekanatRole: 'Управление Деканата',
    dekanatSub: 'Центр Практики и Карьеры',
    logout: 'Выйти из системы',
    notificationsTitle: 'Центр Уведомлений',
    markAllRead: 'Отметить все как прочитанные',
    close: 'Закрыть',
    currentLogin: 'Текущий логин',
    // Nav Items
    navOverview: 'Главный дашборд',
    navStudents: 'Управление студентами',
    navTeachers: 'Преподаватели кафедры',
    navContracts: 'Договоры и заявления',
    navPartners: 'Организации-партнеры',
    navSettings: 'Настройки',
    // Subnav
    subNavAllStudents: 'Все Студенты',
    subNavUnassigned: 'Не прикрепленные',
    subNavCompanies: 'По Предприятиям',
    subNavLogs: 'Посещаемость и Дневник',
    // Overview
    overviewTitle: 'Оперативный Мониторинг Деканата',
    overviewSubtitle: 'Практика студентов, статус договоров и нагрузка преподавателей',
    kpiTotalStudents: 'Всего Студентов',
    kpiTotalStudentsSub: '100% охват',
    kpiApprovedContracts: 'Утвержденные Договоры',
    kpiApprovedContractsSub: 'ожидают решения',
    kpiPartners: 'Организации-Партнеры',
    kpiPartnersSub: 'активных меморандумов',
    kpiAttendance: 'Средняя Посещаемость',
    kpiAttendanceSub: 'Отличный показатель',
    recentApplications: 'Последние Заявления на Практику',
    recentApplicationsSub: 'Оперативное рассмотрение и утверждение поданных заявлений',
    quickActions: 'Быстрые Действия',
    actionAddStudent: 'Добавить студента',
    actionAddTeacher: 'Добавить преподавателя',
    actionAddPartner: 'Добавить партнера',
    actionDownloadReport: 'Скачать отчет',
    // Students
    studentsTitle: 'Список Студентов и Управление Практикой',
    studentsSubtitle: 'Мониторинг студентов факультета по академическим группам и местам практики',
    searchStudentPlaceholder: 'Поиск по Ф.И.О. или ID студента...',
    allGroups: 'Все группы',
    filterAll: 'Все',
    filterAssigned: 'Прикрепленные',
    filterUnassigned: 'Не прикрепленные',
    filterActive: 'Активные',
    btnExportExcel: 'Экспорт в Excel',
    btnAddStudent: 'Добавить Студента',
    thStudentId: 'ID Студента',
    thStudentName: 'Ф.И.О.',
    thGroup: 'Группа',
    thCompany: 'Предприятие',
    thTeacher: 'Преподаватель',
    thContract: 'Договор',
    thAttendance: 'Посещаемость',
    thStatus: 'Статус',
    thActions: 'Действия',
    btnView: 'Просмотр',
    btnAssign: 'Прикрепить',
    statusActive: 'АКТИВЕН',
    statusPending: 'ОЖИДАНИЕ',
    statusApproved: 'УТВЕРЖДЕНО',
    statusRejected: 'ОТКЛОНЕНО',
    // Teachers
    teachersTitle: 'Преподаватели Кафедры и Научные Руководители',
    teachersSubtitle: 'Мониторинг нагрузки преподавателей, прикрепленных к студентам-практикантам',
    searchTeacherPlaceholder: 'Поиск по Ф.И.О. или кафедре...',
    btnAddTeacher: 'Добавить Преподавателя',
    thTeacherName: 'Ф.И.О. Преподавателя',
    thDepartment: 'Кафедра / Департамент',
    thDegree: 'Ученое Звание',
    thPhone: 'Телефон',
    thAssignedStudents: 'Прикрепленные Студенты',
    thQuotaBadge: 'Макс. Квота',
    quotaFull: 'Заполнено (3/3)',
    quotaAvailable: 'Есть места',
    quotaLimitNote: 'Правило факультета: максимум 3 студента на одного преподавателя',
    // Contracts
    contractsTitle: 'Центр Трехсторонних Договоров и Заявлений',
    contractsSubtitle: 'Утверждайте заявления студентов и генерируйте официальные договоры с QR-кодом.',
    thDocument: 'Прикрепленный Документ',
    thContractNo: '№ Договора',
    thDekanatComment: 'Комментарий Деканата',
    btnReview: 'Просмотр',
    btnDecision: 'Принять решение',
    btnApprove: 'Утвердить и создать QR',
    btnReject: 'Отклонить',
    btnDownloadPdf: 'PDF',
    btnDownloadDocx: 'Word',
    // Review Modal
    reviewModalTitle: 'Просмотр Трехстороннего Договора и Заявления',
    reviewModalId: 'Идентификатор заявления',
    commentLabel: 'Решение / Комментарий Деканата (ОБЯЗАТЕЛЬНО при отклонении, не менее 10 символов)',
    commentPlaceholder: 'При утверждении необязательно, при отклонении укажите причину (не менее 10 символов)...',
    commentNotice: 'Примечание: Для отклонения заявления обязательно указать причину не менее 10 символов.',
    // Add Student Modal
    modalAddStudentTitle: 'Добавление Нового Студента',
    lblStudentName: 'Ф.И.О. Студента *',
    phStudentName: 'Например: Азизбек Олимов',
    lblGroup: 'Группа *',
    phGroup: 'Например: DI-202-22',
    lblPhone: 'Номер Телефона *',
    lblAssignTeacher: 'Научный Руководитель (Необязательно)',
    phSearchTeacher: 'Поиск преподавателя по имени...',
    optNoTeacher: '-- Не назначать (Назначить позже) --',
    lblAssignCompany: 'База Практики (Необязательно)',
    optNoCompany: '-- Не выбирать (Выбрать позже) --',
    btnSubmitStudent: 'Добавить Студента и Создать Логин',
    // Add Teacher Modal
    modalAddTeacherTitle: 'Добавление Преподавателя Кафедры',
    lblTeacherName: 'Ф.И.О. Преподавателя *',
    phTeacherName: 'Например: Доцент Джамшид Каримов',
    lblDepartment: 'Кафедра / Департамент *',
    phDepartment: 'Введите название кафедры или департамента',
    lblDegree: 'Ученое Звание / Должность *',
    phDegree: 'Например: Доцент, PhD, профессор или Старший преподаватель',
    fixedQuotaTitle: 'Строгое ограничение квоты: максимум 3 студента',
    fixedQuotaDesc: 'По академическим правилам на одного научного руководителя устанавливается лимит не более 3 студентов.',
    btnSubmitTeacher: 'Добавить Преподавателя и Создать Логин',
    // Settings 6 Blocks
    settingsTitle: 'Расширенные Настройки Деканата и Факультета',
    settingsSubtitle: 'Профиль факультета, календарь практики, печать и реквизиты, академические правила, оповещения и безопасность.',
    setTabAll: 'Все блоки',
    setTabProfile: '1. Профиль Руководства',
    setTabCalendar: '2. Календарь Практики',
    setTabLegal: '3. Печать и Реквизиты',
    setTabRules: '4. Правила и Лимиты',
    setTabAlerts: '5. Оповещения',
    setTabSecurity: '6. Безопасность Аккаунта',
    // Block 1
    block1Title: 'Профиль Факультета и Руководства',
    block1Desc: 'Реквизиты, отображаемые в официальных приказах (D1) и трехсторонних договорах.',
    lblFacultyName: 'Полное Название Факультета:',
    lblDeanName: 'Ф.И.О. Декана:',
    lblDeanDeputy: 'Зам. Декана / Ответственный за практику:',
    lblFacultyPhone: 'Контактный Телефон:',
    lblFacultyEmail: 'Служебный E-mail:',
    lblRoomNumber: 'Номер Кабинета:',
    btnSaveProfile: 'Сохранить Профиль',
    // Block 2
    block2Title: 'Календарь Практики и Сроки',
    block2Desc: 'Учебный год, семестр, подача заявлений, период практики и дата итоговой защиты.',
    lblAcademicYear: 'Учебный Год:',
    lblSemester: 'Семестр:',
    lblAppDeadline: 'Крайний Срок Подачи Заявлений (Дедлайн):',
    lblPracticumStart: 'Начало Практики:',
    lblPracticumEnd: 'Окончание Практики:',
    lblDailyLogTime: 'Время Сдачи Ежедневного Дневника:',
    lblFinalDefenseDate: 'Дата Итоговой Защиты:',
    btnSaveCalendar: 'Сохранить Сроки',
    // Block 3
    block3Title: 'Документы, Печать и Юридические Реквизиты',
    block3Desc: 'Префиксы официальных документов, факсимиле гербовой печати ВУЗа и банковские реквизиты.',
    lblOrderPrefix: 'Префикс Приказа Деканата:',
    lblContractPrefix: 'Префикс Трехстороннего Договора:',
    lblOfficialSeal: 'Круглая Гербовая Печать ВУЗа (Факсимиле):',
    lblDeanSignature: 'Факсимиле Электронной Подписи Декана:',
    lblBankRequisites: 'Банковские Реквизиты ВУЗа и ИНН:',
    btnUploadSeal: 'Обновить Печать',
    btnUploadSignature: 'Обновить Подпись',
    btnSaveLegal: 'Сохранить Настройки Документов',
    // Block 4
    block4Title: 'Академические Правила и Ограничения',
    block4Desc: 'Нагрузка преподавателей, минимальная посещаемость, начальный пароль студентов и штрафы.',
    lblMaxStudentsRule: 'Максимальное Количество Студентов на Преподавателя:',
    maxStudentsRuleExplanation: 'Строго 3 студента. Данное правило установлено для гарантии качества наставничества и не подлежит изменению.',
    lblMinAttendance: 'Минимальный Порог Посещаемости (%):',
    lblDefaultPassword: 'Стандартный Пароль Новых Студентов:',
    lblLatePenaltyToggle: 'Начислять штрафные баллы за просроченные отчеты',
    latePenaltyDesc: 'За дневники, отправленные позже установленного времени (22:00), автоматически вычитается 5% от итогового балла.',
    btnSaveRules: 'Сохранить Правила',
    // Block 5
    block5Title: 'Экстренные Оповещения и Алерты',
    block5Desc: 'Автоматические уведомления деканату и в Telegram-бот при возникновении критических ситуаций.',
    lblAlertAbsence: 'Немедленно оповещать деканат при пропуске студентом практики 3 дня подряд',
    lblAlertMissingContract: 'Активировать мониторинг студентов без договоров за 5 дней до начала практики',
    lblTelegramIntegration: 'Интеграция с Telegram-ботом (Chat ID / Webhook):',
    telegramActiveBadge: '● Telegram-бот активен (@tiupm_bot)',
    btnSaveAlerts: 'Сохранить Оповещения',
    // Block 6
    block6Title: 'Безопасность Аккаунта Декана',
    block6Desc: 'Обновите входной логин ID и пароль административного доступа деканата.',
    lblDekanatId: 'Логин Идентификатор Деканата:',
    lblCurrentPassword: 'Текущий Пароль:',
    lblNewPassword: 'Новый Пароль:',
    lblConfirmPassword: 'Подтвердите Новый Пароль:',
    btnSaveSecurity: 'Сохранить Настройки Безопасности'
  }
};

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

  // Delete Modals state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<StudentItem | null>(null);

  // Telegram Messaging Modal state
  const [isTelegramModalOpen, setIsTelegramModalOpen] = useState(false);
  const [telegramTargetStudent, setTelegramTargetStudent] = useState<StudentItem | null>(null);
  const [telegramMessageType, setTelegramMessageType] = useState<'ESLATMA' | 'SHOSHILINCH' | 'RASMIY'>('ESLATMA');
  const [telegramMessage, setTelegramMessage] = useState('');

  // Modals state
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentItem | null>(null);
  const [activeDossierTab, setActiveDossierTab] = useState<'docs' | 'attendance' | 'grades'>('docs');
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherItem | null>(null);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [assignStudentId, setAssignStudentId] = useState<string>('');
  const [selectedAppForView, setSelectedAppForView] = useState<ApplicationItem | null>(null);

  // Dekanat Settings State
  const [dekanatDigits, setDekanatDigits] = useState('204581');

  // Student Dossier Editing State
  const [editedStudent, setEditedStudent] = useState<StudentItem | null>(null);
  const [tempDigits, setTempDigits] = useState('204581');
  const [facultyName, setFacultyName] = useState('Axborot Texnologiyalari Fakulteti');
  const [deanName, setDeanName] = useState('Alisher Qodirov');
  const [deanDeputy, setDeanDeputy] = useState('Rustam Zokirov (+998 71 200 12 34)');
  const [facultyEmail, setFacultyEmail] = useState('it-faculty@tiu.uz');
  const [practicumStart, setPracticumStart] = useState('2026-03-01');
  const [practicumEnd, setPracticumEnd] = useState('2026-04-15');
  const [applicationDeadline, setApplicationDeadline] = useState('2026-02-25');
  const [currentPass, setCurrentPass] = useState('Dekanat123!');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  // 6-Block Settings Extended State
  const [settingsFilter, setSettingsFilter] = useState<'all' | 'profile' | 'calendar' | 'legal' | 'rules' | 'alerts' | 'security'>('all');
  const [facultyPhone, setFacultyPhone] = useState('+998 71 200 44 44');
  const [roomNumber, setRoomNumber] = useState('408-A xona');
  const [academicYear, setAcademicYear] = useState('2025/2026');
  const [semester, setSemester] = useState('Bahorgi 8-semestr');
  const [dailyLogDeadlineTime, setDailyLogDeadlineTime] = useState('22:00');
  const [finalDefenseDeadline, setFinalDefenseDeadline] = useState('2026-06-15');
  const [orderPrefix, setOrderPrefix] = useState('B-104/26');
  const [contractPrefix, setContractPrefix] = useState('AMAL-2026');
  const [sealFile, setSealFile] = useState('tiu_official_seal_2026.png');
  const [signatureFile, setSignatureFile] = useState('dekan_e_imzo_faksimile.png');
  const [bankRequisites, setBankRequisites] = useState('TIU MFY, ATIB Ipoteka Bank, H/R: 20208000900123456001, MFO: 00423, STIR: 308999123');
  const [minAttendanceRate, setMinAttendanceRate] = useState(70);
  const [defaultStudentPassword, setDefaultStudentPassword] = useState('Talaba123!');
  const [lateSubmissionPenalty, setLateSubmissionPenalty] = useState(true);
  const [alertConsecutiveAbsence, setAlertConsecutiveAbsence] = useState(true);
  const [alertMissingContract, setAlertMissingContract] = useState(true);
  const [telegramBotChatId, setTelegramBotChatId] = useState('-100234567890');
  const [telegramWebhookActive, setTelegramWebhookActive] = useState(true);

  // Localization State: UZ | RU ONLY
  const [lang, setLang] = useState<Lang>('uz');

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('pms_dekanat_lang') as Lang;
      if (savedLang === 'uz' || savedLang === 'ru') {
        setLang(savedLang);
      }
    }
  }, []);

  const handleLanguageChange = (newLang: Lang) => {
    setLang(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('pms_dekanat_lang', newLang);
    }
  };

  const t = translations[lang];

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

  // Search & Decision States
  const [teacherSearchQuery, setTeacherSearchQuery] = useState('');
  const [decisionComment, setDecisionComment] = useState('');

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

  const [selectedPartnerForView, setSelectedPartnerForView] = useState<PartnerCompany | null>(null);
  const [newPartner, setNewPartner] = useState({
    name: '',
    shortName: '',
    logoUrl: '',
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
      studentId: 'ST501825',
      group: 'DI-202-22',
      company: 'Uzum Technologies MCHJ',
      mentor: 'Sardor Bekmurodov',
      status: 'APPROVED',
      contractNo: 'AMAL-2026-0042',
      date: '2026-10-28',
      docFile: 'Shartnoma_Sardor_Rahimov.pdf',
      comment: 'Hujjatlar to\'liq, amaliyotga ruxsat berildi'
    },
    {
      id: 'app_2',
      studentName: 'Madina Karimova',
      studentId: 'ST501826',
      group: 'DI-202-22',
      company: 'Uzum Technologies MCHJ',
      mentor: 'Sardor Bekmurodov',
      status: 'APPROVED',
      contractNo: 'AMAL-2026-0043',
      date: '2026-10-29',
      docFile: 'Shartnoma_Madina_Karimova.pdf',
      comment: 'Uch tomonlama rasmiy shartnoma tasdiqlandi'
    },
    {
      id: 'app_3',
      studentName: 'Javohir Toshmatov',
      studentId: 'ST501827',
      group: 'DI-201-22',
      company: 'IT Park Uzbekistan',
      mentor: 'Farrux Zokirov',
      status: 'SUBMITTED',
      contractNo: null,
      date: '2026-11-01',
      docFile: 'Shartnoma_Javohir_Toshmatov.docx',
      comment: ''
    },
    {
      id: 'app_4',
      studentName: 'Zarnigor Aliyeva',
      studentId: 'ST501828',
      group: 'DI-201-22',
      company: 'Click MCHJ',
      mentor: 'Aziz Nishonov',
      status: 'SUBMITTED',
      contractNo: null,
      date: '2026-11-02',
      docFile: 'Shartnoma_Zarnigor_Aliyeva.pdf',
      comment: ''
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
    if (count >= 3) {
      return {
        label: `${count} / 3 nafar (To'lgan)`,
        color: 'bg-rose-50 text-rose-700 border-rose-200/80',
        barColor: 'bg-rose-500'
      };
    }
    if (count === 2) {
      return {
        label: `${count} / 3 nafar (1 ta o'rin qoldi)`,
        color: 'bg-amber-50 text-amber-700 border-amber-200/80',
        barColor: 'bg-amber-500'
      };
    }
    return {
      label: `${count} / 3 nafar (O'rin bor)`,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
      barColor: 'bg-emerald-500'
    };
  };

  // Handlers
  const handleSingleDelete = () => {
    if (!studentToDelete) return;
    setStudents(students.filter(s => s.id !== studentToDelete.id));
    setNotification(`${studentToDelete.name} tizimdan muvaffaqiyatli o'chirildi.`);
    setIsDeleteModalOpen(false);
    setStudentToDelete(null);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleBulkDelete = () => {
    if (selectedStudentIds.length === 0) return;
    const count = selectedStudentIds.length;
    setStudents(students.filter(s => !selectedStudentIds.includes(s.id)));
    setSelectedStudentIds([]);
    setNotification(`${count} nafar talaba tizimdan muvaffaqiyatli o'chirildi.`);
    setIsBulkDeleteModalOpen(false);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSendTelegramMessage = () => {
    if (!telegramMessage.trim()) return;
    setNotification(
      telegramTargetStudent
        ? `"${telegramTargetStudent.name}" ga @tiupm_bot orqali xabar yuborildi.`
        : `${selectedStudentIds.length} nafar tanlangan talabaga @tiupm_bot orqali ommaviy xabar yuborildi.`
    );
    setIsTelegramModalOpen(false);
    setTelegramMessage('');
    setTelegramTargetStudent(null);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleApproveContract = (appId: string, commentText?: string) => {
    const generatedNo = `AMAL-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const finalComment = commentText !== undefined ? commentText : (decisionComment || 'Hujjatlar to\'liq, amaliyotga ruxsat berildi');

    setApplications(applications.map(app => {
      if (app.id === appId) {
        return {
          ...app,
          status: 'APPROVED',
          contractNo: generatedNo,
          comment: finalComment
        };
      }
      return app;
    }));

    if (selectedAppForView && selectedAppForView.id === appId) {
      setSelectedAppForView(prev => prev ? { ...prev, status: 'APPROVED', contractNo: generatedNo, comment: finalComment } : null);
    }

    const app = applications.find(a => a.id === appId);
    if (app) {
      setStudents(students.map(s => s.name === app.studentName ? { ...s, contract: generatedNo, status: 'FAOL' } : s));
    }

    setDecisionComment('');
    setNotification('3 Tomonlama shartnoma QR-kod bilan avtomatik tasdiqlandi va izoh saqlandi!');
    setTimeout(() => setNotification(null), 3500);
  };

  const handleRejectContract = (appId: string, commentText?: string) => {
    const finalComment = (commentText !== undefined ? commentText : decisionComment).trim();

    if (!finalComment || finalComment.length < 10) {
      setNotification(
        lang === 'uz'
          ? "Rad etish sababi kiritilishi shart (kamida 10 ta belgi)!"
          : "Укажите причину отклонения (не менее 10 символов)!"
      );
      setTimeout(() => setNotification(null), 3500);
      return;
    }

    setApplications(applications.map(app => {
      if (app.id === appId) {
        return {
          ...app,
          status: 'REJECTED',
          comment: finalComment
        };
      }
      return app;
    }));

    if (selectedAppForView && selectedAppForView.id === appId) {
      setSelectedAppForView(prev => prev ? { ...prev, status: 'REJECTED', comment: finalComment } : null);
    }

    setDecisionComment('');
    setNotification(lang === 'uz' ? 'Ariza rad etildi va talabaga rasmiy izoh yuborildi.' : 'Заявление отклонено, официальная причина отправлена студенту.');
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
      logoUrl: newPartner.logoUrl || undefined,
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
      logoUrl: '',
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
          roleTitle={t.dekanatRole}
          userName={deanName}
          userSub={t.dekanatSub}
          userBadge={`DK${dekanatDigits}`}
          items={[
            { id: 'overview', label: t.navOverview, icon: LayoutDashboard },
            { id: 'students-list', label: t.navStudents, icon: GraduationCap, badge: String(students.length) },
            { id: 'teachers', label: t.navTeachers, icon: BookOpen, badge: String(teachers.length) },
            { id: 'contracts-pending', label: t.navContracts, icon: FileText, badge: String(applications.filter(a => a.status === 'SUBMITTED').length) },
            { id: 'partners', label: t.navPartners, icon: Briefcase, badge: String(partners.length) },
            { id: 'settings', label: t.navSettings, icon: Settings },
          ]}
          activeTab={activeTab}
          onTabChange={(id) => {
            if (id === 'students-section' || id === 'contracts-section') return;
            setActiveTab(id);
          }}
          onLogout={() => router.push('/login')}
          portalSubtitle={t.portalSubtitle}
          logoutLabel={t.logout}
        />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-w-0 pb-24">
          {/* Top Header Bar */}
          <header className="sticky top-0 z-30 bg-white border-b border-zinc-200/80 px-6 py-3.5 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200/60">
                DK{dekanatDigits}
              </span>
              <h1 className="text-sm font-bold text-zinc-900">
                {lang === 'uz' ? `Fakultet Dekani: ${deanName}` : `Декан Факультета: ${deanName}`}
              </h1>
            </div>

            <div className="flex items-center space-x-3 relative">
              {/* UZ / RU ONLY Language Switcher */}
              <div className="flex items-center bg-zinc-100 p-0.5 rounded-xl border border-zinc-200/80 shrink-0">
                <button
                  type="button"
                  onClick={() => handleLanguageChange('uz')}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all ${
                    lang === 'uz'
                      ? 'bg-white text-zinc-900 shadow-2xs'
                      : 'text-zinc-500 hover:text-zinc-800'
                  }`}
                >
                  UZ
                </button>
                <button
                  type="button"
                  onClick={() => handleLanguageChange('ru')}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all ${
                    lang === 'ru'
                      ? 'bg-white text-zinc-900 shadow-2xs'
                      : 'text-zinc-500 hover:text-zinc-800'
                  }`}
                >
                  RU
                </button>
              </div>

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
                  {deanName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-xs font-bold text-zinc-900 leading-tight">{deanName}</p>
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
                {/* Dynamic 4 KPI Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* 1. Students Status Card */}
                  <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-xs space-y-3">
                    <div className="flex items-center justify-between text-zinc-500">
                      <span className="text-xs font-semibold">👥 Talabalar Statusi</span>
                      <Users className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between items-baseline">
                        <span className="text-xs text-zinc-500">Jami:</span>
                        <span className="text-sm font-bold text-zinc-900">{students.length} nafar</span>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <span className="text-xs text-emerald-600 font-medium">Amaliyotda faol:</span>
                        <span className="text-xs font-bold text-emerald-600">{students.filter(s => s.status === 'FAOL').length}</span>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <span className="text-xs text-rose-600 font-medium">Ustozsizlar:</span>
                        <span className="text-xs font-bold text-rose-600 bg-rose-50 px-1.5 py-0.2 rounded border border-rose-200">
                          {students.filter(s => s.teacher === 'Biriktirilmagan' || !s.teacher).length} nafar
                        </span>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <span className="text-xs text-amber-600 font-medium">Xavf ostidagilar:</span>
                        <span className="text-xs font-bold text-amber-600 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                          {students.filter(s => {
                            const attNum = parseInt(s.attendance) || 0;
                            return attNum < 60;
                          }).length} nafar
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 2. Contracts Dynamics Card */}
                  <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-xs space-y-3">
                    <div className="flex items-center justify-between text-zinc-500">
                      <span className="text-xs font-semibold">📑 Shartnomalar Dinamikasi</span>
                      <FileCheck className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between items-baseline">
                        <span className="text-xs text-emerald-700 font-medium">Tasdiqlangan:</span>
                        <span className="text-sm font-bold text-emerald-700">{applications.filter(a => a.status === 'APPROVED').length + 26} ta</span>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <span className="text-xs text-amber-600 font-medium">Ko'rib chiqilmoqda:</span>
                        <span className="text-xs font-bold text-amber-600">{applications.filter(a => a.status === 'SUBMITTED').length} ta</span>
                      </div>
                    </div>
                    {/* Animated Progress Bar */}
                    <div className="space-y-1 pt-1">
                      <div className="flex justify-between text-[10px] font-bold text-zinc-400">
                        <span>Qamrov darajasi</span>
                        <span className="text-emerald-600">92%</span>
                      </div>
                      <div className="w-full bg-zinc-100 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 transition-all duration-700 ease-out"
                          style={{ width: '92%' }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* 3. Teachers Workload (3/3 Rule) Card */}
                  <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-xs space-y-3">
                    <div className="flex items-center justify-between text-zinc-500">
                      <span className="text-xs font-semibold">👨‍🏫 Ustozlar Yuklamasi (3/3)</span>
                      <BookOpen className="w-4 h-4 text-amber-600" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between items-baseline">
                        <span className="text-xs text-zinc-500">Jami ustozlar:</span>
                        <span className="text-sm font-bold text-zinc-900">{teachers.length} nafar</span>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <span className="text-xs text-rose-600 font-medium">100% to'lgan (3/3):</span>
                        <span className="text-xs font-bold text-rose-600">
                          {teachers.filter(tc => students.filter(s => s.teacher === tc.name).length >= 3).length} nafar
                        </span>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <span className="text-xs text-emerald-600 font-medium">Bo'sh o'rinlar bor:</span>
                        <span className="text-xs font-bold text-emerald-600">
                          {teachers.filter(tc => students.filter(s => s.teacher === tc.name).length < 3).length} nafar
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 4. Telegram Bot Integration Card */}
                  <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-xs space-y-3">
                    <div className="flex items-center justify-between text-zinc-500">
                      <span className="text-xs font-semibold">🤖 Telegram Bot</span>
                      <Globe className="w-4 h-4 text-sky-600" />
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center space-x-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-bold text-emerald-700">Bot faol (@tiupm_bot)</span>
                      </div>
                      <p className="text-[11px] text-zinc-500 leading-snug">
                        Yetkazilgan shaxsiy va ommaviy bildirishnomalar: <b className="text-zinc-900 font-mono">1,428 ta</b>
                      </p>
                      <span className="text-[10px] text-sky-700 bg-sky-50 px-2 py-0.5 rounded font-mono font-bold inline-block border border-sky-200">
                        Webhook: Active (200 OK)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Groups Attendance & Activity Matrix */}
                <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold text-zinc-900">📊 Guruhlar Bo'yicha Jonli Davomat va Hisobot Faolligi Matritsasi</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { group: 'DI-202-22', total: 12, attendance: '96%', color: 'from-blue-500 to-indigo-600' },
                      { group: 'DI-201-22', total: 11, attendance: '91%', color: 'from-emerald-500 to-teal-600' },
                      { group: 'AI-101-23', total: 9, attendance: '88%', color: 'from-violet-500 to-purple-600' }
                    ].map((g, idx) => (
                      <div key={idx} className="p-4 rounded-xl border border-zinc-200 bg-zinc-50/50 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-zinc-900 font-mono">{g.group}</span>
                          <span className="text-xs font-bold text-emerald-600">{g.attendance}</span>
                        </div>
                        <p className="text-[11px] text-zinc-500">Talabalar soni: <b>{g.total} nafar</b></p>
                        <div className="w-full bg-zinc-200 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-2 rounded-full bg-gradient-to-r ${g.color} transition-all duration-700 ease-out`}
                            style={{ width: g.attendance }}
                          />
                        </div>
                      </div>
                    ))}
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

                  {/* Group Filter Pills - Segmented Control Capsule */}
                  <div className="bg-zinc-100/90 p-1 rounded-xl border border-zinc-200/80 inline-flex items-center gap-1 shadow-inner overflow-x-auto w-full lg:w-auto">
                    {['ALL', 'DI-202-22', 'DI-201-22', 'AI-101-23'].map(g => (
                      <button
                        key={g}
                        onClick={() => setGroupFilter(g)}
                        className={`rounded-lg px-3.5 py-1.5 text-xs transition-all duration-200 shrink-0 ${
                          groupFilter === g
                            ? 'bg-white text-zinc-900 shadow-xs font-semibold scale-[1.02]'
                            : 'text-zinc-500 hover:text-zinc-900 font-medium'
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
                            <div className="inline-flex items-center space-x-1 bg-zinc-50 border border-zinc-200/80 p-1 rounded-xl shadow-2xs">
                              <button
                                onClick={() => {
                                  setSelectedStudent(st);
                                  setEditedStudent({ ...st });
                                  setIsStudentModalOpen(true);
                                }}
                                className="p-1.5 text-zinc-600 hover:text-zinc-900 hover:bg-white rounded-lg transition-all"
                                title="Talaba dossierini ko'rish"
                              >
                                <Search className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => {
                                  setNotification(`Talaba ${st.name} uchun uch tomonlama yo'llanma PDF generatsiya qilindi!`);
                                  setTimeout(() => setNotification(null), 3000);
                                }}
                                className="p-1.5 text-blue-600 hover:text-blue-700 hover:bg-white rounded-lg transition-all"
                                title="Yo'llanma xatini yuklab olish"
                              >
                                <FileText className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => {
                                  setTelegramTargetStudent(st);
                                  setIsTelegramModalOpen(true);
                                }}
                                className="p-1.5 text-sky-600 hover:text-sky-700 hover:bg-white rounded-lg transition-all"
                                title="Talabaga @tiupm_bot orqali xabar yuborish"
                              >
                                <Send className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => {
                                  setStudentToDelete(st);
                                  setIsDeleteModalOpen(true);
                                }}
                                className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-all"
                                title="Talabani tizimdan o'chirish"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedStudent(st);
                                  setEditedStudent({ ...st });
                                  setIsStudentModalOpen(true);
                                }}
                                className="p-1.5 text-amber-600 hover:text-amber-700 hover:bg-white rounded-lg transition-all"
                                title="Tahrirlash / Ustoz biriktirish"
                              >
                                <Settings className="w-3.5 h-3.5" />
                              </button>
                            </div>
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
                    <p className="text-xs text-zinc-500">Maksimal limit: har bir ustozga eng ko'pi 3 nafargacha talaba biriktiriladi (1-to-Many).</p>
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
                                  <span className="text-zinc-600">{assignedCount} / 3 talaba</span>
                                  <span className={assignedCount >= 3 ? 'text-rose-600' : 'text-emerald-600'}>
                                    {Math.round((assignedCount / 3) * 100)}%
                                  </span>
                                </div>
                                <div className="w-full bg-zinc-100 rounded-full h-2 overflow-hidden">
                                  <div
                                    className={`h-2 rounded-full transition-all duration-700 ease-out bg-gradient-to-r from-blue-600 to-indigo-600 ${badgeInfo.barColor}`}
                                    style={{ width: `${Math.min((assignedCount / 3) * 100, 100)}%` }}
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
                        <th className="p-3">Biriktirilgan Hujjat</th>
                        <th className="p-3">Holati</th>
                        <th className="p-3">Shartnoma №</th>
                        <th className="p-3">Dekanat Izohi</th>
                        <th className="p-3 text-right">Amallar</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 bg-white">
                      {applications.map((app) => (
                        <tr key={app.id} className="hover:bg-zinc-50 transition-colors">
                          <td className="p-3 font-bold text-zinc-900">{app.studentName}</td>
                          <td className="p-3 font-semibold text-zinc-800">{app.group}</td>
                          <td className="p-3 font-medium text-zinc-800">{app.company}</td>
                          <td className="p-3">
                            <button
                              onClick={() => setSelectedAppForView(app)}
                              className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-[11px] font-mono transition-colors border border-blue-200/60"
                              title="Hujjatni ko'rib chiqish"
                            >
                              <FileText className="w-3.5 h-3.5 text-blue-600" />
                              <span>{app.docFile || `Shartnoma_${app.studentName.replace(/\s+/g, '_')}.pdf`}</span>
                            </button>
                          </td>
                          <td className="p-3">
                            <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                              app.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                              app.status === 'REJECTED' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                              'bg-amber-50 text-amber-700 border border-amber-200'
                            }`}>
                              {app.status === 'APPROVED' ? 'TASDIQLANDI' :
                               app.status === 'REJECTED' ? 'RAD ETILDI' : 'KUTILMOQDA'}
                            </span>
                          </td>
                          <td className="p-3 font-mono font-bold text-blue-600">
                            {app.contractNo || '—'}
                          </td>
                          <td className="p-3 max-w-[200px]">
                            {app.comment ? (
                              <span className="text-[11px] text-zinc-600 italic truncate block" title={app.comment}>
                                "{app.comment}"
                              </span>
                            ) : (
                              <span className="text-[11px] text-zinc-400">—</span>
                            )}
                          </td>
                          <td className="p-3 text-right space-x-2 whitespace-nowrap">
                            <button
                              onClick={() => setSelectedAppForView(app)}
                              className="px-2.5 py-1 bg-white border border-zinc-200 hover:border-zinc-900 text-zinc-700 rounded-xl text-[11px] font-medium transition-all shadow-2xs"
                            >
                              Ko'rib chiqish
                            </button>
                            {app.status === 'SUBMITTED' ? (
                              <button
                                onClick={() => setSelectedAppForView(app)}
                                className="px-3 py-1 bg-zinc-900 text-white rounded-xl text-[11px] font-medium hover:bg-zinc-800 shadow-xs"
                                title="Arizani ko'rib chiqib qaror qabul qilish"
                              >
                                Qaror qabul qilish
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  setNotification(`Shartnoma ${app.contractNo || app.id} yuklab olindi!`);
                                  setTimeout(() => setNotification(null), 3000);
                                }}
                                className="inline-flex items-center space-x-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-[11px] font-medium border border-emerald-200 hover:bg-emerald-100"
                              >
                                <Download className="w-3 h-3" />
                                <span>PDF</span>
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
                    <div
                      key={pr.id}
                      onClick={() => setSelectedPartnerForView(pr)}
                      className="relative h-44 rounded-3xl overflow-hidden cursor-pointer group shadow-lg
                                 bg-gradient-to-br from-purple-700 to-indigo-800 transition-all duration-300
                                 hover:scale-[1.01] active:scale-[0.99] folder-pocket"
                    >
                      {/* Frosted Glass Effect for the top part */}
                      <div className="absolute inset-0 z-10 p-5 flex flex-col justify-between">
                        {/* Company Logo and Name */}
                        <div className="flex items-center space-x-3">
                          {pr.logoUrl ? (
                            <img src={pr.logoUrl} alt={pr.name} className="w-10 h-10 rounded-xl object-contain bg-white p-0.5 shadow-md shrink-0" />
                          ) : (
                            <div className={`w-10 h-10 rounded-xl ${pr.logoBg} text-white font-bold flex items-center justify-center text-xs shadow-md shrink-0`}>
                              {pr.logoText}
                            </div>
                          )}
                          <h4 className="text-sm font-bold text-white tracking-tight">{pr.name}</h4>
                        </div>

                        {/* Quota and Status */}
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-white/80 font-mono">
                            {pr.occupied} / {pr.quota} {lang === 'uz' ? 'talaba' : 'студентов'}
                          </span>
                          <span className="px-2 py-0.5 bg-white/20 text-white text-[10px] font-bold rounded-full border border-white/30">
                            {pr.status}
                          </span>
                        </div>
                      </div>

                      {/* White card pocket effect (bottom part) */}
                      <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-white z-0 rounded-t-2xl p-5 pt-7
                                  shadow-inner-top-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-0
                                  translate-y-full transition-all duration-300 ease-out-back transform-gpu">
                        <div className="space-y-1">
                          <p className="text-xs text-zinc-600 font-medium">{pr.category}</p>
                          <div className="flex items-center text-[11px] text-zinc-500 space-x-1">
                            <MapPin className="w-3 h-3 text-zinc-400" />
                            <span>{pr.address}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 9: SETTINGS - 6 EXPANDED BLOCKS */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 gap-2">
                  <div>
                    <h3 className="text-base font-bold text-zinc-900">{t.settingsTitle}</h3>
                    <p className="text-xs text-zinc-500">{t.settingsSubtitle}</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-xl border border-indigo-200 self-start sm:self-auto">
                    {t.currentLogin}: DK{dekanatDigits}
                  </span>
                </div>

                {/* Sub-navigation Pills for 6 Settings Blocks */}
                <div className="flex flex-wrap gap-1.5 p-1 bg-zinc-100/90 rounded-2xl border border-zinc-200/70">
                  {[
                    { id: 'all', label: t.setTabAll },
                    { id: 'profile', label: t.setTabProfile },
                    { id: 'calendar', label: t.setTabCalendar },
                    { id: 'legal', label: t.setTabLegal },
                    { id: 'rules', label: t.setTabRules },
                    { id: 'alerts', label: t.setTabAlerts },
                    { id: 'security', label: t.setTabSecurity },
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setSettingsFilter(tab.id as any)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                        settingsFilter === tab.id
                          ? 'bg-white text-zinc-900 shadow-2xs'
                          : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/60'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* BLOCK 1: Fakultet va Rahbariyat Profili */}
                  {(settingsFilter === 'all' || settingsFilter === 'profile') && (
                    <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-xs space-y-4">
                      <div className="flex items-center space-x-3 pb-3 border-b border-zinc-100">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                          <Building2 className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-zinc-900">{t.block1Title}</h4>
                          <p className="text-xs text-zinc-500">{t.block1Desc}</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-semibold text-zinc-700 mb-1">{t.lblFacultyName}</label>
                          <input
                            type="text"
                            value={facultyName}
                            onChange={(e) => setFacultyName(e.target.value)}
                            className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-zinc-700 mb-1">{t.lblDeanName}</label>
                            <input
                              type="text"
                              value={deanName}
                              onChange={(e) => setDeanName(e.target.value)}
                              className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900 font-medium"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-zinc-700 mb-1">{t.lblRoomNumber}</label>
                            <input
                              type="text"
                              value={roomNumber}
                              onChange={(e) => setRoomNumber(e.target.value)}
                              placeholder="408-A"
                              className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900 font-medium"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-zinc-700 mb-1">{t.lblDeanDeputy}</label>
                          <input
                            type="text"
                            value={deanDeputy}
                            onChange={(e) => setDeanDeputy(e.target.value)}
                            className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-zinc-700 mb-1">{t.lblFacultyPhone}</label>
                            <input
                              type="text"
                              value={facultyPhone}
                              onChange={(e) => setFacultyPhone(e.target.value)}
                              className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900 font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-zinc-700 mb-1">{t.lblFacultyEmail}</label>
                            <input
                              type="email"
                              value={facultyEmail}
                              onChange={(e) => setFacultyEmail(e.target.value)}
                              className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900 font-mono"
                            />
                          </div>
                        </div>

                        <div className="pt-2 flex justify-end">
                          <button
                            type="button"
                            onClick={() => {
                              setNotification(lang === 'uz' ? "Fakultet va rahbariyat profili muvaffaqiyatli saqlandi!" : "Профиль руководства успешно сохранен!");
                              setTimeout(() => setNotification(null), 3000);
                            }}
                            className="px-4 py-2 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800 transition-colors shadow-xs"
                          >
                            {t.btnSaveProfile}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* BLOCK 2: Amaliyot Taqvimi va Muddatlar */}
                  {(settingsFilter === 'all' || settingsFilter === 'calendar') && (
                    <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-xs space-y-4">
                      <div className="flex items-center space-x-3 pb-3 border-b border-zinc-100">
                        <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                          <CalendarCheck className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-zinc-900">{t.block2Title}</h4>
                          <p className="text-xs text-zinc-500">{t.block2Desc}</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-zinc-700 mb-1">{t.lblAcademicYear}</label>
                            <input
                              type="text"
                              value={academicYear}
                              onChange={(e) => setAcademicYear(e.target.value)}
                              className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900 font-medium"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-zinc-700 mb-1">{t.lblSemester}</label>
                            <input
                              type="text"
                              value={semester}
                              onChange={(e) => setSemester(e.target.value)}
                              className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900 font-medium"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-zinc-700 mb-1">{t.lblAppDeadline}</label>
                          <input
                            type="date"
                            value={applicationDeadline}
                            onChange={(e) => setApplicationDeadline(e.target.value)}
                            className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900 font-mono"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-zinc-700 mb-1">{t.lblPracticumStart}</label>
                            <input
                              type="date"
                              value={practicumStart}
                              onChange={(e) => setPracticumStart(e.target.value)}
                              className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900 font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-zinc-700 mb-1">{t.lblPracticumEnd}</label>
                            <input
                              type="date"
                              value={practicumEnd}
                              onChange={(e) => setPracticumEnd(e.target.value)}
                              className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900 font-mono"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-zinc-700 mb-1">{t.lblDailyLogTime}</label>
                            <input
                              type="time"
                              value={dailyLogDeadlineTime}
                              onChange={(e) => setDailyLogDeadlineTime(e.target.value)}
                              className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900 font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-zinc-700 mb-1">{t.lblFinalDefenseDate}</label>
                            <input
                              type="date"
                              value={finalDefenseDeadline}
                              onChange={(e) => setFinalDefenseDeadline(e.target.value)}
                              className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900 font-mono"
                            />
                          </div>
                        </div>

                        <div className="pt-2 flex justify-end">
                          <button
                            type="button"
                            onClick={() => {
                              setNotification(lang === 'uz' ? "Amaliyot taqvimi va muddatlari muvaffaqiyatli saqlandi!" : "Календарь практики и сроки успешно сохранены!");
                              setTimeout(() => setNotification(null), 3000);
                            }}
                            className="px-4 py-2 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800 transition-colors shadow-xs"
                          >
                            {t.btnSaveCalendar}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* BLOCK 3: Hujjatlar, Muhr va Yuridik Rekvizitlar */}
                  {(settingsFilter === 'all' || settingsFilter === 'legal') && (
                    <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-xs space-y-4">
                      <div className="flex items-center space-x-3 pb-3 border-b border-zinc-100">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                          <FileCheck className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-zinc-900">{t.block3Title}</h4>
                          <p className="text-xs text-zinc-500">{t.block3Desc}</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-zinc-700 mb-1">{t.lblOrderPrefix}</label>
                            <input
                              type="text"
                              value={orderPrefix}
                              onChange={(e) => setOrderPrefix(e.target.value)}
                              className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900 font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-zinc-700 mb-1">{t.lblContractPrefix}</label>
                            <input
                              type="text"
                              value={contractPrefix}
                              onChange={(e) => setContractPrefix(e.target.value)}
                              className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900 font-mono"
                            />
                          </div>
                        </div>

                        {/* Official Seal Preview Card */}
                        <div className="border border-zinc-200 rounded-xl p-3 bg-zinc-50/50 flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 rounded-full border-2 border-dashed border-zinc-300 flex items-center justify-center bg-white text-zinc-500 font-serif text-[9px] text-center p-1 shrink-0 font-bold">
                              TIU SEAL
                            </div>
                            <div>
                              <p className="text-xs font-bold text-zinc-900">{sealFile}</p>
                              <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium border border-emerald-200/60 inline-block mt-0.5">
                                ● {lang === 'uz' ? 'Muhr faol (QR shartnomalar uchun)' : 'Печать активна (для QR-договоров)'}
                              </span>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setNotification(lang === 'uz' ? "Yangi rasmiy muhr fayli qabul qilindi!" : "Файл официальной печати обновлен!");
                              setTimeout(() => setNotification(null), 3000);
                            }}
                            className="px-3 py-1.5 border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-100 rounded-xl text-xs font-medium transition-colors"
                          >
                            {t.btnUploadSeal}
                          </button>
                        </div>

                        {/* Signature Preview Card */}
                        <div className="border border-zinc-200 rounded-xl p-3 bg-zinc-50/50 flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-8 rounded-lg border-2 border-dashed border-zinc-300 flex items-center justify-center bg-white text-zinc-500 font-mono text-[9px] text-center shrink-0">
                              E-SIGN
                            </div>
                            <div>
                              <p className="text-xs font-bold text-zinc-900">{signatureFile}</p>
                              <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium border border-emerald-200/60 inline-block mt-0.5">
                                ● {lang === 'uz' ? 'E-imzo faksimilesi tasdiqlangan' : 'Факсимиле подписи подтверждено'}
                              </span>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setNotification(lang === 'uz' ? "Dekan E-imzo faksimilesi muvaffaqiyatli yangilandi!" : "Факсимиле подписи декана успешно обновлено!");
                              setTimeout(() => setNotification(null), 3000);
                            }}
                            className="px-3 py-1.5 border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-100 rounded-xl text-xs font-medium transition-colors"
                          >
                            {t.btnUploadSignature}
                          </button>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-zinc-700 mb-1">{t.lblBankRequisites}</label>
                          <textarea
                            rows={2}
                            value={bankRequisites}
                            onChange={(e) => setBankRequisites(e.target.value)}
                            className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900 font-mono text-zinc-800"
                          />
                        </div>

                        <div className="pt-2 flex justify-end">
                          <button
                            type="button"
                            onClick={() => {
                              setNotification(lang === 'uz' ? "Hujjatlar, muhr va yuridik rekvizitlar saqlandi!" : "Настройки документов и реквизиты сохранены!");
                              setTimeout(() => setNotification(null), 3000);
                            }}
                            className="px-4 py-2 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800 transition-colors shadow-xs"
                          >
                            {t.btnSaveLegal}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* BLOCK 4: Akademik Qoidalar va Cheklovlar */}
                  {(settingsFilter === 'all' || settingsFilter === 'rules') && (
                    <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-xs space-y-4">
                      <div className="flex items-center space-x-3 pb-3 border-b border-zinc-100">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                          <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-zinc-900">{t.block4Title}</h4>
                          <p className="text-xs text-zinc-500">{t.block4Desc}</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {/* Strict Max 3 Students per Teacher rule */}
                        <div className="bg-indigo-50/70 border border-indigo-200/70 rounded-2xl p-4 space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-indigo-950 flex items-center gap-1.5">
                              <ShieldCheck className="w-4 h-4 text-indigo-600" />
                              {t.lblMaxStudentsRule}
                            </span>
                            <span className="px-2.5 py-0.5 bg-indigo-600 text-white font-mono font-bold text-xs rounded-lg">
                              3 nafar
                            </span>
                          </div>
                          <p className="text-[11px] text-indigo-800 leading-relaxed">
                            {t.maxStudentsRuleExplanation}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-zinc-700 mb-1">{t.lblMinAttendance}</label>
                            <input
                              type="number"
                              min={50}
                              max={90}
                              value={minAttendanceRate}
                              onChange={(e) => setMinAttendanceRate(Number(e.target.value))}
                              className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900 font-mono font-bold"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-zinc-700 mb-1">{t.lblDefaultPassword}</label>
                            <div className="flex items-center space-x-1.5">
                              <input
                                type="text"
                                value={defaultStudentPassword}
                                onChange={(e) => setDefaultStudentPassword(e.target.value)}
                                className="flex-1 px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900 font-mono font-bold"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  navigator.clipboard.writeText(defaultStudentPassword);
                                  setNotification(lang === 'uz' ? "Standart parol nusxalandi!" : "Пароль скопирован!");
                                  setTimeout(() => setNotification(null), 2500);
                                }}
                                className="p-2 border border-zinc-200 hover:bg-zinc-100 rounded-xl text-zinc-600"
                                title="Nusxalash"
                              >
                                <Copy className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Late Penalty Toggle Switch */}
                        <div className="border border-zinc-200 rounded-xl p-3.5 bg-zinc-50/50 flex items-start space-x-3">
                          <input
                            type="checkbox"
                            id="latePenaltyCheck"
                            checked={lateSubmissionPenalty}
                            onChange={(e) => setLateSubmissionPenalty(e.target.checked)}
                            className="w-4 h-4 text-zinc-900 rounded border-zinc-300 focus:ring-zinc-900 mt-0.5 cursor-pointer"
                          />
                          <label htmlFor="latePenaltyCheck" className="text-xs text-zinc-700 cursor-pointer">
                            <span className="font-semibold text-zinc-900 block">{t.lblLatePenaltyToggle}</span>
                            <span className="text-[11px] text-zinc-500 mt-0.5 block leading-relaxed">{t.latePenaltyDesc}</span>
                          </label>
                        </div>

                        <div className="pt-2 flex justify-end">
                          <button
                            type="button"
                            onClick={() => {
                              setNotification(lang === 'uz' ? "Akademik qoidalar va cheklovlar yangilandi!" : "Академические правила успешно обновлены!");
                              setTimeout(() => setNotification(null), 3000);
                            }}
                            className="px-4 py-2 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800 transition-colors shadow-xs"
                          >
                            {t.btnSaveRules}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* BLOCK 5: Favqulodda Xabarnomalar va Alertlar */}
                  {(settingsFilter === 'all' || settingsFilter === 'alerts') && (
                    <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-xs space-y-4">
                      <div className="flex items-center space-x-3 pb-3 border-b border-zinc-100">
                        <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                          <AlertTriangle className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-zinc-900">{t.block5Title}</h4>
                          <p className="text-xs text-zinc-500">{t.block5Desc}</p>
                        </div>
                      </div>

                      <div className="space-y-3.5">
                        <div className="border border-zinc-200 rounded-xl p-3 bg-zinc-50/50 flex items-start space-x-3">
                          <input
                            type="checkbox"
                            id="alertAbsenceCheck"
                            checked={alertConsecutiveAbsence}
                            onChange={(e) => setAlertConsecutiveAbsence(e.target.checked)}
                            className="w-4 h-4 text-zinc-900 rounded border-zinc-300 focus:ring-zinc-900 mt-0.5 cursor-pointer"
                          />
                          <label htmlFor="alertAbsenceCheck" className="text-xs text-zinc-700 cursor-pointer">
                            <span className="font-semibold text-zinc-900 block">{t.lblAlertAbsence}</span>
                          </label>
                        </div>

                        <div className="border border-zinc-200 rounded-xl p-3 bg-zinc-50/50 flex items-start space-x-3">
                          <input
                            type="checkbox"
                            id="alertMissingContractCheck"
                            checked={alertMissingContract}
                            onChange={(e) => setAlertMissingContract(e.target.checked)}
                            className="w-4 h-4 text-zinc-900 rounded border-zinc-300 focus:ring-zinc-900 mt-0.5 cursor-pointer"
                          />
                          <label htmlFor="alertMissingContractCheck" className="text-xs text-zinc-700 cursor-pointer">
                            <span className="font-semibold text-zinc-900 block">{t.lblAlertMissingContract}</span>
                          </label>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-zinc-700 mb-1">{t.lblTelegramIntegration}</label>
                          <div className="flex items-center space-x-2">
                            <input
                              type="text"
                              value={telegramBotChatId}
                              onChange={(e) => setTelegramBotChatId(e.target.value)}
                              className="flex-1 px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900 font-mono"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setNotification(lang === 'uz' ? "Test xabarnomasi Telegram guruhga yuborildi!" : "Тестовое уведомление отправлено в Telegram!");
                                setTimeout(() => setNotification(null), 3000);
                              }}
                              className="px-3.5 py-2 border border-zinc-200 bg-white hover:bg-zinc-100 text-zinc-700 rounded-xl text-xs font-medium transition-colors"
                            >
                              Test
                            </button>
                          </div>
                          <span className="text-[10px] text-emerald-700 mt-1 block font-medium">
                            {t.telegramActiveBadge}
                          </span>
                        </div>

                        <div className="pt-2 flex justify-end">
                          <button
                            type="button"
                            onClick={() => {
                              setNotification(lang === 'uz' ? "Xabarnomalar va alert sozlamalari saqlandi!" : "Настройки оповещений успешно сохранены!");
                              setTimeout(() => setNotification(null), 3000);
                            }}
                            className="px-4 py-2 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800 transition-colors shadow-xs"
                          >
                            {t.btnSaveAlerts}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* BLOCK 6: Dekan Akkaunti Xavfsizligi */}
                  {(settingsFilter === 'all' || settingsFilter === 'security') && (
                    <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-xs space-y-4">
                      <div className="flex items-center space-x-3 pb-3 border-b border-zinc-100">
                        <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                          <KeyRound className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-zinc-900">{t.block6Title}</h4>
                          <p className="text-xs text-zinc-500">{t.block6Desc}</p>
                        </div>
                      </div>

                      <div className="space-y-3.5">
                        {/* Dekanat ID change */}
                        <div>
                          <label className="block text-xs font-semibold text-zinc-700 mb-1">{t.lblDekanatId}</label>
                          <div className="flex items-center space-x-2">
                            <span className="px-3 py-2 bg-zinc-100 border border-zinc-300 rounded-xl font-mono font-bold text-xs text-zinc-700">
                              DK
                            </span>
                            <input
                              type="text"
                              maxLength={6}
                              value={tempDigits}
                              onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, '');
                                setTempDigits(val);
                              }}
                              placeholder="Masalan: 100001"
                              className="flex-1 px-3 py-2 text-xs rounded-xl border border-zinc-200 font-mono font-bold text-zinc-900 focus:outline-none focus:border-zinc-900"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                if (tempDigits.length !== 6) {
                                  setNotification(lang === 'uz' ? 'Xatolik: Login raqami roppa-rosa 6 ta raqamdan iborat bo\'lishi shart!' : 'Ошибка: Логин должен состоять ровно из 6 цифр!');
                                  setTimeout(() => setNotification(null), 3500);
                                  return;
                                }
                                setDekanatDigits(tempDigits);
                                setNotification(lang === 'uz' ? `Dekanat logini muvaffaqiyatli "DK${tempDigits}" ga o'zgartirildi!` : `Логин деканата успешно изменен на "DK${tempDigits}"!`);
                                setTimeout(() => setNotification(null), 3500);
                              }}
                              className="px-3.5 py-2 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800 transition-colors shadow-xs"
                            >
                              OK
                            </button>
                          </div>
                        </div>

                        {/* Password change */}
                        <div>
                          <label className="block text-xs font-semibold text-zinc-700 mb-1">{t.lblCurrentPassword}</label>
                          <input
                            type="text"
                            value={currentPass}
                            onChange={(e) => setCurrentPass(e.target.value)}
                            className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 font-mono bg-zinc-50 text-zinc-700"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-zinc-700 mb-1">{t.lblNewPassword}</label>
                            <input
                              type="password"
                              value={newPass}
                              onChange={(e) => setNewPass(e.target.value)}
                              placeholder="••••••••"
                              className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900 font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-zinc-700 mb-1">{t.lblConfirmPassword}</label>
                            <input
                              type="password"
                              value={confirmPass}
                              onChange={(e) => setConfirmPass(e.target.value)}
                              placeholder="••••••••"
                              className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900 font-mono"
                            />
                          </div>
                        </div>

                        <div className="pt-2 flex justify-end">
                          <button
                            type="button"
                            onClick={() => {
                              if (!newPass || newPass.length < 6) {
                                setNotification(lang === 'uz' ? 'Xatolik: Yangi parol kamida 6 ta belgidan iborat bo\'lishi kerak!' : 'Ошибка: Новый пароль должен содержать не менее 6 символов!');
                                setTimeout(() => setNotification(null), 3500);
                                return;
                              }
                              if (newPass !== confirmPass) {
                                setNotification(lang === 'uz' ? 'Xatolik: Yangi parol va tasdiqlash bir-biriga mos kelmadi!' : 'Ошибка: Пароли не совпадают!');
                                setTimeout(() => setNotification(null), 3500);
                                return;
                              }
                              setCurrentPass(newPass);
                              setNewPass('');
                              setConfirmPass('');
                              setNotification(lang === 'uz' ? 'Dekanat maxfiy paroli muvaffaqiyatli yangilandi!' : 'Пароль деканата успешно обновлен!');
                              setTimeout(() => setNotification(null), 3500);
                            }}
                            className="px-4 py-2 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800 transition-colors shadow-xs"
                          >
                            {t.btnSaveSecurity}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
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
              <h3 className="text-sm font-bold text-zinc-900">{t.modalAddStudentTitle}</h3>
              <button onClick={() => setIsStudentModalOpen(false)} className="text-zinc-400 hover:text-zinc-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateStudent} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">{t.lblStudentName}</label>
                <input
                  type="text"
                  required
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                  placeholder={t.phStudentName}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">{t.lblGroup}</label>
                <input
                  type="text"
                  required
                  value={newStudent.group}
                  onChange={(e) => setNewStudent({ ...newStudent, group: e.target.value })}
                  placeholder={t.phGroup}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">{t.lblPhone}</label>
                <input
                  type="text"
                  required
                  value={newStudent.phone}
                  onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900 font-mono"
                />
              </div>

              {/* Optional Teacher with Search */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-zinc-700">
                  {t.lblAssignTeacher}
                </label>

                {/* Search input for teachers */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    value={teacherSearchQuery}
                    onChange={(e) => setTeacherSearchQuery(e.target.value)}
                    placeholder={t.phSearchTeacher}
                    className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-zinc-200 focus:outline-none focus:border-zinc-900 bg-zinc-50/50"
                  />
                </div>

                <select
                  value={newStudent.teacher}
                  onChange={(e) => setNewStudent({ ...newStudent, teacher: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900 bg-white text-zinc-700"
                >
                  <option value="">{t.optNoTeacher}</option>
                  {teachers
                    .filter(tc => !teacherSearchQuery.trim() || tc.name.toLowerCase().includes(teacherSearchQuery.toLowerCase()))
                    .map(tc => {
                      const count = students.filter(s => s.teacher === tc.name).length;
                      const isFull = count >= 3;
                      return (
                        <option key={tc.id} value={tc.name} disabled={isFull}>
                          {tc.name} ({count}/3 {isFull ? (lang === 'uz' ? "- To'lgan" : "- Заполнено") : (lang === 'uz' ? "biriktirilgan" : "прикреплено")})
                        </option>
                      );
                    })}
                </select>
                {teacherSearchQuery && (
                  <p className="text-[10px] text-zinc-400">
                    {lang === 'uz' ? `Qidiruv bo'yicha ${teachers.filter(tc => tc.name.toLowerCase().includes(teacherSearchQuery.toLowerCase())).length} ta ustoz topildi` : `Найдено преподавателей: ${teachers.filter(tc => tc.name.toLowerCase().includes(teacherSearchQuery.toLowerCase())).length}`}
                  </p>
                )}
              </div>

              {/* Optional Company */}
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  {t.lblAssignCompany}
                </label>
                <select
                  value={newStudent.company}
                  onChange={(e) => setNewStudent({ ...newStudent, company: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900 bg-white text-zinc-700"
                >
                  <option value="">{t.optNoCompany}</option>
                  {partners.map(pr => (
                    <option key={pr.id} value={pr.name}>{pr.name} ({pr.category})</option>
                  ))}
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800 shadow-sm transition-all"
                >
                  {t.btnSubmitStudent}
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
              <h3 className="text-sm font-bold text-zinc-900">{t.modalAddTeacherTitle}</h3>
              <button onClick={() => setIsTeacherModalOpen(false)} className="text-zinc-400 hover:text-zinc-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTeacher} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">{t.lblTeacherName}</label>
                <input
                  type="text"
                  required
                  value={newTeacher.name}
                  onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                  placeholder={t.phTeacherName}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">{t.lblDepartment}</label>
                <input
                  type="text"
                  required
                  value={newTeacher.department}
                  onChange={(e) => setNewTeacher({ ...newTeacher, department: e.target.value })}
                  placeholder={t.phDepartment}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">{t.lblDegree}</label>
                <input
                  type="text"
                  required
                  value={newTeacher.degree}
                  onChange={(e) => setNewTeacher({ ...newTeacher, degree: e.target.value })}
                  placeholder={t.phDegree}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900"
                />
              </div>

              {/* Fixed 3-Student Policy Info */}
              <div className="bg-zinc-50 border border-zinc-200/80 rounded-xl p-3 flex items-start space-x-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-[11px] text-zinc-600 leading-snug">
                  <span className="font-semibold text-zinc-900 block">{t.fixedQuotaTitle}</span>
                  {t.fixedQuotaDesc}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">{t.thPhone} *</label>
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
                  {t.btnSubmitTeacher}
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
                <label className="block text-xs font-semibold text-zinc-700 mb-1">Tashkilot Logotipi / Rasmi (Ixtiyoriy)</label>
                <input
                  type="text"
                  value={newPartner.logoUrl}
                  onChange={(e) => setNewPartner({ ...newPartner, logoUrl: e.target.value })}
                  placeholder="https://... yoki logotip rasm URL manzili"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900"
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

      {/* 5. Student Dossier Modal with Tabbed Interface & Gradient Top Line */}
      {selectedStudent && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]">
              {/* Gradient Top Line */}
              <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 via-blue-500 to-emerald-500" />

              {/* Modal Header */}
              <div className="px-6 pt-5 pb-3 flex items-center justify-between border-b border-zinc-100">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-sm font-bold text-zinc-900">{selectedStudent.name}</h3>
                      <span className="font-mono text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200/60 font-bold">
                        {selectedStudent.id}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 mt-0.5">{selectedStudent.group} • {selectedStudent.company}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="p-1.5 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-xl transition-all duration-200 hover:rotate-90"
                  title="Yopish"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 3-Tab Navigation */}
              <div className="flex px-6 border-b border-zinc-100 bg-zinc-50/50 gap-2 pt-2">
                {[
                  { id: 'docs', label: '1. Hujjatlar & Shartnoma', icon: FileText },
                  { id: 'attendance', label: '2. Davomat & Fotohisobot', icon: CalendarCheck },
                  { id: 'grades', label: '3. ECTS Ballar & Ustoz', icon: Award },
                ].map(tab => {
                  const TabIcon = tab.icon;
                  const isActive = activeDossierTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveDossierTab(tab.id as any)}
                      className={`flex items-center space-x-2 px-4 py-2.5 text-xs font-semibold rounded-t-xl transition-all border-b-2 ${
                        isActive
                          ? 'bg-white text-zinc-900 border-zinc-900 shadow-xs'
                          : 'text-zinc-500 border-transparent hover:text-zinc-800'
                      }`}
                    >
                      <TabIcon className={`w-3.5 h-3.5 ${isActive ? 'text-zinc-900' : 'text-zinc-400'}`} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tab Contents */}
              <div className="p-6 overflow-y-auto space-y-4 flex-1 bg-white">
                {/* TAB 1: DOCS */}
                {activeDossierTab === 'docs' && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-200 space-y-3">
                      <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">3 Tomonlama Shartnoma Holati</h4>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <span className="text-zinc-400 block text-[10px]">Shartnoma Raqami</span>
                          <span className="font-mono font-bold text-emerald-600">{selectedStudent.contract}</span>
                        </div>
                        <div>
                          <span className="text-zinc-400 block text-[10px]">Holati</span>
                          <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded inline-block mt-0.5">
                            {selectedStudent.contract !== 'Kutilmoqda' ? 'QR Tasdiqlangan' : 'Kutilmoqda'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="border border-zinc-200 rounded-2xl p-4 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-zinc-900">Talaba Amaliyot Ariza va Yo'llanmasi.pdf</p>
                          <p className="text-[10px] text-zinc-400">Imzolangan va muhrlangan rasmiy PDF fayl</p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setNotification(`Talaba ${selectedStudent.name} shartnomasi yuklab olindi!`);
                          setTimeout(() => setNotification(null), 2500);
                        }}
                        className="px-3 py-1.5 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800"
                      >
                        Yuklab olish
                      </button>
                    </div>
                  </div>
                )}

                {/* TAB 2: ATTENDANCE & PHOTO LOGS */}
                {activeDossierTab === 'attendance' && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-200 flex items-center justify-between">
                      <div>
                        <span className="text-xs text-zinc-500 block">Umumiy Davomat Ko'rsatkichi</span>
                        <span className="text-xl font-bold text-zinc-900">{selectedStudent.attendance}</span>
                      </div>
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold text-xs rounded-xl">
                        A'lo daraja
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">Kunlik Fotohisobotlar Logi</h4>
                    <div className="space-y-2.5">
                      {[
                        { day: '4/30-kun', date: '02.11.2026', title: 'Docker va API integratsiya', photo: true, score: '⭐⭐⭐⭐⭐ 5' },
                        { day: '3/30-kun', date: '31.10.2026', title: 'Frontend Tailwind CSS komponentlari', photo: true, score: '⭐⭐⭐⭐⭐ 5' },
                        { day: '2/30-kun', date: '30.10.2026', title: 'Git branching va pull request', photo: false, score: '⭐⭐⭐⭐ 4' },
                      ].map((log, idx) => (
                        <div key={idx} className="p-3 rounded-xl border border-zinc-200 bg-white space-y-1.5">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-bold text-blue-700 font-mono">{log.day} ({log.date})</span>
                            <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">🟢 Qabul qilingan</span>
                          </div>
                          <p className="text-xs text-zinc-800 font-medium">{log.title}</p>
                          <div className="flex justify-between items-center pt-1 border-t border-zinc-100 text-[11px]">
                            <span className="text-zinc-500">Mentor Bahosi: <b className="text-zinc-900">{log.score}</b></span>
                            {log.photo && <span className="text-blue-600 font-medium cursor-pointer hover:underline">📸 Fotoni ko'rish</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 3: GRADES & TEACHER ASSIGNMENT */}
                {activeDossierTab === 'grades' && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-200 space-y-2">
                      <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">ECTS Ballar Taqsimoti (100 Ballik)</h4>
                      <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
                        <div className="bg-white p-2.5 rounded-xl border border-zinc-200">
                          <span className="text-[10px] text-zinc-400 block">Korxona Mentor (50)</span>
                          <span className="font-bold text-blue-600 font-mono text-sm">48.5</span>
                        </div>
                        <div className="bg-white p-2.5 rounded-xl border border-zinc-200">
                          <span className="text-[10px] text-zinc-400 block">Kafedra Ustoz (50)</span>
                          <span className="font-bold text-amber-600 font-mono text-sm">48.0</span>
                        </div>
                        <div className="bg-white p-2.5 rounded-xl border border-zinc-200">
                          <span className="text-[10px] text-zinc-400 block">Yakuniy (100)</span>
                          <span className="font-bold text-emerald-600 font-mono text-sm">96.5 (A)</span>
                        </div>
                      </div>
                    </div>

                    {/* Teacher assignment with strict 3/3 quota limit */}
                    <div className="space-y-2 pt-2 border-t border-zinc-100">
                      <label className="block text-xs font-semibold text-zinc-700">Kafedra Ilmiy Ustozi (Qat'iy limit 3/3):</label>
                      <div className="flex space-x-2">
                        <select
                          value={inlineTeacherSelect || selectedStudent.teacher}
                          onChange={(e) => setInlineTeacherSelect(e.target.value)}
                          className="flex-1 px-3 py-2 text-xs rounded-xl border border-zinc-200 bg-white"
                        >
                          <option value="">-- Ustozni tanlang --</option>
                          {teachers.map(tc => {
                            const count = students.filter(s => s.teacher === tc.name).length;
                            const isFull = count >= 3 && selectedStudent.teacher !== tc.name;
                            return (
                              <option key={tc.id} value={tc.name} disabled={isFull}>
                                {tc.name} ({count}/3 nafar {isFull ? "- To'lgan (3/3)" : "yuklama"})
                              </option>
                            );
                          })}
                        </select>
                        <button
                          onClick={() => {
                            const targetTeacher = inlineTeacherSelect || selectedStudent.teacher;
                            const count = students.filter(s => s.teacher === targetTeacher && s.id !== selectedStudent.id).length;
                            if (count >= 3) {
                              setNotification('⚠️ Xatolik: Ushbu ustozning kvotasi to\'lgan (3/3)!');
                              setTimeout(() => setNotification(null), 3000);
                              return;
                            }
                            setStudents(students.map(s => s.id === selectedStudent.id ? { ...s, teacher: targetTeacher } : s));
                            setSelectedStudent({ ...selectedStudent, teacher: targetTeacher });
                            setNotification('Ustoz muvaffaqiyatli biriktirildi (3/3 limit qoidasi bajarildi)!');
                            setTimeout(() => setNotification(null), 3000);
                          }}
                          className="px-4 py-2 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800"
                        >
                          Saqlash
                        </button>
                      </div>
                      <p className="text-[10px] text-zinc-400">Eslatma: Tizim qoidasiga ko'ra har bir ustozga maksimal 3 nafar talaba biriktirilishi shart.</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-3.5 bg-zinc-50 border-t border-zinc-100 flex justify-end">
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="px-4 py-2 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800"
                >
                  Yopish
                </button>
              </div>
            </div>
          </div>
      )}

      {/* 6. Application / Document Review Modal */}
      {selectedAppForView && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 space-y-5 shadow-2xl animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <div className="flex items-center space-x-2">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-900">3 Tomonlama Shartnoma & Ariza Ko'rigi</h3>
                  <p className="text-xs text-zinc-500">Ariza identifikatori: #{selectedAppForView.id}</p>
                </div>
              </div>
              <button onClick={() => setSelectedAppForView(null)} className="text-zinc-400 hover:text-zinc-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Meta cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-zinc-50 p-4 rounded-2xl border border-zinc-200 text-xs">
              <div>
                <span className="text-[10px] text-zinc-400 block">{t.thStudentName}</span>
                <span className="font-bold text-zinc-900">{selectedAppForView.studentName}</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 block">{t.thGroup}</span>
                <span className="font-semibold text-zinc-800">{selectedAppForView.group}</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 block">{t.thCompany}</span>
                <span className="font-semibold text-zinc-800">{selectedAppForView.company}</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 block">{t.thStatus}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold inline-block mt-0.5 ${
                  selectedAppForView.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800' :
                  selectedAppForView.status === 'REJECTED' ? 'bg-rose-100 text-rose-800' :
                  'bg-amber-100 text-amber-800'
                }`}>
                  {selectedAppForView.status === 'APPROVED' ? t.statusApproved :
                   selectedAppForView.status === 'REJECTED' ? t.statusRejected : t.statusPending}
                </span>
              </div>
            </div>

            {/* Attached Document Card */}
            <div className="border border-zinc-200 rounded-2xl p-4 bg-white flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-11 h-11 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
                  <FileText className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="text-xs font-bold text-zinc-900">{selectedAppForView.docFile || `Shartnoma_${selectedAppForView.studentName.replace(/\s+/g, '_')}.pdf`}</h4>
                    <span className="text-[9px] font-mono uppercase bg-zinc-100 text-zinc-700 px-1.5 py-0.5 rounded font-bold">
                      {selectedAppForView.docFile?.endsWith('.docx') ? 'DOCX' : 'PDF'}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-0.5">{lang === 'uz' ? 'Hajmi: 284 KB • Talaba tomonidan yuklangan rasmiy ariza va shartnoma' : 'Размер: 284 КБ • Официальное заявление и подписанный договор студента'}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setNotification(lang === 'uz' ? `"${selectedAppForView.docFile || 'shartnoma.pdf'}" fayli brauzerda ochildi va yuklab olindi!` : `Файл "${selectedAppForView.docFile || 'договор.pdf'}" открыт и скачан!`);
                  setTimeout(() => setNotification(null), 3000);
                }}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-xl text-xs font-medium transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{lang === 'uz' ? 'Yuklab Olish' : 'Скачать'}</span>
              </button>
            </div>

            {/* Document Content Simulation Viewer */}
            <div className="border border-zinc-200 rounded-2xl p-6 bg-zinc-50/50 space-y-4 font-serif text-zinc-800 text-xs leading-relaxed max-h-64 overflow-y-auto">
              <div className="text-center space-y-1 pb-3 border-b border-zinc-300">
                <p className="font-bold text-xs tracking-wider uppercase text-zinc-900">Toshkent Xalqaro Universiteti (TIU)</p>
                <p className="font-sans text-[10px] text-zinc-500 uppercase">{lang === 'uz' ? 'Talabalar Malakaviy Ishlab Chiqarish Amaliyoti Shartnomasi' : 'Договор о прохождении производственной квалификационной практики'}</p>
                <p className="font-mono text-[11px] font-bold text-blue-600">
                  {selectedAppForView.contractNo ? `${lang === 'uz' ? 'Shartnoma' : 'Договор'} №: ${selectedAppForView.contractNo}` : (lang === 'uz' ? 'Loyiha holatidagi shartnoma (Kutilmoqda)' : 'Проект договора (Ожидание)')}
                </p>
              </div>

              <div className="font-sans text-xs space-y-2">
                <p className="text-justify">
                  {lang === 'uz' ? (
                    <>Bir tomondan <b>Toshkent Xalqaro Universiteti</b> (Dekan: {deanName}), ikkinchi tomondan <b>"{selectedAppForView.company}"</b> tashkiloti, uchinchi tomondan talaba <b>{selectedAppForView.studentName}</b> ({selectedAppForView.group} guruhi) o'rtasida 2026-yilgi amaliyot davrini tashkil etish bo'yicha mazkur shartnoma tuzildi.</>
                  ) : (
                    <>С одной стороны <b>Ташкентский Международный Университет</b> (Декан: {deanName}), с другой стороны организация <b>"{selectedAppForView.company}"</b>, с третьей стороны студент <b>{selectedAppForView.studentName}</b> (группа {selectedAppForView.group}) заключили настоящий договор об организации периода практики на 2026 год.</>
                  )}
                </p>
                <p className="text-justify">
                  {lang === 'uz' ? (
                    <>1. Talaba tashkilotning ichki tartib-qoidalariga rioya qiladi va kunlik hisobotlarni platformaga taqdim etadi.<br />
                    2. Korxona talabaga amaliyot o'tash joyi va malakali mentor biriktiradi.<br />
                    3. Universitet amaliyotning o'quv rejasiga muvofiqligini nazorat qiladi.</>
                  ) : (
                    <>1. Студент соблюдает внутренний распорядок организации и ежедневно заполняет дневник практики на платформе.<br />
                    2. Организация предоставляет студенту рабочее место и квалифицированного ментора.<br />
                    3. Университет контролирует соответствие практики учебному плану.</>
                  )}
                </p>
              </div>

              <div className="pt-3 border-t border-zinc-200 flex justify-between items-center font-sans text-[10px]">
                <span className="text-zinc-500">Universitet: TIU PMS Verified</span>
                <span className="font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  QR Code: VERIFIED-TIU-2026
                </span>
              </div>
            </div>

            {/* Optional Comment Input / Status Display */}
            <div className="bg-white border border-zinc-200/90 rounded-2xl p-4 space-y-2">
              <label className="block text-xs font-semibold text-zinc-900">
                {t.commentLabel}
              </label>
              {selectedAppForView.status === 'SUBMITTED' ? (
                <div>
                  <textarea
                    rows={2}
                    value={decisionComment}
                    onChange={(e) => setDecisionComment(e.target.value)}
                    placeholder={t.commentPlaceholder}
                    className="w-full text-xs p-3 rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900 bg-zinc-50/50"
                  />
                  <p className="text-[10px] text-zinc-400 mt-1">{t.commentNotice}</p>
                </div>
              ) : (
                <div className="bg-zinc-50 rounded-xl p-3 text-xs border border-zinc-200/60">
                  <p className="text-zinc-700 italic">
                    "{selectedAppForView.comment || (selectedAppForView.status === 'APPROVED' ? (lang === 'uz' ? 'Hujjatlar to\'liq, amaliyotga ruxsat berildi' : 'Документы в порядке, практика разрешена') : (lang === 'uz' ? 'Ariza qayta ko\'rib chiqish uchun qaytarildi' : 'Заявление возвращено на доработку'))}"
                  </p>
                  <span className="text-[10px] text-zinc-400 mt-1 block">{lang === 'uz' ? 'Dekanat qarori izohi' : 'Решение и комментарий деканата'}</span>
                </div>
              )}
            </div>

            {/* Footer Decisions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-zinc-100">
              <button
                type="button"
                onClick={() => {
                  setSelectedAppForView(null);
                  setDecisionComment('');
                }}
                className="w-full sm:w-auto px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl text-xs font-medium"
              >
                {t.close}
              </button>

              <div className="w-full sm:w-auto flex items-center space-x-2">
                {selectedAppForView.status === 'SUBMITTED' ? (
                  <>
                    <button
                      type="button"
                      onClick={() => handleRejectContract(selectedAppForView.id)}
                      className="flex-1 sm:flex-none px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-medium transition-colors"
                    >
                      {t.btnReject}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApproveContract(selectedAppForView.id)}
                      className="flex-1 sm:flex-none px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-medium transition-colors shadow-sm"
                    >
                      {t.btnApprove}
                    </button>
                  </>
                ) : selectedAppForView.status === 'APPROVED' ? (
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                      {lang === 'uz' ? 'Tasdiqlangan' : 'Утверждено'}: {selectedAppForView.contractNo}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setNotification(lang === 'uz' ? `Shartnoma ${selectedAppForView.contractNo} yuklab olindi!` : `Договор ${selectedAppForView.contractNo} скачан!`);
                        setTimeout(() => setNotification(null), 3000);
                      }}
                      className="px-4 py-2 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800"
                    >
                      {t.btnDownloadPdf}
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleApproveContract(selectedAppForView.id)}
                    className="px-4 py-2 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800"
                  >
                    {lang === 'uz' ? "Qayta Ko'rib Chiqish & Tasdiqlash" : 'Пересмотреть и Утвердить'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7. Teacher Students Detail Modal */}
      {selectedTeacher && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <div>
                <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {selectedTeacher.id}
                </span>
                <h3 className="text-sm font-bold text-zinc-900 mt-1">{selectedTeacher.name}</h3>
                <p className="text-xs text-zinc-500">{selectedTeacher.department} • {selectedTeacher.degree}</p>
              </div>
              <button onClick={() => setSelectedTeacher(null)} className="text-zinc-400 hover:text-zinc-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-zinc-700">Biriktirilgan Talabalar:</span>
                {(() => {
                  const assigned = students.filter(s => s.teacher === selectedTeacher.name);
                  return (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      assigned.length >= 3 ? 'bg-rose-50 text-rose-700 border-rose-200' :
                      assigned.length === 2 ? 'bg-amber-50 text-amber-700 border-amber-200' :
                      'bg-emerald-50 text-emerald-700 border-emerald-200'
                    }`}>
                      {assigned.length} / 3 nafar talaba
                    </span>
                  );
                })()}
              </div>

              <div className="divide-y divide-zinc-100 border border-zinc-200 rounded-2xl max-h-60 overflow-y-auto">
                {students.filter(s => s.teacher === selectedTeacher.name).length === 0 ? (
                  <p className="p-4 text-xs text-zinc-400 text-center">Ushbu ustozga hozircha talaba biriktirilmagan.</p>
                ) : (
                  students.filter(s => s.teacher === selectedTeacher.name).map(st => (
                    <div key={st.id} className="p-3 flex items-center justify-between text-xs hover:bg-zinc-50 transition-colors">
                      <div>
                        <p className="font-bold text-zinc-900">{st.name}</p>
                        <p className="text-[11px] text-zinc-500 font-mono">{st.id} • {st.group}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-[11px] font-medium text-zinc-800 block">{st.company}</span>
                        <span className="text-[10px] text-emerald-600 font-bold">{st.score}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedTeacher(null)}
                className="px-4 py-2 bg-zinc-900 text-white rounded-xl text-xs font-medium hover:bg-zinc-800"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 8. Single Delete Confirmation Modal */}
      {isDeleteModalOpen && studentToDelete && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="h-1.5 w-full bg-gradient-to-r from-rose-500 via-amber-500 to-rose-600" />
            <div className="p-6 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold shrink-0">
                  <Trash2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-900">Talabani Tizimdan O'chirish</h3>
                  <p className="text-xs text-zinc-500">ID: {studentToDelete.id} • {studentToDelete.group}</p>
                </div>
              </div>

              <div className="bg-zinc-50 border border-zinc-200 p-4 rounded-2xl text-xs text-zinc-700 leading-relaxed">
                Haqiqatan ham <b>{studentToDelete.name}</b> ni tizimdan o'chirmoqchimisiz? Barcha shartnomalar, kunlik fotohisobotlar va amaliyot baholari qayta tiklanmaydigan qilib o'chiriladi.
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsDeleteModalOpen(false);
                    setStudentToDelete(null);
                  }}
                  className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl text-xs font-medium transition-colors"
                >
                  Bekor qilish
                </button>
                <button
                  type="button"
                  onClick={handleSingleDelete}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-medium transition-colors shadow-sm"
                >
                  Ha, Butunlay O'chirilsin
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 9. Bulk Delete Confirmation Modal */}
      {isBulkDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="h-1.5 w-full bg-gradient-to-r from-rose-500 via-amber-500 to-rose-600" />
            <div className="p-6 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold shrink-0">
                  <Trash2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-900">Tanlangan Talabalarni O'chirish</h3>
                  <p className="text-xs text-zinc-500">{selectedStudentIds.length} nafar talaba tanlandi</p>
                </div>
              </div>

              <div className="bg-zinc-50 border border-zinc-200 p-4 rounded-2xl text-xs text-zinc-700 leading-relaxed">
                Haqiqatan ham tanlangan <b>{selectedStudentIds.length} nafar talaba</b>ni tizimdan o'chirmoqchimisiz? Barcha ma'lumotlar qayta tiklanmaydigan qilib o'chiriladi.
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsBulkDeleteModalOpen(false)}
                  className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl text-xs font-medium transition-colors"
                >
                  Bekor qilish
                </button>
                <button
                  type="button"
                  onClick={handleBulkDelete}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-medium transition-colors shadow-sm"
                >
                  Ha, Barchasini O'chirish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 10. Telegram Messaging Modal (@tiupm_bot) */}
      {isTelegramModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="h-1.5 w-full bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-600" />
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                <div className="flex items-center space-x-2.5">
                  <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                    <Send className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-zinc-900">@tiupm_bot Orqali Xabar Yuborish</h3>
                    <p className="text-xs text-zinc-500">
                      {telegramTargetStudent
                        ? `Kimga: ${telegramTargetStudent.name} (${telegramTargetStudent.group}) • ID: ${telegramTargetStudent.id}`
                        : `${selectedStudentIds.length} nafar tanlangan talaba`}
                    </p>
                  </div>
                </div>
                <button onClick={() => setIsTelegramModalOpen(false)} className="text-zinc-400 hover:text-zinc-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Quick Templates */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-zinc-700">Tezkor Shablonlar:</label>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "📌 3 tomonlama amaliyot shartnomangizni zudlik bilan yuklang!",
                    "⚠️ Diqqat! Sizda fotohisobot yuklanmagan, davomatingiz pasaymoqda.",
                    "📄 Amaliyot yo'llanma xatingiz tayyor, dekanatdan olib keting.",
                    "🏆 Amaliyot kundaligi va yakuniy hisobotingiz qabul qilindi."
                  ].map((tmpl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setTelegramMessage(tmpl)}
                      className="text-[11px] px-2.5 py-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-lg transition-colors text-left"
                    >
                      {tmpl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message Type Badges */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-zinc-700">Xabar Turi:</label>
                <div className="flex gap-2">
                  {[
                    { id: 'ESLATMA', label: '🔵 Eslatma', color: 'bg-blue-50 text-blue-700 border-blue-200' },
                    { id: 'SHOSHILINCH', label: '🔴 Shoshilinch', color: 'bg-rose-50 text-rose-700 border-rose-200' },
                    { id: 'RASMIY', label: '🟢 Rasmiy Bildirishnoma', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' }
                  ].map(tp => (
                    <button
                      key={tp.id}
                      type="button"
                      onClick={() => setTelegramMessageType(tp.id as any)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                        telegramMessageType === tp.id ? `${tp.color} ring-2 ring-zinc-900` : 'bg-white text-zinc-600 border-zinc-200'
                      }`}
                    >
                      {tp.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Textarea */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-zinc-700">Xabar Matni:</label>
                <textarea
                  rows={3}
                  value={telegramMessage}
                  onChange={(e) => setTelegramMessage(e.target.value)}
                  placeholder="Talabaga yuboriladigan xabar matnini kiriting..."
                  className="w-full text-xs p-3 rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900 bg-zinc-50/50 font-sans"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={() => setIsTelegramModalOpen(false)}
                  className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl text-xs font-medium"
                >
                  Bekor qilish
                </button>
                <button
                  type="button"
                  onClick={handleSendTelegramMessage}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-medium shadow-sm transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>@tiupm_bot Orqali Yuborish</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BULK ACTIONS FLOATING BAR */}
      {selectedStudentIds.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-zinc-900 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center space-x-4 border border-zinc-700 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center space-x-2 pr-4 border-r border-zinc-700">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold">{selectedStudentIds.length} nafar talaba tanlandi</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                setNotification(`${selectedStudentIds.length} ta talabaga ustoz biriktirish rejimi faollashdi.`);
                setTimeout(() => setNotification(null), 3000);
              }}
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-medium transition-colors flex items-center space-x-1.5"
            >
              <UserPlus className="w-3.5 h-3.5 text-blue-400" />
              <span>Ustoz Biriktirish</span>
            </button>

            <button
              onClick={() => {
                setNotification(`${selectedStudentIds.length} ta talaba uchun ommaviy yo'llanma PDF generatsiya qilindi.`);
                setTimeout(() => setNotification(null), 3000);
              }}
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-medium transition-colors flex items-center space-x-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span>Ommaviy Yo'llanma PDF</span>
            </button>

            <button
              onClick={() => {
                setTelegramTargetStudent(null);
                setIsTelegramModalOpen(true);
              }}
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-medium transition-colors flex items-center space-x-1.5"
            >
              <Send className="w-3.5 h-3.5 text-sky-400" />
              <span>Telegram Xabar</span>
            </button>

            <button
              onClick={() => setIsBulkDeleteModalOpen(true)}
              className="px-3 py-1.5 bg-rose-600/90 hover:bg-rose-600 text-white rounded-xl text-xs font-medium transition-colors flex items-center space-x-1.5 shadow-xs"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Tanlanganlarni O'chirish ({selectedStudentIds.length})</span>
            </button>

            <button
              onClick={() => setSelectedStudentIds([])}
              className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              title="Tanlovni bekor qilish"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
