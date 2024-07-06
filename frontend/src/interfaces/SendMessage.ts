import { IMessage } from "./Message";
import { IUser } from "./User";

export interface ISendMessageReqBody {
    message: string;
    receiverId: string;
    user: IUser;
}

export interface ISendMessageResBody {
    message: string;
    data: IMessage;
}