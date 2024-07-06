import express from 'express';
import "reflect-metadata"
import { connect } from './helpers/connectDB';
import Http from './middlewares/Http';
import authRoutes from './routes/auth.routes';
import messageRoutes from './routes/message.routes';
import userRoutes from './routes/user.routes';
import "dotenv/config";
import { app, server } from './socket/socket';

const PORT = process.env.PORT || 3000;

/* const app = socketService.app;
const server = socketService.server; */

Http.mount(app);

app.use(express.json());

app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoutes)
app.use("/api/user", userRoutes)

server.listen(PORT, async () => {
    await connect();
    console.log(`Server running on port ${PORT}`);
});