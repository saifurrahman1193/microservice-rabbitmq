import { Socket } from 'socket.io';
import { socketuserService } from '../app/socketuser.service';
import { namespaceService as namespaceServiceDB } from '../app/namespace.service';
import mongoose from 'mongoose';

// Database insert on successful connection
const onConnectSuccessDBLog = async (params: {
    user_id?: string;
    socket_id: string;
    username?: string;
    namespace: string;
}): Promise<void> => {
    try {
        const namespace_data = await namespaceServiceDB.getNamespaceByNamespacePath(params?.namespace);

        // Insert user into the database
        const result = await socketuserService.createSocketUser({
            user_id: params?.user_id,
            socket_id: params?.socket_id,
            username: params?.username,
            app_id: namespace_data?.app_id,
            namespace_id: namespace_data?._id,
        });
    } catch (error: any) {
        // Handle any errors that occurred during database insertion
        console.error(`Error during onConnectSuccessDBLog: ${error.message}`);
    }
};

// Database update on failed connection
const onConnectFailDBLog = async (params: { socket_id: string }): Promise<void> => {
    try {
        // Update user in the database with is_active set to 0
        await socketuserService.updateSocketUser({
            socket_id: new mongoose.Types.ObjectId(params?.socket_id) ,
            is_active: 0,
            updated_at: new Date().toISOString(),
        });
    } catch (error: any) {
        // Handle any errors that occurred during database update
        console.error(`Error during onConnectFailDBLog: ${error.message}`);
    }
};

export const userService = {
    onConnectSuccessDBLog,
    onConnectFailDBLog,
};
