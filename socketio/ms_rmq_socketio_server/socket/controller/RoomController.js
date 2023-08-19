import BaseController from "./BaseController.js";

export default class RoomeController  extends BaseController  {

    joinRoom = ({ roomId }) => {
        console.log('joining room...');
        this.socket.join(roomId);
    }
   
}

