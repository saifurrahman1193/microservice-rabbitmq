import { Router } from 'express';

const router = Router();
const path = require('path');

router.get('/socket', (req, res) => {
    res.sendFile(path.join(__dirname, '../view/common/socket.html'));
});

export default router;