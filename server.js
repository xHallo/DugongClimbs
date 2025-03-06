import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
console.log(process.env.TELEGRAM_CHAT_ID)
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000' }))
async function sendTelegramNotification(message) {
    const chatId = process.env.TELEGRAM_CHAT_ID;
    console.log(chatId)
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
            console.log(chatId)
        } else {
            console.log('Telegram notification sent successfully!');
        }
       } catch (error) {
        console.error('Error sending Telegram notification:', error);
    }
}

app.post('/checkout', (req, res) => {
  const { name, email, phone, cart } = req.body;
  const subtotal = cart.reduce((total, item) => total + (parseFloat(item.shirtprice) * item.quantity), 0);

  const cartMessage = cart.map((item, index) => {
    const sizemsg = Object.entries(item.sizes).map(([size, quantity]) => `${quantity} x ${size}`).join(", ") ;
    return `Item ${index + 1}:\n- Name: ${item.shirtname}\n- Edition: ${item.shirtedition}\n- Price: $${item.totalPrice}\n- Size: ${sizemsg}`
}).join('\n\n');
  const message = `Justin Poh wants to buy an item alert! \nName: ${name}\nEmail: ${email}\nPhone: +65 ${phone}\nCart:\n${cartMessage}\n\n Subtotal: $${subtotal.toFixed(2)}`
  console.log("this is the message", message)

  sendTelegramNotification(message);
  res.status(200).json({ message: "Purchase Request Submitted!" });
});
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});