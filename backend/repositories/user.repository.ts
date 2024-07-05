import { injectable } from "inversify";
import { User } from "../entities/User";
import { IUserRepository } from "../interfaces/User/IUserRepository";
import UserModel from "../models/User";

@injectable()
export class UserRepository implements IUserRepository {
    async login(email: string): Promise<User> {
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            throw new Error("User not found");
        } else {
            return user;
        }
    }
    async register(name: string, email: string, password: string, phoneNumber: string): Promise<User> {
        const user = new UserModel({ name, email, password, phoneNumber });
        const result = await user.save();
        if (!result) {
            throw new Error("User not created");
        }
        return user;
    }
    async getAllUsers(searchText: string): Promise<User[]> {
        console.log(searchText)
        if (searchText) {
            const users = await UserModel.find({ name: { $regex: searchText, $options: "i" } });
            console.log(users)
            if (!users) {
                return [];
            } else {
                return users;
            }
        } else {
            const users = await UserModel.find();
            if (!users) {
                return [];
            } else {
                return users;
            }
        }
    }
    async deleteUser(id: string): Promise<string> {
        const result = await UserModel.deleteOne({ id });
        if (result.deletedCount === 0) {
            throw new Error("User not deleted");
        }
        return "User deleted";
    }
    async updateUser(id: string, user: User): Promise<string> {
        const result = await UserModel.findByIdAndUpdate(id, user);
        if (!result) {
            throw new Error("User not updated");
        } else {
            return "User updated";
        }
    }
    async getUsersByIds(ids: string[]): Promise<User[]> {
        const users = await UserModel.find({ id: { $in: ids } });
        if (!users) {
            return [];
        } else {
            return users;
        }
    }
}