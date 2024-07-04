import { injectable } from "inversify";
import { IToken } from "../interfaces/IToken";
import jwt from "jsonwebtoken";
import "dotenv/config";

@injectable()
export class Token implements IToken {
    async generateToken(payload: string | object): Promise<string> {
        const token = await jwt.sign(payload, process.env.SECRET_KEY as string, { expiresIn: "1h" });
        return token;
    }
    async verifyToken(token: string): Promise<string | object> {
        const data = await jwt.verify(token, process.env.SECRET_KEY as string);
        return Promise.resolve(data);
    }

}