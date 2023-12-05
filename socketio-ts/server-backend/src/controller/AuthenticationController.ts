import { Request, Response } from 'express';
import { getUserByUserName, createUser } from '../model/User';
import { authentication, random } from '../helper/Auth';
import { set_response } from '../helper/APIResponser';

export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return set_response(res, null, 400, 'error', ['Bad Request: Missing required fields'], { missingFields: ['username', 'password'] });
        }

        const user = await getUserByUserName(username).select('+authentication.salt +authentication.password');

        if (!user) {
            return set_response(res, null, 404, 'error', ['Not Found: User not found'], null);
        }

        const expectedHash = authentication(user.authentication.salt, password);

        if (user.authentication.password !== expectedHash) {
            return set_response(res, null, 401, 'error', ['Unauthorized: Password does not match'], null);
        }

        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString());

        await user.save();

        res.cookie('SOCKET-SERVER-AUTH', user.authentication.sessionToken, { domain: 'localhost', path: '/', secure: true, httpOnly: true });

        return set_response(res, user, 200, 'success', ['Successfully logged in'], null);
    } catch (error) {
        return set_response(res, null, 500, 'error', ['Internal Server Error: '], error);
    }
};


export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, username, password } = req.body;

        if (!username) {
            return set_response(res, null, 400, 'error', ['Bad Request: Missing required fields'], { missingFields: ['username'] })
        }
        if (!password) {
            return set_response(res, null, 400, 'error', ['Bad Request: Missing required fields'], { missingFields: ['password'] })
        }

        const existinUser = await getUserByUserName(username)

        if (existinUser) {
            return set_response(res, null, 409, 'error', ['Conflict: User Already Exist!'], null)
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

        return set_response(res, null, 201, 'success', ['User created successfully'], null);
    } catch (error) {
        return set_response(res, null, 500, 'error', ['Internal Server Error: '], error);
    }
}