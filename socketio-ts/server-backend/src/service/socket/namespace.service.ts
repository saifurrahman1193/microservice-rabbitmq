import { Server, Socket } from 'socket.io';
import { namespaceService as namespaceServiceDB } from '../app/namespace.service';
import { userService } from './user.service';
import { roomService } from './room.service';
roomService

const processNamespace = async (io: Server) => {
    const namespace = io.of(/^\/\w+$/);  // Dynamic Namespace

    namespace.on('connection', async (socket: Socket) => {
        const namespaceName = socket.nsp.name;
        const queryParams = socket.handshake.query;

        // Check if the namespace is registered in MongoDB
        try {
            const namespaceExists = await namespaceServiceDB.checkExistanceValidNamespace(namespaceName, queryParams);

            if (namespaceExists) {
                // console.log(`A user connected to registered namespace: ${namespaceName}`);
                // Handle connections within the registered namespace

                roomService.joinRoom(socket);  // joining to a room
                roomService.joinRooms(socket);  // joining to multiple room

                userService.onConnectSuccessDBLog(socket)
            } else {
                console.log(`Connection attempt to unregistered namespace: ${namespaceName}`);
                // Handle unauthorized connections or take appropriate action
                socket.disconnect();
                userService.onConnectFailDBLog(socket)
            }
        } catch (error) {
            console.error('Error checking namespace in MongoDB:', error);
            // Handle the error as needed
            socket.disconnect();
            userService.onConnectFailDBLog(socket)
        }
    });
};



export const namespaceService = {
    processNamespace,
}