import { Socket } from 'socket.io';

// event
const singleChat = (socket: Socket) => {
    socket.on('singleChat', (userId: string, data: any) => {
        socket.to(userId).emit("singleChat", data);
    });
};

export const roomService = {
    singleChat,
}