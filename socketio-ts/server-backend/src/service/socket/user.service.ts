import { Socket } from 'socket.io';
import { socketuserService } from '../app/socketuser.service';
import { namespaceService as namespaceServiceDB } from '../app/namespace.service';

// db insert
// connection is established so db entry
const onConnectSuccessDBLog = async(socket: Socket) => {

    const namespaceName = socket.nsp.name;
    const queryParams = socket.handshake.query;

    const app_data = await namespaceServiceDB.getAppByNamespace(namespaceName);

    const result = await socketuserService.createSocketUser({
        user_id: queryParams?.user_id,
        socket_id: socket.id,
        username: queryParams?.username,
        app_id: app_data?.app_id,
    });
};

const onConnectFailDBLog = async(socket: Socket) => {

    const namespaceName = socket.nsp.name;
    const queryParams = socket.handshake.query;

    const app_data = await namespaceServiceDB.getAppByNamespace(namespaceName);

    const result = await socketuserService.updateSocketUser({
        user_id: queryParams?.user_id,
        socket_id: socket.id,
        username: queryParams?.username,
        app_id: app_data?.app_id,
    });
};

export const userService = {
    onConnectSuccessDBLog,
    onConnectFailDBLog
}