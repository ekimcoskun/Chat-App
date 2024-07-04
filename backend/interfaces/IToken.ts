export interface IToken {
    generateToken(payload: string | object): Promise<string>;
    verifyToken(token: string): string | Promise<string | object>;
}