import express from 'express';
import {getUserByUserName, createUser} from '../model/User';
import {authentication, random} from '../helper/Auth';

export const register = async (req: express.Request, res: express.Response) => {
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
            authentication:{
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