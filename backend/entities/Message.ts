import { Types } from "mongoose";

export class Message {
    constructor(
        public readonly id: string,
        public readonly senderId: Types.ObjectId,
        public readonly receiverId: Types.ObjectId,
        public readonly message: string,
        public readonly createdAt: Date,
    ) {

    }
}