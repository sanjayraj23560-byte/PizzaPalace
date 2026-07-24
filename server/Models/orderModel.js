import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
    cart: [
        {
            productId: String,
            desc: String,
            name: String,
            price: Number,
            quantity: Number,
            img: String,
            _id: String,
        }
    ],
    userID: {
        type: String,
        required: true
    }
});

const orderModel = new mongoose.model("orders", orderSchema);

export default orderModel;

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
