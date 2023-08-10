module.exports = {
    HOST: process.env.DB_HOST || 'localhost',
    USER:  process.env.DB_USERNAME || 'root',
    PASSWORD:  process.env.DB_PASSWORD || 'root',
    DB:  process.env.DB_DATABASE || 'node_app',
    dialect: "mysql",
    pool: {
        max: 50,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};