import expres from 'express'
import dotenv from 'dotenv';
dotenv.config();
import { Router } from 'express';


const router = Router();

router.post('/', async (req, res) => {
    try {
        const C_password = process.env.ADMIN_PASSWORD
        const C_user = process.env.ADMIN_UER
        const { user, password } = req.body
        if (user === C_user && password === C_password) {
            res.send(true)
        }
        else {
            res.send(false)
        }
    } catch (error) {
        console.log(error)
    }
})

export default router