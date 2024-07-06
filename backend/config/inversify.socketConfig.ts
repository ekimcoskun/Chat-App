import { Container } from 'inversify';
import { SocketService } from '../services/SocketService';
import { INTERFACE_TYPE } from '../utils';
import { ISocketService } from '../interfaces/Socket/ISocketService';

const container = new Container();
container.bind<ISocketService>(INTERFACE_TYPE.SocketService).to(SocketService).inSingletonScope();

const socketService = container.get<ISocketService>(INTERFACE_TYPE.SocketService);

export { container, socketService };