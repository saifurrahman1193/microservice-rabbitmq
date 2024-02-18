import { Router } from 'express';
import path from 'path';

const router = Router();

router.get('/socket', (req, res) => {
    res.sendFile(path.join(__dirname, '../view/socket/socket.html'));
});


export default router;