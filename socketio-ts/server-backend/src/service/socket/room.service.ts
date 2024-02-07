import { Server, Socket } from 'socket.io';

const joinRoom = (socket: Socket) => {
        // Event listener for the 'joinRoom' event
        socket.on('joinRoom', (roomName) => {
            // Join the specified room
            socket.join(roomName);
            console.log(`User ${socket.id} joined room: ${roomName}`);

            socket.to(roomName).emit('joinedRoom',  {user: socket.id, roomName: roomName})
        });

        // console.log(Object.keys(io.sockets.adapter.rooms));

        // Emit 'joinedRoom' event to the specific room
        // io.sockets.in(roomName).emit('joinedRoom', `User ${socket.id} has joined room ${roomName}`);
};

export const roomService = {
    joinRoom,
}