import express from 'express';
import { Server, Socket } from 'socket.io';
import { namespaceService } from './namespace.service';
const app = express();


/** Only Socket Server if Mongoose Connects */
export const setupSocketServer = async (app_server: any) => {

    // Socket.io server configuration
    const io = new Server(app_server, {
        cors: {
            origin: ["*"], // Replace with your frontend URL
            // methods: ["GET", "POST"],
            // allowedHeaders: [],
            // credentials: true,
        },
    });

    namespaceService.processNamespace(io);
};