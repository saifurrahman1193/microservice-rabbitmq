import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import cors from "cors";
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import sockets from './socket/sockets.js';
import mongoose from 'mongoose';
import bodyParser from "body-parser";
import routes from "./routes/index.js";


dotenv.config();

mongoose.connect('mongodb://ms-socketio-mongo-db-container:27017/chat_app')  // ms-socketio-mongo-db-container = mongodb container name
.then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB');
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

const http_server = http.createServer(app);
const io = new Server(http_server, {
    cors: {
        origin: [
            'http://localhost:804', // from client side
            'http://localhost:3000' 
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