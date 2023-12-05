import dotenv from 'dotenv';
dotenv.config();

const MONGO_URL = process.env.MONGO_URL ? process.env.MONGO_URL : `mongodb://local-central-mongo-db-container:27017/socket_server`;

const APP_PORT = process.env.APP_PORT ? Number(process.env.APP_PORT) : 5000;
const APP_HTTPS_PORT = process.env.APP_HTTPS_PORT ? Number(process.env.APP_HTTPS_PORT) : 443;

export const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: APP_PORT,
        https_port: APP_HTTPS_PORT,
    }
};