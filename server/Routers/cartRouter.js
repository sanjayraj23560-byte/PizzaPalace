import express from 'express';
import cartModel from '../Models/cartModel.js';
import { Router } from 'express';
const router = Router();


router.get('/', async (req, res) => {
    try {
        const cartData = await cartModel.find()
        res.send(cartData)
        console.log(cartData)
    } catch (error) {
        console.log(error)
    }
})

router.post('/remove', async (req, res) => {
    try {

    } catch (error) {
        console.log(error)
    }
})

router.post('/add', async (req, res) => {
    try {
        const { userId, productId } = req.body
        console.log(userId, productId)
    } catch (error) {
        console.log(error)
    }
})


export default router