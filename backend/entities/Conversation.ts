import { Types } from "mongoose";

export class Conversation {
    constructor(
        public readonly _id: string,
        public readonly participants: Types.ObjectId[],
        public readonly messages: Types.ObjectId[],
        public readonly createdAt: Date,
    ) {

    }
}