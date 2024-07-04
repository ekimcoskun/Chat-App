import mongoose, { Schema } from "mongoose";
import { User } from "../entities/User";

const UserSchema = new Schema<User>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model<User>("User", UserSchema);