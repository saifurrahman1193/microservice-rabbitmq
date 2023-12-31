import { Request, Response, NextFunction } from 'express';
import { get } from 'lodash';
import {set_response} from '../helper/APIResponser';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const currentUserId = get(req, 'identity._id') || '' as string;

        if (!currentUserId) {
            return set_response(res, null, 404,  false , ['Not Found: User not found'], null);
        }

        if (currentUserId.toString() !== id) {
            return set_response(res, null, 404,  false , ['Not Found: User not found'], null);
        }

        next();
    } catch (error) {
        return set_response(res, null, 500,  false , ['Internal Server Error: '], error);
    }
}