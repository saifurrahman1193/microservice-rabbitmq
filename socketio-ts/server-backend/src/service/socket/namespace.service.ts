import { Server, Socket } from 'socket.io';
import { namespaceService as namespaceServiceDB } from '../app/namespace.service';
import { userService } from './user.service';
import { roomService } from './room.service';
import { singleChatService } from './singlechat.service';

const processNamespace = async (io: Server) => {
    const namespace = io.of(/^\/\w+$/);  // Dynamic Namespace

    namespace.on('connection', async (socket: Socket) => {
        const namespaceName = socket.nsp.name;
        const queryParams = socket.handshake.query;

        try {
            const namespaceExists = await namespaceServiceDB.checkExistanceValidNamespace(namespaceName, queryParams); // Check if the namespace is registered in MongoDB

            if (namespaceExists) {
                roomService.joinRoomProcess(socket);  // joining to a room
                roomService.joinRoomsProcess(socket);  // joining to multiple room
                singleChatService.sendMessageProcess(socket)
                userService.onConnectSuccessDBLog({socket_id:socket.id, namespace: namespaceName })
            } else {
                console.log(`Connection attempt to unregistered namespace: ${namespaceName}`);
                socket.disconnect();
            }
        } catch (error) {
            console.error('Error checking namespace in MongoDB:', error);
            socket.disconnect();
        }

        // Listen for the 'disconnect' event
        socket.on('disconnect', () => {
            console.log(`Socket ${socket.id} disconnected`);
            userService.onConnectFailDBLog({socket_id: socket.id})
        });
    });
    
};

export const namespaceService = {
    processNamespace,
}