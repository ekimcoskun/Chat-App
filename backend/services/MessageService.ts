import { inject, injectable } from "inversify";
import { IMessageService } from "../interfaces/Message/IMessageService";
import { IMessageRepository } from "../interfaces/Message/IMessageRepository";
import { INTERFACE_TYPE } from "../utils";
import { User } from "../entities/User";

@injectable()
export class MessageService implements IMessageService {

    private repository: IMessageRepository;

    constructor(@inject(INTERFACE_TYPE.MessageRepository) repository: IMessageRepository) {
        this.repository = repository;
    }
    async getMessages(senderId: string, receiverId: string): Promise<string[]> {
        throw new Error("Method not implemented.");
    }

    async sendMessage(user: User, receiverId: string, message: string): Promise<string> {
        const msg = this.repository.sendMessage(user, receiverId, message);
        return msg;
    }
}