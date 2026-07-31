import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        cart: [
            {
                productId: String,
                desc: String,
                name: String,
                price: Number,
                quantity: Number,
                img: String,
                _id: String,
            },
        ],

        status: {
            type: String,
            default: "waiting", // Cleaned: Removed returnDocument
        },

        time: {
            type: String,
            default: () => new Date().toLocaleString(), // Executes dynamically per order
        },

        userID: {
            type: String,
            required: true,
        },
    },
    { timestamps: true } // Adds createdAt & updatedAt automatically
);

// Prevent re-compilation models error in Next.js/Express dev mode
const orderModel = mongoose.models.orders || mongoose.model("orders", orderSchema);

export default orderModel;