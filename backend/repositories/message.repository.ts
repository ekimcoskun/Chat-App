import { injectable } from "inversify";
import { IMessageRepository } from "../interfaces/Message/IMessageRepository";

@injectable()
export class MessageRepository implements IMessageRepository {

    sendMessage(senderId: string, receiverId: string, message: string): Promise<string> {
        throw new Error("Method not implemented.");
    }

}