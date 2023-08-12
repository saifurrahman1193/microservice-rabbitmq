const socket = io();

socket.on('connect', () =>{
    console.log('Successfully Connected!'+socket.id);
})