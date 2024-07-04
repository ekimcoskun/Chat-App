export interface IAuthService {
    login(email: string, password: string): Promise<string>;
    register(name: string, email: string, password: string, phoneNumber: string): Promise<string>;
    logout(token: string): Promise<string>;
}