import { Server } from 'socket.io';
import { namespaceService } from './namespace.service';

/** Only Socket Server if Mongoose Connects */
export const setupSocketServer = async (express_server: any) => {

    // Socket.io server configuration
    const io = new Server(express_server, {
        cors: {
            origin: ["*"], // Replace with your frontend URL "https://admin.socket.io"
            // methods: ["GET", "POST"],
            // allowedHeaders: [],
            // credentials: true,
        },
    });

    namespaceService.processNamespace(io);
};