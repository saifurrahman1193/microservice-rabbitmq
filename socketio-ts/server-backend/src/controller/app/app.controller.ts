import { Request, Response } from 'express';
import { App as AppModel } from '../../model/app/app.model';
import { createApp } from '../../service/app/app.service';
import { set_response } from '../../helper/apiresponser.helper';
import { HttpStatusCode } from '../../helper/httpcode.helper';
import { generateAccessToken } from '../../helper/crypto.helper';
import { userService } from '../../service/authentication/user.service';

export const create = async (req: Request, res: Response) => {
    try {
        const { name, is_active } = req.body;
        const me = await userService.getMyInfo(req);


        const app = await createApp({
            name,
            password: generateAccessToken(60),
            namespace_path: '/' + name,
            is_active,
            created_by: me ? me.username : null,
            created_at: new Date().toISOString(),
        });

        return set_response(res, app, HttpStatusCode.OK, 'success', ['Successfully created the app'], null);
    } catch (error: any) {
        return set_response(res, null, HttpStatusCode.InternalServerError, 'error', ['Failed to create the app'], error);
    }
};

