import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: {
        required: true,
        type: String
    },
    items: [{
        productId: {         // Fixed the typo from procuctId -> productId
            type: String,
            required: true
        },
        desc: {
            required: false, // Changed to false if it's not always sent
            type: String
        },
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,    // Changed to Number for clean calculations
            required: true
        },
        quantity: {
            type: Number,    // Changed to Number
        },
        img: {
            required: true,
            type: String
        }
    }],
    createdAt: {
        required: true,
        type: Date,
        default: Date.now    // Automatically handles creation timestamp
    },
    updatedAt: {
        required: true,
        type: Date,
        default: Date.now
    },
});

const cartModel = mongoose.models.cart || mongoose.model("cart", cartSchema);
export default cartModel;