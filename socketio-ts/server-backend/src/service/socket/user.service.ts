import { Socket } from 'socket.io';
import { socketuserService } from '../app/socketuser.service';
import { namespaceService as namespaceServiceDB } from '../app/namespace.service';

// db insert
// connection is established so db entry
const onConnectSuccessDBLog = async(params: any) => {
    const app_data = await namespaceServiceDB.getAppByNamespace(params?.namespace);

    const result = await socketuserService.createSocketUser({
        user_id: params?.user_id,
        socket_id: params?.socket_id,
        username: params?.username,
        app_id: params?.app_id,
    });
};

const onConnectFailDBLog = async(params: any) => {
    await socketuserService.updateSocketUser({
        socket_id: params?.socket_id,
        is_active: 0,
        updated_at: new Date().toISOString(),
    });
};

export const userService = {
    onConnectSuccessDBLog,
    onConnectFailDBLog
}