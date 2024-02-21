import { Request, Response } from 'express';
import { userService } from '../../service/authentication/user.service';
import { jwtaccesstokenService } from '../../service/authentication/jwtaccesstoken.service';
import { set_response } from '../../helper/apiresponser.helper';
import { HttpStatusCode } from '../../helper/httpcode.helper';
import { unique } from '../../rule/common/unique.rule';
import { exists } from '../../rule/common/exists.rule';
import { User } from '../../model/authentication/user.model';
import { generate_access_token, JWT_EXPIRES_AT } from '../../helper/auth.helper';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';


export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        const jwt_expires_at = JWT_EXPIRES_AT

        // validation
        let validator = await exists({ 'model': User, 'field': 'username', 'value': username });
        if (validator.fails) {
            return set_response(res, null, HttpStatusCode.UnprocessableEntity, false, validator.messages, validator.errors);
        }

        const user = await userService.getUserByUserName(username).select('+password').lean();
        if (!user) {
            return set_response(res, null, HttpStatusCode.UnprocessableEntity, false, ['Not Found: User not found'], [{ field: 'username', message: 'User not found' }]);
        }

        const is_verified_password = await bcrypt.compare(password, user?.password || '');
        if (!is_verified_password) {
            return set_response(res, null, HttpStatusCode.Unauthorized, false, ['Unauthorized: Password does not match'], [{ field: 'password', message: 'Unauthorized: Password does not match' }]);
        }

        const jwt_access_token_id = new mongoose.Types.ObjectId();  // db document / row (jwt_access_token: _id) 
        const jwt_access_token = await jwtaccesstokenService.createJWTAccessToken({
            _id: jwt_access_token_id,
            user_id: user?._id,
            expires_at: jwt_expires_at
        })

        const token = await generate_access_token({ username, jwt_access_token_id: jwt_access_token_id }); // in token data will be ({username, jwt_access_token_id})
        const Authorization = 'Bearer ' + token;
        
        const { password: _, ...userWithoutPassword } = user;

        let data = {
            user: {
                ...userWithoutPassword,
                'access_token': token,
                'token_type': 'Bearer',
                'expires_at': jwt_expires_at,
            },
        }

        // Create jwt_access_token row for 1 to multiple device tokens login token (pending)
        //  if 1 token allowed then inactive all previous tokens, if there is a limit to n then skip to n then inactive from n+1 to prev for that user

        res.cookie('Authorization', Authorization, { domain: 'localhost', path: '/', secure: true, httpOnly: true });

        return set_response(res, data, HttpStatusCode.OK, true, ['Successfully logged in'], null);
    } catch (error: any) {
        return set_response(res, null, HttpStatusCode.InternalServerError, false, ['Internal Server Error: '], error);
    }
};



export const register = async (req: Request, res: Response) => {
    try {
        // destructuring
        const { name, email, username, password, is_active } = req.body;

        // validation
        let validator = await unique({ 'model': User, 'field': 'username', 'value': username });
        if (validator.fails) {
            return set_response(res, null, HttpStatusCode.UnprocessableEntity, false, validator.messages, validator.errors);
        }

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