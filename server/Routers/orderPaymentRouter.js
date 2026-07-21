import express, { Router } from 'express';
import Razorpay from 'razorpay';
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
        // const { cart, total, username, userId, address,paymentId } = req.body
        console.log(req.body)
    } catch (error) {
        console.log(error)
    }
})

export default router;