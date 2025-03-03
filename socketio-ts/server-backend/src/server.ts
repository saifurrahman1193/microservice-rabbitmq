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
import { setupSocketServer } from './service/socket';
import { appService as appServiceDB } from './service/app/app.service';
import path from 'path';
const app = express();


/** Only Start Server if Mongoose Connects */
export const startServer = async () => {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(express.static(path.join(__dirname, 'public')));
    const allowed_websites = await appServiceDB.getAllAllowedSites();
    app.use(cors({
        origin: [...allowed_websites || '*'], // Replace with your frontend URL "https://admin.socket.io"
    }));
    

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

    const express_server = http.createServer(app)

    setupSocketServer(express_server, {'allowed_websites':allowed_websites});  // socket server setup

    express_server.listen(config.app.port, () => console.log(`Server is running on port ${config.app.port}`));
    // https.createServer(options, app).listen(config.app.https_port, () => console.log(`Server HTTPS is running on port ${config.app.https_port}`))
};