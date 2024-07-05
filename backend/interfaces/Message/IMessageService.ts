export interface IMessageService {
    sendMessage(senderId: string, receiverId: string, message: string): Promise<string>;
    getMessages(senderId: string, receiverId: string): Promise<string[]>;
}