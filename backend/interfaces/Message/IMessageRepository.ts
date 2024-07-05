import { User } from "../../entities/User";

export interface IMessageRepository {
    sendMessage(user: User, receiverId: string, message: string): Promise<string>;
    getMessages(senderId: string, receiverId: string): Promise<string[]>;
}