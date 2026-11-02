import asyncio
import os
import logging
from dotenv import load_dotenv
load_dotenv()
from aiogram import Bot, Dispatcher, types, F
from aiogram.filters import CommandStart, Command
from aiogram.enums import ParseMode
from aiogram.client.default import DefaultBotProperties
from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import State, StatesGroup
from aiogram.types import (
    ReplyKeyboardMarkup,
    KeyboardButton,
    InlineKeyboardMarkup,
    InlineKeyboardButton
)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "")
bot = Bot(token=TOKEN, default=DefaultBotProperties(parse_mode=ParseMode.HTML)) if TOKEN else None
dp = Dispatcher()

# In-memory session store for bot demo / testing
user_sessions = {} # chat_id -> {role, username, full_name, group, company}

# --- KEYBOARDS ---
student_keyboard = ReplyKeyboardMarkup(
    keyboard=[
        [KeyboardButton(text="📝 Bugungi kundalikni to'ldirish")],
        [KeyboardButton(text="📊 Mening davomatim va ballarim"), KeyboardButton(text="📄 Shartnoma PDF")],
        [KeyboardButton(text="🚪 Chiqish (Logout)")]
    ],
    resize_keyboard=True
)

mentor_keyboard = ReplyKeyboardMarkup(
    keyboard=[
        [KeyboardButton(text="👥 Biriktirilgan talabalarim"), KeyboardButton(text="🏆 Talabani baholash (0-50)")],
        [KeyboardButton(text="📊 Davomatni qayd etish"), KeyboardButton(text="🚪 Chiqish (Logout)")]
    ],
    resize_keyboard=True
)

teacher_keyboard = ReplyKeyboardMarkup(
    keyboard=[
        [KeyboardButton(text="👥 Biriktirilgan talabalarim ro'yxati")],
        [KeyboardButton(text="📊 Davomat va hisobotlar monitoringi"), KeyboardButton(text="⚠️ Hisobot topshirmaganlar")],
        [KeyboardButton(text="🚪 Chiqish (Logout)")]
    ],
    resize_keyboard=True
)

login_keyboard = ReplyKeyboardMarkup(
    keyboard=[
        [KeyboardButton(text="🔑 Tizimga kirish (Login)")]
    ],
    resize_keyboard=True
)

# --- FSM STATES ---
class LoginStates(StatesGroup):
    waiting_for_id = State()
    waiting_for_password = State()

class DailyLogStates(StatesGroup):
    waiting_for_tasks = State()
    waiting_for_skills = State()
    waiting_for_photo = State()
    preview_step = State()

class MentorGradingStates(StatesGroup):
    waiting_for_student_select = State()
    waiting_for_score = State()


@dp.message(CommandStart())
async def handle_start(message: types.Message, state: FSMContext):
    chat_id = message.from_user.id
    if chat_id in user_sessions:
        session = user_sessions[chat_id]
        role = session['role']
        kb = student_keyboard if role == 'STUDENT' else (mentor_keyboard if role == 'MENTOR' else teacher_keyboard)
        await message.answer(
            f"Assalomu alaykum, <b>{session['full_name']}</b>!\n"
            f"Siz tizimga <b>{role}</b> sifatida ulangansiz.",
            reply_markup=kb
        )
    else:
        await message.answer(
            "Assalomu alaykum! <b>OTM Talabalar Amaliyotini Boshqarish Platformasi (TIU PMS)</b> rasmiy botiga xush kelibsiz.\n\n"
            "Botdan foydalanish uchun tizimdagi ID (Login) va parolingiz bilan kiring:",
            reply_markup=login_keyboard
        )

@dp.message(F.text == "🔑 Tizimga kirish (Login)")
async def start_login(message: types.Message, state: FSMContext):
    await state.set_state(LoginStates.waiting_for_id)
    await message.answer(
        "🔑 <b>Platforma ID (Login) raqamingizni kiriting:</b>\n"
        "<i>(Masalan: ST501824, MN309482, TC309483)</i>",
        reply_markup=types.ReplyKeyboardRemove()
    )

@dp.message(LoginStates.waiting_for_id)
async def process_login_id(message: types.Message, state: FSMContext):
    login_id = message.text.strip().upper()
    await state.update_data(login_id=login_id)
    await state.set_state(LoginStates.waiting_for_password)
    await message.answer("🔒 <b>Parolingizni kiriting:</b>")

@dp.message(LoginStates.waiting_for_password)
async def process_login_password(message: types.Message, state: FSMContext):
    password = message.text.strip()
    data = await state.get_data()
    login_id = data.get('login_id', '')
    await state.clear()

    # Smart role detection & simulation
    role = 'STUDENT'
    full_name = 'Bekzod Ergashev'
    kb = student_keyboard

    if login_id.startswith('AD') or 'ADMIN' in login_id:
        role = 'ADMIN'
        full_name = 'Tizim Administratori'
        kb = student_keyboard
    elif login_id.startswith('MN') or 'MENTOR' in login_id:
        role = 'MENTOR'
        full_name = 'Sardor Bekmurodov (Uzum Tech)'
        kb = mentor_keyboard
    elif login_id.startswith('TC') or login_id.startswith('OQ') or 'TEACHER' in login_id:
        role = 'TEACHER'
        full_name = 'Dotsent Jamshid Karimov'
        kb = teacher_keyboard
    else:
        role = 'STUDENT'
        full_name = f'Talaba ({login_id})'
        kb = student_keyboard

    user_sessions[message.from_user.id] = {
        'role': role,
        'username': login_id,
        'full_name': full_name,
        'group': 'DI-202-22',
        'company': 'Uzum Technologies MCHJ'
    }

    await message.answer(
        f"✅ <b>Tizimga muvaffaqiyatli kirdingiz!</b>\n\n"
        f"👤 <b>F.I.Sh:</b> {full_name}\n"
        f"🛡 <b>Rol:</b> {role}\n\n"
        "Quyidagi menyudan foydalanishingiz mumkin:",
        reply_markup=kb
    )

@dp.message(F.text == "🚪 Chiqish (Logout)")
async def handle_logout(message: types.Message):
    chat_id = message.from_user.id
    if chat_id in user_sessions:
        del user_sessions[chat_id]
    await message.answer(
        "🚪 Tizimdan chiqdingiz. Qaytadan kirish uchun quyidagi tugmani bosing:",
        reply_markup=login_keyboard
    )

# --- STUDENT DAILY LOG FLOW WITH PREVIEW ---

@dp.message(F.text == "📝 Bugungi kundalikni to'ldirish")
async def start_daily_log(message: types.Message, state: FSMContext):
    await state.set_state(DailyLogStates.waiting_for_tasks)
    await message.answer(
        "📅 <b>Bugun amaliyotning 4/30-kuni (02.11.2026)</b>\n\n"
        "📝 <b>Bugun korxonada qanday amaliy vazifalarni bajardingiz?</b>\n"
        "<i>Bajarilgan ishlaringiz haqida qisqacha yozib yuboring:</i>",
        reply_markup=types.ReplyKeyboardRemove()
    )

@dp.message(DailyLogStates.waiting_for_tasks)
async def process_tasks(message: types.Message, state: FSMContext):
    await state.update_data(tasks_done=message.text)
    await state.set_state(DailyLogStates.waiting_for_skills)
    await message.answer(
        "💡 <b>Ushbu vazifani bajarishda qanday yangi bilim yoki ko'nikmalarni o'rgandingiz?</b>\n"
        "<i>(Masalan: Docker, API integratsiya, hujjatlar bilan ishlash...)</i>"
    )

@dp.message(DailyLogStates.waiting_for_skills)
async def process_skills(message: types.Message, state: FSMContext):
    await state.update_data(acquired_skills=message.text)
    await state.set_state(DailyLogStates.waiting_for_photo)
    await message.answer(
        "📸 <b>Bugungi ish joyingizdan fotosurat yoki bajargan ishingiz skrinshotini yuboring:</b>\n"
        "<i>(Rasm yuboring yoki /otkazish deb yozing)</i>"
    )

@dp.message(DailyLogStates.waiting_for_photo, F.photo | (F.text == "/otkazish"))
async def process_photo_and_preview(message: types.Message, state: FSMContext):
    has_photo = message.photo is not None
    photo_id = message.photo[-1].file_id if has_photo else None
    await state.update_data(has_photo=has_photo, photo_id=photo_id)

    data = await state.get_data()
    tasks = data.get("tasks_done", "")
    skills = data.get("acquired_skills", "")

    await state.set_state(DailyLogStates.preview_step)

    preview_text = (
        "🔍 <b>Kundalik Hisoboti - Ko'rib chiqish (Preview):</b>\n\n"
        f"📅 <b>Kun:</b> 4/30-kun (02.11.2026)\n"
        f"📝 <b>Vazifalar:</b> {tasks}\n"
        f"💡 <b>Ko'nikmalar:</b> {skills}\n"
        f"📸 <b>Fotosurat:</b> {'Biriktirildi' if has_photo else 'Biriktirilmadi'}\n\n"
        "<i>Ma'lumotlar to'g'rimi? Quyidagi tugmalar orqali yuboring yoki tahrirlang:</i>"
    )

    preview_kb = InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(text="🚀 Mentorga Yuborish", callback_data="send_to_mentor"),
                InlineKeyboardButton(text="✏️ Tahrirlash (Edit)", callback_data="edit_log")
            ]
        ]
    )

    if has_photo:
        await message.answer_photo(photo=photo_id, caption=preview_text, reply_markup=preview_kb)
    else:
        await message.answer(preview_text, reply_markup=preview_kb)

@dp.callback_query(F.data == "edit_log")
async def edit_log_callback(callback: types.CallbackQuery, state: FSMContext):
    await state.set_state(DailyLogStates.waiting_for_tasks)
    await callback.message.answer("🔄 <b>Qaytadan boshlaymiz.</b>\nBugun korxonada qanday amaliy vazifalarni bajardingiz?")
    await callback.answer("Tahrirlash boshlandi")

@dp.callback_query(F.data == "send_to_mentor")
async def send_to_mentor_callback(callback: types.CallbackQuery, state: FSMContext):
    await state.clear()
    await callback.message.edit_reply_markup(reply_markup=None)
    await callback.message.answer(
        "✅ <b>Hisobotingiz korxona mentoriga muvaffaqiyatli yuborildi!</b>\n"
        "⏳ Mentor tasdiqlashi bilan sizga xabar keladi.",
        reply_markup=student_keyboard
    )
    await callback.answer("Mentorga yuborildi!")

@dp.message(F.text == "📊 Mening davomatim va ballarim")
async def show_student_stats(message: types.Message):
    await message.answer(
        "📊 <b>Sizning amaliyot ko'rsatkichlaringiz:</b>\n\n"
        "🏢 <b>Korxona:</b> Uzum Technologies MCHJ\n"
        "👨‍💼 <b>Mentor:</b> Sardor Bekmurodov\n"
        "📅 <b>Amaliyot muddati:</b> 4 / 30 kun\n"
        "✅ <b>Tasdiqlangan kundaliklar:</b> 3 ta\n"
        "📈 <b>Davomat ko'rsatkichi:</b> 100% (A'lo)\n"
        "⭐ <b>Joriy ball:</b> 48 / 50 ball (Mentor qismi)"
    )

@dp.message(F.text == "📄 Shartnoma PDF")
async def show_contract(message: types.Message):
    await message.answer("📄 3 tomonlama rasmiy shartnomaning raqamli nusxasi yuklandi: <code>AMAL-2026-0041</code>")


# --- MENTOR MENU & ACTIONS ---

@dp.message(F.text == "👥 Biriktirilgan talabalarim")
async def mentor_students(message: types.Message):
    await message.answer(
        "👥 <b>Sizga biriktirilgan amaliyotchi talabalar:</b>\n\n"
        "1. <b>Bekzod Ergashev</b> (DI-202-22) — ⭐ 48/50 | 🟢 4 kun\n"
        "2. <b>Sardor Rahimov</b> (DI-202-22) — ⭐ 47/50 | 🟢 4 kun\n"
        "3. <b>Madina Karimova</b> (DI-202-22) — ⭐ 49/50 | 🟢 4 kun"
    )

@dp.message(F.text == "🏆 Talabani baholash (0-50)")
async def mentor_start_grading(message: types.Message, state: FSMContext):
    await state.set_state(MentorGradingStates.waiting_for_score)
    await message.answer(
        "🏆 <b>Talabaga yakuniy 0-50 ball qo'yish:</b>\n\n"
        "Talabaning ID yoki F.I.Sh sini va qo'yiladigan ballni quyidagi formatda yuboring:\n"
        "<i>Namuna: ST501824 48</i>"
    )

@dp.message(MentorGradingStates.waiting_for_score)
async def process_mentor_score(message: types.Message, state: FSMContext):
    await state.clear()
    text = message.text.strip()
    await message.answer(
        f"✅ <b>Muvaffaqiyatli saqlandi!</b>\n\n"
        f"Ma'lumot: <code>{text}</code>\n"
        "Talabaga va OTM platformasiga ball sinxron tarzda yuborildi."
    )

@dp.message(F.text == "📊 Davomatni qayd etish")
async def mentor_attendance(message: types.Message):
    att_kb = InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(text="🟢 Keldi", callback_data="att:Bekzod:PRESENT"),
                InlineKeyboardButton(text="🟡 Kech", callback_data="att:Bekzod:LATE")
            ],
            [
                InlineKeyboardButton(text="🔴 Kelmadi", callback_data="att:Bekzod:ABSENT"),
                InlineKeyboardButton(text="🔵 Sababli", callback_data="att:Bekzod:EXCUSED")
            ]
        ]
    )
    await message.answer("📅 <b>Bekzod Ergashev uchun bugungi davomatni tanlang:</b>", reply_markup=att_kb)


# --- TEACHER MENU ---

@dp.message(F.text == "👥 Biriktirilgan talabalarim ro'yxati")
async def teacher_students_list(message: types.Message):
    await message.answer(
        "🎓 <b>Kafedra talabalarining amaliyot ro'yxati:</b>\n\n"
        "• <b>Bekzod Ergashev</b> (DI-202-22) | Uzum Tech | Mentor: S. Bekmurodov\n"
        "• <b>Sardor Rahimov</b> (DI-202-22) | Uzum Tech | Mentor: S. Bekmurodov\n"
        "• <b>Madina Karimova</b> (DI-202-22) | Uzum Tech | Mentor: S. Bekmurodov\n"
        "• <b>Javohir Toshmatov</b> (DI-201-22) | IT Park | Mentor: F. Zokirov"
    )

@dp.message(F.text == "📊 Davomat va hisobotlar monitoringi")
async def teacher_monitoring(message: types.Message):
    await message.answer(
        "📊 <b>Kafedra bo'yicha amaliyot monitoringi:</b>\n\n"
        "• Jami talabalar: <b>32 nafar</b>\n"
        "• Faol amaliyotda: <b>30 nafar</b>\n"
        "• O'rtacha davomat: <b>96.4%</b>\n"
        "• Tasdiqlangan kundaliklar: <b>142 ta</b>"
    )

@dp.message(F.text == "⚠️ Hisobot topshirmaganlar")
async def teacher_absent_reports(message: types.Message):
    await message.answer("⚠️ Bugun kundalik topshirmagan talabalar mavjud emas. Barcha talabalar faol.")


# --- CALLBACK QUERIES FOR APPROVAL & RATING ---

@dp.callback_query(F.data.startswith("approve_log:"))
async def approve_log_callback(callback: types.CallbackQuery):
    log_id = callback.data.split(":")[1]
    await callback.message.edit_reply_markup(reply_markup=None)

    rating_kb = InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(text="⭐⭐⭐⭐⭐ 5", callback_data=f"mentor_rate:{log_id}:5"),
                InlineKeyboardButton(text="⭐⭐⭐⭐ 4", callback_data=f"mentor_rate:{log_id}:4"),
                InlineKeyboardButton(text="⭐⭐⭐ 3", callback_data=f"mentor_rate:{log_id}:3")
            ]
        ]
    )
    await callback.message.answer(
        f"✅ Hisobot qabul qilindi! (ID: {log_id})\n"
        "Endi talabaning ushbu kundaligi uchun bahoni tanlang:",
        reply_markup=rating_kb
    )
    await callback.answer("Qabul qilindi!")

@dp.callback_query(F.data.startswith("mentor_rate:"))
async def mentor_rate_callback(callback: types.CallbackQuery):
    _, log_id, score = callback.data.split(":")
    await callback.message.edit_reply_markup(reply_markup=None)
    await callback.message.answer(
        f"🎉 Kundalik baholandi: <b>⭐ {score} ball</b> va davomatga <b>+1 kun</b> qo'shildi.\n"
        "Talabaga real-time bildirishnoma yuborildi."
    )
    await callback.answer("Baho saqlandi!")

@dp.callback_query(F.data.startswith("reject_log:"))
async def reject_log_callback(callback: types.CallbackQuery):
    log_id = callback.data.split(":")[1]
    await callback.message.edit_reply_markup(reply_markup=None)
    await callback.message.answer(f"❌ Hisobot qaytarildi (ID: {log_id}). Talabaga xabar yuborildi.")
    await callback.answer("Qaytarildi!")

@dp.callback_query(F.data.startswith("att:"))
async def attendance_callback(callback: types.CallbackQuery):
    _, student_name, status = callback.data.split(":")
    status_labels = {
        "PRESENT": "🟢 Kelgan",
        "LATE": "🟡 Kech kelgan",
        "ABSENT": "🔴 Kelmagan",
        "EXCUSED": "🔵 Sababli"
    }
    label = status_labels.get(status, status)
    await callback.message.edit_reply_markup(reply_markup=None)
    await callback.message.answer(f"Davomat belgilandi: <b>{student_name}</b> — {label}")
    await callback.answer("Davomat saqlandi!")


async def main():
    if not TOKEN:
        logger.warning("TELEGRAM_BOT_TOKEN belgilanmagan! Bot test rejimida ishlaydi.")
    logger.info("Telegram Bot ishga tushirildi...")
    if TOKEN:
        await dp.start_polling(bot)
    else:
        logger.info("Token yo'qligi sababli polling to'xtatildi.")

if __name__ == "__main__":
    asyncio.run(main())
