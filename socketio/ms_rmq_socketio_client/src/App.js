import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import io from 'socket.io-client';
import { Box, TextField, Container, Typography } from '@mui/material';

function App() {
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);

    const handleForm = (e) => {
        e.preventDefault();
        socket.emit("send-message", {message: message});
        setMessage("")
    }

    useEffect(() => {
        setSocket(io("http://localhost:803"));
    }, []);

    useEffect(() => {
        if(!socket) return;
        socket.on("send-message-back", (data)=>{
            setChat((prev) => [...prev, data?.message]);
        })
    }, [socket]);
  return (
    <div>
        <Container>
            <Box sx={{ marginBottom:5 }}>
                {
                    chat?.map((msg) =>
                        <Typography >{msg}</Typography>
                    )
                }
            </Box>
            <Box component="form" onSubmit={handleForm}>
                <TextField
                id="message"
                label="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                size='small'
                />
                <Button variant='text' type='submit'>Send</Button>
            </Box>
        </Container>
    </div>
  );
}

export default App;
