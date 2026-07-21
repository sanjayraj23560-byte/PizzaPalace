import express, { Router } from 'express';
import Razorpay from 'razorpay';
import dotenv from 'dotenv';
dotenv.config();

const router = Router();
console.log("Key ID :" + process.env.RAZORPAY_KEY_ID)
router.post('/create-order', async (req, res) => {
    try {
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        })
        const { amount } = req.body
        console.log(amount)
        const order = await razorpay.orders.create({
            amount: amount * 100,
            currency: 'INR',
            recipt: `Order ${Date.now()}`,
            notes: "Order confirmed..!"
        })
        console.log(order)
        res.status(200).send(order)
    } catch (error) {
        console.log("Error section : - "+{error})
    }
})

router.post('/verify-sign', async (req, res) => {
    try {

    } catch (error) {
        console.log(error)
    }
})

export default router;