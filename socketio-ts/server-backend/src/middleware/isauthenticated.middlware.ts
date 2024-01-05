import { Request, Response, NextFunction } from 'express';
import { merge } from 'lodash';
import { set_response } from '../helper/apiresponser.helper';

import { userService } from '../service/authentication/user.service';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sessionToken = req.cookies['SOCKET-SERVER-AUTH'];

        if (!sessionToken) {
            return set_response(res, null, 401,  false , ['Unauthenticated. Please login first!'], null);
        }

        const existingUser = await userService.getUserBySessionToken(sessionToken);

        if (!existingUser) {
            return set_response(res, null, 404,  false , ['Not Found: User not found'], null);
        }

        merge(req, { identity: existingUser });

        return next();
    } catch (error) {
        return set_response(res, null, 500,  false , ['Internal Server Error: '], null);
    }
}
