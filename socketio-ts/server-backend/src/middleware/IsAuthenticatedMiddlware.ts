import { Request, Response, NextFunction } from 'express';
import { merge } from 'lodash';
import {set_response} from '../helper/APIResponser';

import { getUserBySessionToken } from '../model/authentication/User';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sessionToken = req.cookies['SOCKET-SERVER-AUTH'];

        if (!sessionToken) {
            return set_response(res, null, 403, 'error', ['Forbidden: Session token not found'], null);
        }

        const existingUser = await getUserBySessionToken(sessionToken);

        if (!existingUser) {
            return set_response(res, null, 404, 'error', ['Not Found: User not found'], null);
        }

        merge(req, { identity: existingUser });

        return next();
    } catch (error) {
        return set_response(res, null, 500, 'error', ['Internal Server Error: '], null);
    }
}
