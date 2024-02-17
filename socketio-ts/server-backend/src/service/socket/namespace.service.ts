import { Server, Socket } from 'socket.io';
import { namespaceService as namespaceServiceDB } from '../app/namespace.service';
import { userService } from './user.service';
import { roomService } from './room.service';
import { singleChatService } from './singlechat.service';
import authenticateNamespaceMiddleware from '../../middleware/authenticatenamespace.middleware';

const processNamespace = async (io: Server) => {
    const namespace = io.of(/^\/\w+$/);  // Dynamic Namespace

    namespace.use(authenticateNamespaceMiddleware); // namespace authentication middleware

    namespace.on('connection', async (socket: Socket) => {
        try {
            const namespaceName = socket.nsp.name;
            // Room and chat logic
            roomService.joinRoomProcess(socket);
            roomService.joinRoomsProcess(socket);
            roomService.leaveRoomProcess(socket);
            roomService.sendMessageProcess(socket);
            singleChatService.sendMessageProcess(socket);

            // Log successful connection to the database
            userService.onConnectSuccessDBLog({ socket_id: socket.id, namespace: namespaceName });
        } catch (error: any) {
            console.error('Error during connection:', error?.message);
            // Handle errors during connection logic
        }

        // Disconnect event handling
        socket.on('disconnect', () => {
            console.log(`Socket ${socket.id} disconnected`);
            // Log disconnect event to the database
            userService.onConnectFailDBLog({ socket_id: socket.id });
        });
    });
};

export const namespaceService = {
    processNamespace,
}