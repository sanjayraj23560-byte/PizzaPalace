import dotenv from 'dotenv'
import mongoose from "mongoose";

const DataBase = async () => {
    try {
        await mongoose.connect(`mongodb+srv://pizza_palace:yeCcSnikNMECsFXa@cluster0.7uqxnrv.mongodb.net/pizzapalace?appName=Cluster0&compressors=zlib`)
        console.log("Database:", mongoose.connection.name);
        console.log("DB connected")
    } catch (error) {
        console.log(error)
    }

}

export default DataBase