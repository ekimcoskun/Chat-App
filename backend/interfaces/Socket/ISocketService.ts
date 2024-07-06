import { Application } from 'express';
import { Server } from 'socket.io';
import http from 'http';

export interface ISocketService {
    app: Application;
    server: http.Server;
    io: Server;
    getReceiverSocketId(receiverId: string): string | undefined;
}
