import express from 'express';
import { Container } from 'inversify';
import { INTERFACE_TYPE } from '../utils';
import { IMessageService } from '../interfaces/Message/IMessageService';
import { MessageService } from '../services/MessageService';
import { MessageController } from '../controllers/message.controller';
import { IMessageRepository } from '../interfaces/Message/IMessageRepository';
import { MessageRepository } from '../repositories/message.repository';
import { SocketService } from '../services/SocketService';
import { ISocketService } from '../interfaces/Socket/ISocketService';

const messageRoutes = express.Router();

const container = new Container();

container.bind<IMessageService>(INTERFACE_TYPE.MessageService).to(MessageService);
container.bind<IMessageRepository>(INTERFACE_TYPE.MessageRepository).to(MessageRepository);
container.bind(INTERFACE_TYPE.MessageController).to(MessageController);
container.bind<ISocketService>(INTERFACE_TYPE.SocketService).to(SocketService).inSingletonScope();

const controller = container.get<MessageController>(INTERFACE_TYPE.MessageController);

messageRoutes.post("/send", controller.onSendMessage.bind(controller));
messageRoutes.post("/get", controller.onGetMessages.bind(controller));

export default messageRoutes;