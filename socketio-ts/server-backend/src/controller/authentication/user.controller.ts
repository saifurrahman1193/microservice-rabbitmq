import { Request, Response } from 'express';
import { userService } from '../../service/authentication/user.service';
import { set_response } from '../../helper/apiresponser.helper';
import { HttpStatusCode } from '../../helper/httpcode.helper';
import { jwtaccesstokenService } from '../../service/authentication/jwtaccesstoken.service';

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await userService.getUsers();

        return res.status(HttpStatusCode.OK).json(users);
    } catch (error) {
        return set_response(res, null, HttpStatusCode.InternalServerError, false, ['Internal Server Error: '], null);
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deletedUser = await userService.deleteUserById(id);

        return res.json(deletedUser);
    } catch (error) {
        return set_response(res, null, HttpStatusCode.InternalServerError, false, ['Internal Server Error: '], null);
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, username, is_active } = req.body;

        const user = await userService.getUserById(id);
        if (!user) {
            return set_response(res, null, HttpStatusCode.BadRequest, false, ['Not Found: User not found'], null);
        }

        user.username = username;
        name ? user.name = name : null;
        is_active ? user.is_active = is_active : null;
        await user.save();

        if (is_active && is_active==0) {  // if user is to inactive then make all token incative, force them to logout
            jwtaccesstokenService.expireJWTTokenWithUserId({user_id: user._id});
        }

        return set_response(res, user, HttpStatusCode.OK, true, ['Successfully updated'], null);
    } catch (error) {
        return set_response(res, null, HttpStatusCode.InternalServerError, false, ['Internal Server Error: '], null);
    }
}

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const { name, username } = req.body;

        // console.log(name, username);



        // if (!username) {
        //     return res.sendStatus(HttpStatusCode.BadRequest);
        // }

        // const user_id = get(req, 'identity._id') || '';

        // const user = await getUserById(user_id);

        // if (!user) {
        //     return res.sendStatus(HttpStatusCode.BadRequest);
        // }

        // user.username = username;
        // user.name = name;
        // await user.save();

        // return res.status(HttpStatusCode.OK).json(user).end();
    } catch (error) {
        return set_response(res, null, HttpStatusCode.InternalServerError, false, ['Internal Server Error: '], null);
    }
}