const express = require("express");
const Razorpay = require("razorpay");

const app = express();
app.use(express.json()); // Enable JSON parsing

const razorpay = new Razorpay({
  key_id: "rzp_test_K7CipNQYyyMPiS",
  key_secret: "zSBmNMorJrirOrnDrbOd1ALO",
});

app.post("/api/create-order", async (req, res) => {
    try {
        const order = await razorpay.orders.create({
            amount: req.body.amount,
            currency: "INR",
            receipt: "receipt_id_1",
            payment_capture: 1,
        });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = app;

