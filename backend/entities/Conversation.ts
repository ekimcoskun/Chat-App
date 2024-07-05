import { Types } from "mongoose";
import { Message } from "./Message";
import { User } from "./User";

export class Conversation {
    constructor(
        public readonly _id: string,
        public readonly participants: User[],
        public readonly messages: Message[],
        public readonly createdAt: Date,
    ) {

    }
}