import { IUser } from "./User";

export interface ISendMessageBody {
    message: string;
    receiverId: string;
    user: IUser;
}