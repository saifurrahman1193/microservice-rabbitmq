import { Socket } from 'socket.io';

// event
const sendMessageProcess = (socket: Socket) => {
    socket.on('single-chat/send-message', (params: { message: string, target_socket_id: string }, acknowledgment: (result: any) => void) => {
        // Log the received message
        console.log(`Received message from ${socket.id}: ${params?.message}`);
        
        if (acknowledgment) {
            acknowledgment({ message: `message received` });
        }
    });
};

export const singleChatService = {
    sendMessageProcess,
}