const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

// 1. Render için Web Sunucusu (Botun uyumaması ve ayakta kalması için)
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Roys777 Stake Bot is running perfectly!');
});

app.listen(PORT, () => {
    console.log(`Web sunucusu ${PORT} portunda aktif.`);
});

// 2. Telegram Bot Bağlantısı
const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) {
    console.error("HATA: TELEGRAM_BOT_TOKEN bulunamadı!");
}

const bot = new TelegramBot(token, { polling: true });

// 3. /start Komutu
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "👋 Roys777 Stake Bot'a hoş geldiniz!\n\nKod paylaşımı yapmak için /drop komutunu kullanabilirsiniz.");
});

// 4. /drop Komutu (Tüm butonlar ve detaylar dahil)
bot.onText(/\/drop (.+) (.+) (.+) (.+) (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;

    const code = match[1];
    const value = match[2];
    const requirement = match[3];
    const limit = match[4];
    const codeLink = match[5];

    const messageText = 
`🎁 **Daily Code - Drop** 🎁

**Code:** \`${code}\`
**Value:** ${value}
**Requirement:** ${requirement} last 7 days
**Claim limit:** ${limit} users`;

    const options = {
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "🔗 Code Link", url: codeLink }
                ],
                [
                    { text: "🛍️ Buy API Claimer", url: "https://t.me/Roys777StakeBot" }
                ],
                [
                    { text: "🛍️ Buy Claimer", url: "https://t.me/Roys777Stake`Bot" },
                    { text: "💻 Guide", url: "https://t.me/Roys777StakeBot" }
                ]
            ]
        }
    };

    try {
        await bot.sendMessage(chatId, messageText, options);
    } catch (error) {
        console.error("Mesaj gönderme hatası:", error);
    }
});

console.log("Stake Drop Bot tamamen çalışır durumda ve mesajları dinliyor!");
