import { Message } from "../../entities/Message";
import { User } from "../../entities/User";

export interface IMessageService {
    sendMessage(user: User, receiverId: string, message: string): Promise<Message>;
    getMessages(senderId: string, chatId: string): Promise<Message[]>;
}