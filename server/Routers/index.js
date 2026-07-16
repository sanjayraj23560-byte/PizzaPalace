import { Router } from "express";
import pizzaRet from './pizzaRouter.js'
const router = Router();
router.use('/getpizza', pizzaRet)

export default router;