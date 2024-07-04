import { User } from "../../entities/User";

export interface IUserRepository {
    login(email: string): Promise<User>;
    register(name: string, email: string, password: string, phoneNumber: string): Promise<string>;
    getAllUsers(): Promise<User[]>;
    deleteUser(id: string): Promise<string>;
    updateUser(id: string, user: User): Promise<string>;
}