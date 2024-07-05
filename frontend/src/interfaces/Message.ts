import { IUser } from "./User";

export interface IMessage {
    _id: string;
    senderId: IUser | string;
    receiverId: IUser | string;
    message: string;
    createdAt: Date;
    updataedAt: Date;
}