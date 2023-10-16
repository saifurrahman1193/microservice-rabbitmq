import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.get('/', (req: Request, res: Response): void => {
    res.json({ message: 'Hello saifur' })
})

app.listen(process.env.APP_PORT, (): void => {
    console.log('Server is listening on port ' + process.env.APP_PORT);
})