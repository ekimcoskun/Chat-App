import { inject, injectable } from "inversify";
import { IUserService } from "../interfaces/User/IUserService";
import { INTERFACE_TYPE } from "../utils";
import { Request, Response } from "express";

@injectable()
export class UserController {
    private service: IUserService;

    constructor(@inject(INTERFACE_TYPE.UserService) service: IUserService) {
        this.service = service;
    }

    async onGetUsersByIds(req: Request, res: Response) {
        try {
            const { userIds } = req.body;
            await this.service.getUsersByIds(userIds)
                .then((result) => {
                    return res.status(200).json({ users: result });
                })
                .catch((err) => {
                    return res.status(500).json({ err });
                });
        } catch (err) {
            return res.status(500).json({ err });
        }
    }

    async onGetAllUsers(req: Request, res: Response) {
        try {
            await this.service.getAllUsers()
                .then((result) => {
                    return res.status(200).json({ users: result });
                })
                .catch((err) => {
                    return res.status(500).json({ err });
                });
        } catch (err) {
            return res.status(500).json({ err });
        }
    }
}