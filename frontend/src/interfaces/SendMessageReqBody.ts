import { IUser } from "./User";

export interface ISendMessageReqBody {
    message: string;
    receiverId: string;
    user: IUser;
}