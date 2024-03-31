import dotenv from 'dotenv';
dotenv.config();

const APP_ENV = process.env.APP_ENV || '';
const APP_PORT = Number(process.env.APP_PORT || 3000);
const APP_HTTPS_PORT = Number(process.env.APP_HTTPS_PORT || 443);
const APP_BASE_URL = process.env.APP_BASE_URL || '';


export const appConfig =   {
    env: APP_ENV,
    port: APP_PORT,
    https_port: APP_HTTPS_PORT,
    base_url: APP_BASE_URL,
};


