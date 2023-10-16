import BaseController from "./BaseController.js";

export default class MessageController extends BaseController {

    sendMessage = ({ message, roomId }) => {
        let skt = this.socket.broadcast;
        skt = roomId ? skt.to(roomId) : skt;  // if has roomId, send message only on the room otherwise send message everywhere
        console.log(roomId);
        skt.emit('send-message-from-server', { message: message }); // to all clients in the current namespace except the sender
    }

}

