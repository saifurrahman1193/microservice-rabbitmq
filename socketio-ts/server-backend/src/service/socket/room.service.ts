import { Socket } from 'socket.io';

const joinRoom = (socket: Socket) => {
    // Event listener for the 'joinRoom' event
    socket.on('joinRoom', (roomName) => {
        // Join the specified room
        socket.join(roomName);
        console.log(`User ${socket.id} joined room: ${roomName}`);

        socket.to(roomName).emit('joinedRoom', {
            user: socket.id, roomName: roomName, rooms: socket.rooms
        })
    });
};

const joinRooms = (socket: Socket) => {
    // Event listener for the 'joinRoom' event
    socket.on('joinRooms', (rooms: Array<string>) => {
        // Join the specified room
        socket.join(rooms)

        rooms.forEach(room => {
            console.log(`User ${socket.id} joined room: ${room}`);

            socket.to(room).emit('joinedRoom', {
                user: socket.id, room: room, rooms: socket.rooms
            })
        });
    });
};

export const roomService = {
    joinRoom,
    joinRooms
}