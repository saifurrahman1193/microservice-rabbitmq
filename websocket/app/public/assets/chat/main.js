import SocketHandler from './SocketHandler.js';
import store from './store.js';
import ui from './ui.js';

const socket = SocketHandler.connectToSocketIOServer()


const nameinput = document.querySelector('#name_input');
nameinput.addEventListener('keyup', (event) =>{
    ui.updateUsername(event.target.value)
})

const newmessageinput = document.querySelector('#new_message_input');
const newmessagesubmit = document.querySelector('#new_message_submit');
newmessagesubmit.addEventListener('click', (event) =>{
    let message = newmessageinput.value
    SocketHandler.sendGroupMessage(socket, message)
})
