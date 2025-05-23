import { config } from "dotenv";
import mongoose from "mongoose";

config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("MongoDB'ga muvafaqiyatli bog'landi✅")
    } catch (error) {
        console.log("Database'ga ulanishda xatolik🤣");
        process.exit(1)
    }
}

export default connectDB;
