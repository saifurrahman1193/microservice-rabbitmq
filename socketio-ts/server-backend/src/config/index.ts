import dotenv from 'dotenv';
dotenv.config();

const MONGO_URL = process.env.MONGO_URL ? process.env.MONGO_URL : `mongodb://local-central-mongo-db-container:27017/socket_server`;

const APP_PORT = process.env.APP_PORT ? Number(process.env.APP_PORT) : 5000;

export const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: APP_PORT
    }
};