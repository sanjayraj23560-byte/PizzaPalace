import express from 'express';
import drinkModel from '../Models/drinkModel.js';
import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const getDrinks = await drinkModel.find();
        res.send({ getDrinks });
    } catch (error) {
        console.log(error);
    };
});

export default router;