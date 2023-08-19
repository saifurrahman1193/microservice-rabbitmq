import React from 'react';
import { Container, Typography, Button, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <Container maxWidth="sm" style={{ marginTop: '3rem' }}>
            <Paper elevation={3} style={{ padding: '2rem', textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    Welcome to My App!
                </Typography>
                <Typography variant="body1" paragraph>
                    Thank you for visiting our website. Explore and enjoy the content we have to offer.
                </Typography>
                <Link to="/chat" style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color="primary">
                        Start Chatting
                    </Button>
                </Link>
            </Paper>
        </Container>
    );
};

export default Home;
