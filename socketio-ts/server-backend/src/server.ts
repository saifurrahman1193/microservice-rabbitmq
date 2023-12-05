import express from 'express';
import http from 'http';
import https from 'https';
import { config } from './config/index';
import userRoutes from './route/user';
import authRoutes from './route/authentication';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import LoggerMiddlware from './middleware/Logger';
import { set_response } from './helper/APIResponser';




const router = express();


/** Only Start Server if Mongoose Connects */
export const startServer = async () => {
    router.use(cors({ credentials: true }));
    router.use(compression());
    router.use(cookieParser());
    router.use(bodyParser.json());
    // for parsing multipart/form-data
    var forms = multer();
    router.use(forms.array(undefined!));

    router.use(LoggerMiddlware); // for logging

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
    router.get('/ping', (req, res, next) => 
        set_response(res, null, 200, 'success', ['Request successful'], null)
    );

    

    /** Error handling */
    router.use((req, res, next) => {
        const error = new Error('Not found');
        console.log(error);
        set_response(res, null, 200, 'success', [error.message], null);
    });

    http.createServer(router).listen(config.server.port, () => console.log(`Server is running on port ${config.server.port}`));
    https.createServer(router).listen(config.server.https_port, () => console.log(`Server HTTPS is running on port ${config.server.https_port}`))
};