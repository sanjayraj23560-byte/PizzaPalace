import { Router } from "express";
import pizzaRet from './pizzaRouter.js';
import user from './userRouter.js';
import drinksOpt from './drinkRouter.js';
import cart from './cartRouter.js';

const router = Router();

router.use('/cart', cart)
router.use('/getdrinks', drinksOpt)
router.use('/getpizza', pizzaRet)
router.use('/user', user)

export default router;