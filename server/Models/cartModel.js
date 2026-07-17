import mongoose from "mongoose";
const cartSchema = new mongoose.Schema({
    userId: {
        required: true,
        type: String
    },
    items: [{
        procuctId: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        quantity: {
            type: String,
            required: true
        }
    }],
    createdAt:{
        required:true,
        type:Date
    },
    updatedAt:{
        required:true,
        type:Date
    },
});

const cartModel = new mongoose.model("cart", cartSchema);
export default cartModel;