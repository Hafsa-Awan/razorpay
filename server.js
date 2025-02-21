const express = require('express');
const Razorpay = require('razorpay');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Initialize Razorpay with API Keys (replace with your keys)
const razorpay = new Razorpay({
  key_id: "rzp_test_K7CipNQYyyMPiS",
  key_secret: "zSBmNMorJrirOrnDrbOd1ALO",
});
app.get("/", (req, res) => {
  res.send("Razorpay API is running!");
});

// Create Razorpay Order API
app.post('/create-order', async (req, res) => {
  try {
    const { amount, currency } = req.body;
    const options = {
      amount: amount * 100, // Amount in paise (₹1 = 100 paise)
      currency: currency,
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);
    res.json({ orderId: order.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
