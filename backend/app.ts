import express from 'express';
import "reflect-metadata"
import { connect } from './helpers/connectDB';
import Http from './middlewares/Http';
import authRoutes from './routes/auth.routes';
import messageRoutes from './routes/message.routes';

const app = express();

Http.mount(app);

app.use(express.json());

app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoutes)

app.listen(3000, async () => {
    await connect();
    console.log('Server is running on port 3000');
});