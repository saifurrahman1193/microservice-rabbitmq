import { Request, Response } from 'express';
import { getUserByUserName, createUser } from '../../service/authentication/user.service';
import { authentication, random } from '../../helper/Auth';
import { set_response } from '../../helper/APIResponser';
import { HttpStatusCode } from '../../helper/HttpCodeHelper';

export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        const user = await getUserByUserName(username).select('+authentication.salt +authentication.password');

        if (!user) {
            return set_response(res, null, HttpStatusCode.UnprocessableEntity, 'error', ['Not Found: User not found'], [{field: 'test', message: 'User not found'}]);
        }

        const expectedHash = authentication(user.authentication.salt, password);

        if (user.authentication.password !== expectedHash) {
            return set_response(res, null, HttpStatusCode.Unauthorized, 'error', ['Unauthorized: Password does not match'], null);
        }

        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString());

        await user.save();

        res.cookie('SOCKET-SERVER-AUTH', user.authentication.sessionToken, { domain: 'localhost', path: '/', secure: true, httpOnly: true });

        return set_response(res, user, HttpStatusCode.OK, 'success', ['Successfully logged in'], null);
    } catch (error) {
        return set_response(res, null, HttpStatusCode.InternalServerError, 'error', ['Internal Server Error: '], null);
    }
};


export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, username, password } = req.body;

        const existinguser = await getUserByUserName(username);
        if (existinguser) {
            return set_response(res, null, HttpStatusCode.UnprocessableEntity, 'error', ['Internal Server Error: '], null);
        }

        const salt = random();
        const user = await createUser({
            name,
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password)
            }
        });

        return set_response(res, null, HttpStatusCode.Created, 'success', ['User created successfully'], null);
    } catch (error) {
        return set_response(res, null, HttpStatusCode.InternalServerError, 'error', ['Internal Server Error: '], null);
    }
}