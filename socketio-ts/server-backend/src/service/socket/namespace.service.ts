import { Server, Socket } from 'socket.io';
import { namespaceService as namespaceServiceDB } from '../app/namespace.service';
import { socketuserService } from '../app/socketuser.service';
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

                const result = await socketuserService.createSocketUser({
                    user_id: queryParams?.user_id,
                    socket_id: socket.id,
                    username: queryParams?.username,
                    app_id: await namespaceServiceDB.getAppIdByNamespace(namespaceName),

                    // created_by,
                    created_at: new Date().toISOString(),
                });

                console.log(result);
                
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