import express, { Router, Request, Response } from 'express';
import authentication from './authentication';
import user from './user';
const router = Router();

export default (): Router => {
    authentication('/api/auth', router);
    user('/api/user', router);
    
    return router;
}
