import express from 'express';
import { Server, Socket } from 'socket.io';
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
    
    // Dynamic Namespace
    io.of(/^\/\w+$/).on('connection', (socket: Socket) => {
        console.log('================================1================================');

        console.log('A socket user connected from:', socket.handshake.url);
        console.log('Namespace:', socket.nsp.name);

        socket.on('disconnect', () => {
            console.log('socket user disconnected');
        });
    });


    // // io.of(/^\/dynamic-\d+$/).on("connection", (socket) => {
    // //     console.log('================================2================================');
    // //     const namespace = socket.nsp;
    // //     console.log(namespace);

    // // });


    // io.of(/^\/\w+$/).on("connection", (socket) => {
    //     console.log('================================3================================');
    //     const namespaceName = socket.nsp.name; // Get the dynamic namespace name
    //     console.log(`A user connected to namespace: ${namespaceName}`);

    //     socket.on("order:list", () => {
    //         console.log(`Received 'order:list' in namespace: ${namespaceName}`);
    //     });

    //     socket.on("order:create", () => {
    //         console.log(`Received 'order:create' in namespace: ${namespaceName}`);
    //     });
    // });


};