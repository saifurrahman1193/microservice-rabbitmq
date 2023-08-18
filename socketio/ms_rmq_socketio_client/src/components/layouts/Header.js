import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import {Link} from 'react-router-dom';

const Header = () => {
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
                
            </Toolbar>
        </AppBar>
    );
};

export default Header;
