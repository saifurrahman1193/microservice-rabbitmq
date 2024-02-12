import { Socket } from 'socket.io';

// event
const sendMessageProcess = (socket: Socket) => {
    socket.on('single-chat/send-message', (params: any) => {
        console.log(`Received message from ${socket.id}: ${params?.message}`);

        // Send the message to the specified client using targetSocketId
        socket.to(params?.target_socket_id).emit('single-chat/receive-message', params?.message);
    });
};


export const singleChatService = {
    sendMessageProcess,
}