import express from 'express';
import { Router } from 'express';
import orderModel from '../Models/orderModel.js';
const router = Router();

router.post('/getOrder', async (req, res) => {
    try {
        const order = new orderModel(req.body);
        // console.log(req.body)
        const afterOrder = await order.save()
        res.status(200).send(order)
        console.log(afterOrder)
    } catch (error) {
        console.log(error)
    }
})

router.post('/showOrders', async (req, res) => {
    try {
        const userID = req.body
        console.log(userID)
        const fetchOrders = await orderModel.findOne({
            name: userID
        })
        console.log("This ->!", fetchOrders)
    } catch (error) {
        console.log(error)
    }
})

export default router

//  cart: [
//     {
//       productId: '6a1c5d2603fa70658484773b',
//       desc: 'Double pepperoni, jalapeño, cheese',
//       name: 'Pepperoni Storm',
//       price: 329,
//       quantity: 26,
//       img: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=80',
//       _id: '6a623a46a77c0870dcef7564'
//     },
//     {
//       productId: '6a1c5d2603fa70658484773e',
//       desc: 'Truffle oil, wild mushrooms, parmesan',
//       name: 'Truffle Mushroom',
//       price: 379,
//       quantity: 2,
//       img: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=400&q=80',
//       _id: '6a623a8ea77c0870dcef757d'
//     }
//   ]
// }
