import { Request, Response } from 'express';
import { getUserByUserName, createUser } from '../model/User';
import { authentication, random } from '../helper/Auth';

export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.sendStatus(400);
        }

        const user = await getUserByUserName(username).select('+authentication.salt +authentication.password');


        if (!user) {
            return res.sendStatus(400);
        }

        const expectedHash = authentication(user?.authentication?.salt || '', password);

        if (user?.authentication?.password != expectedHash) {
            return res.sendStatus(403);
        }

        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString());

        await user.save();

        res.cookie('SOCKET-SERVER-AUTH', user.authentication.sessionToken, { domain: 'localhost', path: '/' });

        return res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const register = async (req: Request, res: Response) => {
    try {


        const { name, email, username, password } = req.body;

        if (!username || !password) {
            return res.sendStatus(400);
        }

        const existinUser = await getUserByUserName(username)

        if (existinUser) {
            return res.sendStatus(400);
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

        return res.status(200).json(user).end();

    } catch (error) {
        console.error(error);
        return res.sendStatus(400);
    }
}