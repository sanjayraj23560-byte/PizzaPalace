import express from 'express'; // Fixed typo (expres -> express)
import dotenv from 'dotenv';
dotenv.config();
import { Router } from 'express';
import orderModel from '../Models/orderModel.js';


const router = Router();

// Admin Login Check
router.post('/', async (req, res) => {
    try {
        const C_password = process.env.ADMIN_PASSWORD;
        const C_user = process.env.ADMIN_USER; // Fixed typo (ADMIN_UER -> ADMIN_USER if applicable)
        const { user, password } = req.body;

        if (user === C_user && password === C_password) {
            return res.status(200).send(true);
        } else {
            return res.status(401).send(false);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
});

const updateCartItemStatus = async (req, res, newStatus) => {
    try {
        const { itemId } = req.body; // This is the _id of the PRODUCT inside cart
        console.log(`Updating product ${itemId} to ${newStatus}`);

        const updatedDocument = await orderModel.findOneAndUpdate(
            { "cart._id": itemId },                      // 1. Find the order containing this product ID
            { $set: { "cart.$.status": newStatus } },    // 2. Target ONLY that specific product in the array
            { returnDocument: 'after' }
        );

        if (!updatedDocument) {
            return res.status(404).json({ success: false, message: "Item not found in any order" });
        }

        return res.status(200).json({ success: true, data: updatedDocument });

    } catch (error) {
        console.error("Update Error:", error);
        return res.status(500).json({ success: false, error: error.message });
    }
};

// Update Routes
router.put('/putdone', (req, res) => updateCartItemStatus(req, res, 'Delivered'));
router.put('/putprep', (req, res) => updateCartItemStatus(req, res, 'Preparing'));
router.put('/puton', (req, res) => updateCartItemStatus(req, res, 'On the way'));
router.put('/putcancel', (req, res) => updateCartItemStatus(req, res, 'Canceled (Out of stock)'));

export default router;