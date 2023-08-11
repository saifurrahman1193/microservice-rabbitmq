const socket = io('http://localhost:5001');

socket.on('connect', () =>{
    console.log('Successfully Connected!'+socket.id);
})