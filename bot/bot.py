import asyncio
import os
import logging
from aiogram import Bot, Dispatcher, types
from aiogram.filters import CommandStart, Command
from aiogram.enums import ParseMode

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "")
bot = Bot(token=TOKEN, parse_mode=ParseMode.HTML) if TOKEN else None
dp = Dispatcher()

@dp.message(CommandStart())
async def handle_start(message: types.Message):
    # Deep link code handling for user linking: e.g., /start auth_token
    args = message.text.split(maxsplit=1)
    if len(args) > 1:
        auth_code = args[1]
        await message.answer(
            f"Salom, <b>{message.from_user.full_name}</b>!\n\n"
            f"Sizning Telegram akkauntingiz platforma bilan muvaffaqiyatli bog'landi (Kod: <code>{auth_code}</code>).\n"
            "Endi amaliyotga oid barcha bildirishnomalar va eslatmalar shu yerga keladi! 🚀"
        )
    else:
        await message.answer(
            f"Assalomu alaykum, <b>{message.from_user.full_name}</b>!\n\n"
            "Bu — <b>OTM Talabalar Amaliyotini Boshqarish Platformasi</b> rasmiy Telegram boti.\n\n"
            "Akkauntingizni ulash uchun platforma profilingizdagi <b>'Telegramni ulash'</b> tugmasidan foydalaning."
        )

@dp.message(Command("status"))
async def handle_status(message: types.Message):
    await message.answer("Tizim boti normal holatda ishlamoqda. ✅")

async def main():
    if not TOKEN:
        logger.warning("TELEGRAM_BOT_TOKEN belgilanmagan! Bot polling rejimiga o'tmaydi.")
        return
    logger.info("Telegram Bot ishga tushirildi...")
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
