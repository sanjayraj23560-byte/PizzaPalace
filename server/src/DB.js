import dotenv from 'dotenv'
dotenv.config();
import mongoose from "mongoose";

const DataBase = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}`)
        console.log("Database:", mongoose.connection.name);
        console.log("DB connected")
    } catch (error) {
        console.log(error)
    }

}

export default DataBase