import { IMessage } from "./Message";
import { IUser } from "./User";

export interface IConversation {
    _id: string;
    participants: IUser[];
    messages: IMessage[];
    createdAt: Date;
    updataedAt: Date;
}