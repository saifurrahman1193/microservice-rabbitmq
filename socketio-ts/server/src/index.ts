import express, { Request, Response } from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import compression from 'compression';
import cors from 'cors';


dotenv.config();

const app = express();
app.use(cors({
    credentials: true
}));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
const server = http.createServer(app);

app.get('/', (req: Request, res: Response): void => {
    res.json({ message: 'Hello saifur' })
})

app.listen(process.env.APP_PORT, (): void => {
    console.log('Server is listening on port ' + process.env.APP_PORT);
})