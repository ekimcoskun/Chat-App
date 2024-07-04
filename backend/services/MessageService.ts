import { inject, injectable } from "inversify";
import { IMessageService } from "../interfaces/Message/IMessageService";
import { IMessageRepository } from "../interfaces/Message/IMessageRepository";
import { INTERFACE_TYPE } from "../utils";

@injectable()
export class MessageService implements IMessageService {

    private repository: IMessageRepository;

    constructor(@inject(INTERFACE_TYPE.MessageRepository) repository: IMessageRepository) {
        this.repository = repository;
    }

    sendMessage(senderId: string, receiverId: string, message: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
}