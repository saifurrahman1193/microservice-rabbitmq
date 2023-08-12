import store from './store.js';
import ui from './ui.js';
const socket = io();

socket.on('connect', () =>{
    console.log('Successfully Connected!', socket.id);
})

socket.emit('hello-client')
socket.on('hello-client', () =>{
    console.log('Hello client! ',store.getUsername(), socket.id);
})

const nameinput = document.querySelector('#name_input');
nameinput.addEventListener('keyup', (event) =>{
    ui.updateUsername(event.target.value)
})

const newmessageinput = document.querySelector('#new_message_input');
const newmessagesubmit = document.querySelector('#new_message_submit');
newmessagesubmit.addEventListener('click', (event) =>{
    let message = newmessageinput.value
    
})
