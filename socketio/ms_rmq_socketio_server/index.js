import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import {Server} from 'socket.io';
import path from 'path';
import {fileURLToPath} from 'url';

const app = express();
dotenv.config();

const http_server = http.createServer(app);
const io = new Server(http_server);

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.get('/', (req, res) => { 
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('connection is ready');
});


http_server.listen(process.env.APP_PORT, () => {
    console.log('listening on port ' + process.env.APP_PORT);
})