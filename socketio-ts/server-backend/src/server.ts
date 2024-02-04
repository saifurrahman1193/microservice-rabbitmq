import express from 'express';
import http from 'http';
import { config } from './config/index.config';
import cors from 'cors';
import multer from 'multer';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import LoggerMiddlware from './middleware/logger.middleware';
import { set_response } from './helper/apiresponser.helper';
import routes from './route/index.routes';
import { Server, Socket } from 'socket.io';
const app = express();


/** Only Start Server if Mongoose Connects */
export const startServer = async () => {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cors({ origin: "*", credentials: true }));
    app.use(compression());
    app.use(cookieParser());
    // for parsing multipart/form-data
    var forms = multer();
    app.use(forms.array(undefined!));

    app.use(LoggerMiddlware); // for logging


    /** Rules of our API */
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return set_response(res, null, 200, true, ['Request successful'], null)
        }
        next();
    });


    // Use your routes configuration
    app.use(routes);

    const app_server = http.createServer(app).listen(config.server.port, () => console.log(`Server is running on port ${config.server.port}`));
    // https.createServer(options, app).listen(config.server.https_port, () => console.log(`Server HTTPS is running on port ${config.server.https_port}`))


    // Socket.io server configuration
    const io = new Server(app_server, {
        cors: {
            origin: "*", // Replace with your frontend URL
            methods: ["GET", "POST"],
            allowedHeaders: [],
            credentials: true,
        },
    });

    io.on('connection', (socket: Socket) => {
        console.log('a socket user connected');

        socket.on('disconnect', () => {
            console.log('socket user disconnected');
        });
    });

};