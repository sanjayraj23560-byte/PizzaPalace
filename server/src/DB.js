import mongoose from "mongoose";

const DataBase = () => {
    mongoose.connect("mongodb+srv://Newuser_1:fssxYPHGwcd33sKb@cluster0.7uqxnrv.mongodb.net/?appName=Cluster0&compressors=zlib")
        .then(() => console.log("DB connected"))
}

export default DataBase