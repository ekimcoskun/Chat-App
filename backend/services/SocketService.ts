import express, { Application } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import "dotenv/config";
import { inject, injectable } from 'inversify';
import { ISocketService } from '../interfaces/Socket/ISocketService';

interface IUserSocketMap {
    [key: string]: string;
}

@injectable()
export class SocketService implements ISocketService {
    public app: Application;
    public server: http.Server;
    public io: Server;
    private userSocketMap: IUserSocketMap = {};

    constructor() {
        this.app = express();
        this.server = http.createServer(this.app);
        this.io = new Server(this.server, {
            cors: {
                origin: [process.env.FE_URL || "http://localhost:5000"],
                methods: ["GET", "POST"],
            },
        });

        this.io.on("connection", this.onConnection.bind(this));
    }

    private onConnection(socket: any): void {
        console.log("a user connected", socket.id);
        const userId = socket.handshake.query.userId as string;
        if (userId) {
            this.userSocketMap[userId] = socket.id;
        }

        this.io.emit("getOnlineUsers", Object.keys(this.userSocketMap));

        socket.on("disconnect", () => {
            this.onDisconnect(socket, userId);
        });
    }

    private onDisconnect(socket: any, userId: string): void {
        console.log("user disconnected", socket.id);
        delete this.userSocketMap[userId];
        this.io.emit("getOnlineUsers", Object.keys(this.userSocketMap));
    }

    public getReceiverSocketId(receiverId: string): string | undefined {
        return this.userSocketMap[receiverId];
    }
}
