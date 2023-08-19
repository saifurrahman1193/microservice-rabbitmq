import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const Header = () => {
    const roomId = uuidv4();
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Socket.io Client
                </Typography>
                <Link to="/">
                    <Button sx={{ color: "white" }} variant='text'>Home</Button>
                </Link>
                <Link to="/Chat">
                    <Button sx={{ color: "white" }} variant='text'>Chat</Button>
                </Link>
                <Link to={`/room/${roomId}`}>
                    <Button sx={{ color: "white" }} variant='text'>Room 1</Button>
                </Link>

            </Toolbar>
        </AppBar>
    );
};

export default Header;
