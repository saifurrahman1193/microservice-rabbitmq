import { Request, Response, NextFunction } from 'express';
import { merge } from 'lodash';
import { set_response } from '../helper/apiresponser.helper';
import jwt from "jsonwebtoken";
import { config } from '../config/index.config';
import { HttpStatusCode } from '../helper/httpcode.helper';

import { userService } from '../service/authentication/user.service';
import { jwtaccesstokenService } from '../service/authentication/jwtaccesstoken.service';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorization = req.cookies['Authorization'];

        if (!authorization) {
            res.cookie('Authorization', '', { maxAge: 1 }); // expire (cookie = Authorization = token) within 1 miliseconds
            return set_response(res, null, HttpStatusCode.Unauthorized, false, ['Unauthenticated. Token Not Found. Please login first!'], null);
        }

        let token = authorization.split(' ')[1];
        let decoded_data: any = null;

        jwt.verify(token,
            config.jwt.access_token_secret,
            (err: any, decoded: any) => {
                if (err) {
                    return set_response(res, null, HttpStatusCode.Unauthorized, false, ['Unauthenticated. Invalid Token. Please login first!'], null);
                }
                decoded_data = decoded
            });

        const existingUser = await userService.getUserByUserName(decoded_data?.username);
        if (!existingUser) {
            res.cookie('Authorization', '', { maxAge: 1 }); // expire (cookie = Authorization = token) within 1 miliseconds
            return set_response(res, null, HttpStatusCode.NotFound, false, ['Not Found: User not found'], null);
        }

        if (!existingUser || !existingUser.is_active) {
            res.cookie('Authorization', '', { maxAge: 1 }); // expire (cookie = Authorization = token) within 1 miliseconds
            return set_response(res, null, HttpStatusCode.NotFound, false, ['User is inactive! Please communicate with System admin.'], null);
        }

        const existing_access_token = await jwtaccesstokenService.getValidAccessTokenUsingJWTAccessTokenID(decoded_data);
        if (!existing_access_token) {
            res.cookie('Authorization', '', { maxAge: 1 }); // expire (cookie = Authorization = token) within 1 miliseconds
            return set_response(res, null, HttpStatusCode.NotFound, false, ['Unauthenticated. Token is either expired or incative. Please login first!'], null);
        }
        req.headers['user_id'] = existingUser._id;

        next();
    } catch (error) {
        res.cookie('Authorization', '', { maxAge: 1 }); // expire (cookie = Authorization = token) within 1 miliseconds
        return set_response(res, null, 500, false, ['Internal Server Error: '], null);
    }
}


// decoded_data
// ============
// {
//     username: 'saifur',
//     jwt_access_token_id: '65d88f1d1b538c9b2b6f9664',
//     expires_at: '2024-02-24 18:27:01',
//     iat: 1708691229,
//     exp: 1708777629
// }