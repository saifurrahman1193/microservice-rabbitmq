import dotenv from 'dotenv';
import { jwtConfig } from './jwt.config';
import { appConfig } from './app.config';
import { mongodbConfig } from './mongodb.config';
dotenv.config();

export const config = {
    app: { ...appConfig },
    jwt: { ...jwtConfig },
    mongo: { ...mongodbConfig },
};