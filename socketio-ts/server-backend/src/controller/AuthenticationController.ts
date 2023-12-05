import { Request, Response } from 'express';
import { getUserByUserName, createUser } from '../model/User';
import { authentication, random } from '../helper/Auth';
import {set_response} from '../helper/APIResponser';

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

        set_response(res, user, 200, 'success', ['Successfully logged in'], null);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
        set_response(res, null, 500, 'error', ['Internal Server Error: '+error], null);
    }
};


export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, username, password } = req.body;

        if (!username) {
            set_response(res, null, 400, 'error', ['Bad Request: Missing required fields'], {missingFields: ['username']})
        }
        if (!password) {
            set_response(res, null, 400, 'error', ['Bad Request: Missing required fields'], {missingFields: ['password']})
        }

        const existinUser = await getUserByUserName(username)
        
        if (existinUser) {
            set_response(res, null, 409, 'error', ['Conflict: User Already Exist!'], null)
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

        set_response(res, null, 201, 'success', ['User created successfully'], null);
    } catch (error) {
        set_response(res, null, 500, 'error', ['Internal Server Error: '+error], null);
    }
}