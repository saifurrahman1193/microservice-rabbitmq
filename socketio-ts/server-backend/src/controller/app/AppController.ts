import { Request, Response } from 'express';
import { App as AppModel, createApp } from '../../model/app/App';
import { set_response } from '../../helper/APIResponser';
import { HttpStatusCode } from '../../helper/HttpCodeHelper';
import { generateAccessToken } from '../../helper/Crypto';
import { getUserBySessionToken } from '../../model/authentication/User';

export const create = async (req: Request, res: Response) => {
    try {
        const { name, is_active } = req.body;
        const sessionToken = req.cookies['SOCKET-SERVER-AUTH'];
        const me = await getUserBySessionToken(sessionToken);

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
        console.error('Error creating app:', error);
        return set_response(res, null, HttpStatusCode.InternalServerError, 'error', ['Failed to create the app'], error);
    }
};

