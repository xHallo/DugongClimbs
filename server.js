import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000' }))

async function sendTelegramNotification(message) {
    const chatId = process.env.TELEGRAM_CHAT_ID;
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: chatId, text: message }),
        });
        const data = await response.json();
        if (!data.ok) {
            console.error('Failed to send Telegram message:', data.description);
        } else {
            console.log('Telegram notification sent successfully!');
        }
       } catch (error) {
        console.error('Error sending Telegram notification:', error);
    }
}

app.post('/checkout', (req, res) => {
  const { name, email, phone, cart } = req.body;

  const message = `Item Purchase Request!! \n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nItems:\n${cart.map(item => `- ${item.quantity}x ${item.shirtname} (${item.shirtedition})`).join('\n')} \n Subtotal: ${item.shirtprice}`;


  sendTelegramNotification(message);
  res.status(200).json({ message: "Purchase Request Submitted!" });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});