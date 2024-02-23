import { Request, Response, NextFunction } from 'express';
import { merge } from 'lodash';
import { set_response } from '../helper/apiresponser.helper';
import jwt from "jsonwebtoken";
import { config } from '../config/index.config';
import { HttpStatusCode } from '../helper/httpcode.helper';

import { userService } from '../service/authentication/user.service';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorization = req.cookies['Authorization'];

        if (!authorization) {
            return set_response(res, null, HttpStatusCode.Unauthorized, false, ['Unauthenticated. Please login first!'], null);
        }

        let token = authorization.split(' ')[1];
        let decoded_data : any = null;

        jwt.verify(token,
            config.jwt.access_token_secret,
            (err: any, decoded: any) => {
                if (err) {
                    return set_response(res, null, HttpStatusCode.Unauthorized, false, ['Unauthenticated. Please login first!'], null);
                }
                decoded_data = decoded
            });

        const existingUser = await userService.getUserByUserName(decoded_data?.username);
        if (!existingUser) {
            return set_response(res, null, HttpStatusCode.NotFound, false, ['Not Found: User not found'], null);
        }

        // merge(req, { identity: existingUser });

        next();
    } catch (error) {
        return set_response(res, null, 500, false, ['Internal Server Error: '], null);
    }
}
