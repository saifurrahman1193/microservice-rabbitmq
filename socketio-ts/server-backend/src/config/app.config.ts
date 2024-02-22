const APP_ENV = process.env.APP_ENV || '';
const APP_PORT = Number(process.env.APP_PORT || 3000);
const APP_HTTPS_PORT = Number(process.env.APP_HTTPS_PORT || 443);
const BASE_URL = process.env.BASE_URL || ''


export default  {
    env: APP_ENV,
    port: APP_PORT,
    https_port: APP_HTTPS_PORT,
    base_url: BASE_URL,
};


