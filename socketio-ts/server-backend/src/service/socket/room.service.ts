import { Socket } from 'socket.io';

// event
const joinRoomProcess = (socket: Socket) => {
    socket.on('room/join-room', ({ room }: { room: string }, acknowledgment: (result: any) => void) => {
        try {
            // Join the specified room
            socket.join(room);

            console.log(`User ${socket.id} joined room: ${room}`);

            // Execute acknowledgment callback if provided
            if (acknowledgment) {
                acknowledgment({ status: true, message: `Joined room: ${room}`, room, user: socket.id });
            }
        } catch (error: any) {
            console.error(`Error joining room ${room}:`, error?.message);

            // Execute acknowledgment callback with error if provided
            if (acknowledgment) {
                acknowledgment({ status: false, message: `Error joining room ${room}`, room });
            }
        }
    });
};

// event
const joinRoomsProcess = (socket: Socket) => {
    socket.on('room/join-rooms', ({ rooms }: { rooms: Array<string> }, acknowledgment: (result: any) => void) => {
        try {
            rooms.forEach((room) => {
                // Join the specified room inside the loop
                socket.join(room);

                console.log(`User ${socket.id} joined room: ${room}`);
            });

            // Execute acknowledgment callback if provided
            if (acknowledgment) {
                acknowledgment({ status: true, message: `Joined rooms: ${rooms.join(', ')}`, rooms, user: socket.id });
            }
        } catch (error: any) {
            console.error('Error in room/join-rooms event:', error?.message);

            // Execute acknowledgment callback with error if provided
            if (acknowledgment) {
                acknowledgment({ status: false, message: `Error joining rooms: ${rooms.join(', ')}`, rooms });
            }
        }
    });
};


// event
const leaveRoomProcess = (socket: Socket) => {
    socket.on('room/leave-room', (room: string, acknowledgment: (result: any) => void) => {
        try {
            // Check if the socket is already in the specified room
            if (socket.rooms.has(room)) {
                socket.leave(room);
                acknowledgment({ status: true, message: `User left room: ${room}`, room });
            } else {
                acknowledgment({ status: false, message: `User is not in room: ${room}`, room });
            }
        } catch (error: any) {
            console.error('Error in leave-room event:', error?.message);
            if (acknowledgment) {
                acknowledgment({ status: false, message: 'Error leaving the room', room: room });
            }
        }
    });
};

const sendMessageProcess = (socket: Socket) => {
    socket.on('room/send-message', ({ message, room }: { message: string, room: string }, acknowledgment: (result: any) => void) => {
        // Log the received message
        console.log(`Received message from ${socket.id}: ${message}`);

        socket.to(room).emit('room/receive-message', {room, message});

        // Acknowledge the received message
        if (acknowledgment) {
            acknowledgment({ status: true, message: `message received`, room });
        }
    });
};


export const roomService = {
    joinRoomProcess,
    joinRoomsProcess,
    leaveRoomProcess,
    sendMessageProcess
}