import React, { useEffect, useState } from 'react'
import { Box, TextField, Container, Typography, Grid, Paper, InputAdornment } from '@mui/material';
import Button from '@mui/material/Button';
import io from 'socket.io-client';
import SendIcon from '@mui/icons-material/Send';

function ChatWindow() {
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);

    const handleForm = (e) => {
        e.preventDefault();
        if (message.trim() == '') return ;
        socket.emit("send-message", { message: message });
        setMessage("")
        setChat((prev) => [...prev, {message: message }]);
    }

    useEffect(() => {
        setSocket(io("http://localhost:803"));
    }, []);

    useEffect(() => {
        if (!socket) return;
        socket.on("send-message-back", (data) => {
            setChat((prev) => [...prev, {...data, is_received: true}]);
        })
    }, [socket]);


    return (
        <Container>

            <Grid container direction="column" justifyContent="space-between" style={{ height: '100vh' }}>
                <Grid item>
                    {/* Header */}
                    <Paper elevation={2} style={{ padding: '16px', marginBottom: '8px' }}>
                        {/* Header content */}
                    </Paper>
                </Grid>
                <Grid item xs style={{ maxHeight: '70vh', overflowY: 'scroll' }} >
                    {/* Chat messages */}
                    {
                        chat?.map((item, i) =>
                            <Paper elevation={0} style={{ padding: '16px', overflowY: 'scroll' }} key={i + 'message-p'} >
                                <Typography key={i + 'message'} textAlign={item?.is_received ? 'left': 'right'}>{item?.message}</Typography>
                            </Paper>
                        )
                    }
                </Grid>
                <Grid item mb={2}>
                    {/* Input field and send button */}
                    <Box component="form" onSubmit={handleForm}>
                        <TextField
                            id="message"
                            label="message"
                            placeholder="Write your message here..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            size='small'
                            fullWidth
                            variant="outlined"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Button variant="text" type="submit">
                                            <SendIcon />
                                        </Button>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}

export default ChatWindow