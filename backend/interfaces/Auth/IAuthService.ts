import { User } from "../../entities/User";

export interface IAuthService {
    login(email: string, password: string): Promise<string>;
    register(name: string, email: string, password: string, phoneNumber: string): Promise<User>;
    logout(token: string): Promise<string>;
}