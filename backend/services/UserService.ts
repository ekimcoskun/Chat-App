import { inject, injectable } from "inversify";
import { User } from "../entities/User";
import { IUserService } from "../interfaces/User/IUserService";
import { IUserRepository } from "../interfaces/User/IUserRepository";
import { INTERFACE_TYPE } from "../utils";

@injectable()
export class UserService implements IUserService {
    private repository: IUserRepository;

    constructor(@inject(INTERFACE_TYPE.UserRepository) repository: IUserRepository) {
        this.repository = repository;
    }

    getUsersByIds(userIds: string[]): Promise<User[]> {
        throw new Error("Method not implemented.");
    }

}