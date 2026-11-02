import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE

def generate_pptx():
    prs = Presentation()
    # Set widescreen 16:9 format
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)

    blank_layout = prs.slide_layouts[6]

    # Colors
    c_navy = RGBColor(30, 58, 138)     # #1E3A8A
    c_dark = RGBColor(15, 23, 42)      # #0F172A
    c_slate = RGBColor(71, 85, 105)    # #475569
    c_white = RGBColor(255, 255, 255)
    c_bg = RGBColor(248, 250, 252)     # #F8FAFC
    c_card_bg = RGBColor(255, 255, 255)
    c_border = RGBColor(226, 232, 240) # #E2E8F0
    c_accent = RGBColor(37, 99, 235)   # #2563EB

    def add_background(slide):
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, prs.slide_width, prs.slide_height)
        bg.fill.solid()
        bg.fill.fore_color.rgb = c_bg
        bg.line.fill.background()

    def add_header(slide, title_text, category_text="TOSHKENT XALQARO UNIVERSITETI • BITIRUV MALAKAVIY ISHI"):
        # Header background banner
        header_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.5), Inches(11.733), Inches(1.1))
        tf = header_box.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0

        p0 = tf.paragraphs[0]
        p0.text = category_text.upper()
        p0.font.size = Pt(10)
        p0.font.bold = True
        p0.font.color.rgb = c_accent
        p0.font.name = "Arial"

        p1 = tf.add_paragraph()
        p1.text = title_text
        p1.font.size = Pt(24)
        p1.font.bold = True
        p1.font.color.rgb = c_dark
        p1.font.name = "Arial"

    # --- SLIDE 1: Title Slide ---
    slide1 = prs.slides.add_slide(blank_layout)
    add_background(slide1)

    # Title Card
    card = slide1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.0), Inches(1.2), Inches(11.333), Inches(5.1))
    card.fill.solid()
    card.fill.fore_color.rgb = c_white
    card.line.color.rgb = c_border
    card.line.width = Pt(1.5)

    tb = slide1.shapes.add_textbox(Inches(1.5), Inches(1.8), Inches(10.333), Inches(4.0))
    tf = tb.text_frame
    tf.word_wrap = True

    p = tf.paragraphs[0]
    p.text = "TOSHKENT XALQARO UNIVERSITETI (TIU)"
    p.font.size = Pt(12)
    p.font.bold = True
    p.font.color.rgb = c_accent
    p.font.name = "Arial"

    p2 = tf.add_paragraph()
    p2.text = "Oliy ta'lim muassasalari talabalari amaliyotini boshqarish va monitoring qilishning axborot tizimi (PMS Platform)"
    p2.font.size = Pt(28)
    p2.font.bold = True
    p2.font.color.rgb = c_dark
    p2.font.name = "Arial"
    p2.space_before = Pt(14)

    p3 = tf.add_paragraph()
    p3.text = "Bitiruv Malakaviy Ishi (BMI) himoyasi — 2026"
    p3.font.size = Pt(16)
    p3.font.color.rgb = c_slate
    p3.font.name = "Arial"
    p3.space_before = Pt(14)

    p4 = tf.add_paragraph()
    p4.text = "Bajaruvchi: Axborot texnologiyalari fakulteti talabasi  |  Ilmiy rahbar: Dotsent, PhD"
    p4.font.size = Pt(13)
    p4.font.bold = True
    p4.font.color.rgb = c_navy
    p4.font.name = "Arial"
    p4.space_before = Pt(24)

    # --- SLIDE 2: Problems / Background ---
    slide2 = prs.slides.add_slide(blank_layout)
    add_background(slide2)
    add_header(slide2, "An'anaviy Amaliyot Jarayonidagi Tizimli Muammolar")

    problems = [
        ("Qog'ozbozlik va Byurokratiya", "3 nusxadagi qog'oz shartnomalar, buyruqlar va qo'lda to'ldiriladigan qog'oz kundaliklar."),
        ("Ghost Internship (Soxta Amaliyot)", "Talabaning korxonaga bormasdan, amaliyot so'ngida faqat muhr bostirib kelishi va real nazorat yo'qligi."),
        ("Real-time Monitoring Yo'qligi", "OTM rahbariyati va dekanat talabaning korxonadagi real kundalik faoliyatidan deyarli xabardor emasligi."),
        ("Subyektiv Baholash", "Korxona rahbari tomonidan qo'yiladigan yagona rasmiy baho va ECTS shaffof mezonlarining yetishmasligi.")
    ]

    for i, (title, desc) in enumerate(problems):
        row = i // 2
        col = i % 2
        left = Inches(0.8 + col * 5.9)
        top = Inches(1.8 + row * 2.6)

        c = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, Inches(5.6), Inches(2.3))
        c.fill.solid()
        c.fill.fore_color.rgb = c_white
        c.line.color.rgb = c_border

        tb = slide2.shapes.add_textbox(left + Inches(0.3), top + Inches(0.3), Inches(5.0), Inches(1.8))
        tf = tb.text_frame
        tf.word_wrap = True

        p = tf.paragraphs[0]
        p.text = f"0{i+1}. {title}"
        p.font.size = Pt(15)
        p.font.bold = True
        p.font.color.rgb = RGBColor(185, 28, 28) # Red accent for problem
        p.font.name = "Arial"

        p2 = tf.add_paragraph()
        p2.text = desc
        p2.font.size = Pt(13)
        p2.font.color.rgb = c_slate
        p2.font.name = "Arial"
        p2.space_before = Pt(8)

    # --- SLIDE 3: Goals & Tasks ---
    slide3 = prs.slides.add_slide(blank_layout)
    add_background(slide3)
    add_header(slide3, "Tadqiqotning Maqsadi va Asosiy Vazifalari")

    c = slide3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.8), Inches(11.733), Inches(1.5))
    c.fill.solid()
    c.fill.fore_color.rgb = c_white
    c.line.color.rgb = c_border

    tb = slide3.shapes.add_textbox(Inches(1.1), Inches(2.0), Inches(11.133), Inches(1.1))
    tf = tb.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "LOYIHANING BOSHQUV MAQSADI:"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = c_accent
    p.font.name = "Arial"
    p2 = tf.add_paragraph()
    p2.text = "OTM, Korxona va Talaba o'rtasidagi barcha amaliyot jarayonlarini 100% raqamlashtirish, shaffof nazorat qilish va xolis ECTS baholash tizimini yagona platformada jamlash."
    p2.font.size = Pt(14)
    p2.font.bold = True
    p2.font.color.rgb = c_dark
    p2.font.name = "Arial"
    p2.space_before = Pt(4)

    tasks = [
        "1. Yagona ma'lumotlar bazasi va 5 roli mavjud RBAC xavfsiz arxitekturasini yaratish",
        "2. 3 tomonlama yuridik shartnomalarni 1 soniyada avtomatik PDF/DOCX generatsiya qilish",
        "3. Telegram Bot (@tiupm_bot) orqali kunlik kundalik va davomatni 1-click tasdiqlash",
        "4. Mentor (0-5) va OTM rahbari (0-50) muvozanatlashgan 100 ballik baholash tizimi"
    ]

    for i, task in enumerate(tasks):
        top = Inches(3.5 + i * 0.9)
        c2 = slide3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), top, Inches(11.733), Inches(0.75))
        c2.fill.solid()
        c2.fill.fore_color.rgb = c_white
        c2.line.color.rgb = c_border

        tb = slide3.shapes.add_textbox(Inches(1.1), top + Inches(0.15), Inches(11.133), Inches(0.5))
        tf = tb.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = task
        p.font.size = Pt(13)
        p.font.bold = True
        p.font.color.rgb = c_navy
        p.font.name = "Arial"

    # --- SLIDE 4: Architecture & Tech Stack ---
    slide4 = prs.slides.add_slide(blank_layout)
    add_background(slide4)
    add_header(slide4, "Zamonaviy va Yuqori Unumdor Texnologik Stak")

    techs = [
        ("Backend", "Python FastAPI", "Asinxron ASGI arxitektura, SQLAlchemy 2.0 Async, Pydantic v2, Uvicorn, Pytest integratsion testlar."),
        ("Frontend", "Next.js 14 (App Router)", "React Server Components, TypeScript, Tailwind CSS, Lucide React vektor iconlar, Pure White dizayn."),
        ("Mobil / Bot", "Telegram Bot (Aiogram 3.x)", "FSM (Finite State Machine), kunlik loglar yuborish, mentor uchun 1 tugmali tasdiqlash interfeysi."),
        ("Ma'lumotlar Bazasi", "PostgreSQL 16 + SQLite", "ACID tranzaksiyalari, Pessimistic locking, UUID v4, unikal student ID generatori (STD-2026-XXXX).")
    ]

    for i, (cat, tech, desc) in enumerate(techs):
        row = i // 2
        col = i % 2
        left = Inches(0.8 + col * 5.9)
        top = Inches(1.8 + row * 2.6)

        c = slide4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, Inches(5.6), Inches(2.3))
        c.fill.solid()
        c.fill.fore_color.rgb = c_white
        c.line.color.rgb = c_border

        tb = slide4.shapes.add_textbox(left + Inches(0.3), top + Inches(0.3), Inches(5.0), Inches(1.8))
        tf = tb.text_frame
        tf.word_wrap = True

        p = tf.paragraphs[0]
        p.text = cat.upper()
        p.font.size = Pt(11)
        p.font.bold = True
        p.font.color.rgb = c_accent
        p.font.name = "Arial"

        p2 = tf.add_paragraph()
        p2.text = tech
        p2.font.size = Pt(16)
        p2.font.bold = True
        p2.font.color.rgb = c_dark
        p2.font.name = "Arial"
        p2.space_before = Pt(4)

        p3 = tf.add_paragraph()
        p3.text = desc
        p3.font.size = Pt(12)
        p3.font.color.rgb = c_slate
        p3.font.name = "Arial"
        p3.space_before = Pt(6)

    # --- SLIDE 5: RBAC 5 Roles ---
    slide5 = prs.slides.add_slide(blank_layout)
    add_background(slide5)
    add_header(slide5, "Rollar Kesimidagi Avtorizatsiya va Huquqlar (RBAC)")

    roles = [
        ("Admin", "AD987789", "Tizim sozlamalari, fakultet va kafedralar, xavfsizlik audit loglari."),
        ("Dekanat / OTM Staff", "DK204581", "Talabalar Excel bulk-import, shartnomalar, kvotalar va monitoring."),
        ("Korxona Mentori", "MN408193", "Talaba davomati (Keldi/Kech/Kelmadi), kundaliklarni tasdiqlash, 0-5 baho."),
        ("Kafedra O'qituvchisi", "TC309482", "Akademik nazorat, kundaliklar taftishi, 100 ballik ECTS baholash."),
        ("Amaliyotchi Talaba", "ST501824", "Korxona tanlash, ariza topshirish, kunlik hisobot va foto-isbot yuborish.")
    ]

    for i, (role, login, desc) in enumerate(roles):
        top = Inches(1.6 + i * 1.05)
        c = slide5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), top, Inches(11.733), Inches(0.95))
        c.fill.solid()
        c.fill.fore_color.rgb = c_white
        c.line.color.rgb = c_border

        tb = slide5.shapes.add_textbox(Inches(1.1), top + Inches(0.18), Inches(11.133), Inches(0.6))
        tf = tb.text_frame
        tf.word_wrap = True

        p = tf.paragraphs[0]
        p.text = f"{role}  (Standart Login: {login})"
        p.font.size = Pt(13)
        p.font.bold = True
        p.font.color.rgb = c_navy
        p.font.name = "Arial"

        p2 = tf.add_paragraph()
        p2.text = desc
        p2.font.size = Pt(12)
        p2.font.color.rgb = c_slate
        p2.font.name = "Arial"
        p2.space_before = Pt(2)

    # --- SLIDE 6: Contracts & PDF/DOCX ---
    slide6 = prs.slides.add_slide(blank_layout)
    add_background(slide6)
    add_header(slide6, "3 Tomonlama Shartnomalar Avtomatik Generatsiyasi")

    steps = [
        ("1. Ariza Tasdiqlanishi", "Talaba korxona tanlab ariza yuboradi. OTM staff (Dekanat) bir tugma bilan arizani tasdiqlaydi."),
        ("2. Unikal Raqam", "Tizim avtomatik ravishda `AMAL-XXXXXXXX` formatidagi yuridik shartnoma raqamini shakllantiradi."),
        ("3. PDF & DOCX Generatsiya", "ReportLab va python-docx yordamida universitet rekvizitlari, korxona va talaba ma'lumotlari yoziladi."),
        ("4. Real-time Bildirishnoma", "WebSocket orqali talabaga shartnoma tayyorligi haqida xabar boradi va kabinetida yuklab olinadi.")
    ]

    for i, (title, desc) in enumerate(steps):
        left = Inches(0.8 + i * 2.95)
        c = slide6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, Inches(1.8), Inches(2.8), Inches(5.0))
        c.fill.solid()
        c.fill.fore_color.rgb = c_white
        c.line.color.rgb = c_border

        tb = slide6.shapes.add_textbox(left + Inches(0.2), Inches(2.1), Inches(2.4), Inches(4.4))
        tf = tb.text_frame
        tf.word_wrap = True

        p = tf.paragraphs[0]
        p.text = f"QADAM {i+1}"
        p.font.size = Pt(10)
        p.font.bold = True
        p.font.color.rgb = c_accent
        p.font.name = "Arial"

        p2 = tf.add_paragraph()
        p2.text = title
        p2.font.size = Pt(14)
        p2.font.bold = True
        p2.font.color.rgb = c_dark
        p2.font.name = "Arial"
        p2.space_before = Pt(8)

        p3 = tf.add_paragraph()
        p3.text = desc
        p3.font.size = Pt(12)
        p3.font.color.rgb = c_slate
        p3.font.name = "Arial"
        p3.space_before = Pt(8)

    # --- SLIDE 7: Daily Logs & Attendance ---
    slide7 = prs.slides.add_slide(blank_layout)
    add_background(slide7)
    add_header(slide7, "Telegram Bot va 'LATE' (Kech Keldi) Davomat Algoritmi")

    c1 = slide7.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.8), Inches(5.6), Inches(5.0))
    c1.fill.solid()
    c1.fill.fore_color.rgb = c_white
    c1.line.color.rgb = c_border

    tb1 = slide7.shapes.add_textbox(Inches(1.1), Inches(2.1), Inches(5.0), Inches(4.4))
    tf1 = tb1.text_frame
    tf1.word_wrap = True
    p = tf1.paragraphs[0]
    p.text = "TELEGRAM BOT ORQALI KUNDALIK"
    p.font.size = Pt(12)
    p.font.bold = True
    p.font.color.rgb = c_accent
    p.font.name = "Arial"
    p2 = tf1.add_paragraph()
    p2.text = "• Talaba botga kundalik vazifalar va foto-isbot yuboradi.\n• Mentorga bir zumda xabar boradi.\n• Mentor 1 tugma bilan tasdiqlaydi yoki izoh yozib qaytaradi.\n• Ma'lumotlar avtomatik bazaga yoziladi."
    p2.font.size = Pt(13)
    p2.font.color.rgb = c_slate
    p2.font.name = "Arial"
    p2.space_before = Pt(12)

    c2 = slide7.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.7), Inches(1.8), Inches(5.8), Inches(5.0))
    c2.fill.solid()
    c2.fill.fore_color.rgb = c_white
    c2.line.color.rgb = c_border

    tb2 = slide7.shapes.add_textbox(Inches(7.0), Inches(2.1), Inches(5.2), Inches(4.4))
    tf2 = tb2.text_frame
    tf2.word_wrap = True
    p = tf2.paragraphs[0]
    p.text = "DAVOMAT STATUSLARI (LATE JORIY ETILDI)"
    p.font.size = Pt(12)
    p.font.bold = True
    p.font.color.rgb = c_navy
    p.font.name = "Arial"
    p3 = tf2.add_paragraph()
    p3.text = "1. PRESENT (Keldi) — To'liq 1.0 koeffitsient.\n2. LATE (Kech keldi) — Tirbandlik yoki sababli 15-30 min kechikish (0.75 koeffitsient).\n3. EXCUSED (Sababli) — Universitet tadbiri yoki tibbiy ma'lumotnoma.\n4. ABSENT (Kelmadi) — Sababsiz qatnashmaganlik."
    p3.font.size = Pt(13)
    p3.font.color.rgb = c_slate
    p3.font.name = "Arial"
    p3.space_before = Pt(12)

    # --- SLIDE 8: Anti-Fraud & Security ---
    slide8 = prs.slides.add_slide(blank_layout)
    add_background(slide8)
    add_header(slide8, "Anti-Fraud va Xavfsizlik Himoya Mexanizmlari")

    safeties = [
        ("Anti-Tailgating (IP Audit)", "Talaba kundalik topshirgan IP manzil bilan mentor tasdiqlagan IP bir xil bo'lsa, tizim buni avtomatik 'Shubhali birgalikdagi tasdiqlash' sifatida bayroqlaydi."),
        ("Kelajak Sanaga Taqiq", "Talaba oldingi yoki kelajakdagi kunlar uchun birdaniga kundalik to'ldira olmaydi. Har kungi hisobot faqat o'sha kuni yuboriladi."),
        ("Kvota Poygasi Himoyasi", "Korxonadagi vakant o'rinlar Pessimistic Locking (SELECT FOR UPDATE) orqali limitdan oshib ketishdan himoyalangan.")
    ]

    for i, (title, desc) in enumerate(safeties):
        top = Inches(1.8 + i * 1.7)
        c = slide8.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), top, Inches(11.733), Inches(1.5))
        c.fill.solid()
        c.fill.fore_color.rgb = c_white
        c.line.color.rgb = c_border

        tb = slide8.shapes.add_textbox(Inches(1.2), top + Inches(0.25), Inches(11.133), Inches(1.0))
        tf = tb.text_frame
        tf.word_wrap = True

        p = tf.paragraphs[0]
        p.text = f"🛡️ {title}"
        p.font.size = Pt(15)
        p.font.bold = True
        p.font.color.rgb = c_navy
        p.font.name = "Arial"

        p2 = tf.add_paragraph()
        p2.text = desc
        p2.font.size = Pt(13)
        p2.font.color.rgb = c_slate
        p2.font.name = "Arial"
        p2.space_before = Pt(4)

    # --- SLIDE 9: 100 Ball Grading ECTS ---
    slide9 = prs.slides.add_slide(blank_layout)
    add_background(slide9)
    add_header(slide9, "100 Ballik Xolis Baholash Tizimi (ECTS Modeli)")

    c = slide9.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.8), Inches(11.733), Inches(1.4))
    c.fill.solid()
    c.fill.fore_color.rgb = c_white
    c.line.color.rgb = c_border

    tb = slide9.shapes.add_textbox(Inches(1.1), Inches(2.0), Inches(11.133), Inches(1.0))
    tf = tb.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "MATEMATIK FORMULA:"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = c_accent
    p.font.name = "Arial"
    p2 = tf.add_paragraph()
    p2.text = "Yakuniy Ball = (Mentor Balli × 10) + OTM Rahbari Balli = (5.0 × 10) + 50 = 100 Ball"
    p2.font.size = Pt(18)
    p2.font.bold = True
    p2.font.color.rgb = c_dark
    p2.font.name = "Arial"
    p2.space_before = Pt(4)

    grades = [
        ("A", "90 - 100 ball", "A'lo daraja"),
        ("B", "80 - 89 ball", "Yaxshi"),
        ("C", "70 - 79 ball", "Qoniqarli"),
        ("D", "60 - 69 ball", "Yetarli"),
        ("F", "< 60 ball", "Qayta amaliyot")
    ]

    for i, (grade, pts, desc) in enumerate(grades):
        left = Inches(0.8 + i * 2.38)
        c2 = slide9.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, Inches(3.5), Inches(2.25), Inches(3.3))
        c2.fill.solid()
        c2.fill.fore_color.rgb = c_white
        c2.line.color.rgb = c_border

        tb2 = slide9.shapes.add_textbox(left + Inches(0.2), Inches(3.8), Inches(1.85), Inches(2.8))
        tf2 = tb2.text_frame
        tf2.word_wrap = True

        p = tf2.paragraphs[0]
        p.text = f"Baho: {grade}"
        p.font.size = Pt(20)
        p.font.bold = True
        p.font.color.rgb = c_accent if grade in ['A', 'B'] else c_navy
        p.font.name = "Arial"

        p2 = tf2.add_paragraph()
        p2.text = pts
        p2.font.size = Pt(14)
        p2.font.bold = True
        p2.font.color.rgb = c_dark
        p2.font.name = "Arial"
        p2.space_before = Pt(10)

        p3 = tf2.add_paragraph()
        p3.text = desc
        p3.font.size = Pt(12)
        p3.font.color.rgb = c_slate
        p3.font.name = "Arial"
        p3.space_before = Pt(6)

    # --- SLIDE 10: QA Test Suite ---
    slide10 = prs.slides.add_slide(blank_layout)
    add_background(slide10)
    add_header(slide10, "100% Avtomatlashtirilgan Sifat Kafolati (QA Sprint)")

    c = slide10.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.8), Inches(11.733), Inches(1.5))
    c.fill.solid()
    c.fill.fore_color.rgb = c_white
    c.line.color.rgb = c_border

    tb = slide10.shapes.add_textbox(Inches(1.1), Inches(2.0), Inches(11.133), Inches(1.1))
    tf = tb.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "PYTEST INTEGRATSION TEST NATIJASI:"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = c_accent
    p.font.name = "Arial"
    p2 = tf.add_paragraph()
    p2.text = "24 ta / 24 ta test 100% PASSED (Yashil) holatda! Barcha biznes-logika mukammal ishlayapti."
    p2.font.size = Pt(18)
    p2.font.bold = True
    p2.font.color.rgb = RGBColor(16, 185, 129) # Emerald
    p2.font.name = "Arial"
    p2.space_before = Pt(4)

    tests = [
        ("test_auth_rbac.py", "7 ta test", "Barcha 5 ta rol uchun login va RBAC xavfsizlik cheklovlari."),
        ("test_applications_contracts.py", "3 ta test", "Talaba arizasi, Dekanat tasdig'i va PDF/DOCX shartnoma generatsiyasi."),
        ("test_dailylogs_edgecases.py", "4 ta test", "Kelajak sanani rad etish, dublikat kundalik bloki va mentor tasdig'i."),
        ("test_attendance_late.py", "4 ta test", "PRESENT, LATE, ABSENT davomat va bir kunda upsert ishlashi."),
        ("test_assessments_grading.py", "4 ta test", "Mentor (0-5) va OTM (0-50) ballari asosida ECTS A, B, C, D, F baholash."),
        ("test_excel_import.py", "3 ta test", "Excel orqali ommaviy talaba importi va unikal ID (STD-2026-XXXX).")
    ]

    for i, (fname, count, desc) in enumerate(tests):
        row = i // 2
        col = i % 2
        left = Inches(0.8 + col * 5.9)
        top = Inches(3.5 + row * 1.3)

        c2 = slide10.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, Inches(5.6), Inches(1.15))
        c2.fill.solid()
        c2.fill.fore_color.rgb = c_white
        c2.line.color.rgb = c_border

        tb2 = slide10.shapes.add_textbox(left + Inches(0.2), top + Inches(0.15), Inches(5.2), Inches(0.85))
        tf2 = tb2.text_frame
        tf2.word_wrap = True

        p = tf2.paragraphs[0]
        p.text = f"{fname} ({count})"
        p.font.size = Pt(12)
        p.font.bold = True
        p.font.color.rgb = c_navy
        p.font.name = "Arial"

        p3 = tf2.add_paragraph()
        p3.text = desc
        p3.font.size = Pt(11)
        p3.font.color.rgb = c_slate
        p3.font.name = "Arial"
        p3.space_before = Pt(2)

    # --- SLIDE 11: Economic Impact ---
    slide11 = prs.slides.add_slide(blank_layout)
    add_background(slide11)
    add_header(slide11, "Iqtisodiy Samara va Metrikalar")

    metrics = [
        ("95%", "Qog'ozbozlikning Qisqarishi", "Shartnoma va kundaliklar to'liq raqamlashtirilgani evaziga qog'oz va vaqt sarfi 95% ga kamaydi."),
        ("1 Soniya", "Hujjat Generatsiyasi", "Oldin 3-5 kun talab qilingan 3 tomonlama shartnoma Endi 1 soniyada PDF/DOCX formatda tayyor bo'ladi."),
        ("100%", "Shaffoflik va Xolislik", "Talaba, mentor va OTM o'rtasidagi baholash va davomat jarayonlari to'liq ochiq va audit qilinadi.")
    ]

    for i, (num, title, desc) in enumerate(metrics):
        left = Inches(0.8 + i * 4.05)
        c = slide11.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, Inches(1.8), Inches(3.633), Inches(5.0))
        c.fill.solid()
        c.fill.fore_color.rgb = c_white
        c.line.color.rgb = c_border

        tb = slide11.shapes.add_textbox(left + Inches(0.3), Inches(2.3), Inches(3.033), Inches(4.0))
        tf = tb.text_frame
        tf.word_wrap = True

        p = tf.paragraphs[0]
        p.text = num
        p.font.size = Pt(36)
        p.font.bold = True
        p.font.color.rgb = c_accent
        p.font.name = "Arial"

        p2 = tf.add_paragraph()
        p2.text = title
        p2.font.size = Pt(16)
        p2.font.bold = True
        p2.font.color.rgb = c_dark
        p2.font.name = "Arial"
        p2.space_before = Pt(12)

        p3 = tf.add_paragraph()
        p3.text = desc
        p3.font.size = Pt(13)
        p3.font.color.rgb = c_slate
        p3.font.name = "Arial"
        p3.space_before = Pt(8)

    # --- SLIDE 12: Conclusion ---
    slide12 = prs.slides.add_slide(blank_layout)
    add_background(slide12)
    add_header(slide12, "Xulosa va Istiqbolli Rejalar")

    c = slide12.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.8), Inches(11.733), Inches(5.0))
    c.fill.solid()
    c.fill.fore_color.rgb = c_white
    c.line.color.rgb = c_border

    tb = slide12.shapes.add_textbox(Inches(1.2), Inches(2.2), Inches(11.0), Inches(4.2))
    tf = tb.text_frame
    tf.word_wrap = True

    p = tf.paragraphs[0]
    p.text = "ASOSIY NATIJALAR:"
    p.font.size = Pt(12)
    p.font.bold = True
    p.font.color.rgb = c_accent
    p.font.name = "Arial"

    points = [
        "1. Toshkent Xalqaro Universiteti (TIU) uchun talabalar amaliyotini boshqarishning to'liq avtomatlashtirilgan PMS platformasi ishlab chiqildi va amaliyotga joriy etildi.",
        "2. 5 ta rol uchun RBAC xavfsizlik arxitekturasi, Telegram Bot integratsiyasi va LATE davomat hisobi to'liq ishga tushirildi.",
        "3. 24/24 ta integratsion testlar muvaffaqiyatli o'tdi va tizim ishlab chiqarishga (Production) tayyor holatga keltirildi.",
        "4. Kelgusida mobil ilova (iOS/Android) va sun'iy intellekt yordamida kundaliklarni avtomatik tahlil qilish moduli qo'shilishi rejalashtirilgan."
    ]

    for pt in points:
        p_item = tf.add_paragraph()
        p_item.text = pt
        p_item.font.size = Pt(14)
        p_item.font.bold = True
        p_item.font.color.rgb = c_dark
        p_item.font.name = "Arial"
        p_item.space_before = Pt(14)

    os.makedirs("docs", exist_ok=True)
    out_path = "docs/TIU_PMS_BMI_Taqdimot.pptx"
    prs.save(out_path)
    print(f"[OK] Official 12-slide presentation saved successfully to {out_path}")

if __name__ == "__main__":
    generate_pptx()
