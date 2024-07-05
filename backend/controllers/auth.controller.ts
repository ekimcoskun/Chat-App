import { inject, injectable } from "inversify";
import { IAuthService } from "../interfaces/Auth/IAuthService";
import { INTERFACE_TYPE } from "../utils";
import { Request, Response } from "express";
import { User } from "../entities/User";

@injectable()
export class AuthController {
    private service: IAuthService;

    constructor(@inject(INTERFACE_TYPE.AuthService) service: IAuthService) {
        this.service = service;
    }

    async onLogin(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const data = await this.service.login(email, password);
            if (data.token) {
                return res.status(200).json({ data });
            } else {
                return res.status(401).json({ error: true, message: "Invalid email or password" });
            }
        } catch (error) {
            return res.status(500).json({ error });
        }

    }

    async onRegister(req: Request, res: Response) {
        try {
            const { name, email, password, phoneNumber } = req.body;
            const result = await this.service.register(name, email, password, phoneNumber);
            if (result) {
                return res.status(201).json({ message: "User created successfully", user: result });
            } else {
                return res.status(400).json({ error: true, message: "User already exists" });
            }
        } catch (error) {
            return res.status(500).json({ error });
        }
    }

    async onLogout(req: Request, res: Response) {
        try {
            res.cookie("token", "", { maxAge: 0 });
            return res.status(200).json({ message: "User logged out successfully" });
        } catch (error) {
            return res.status(500).json({ error });
        }
    }
}