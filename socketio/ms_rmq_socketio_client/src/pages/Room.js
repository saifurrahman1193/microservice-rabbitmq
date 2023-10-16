import React, { useEffect } from 'react'
import { useParams, useOutletContext } from 'react-router-dom';
import ChatWindow from 'src/components/ChatWindow';

function Room() {
    const { roomId } = useParams()
    const { socket } = useOutletContext();

    useEffect(() => {
        if (!socket) return;  // no socket available yet
        socket.emit('join-room', { roomId: roomId });  // join room with roomId  
    }, [socket, roomId]);

    return (
        <ChatWindow />
    )
}

export default Room