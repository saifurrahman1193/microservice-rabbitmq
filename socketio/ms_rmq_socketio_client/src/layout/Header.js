import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const Header = ({ socket }) => {
    const navigate = useNavigate();
    const [rooms, setRooms] = useState([]);

    const createNewRoom = () => {
        const roomId = uuidv4();
        navigate(`room/${roomId}`)
        socket.emit('new-room-created', { roomId: roomId })
        setRooms((prev) => [...prev, roomId])  // For this window to work
    }

    useEffect(() => {
        console.log('socket', socket);
        if (!socket) return;
        socket.on('new-room-created', ({ roomId }) => {
            setRooms((prev) => [...prev, roomId])   // For other every window to work
        })
    }, [socket]);

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Socket.io Client
                </Typography>
                <Link to="/">
                    <Button sx={{ color: "white" }} variant='text'>Home</Button>
                </Link>
                <Link to="/meeting">
                    <Button sx={{ color: "white" }} variant='text'>Meeting</Button>
                </Link>
                {
                    rooms.map((room) => (
                        <Link to={`/room/${room}`}>
                            <Button sx={{ color: "white" }} variant='text'>{room}</Button>
                        </Link>
                    ))
                }
                <Button sx={{ color: "white" }} variant='text' onClick={createNewRoom}>New Room</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
