import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.MONGO_URI;

export const ConnectDB = async () => {
    try {
        await mongoose.connect(url);
        console.log(" db connected");
    } catch (error) {
        console.log("Error in Connection", error.message);
    }

}