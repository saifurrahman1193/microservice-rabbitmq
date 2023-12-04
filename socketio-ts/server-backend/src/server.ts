import express from 'express';
import http from 'http';
import { config } from './config/index';
import userRoutes from './route/user';
import authRoutes from './route/authentication';
import * as mongodb from './config/mongodb';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';
import cookieParser from 'cookie-parser';
import compression from 'compression';

const router = express();


/** Only Start Server if Mongoose Connects */
export const startServer = async () => {

    await mongodb.connect();

    router.use(cors({ credentials: true }));
    router.use(compression());
    router.use(cookieParser());
    router.use(bodyParser.json());
    // for parsing multipart/form-data
    var forms = multer();
    router.use(forms.array(undefined!));


    /** Log the request */
    router.use((req, res, next) => {
        /** Log the req */
        console.log(`Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            /** Log the res */
            console.log(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
        });

        next();
    });


    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());

    /** Rules of our API */
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }

        next();
    });

    /** Routes */
    router.use('/api/user', userRoutes);
    router.use('/api/auth', authRoutes);

    /** Healthcheck */
    router.get('/ping', (req, res, next) => res.status(200).json({ hello: 'Hello world. This is a test!' }));

    /** Error handling */
    router.use((req, res, next) => {
        const error = new Error('Not found');

        console.log(error);

        res.status(404).json({
            message: error.message
        });
    });

    http.createServer(router).listen(config.server.port, () => console.log(`Server is running on port ${config.server.port}`));
};