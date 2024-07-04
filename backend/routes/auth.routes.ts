import express from 'express';
import { Container } from 'inversify';
import { IAuthService } from '../interfaces/Auth/IAuthService';
import { INTERFACE_TYPE } from '../utils';
import { AuthService } from '../services/AuthService';
import { IUserRepository } from '../interfaces/User/IUserRepository';
import { UserRepository } from '../repositories/user.repository';
import { AuthController } from '../controllers/auth.controller';
import { Token } from '../libs/token';
import { Hash } from '../libs/hash';

const authRoutes = express.Router();

const container = new Container();

container.bind<IAuthService>(INTERFACE_TYPE.AuthService).to(AuthService);
container.bind<IUserRepository>(INTERFACE_TYPE.UserRepository).to(UserRepository);
container.bind(INTERFACE_TYPE.AuthController).to(AuthController)
container.bind(INTERFACE_TYPE.Token).to(Token);
container.bind(INTERFACE_TYPE.Hash).to(Hash);

const controller = container.get<AuthController>(INTERFACE_TYPE.AuthController);

authRoutes.post("/login", controller.onLogin.bind(controller));
authRoutes.post("/register", controller.onRegister.bind(controller));
authRoutes.get("/logout", controller.onLogout.bind(controller));

export default authRoutes;