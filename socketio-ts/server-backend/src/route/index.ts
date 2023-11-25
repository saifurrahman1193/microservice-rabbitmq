import express, { Router, Request, Response } from 'express';
import authentication from './authentication';
const router = Router();

export default (): Router => {
    authentication(router);
    
    return router;
}
