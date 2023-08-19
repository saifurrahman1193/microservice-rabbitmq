import React, { useEffect } from 'react'
import {useParams, useOutletContext} from 'react-router-dom';
import ChatWindow from 'src/components/ChatWindow';
import Typography from '@mui/material/Typography'

function Room() {
    const params = useParams()
    const {socket} = useOutletContext();

    useEffect(() => {
        if (!socket) return;

        socket.emit('join-room', {roomId: params?.roomId});
    }, [params, socket]);

    return (
        <>
            <Typography>Room : {params?.roomId}</Typography>
            <ChatWindow />
        </>
    )
}

export default Room