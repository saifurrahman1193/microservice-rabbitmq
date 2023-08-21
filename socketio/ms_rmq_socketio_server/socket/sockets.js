import TypingController from './controller/TypingController.js';
import RoomController from './controller/RoomController.js';
import MessageController from './controller/MessageController.js';

const sockets = (socket) => {
    const typingController = new TypingController(socket);
    const roomController = new RoomController(socket);
    const messageController = new MessageController(socket);

    socket.on('send-message', messageController.sendMessage)

    // Typing (start, end)
    socket.on('typing-started', typingController.typingStarted)
    socket.on('typing-stopped', typingController.typingStopped)

    // Rooms
    socket.on('join-room', roomController.joinRoom)
    socket.on('new-room-created', roomController.newRoomCreated)

    socket.on('disconnect', (socket) => {  // only can disconnect socket when  it 's connected
        console.log('user left, disconnected');
    });
}

export default sockets