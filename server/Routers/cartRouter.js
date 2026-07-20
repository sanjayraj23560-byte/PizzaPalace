import express from 'express';
import cartModel from '../Models/cartModel.js';
import { Router } from 'express';
const router = Router();

router.get('/:uid', async (req, res) => {
    try {
        const id = req.params.uid
        const cartData = await cartModel.findOne({
            userId: id
        })
        res.send(cartData)
        console.log("Id :", id)
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

router.get('/add', async (req, res) => {
    try {
        // const { userId, product } = req.body;

        // // 1. Basic Validation Guard
        // if (!userId || !product || !product.productId) {
        //     return res.status(400).json({ message: "Invalid payload: Missing userId or productId" });
        // }

        // // 2. Try to update an existing item inside the array
        // let cart = await cartModel.findOneAndUpdate(
        //     { userId: userId, "items.productId": product.productId },
        //     {
        //         $inc: { "items.$.quantity": product.quantity || 1 },
        //         $set: { updatedAt: new Date() }
        //     },
        //     { new: true } // Returns the updated document
        // );

        // // 3. If the item didn't exist in the cart (or no cart exists yet), handle the push/upsert
        // if (!cart) {
        //     cart = await cartModel.findOneAndUpdate(
        //         { userId: userId },
        //         {
        //             $push: { items: product },
        //             $setOnInsert: { createdAt: new Date() },
        //             $set: { updatedAt: new Date() }
        //         },
        //         { new: true, upsert: true, runValidators: true }
        //     );
        // }

        // // 4. Send back clean data
        // // return res.status(200).json(cart);
        res.send("fsdasdiewhtiwriwerhiqwhriwerwegriuweriweugrweirg werg weriewirrwerwer uweriwer wer ")
    } catch (error) {
        console.error("Error updating cart:", error);
        return res.status(500).json({ error: "Internal server error structure failed validation" });
    }
});

export default router