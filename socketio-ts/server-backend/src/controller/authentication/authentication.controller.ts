import { Request, Response } from 'express';
import { userService } from '../../service/authentication/user.service';
import { set_response } from '../../helper/apiresponser.helper';
import { HttpStatusCode } from '../../helper/httpcode.helper';
import { unique } from '../../rule/common/unique.rule';
import { exists } from '../../rule/common/exists.rule';
import { User } from '../../model/authentication/user.model';
import jwt from 'jsonwebtoken';
import { authentication, random, JWT_SECRET, JWT_EXPIRES_IN, get_access_token, generate_access_token, JWT_EXPIRES_AT } from '../../helper/auth.helper';
import bcrypt from 'bcrypt';

// export const login = async (req: Request, res: Response) => {
//     try {
//         const { username, password } = req.body;

//         // validation
//         let validator = await exists({ 'model': User, 'field': 'username', 'value': username });
//         if (validator.fails) {
//             return set_response(res, null, HttpStatusCode.UnprocessableEntity, false, validator.messages, validator.errors);
//         }

//         const user = await userService.getUserByUserName(username).select('+authentication.salt +authentication.password');

//         if (!user) {
//             return set_response(res, null, HttpStatusCode.UnprocessableEntity, false, ['Not Found: User not found'], [{ field: 'username', message: 'User not found' }]);
//         }

//         const expectedHash = authentication(user.authentication.salt, password);

//         if (user.authentication.password !== expectedHash) {
//             return set_response(res, null, HttpStatusCode.Unauthorized, false, ['Unauthorized: Password does not match'], [{ field: 'password', message: 'Unauthorized: Password does not match' }]);
//         }

//         const salt = random();
//         user.authentication.sessionToken = authentication(salt, user._id.toString());

//         await user.save();

//         res.cookie('SOCKET-SERVER-AUTH', user.authentication.sessionToken, { domain: 'localhost', path: '/', secure: true, httpOnly: true });

//         return set_response(res, user, HttpStatusCode.OK, true, ['Successfully logged in'], null);
//     } catch (error: any) {
//         return set_response(res, null, HttpStatusCode.InternalServerError, false, ['Internal Server Error: '], error);
//     }
// };

export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        // validation
        let validator = await exists({ 'model': User, 'field': 'username', 'value': username });
        if (validator.fails) {
            return set_response(res, null, HttpStatusCode.UnprocessableEntity, false, validator.messages, validator.errors);
        }

        const user = await userService.getUserByUserName(username);
        if (!user) {
            return set_response(res, null, HttpStatusCode.UnprocessableEntity, false, ['Not Found: User not found'], [{ field: 'username', message: 'User not found' }]);
        }

        const is_verified_password = await bcrypt.compare(password, user?.password || '');

        if (!is_verified_password) {
            return set_response(res, null, HttpStatusCode.Unauthorized, false, ['Unauthorized: Password does not match'], [{ field: 'password', message: 'Unauthorized: Password does not match' }]);
        }

        const token = generate_access_token({ username });
        const Authorization = 'Bearer ' + token;

        let data = {
            'user': {
                ...user,
                'access_token': token,
                'token_type': 'Bearer',
                'expires_at': JWT_EXPIRES_AT,
            },
        }


        // Create jwt_access_token row for 1 to multiple device tokens login token (pending)

        res.cookie('Authorization', Authorization, { domain: 'localhost', path: '/', secure: true, httpOnly: true });

        return set_response(res, data, HttpStatusCode.OK, true, ['Successfully logged in'], null);
    } catch (error: any) {
        return set_response(res, null, HttpStatusCode.InternalServerError, false, ['Internal Server Error: '], error);
    }
};


export const register = async (req: Request, res: Response) => {
    try {
        // destructuring
        const { name, email, username, password } = req.body;

        // validation
        let validator = await unique({ 'model': User, 'field': 'username', 'value': username });
        if (validator.fails) {
            return set_response(res, null, HttpStatusCode.UnprocessableEntity, false, validator.messages, validator.errors);
        }

        // Create a new user
        const salt = random();
        const user = await userService.createUser({
            name,
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password)
            }
        });

        return set_response(res, user, HttpStatusCode.Created, true, ['User created successfully'], null);
    } catch (error: any) {
        return set_response(res, null, HttpStatusCode.InternalServerError, false, ['Internal Server Error: '], error);
    }
}