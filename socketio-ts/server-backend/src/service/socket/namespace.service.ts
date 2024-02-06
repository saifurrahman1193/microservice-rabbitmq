import { Server, Socket } from 'socket.io';
import { namespaceService as namespaceServiceDB } from '../app/namespace.service';
import { roomService } from './room.service';
roomService

const processNamespace = async (io: Server) => {
    const namespace = io.of(/^\/\w+$/);  // Dynamic Namespace

    namespace.on('connection', async (socket: Socket) => {
        const namespaceName = socket.nsp.name;

        // Check if the namespace is registered in MongoDB
        try {
            const namespaceExists = await namespaceServiceDB.checkExistanceNamespaceByPath(namespaceName);

            if (namespaceExists) {
                console.log(`A user connected to registered namespace: ${namespaceName}`);
                // Handle connections within the registered namespace

                roomService.joinRoom(socket);  // joining to a room

            } else {
                console.log(`Connection attempt to unregistered namespace: ${namespaceName}`);
                // Handle unauthorized connections or take appropriate action
                socket.disconnect();
            }
        } catch (error) {
            console.error('Error checking namespace in MongoDB:', error);
            // Handle the error as needed
            socket.disconnect();
        }
    });

};

export const namespaceService = {
    processNamespace,
}