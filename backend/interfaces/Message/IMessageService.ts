export interface IMessageService {
    sendMessage(senderId: string, receiverId: string, message: string): Promise<string>;
}