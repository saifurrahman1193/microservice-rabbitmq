import { Request, Response } from 'express';
import { appService } from '../../service/app/app.service';
import { set_response } from '../../helper/apiresponser.helper';
import { HttpStatusCode } from '../../helper/httpcode.helper';
import { generateAccessToken } from '../../helper/crypto.helper';
import { userService } from '../../service/authentication/user.service';
import { convertMongoErrorToCustomError } from '../../helper/mongo.helper';

export const create = async (req: Request, res: Response) => {
    try {
        const { name, is_active } = req.body;
        const me = await userService.getMyInfo(req);


        const app = await appService.createApp({
            name,
            password: generateAccessToken(60),
            namespace_path: '/' + name,
            is_active,
            created_by: me ? me.username : null,
            created_at: new Date().toISOString(),
        });

        return set_response(res, app, HttpStatusCode.OK, true, ['Successfully created the app'], null);
    } catch (error: any) {
        const customErrors = await convertMongoErrorToCustomError(error);
        return set_response(res, null, HttpStatusCode.InternalServerError, false, ['Failed to create the app'], customErrors);
    }
};

