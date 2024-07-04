import { injectable } from "inversify";
import { IHash } from "../interfaces/IHash";
import bcrypt from 'bcrypt';

@injectable()
export class Hash implements IHash {
    async hashPassword(password: string): Promise<string> {
        const result = await bcrypt.hash(password, 10);
        if (result) {
            return result;
        } else {
            throw new Error("Error hashing password");
        }
    }
    async comparePassword(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }

}