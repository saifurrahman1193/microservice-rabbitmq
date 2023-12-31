import { Request, Response } from 'express';
import { userService } from '../../service/authentication/user.service';
import { set_response } from '../../helper/apiresponser.helper';

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await userService.getUsers();

        return res.status(200).json(users);
    } catch (error) {
        return set_response(res, null, 500, false, ['Internal Server Error: '], null);
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deletedUser = await userService.deleteUserById(id);

        return res.json(deletedUser);
    } catch (error) {
        return set_response(res, null, 500, false, ['Internal Server Error: '], null);
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, username } = req.body;

        if (!username) {
            return set_response(res, null, 400, false, ['Bad Request: Missing required fields'], null);
        }

        const user = await userService.getUserById(id);

        if (!user) {
            return set_response(res, null, 404, false, ['Not Found: User not found'], null);
        }

        user.username = username;
        user.name = name;
        await user.save();

        return res.status(200).json(user).end();
    } catch (error) {
        return set_response(res, null, 500, false, ['Internal Server Error: '], null);
    }
}

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const { name, username } = req.body;

        // console.log(name, username);



        // if (!username) {
        //     return res.sendStatus(400);
        // }

        // const user_id = get(req, 'identity._id') || '';

        // const user = await getUserById(user_id);

        // if (!user) {
        //     return res.sendStatus(400);
        // }

        // user.username = username;
        // user.name = name;
        // await user.save();

        // return res.status(200).json(user).end();
    } catch (error) {
        return set_response(res, null, 500, false, ['Internal Server Error: '], null);
    }
}