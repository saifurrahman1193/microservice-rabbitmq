import { Request, Response } from 'express';
import { userService } from '../../service/authentication/user.service';
import { jwtaccesstokenService } from '../../service/authentication/jwtaccesstoken.service';
import { jwtrefreshtokenService } from '../../service/authentication/jwtrefreshtoken.service';
import { set_response } from '../../helper/apiresponser.helper';
import { HttpStatusCode } from '../../helper/httpcode.helper';
import { generate_access_token, generate_refresh_token, JWT_ACCESS_TOKEN_EXPIRES_AT, JWT_REFRESH_TOKEN_EXPIRES_AT } from '../../helper/auth.helper';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import jwt from "jsonwebtoken";
import { jwtConfig } from '../../config/jwt.config';


export const register = async (req: Request, res: Response) => {
    try {
        // destructuring
        const { name, email, username, password, is_active } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userService.createUser({
            name,
            email,
            username,
            password: hashedPassword
        });

        return set_response(res, user, HttpStatusCode.Created, true, ['User created successfully'], null);
    } catch (error: any) {
        return set_response(res, null, HttpStatusCode.InternalServerError, false, ['Internal Server Error: '], error);
    }
}


export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        const jwt_access_token_expires_at = JWT_ACCESS_TOKEN_EXPIRES_AT;
        const jwt_refresh_token_expires_at = JWT_REFRESH_TOKEN_EXPIRES_AT;

        // Step 1: Retrieve user data
        const user = await userService.getUserByUserName(username).select('+password');

        // Step 2: Verify password
        const is_verified_password = await bcrypt.compare(password, user?.password || '');
        if (!user || !is_verified_password) {
            return set_response(res, null, HttpStatusCode.Unauthorized, false, ['Unauthorized: Password does not match'], [{ field: 'password', message: 'Unauthorized: Password does not match' }]);
        }

        // Step 3: Generate JWT access token ID
        const jwt_access_token_id = new mongoose.Types.ObjectId();
        const jwt_refresh_token_id = new mongoose.Types.ObjectId();

        // Step 4: Update inactive JWT access tokens and create a new one
        await jwtaccesstokenService.updateJWTAccessTokenInactive({ user_id: user?._id });
        await jwtrefreshtokenService.updateJWTRefreshTokenInactive({ user_id: user?._id });

        const jwt_access_token = await jwtaccesstokenService.createJWTAccessToken({ _id: jwt_access_token_id, user_id: user?._id, expires_at: jwt_access_token_expires_at });
        const jwt_refresh_token = await jwtrefreshtokenService.createJWTRefreshToken({ _id: jwt_refresh_token_id, user_id: user?._id, expires_at: jwt_refresh_token_expires_at, jwt_access_token_id });

        // Step 5: Generate JWT token (access + refresh token)
        const access_token = await generate_access_token({ user_id: user?._id, username, jwt_access_token_id, jwt_refresh_token_id, expires_at: jwt_access_token_expires_at });
        const refresh_token = await generate_refresh_token({ user_id: user?._id, username, jwt_access_token_id, jwt_refresh_token_id, expires_at: jwt_refresh_token_expires_at });

        // Step 6: Form the response data
        const { password: _, ...userWithoutPassword } = user;
        const Authorization = 'Bearer ' + access_token;

        let data = {
            user: {
                ...userWithoutPassword,
                'access_token': access_token,
                'refresh_token': refresh_token,
                'token_type': 'Bearer',
                'access_token_expires_at': jwt_access_token_expires_at,
                'refresh_token_expires_at': jwt_refresh_token_expires_at,
            },
        };

        // Step 7: Set Authorization cookie and send the response
        res.cookie('Authorization', Authorization, { httpOnly: true, maxAge: jwtConfig?.access_token_expires_in_seconds * 1000 });
        return set_response(res, data, HttpStatusCode.OK, true, ['Successfully logged in'], null);
    } catch (error: any) {
        // Step 8: Handle errors and send an appropriate response
        return set_response(res, null, HttpStatusCode.InternalServerError, false, ['Internal Server Error'], error);
    }
};

export const me = async (req: Request, res: Response) => {
    const authorization = req.cookies['Authorization'];

    // Step 1: Retrieve user data
    const user = await userService.getMyInfo(req);
    const token: string = authorization.split(' ')[1] // removing `Bearer`
    const decoded: any = jwt.decode(token);  // getting encrypted data
    console.log(decoded);


    let data = {
        user: {
            ...user,
            'access_token': token,
            'token_type': 'Bearer',
            'access_token_expires_at': decoded?.expires_at
        },
    };
    return set_response(res, data, HttpStatusCode.OK, true, ['Successfully me data'], null);
};

export const logout = async (req: Request, res: Response) => {

    const authorization = req.cookies['Authorization'];

    const token: string = authorization.split(' ')[1]
    const decoded: any = jwt.decode(token);

    jwtaccesstokenService.expireJWTAccessTokenWithTokenId({
        jwt_access_token_id: decoded?.jwt_access_token_id,
    });

    jwtrefreshtokenService.expireJWTRefreshTokenWithTokenId({
        jwt_refresh_token_id: decoded?.jwt_refresh_token_id,
    });

    res.cookie('Authorization', '', { maxAge: 1 }); // expire (cookie = Authorization = token) within 1 miliseconds

    return set_response(res, null, HttpStatusCode.OK, true, ['Successfully logged out'], null);
};
