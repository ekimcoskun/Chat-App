
export const INTERFACE_TYPE = {
    AuthService: Symbol.for("IAuthService"),
    AuthController: Symbol.for("IAuthController"),
    UserRepository: Symbol.for("IUserRepository"),
    UserService: Symbol.for("IUserService"),
    UserController: Symbol.for("IUserController"),
    MessageRepository: Symbol.for("IMessageRepository"),
    MessageService: Symbol.for("IMessageService"),
    MessageController: Symbol.for("IMessageController"),
    SocketService: Symbol.for("ISocketService"),
    Token: Symbol.for("IToken"),
    Hash: Symbol.for("IHash")
}