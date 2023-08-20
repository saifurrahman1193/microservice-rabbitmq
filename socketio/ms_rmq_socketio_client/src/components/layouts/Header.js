import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const Header = () => {
    const navigate = useNavigate();

    const createNewRoom = () => {
        const roomId = uuidv4();
        navigate(`room/${roomId}`)
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Socket.io Client
                </Typography>
                <Link to="/">
                    <Button sx={{ color: "white" }} variant='text'>Home</Button>
                </Link>
                <Button sx={{ color: "white" }} variant='text' onClick={createNewRoom}>New Room</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
