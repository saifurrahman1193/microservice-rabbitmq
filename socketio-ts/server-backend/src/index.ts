import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import compression from 'compression';
import cors from 'cors';
import  * as mongodb from './config/mongodb';
import  router from './route';


dotenv.config();

mongodb.connect();  // connect to MongoDB

const app = express();
app.use(cors({
    credentials: true
}));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(router)
const server = http.createServer(app);



app.listen(process.env.APP_PORT, (): void => {
    console.log('Server is listening on port ' + process.env.APP_PORT);
})