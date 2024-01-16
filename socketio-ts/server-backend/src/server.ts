import express from 'express';
import http from 'http';
import { config } from './config/index.config';
import userRoutes from './route/user.routes';
import authRoutes from './route/authentication.routes';
import appRoutes from './route/app.routes';
import namespaceRoutes from './route/namespace.routes';
import cors from 'cors';
import multer from 'multer';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import LoggerMiddlware from './middleware/logger.middleware';
import { set_response } from './helper/apiresponser.helper';
import routes from './route/index.routes';

const router = express();


/** Only Start Server if Mongoose Connects */
export const startServer = async () => {
    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());
    router.use(cors({ credentials: true }));
    router.use(compression());
    router.use(cookieParser());
    // for parsing multipart/form-data
    var forms = multer();
    router.use(forms.array(undefined!));

    router.use(LoggerMiddlware); // for logging


    /** Rules of our API */
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return set_response(res, null, 200,  true , ['Request successful'], null)
        }
        next();
    });


    // Use your routes configuration
    router.use(routes);

    http.createServer(router).listen(config.server.port, () => console.log(`Server is running on port ${config.server.port}`));
    // https.createServer(options, router).listen(config.server.https_port, () => console.log(`Server HTTPS is running on port ${config.server.https_port}`))
};