import { Router } from 'express';
import path from 'path';

const router = Router();

router.get('/socket', (req, res) => {
    res.sendFile(path.join(__dirname, '../view/common/socket.html'));
});

router.get('/socket-client.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../view/common/socket-client.js'));
});

export default router;