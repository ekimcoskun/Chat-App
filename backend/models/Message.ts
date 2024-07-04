import mongoose from "mongoose";
import { Message } from "../entities/Message";

const MessageSchema = new mongoose.Schema<Message>({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    message: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model<Message>("Message", MessageSchema);