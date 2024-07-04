import mongoose from "mongoose";
import "dotenv/config";

export const connect = async () => {
    try {
        await mongoose.connect(process.env.DB_URL ?? "", {

        });
        console.log("Database connected");
    } catch (error) {
        console.log("Error connecting to database", error);
    }
};