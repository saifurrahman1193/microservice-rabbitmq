import { Server, Socket } from 'socket.io';
import { namespaceService as namespaceServiceDB } from '../service/app/namespace.service';

export default  async (socket: Socket, next: (err?: Error) => void) => {
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
};
