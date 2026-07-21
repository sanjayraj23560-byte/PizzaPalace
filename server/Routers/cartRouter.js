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
        const { userId, productId } = req.body;

        // 1. Safely extract the target string product identifier handling any potential nesting wrappers
        const targetProductId = typeof productId === 'object' && productId !== null
            ? productId.productId
            : productId;

        console.log("Processing Remove -> User id:", userId, "Pro id:", targetProductId);

        if (!userId || !targetProductId) {
            return res.status(400).json({ message: "Missing required fields: userId or productId" });
        }

        // 2. Use $pull to remove the single matching item from the items array
        const updatedCart = await cartModel.findOneAndUpdate(
            { userId: userId },
            {
                $pull: { items: { productId: targetProductId } },
                $set: { updatedAt: new Date() }
            },
            { returnDocument: 'before' } // Returns the fresh updated cart object to the UI
        );

        if (!updatedCart) {
            return res.status(404).json({ message: "Cart not found for this user" });
        }

        console.log("Item pulled successfully!");

        // 3. Return the updated cart items so your frontend state syncs immediately
        return res.status(201).json(updatedCart);

    } catch (error) {
        console.error("Error removing item from cart:", error);
        return res.status(500).json({ error: "Internal server error during item removal" });
    }
});

router.post('/add', async (req, res) => {
    try {
        const { userId, product, productId } = req.body;
        console.log(userId, product, "This -> ", productId);

        if (!userId || !product || !productId) {
            return res.status(400).json({ message: "Invalid payload: Missing required identifiers" });
        }

        // 1. Map the product item structure safely so Mongoose validation passes
        const cartItemToSave = {
            productId: productId, // CRITICAL: This injects the key your schema demands
            name: product.name,
            desc: product.desc,
            price: Number(product.price), // Keep it a clean number
            quantity: Number(product.quantity) || 1,
            img: product.img
        };

        // 2. FIXED: Changed "productId" to "items.productId" so MongoDB searches inside the array
        // Also updated deprecated 'new' to 'returnDocument'
        let cart = await cartModel.findOneAndUpdate(
            { userId: userId, "items.productId": productId },
            {
                $inc: { "items.$.quantity": cartItemToSave.quantity },
                $set: { updatedAt: new Date() }
            },
            { returnDocument: 'after' }
        );

        // 3. If item doesn't exist, push the mapped object instead of raw product
        if (!cart) {
            cart = await cartModel.findOneAndUpdate(
                { userId: userId },
                {
                    $push: { items: cartItemToSave }, // Pushing the safe item object
                    $setOnInsert: { createdAt: new Date() },
                    $set: { updatedAt: new Date() }
                },
                { returnDocument: 'after', upsert: true, runValidators: true }
            );
        }

        // 4. Send back the actual updated cart instead of a random string
        return res.status(200).json(cart);

    } catch (error) {
        console.error("Error updating cart:", error);
        return res.status(500).json({ error: "Internal server error structure failed validation" });
    }
});

export default router