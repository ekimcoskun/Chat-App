
export const INTERFACE_TYPE = {
    AuthService: Symbol.for("IAuthService"),
    UserRepository: Symbol.for("IUserRepository"),
    AuthController: Symbol.for("IAuthController"),
    MessageRepository: Symbol.for("IMessageRepository"),
    MessageService: Symbol.for("IMessageService"),
    MessageController: Symbol.for("IMessageController"),
    Token: Symbol.for("IToken"),
    Hash: Symbol.for("IHash")
}