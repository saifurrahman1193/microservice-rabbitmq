import { Request, Response } from 'express';
import { userService } from '../../service/authentication/user.service';
import { authentication, random } from '../../helper/auth.helper';
import { set_response } from '../../helper/apiresponser.helper';
import { HttpStatusCode } from '../../helper/httpcode.helper';

export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        const user = await userService.getUserByUserName(username).select('+authentication.salt +authentication.password');

        if (!user) {
            return set_response(res, null, HttpStatusCode.UnprocessableEntity,  false , ['Not Found: User not found'], [{field: 'username', message: 'User not found'}]);
        }

        const expectedHash = authentication(user.authentication.salt, password);

        if (user.authentication.password !== expectedHash) {
            return set_response(res, null, HttpStatusCode.Unauthorized,  false , ['Unauthorized: Password does not match'], [{field: 'password', message: 'Unauthorized: Password does not match'}]);
        }

        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString());

        await user.save();

        res.cookie('SOCKET-SERVER-AUTH', user.authentication.sessionToken, { domain: 'localhost', path: '/', secure: true, httpOnly: true });

        return set_response(res, user, HttpStatusCode.OK,  true , ['Successfully logged in'], null);
    } catch (error: any) {
        return set_response(res, null, HttpStatusCode.InternalServerError,  false , ['Internal Server Error: '], error);
    }
};


export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, username, password } = req.body;

        const existinguser = await userService.getUserByUserName(username);
        if (existinguser) {
            return set_response(res, null, HttpStatusCode.UnprocessableEntity,  false , ['User already exist'], [{field: 'username', message: 'User already exist'}]);
        }

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

        return set_response(res, user, HttpStatusCode.Created,  true , ['User created successfully'], null);
    } catch (error: any) {
        return set_response(res, null, HttpStatusCode.InternalServerError,  false , ['Internal Server Error: '], error);
    }
}