import crypto from 'crypto';
import { Request } from 'express';
import jwt from 'jsonwebtoken';
import moment from 'moment';

export const JWT_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET || '';
export const JWT_EXPIRES_IN = parseInt(process.env.JWT_EXPIRES_IN || '300'); // default 5 minutes timeout
export const JWT_EXPIRES_AT = moment().add(JWT_EXPIRES_IN, 'seconds').format('yy-MM-DD HH:mm:ss'); // only at login time works

// Example: Generate a random cryptographic key
export const random = () => crypto.randomBytes(128).toString('base64');

export const authentication = (salt: string, password: string) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(JWT_SECRET).digest('hex')
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
    const token = jwt.sign(data, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    return token;
}


// const Auth = exports.Auth = async (req : Request) => {
//     const access_token = await AccessToken(req);
    
//     try {
//         const decoded = jwt.verify(access_token, process.env.JWT_SECRET);
//         if (decoded) {
//             let userdata = ( await sqlResult(`SELECT * FROM users WHERE id=${decoded.id} `))[0]
//             return userdata;
//         }
//     } catch (error) {
//         return {};
//     }
// }