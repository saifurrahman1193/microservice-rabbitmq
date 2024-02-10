import { Socket } from 'socket.io';

// event
const joinRoom = (socket: Socket) => {
    socket.on('joinRoom', (room) => {
        socket.join(room);
        joinedRoom(socket, room)
    });
};

// event
const joinRooms = (socket: Socket) => {
    socket.on('joinRooms', (rooms: Array<string>) => {
        socket.join(rooms)
        rooms.forEach(room => {
            joinedRoom(socket, room)
        });
    });
};

// event
const joinedRoom = (socket: Socket, room: any) => {
    console.log(`User ${socket.id} joined room: ${room}`);
    
    socket.to(room).emit('joinedRoom', {
        user: socket.id, room: room, rooms: socket.rooms
    })
}


export const roomService = {
    joinRoom,
    joinRooms
}