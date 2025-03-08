import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import { admin, db } from './firebase.js';
import fetch from 'node-fetch';
import rateLimit from 'express-rate-limit';
import path from 'path';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;


app.use(bodyParser.json());
app.use(cors({ origin: ['http://localhost:3000', 'http://13.55.226.8:3000/'] }))


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

const limiter = rateLimit({
  windowMs: 3 * 60 * 1000, 
  max: 1, 
  message: 'Too many requests from this IP, please try again later.',
});

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'src','views', 'Home.vue')); 
});

app.use('/checkout', limiter);
app.post('/checkout', async (req, res) => {
  const { name, email, phone, cart } = req.body;
  const subtotal = cart.reduce((total, item) => total + (parseFloat(item.shirtprice) * item.quantity), 0);

  const cartMessage = cart.map((item, index) => {
    const sizemsg = Object.entries(item.sizes).map(([size, quantity]) => `${quantity} x ${size}`).join(", ") ;
    return `Item ${index + 1}:\n- Name: ${item.shirtname}\n- Edition: ${item.shirtedition}\n- Price: $${item.totalPrice}\n- Size: ${sizemsg}`
}).join('\n\n');
  const message = `Justin Poh wants to buy an item alert! \nName: ${name}\nEmail: ${email}\nPhone: +65 ${phone}\nCart:\n${cartMessage}\n\n Subtotal: $${subtotal.toFixed(2)}`
  console.log("this is the message", message)

  sendTelegramNotification(message);
  try {
    const orderRef = db.collection('orders').doc(); // creates a new document
    await orderRef.set({
      name,
      email,
      phone,
      cart,
      subtotal: subtotal.toFixed(2),
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

    console.log('Order logged to Firestore');
  } catch (error) {
    console.error('Error logging order to Firestore:', error);
  }

  res.status(200).json({ message: 'Purchase Request Submitted!' });
});
app.use('/submit-message', limiter);
app.post('/submit-message', async (req, res) => {
  const {suggestion} = req.body;
  if (!suggestion || suggestion.trim().length === 0) {
    return res.status(400).json({ success: false, error: 'Message is required' });
  } 
  try {
    const suggestionRef = db.collection('suggestions').doc();
    await suggestionRef.set({
      content:suggestion,
      timestamp:new Date(),
    })
    sendTelegramNotification("A new suggestion has been posted by a user: " + suggestion)
    console.log("Suggestion stored in database");
    res.status(200).json({ success: true });

  } catch(error){
    console.error("Error saving suggestion", error)
    res.status(500).json({success:false, error:"Server has an error"})
  }
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});