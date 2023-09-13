import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom';
import Header from 'src/layout/Header';
import io from 'socket.io-client';

function App() {
    const [socket, setSocket] = useState(null);
    const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        setSocket(io(REACT_APP_BASE_URL));
    }, []);

    return (
        <>
            <Header socket={socket} />
            <Outlet context={{ socket }} />
        </>
    );
}

export default App;
