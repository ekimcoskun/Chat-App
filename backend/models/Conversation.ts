import mongoose from "mongoose";
import { Conversation } from "../entities/Conversation";

const ConversationSchema = new mongoose.Schema<Conversation>({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: [],
        required: true
    }],
}, { timestamps: true });

export default mongoose.model<Conversation>("Conversation", ConversationSchema);