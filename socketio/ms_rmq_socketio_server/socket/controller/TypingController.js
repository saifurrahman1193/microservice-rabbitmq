import BaseController from "./BaseController.js";

export default class TypingController extends BaseController {

    typingStarted = ({ roomId }) => {
        let skt = this.socket.broadcast;
        skt = roomId ? skt.to(roomId) : skt;  // if has roomId, send message only on the room otherwise send message everywhere
        skt.emit('typing-started-from-server'); // to all clients in the current namespace except the sender
    }
    
    typingStopped = ({ roomId }) => {
        let skt = this.socket.broadcast;
        skt = roomId ? skt.to(roomId) : skt;  // if has roomId, send message only on the room otherwise send message everywhere
        skt.emit('typing-stopped-from-server'); // to all clients in the current namespace except the sender
    }
}

