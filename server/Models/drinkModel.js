import mongoose from "mongoose";
const drinkSchema = new mongoose.Schema({
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
        required: true,
        type: String
    }
});

const drinkModel = new mongoose.model("drinks", drinkSchema);
export default drinkModel;