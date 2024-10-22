import { injectable } from "inversify";
import { IMessageRepository } from "../interfaces/Message/IMessageRepository";
import { User } from "../entities/User";
import Conversation from "../models/Conversation";
import Message from "../models/Message";
import { Message as MessageEntity } from "../entities/Message";

@injectable()
export class MessageRepository implements IMessageRepository {
    async getMessages(senderId: string, chatId: string): Promise<MessageEntity[]> {
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, chatId] },
        }).populate("messages");
        if (!conversation) {
            return [];
        }

        return conversation.messages;
    }

    async sendMessage(user: User, receiverId: string, message: string): Promise<MessageEntity> {
        const senderId = user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });
        if (newMessage) {
            conversation.messages.push(newMessage.id);
        }

        await conversation.save();
        await newMessage.save();

        // this will run in parallel
        await Promise.all([conversation.save(), newMessage.save()]);

        return newMessage;
    }

}