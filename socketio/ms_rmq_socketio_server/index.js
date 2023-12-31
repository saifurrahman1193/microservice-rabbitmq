import express from 'express';
import multer from 'multer';
import dotenv from 'dotenv';
import http from 'http';
import cors from "cors";
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import sockets from './socket/sockets.js';
import bodyParser from "body-parser";
import routes from "./routes/index.js";
import  * as mongodb from './config/mongodb.js';

dotenv.config();

mongodb.connect();  // connect to MongoDB

const app = express();
app.use(cors());
app.use(bodyParser.json());

// for parsing multipart/form-data
const forms = multer();
app.use(forms.array()); 

const http_server = http.createServer(app);
const io = new Server(http_server, {
    cors: {
        origin: [
            'http://localhost:804', // from client side
            'http://localhost:3000', 
            'ws://localhost:804', 
            'ws://localhost:804/ws', 
            'ws://localhost:3000', 
            'ws://localhost:3000/ws', 
        ]
    }
});

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.use("/", routes);  // all routes 


io.on('connection', sockets);  // Socket connection


http_server.listen(process.env.APP_PORT, () => {
    console.log('HTTP Server is listening on port ' + process.env.APP_PORT);
})