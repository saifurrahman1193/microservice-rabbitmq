function connectToSocketIOServer() {
    const socket = io("/");

    socket.on('connect', () => {
        console.log('successfully connected');
    });

    socket.on('group-chat-message', (data) => {
        console.log(data);
    })

    return socket;
}

function sendGroupMessage(socket, message) {
    socket.emit('group-chat-message', message);
    console.log('Sent message:', message);
}

export default {
    connectToSocketIOServer,
    sendGroupMessage
}