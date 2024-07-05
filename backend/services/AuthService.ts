import { inject, injectable } from "inversify";
import { User } from "../entities/User";
import { IAuthService } from "../interfaces/Auth/IAuthService";
import { IUserRepository } from "../interfaces/User/IUserRepository";
import { INTERFACE_TYPE } from "../utils";
import { IToken } from "../interfaces/IToken";
import { IHash } from "../interfaces/IHash";

@injectable()
export class AuthService implements IAuthService {

    private repository: IUserRepository;
    private token: IToken;
    private hash: IHash;

    constructor(@inject(INTERFACE_TYPE.UserRepository) repository: IUserRepository,
        @inject(INTERFACE_TYPE.Token) token: IToken,
        @inject(INTERFACE_TYPE.Hash) hash: IHash) {
        this.repository = repository;
        this.token = token;
        this.hash = hash;
    }
    logout(token: string): Promise<string> {
        throw new Error("Method not implemented.");
    }

    async login(email: string, password: string): Promise<string> {
        const user = await this.repository.login(email);
        if (user) {
            const isPasswordMatch = await this.hash.comparePassword(password, user.password);
            if (isPasswordMatch) {
                const token = await this.token.generateToken(user);
                return token;
            } else {
                throw new Error("Invalid email or password");
            }
        } else {
            throw new Error("User not found");
        }
    }
    async register(name: string, email: string, password: string, phoneNumber: string): Promise<User> {
        const hashedPassword = await this.hash.hashPassword(password);
        const user = await this.repository.register(name, email, hashedPassword, phoneNumber);
        if (user) {
            return user;
        } else {
            throw new Error("User not registered");
        }
    }

}