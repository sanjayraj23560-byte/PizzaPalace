import express, { Router } from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto'
import dotenv from 'dotenv';
dotenv.config();

const router = Router();
router.post('/create-order', async (req, res) => {
    try {
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        })
        const { amount } = req.body
        const order = await razorpay.orders.create({
            amount: amount * 100,
            currency: 'INR',
            receipt: `Order ${Date.now()}`
        })
        if (!order) {
            res.status(200).send("Order failed ...!")
        }
        res.status(200).json({ order })
    } catch (error) {
        console.log(error)
    }
})

router.post('/verify-sign', async (req, res) => {
    try {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body.response
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(razorpay_order_id + '|' + razorpay_payment_id)
            .digest('hex');

        if (expectedSignature === razorpay_signature) {
            console.log("Verification Done ...!")
            res.status(200).send(true)
        }
        else {
            console.log("Not verify...!")
        }
    } catch (error) {
        console.log(error)
    }
})

export default router;

//   response: {
//     razorpay_payment_id   : 'pay_TGuV72UVubB5dF',
//     razorpay_order_id    : 'order_TGuUxNLyLIK7yy',
//     razorpay_signature   : 'ddd7ce86c463ed0728cb8cfb320646ee36aba4bce0893a80ed796886e2ae16fc'
//   }