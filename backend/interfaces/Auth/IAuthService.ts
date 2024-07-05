import { User } from "../../entities/User";

export interface IAuthService {
    login(email: string, password: string): Promise<{ user: User, token: string }>;
    register(name: string, email: string, password: string, phoneNumber: string): Promise<User>;
    logout(token: string): Promise<string>;
}