import dotenv from 'dotenv';
import jwtConfig from './jwt.config';
import appConfig from './app.config';
dotenv.config();

const MONGO_URL = process.env.MONGO_URL ? process.env.MONGO_URL : `mongodb://local-central-mongo-db-container:27017/socket_server`;

export const config = {
    app: { ...appConfig },
    jwt: { ...jwtConfig },
    mongo: {
        url: MONGO_URL
    },
};