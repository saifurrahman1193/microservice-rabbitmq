const socketSetup = () => {
    const socket = io('http://localhost:86/otl', {
        auth: {
            app_id: '65cb3d18411af943dbd38deb',  // home
            app_password: 'BVrbvKr5vkTW8yExauzpdxbkI43BcmH1cTZW4VZratPcxS3bNwBJ6AzslYnU',

            // app_id: '65cda18ca2d5bd1c20155081',  // office
            // app_password: 'ShThMk3bXSQXiPYfiaBbOB0LsP-aPdj8sj9squfZjEt9zm-YrOxCXxQ8cjf7',
        }
    });
    socket.on('connect', () => {
        console.log('connected', socket.id);
    });
    socket.on('disconnect', () => {
        console.log('disconnected');
    });
    return socket;
}

const joinRoom = (socket, params) => {
    socket.emit('room/join-room', { room: params?.room }, (response) => {
        console.log('Server responded:', response?.message);
    });
}
const joinRooms = (socket, params) => {
    socket.emit('room/join-rooms', { rooms: params?.rooms }, (response) => {
        console.log('Server responded:', response);
    });
}
const sendMessageToRoom = (socket, params) => {
    socket.emit('room/send-message', { room: params?.room, message: params?.message }, (response) => {
        console.log('Server responded:', response);
    });
}

// event : room
const setupRoomEvents = (socket) => {
    socket.on('room/user-connected', ({ room }) => {
        console.log(`User joined room: ${room}`);
    });

    socket.on('room/user-disconnected', ({ room }) => {
        console.log(`User Left room: ${room}`);
    });

    socket.on('room/receive-message', ({ room, message }) => {
        console.log(`Message received from ${room} : ${message}`);
    });
}
