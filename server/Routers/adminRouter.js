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

// Helper Function for Updating Order Status
const updateOrderStatus = async (req, res, newStatus) => {
    try {
        const { itemId } = req.body;
        console.log(`Updating ${itemId} to ${newStatus}`);

        // Try updating by main Order ID first
        let updatedDocument = await orderModel.findOneAndUpdate(
            { _id: itemId },
            { $set: { status: newStatus } },
            { returnDocument: 'after' }
        );

        // If not found by main ID, try matching a nested cart item ID
        if (!updatedDocument) {
            updatedDocument = await orderModel.findOneAndUpdate(
                { "cart._id": itemId },
                { $set: { status: newStatus, "cart.$.status": newStatus } },
                { returnDocument: 'after' }
            );
        }

        if (!updatedDocument) {
            return res.status(404).json({ success: false, message: "Order or Item not found" });
        }

        // CRITICAL: Always return a response so the client finishes the HTTP call
        return res.status(200).json({ success: true, data: updatedDocument });

    } catch (error) {
        console.error("Update Error:", error);
        return res.status(500).json({ success: false, error: error.message });
    }
};

// Update Routes using the helper
router.put('/putdone', (req, res) => updateOrderStatus(req, res, 'Delivered'));
router.put('/putprep', (req, res) => updateOrderStatus(req, res, 'Preparing'));
router.put('/puton', (req, res) => updateOrderStatus(req, res, 'On the way'));
router.put('/putcancel', (req, res) => updateOrderStatus(req, res, 'Canceled (Out of stock)'));

export default router;