export interface IMessageRepository {
    sendMessage(senderId: string, receiverId: string, message: string): Promise<string>;
}