import { Router } from "express";
import pizzaRet from './pizzaRouter.js'
import user from './userRouter.js'
import drinksOpt from './drinkRouter.js'

const router = Router();
router.use('/getdrinks', drinksOpt)
router.use('/getpizza', pizzaRet)
router.use('/user', user)

export default router;