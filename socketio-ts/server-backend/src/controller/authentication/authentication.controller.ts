import { Request, Response } from 'express';
import { userService } from '../../service/authentication/user.service';
import { jwtaccesstokenService } from '../../service/authentication/jwtaccesstoken.service';
import { set_response } from '../../helper/apiresponser.helper';
import { HttpStatusCode } from '../../helper/httpcode.helper';
import { generate_access_token, JWT_EXPIRES_AT } from '../../helper/auth.helper';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';


export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        const jwt_expires_at = JWT_EXPIRES_AT;

        // Step 1: Retrieve user data
        const user = await userService.getUserByUserName(username).select('+password');

        // Step 2: Verify password
        const is_verified_password = await bcrypt.compare(password, user?.password || '');
        if (!user || !is_verified_password) {
            return set_response(res, null, HttpStatusCode.Unauthorized, false, ['Unauthorized: Password does not match'], [{ field: 'password', message: 'Unauthorized: Password does not match' }]);
        }

        // Step 3: Generate JWT access token ID
        const jwt_access_token_id = new mongoose.Types.ObjectId();

        // Step 4: Update inactive JWT access tokens and create a new one
        await jwtaccesstokenService.updateJWTAccessTokenInactive({
            user_id: user?._id,
        });

        const jwt_access_token = await jwtaccesstokenService.createJWTAccessToken({
            _id: jwt_access_token_id,
            user_id: user?._id,
            expires_at: jwt_expires_at
        });

        // Step 5: Generate JWT token
        const token = await generate_access_token({ username, jwt_access_token_id, expires_at: jwt_expires_at });

        // Step 6: Form the response data
        const { password: _, ...userWithoutPassword } = user;
        const Authorization = 'Bearer ' + token;

        let data = {
            user: {
                ...userWithoutPassword,
                'access_token': token,
                'token_type': 'Bearer',
                'expires_at': jwt_expires_at,
            },
        };

        // Step 7: Set Authorization cookie and send the response
        res.cookie('Authorization', Authorization, { domain: 'localhost', path: '/', secure: true, httpOnly: true });
        return set_response(res, data, HttpStatusCode.OK, true, ['Successfully logged in'], null);
    } catch (error: any) {
        // Step 8: Handle errors and send an appropriate response
        return set_response(res, null, HttpStatusCode.InternalServerError, false, ['Internal Server Error'], error);
    }
};


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