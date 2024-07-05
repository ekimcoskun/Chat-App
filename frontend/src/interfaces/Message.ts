import { IUser } from "./User";

export interface IMessage {
    _id: string;
    senderId: IUser;
    receiverId: IUser;
    message: string;
    createdAt: Date;
    updataedAt: Date;
}