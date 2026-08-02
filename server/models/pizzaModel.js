import mongoose from "mongoose";

const pizzaSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    desc: {
        required: true,
        type: String
    },
    price: {
        required: true,
        type: String
    },
    img: {
        type: String,
        required: true
    }
})

const pizzaModel = mongoose.model("pizzas", pizzaSchema)
export default pizzaModel