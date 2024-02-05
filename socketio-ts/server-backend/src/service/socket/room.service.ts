import { Server, Socket } from 'socket.io';

const joinRoom = (socket: Socket) => {
        // Event listener for the 'joinRoom' event
        socket.on('joinRoom', (roomName) => {
            // Join the specified room
            socket.join(roomName);
            console.log(`User ${socket.id} joined room: ${roomName}`);
        });
};

export const roomService = {
    joinRoom,
}