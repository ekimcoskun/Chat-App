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

    async onSendMessage(req: Request, res: Response) {
        try {
            const { user, receiverId, message } = req.body;
            console.log("geldi")
            const result = await this.service.sendMessage(user, receiverId, message)
            if (result) {
                return res.status(201).json({ message: "Message sent successfully" });
            } else {
                return res.status(400).json({ error: true, message: "Message could not be sent" });
            }
        } catch (err) {
            console.log(err)
            return res.status(500).json({ err });
        }
    }

    async onGetMessages(req: Request, res: Response) {
        try {
            const { senderId, receiverId } = req.body;
            await this.service.getMessages(senderId, receiverId)
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