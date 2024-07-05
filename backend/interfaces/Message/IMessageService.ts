import { User } from "../../entities/User";

export interface IMessageService {
    sendMessage(user: User, receiverId: string, message: string): Promise<string>;
    getMessages(senderId: string, receiverId: string): Promise<string[]>;
}