import express from 'express'
import pizzaModel from '../models/pizzaModel.js'
import { Router } from 'express'

const router = Router()

router.get('/', async (req, res) => {
    try {
        const getPizza = await pizzaModel.find()
        console.log(getPizza)
        res.json({ getPizza })
    } catch (error) {
        console.log(error)
    }
})

export default router;