import React, { useEffect, useState } from 'react'
import { Box, TextField, Container, Typography, Grid, Paper, InputAdornment, InputLabel } from '@mui/material';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import {useOutletContext} from 'react-router-dom';

function ChatWindow() {
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
    const [typing, setTyping] = useState(false);
    const [typingStoppedTimeout, setTypingStoppedTimeout] = useState(null);
    const {socket} = useOutletContext();

    const handleForm = (e) => {
        e.preventDefault();
        if (message.trim() == '') return;
        socket.emit("send-message", { message: message });
        setMessage("")
        setChat((prev) => [...prev, { message: message }]);
    }
    

    useEffect(() => {
        if (!socket) return;
        socket.on("send-message-from-server", (data) => {   // getting message from server
            setChat((prev) => [...prev, { ...data, is_received: true }]);
        })
        socket.on("typing-started-from-server", () => { setTyping(true); })  // getting typing started notification from server
        socket.on("typing-stopped-from-server", () => { setTyping(false); }) // getting typing stopped notification from server
    }, [socket]);

    const handleMessageInput = (e) => {
        setMessage(e.target.value)
        socket.emit("typing-started")  // sending typing notification to server 

        if (typingStoppedTimeout) clearTimeout(typingStoppedTimeout)
        setTypingStoppedTimeout(
            setTimeout(() => {
                socket.emit("typing-stopped");
            }, 1000)
        );


    };

    return (
        <Container>

            <Grid container direction="column" justifyContent="space-between" style={{ height: '92vh' }}>
                <Grid item>
                    {/* Header */}
                    <Paper elevation={2} style={{ padding: '16px', margin: '8px' }}>
                        {/* Header content */}
                        Chat
                    </Paper>
                </Grid>
                <Grid item xs style={{ maxHeight: '70vh', overflowY: 'scroll' }} >
                    {/* Chat messages */}
                    {
                        chat?.map((item, i) =>
                            <Paper elevation={0} style={{ padding: '16px', overflowY: 'scroll' }} key={i + 'message-p'} >
                                <Typography key={i + 'message'} textAlign={item?.is_received ? 'left' : 'right'}>{item?.message}</Typography>
                            </Paper>
                        )
                    }
                </Grid>
                <Grid item mb={2}>
                    {/* Input field and send button */}
                    <Box component="form" onSubmit={handleForm}>
                        {
                            typing ?
                                <InputLabel shrink >Typing...</InputLabel>
                                : null
                        }
                        <TextField
                            id="message"
                            label="message"
                            placeholder="Write your message here..."
                            value={message}
                            onChange={handleMessageInput}
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