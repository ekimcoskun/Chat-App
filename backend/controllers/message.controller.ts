import { injectable, inject } from "inversify";
import { IMessageService } from "../interfaces/Message/IMessageService";
import { INTERFACE_TYPE } from "../utils";
import { Request, Response } from "express";


@injectable()
export class MessageController {

    private service: IMessageService;

    constructor(@inject(INTERFACE_TYPE.MessageService) service: IMessageService) {
        this.service = service;
    }

    onSendMessage(req: Request, res: Response) {
        try {
            const { senderId, receiverId, message } = req.body;
            this.service.sendMessage(senderId, receiverId, message)
                .then((result) => {
                    return res.status(201).json({ message: "Message sent successfully" });
                })
                .catch((err) => {
                    return res.status(500).json({ err });
                });
        } catch (err) {
            return res.status(500).json({ err });
        }
    }

    onGetMessages(req: Request, res: Response) {
        try {
            const { senderId, receiverId } = req.body;
            this.service.getMessages(senderId, receiverId)
                .then((result) => {
                    return res.status(200).json({ messages: result });
                })
                .catch((err) => {
                    return res.status(500).json({ err });
                });
        } catch (err) {
            return res.status(500).json({ err });
        }
    }
}