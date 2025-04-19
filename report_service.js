const TelegramBot = require('node-telegram-bot-api');
const db = require('./repository');
const bot = new TelegramBot('YOUR_TELEGRAM_BOT_TOKEN', { polling: false });

async function sendClickReport(userId, chatId) {
  try {
    const user = await db.getUser(userId);
    const clicks = await db.getClicks(userId);

    const message = `👤 Пользователь: ${user.name}\n📊 Клики: ${clicks}`;

    await bot.sendMessage(chatId, message);
    console.log('Отчёт отправлен в Telegram');
  } catch (error) {
    console.error('Ошибка при отправке отчёта:', error);
  }
}

module.exports = { sendClickReport };