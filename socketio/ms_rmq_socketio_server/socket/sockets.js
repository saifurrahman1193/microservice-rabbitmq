import TypingController from './controller/TypingController.js';

const sockets = (socket) => {
    const typingController = new TypingController(socket);
    socket.on('send-message', ({ message, roomId }) => {
        let skt = socket.broadcast;
        skt = roomId ? skt.to(roomId) : skt;  // if has roomId, send message only on the room otherwise send message everywhere
        console.log(roomId);
        skt.emit('send-message-from-server', { message: message }); // to all clients in the current namespace except the sender
    })

    // Typing (start, end)
    socket.on('typing-started', typingController.typingStarted)
    socket.on('typing-stopped', typingController.typingStopped)

    // Rooms
    socket.on('join-room', ({ roomId }) => {
        console.log('joining room...');
        socket.join(roomId);
    })

    socket.on('disconnect', (socket) => {  // only can disconnect socket when  it 's connected
        console.log('user left, disconnected');
    });
}

export default sockets