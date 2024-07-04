import express from 'express';
import "reflect-metadata"

const app = express();

app.use(express.json());

app.listen(3000, async () => {
    console.log('Server is running on port 3000');
});