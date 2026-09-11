const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_BOT_TOKEN || '8246454064:AAFVGYaig5A6Hx5NdtmVW45C_nV4-ylrSXc';
const bot = new TelegramBot(token, { polling: true });

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
                    { text: "🛍️ Buy Claimer", url: "https://t.me/Roys777StakeBot" },
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

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "👋 Roys777 Stake Bot'a hoş geldiniz! Kod paylaşmak için /drop komutunu kullanabilirsiniz.");
});

console.log("Stake Drop Bot çalışıyor...");
           
