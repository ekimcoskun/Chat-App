import { IUser } from "./User";

export interface IGetMessageReqBody {
    senderId: string;
    chatId: string;
}