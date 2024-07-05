import express from 'express';
import { Container } from 'inversify';
import { INTERFACE_TYPE } from '../utils';
import { IUserRepository } from '../interfaces/User/IUserRepository';
import { UserRepository } from '../repositories/user.repository';
import { UserController } from '../controllers/user.controller';
import { IUserService } from '../interfaces/User/IUserService';
import { UserService } from '../services/UserService';

const userRoutes = express.Router();

const container = new Container();

container.bind<IUserService>(INTERFACE_TYPE.UserService).to(UserService);
container.bind<IUserRepository>(INTERFACE_TYPE.UserRepository).to(UserRepository);
container.bind(INTERFACE_TYPE.UserController).to(UserController)

const controller = container.get<UserController>(INTERFACE_TYPE.UserController);

userRoutes.get("/getAllUsers", controller.onGetAllUsers.bind(controller));

export default userRoutes;