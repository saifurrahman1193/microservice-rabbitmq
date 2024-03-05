import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import {config} from '../config/index.config';
import { Request, Response } from 'express';

export const JWT_EXPIRES_AT = moment().utcOffset(6 * 60).add(config.jwt.expires_in_seconds, 'seconds').format('yy-MM-DD HH:mm:ss'); // only at login time works

// Example: Generate a random cryptographic key
export const random = () => crypto.randomBytes(128).toString('base64');

export const authentication = (salt: string, password: string) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(config.jwt.access_token_secret).digest('hex')
}


export const get_access_token = async(req : Request) => {
    let access_token = await authorization(req)
    access_token = access_token && access_token.split(' ')[1]
    return access_token;
}

export const authorization = async(req : Request) => {
    let authorization = req?.headers?.authorization || ('Bearer ' + req?.body?.access_token)
    return authorization;
}

export const generate_access_token = async(data : any) => {
    const token = jwt.sign(data, config.jwt.access_token_secret, { expiresIn: config.jwt.expires_in_seconds });
    return token;
}

  
// expire (cookie = Authorization = token) within 1 miliseconds
export const clearAuthorizationCookie = async(res: Response) => {
    res.cookie('Authorization', '', { maxAge:  1 }); // Use default of 1 ms
}

// const Auth = exports.Auth = async (req : Request) => {
//     const access_token = await AccessToken(req);
    
//     try {
//         const decoded = jwt.verify(access_token, config.jwt.access_token_secret);
//         if (decoded) {
//             let userdata = ( await sqlResult(`SELECT * FROM users WHERE id=${decoded.id} `))[0]
//             return userdata;
//         }
//     } catch (error) {
//         return {};
//     }
// }