import { inject, injectable } from "inversify";
import { IMessageService } from "../interfaces/Message/IMessageService";
import { IMessageRepository } from "../interfaces/Message/IMessageRepository";
import { INTERFACE_TYPE } from "../utils";
import { User } from "../entities/User";
import { Message } from "../entities/Message";
import { ISocketService } from "../interfaces/Socket/ISocketService";

@injectable()
export class MessageService implements IMessageService {

    private repository: IMessageRepository;
    private socketService: ISocketService;

    constructor(@inject(INTERFACE_TYPE.MessageRepository) repository: IMessageRepository,
        @inject(INTERFACE_TYPE.SocketService) socketService: ISocketService) {
        this.repository = repository;
        this.socketService = socketService;
    }
    async getMessages(senderId: string, chatId: string): Promise<Message[]> {
        const result = await this.repository.getMessages(senderId, chatId);
        return result;
    }

    async sendMessage(user: User, receiverId: string, message: string): Promise<Message> {
        const newMessage = await this.repository.sendMessage(user, receiverId, message);
        if (!newMessage) throw new Error("Message could not be sent");
        const receiverSocketId = this.socketService.getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            this.socketService.io.to(receiverSocketId).emit("newMessage", newMessage);
        }
        return newMessage;
    }
}