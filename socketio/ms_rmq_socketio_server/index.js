import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import sockets from './socket/sockets.js';

const app = express();
dotenv.config();

const http_server = http.createServer(app);
const io = new Server(http_server, {
    cors: {
        origin: 'http://localhost:804' // from client side
    }
});

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', sockets);


http_server.listen(process.env.APP_PORT, () => {
    console.log('listening on port ' + process.env.APP_PORT);
})