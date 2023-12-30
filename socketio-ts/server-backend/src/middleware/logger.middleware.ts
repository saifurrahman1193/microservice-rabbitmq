import { Request, Response, NextFunction } from 'express';
import { merge } from 'lodash';

export default async (req: Request, res: Response, next: NextFunction) => {
    /** Log the req */
    console.log(`Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        /** Log the res */
        console.log(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
    });
    next();
}
