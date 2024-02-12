import { Socket } from 'socket.io';

// event
const joinRoomProcess = (socket: Socket) => {
    socket.on('join-room', (room: string, acknowledgment: any | null) => {
        joinRoom(socket, room, acknowledgment);
    });
};

// event
const joinRoomsProcess = (socket: Socket) => {
    socket.on('join-rooms', (rooms: Array<string>, acknowledgment: any | null) => {
        rooms.forEach((room) => {
            socket.join(room);
            joinRoom(socket, room, acknowledgment);
        });
    });
};

// function
const joinRoom = (socket: Socket, room: any, acknowledgment: any | null) => {
    console.log(`User ${socket.id} joined room: ${room}`);

    // Emit 'joined-room' event to the specified room
    socket.to(room).emit('joined-room', {
        user: socket.id,
        room: room,
        rooms: socket.rooms,
    });

    // Execute acknowledgment callback if provided
    if (acknowledgment) {
        acknowledgment({ message: `Joined room: ${room}` });
    }
};


export const roomService = {
    joinRoomProcess,
    joinRoomsProcess
}