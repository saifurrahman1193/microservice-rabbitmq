import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom';
import Header from 'src/components/layouts/Header';
import io from 'socket.io-client';

function App() {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        setSocket(io("http://localhost:803"));
    }, []);

    return (
        <>
            <Header  socket={socket} />
            <Outlet context={{ socket }} />
        </>
    );
}

export default App;
