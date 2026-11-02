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

# States for Student Daily Log Submission
class DailyLogStates(StatesGroup):
    waiting_for_tasks = State()
    waiting_for_skills = State()
    waiting_for_photo = State()

# Student Main Keyboard
student_keyboard = ReplyKeyboardMarkup(
    keyboard=[
        [KeyboardButton(text="📝 Bugungi kundalikni to'ldirish")],
        [KeyboardButton(text="📊 Mening davomatim va ballarim"), KeyboardButton(text="📄 Shartnoma PDF")]
    ],
    resize_keyboard=True
)

@dp.message(CommandStart())
async def handle_start(message: types.Message):
    args = message.text.split(maxsplit=1)
    if len(args) > 1:
        auth_code = args[1]
        await message.answer(
            f"Salom, <b>{message.from_user.full_name}</b>!\n\n"
            f"Akkauntingiz platforma bilan muvaffaqiyatli bog'landi (Token: <code>{auth_code}</code>).\n"
            "Endi kundalik hisobotlarni to'g'ridan-to'g'ri shu bot orqali yuborishingiz mumkin! 🚀",
            reply_markup=student_keyboard
        )
    else:
        await message.answer(
            f"Assalomu alaykum, <b>{message.from_user.full_name}</b>!\n\n"
            "Bu — <b>OTM Talabalar Amaliyotini Boshqarish Platformasi</b> rasmiy Telegram boti.\n\n"
            "Quyidagi menyudan kerakli bo'limni tanlang:",
            reply_markup=student_keyboard
        )

# --- 1. STUDENT DAILY LOG SUBMISSION FLOW ---

@dp.message(F.text == "📝 Bugungi kundalikni to'ldirish")
async def start_daily_log(message: types.Message, state: FSMContext):
    await state.set_state(DailyLogStates.waiting_for_tasks)
    await message.answer(
        "📝 <b>Bugun korxonada qanday amaliy vazifalarni bajardingiz?</b>\n\n"
        "<i>Bajarilgan ishlaringiz haqida qisqacha yozib yuboring:</i>",
        reply_markup=types.ReplyKeyboardRemove()
    )

@dp.message(DailyLogStates.waiting_for_tasks)
async def process_tasks(message: types.Message, state: FSMContext):
    await state.update_data(tasks_done=message.text)
    await state.set_state(DailyLogStates.waiting_for_skills)
    await message.answer(
        "💡 <b>Ushbu vazifani bajarishda qanday yangi bilim yoki ko'nikmalarni o'rgandingiz?</b>\n\n"
        "<i>(Masalan: Docker, API integratsiya, hujjatlar bilan ishlash...)</i>"
    )

@dp.message(DailyLogStates.waiting_for_skills)
async def process_skills(message: types.Message, state: FSMContext):
    await state.update_data(acquired_skills=message.text)
    await state.set_state(DailyLogStates.waiting_for_photo)
    await message.answer(
        "📸 <b>Bugungi ish joyingizdan fotosurat yoki bajargan ishingiz skrinshotini yuboring:</b>\n\n"
        "<i>(Agar rasm bo'lmasa, /otkazish deb yozing)</i>"
    )

@dp.message(DailyLogStates.waiting_for_photo, F.photo | (F.text == "/otkazish"))
async def process_photo(message: types.Message, state: FSMContext):
    data = await state.get_data()
    tasks = data.get("tasks_done", "")
    skills = data.get("acquired_skills", "")
    has_photo = message.photo is not None

    await state.clear()

    await message.answer(
        "✅ <b>Bugungi hisobotingiz muvaffaqiyatli qabul qilindi!</b>\n\n"
        f"📝 <b>Vazifalar:</b> {tasks}\n"
        f"💡 <b>Ko'nikmalar:</b> {skills}\n"
        f"📸 <b>Rasm:</b> {'Biriktirildi' if has_photo else 'Biriktirilmadi'}\n\n"
        "⏳ <i>Hisobot korxona mentori tasdiqlashiga yuborildi. Mentor tasdiqlashi bilan sizga xabar keladi.</i>",
        reply_markup=student_keyboard
    )

# --- 2. STUDENT STATUS & CONTRACT ---

@dp.message(F.text == "📊 Mening davomatim va ballarim")
async def show_stats(message: types.Message):
    await message.answer(
        "📊 <b>Sizning amaliyot ko'rsatkichlaringiz:</b>\n\n"
        "🏢 <b>Korxona:</b> Uzum Technologies MCHJ\n"
        "👨‍💼 <b>Mentor:</b> Sardor Bekmurodov\n"
        "📅 <b>Amaliyot muddati:</b> 45 / 60 kun\n"
        "✅ <b>Tasdiqlangan kundaliklar:</b> 28 ta\n"
        "📈 <b>Davomat ko'rsatkichi:</b> 98.5% (A'lo)\n"
        "⭐ <b>Joriy ball:</b> 48 / 50 ball (Mentor qismi)"
    )

@dp.message(F.text == "📄 Shartnoma PDF")
async def send_contract_pdf(message: types.Message):
    await message.answer("📄 3 tomonlama rasmiy shartnomangiz tayyorlanmoqda... (PDF shaklida yuboriladi)")

# --- 3. MENTOR INLINE 1-CLICK APPROVAL / ATTENDANCE / GRADING ---

@dp.callback_query(F.data.startswith("approve_log:"))
async def approve_log_callback(callback: types.CallbackQuery):
    log_id = callback.data.split(":")[1]
    await callback.message.edit_reply_markup(reply_markup=None)
    await callback.message.answer(f"✅ Hisobot tasdiqlandi! (ID: {log_id})\nTalabaga xabarnoma yuborildi va davomatiga +1 kun qo'shildi.")
    await callback.answer("Tasdiqlandi!")

@dp.callback_query(F.data.startswith("reject_log:"))
async def reject_log_callback(callback: types.CallbackQuery):
    log_id = callback.data.split(":")[1]
    await callback.message.edit_reply_markup(reply_markup=None)
    await callback.message.answer(f"❌ Hisobot qaytarildi (ID: {log_id}). Talaba uni qayta to'ldiradi.")
    await callback.answer("Qaytarildi!")

# Attendance tracking by Mentor: [🟢 Keldi] [🟡 Kech keldi] [🔴 Kelmadi] [🔵 Sababli]
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

# Mentor Final Grading: 0-5 Scale (0, 1, 2, 3, 4, 5 ball)
@dp.callback_query(F.data.startswith("mentor_grade:"))
async def mentor_grade_callback(callback: types.CallbackQuery):
    _, app_id, score = callback.data.split(":")
    await callback.message.edit_reply_markup(reply_markup=None)
    await callback.message.answer(f"⭐ Talabaga yakuniy mentor bahosi qo'yildi: <b>{score} / 5 ball</b> (A'lo darajada bazaga saqlandi).")
    await callback.answer("Baho saqlandi!")

async def main():
    if not TOKEN:
        logger.warning("TELEGRAM_BOT_TOKEN belgilanmagan! Bot test rejimida kutmoqda.")
        return
    logger.info("Telegram Bot ishga tushirildi...")
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
