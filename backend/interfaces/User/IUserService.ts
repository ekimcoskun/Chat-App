import { User } from "../../entities/User";

export interface IUserService {
    getUsersByIds(userIds: string[]): Promise<User[]>;
    getAllUsers(searchText?: string): Promise<User[]>;
}