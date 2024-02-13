import { Server, Socket } from 'socket.io';
import { namespaceService as namespaceServiceDB } from '../app/namespace.service';
import { userService } from './user.service';
import { roomService } from './room.service';
import { singleChatService } from './singlechat.service';

const processNamespace = async (io: Server) => {
    const namespace = io.of(/^\/\w+$/);  // Dynamic Namespace
    let namespaceName = '';

    namespace.use(async (socket, next) => {
        try {
            const { app_id, app_password } = socket.handshake.auth;
            const namespaceName = socket.nsp.name;

            const namespaceExists = await namespaceServiceDB.checkExistanceValidNamespace(namespaceName, app_id, app_password);

            if (namespaceExists) {
                return next(); // Authentication successful, allow the connection
            } else {
                throw new Error(`Connection attempt to unregistered namespace: ${namespaceName}`);
            }
        } catch (error: any) {
            console.error('Namespace authentication error:', error?.message);
            return next(new Error('Authentication failed')); // Prevent connection if authentication fails
        }
    });

    namespace.on('connection', async (socket: Socket) => {
        try {
            // Room and chat logic
            roomService.joinRoomProcess(socket);
            roomService.joinRoomsProcess(socket);
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